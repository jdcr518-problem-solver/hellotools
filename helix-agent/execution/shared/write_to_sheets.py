"""
shared/write_to_sheets.py
=========================
Helix agent — Step 2 shared utility.
Manages reading from, appending to, and updating Google Sheets via OAuth.

Scopes required:
  - https://www.googleapis.com/auth/spreadsheets
  - https://www.googleapis.com/auth/webmasters.readonly (for GSC read in later steps)

Auth Flow:
  - Checks for token.json in helix-agent/
  - If missing/invalid, launches local server flow using credentials.json to obtain token.json
"""

import os
import logging
from pathlib import Path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from dotenv import load_dotenv

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [write_to_sheets] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("write_to_sheets")

# ── Paths & Scopes ────────────────────────────────────────────────────────────
_ROOT = Path(__file__).resolve().parent.parent.parent  # helix-agent/
load_dotenv(_ROOT / ".env")

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/webmasters.readonly",
]


def get_credentials():
    """Obtains valid user OAuth2 credentials from token.json or credentials.json."""
    creds = None
    cred_path = _ROOT / os.getenv("GOOGLE_CREDENTIALS_PATH", "./credentials.json")
    token_path = _ROOT / os.getenv("GOOGLE_TOKEN_PATH", "./token.json")

    if token_path.exists():
        try:
            creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
        except Exception as e:
            log.warning("Could not parse existing token.json: %s", str(e))
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                log.info("Refreshing expired OAuth token...")
                creds.refresh(Request())
            except Exception as e:
                log.warning("Token refresh failed: %s. Re-authenticating...", str(e))
                creds = None

        if not creds:
            if not cred_path.exists():
                raise FileNotFoundError(
                    f"OAuth client secret file missing at '{cred_path}'. "
                    "Ensure credentials.json exists in helix-agent/."
                )
            log.info("Launching OAuth authorization flow in browser...")
            flow = InstalledAppFlow.from_client_secrets_file(str(cred_path), SCOPES)
            creds = flow.run_local_server(port=0)

        # Save the credentials for future runs
        with open(token_path, "w", encoding="utf-8") as token_file:
            token_file.write(creds.to_json())
            log.info("Saved OAuth token to %s", token_path)

    return creds


def get_sheets_service():
    """Builds and returns the Google Sheets API service object."""
    creds = get_credentials()
    return build("sheets", "v4", credentials=creds)


def read_tab(tab_name: str) -> list[list[str]]:
    """
    Read all row values from a given tab in the spreadsheet.

    Args:
        tab_name: Name of the tab/sheet (e.g. 'p0_monitor', 'gsc_by_url')

    Returns:
        List of rows, where each row is a list of string values.
    """
    spreadsheet_id = os.getenv("SPREADSHEET_ID", "").strip()
    if not spreadsheet_id or spreadsheet_id == "FILL_ME":
        log.error("SPREADSHEET_ID is missing or not set in .env")
        return []

    try:
        service = get_sheets_service()
        range_name = f"'{tab_name}'!A1:ZZ"
        result = (
            service.spreadsheets()
            .values()
            .get(spreadsheetId=spreadsheet_id, range=range_name)
            .execute()
        )
        rows = result.get("values", [])
        log.info("Read %d rows from tab '%s'", len(rows), tab_name)
        return rows
    except HttpError as err:
        log.error("HTTP Error reading tab '%s': %s", tab_name, err)
        return []
    except Exception as err:
        log.error("Error reading tab '%s': %s", tab_name, err)
        return []


def append_rows(tab_name: str, rows: list[list]) -> bool:
    """
    Append rows to a specific tab in the spreadsheet.

    Args:
        tab_name: Name of the tab/sheet.
        rows: List of row data lists (e.g. [['col1', 'col2'], ['col1', 'col2']]).

    Returns:
        True if append succeeded, False otherwise.
    """
    if not rows:
        log.warning("No rows provided to append to tab '%s'", tab_name)
        return True

    spreadsheet_id = os.getenv("SPREADSHEET_ID", "").strip()
    if not spreadsheet_id or spreadsheet_id == "FILL_ME":
        log.error("SPREADSHEET_ID is missing or not set in .env")
        return False

    try:
        service = get_sheets_service()
        range_name = f"'{tab_name}'!A1"
        body = {"values": rows}
        result = (
            service.spreadsheets()
            .values()
            .append(
                spreadsheetId=spreadsheet_id,
                range=range_name,
                valueInputOption="USER_ENTERED",
                insertDataOption="INSERT_ROWS",
                body=body,
            )
            .execute()
        )
        updated_cells = result.get("updates", {}).get("updatedCells", 0)
        log.info(
            "Appended %d rows (%d cells) to tab '%s'",
            len(rows),
            updated_cells,
            tab_name,
        )
        return True
    except HttpError as err:
        log.error("HTTP Error appending to tab '%s': %s", tab_name, err)
        return False
    except Exception as err:
        log.error("Unexpected error appending to tab '%s': %s", tab_name, err)
        return False


def clear_tab(tab_name: str) -> bool:
    """
    Clear all rows and values from a given tab in the spreadsheet.

    Args:
        tab_name: Name of the tab/sheet to clear.

    Returns:
        True if clear succeeded, False otherwise.
    """
    spreadsheet_id = os.getenv("SPREADSHEET_ID", "").strip()
    if not spreadsheet_id or spreadsheet_id == "FILL_ME":
        log.error("SPREADSHEET_ID is missing or not set in .env")
        return False

    try:
        service = get_sheets_service()
        range_name = f"'{tab_name}'!A1:ZZ"
        service.spreadsheets().values().clear(
            spreadsheetId=spreadsheet_id,
            range=range_name,
            body={}
        ).execute()
        log.info("Cleared all values from tab '%s'", tab_name)
        return True
    except HttpError as err:
        log.error("HTTP Error clearing tab '%s': %s", tab_name, err)
        return False
    except Exception as err:
        log.error("Unexpected error clearing tab '%s': %s", tab_name, err)
        return False


def create_tab_if_not_exists(tab_name: str, header_row: list[str] | None = None) -> bool:
    """
    Check if tab exists in spreadsheet. If not, creates it and adds header_row.

    Args:
        tab_name: Name of tab.
        header_row: Optional list of column header titles.

    Returns:
        True if creation/check succeeded, False on failure.
    """
    spreadsheet_id = os.getenv("SPREADSHEET_ID", "").strip()
    if not spreadsheet_id or spreadsheet_id == "FILL_ME":
        log.error("SPREADSHEET_ID is missing or not set in .env")
        return False

    try:
        service = get_sheets_service()
        sheet_metadata = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
        sheets = sheet_metadata.get("sheets", [])
        existing_tabs = [s.get("properties", {}).get("title") for s in sheets]

        if tab_name not in existing_tabs:
            log.info("Tab '%s' does not exist. Creating...", tab_name)
            req = {
                "addSheet": {
                    "properties": {
                        "title": tab_name,
                    }
                }
            }
            service.spreadsheets().batchUpdate(
                spreadsheetId=spreadsheet_id, body={"requests": [req]}
            ).execute()
            log.info("Tab '%s' created.", tab_name)

            if header_row:
                append_rows(tab_name, [header_row])
        else:
            log.info("Tab '%s' already exists.", tab_name)

        return True

    except Exception as err:
        log.error("Error creating tab '%s': %s", tab_name, err)
        return False


# ── Self-test ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("Testing write_to_sheets.py connection and OAuth...")
    test_tab = "_helix_test"
    headers = ["timestamp", "test_message", "status"]
    data = [["2026-08-05 00:00:00", "Step 2 write_to_sheets test", "SUCCESS"]]

    print(f"Creating test tab '{test_tab}' if needed...")
    if create_tab_if_not_exists(test_tab, headers):
        print(f"Appending test row to '{test_tab}'...")
        if append_rows(test_tab, data):
            print(f"Reading rows back from '{test_tab}'...")
            read_rows = read_tab(test_tab)
            print("Read rows result:")
            for r in read_rows:
                print(" ", r)
            print("\nSUCCESS: write_to_sheets.py verified end-to-end!")
        else:
            print("FAILED to append rows.")
    else:
        print("FAILED to create/verify tab.")
