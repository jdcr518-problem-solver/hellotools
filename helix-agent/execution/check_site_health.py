"""
execution/check_site_health.py
==============================
Helix agent — Step 6 execution script.
Uses Playwright to audit calculator tools on live site (https://hellotools.net/tools/<slug>).

Checks per tool:
  1. HTTP Status code (e.g. 200, 404)
  2. Console JavaScript errors count
  3. Form input filling using ordered input_values from test_cases.json
  4. Waits 500ms for React state settle
  5. Output element rendering check
  6. Mathematical output validation vs expected_output (with tolerance)
  7. REVIEW_NEEDED tools -> Smoke test only (HTTP 200, 0 JS errors, output rendered)

Appends results into `site_health` tab in Google Sheets.

Usage:
  python execution/check_site_health.py          # Runs test mode on 3 sample tools
  python execution/check_site_health.py --full   # Runs full suite on all 67 tools
"""

import os
import re
import sys
import time
import json
import logging
from datetime import datetime, timezone
from pathlib import Path
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

# Add helix-agent root to sys.path
_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_ROOT))

from execution.shared.write_to_sheets import append_rows

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [check_site_health] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("check_site_health")

# Load .env
load_dotenv(_ROOT / ".env")

TEST_SLUGS = [
    "emi-calculator",
    "bmi-calculator",
    "percentage-calculator",
]


def load_test_cases() -> dict:
    """Load test_cases.json dictionary."""
    path = _ROOT / "test_cases.json"
    if not path.exists():
        log.error("test_cases.json missing at %s", path)
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def normalize_value(val_str: str) -> str:
    """
    Strips currency symbols, commas, percent signs, unit words, and whitespace
    to normalize string for numeric comparison.
    """
    if not val_str:
        return ""
    # Strip common units & symbols
    cleaned = (
        val_str.strip()
        .replace(",", "")
        .replace("$", "")
        .replace("£", "")
        .replace("€", "")
        .replace("Rs", "")
        .replace("PKR", "")
        .replace("%", "")
        .replace("g", "")
        .replace("kcal", "")
        .replace("EUR", "")
        .strip()
    )
    return cleaned


def is_numeric_match(actual_str: str, expected_str: str, tolerance: float = 0.01) -> tuple[bool, str]:
    """
    Compare normalized actual vs expected string values.
    Supports numeric float comparison with tolerance or exact string match.
    """
    norm_actual = normalize_value(actual_str)
    norm_expected = normalize_value(expected_str)

    # First try float conversion
    try:
        act_num = float(norm_actual)
        exp_num = float(norm_expected)
        diff = abs(act_num - exp_num)
        if diff <= tolerance:
            return True, f"Numeric match: {act_num} == {exp_num} (diff {diff:.4f} <= tol {tolerance})"
        else:
            return False, f"Numeric mismatch: actual {act_num} != expected {exp_num} (diff {diff:.4f} > tol {tolerance})"
    except ValueError:
        # Fallback to string match
        if norm_actual.lower() == norm_expected.lower() or norm_expected.lower() in norm_actual.lower():
            return True, f"String match: '{norm_actual}' matches '{norm_expected}'"
        return False, f"String mismatch: actual '{norm_actual}' != expected '{norm_expected}'"


def audit_tool_page(page, base_url: str, slug: str, tc_entry: dict) -> dict:
    """
    Audits a single tool page using Playwright.
    """
    rel_url = f"/tools/{slug}"
    full_url = f"{base_url.rstrip('/')}{rel_url}"

    expected_output = tc_entry.get("expected_output", "REVIEW_NEEDED")
    input_values = tc_entry.get("input_values", [])
    tolerance = float(tc_entry.get("tolerance", 0.01))
    is_review_needed = (expected_output == "REVIEW_NEEDED")

    js_errors = []

    def on_console(msg):
        if msg.type == "error":
            # Ignore harmless network / favicon errors
            text = msg.text
            if "favicon" not in text.lower() and "404" not in text:
                js_errors.append(text)

    page.on("console", on_console)

    http_status = 0
    error_notes = []
    output_rendered = False
    test_passed = False
    actual_output = ""

    try:
        log.info("Navigating to %s ...", full_url)
        resp = page.goto(full_url, wait_until="networkidle", timeout=30000)
        http_status = resp.status if resp else 0

        if http_status != 200:
            error_notes.append(f"HTTP status {http_status}")

        # Find interactive tool inputs inside main (exclude search bar, range sliders, hidden, buttons)
        inputs = page.query_selector_all(
            'main input:not([type="hidden"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([placeholder*="Search"]), main textarea:not([readonly])'
        )

        if input_values and not is_review_needed:
            for idx, val in enumerate(input_values):
                if idx < len(inputs):
                    try:
                        inputs[idx].fill(str(val))
                    except Exception as e:
                        error_notes.append(f"Input fill error field #{idx+1}: {e}")

            # Wait 500ms for React hooks state to settle
            page.wait_for_timeout(500)

        # Locate output element
        # Common selectors: navy card bg-[#1a3c5e], font-mono, text-3xl, or card results
        output_el = (
            page.query_selector("div.text-3xl.font-extrabold")
            or page.query_selector("span.font-mono.font-bold")
            or page.query_selector(".bg-\\[\\#1a3c5e\\]")
            or page.query_selector(".card")
        )

        if output_el and output_el.is_visible():
            output_rendered = True
            raw_text = output_el.inner_text().strip()
            # Extract first line or main number
            actual_output = raw_text.split("\n")[0].strip()

        if is_review_needed:
            # Smoke test logic for REVIEW_NEEDED tools
            if http_status == 200 and len(js_errors) == 0 and output_rendered:
                test_passed = True
                note = "Smoke test PASSED (HTTP 200, 0 JS errors, output rendered)."
            else:
                test_passed = False
                note = f"Smoke test FAILED (HTTP={http_status}, JS_errors={len(js_errors)}, output_rendered={output_rendered})."
            error_notes.append(note)
        else:
            # Value matching logic
            if actual_output:
                matched, match_note = is_numeric_match(actual_output, str(expected_output), tolerance)
                test_passed = matched and (http_status == 200) and (len(js_errors) == 0)
                error_notes.append(match_note)
            else:
                test_passed = False
                error_notes.append("Output element not found or empty.")

    except Exception as err:
        log.error("Error auditing %s: %s", slug, str(err))
        error_notes.append(f"Playwright error: {err}")

    return {
        "slug": slug,
        "url": rel_url,
        "http_status": str(http_status),
        "js_errors": str(len(js_errors)),
        "output_rendered": "TRUE" if output_rendered else "FALSE",
        "test_passed": "TRUE" if test_passed else "FALSE",
        "test_input": json.dumps(input_values),
        "expected_output": str(expected_output),
        "actual_output": actual_output[:100],
        "error_notes": " | ".join(error_notes),
    }


def run_check_site_health(full_run: bool = False):
    """
    Main execution function for check_site_health.py.
    """
    base_url = os.getenv("GSC_SITE_URL", "https://hellotools.net/").strip()
    week_start = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    all_tc = load_test_cases()
    if not all_tc:
        log.error("No test cases loaded. Exiting.")
        return False

    target_slugs = list(all_tc.keys()) if full_run else TEST_SLUGS

    mode_str = "FULL (67 tools)" if full_run else "TEST (3 sample tools)"
    print("=" * 60)
    print(f"Helix Agent — Step 6: Check Site Health [{mode_str}]")
    print(f"Base Domain: {base_url}")
    print(f"Target Slugs: {len(target_slugs)} tools")
    print("=" * 60)

    rows_to_append = []
    passed_count = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        for idx, slug in enumerate(target_slugs, 1):
            tc_entry = all_tc.get(slug, {})
            print(f"\n[{idx}/{len(target_slugs)}] Auditing: {slug}")

            res = audit_tool_page(page, base_url, slug, tc_entry)

            status_str = "[OK]" if res["test_passed"] == "TRUE" else "[FAIL]"
            print(f"  {status_str} HTTP: {res['http_status']} | JS Errors: {res['js_errors']} | Actual: '{res['actual_output']}' | Exp: '{res['expected_output']}'")
            print(f"      Notes: {res['error_notes']}")

            if res["test_passed"] == "TRUE":
                passed_count += 1

            rows_to_append.append([
                week_start,
                res["slug"],
                res["url"],
                res["http_status"],
                res["js_errors"],
                res["output_rendered"],
                res["test_passed"],
                res["test_input"],
                res["expected_output"],
                res["actual_output"],
                res["error_notes"],
            ])

        browser.close()

    print("\n" + "-" * 60)
    print(f"Health Audit Complete: {passed_count}/{len(target_slugs)} tools passed.")
    print("-" * 60)

    if rows_to_append:
        print(f"Appending {len(rows_to_append)} rows to 'site_health' tab in Google Sheets...")
        success = append_rows("site_health", rows_to_append)
        if success:
            print("  [OK] Successfully appended site health records to Google Sheets.")
        else:
            print("  [FAIL] Failed to append site health records.")
            return False

    print("\n" + "=" * 60)
    print("Step 6 Execution Complete.")
    print("=" * 60)
    return True


if __name__ == "__main__":
    is_full = "--full" in sys.argv
    ok = run_check_site_health(full_run=is_full)
    if not ok:
        sys.exit(1)
