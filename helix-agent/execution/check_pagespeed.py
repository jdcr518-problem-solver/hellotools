"""
execution/check_pagespeed.py
============================
Helix agent — Step 5 execution script.
Audits Core Web Vitals (LCP, INP, CLS, Performance Score) per tool page via PageSpeed API v5.

Runs PageSpeed API twice per URL:
  1. strategy = mobile
  2. strategy = desktop

Sleeps 1 second between API calls to prevent rate limiting.
Appends rows into the `pagespeed` tab in Google Sheets.

Usage:
  python execution/check_pagespeed.py          # Runs in test mode (3 URLs -> 6 rows)
  python execution/check_pagespeed.py --full   # Runs for all 67+ tools
"""

import os
import sys
import time
import json
import logging
import requests
from datetime import datetime, timezone
from pathlib import Path
from dotenv import load_dotenv

# Add helix-agent root to sys.path
_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_ROOT))

from execution.shared.write_to_sheets import append_rows

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [check_pagespeed] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("check_pagespeed")

# Load .env
load_dotenv(_ROOT / ".env")

_PAGESPEED_ENDPOINT = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed"

TEST_URLS = [
    "/tools/emi-calculator",
    "/tools/compound-interest-calculator",
    "/tools/bmi-calculator",
]


def load_all_tool_urls() -> list[str]:
    """Load all relative tool URLs from test_cases.json or db.json."""
    test_cases_path = _ROOT / "test_cases.json"
    if test_cases_path.exists():
        try:
            with open(test_cases_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                urls = [entry.get("url") for entry in data.values() if entry.get("url")]
                if urls:
                    return urls
        except Exception as e:
            log.warning("Could not read test_cases.json: %s", str(e))

    # Fallback to db.json in toolsite
    db_path = _ROOT.parent / "data" / "db.json"
    if db_path.exists():
        try:
            with open(db_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return [f"/tools/{t['slug']}" for t in data.get("tools", [])]
        except Exception as e:
            log.warning("Could not read db.json: %s", str(e))

    return TEST_URLS


def query_pagespeed_api(full_url: str, strategy: str, api_key: str) -> dict | None:
    """
    Call PageSpeed Insights API v5 for a given full URL and strategy (mobile/desktop).
    """
    params = {
        "url": full_url,
        "strategy": strategy,
        "key": api_key,
    }

    try:
        response = requests.get(_PAGESPEED_ENDPOINT, params=params, timeout=60)
        if response.status_code != 200:
            log.error("PageSpeed API HTTP Error %d for %s (%s): %s", response.status_code, full_url, strategy, response.text[:200])
            return None

        data = response.json()
        lh = data.get("lighthouseResult", {})
        categories = lh.get("categories", {})
        score_raw = categories.get("performance", {}).get("score")
        perf_score = int(round(score_raw * 100)) if score_raw is not None else 0

        audits = lh.get("audits", {})
        lcp_raw = audits.get("largest-contentful-paint", {}).get("numericValue", 0)
        cls_raw = audits.get("cumulative-layout-shift", {}).get("numericValue", 0.0)

        # INP or experimental-INP
        inp_raw = (
            audits.get("interaction-to-next-paint", {}).get("numericValue")
            or audits.get("experimental-interaction-to-next-paint", {}).get("numericValue")
            or 0
        )

        return {
            "lcp_ms": int(round(lcp_raw)),
            "inp_ms": int(round(inp_raw)),
            "cls": round(float(cls_raw), 4),
            "performance_score": perf_score,
        }

    except Exception as err:
        log.error("Exception querying PageSpeed API for %s (%s): %s", full_url, strategy, str(err))
        return None


def run_check_pagespeed(full_run: bool = False):
    """
    Execute PageSpeed audits.
    Args:
        full_run: If True, audits all 67+ tools. If False, audits test set of 3 URLs.
    """
    api_key = os.getenv("PAGESPEED_API_KEY", "").strip()
    if not api_key or api_key == "FILL_ME":
        log.error("PAGESPEED_API_KEY is missing or invalid in .env")
        return False

    base_domain = os.getenv("GSC_SITE_URL", "https://hellotools.net/").rstrip("/")
    week_start = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    target_urls = load_all_tool_urls() if full_run else TEST_URLS

    mode_str = "FULL (All tools)" if full_run else "TEST (3 URLs sample)"
    print("=" * 60)
    print(f"Helix Agent — Step 5: Check PageSpeed Core Web Vitals [{mode_str}]")
    print(f"Target URLs: {len(target_urls)} URLs x 2 strategies = {len(target_urls) * 2} API calls")
    print("=" * 60)

    rows_to_append = []

    for idx, rel_url in enumerate(target_urls, 1):
        full_url = f"{base_domain}{rel_url}"
        print(f"\n[{idx}/{len(target_urls)}] Auditing: {rel_url}")

        for strategy in ["mobile", "desktop"]:
            print(f"  --> Strategy: {strategy:7s} ... ", end="", flush=True)

            res = query_pagespeed_api(full_url, strategy, api_key)

            # Sleep 1s to enforce rate limit spacing
            time.sleep(1.0)

            if res:
                lcp_ms = res["lcp_ms"]
                inp_ms = res["inp_ms"]
                cls = res["cls"]
                perf_score = res["performance_score"]

                flag_lcp = "TRUE" if lcp_ms > 2500 else "FALSE"
                flag_cls = "TRUE" if cls > 0.1 else "FALSE"

                print(f"[OK] Score: {perf_score:3d} | LCP: {lcp_ms:4d}ms | CLS: {cls:.4f}")

                rows_to_append.append([
                    week_start,
                    rel_url,
                    str(lcp_ms),
                    str(inp_ms),
                    str(cls),
                    str(perf_score),
                    flag_lcp,
                    flag_cls,
                    strategy,
                ])
            else:
                print("[FAIL] API query failed")

    print("\n" + "-" * 60)
    log.info("Collected %d total rows to append to 'pagespeed' tab.", len(rows_to_append))

    if rows_to_append:
        print(f"Appending {len(rows_to_append)} rows to 'pagespeed' tab in Google Sheets...")
        success = append_rows("pagespeed", rows_to_append)
        if success:
            print("  [OK] Successfully appended PageSpeed records to Google Sheets.")
        else:
            print("  [FAIL] Failed to append PageSpeed records.")
            return False
    else:
        print("  [WARN] No PageSpeed rows collected.")

    print("\n" + "=" * 60)
    print("Step 5 Execution Complete.")
    print("=" * 60)
    return True


if __name__ == "__main__":
    is_full = "--full" in sys.argv
    ok = run_check_pagespeed(full_run=is_full)
    if not ok:
        sys.exit(1)
