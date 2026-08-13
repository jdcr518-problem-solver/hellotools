# Helix — Founder''s Learning Guide
> Written for: Mani (the founder who built this without fully understanding it yet)
> Goal: Understand your own system from scratch, one part at a time.
> Format: Read each Part → Signal "next" → I append the next Part.

---

# PART 1 — The Big Idea (No Code Yet)

## What problem were we solving?

You run a website called **HelloTools.net**.

It has ~67 free online tools (EMI calculator, BMI calculator, age calculator, etc.).

Your business goal is simple:
> Get more people to find these tools on Google → they use them → you grow.

But here is the real problem:

Every week, things happen that you need to know about:

| What can happen | Why it matters |
|---|---|
| Your Google rankings drop | Fewer people find you |
| A competitor builds a similar tool | They steal your traffic |
| One of your tools breaks (wrong answer) | Users lose trust |
| Your site becomes slow | Google penalises you |
| A page title is bad | Low click rate from Google |

Before Helix, you had to check all of this **manually**. Every week. By hand. That is:
- Logging into Google Search Console
- Running PageSpeed tests one by one
- Googling competitors
- Testing every tool yourself

That takes hours. And if you are busy? You skip it. Then problems pile up silently.

---

## What is Helix?

**Helix is your automated eyes and ears.**

It is a set of Python programs that run automatically, check everything for you, and send you a summary email every Monday morning.

Think of it like a member of staff who works every Monday, checks your entire business, writes a one-page report, and emails it to you — before you even wake up.

Helix does not fix problems. It **finds** them and **tells you** about them.

---

## The two jobs Helix does

### Job 1 — The Weekly Report (every Monday at 11 AM PKT)
Helix runs a full inspection of your business:
1. Checks your Google Search traffic this week vs last week
2. Checks how fast each tool page loads on mobile
3. Tests your 3 most important tools to see if they give correct answers
4. Scans 5 competitor websites to see what tools they just built
5. Identifies your worst-performing pages and suggests content to fix them
6. Feeds all of this to an AI (Gemini) which writes a one-page executive brief
7. Emails that brief to you

### Job 2 — The Daily P0 Alert (every day at 1 PM PKT)
Helix runs a quick health check:
1. Pings your website — is it up?
2. Checks if Google traffic dropped more than 30% in one week
3. Checks if a competitor launched a critical new tool

If everything is fine → logs "P0 clear" silently. No email. No noise.
If anything is wrong → sends you an immediate red-alert email within seconds.

---

## The mental model: A factory with conveyor belts

Imagine Helix as a **factory** that runs every Monday.

```
RAW MATERIALS                MACHINES                    FINISHED PRODUCT
─────────────                ────────                    ────────────────
Internet data  ──────────►  Python scripts  ──────────►  Email in your inbox
(Google, your               (collect, check,             (weekly brief +
 competitors,                store, analyse)              one recommendation)
 PageSpeed API)
                                    │
                                    ▼
                            Google Sheets
                            (your data warehouse
                             — stores everything
                              week by week)
```

Data flows in one direction:
**Internet → Python Scripts → Google Sheets → Gemini AI → Your Email**

Nothing flows backwards. Each script does one job, hands off to the next.

---

## Where does all this live?

Everything is inside the helix-agent/ folder in your project.

```
helix-agent/
│
├── execution/          ← All the Python scripts (the "machines")
├── directives/         ← Config files (settings and rules)
├── .env                ← Your secret keys (API passwords)
├── credentials.json    ← Google login file
├── token.json          ← Google session file
└── requirements.txt    ← List of tools Python needs to install
```

And the **schedule** that runs everything automatically lives in:
```
.github/workflows/
├── helix_weekly.yml    ← Runs every Monday
└── helix_p0.yml        ← Runs every day
```

---

## What you just learned

- Helix solves the problem of manually monitoring your website every week
- It has two jobs: weekly report + daily health check
- Data flows: Internet → Python → Sheets → AI → Your Email
- Everything lives in helix-agent/execution/
- The schedule lives in GitHub Actions (.github/workflows/)

---

> ✅ Part 1 complete.
> When you are ready to go deeper, say "next".
> Part 2 will cover: How GitHub Actions works as the "alarm clock" that starts Helix every week — and how to read a .yml file.


---

# PART 2 — The Alarm Clock (GitHub Actions + Reading a .yml File)

## First: What is GitHub Actions?

GitHub is where your code lives online (like a cloud hard drive for code).

GitHub Actions is a feature built into GitHub that says:
> "At a certain time, or when something happens, run these instructions on a cloud computer."

Think of it exactly like setting an alarm on your phone:
- You set the time (Monday 11 AM)
- The alarm fires
- A cloud computer wakes up, downloads your code, runs it, and shuts down

You do not need your laptop to be on. GitHub''s servers do all the work.

---

## What is a .yml file?

A `.yml` file (called "YAML") is just an **instruction sheet** written in a very structured way.

It tells GitHub Actions:
1. When to wake up
2. What kind of computer to use
3. What steps to run — in order, from top to bottom

That is it. There is no magic. It is a numbered to-do list for a cloud computer.

---

## Reading helix_p0.yml line by line

Here is your actual daily P0 monitor file. I will annotate every line in plain English:

```yaml
name: Helix P0 Critical Alert Monitor
```
👆 This is just the display name you see in GitHub Actions tab. Like labelling a file.

---

```yaml
on:
  schedule:
    - cron: '0 8 * * *'
  workflow_dispatch:
```
👆 This says: **WHEN should this run?**

- `schedule:` — run on a timer
- `cron: '0 8 * * *'` — this is the timer setting (explained below)
- `workflow_dispatch:` — also let me trigger it manually from the GitHub website

### What is a cron expression?

`'0 8 * * *'` looks cryptic but follows a simple pattern:

```
┌─── minute (0-59)
│  ┌─── hour in UTC (0-23)
│  │  ┌─── day of month (1-31)
│  │  │  ┌─── month (1-12)
│  │  │  │  ┌─── day of week (0=Sun, 1=Mon ... 6=Sat)
│  │  │  │  │
0  8  *  *  *
```

So `0 8 * * *` means:
- Minute 0 (on the hour exactly)
- Hour 8 UTC = 1 PM PKT
- Every day of every month of every weekday

The `*` means "every". So `* * *` = every day, every month, every weekday.

---

```yaml
jobs:
  run-p0-monitor:
    runs-on: ubuntu-22.04
```
👆 This says: **WHAT computer to use?**

- `jobs:` — here is the actual work to do
- `run-p0-monitor:` — a name for this job (just a label)
- `runs-on: ubuntu-22.04` — use a Linux computer (Ubuntu version 22.04) on GitHub''s servers

You never see this computer. It appears, does its job, and disappears.

---

```yaml
    steps:
```
👆 Everything after this is a numbered to-do list. Steps run **in order, top to bottom**.
If one step fails, GitHub stops there and marks the whole run as failed.

---

### Step 1 — Get the code
```yaml
      - name: Checkout Repository
        uses: actions/checkout@v4
```
👆 The cloud computer starts empty. This step downloads your entire GitHub repo (all your code) onto it.
`uses:` means "use a pre-built action that GitHub wrote". `actions/checkout@v4` is GitHub''s own copy-code tool.

---

### Step 2 — Install Python
```yaml
      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
```
👆 The cloud computer does not have Python pre-installed. This installs Python 3.11.
`with:` means "pass these settings to the tool above".

---

### Step 3 — Install Python libraries
```yaml
      - name: Install Python Dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r helix-agent/requirements.txt
```
👆 Python alone cannot do everything. It needs extra tools (libraries).
`run:` means "run these shell commands directly in the terminal".
- `pip` is Python''s package manager (like an app store for Python libraries)
- `requirements.txt` is the shopping list of libraries Helix needs (requests, google-api, etc.)

---

### Step 4 — Create the .env secrets file
```yaml
      - name: Create .env File from Secrets
        env:
          GMAIL_ADDRESS: ${{ secrets.GMAIL_ADDRESS }}
          ...
        run: |
          echo "GMAIL_ADDRESS=$GMAIL_ADDRESS" >> .env
```
👆 Your API keys and passwords live in GitHub Secrets (encrypted, not visible in code).
This step pulls them out of GitHub Secrets and writes them into a `.env` file so Python can read them.
`${{ secrets.GMAIL_ADDRESS }}` = "fetch the value of the GMAIL_ADDRESS secret from GitHub".

---

### Step 5 — Restore Google login files
```yaml
      - name: Restore OAuth Credentials & Token
        env:
          GOOGLE_CREDENTIALS_JSON: ${{ secrets.GOOGLE_CREDENTIALS_JSON }}
          GOOGLE_TOKEN_JSON: ${{ secrets.GOOGLE_TOKEN_JSON }}
        run: |
          printf '%s' "$GOOGLE_CREDENTIALS_JSON" > credentials.json
          printf '%s' "$GOOGLE_TOKEN_JSON" > token.json
```
👆 Google requires a login "passport" to access your Search Console and Sheets data.
These are stored as secrets in GitHub and written to files (`credentials.json`, `token.json`).
Without these, Python cannot talk to Google.

---

### Step 6 — Run the actual Python script
```yaml
      - name: Run Helix Daily P0 Monitor
        run: |
          cd helix-agent
          python execution/p0_monitor.py
```
👆 After all the setup above, this is the one line that actually does the work.
- `cd helix-agent` = go into the helix-agent folder
- `python execution/p0_monitor.py` = run the Python file called p0_monitor.py

Everything before this was just preparation. This is where Helix actually wakes up.

---

## The pattern to remember

Every GitHub Actions workflow follows this same pattern:

```
1. Get the code        (checkout)
2. Set up the tools    (python, pip)
3. Set up secrets      (.env, credentials)
4. Run your script     (python yourfile.py)
```

Once you understand this pattern, you can read any workflow file in the world.

---

## What you just learned

- GitHub Actions is the alarm clock that triggers Helix automatically
- A `.yml` file is just an instruction sheet — a numbered to-do list for a cloud computer
- Cron expressions set the exact time: `0 8 * * *` = every day at 8 AM UTC
- Steps run top to bottom; if one fails, everything stops
- The actual Python script only runs in the very last step — everything before is setup

---

> ✅ Part 2 complete.
> When you are ready, say "next".
> Part 3 will cover: The Google Sheets warehouse — why Helix stores data there, what each tab means, and how Python reads and writes to it.
