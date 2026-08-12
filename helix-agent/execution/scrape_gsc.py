"""
execution/scrape_gsc.py
=======================
Helix agent — Step 4 execution script.
Pulls last 7 days GSC performance data by URL, queries prev_position from existing
gsc_by_url rows, computes position_delta, flag_drop, flag_low_ctr, flag_quick_win,
and appends new weekly records to Google Sheets.
"""

import os
import sys
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Add helix-agent root to sys.path
_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_ROOT))

from googleapiclient.discovery import build
from dotenv import load_dotenv

from execution.shared.write_to_sheets import (
    get_credentials,
    read_tab,
    append_rows,
)

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [scrape_gsc] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("scrape_gsc")

# Load .env
load_dotenv(_ROOT / ".env")


def get_gsc_service():
    """Builds and returns GSC API service."""
    creds = get_credentials()
    if not creds:
        log.warning("Google Search Console credentials unavailable. Operating in offline mode.")
        return None
    return build("searchconsole", "v1", credentials=creds)


def get_prev_positions_map() -> dict[str, float]:
    """
    Reads existing gsc_by_url rows from Google Sheets.
    Returns dict mapping url -> latest position from previous week runs.
    """
    rows = read_tab("gsc_by_url")
    if not rows or len(rows) <= 1:
        log.info("No prior gsc_by_url records found in sheet.")
        return {}

    # Header: week_start (0), url (1), clicks (2), impressions (3), ctr (4), position (5)...
    url_latest = {}  # url -> (week_start_str, position_float)

    for row in rows[1:]:
        if len(row) >= 6:
            w_start = row[0].strip()
            url_val = row[1].strip()
            try:
                pos_val = float(row[5])
                if url_val not in url_latest or w_start > url_latest[url_val][0]:
                    url_latest[url_val] = (w_start, pos_val)
            except ValueError:
                continue

    prev_map = {url: item[1] for url, item in url_latest.items()}
    log.info("Loaded previous positions for %d URLs from sheet.", len(prev_map))
    return prev_map


def fetch_gsc_data(site_url: str, days: int = 7) -> list[dict]:
    """
    Fetch GSC page-level performance data for the last `days` days.
    """
    service = get_gsc_service()
    if not service:
        log.warning("Skipping GSC API query (service unavailable).")
        return []

    # End date: yesterday, Start date: yesterday - days
    end_date = (datetime.now(timezone.utc) - timedelta(days=1)).strftime("%Y-%m-%d")
    start_date = (datetime.now(timezone.utc) - timedelta(days=days)).strftime("%Y-%m-%d")

    log.info("Querying GSC API for %s (Range: %s to %s)...", site_url, start_date, end_date)

    request_body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": ["page"],
        "rowLimit": 500,
    }

    try:
        response = (
            service.searchanalytics()
            .query(siteUrl=site_url, body=request_body)
            .execute()
        )

        rows = response.get("rows", [])
        log.info("GSC API returned %d page rows.", len(rows))
        return rows

    except Exception as err:
        log.error("Error querying GSC API: %s", str(err))
        return []


def run_scrape_gsc():
    """Main execution function for scrape_gsc.py."""
    site_url = os.getenv("GSC_SITE_URL", "https://hellotools.net/").strip()
    week_start = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    print("=" * 60)
    print(f"Helix Agent — Step 4: Scrape GSC Data ({week_start})")
    print("=" * 60)

    # 1. Read previous positions map from sheet
    prev_map = get_prev_positions_map()

    # 2. Fetch GSC data
    gsc_rows = fetch_gsc_data(site_url)
    if not gsc_rows:
        log.warning("No GSC data returned or error occurred. Writing empty sample row if first run.")

    # 3. Process each row
    processed_rows = []

    for item in gsc_rows:
        keys = item.get("keys", [])
        if not keys:
            continue

        raw_url = keys[0]
        # Filter for tools domain/path
        if "/tools/" not in raw_url and raw_url != site_url and not raw_url.endswith("hellotools.net/"):
            continue

        # Extract relative path (e.g. /tools/emi-calculator)
        if "hellotools.net" in raw_url:
            rel_url = "/" + raw_url.split("hellotools.net/", 1)[-1]
        else:
            rel_url = raw_url

        clicks = int(item.get("clicks", 0))
        impressions = int(item.get("impressions", 0))
        ctr = round(float(item.get("ctr", 0.0)), 4)
        position = round(float(item.get("position", 0.0)), 2)

        # Previous position lookup
        prev_pos = prev_map.get(rel_url) or prev_map.get(raw_url)

        if prev_pos is not None:
            prev_pos_str = str(round(prev_pos, 2))
            pos_delta = round(prev_pos - position, 2)
            pos_delta_str = str(pos_delta)
            flag_drop = "TRUE" if (prev_pos - position) <= -3.0 else "FALSE"
        else:
            prev_pos_str = ""
            pos_delta_str = ""
            flag_drop = "FALSE"

        flag_low_ctr = "TRUE" if (impressions > 500 and ctr < 0.02) else "FALSE"
        flag_quick_win = "TRUE" if (6.0 <= position <= 15.0) else "FALSE"

        processed_rows.append([
            week_start,
            rel_url,
            str(clicks),
            str(impressions),
            str(ctr),
            str(position),
            prev_pos_str,
            pos_delta_str,
            flag_drop,
            flag_low_ctr,
            flag_quick_win,
        ])

    log.info("Processed %d filtered tool URLs for gsc_by_url tab.", len(processed_rows))

    if processed_rows:
        print(f"Appending {len(processed_rows)} rows to 'gsc_by_url' tab...")
        success = append_rows("gsc_by_url", processed_rows)
        if success:
            print("  [OK] Successfully appended GSC records to Google Sheets.")
        else:
            print("  [FAIL] Failed to append GSC records.")
            return False
    else:
        print("  [INFO] No GSC rows found to append.")

    print("\n" + "=" * 60)
    print("Step 4 Execution Complete.")
    print("=" * 60)
    return True


if __name__ == "__main__":
    ok = run_scrape_gsc()
    if not ok:
        sys.exit(1)
