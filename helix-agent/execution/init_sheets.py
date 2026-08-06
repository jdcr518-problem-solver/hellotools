"""
execution/init_sheets.py
========================
Helix agent — Step 3b execution script.
One-off schema initializer that creates all 8 Google Sheets tabs with their official header rows,
matching the exact specification in implementation_plan.md.

Tabs created (8 total):
  1. weekly_summary
  2. gsc_by_url
  3. pagespeed
  4. site_health
  5. competitor_tracking
  6. adsense
  7. p0_log
  8. content_suggestions
"""

import sys
from pathlib import Path

# Add helix-agent root to sys.path so shared imports work
_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_ROOT))

from execution.shared.write_to_sheets import create_tab_if_not_exists, get_sheets_service, os, log, clear_tab, append_rows


def reset_tab(tab_name: str) -> bool:
    """Clear a tab and re-populate its header row matching SHEET_SCHEMAS."""
    if tab_name not in SHEET_SCHEMAS:
        log.error("Unknown tab name '%s'", tab_name)
        return False
    log.info("Resetting tab '%s'...", tab_name)
    clear_tab(tab_name)
    return append_rows(tab_name, [SHEET_SCHEMAS[tab_name]])

# ── Sheet Schemas (Exact headers from implementation_plan.md) ────────────────
SHEET_SCHEMAS = {
    "weekly_summary": [
        "week_start",
        "total_clicks",
        "total_impressions",
        "avg_ctr",
        "avg_position",
        "tools_passing",
        "tools_failing",
        "pages_above_lcp_threshold",
        "p0_triggered",
        "adsense_rpm",
        "adsense_earnings",
        "top_action",
        "run_timestamp",
    ],
    "gsc_by_url": [
        "week_start",
        "url",
        "clicks",
        "impressions",
        "ctr",
        "position",
        "prev_position",
        "position_delta",
        "flag_drop",
        "flag_low_ctr",
        "flag_quick_win",
    ],
    "pagespeed": [
        "week_start",
        "url",
        "lcp_ms",
        "inp_ms",
        "cls",
        "performance_score",
        "flag_lcp",
        "flag_cls",
        "strategy",
    ],
    "site_health": [
        "week_start",
        "slug",
        "url",
        "http_status",
        "js_errors",
        "output_rendered",
        "test_passed",
        "test_input",
        "expected_output",
        "actual_output",
        "error_notes",
    ],
    "competitor_tracking": [
        "week_start",
        "competitor_domain",
        "competitor_tool_name",
        "competitor_tool_url",
        "gap_type",
        "priority",
        "notes",
    ],
    "adsense": [
        "week_start",
        "rpm",
        "total_earnings",
        "page_views",
        "top_earning_category",
        "low_viewability_pages",
    ],
    "p0_log": [
        "timestamp",
        "type",
        "detail",
        "url_affected",
        "alert_sent",
    ],
    "content_suggestions": [
        "week_start",
        "type",
        "url",
        "current_value",
        "suggested_value",
        "reason",
        "status",
    ],
}


def fix_sheet_tabs():
    """Renames/removes invalid tabs and ensures exact 8 tabs are created with headers."""
    spreadsheet_id = os.getenv("SPREADSHEET_ID", "").strip()
    if not spreadsheet_id or spreadsheet_id == "FILL_ME":
        log.error("SPREADSHEET_ID is missing or not set in .env")
        return False

    service = get_sheets_service()
    sheet_metadata = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    sheets = sheet_metadata.get("sheets", [])

    existing_tabs = {s.get("properties", {}).get("title"): s.get("properties", {}).get("sheetId") for s in sheets}
    log.info("Current tabs in spreadsheet: %s", list(existing_tabs.keys()))

    # Map of old incorrect names to new correct names
    rename_map = {
        "weekly_health": "weekly_summary",
        "pagespeed_audit": "pagespeed",
        "competitor_serp": "competitor_tracking",
        "adsense_earnings": "adsense",
        "p0_monitor": "p0_log",
    }

    requests = []

    # Rename existing tabs if present
    for old_name, new_name in rename_map.items():
        if old_name in existing_tabs and new_name not in existing_tabs:
            sheet_id = existing_tabs[old_name]
            log.info("Renaming tab '%s' -> '%s'", old_name, new_name)
            requests.append({
                "updateSheetProperties": {
                    "properties": {
                        "sheetId": sheet_id,
                        "title": new_name,
                    },
                    "fields": "title",
                }
            })

    # Delete extra unneeded tabs (e.g. p0_competitors, _helix_test)
    delete_unneeded = ["p0_competitors", "_helix_test"]
    for unneeded in delete_unneeded:
        if unneeded in existing_tabs:
            sheet_id = existing_tabs[unneeded]
            log.info("Deleting extra tab '%s'", unneeded)
            requests.append({
                "deleteSheet": {
                    "sheetId": sheet_id
                }
            })

    if requests:
        service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id, body={"requests": requests}
        ).execute()
        log.info("Batch update completed.")


def init_sheets():
    """Create all 8 tabs and populate headers matching the exact schema document."""
    print("=" * 60)
    print("Helix Agent — Step 3b: Initialize Sheets Tabs & Headers")
    print("=" * 60)

    # First fix tab names in the sheet
    fix_sheet_tabs()

    success_count = 0
    total_tabs = len(SHEET_SCHEMAS)

    for tab_name, headers in SHEET_SCHEMAS.items():
        print(f"Initializing tab '{tab_name}' ({len(headers)} columns)...")
        if create_tab_if_not_exists(tab_name, header_row=headers):
            print(f"  [OK] Tab '{tab_name}' ready.")
            success_count += 1
        else:
            print(f"  [FAIL] Failed to initialize tab '{tab_name}'.")

    print("\n" + "=" * 60)
    print(f"Initialization Complete: {success_count}/{total_tabs} tabs ready.")
    print("=" * 60)

    return success_count == total_tabs


if __name__ == "__main__":
    ok = init_sheets()
    if not ok:
        sys.exit(1)
