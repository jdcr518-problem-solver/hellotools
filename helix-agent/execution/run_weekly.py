"""
execution/run_weekly.py
=======================
Helix agent — Step 10 master weekly orchestrator.
Runs the complete Monday execution pipeline in order:
  1. scrape_gsc.py
  2. check_pagespeed.py
  3. check_site_health.py
  4. scrape_competitors.py
  5. generate_content.py
  6. generate_brief.py
  7. send_weekly_email.py

Fault Tolerance:
  - Each step is wrapped in try/except. If a step fails, the failure is logged and execution continues.
  - If generate_brief.py fails and .tmp/weekly_brief.txt is missing, send_weekly_email.py is skipped.
  - Supports --dry-run flag for dry run testing without writing to Sheets or sending emails.

Summary:
  - Prints a clean formatted summary at the end showing each script name, pass/fail status, and runtime in seconds.
"""

import os
import sys
import time
import logging
import argparse
import datetime
from pathlib import Path
from typing import Tuple
from dotenv import load_dotenv

# Ensure helix-agent root is in sys.path
BASE_DIR = Path(__file__).parent.parent
sys.path.insert(0, str(BASE_DIR))

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [run_weekly] %(levelname)s: %(message)s")
log = logging.getLogger("run_weekly")

# Load environment
load_dotenv(dotenv_path=BASE_DIR / ".env")


def run_script_step(script_name: str, step_fn, dry_run: bool) -> Tuple[bool, float, str]:
    """
    Executes a step function, measures runtime in seconds, and catches exceptions.
    Returns (success_boolean, elapsed_seconds, error_message).
    """
    log.info("Starting step: %s (dry_run=%s)...", script_name, dry_run)
    t0 = time.time()
    try:
        step_fn(dry_run=dry_run)
        elapsed = time.time() - t0
        log.info("Step %s COMPLETED in %.2fs.", script_name, elapsed)
        return True, elapsed, ""
    except Exception as e:
        elapsed = time.time() - t0
        err_msg = str(e)
        log.error("Step %s FAILED in %.2fs: %s", script_name, elapsed, err_msg)
        return False, elapsed, err_msg


def step_scrape_gsc(dry_run: bool):
    from execution.scrape_gsc import run_scrape_gsc
    run_scrape_gsc()


def step_check_pagespeed(dry_run: bool):
    from execution.check_pagespeed import run_check_pagespeed
    run_check_pagespeed(full_run=not dry_run)


def step_check_site_health(dry_run: bool):
    from execution.check_site_health import run_check_site_health
    run_check_site_health(full_run=not dry_run)


def step_scrape_competitors(dry_run: bool):
    from execution.scrape_competitors import run_competitor_scrape
    run_competitor_scrape(dry_run=dry_run)


def step_generate_content(dry_run: bool):
    from execution.generate_content import run_generate_content
    run_generate_content(dry_run=dry_run)


def step_generate_brief(dry_run: bool):
    from execution.generate_brief import generate_monday_brief
    generate_monday_brief(dry_run_sheet=dry_run)


def step_send_weekly_email(dry_run: bool):
    brief_file = BASE_DIR / ".tmp" / "weekly_brief.txt"
    if not brief_file.exists():
        raise FileNotFoundError(".tmp/weekly_brief.txt missing because generate_brief.py failed or was skipped")
    
    if dry_run:
        log.info("[DRY RUN] Skipping live email sending. Brief text present at %s", brief_file)
        return

    from execution.send_weekly_email import send_weekly_brief_email
    success = send_weekly_brief_email()
    if not success:
        raise RuntimeError("Failed to deliver weekly brief email via SMTP")


def run_weekly_pipeline(dry_run: bool = False):
    log.info("============================================================")
    log.info("Helix Agent — Master Weekly Orchestrator (dry_run=%s)", dry_run)
    log.info("============================================================")
    
    t_start = time.time()

    pipeline_steps = [
        ("scrape_gsc.py",         step_scrape_gsc),
        ("check_pagespeed.py",     step_check_pagespeed),
        ("check_site_health.py",   step_check_site_health),
        ("scrape_competitors.py",  step_scrape_competitors),
        ("generate_content.py",    step_generate_content),
        ("generate_brief.py",      step_generate_brief),
        ("send_weekly_email.py",   step_send_weekly_email),
    ]

    results = []
    passed_count = 0

    for script_name, step_fn in pipeline_steps:
        success, elapsed, err_msg = run_script_step(script_name, step_fn, dry_run=dry_run)
        results.append({
            "name": script_name,
            "success": success,
            "elapsed": elapsed,
            "error": err_msg
        })
        if success:
            passed_count += 1

    total_time = time.time() - t_start

    # Format Console Run Summary (ASCII-safe for Windows PowerShell cp1252)
    summary_lines = []
    summary_lines.append("")
    summary_lines.append("== Helix Weekly Run Summary ==")
    for r in results:
        status_icon = "[OK]" if r["success"] else "[FAIL]"
        line = f"{r['name']:<24} {status_icon:6s} {r['elapsed']:5.1f}s"
        if not r["success"]:
            line += f"  (Error: {r['error'][:40]})"
        summary_lines.append(line)
    
    summary_lines.append(f"Total: {total_time:.1f}s | {passed_count}/{len(pipeline_steps)} passed")
    summary_lines.append("")

    summary_text = "\n".join(summary_lines)
    print(summary_text)

    return passed_count == len(pipeline_steps)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Helix Agent Master Weekly Orchestrator.")
    parser.add_argument("--dry-run", action="store_true", help="Run pipeline in dry-run mode without modifying live data or calling external APIs")
    args = parser.parse_args()

    run_weekly_pipeline(dry_run=args.dry_run)
