# Helix — Autonomous Site Agent for HelloTools.net
### Full Specification & Brainstorm Brief

---

## Context

The client owns **HelloTools.net** — a multi-tool website (~70+ tools) built around 1–2 months ago.
Goal: drive organic traffic, pass AdSense approval, and reach $500+/month passive revenue within 12 months.

The client uses **Antigravity** as the agentic coding tool for all implementation.
The client acts as **strategic approver** — reviews plans, approves builds, verifies output.

This document is the brainstorm brief. Read it fully, then propose:
- Any tasks or capabilities I may have missed
- The best folder structure and file names
- Which Python libraries to use for each task
- Any risks or blockers you foresee
- Any questions you need answered before building

---

## Architecture — 3-Layer System

This agent follows the 3-layer architecture defined in AGENTS.md:

| Layer | What it is | Lives in |
|---|---|---|
| Layer 1 — Directive | Plain-English SOPs in Markdown | `directives/` |
| Layer 2 — Orchestration | Antigravity reads directives and routes execution | (you, the agent) |
| Layer 3 — Execution | Deterministic Python scripts | `execution/` |

**Core principle:** The AI never calls APIs directly during a run. It reads directives and calls scripts. Scripts touch the internet. This keeps errors isolated and the system self-healable.

---

## Project Location

```
hellotools.net/
  helix-agent/        ← the agent lives here
    directives/
    execution/
    .tmp/
    .env
    credentials.json
    token.json
```

---

## Tech Stack (all free)

| Purpose | Tool | Notes |
|---|---|---|
| AI brain / analysis | **Gemini 1.5 Flash** | Free tier — 1M tokens/day |
| Rankings & traffic data | **Google Search Console API** | Free |
| Performance data | **PageSpeed Insights API** | Free |
| Data storage | **Google Sheets API** | Free — permanent history |
| Scheduler | **GitHub Actions** | Free — cron, runs on their servers |
| Reporting output | **Gmail SMTP** | Free — Gmail App Password |
| Competitor SERP data | **Playwright scraping** | Free |
| Auth / OAuth | **Google OAuth 2.0** | credentials.json + token.json |

**No paid services. No Railway. No Telegram. Email only.**

---

## Environment Variables (.env)

```env
# Google OAuth
GOOGLE_CREDENTIALS_PATH=./credentials.json
GOOGLE_TOKEN_PATH=./token.json

# Google Search Console
GSC_SITE_URL=https://hellotools.net/

# Google Sheets
SPREADSHEET_ID=your_sheet_id_from_url

# Gemini API
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash

# Gmail
GMAIL_ADDRESS=your@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
REPORT_EMAIL=your@gmail.com

# PageSpeed
PAGESPEED_API_KEY=your_google_api_key
```

---

## Credentials Needed (with where to get them)

| Credential | Where to get it |
|---|---|
| `credentials.json` | console.cloud.google.com → OAuth 2.0 → Desktop app |
| `GEMINI_API_KEY` | aistudio.google.com |
| `GMAIL_APP_PASSWORD` | myaccount.google.com → Security → App Passwords |
| `SPREADSHEET_ID` | From the Google Sheets URL |
| `PAGESPEED_API_KEY` | console.cloud.google.com → API key |

APIs to enable in Google Cloud Console:
- Google Search Console API
- Google Sheets API
- PageSpeed Insights API

---

## Full Task List (26 tasks)

### Site Health
1. Check every calculator with known test inputs — verify outputs are mathematically correct
2. Detect broken pages (404s, crashes, blank outputs)
3. Check all tool pages load without JavaScript errors
4. Monitor Core Web Vitals (LCP, INP, CLS) per tool page via PageSpeed API

### SEO & Rankings
5. Pull weekly clicks, impressions, CTR, and average position from GSC for every tool page
6. Flag any page that dropped 3+ positions compared to last week
7. Identify pages with high impressions but low CTR (title tag opportunity)
8. Identify keywords ranking in position 6–15 (almost ranking — quick wins)
9. Check for new index coverage errors (noindex, crawl blocks, redirect issues)

### Competitor Intelligence
10. Search Google for top 20 tool keywords — record who ranks in positions 1–5
11. Visit each top-ranking competitor tool page — capture title, meta description, page structure
12. Detect tools competitors have that HelloTools.net does not — flag as build opportunity
13. Compare Core Web Vitals: competitor LCP vs our LCP on the same keyword
14. Track week-over-week competitor position movement — flag if a competitor jumps above us

### Content
15. Generate updated meta title and description for low-CTR pages
16. Generate FAQ section for tool pages that don't have one
17. Suggest next tool to build based on search volume, CPM potential, and competitor gap

### Backlinks
18. Log new backlinks acquired this week
19. Flag previously acquired backlinks now returning 404 on our side

### Revenue
20. Track AdSense RPM and total earnings week over week
21. Identify which tool categories earn the most per session
22. Flag pages with low ad viewability

### Reporting
23. Write all raw data to Google Sheets — one row per week, permanent history
24. Generate a plain-English brief using Gemini summarising all findings above
25. Send the brief to Gmail every Monday morning (formatted HTML email)
26. Send an immediate email alert for any P0 issue — broken tool, traffic drop >30%, site down, competitor taking our #1 keyword

---

## Agent Behaviour Rules

- **Directive-follower:** Helix never improvises. It reads the SOP and follows it. The client controls behaviour by editing markdown files.
- **Self-annealing:** When a script breaks, Helix reads the error, fixes the script, tests it, then updates the directive. Same error never happens twice.
- **Silent unless useful:** On a normal week, exactly one email goes out — the Monday brief. No noise, no mid-week pings.
- **P0 bypasses the schedule:** Broken calculator, site down, traffic drop >30% → immediate email regardless of day or time.
- **Always ends with one action:** Every brief ends with a single highest-leverage recommended action. Not a list — one thing.
- **Never commits secrets:** .env, credentials.json, token.json always in .gitignore.
- **Scripts are reusable:** write_to_sheets.py, send_email.py, and call_gemini.py are generic and called by every other script that needs them.

---

## Sample Monday Email Brief (expected output format)

```
Subject: Helix Weekly Brief — HelloTools.net [Mon 4 Aug]

TRAFFIC SUMMARY
Clicks this week: 1,240 (+18% vs last week)
Impressions: 48,300

TOP MOVER
/tools/bmi-calculator: position 14 → 7 ✅

WATCH LIST
/tools/loan-calculator: position 4 → 8 ⚠️
(possible new competitor — check manually)

TOOL HEALTH
All 71 tools passing ✅
No broken calculators detected

PERFORMANCE
/tools/age-calculator LCP = 3.1s (above 2.5s threshold) ⚠️

COMPETITOR ALERT
calculator.net added a "Currency Converter" tool this week
HelloTools does not have this — flagged as build opportunity

THIS WEEK'S ACTION
Rewrite meta title on /tools/loan-calculator to include "Pakistan".
You are losing ground to a local competitor on this keyword.
Takes 2 minutes. High impact.
```

---

## What I Need From You (Antigravity)

Before writing a single line of code, please:

1. **Confirm the folder structure** — list every file and folder you plan to create with a one-line description of each
2. **Confirm the Python libraries** — for each execution script, name the libraries you'll use and why
3. **Identify any gaps** — are there tasks in the list above that need clarification before you can build them?
4. **Flag any risks** — are there API limitations, auth flows, or scraping edge cases I should know about upfront?
5. **Propose the GitHub Actions .yml** — show me the cron schedule and workflow structure before building it
6. **Ask any questions** — do not start building until you and I are aligned on the full plan

The goal of this conversation is alignment, not code. Once we agree on the plan, we build one script at a time starting with `scrape_gsc.py`.