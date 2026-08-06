"""
NOTE: Direct competitor site scraping is used for tool gap detection.
Scrapes top 5 competitor tool directories/sitemaps via requests or Playwright,
compares found tools against HelloTools' 67 tools in test_cases.json,
deduplicates against existing rows in Google Sheets,
and logs NEW missing tools into the competitor_tracking tab in Google Sheets.

NOTE FOR STEP 9 (generate_brief.py): When reading competitor_tracking tab for the Monday brief,
filter for priority == 'HIGH' rows only to avoid overloading Gemini context.
"""
import os
import sys
import json
import logging
import re
import datetime
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import List, Set, Dict, Any, Tuple
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Ensure helix-agent root is in sys.path
BASE_DIR = Path(__file__).parent.parent
sys.path.insert(0, str(BASE_DIR))

from execution.shared.write_to_sheets import append_rows, read_tab

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("scrape_competitors")

# Load environment
load_dotenv(dotenv_path=BASE_DIR / ".env")

CONFIG_PATH = BASE_DIR / "directives" / "config.json"
TEST_CASES_PATH = BASE_DIR / "test_cases.json"


def load_config() -> Dict[str, Any]:
    if not CONFIG_PATH.exists():
        raise FileNotFoundError(f"Config file not found at {CONFIG_PATH}")
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def load_our_tools() -> Set[str]:
    if not TEST_CASES_PATH.exists():
        raise FileNotFoundError(f"test_cases.json not found at {TEST_CASES_PATH}")
    with open(TEST_CASES_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return set(data.keys())


def get_current_week_start() -> str:
    """Returns YYYY-MM-DD for the Monday of the current week."""
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    return monday.isoformat()


def normalize_tool_slug(text_or_url: str) -> str:
    """Extract and normalize tool slug from URL or link text."""
    if "/" in text_or_url:
        path = text_or_url.split("?")[0].rstrip("/")
        slug = path.split("/")[-1]
    else:
        slug = text_or_url

    slug = slug.replace(".html", "").replace(".php", "").lower()
    slug = re.sub(r"[^a-z0-9\-]+", "-", slug).strip("-")
    return slug


def slug_to_display_name(slug: str) -> str:
    """Converts a tool slug into a clean display title (e.g. '401k-calculator' -> '401K Calculator')."""
    words = slug.split("-")
    formatted = []
    for w in words:
        if w in ["401k", "bmi", "bmr", "gpa", "gst", "vat", "sip", "emi", "apr", "cd", "ira", "rmd", "irr", "roi", "fha", "va", "heloc"]:
            formatted.append(w.upper())
        else:
            formatted.append(w.capitalize())
    return " ".join(formatted)


def classify_priority(slug: str) -> str:
    """
    Assign priority HIGH/MEDIUM/LOW based on business value keywords.
    Financial and Health calculators get HIGH priority.
    """
    high_keywords = [
        # Finance, Banking, Real Estate & Business
        "finance", "financial", "mortgage", "loan", "tax", "salary", "interest",
        "investment", "retirement", "401k", "annuity", "apr", "debt", "savings",
        "inflation", "currency", "credit", "budget", "paycheck", "income", "stock",
        "crypto", "amortization", "amortize", "payoff", "refinance", "auto", "car",
        "lease", "pension", "social-security", "estate", "cd-", "ira", "roth",
        "rmd", "vat", "gst", "margin", "discount", "bond", "fund", "dividend",
        "commission", "heloc", "home-equity", "rent", "down-payment", "real-estate",
        "irr", "roi", "fha", "va-", "cagr", "payment", "checkbook", "take-home",
        "sales-tax", "tip-", "cost", "bill", "money", "cash", "deposit", "portfolio",
        "capital", "asset", "equity", "mortgage-payoff", "car-loan",
        # Health, Fitness & Academic
        "bmi", "calorie", "bmr", "body-fat", "pregnancy", "ovulation", "weight",
        "macro", "health", "gpa", "grade", "house-affordability", "depreciation"
    ]

    medium_keywords = [
        "math", "algebra", "geometry", "converter", "conversion", "percentage",
        "fraction", "average", "square-root", "time", "date", "speed", "pace",
        "unit", "volume", "area", "length", "temperature", "ratio", "physics",
        "statistics", "probability", "binary", "hex", "rgb", "bytes"
    ]

    slug_lower = slug.lower()
    if any(kw in slug_lower for kw in high_keywords):
        return "HIGH"
    if any(kw in slug_lower for kw in medium_keywords):
        return "MEDIUM"
    return "LOW"


def build_full_tool_url(site: Dict[str, Any], slug: str) -> str:
    """Build a plausible full URL for the tool on the competitor domain."""
    base = site["base_url"].rstrip("/")
    if "calculator.net" in base:
        return f"{base}/{slug}.html"
    elif "rapidtables.com" in base:
        return f"{base}/calc/{slug}.html"
    elif "calculatorsoup.com" in base:
        return f"{base}/calculators/{slug}.php"
    elif "omnicalculator.com" in base:
        return f"{base}/{slug}"
    elif "gigacalculator.com" in base:
        return f"{base}/calculators/{slug}.php"
    return f"{base}/{slug}"


def is_excluded_slug(slug: str, excluded_keywords: List[str]) -> bool:
    """Check if the slug contains any prohibited or sensitive keywords."""
    slug_lower = slug.lower()
    return any(ex.lower() in slug_lower for ex in excluded_keywords)


def scrape_html_links(site: Dict[str, Any]) -> Set[str]:
    url = site["tool_directory_url"]
    link_filter = site.get("link_filter", "")
    logger.info(f"Scraping HTML links from {url} (filter: {link_filter})")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    resp = requests.get(url, headers=headers, timeout=20)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    found_slugs = set()

    for a_tag in soup.find_all("a", href=True):
        href = a_tag["href"]
        if link_filter and link_filter not in href:
            continue
        slug = normalize_tool_slug(href)
        if slug and len(slug) > 3 and slug not in ["index", "sitemap", "home", "privacy", "terms"]:
            found_slugs.add(slug)

    logger.info(f"Found {len(found_slugs)} unique tool slugs on {site['name']}")
    return found_slugs


def scrape_xml_sitemap(site: Dict[str, Any]) -> Set[str]:
    url = site["tool_directory_url"]
    link_filter = site.get("link_filter", "")
    logger.info(f"Parsing XML sitemap from {url} (filter: {link_filter})")

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()

    found_slugs = set()
    try:
        root = ET.fromstring(resp.content)
        namespaces = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = root.findall(".//ns:loc", namespaces) or root.findall(".//loc")
        for loc in locs:
            if loc.text and link_filter in loc.text:
                slug = normalize_tool_slug(loc.text)
                if slug and len(slug) > 3:
                    found_slugs.add(slug)
    except Exception as e:
        logger.error(f"Failed to parse XML sitemap from {url}: {e}")

    logger.info(f"Found {len(found_slugs)} unique tool slugs on {site['name']}")
    return found_slugs


def scrape_playwright_js(site: Dict[str, Any]) -> Set[str]:
    url = site["tool_directory_url"]
    link_filter = site.get("link_filter", "")
    logger.info(f"Scraping JS-rendered page with Playwright from {url}")

    from playwright.sync_api import sync_playwright

    found_slugs = set()
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="domcontentloaded", timeout=25000)
        page.wait_for_timeout(3000)

        hrefs = page.eval_on_selector_all("a[href]", "elements => elements.map(e => e.getAttribute('href'))")
        for href in hrefs:
            if href and (not link_filter or link_filter in href):
                slug = normalize_tool_slug(href)
                if slug and len(slug) > 3 and slug not in ["index", "sitemap", "home", "calculators"]:
                    found_slugs.add(slug)

        browser.close()

    logger.info(f"Found {len(found_slugs)} unique tool slugs on {site['name']}")
    return found_slugs


def get_existing_sheet_gaps() -> Set[Tuple[str, str]]:
    """
    Read current rows from competitor_tracking tab in Google Sheets.
    Returns a set of (competitor_domain, tool_slug) tuples already logged.
    """
    existing_gaps = set()
    try:
        rows = read_tab("competitor_tracking")
        if not rows or len(rows) <= 1:
            return existing_gaps

        # Check column index for domain and tool name/url
        # Schema: week_start(0), competitor_domain(1), competitor_tool_name(2), competitor_tool_url(3), gap_type(4), priority(5), notes(6)
        for r in rows[1:]:
            if len(r) >= 4:
                domain = r[1].strip().lower()
                tool_url_or_name = r[3] if len(r) > 3 else r[2]
                slug = normalize_tool_slug(tool_url_or_name)
                if domain and slug:
                    existing_gaps.add((domain, slug))
        logger.info(f"Found {len(existing_gaps)} existing competitor tool gaps already in Google Sheets.")
    except Exception as e:
        logger.warning(f"Could not read existing gaps from Google Sheets: {e}")

    return existing_gaps


def run_competitor_scrape(dry_run: bool = False) -> List[List[Any]]:
    config = load_config()
    our_tools = load_our_tools()
    excluded_keywords = config.get("excluded_slug_keywords", [])
    logger.info(f"Loaded {len(our_tools)} local tools from test_cases.json")
    logger.info(f"Excluded keywords filter: {excluded_keywords}")

    week_start = get_current_week_start()
    existing_gaps = set() if dry_run else get_existing_sheet_gaps()

    competitors = config.get("competitor_sites", [])
    sheet_rows = []
    total_gaps_scraped = 0
    total_excluded_count = 0
    total_duplicates_skipped = 0

    for site in competitors:
        name = site["name"]
        strategy = site.get("parse_strategy", "html_links")

        try:
            if strategy == "html_links":
                comp_tools = scrape_html_links(site)
            elif strategy == "xml_sitemap":
                comp_tools = scrape_xml_sitemap(site)
            elif strategy == "playwright_js":
                comp_tools = scrape_playwright_js(site)
            else:
                logger.warning(f"Unknown strategy '{strategy}' for {name}")
                continue
        except Exception as e:
            logger.error(f"Error scraping {name}: {e}")
            continue

        # Filter gaps vs HelloTools
        raw_gaps = sorted(list(comp_tools - our_tools))
        total_gaps_scraped += len(raw_gaps)

        comp_new_rows = 0
        for tool_slug in raw_gaps:
            # 1. Relevance filter check
            if is_excluded_slug(tool_slug, excluded_keywords):
                total_excluded_count += 1
                continue

            # 2. Deduplication check
            domain_key = name.lower()
            if (domain_key, tool_slug) in existing_gaps:
                total_duplicates_skipped += 1
                continue

            # Compute fields for 7-column schema
            tool_name = slug_to_display_name(tool_slug)
            tool_url = build_full_tool_url(site, tool_slug)
            gap_type = "MISSING_FROM_HELLOTOOLS"
            priority = classify_priority(tool_slug)
            notes = f"Found on {site['base_url']} but missing on HelloTools"

            row = [
                week_start,            # A: week_start
                name,                  # B: competitor_domain
                tool_name,             # C: competitor_tool_name
                tool_url,              # D: competitor_tool_url
                gap_type,              # E: gap_type
                priority,              # F: priority
                notes,                 # G: notes
            ]
            sheet_rows.append(row)
            comp_new_rows += 1

        logger.info(f"[{name}] Total tools: {len(comp_tools)} | Missing: {len(raw_gaps)} | NEW rows to add: {comp_new_rows}")

    logger.info(f"=== SCRAPE SUMMARY ===")
    logger.info(f"Total raw missing gaps scraped across competitors: {total_gaps_scraped}")
    logger.info(f"Total excluded by relevance filter: {total_excluded_count}")
    logger.info(f"Total skipped as already logged (deduplicated): {total_duplicates_skipped}")
    logger.info(f"Total NEW rows ready to write: {len(sheet_rows)}")

    if not dry_run and sheet_rows:
        logger.info(f"Writing {len(sheet_rows)} NEW gap records to Google Sheets ('competitor_tracking')...")
        success = append_rows("competitor_tracking", sheet_rows)
        if success:
            logger.info("Successfully appended NEW competitor gap rows to Google Sheets!")
        else:
            logger.error("Failed to append rows to Google Sheets.")
    else:
        logger.info(f"Dry run or no new rows to write. Sample rows ({len(sheet_rows)} total):")
        for r in sheet_rows[:10]:
            logger.info(f"  {r}")

    return sheet_rows


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Scrape competitors for tool gaps.")
    parser.add_argument("--dry-run", action="store_true", help="Run without writing to Google Sheets")
    args = parser.parse_args()

    run_competitor_scrape(dry_run=args.dry_run)
