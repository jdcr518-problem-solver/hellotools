# Helix — What It Does and Doesn't Do

> Last updated: August 2026  
> Status: **LIVE on GitHub Actions** ✅ *(see deployment note at bottom)*

---

## Is Helix Live?

**Partially.** The code is fully built, tested locally, and the two GitHub Actions workflows are committed to `main`:

| Workflow | Schedule | Status |
|---|---|---|
| `helix_weekly.yml` | Every Monday at 06:00 UTC (11:00 AM PKT) | ✅ Deployed |
| `helix_p0.yml` | Every day at 08:00 UTC (1:00 PM PKT) | ✅ Deployed |

> **⚠️ Before the first GitHub Actions run will succeed**, you must add these secrets to your GitHub repo settings (`Settings → Secrets → Actions`):
>
> | Secret | Value |
> |---|---|
> | `GMAIL_ADDRESS` | Your Gmail address |
> | `GMAIL_APP_PASSWORD` | Gmail App Password |
> | `REPORT_EMAIL` | Email to receive reports |
> | `SPREADSHEET_ID` | Google Sheets ID |
> | `GEMINI_API_KEY` | Gemini API key |
> | `PAGESPEED_API_KEY` | PageSpeed Insights API key |
> | `GOOGLE_CREDENTIALS_JSON` | Full contents of `credentials.json` |
> | `GOOGLE_TOKEN_JSON` | Full contents of `token.json` |
>
> Without these secrets, the Actions run will fail on the first step. **Locally, Helix runs successfully today.**

---

## ✅ What Helix DOES

### 📊 Data Collection (Weekly, every Monday)

| Capability | Script | Data Stored In |
|---|---|---|
| Pull 7-day clicks, impressions, CTR, and average position per tool URL from Google Search Console | `scrape_gsc.py` | `gsc_by_url` tab |
| Detect pages that dropped 3+ positions vs previous week | `scrape_gsc.py` | `gsc_by_url` (flag_drop column) |
| Identify quick-win pages ranking at position 6–15 | `scrape_gsc.py` | `gsc_by_url` (flag_quick_win column) |
| Flag pages with high impressions but low CTR (title tag opportunity) | `scrape_gsc.py` | `gsc_by_url` (flag_low_ctr column) |
| Run mobile + desktop PageSpeed audit via API for all 67 tools (LCP, INP, CLS, performance score) | `check_pagespeed.py` | `pagespeed` tab |
| Smoke-test all 67 calculator tools with Playwright: HTTP status, JS errors, math output validation | `check_site_health.py` | `site_health` tab |
| Scrape 5 competitor tool directories for gap analysis (tools they have that HelloTools does not) | `scrape_competitors.py` | `competitor_tracking` tab |
| Classify competitor gaps as HIGH / MEDIUM / LOW priority (financial and health = HIGH) | `scrape_competitors.py` | `competitor_tracking` tab |
| Exclude prohibited tool categories from gap analysis (e.g. BAC, drug, suicide, abortion) | `scrape_competitors.py` | — |
| Generate SEO content suggestions (meta titles, descriptions, FAQs) for low-CTR pages via Gemini | `generate_content.py` | `content_suggestions` tab |
| Generate next-tool recommendation based on HIGH priority competitor gaps | `generate_content.py` | `content_suggestions` tab |

### 📝 Reporting (Weekly, every Monday)

| Capability | Script | Output |
|---|---|---|
| Write executive Monday brief summarising all data (traffic, health, competitors, content) | `generate_brief.py` | `.tmp/weekly_brief.txt` |
| Brief always ends with exactly **one** recommended action (never a list) | `generate_brief.py` | — |
| Append one summary row per week to permanent history | `generate_brief.py` | `weekly_summary` tab |
| Send formatted HTML email to `jdcr518@gmail.com` every Monday | `send_weekly_email.py` | Gmail inbox |
| Strip markdown syntax before sending (clean plain-text email body) | `send_weekly_email.py` | — |

### 🚨 P0 Monitoring (Daily)

| Capability | Script | Output |
|---|---|---|
| Ping `https://hellotools.net/` and check for HTTP 200 | `p0_monitor.py` | `p0_log` tab |
| Monitor GSC organic traffic for >30% drop vs previous 7 days | `p0_monitor.py` | `p0_log` tab |
| Check `competitor_tracking` tab for any new P0 keyword flags | `p0_monitor.py` | `p0_log` tab |
| Send immediate email alert with subject `HELIX P0 ALERT — [type] — HelloTools.net` if any check fails | `p0_monitor.py` | Gmail inbox |
| Exit silently with no email when all checks pass (no noise on clean runs) | `p0_monitor.py` | `p0_log` tab |

### 🛡️ Fault Tolerance

| Capability | Where |
|---|---|
| Each weekly pipeline step is wrapped in try/except — one failure does not abort the whole run | `run_weekly.py` |
| If `generate_brief.py` fails and brief file is missing, email step is skipped with clear log message | `run_weekly.py` |
| Gemini API 429 rate limit (5 RPM free tier) is automatically retried with 20s pause | `shared/call_gemini.py` |
| Console run summary printed after every pipeline run showing each script's pass/fail and runtime | `run_weekly.py` |
| Dry-run mode available: `python execution/run_weekly.py --dry-run` (no live writes, no emails sent) | `run_weekly.py` |

---

## ❌ What Helix DOES NOT Do

### Monitoring Gaps (Not Built)

| Capability | Reason Not Built |
|---|---|
| Backlink tracking (new links acquired, lost links returning 404) | No free backlink API available without billing |
| Competitor SERP rank tracking (who ranks #1–5 on specific keywords) | Requires paid Search API (Brave/Custom Search) — dropped due to billing restrictions |
| Comparing our Core Web Vitals directly against competitor pages | Not in current scope |
| Detecting GSC index coverage errors (noindex, crawl blocks, redirect loops) | GSC Coverage API requires additional OAuth scope; not implemented |
| Monitoring specific keyword positions over time (keyword-level, not page-level) | GSC API returns page-level aggregates; keyword-level is a separate query not implemented |

### Revenue & AdSense

| Capability | Reason Not Built |
|---|---|
| Tracking AdSense RPM and total earnings week-over-week | No AdSense API integration built |
| Identifying which tool categories earn the most per session | Requires AdSense + Analytics integration |
| Flagging pages with low ad viewability | Requires AdSense API |

### Content & Code Actions

| Capability | Reason Not Built |
|---|---|
| Auto-fixing broken calculator logic or React component bugs | Helix alerts — it does not self-modify production code |
| Auto-publishing generated meta titles / descriptions to the live site | Content suggestions are written to Sheets only; a human approves before shipping |
| Generating new tool components from scratch | Outside Helix scope — that is Antigravity's job |
| Writing to `db.json` or any source files automatically | Helix does not touch application source code |

### Infrastructure Limitations

| Limitation | Detail |
|---|---|
| Runs on cron schedule only — not continuously | Monday weekly pipeline + daily P0. Nothing in between. |
| GitHub Actions cron is not guaranteed real-time | GitHub may delay execution by up to 10 minutes under high load |
| Mid-week emails | By design — one Monday brief only, plus P0 alerts. No noise. |
| Self-healing broken scripts without human review | Helix logs errors; a human reads the summary and decides whether to fix |

---

## Competitors Helix Tracks

| Competitor | Method |
|---|---|
| `calculator.net` | HTML sitemap scrape |
| `rapidtables.com` | HTML link scrape |
| `calculatorsoup.com` | HTML link scrape |
| `omnicalculator.com` | XML sitemap scrape |
| `gigacalculator.com` | Playwright JS-rendered page scrape |

---

## Google Sheets Data Store

| Tab | Content | Retention |
|---|---|---|
| `gsc_by_url` | Weekly GSC rankings and traffic per tool URL | Permanent |
| `pagespeed` | Mobile + desktop Core Web Vitals per tool | Permanent |
| `site_health` | Playwright smoke test results per tool | Permanent |
| `competitor_tracking` | Competitor tool gap analysis | Permanent |
| `content_suggestions` | Gemini-generated SEO suggestions | Permanent, status tracked |
| `weekly_summary` | One-row weekly executive summary | Permanent |
| `p0_log` | Daily P0 check results | Permanent |

---

## Quick Reference Commands

```bash
# Run full pipeline locally (live writes, live email)
python execution/run_weekly.py

# Dry-run (no Sheets writes, no email sent)
python execution/run_weekly.py --dry-run

# Run P0 health check once
python execution/p0_monitor.py

# Reset all Sheets tab headers
python execution/init_sheets.py

# Run site health check (3 sample tools)
python execution/check_site_health.py

# Run site health check (all 67 tools)
python execution/check_site_health.py --full
```
