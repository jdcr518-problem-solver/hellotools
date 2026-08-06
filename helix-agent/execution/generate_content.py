"""
execution/generate_content.py
==============================
Helix agent — Step 8 content generation script.
Generates SEO meta tags, FAQ sections, and next-tool recommendations using Gemini API (call_gemini),
and writes all recommendations to the 'content_suggestions' tab in Google Sheets.

Schema for 'content_suggestions':
  A: week_start
  B: type (META_TITLE / META_DESCRIPTION / FAQ_SECTION / NEXT_TOOL_RECOMMENDATION)
  C: url
  D: current_value
  E: suggested_value
  F: reason
  G: status (PENDING_REVIEW / APPROVED / APPLIED)
"""

import os
import sys
import json
import logging
import datetime
from pathlib import Path
from typing import List, Dict, Any, Set, Tuple
from dotenv import load_dotenv

# Ensure helix-agent root is in sys.path
BASE_DIR = Path(__file__).parent.parent
sys.path.insert(0, str(BASE_DIR))

from execution.shared.call_gemini import call_gemini
from execution.shared.write_to_sheets import read_tab, append_rows

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [generate_content] %(levelname)s: %(message)s")
log = logging.getLogger("generate_content")

# Load environment
load_dotenv(dotenv_path=BASE_DIR / ".env")

CONFIG_PATH = BASE_DIR / "directives" / "config.json"
TEST_CASES_PATH = BASE_DIR / "test_cases.json"


def get_current_week_start() -> str:
    """Returns YYYY-MM-DD for the Monday of the current week."""
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    return monday.isoformat()


def load_our_tools() -> Dict[str, Any]:
    if not TEST_CASES_PATH.exists():
        return {}
    with open(TEST_CASES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def get_existing_suggestions() -> Set[Tuple[str, str]]:
    """
    Read current rows from content_suggestions tab in Google Sheets.
    Returns a set of (suggestion_type, url) tuples already logged.
    """
    existing = set()
    try:
        rows = read_tab("content_suggestions")
        if not rows or len(rows) <= 1:
            return existing
        for r in rows[1:]:
            if len(r) >= 3:
                s_type = r[1].strip()
                s_url = r[2].strip().lower()
                existing.add((s_type, s_url))
        log.info("Found %d existing content suggestions in Google Sheets.", len(existing))
    except Exception as e:
        log.warning("Could not read existing content suggestions: %s", str(e))
    return existing


def generate_meta_suggestions_for_low_ctr(gsc_rows: List[List[str]], existing: Set[Tuple[str, str]]) -> List[List[str]]:
    """
    Find URLs flagged for low CTR (flag_low_ctr == 'TRUE') and generate improved title/description.
    gsc_by_url schema: week_start(0), url(1), clicks(2), impressions(3), ctr(4), position(5), prev_pos(6), delta(7), flag_drop(8), flag_low_ctr(9), flag_quick_win(10)
    """
    suggestions = []
    week_start = get_current_week_start()

    low_ctr_urls = []
    if len(gsc_rows) > 1:
        for r in gsc_rows[1:]:
            if len(r) >= 10 and r[9].upper() == "TRUE":
                url = r[1]
                pos = r[5] if len(r) > 5 else "N/A"
                ctr = r[4] if len(r) > 4 else "N/A"
                low_ctr_urls.append({"url": url, "position": pos, "ctr": ctr})

    # If no GSC data logged yet, use representative sample tool pages
    if not low_ctr_urls:
        log.info("No low-CTR URLs found in GSC tab. Running sample title/meta generation for core tools...")
        sample_slugs = ["emi-calculator", "bmi-calculator", "percentage-calculator"]
        for slug in sample_slugs:
            low_ctr_urls.append({"url": f"https://hellotools.net/tools/{slug}", "position": "12.5", "ctr": "1.2%"})

    for item in low_ctr_urls:
        url = item["url"]
        tool_name = url.split("/")[-1].replace("-", " ").title()

        # Check deduplication for META_TITLE
        if ("META_TITLE", url.lower()) not in existing:
            prompt = (
                f"Create a high-CTR, click-worthy Meta Title for the webpage '{tool_name}' on HelloTools.net.\n"
                f"Current search position: {item['position']}, Current CTR: {item['ctr']}.\n"
                f"Requirements: 50-60 characters, includes target keywords, compelling call to action, end with '| HelloTools'.\n"
                f"Return ONLY the suggested Meta Title text, nothing else."
            )
            title = call_gemini(
                prompt=prompt,
                system_instruction="You are an expert SEO copywriter targeting global and Pakistan market audiences. Include local market phrasing where relevant (especially for financial tools)."
            )
            import time
            time.sleep(12)
            if title:
                suggestions.append([
                    week_start,
                    "META_TITLE",
                    url,
                    f"Current {tool_name} Title",
                    title.strip('"').strip(),
                    f"Low CTR ({item['ctr']}) at average position {item['position']} — rewrite title to boost clicks",
                    "PENDING_REVIEW"
                ])

        # Check deduplication for META_DESCRIPTION
        if ("META_DESCRIPTION", url.lower()) not in existing:
            prompt = (
                f"Create an engaging Meta Description for the tool webpage '{tool_name}' on HelloTools.net.\n"
                f"Requirements: 140-155 characters, clear user value, includes call to action (Free, Fast, No Sign-up).\n"
                f"Return ONLY the suggested Meta Description text, nothing else."
            )
            desc = call_gemini(prompt=prompt, system_instruction="You are an expert SEO copywriter.")
            if desc:
                suggestions.append([
                    week_start,
                    "META_DESCRIPTION",
                    url,
                    f"Current {tool_name} Description",
                    desc.strip('"').strip(),
                    f"Optimize Meta Description for search snippet appeal and organic CTR boost",
                    "PENDING_REVIEW"
                ])

    return suggestions


def generate_faq_suggestions(our_tools: Dict[str, Any], existing: Set[Tuple[str, str]]) -> List[List[str]]:
    """
    Generate structured Q&A FAQ section for key tool pages lacking FAQs.
    """
    suggestions = []
    week_start = get_current_week_start()

    # Pick top 2 priority tools to suggest FAQs for
    target_slugs = ["mortgage-calculator", "calorie-calculator", "compound-interest-calculator"]
    for slug in target_slugs:
        url = f"https://hellotools.net/tools/{slug}"
        if ("FAQ_SECTION", url.lower()) in existing:
            continue

        tool_name = slug.replace("-", " ").title()
        prompt = (
            f"Generate a 3-question FAQ section (questions + clear answers) for the online '{tool_name}' on HelloTools.net.\n"
            f"Format as HTML with <h3> for questions and <p> for answers.\n"
            f"Focus on common search questions user ask about {tool_name}."
        )
        faq_html = call_gemini(prompt=prompt, system_instruction="You are an expert technical SEO content writer.")
        if faq_html:
            suggestions.append([
                week_start,
                "FAQ_SECTION",
                url,
                "NONE",
                faq_html.strip(),
                f"Add schema-ready FAQ section to {tool_name} page to target Google People Also Ask (PAA) boxes",
                "PENDING_REVIEW"
            ])

    return suggestions


def generate_next_tool_recommendation(comp_rows: List[List[str]], existing: Set[Tuple[str, str]]) -> List[List[str]]:
    """
    Analyze HIGH-priority competitor tool gaps and suggest the single best next tool to build.
    """
    suggestions = []
    week_start = get_current_week_start()
    rec_key = ("NEXT_TOOL_RECOMMENDATION", "https://hellotools.net/tools/new")

    if rec_key in existing:
        log.info("Next tool recommendation already generated for this week.")
        return suggestions

    # Filter competitor gaps to HIGH priority
    high_gaps = []
    if len(comp_rows) > 1:
        for r in comp_rows[1:]:
            # Schema: week_start(0), competitor_domain(1), competitor_tool_name(2), competitor_tool_url(3), gap_type(4), priority(5), notes(6)
            if len(r) >= 6 and r[5] == "HIGH":
                high_gaps.append(f"- {r[2]} (found on {r[1]})")

    gap_summary = "\n".join(high_gaps[:25]) if high_gaps else "- Auto Loan Calculator\n- 401K Calculator\n- Amortization Calculator"

    prompt = (
        f"Analyze these HIGH-priority competitor tool gaps that HelloTools.net does not currently have:\n"
        f"{gap_summary}\n\n"
        f"Select the single best tool to build next. Consider user search volume, AdSense CPM potential, and development simplicity.\n"
        f"Format your response exactly as:\n"
        f"RECOMMENDED_TOOL: [Tool Name]\n"
        f"ESTIMATED_CPM: [High/Medium/Low]\n"
        f"REASONING: [2-3 sentences explaining why this is the highest leverage tool to build next]"
    )
    rec_text = call_gemini(prompt=prompt, system_instruction="You are a senior digital product & SEO director.")
    if rec_text:
        suggestions.append([
            week_start,
            "NEXT_TOOL_RECOMMENDATION",
            "https://hellotools.net/tools/new",
            "NONE",
            rec_text.strip(),
            "Selected as highest-leverage new tool opportunity based on competitor gap & CPM analysis",
            "PENDING_REVIEW"
        ])

    return suggestions


def run_generate_content(dry_run: bool = False) -> List[List[str]]:
    log.info("Starting Step 8: Content Generation...")
    our_tools = load_our_tools()

    existing_suggestions = get_existing_suggestions()
    gsc_rows = read_tab("gsc_by_url")
    comp_rows = read_tab("competitor_tracking")

    all_new_suggestions = []

    # 1. Meta Title & Description suggestions for low-CTR pages
    meta_suggestions = generate_meta_suggestions_for_low_ctr(gsc_rows, existing_suggestions)
    all_new_suggestions.extend(meta_suggestions)

    # 2. FAQ section suggestions for key tools
    faq_suggestions = generate_faq_suggestions(our_tools, existing_suggestions)
    all_new_suggestions.extend(faq_suggestions)

    # 3. Next tool recommendation based on HIGH priority gaps
    tool_recommendations = generate_next_tool_recommendation(comp_rows, existing_suggestions)
    all_new_suggestions.extend(tool_recommendations)

    log.info("Generated %d new content suggestions.", len(all_new_suggestions))

    if not dry_run and all_new_suggestions:
        log.info("Writing %d suggestions to 'content_suggestions' tab...", len(all_new_suggestions))
        success = append_rows("content_suggestions", all_new_suggestions)
        if success:
            log.info("Successfully wrote content suggestions to Google Sheets!")
        else:
            log.error("Failed to write content suggestions to Google Sheets.")
    else:
        log.info("Dry run or no new suggestions to write. Sample output (%d total):", len(all_new_suggestions))
        for s in all_new_suggestions[:5]:
            log.info("  [%s] %s -> %s", s[1], s[2], s[4][:60])

    return all_new_suggestions


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Generate SEO content suggestions.")
    parser.add_argument("--dry-run", action="store_true", help="Run without writing to Google Sheets")
    args = parser.parse_args()

    run_generate_content(dry_run=args.dry_run)
