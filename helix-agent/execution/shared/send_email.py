"""
shared/send_email.py
====================
Helix agent — Step 1 shared utility.
Sends an HTML email via Gmail SMTP using credentials from .env.

Usage (called by other scripts, not run directly):
    from shared.send_email import send_email

    success = send_email(
        subject="Helix Weekly Brief — HelloTools.net [Mon 4 Aug]",
        html_body="<h1>Hello</h1><p>This is the brief.</p>",
    )

    # With explicit plain text (optional — auto-generated if omitted):
    success = send_email(
        subject="...",
        html_body="<p>...</p>",
        text_body="Plain fallback text",
    )

Behaviour:
  - Loads GMAIL_ADDRESS, GMAIL_APP_PASSWORD, REPORT_EMAIL from .env
  - html_body is required; text_body is optional (auto-stripped from HTML if absent)
  - Sends a multipart/alternative email: text first, html second (standard MIME order)
  - Returns True on success, False on any failure
  - NEVER raises an unhandled exception — all errors are caught, logged, and return False
  - run_weekly.py can use the return value to log send outcome
"""

import os
import re
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from dotenv import load_dotenv

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [send_email] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("send_email")

# ── Load .env from helix-agent root (two levels up from this file) ────────────
_ROOT = Path(__file__).resolve().parent.parent.parent  # helix-agent/
load_dotenv(_ROOT / ".env")

# ── Gmail constants ───────────────────────────────────────────────────────────
_SMTP_HOST = "smtp.gmail.com"
_SMTP_PORT = 587


def _strip_html(html: str) -> str:
    """
    Convert HTML to plain text for the fallback MIME part.
    Strategy:
      1. Replace <br>, <br/>, </p>, </div>, </li> with newlines
      2. Strip all remaining tags
      3. Collapse multiple blank lines to max two
      4. Strip leading/trailing whitespace
    """
    # Block-level tags → newlines
    text = re.sub(r"<br\s*/?>", "\n", html, flags=re.IGNORECASE)
    text = re.sub(r"</(?:p|div|li|tr|h[1-6])>", "\n", text, flags=re.IGNORECASE)
    # Remove all remaining tags
    text = re.sub(r"<[^>]+>", "", text)
    # Decode common HTML entities
    text = text.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    text = text.replace("&nbsp;", " ").replace("&#39;", "'").replace("&quot;", '"')
    # Collapse excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def send_email(
    subject: str,
    html_body: str,
    text_body: str | None = None,
) -> bool:
    """
    Send an email via Gmail SMTP.

    Args:
        subject:   Email subject line.
        html_body: Full HTML string for the email body (required).
        text_body: Optional plain text fallback. If None, auto-generated
                   by stripping HTML tags from html_body.

    Returns:
        True  — email sent successfully.
        False — any error occurred (SMTP auth, network, config missing, etc.).
                The error is logged to console before returning False.
    """
    # ── Read credentials ──────────────────────────────────────────────────────
    gmail_address   = os.getenv("GMAIL_ADDRESS", "").strip()
    app_password    = os.getenv("GMAIL_APP_PASSWORD", "").strip()
    report_email    = os.getenv("REPORT_EMAIL", "").strip()

    # Validate — fail fast with a clear message, not a cryptic SMTP error
    missing = [k for k, v in {
        "GMAIL_ADDRESS":    gmail_address,
        "GMAIL_APP_PASSWORD": app_password,
        "REPORT_EMAIL":     report_email,
    }.items() if not v]

    if missing:
        log.error("Missing required .env keys: %s", ", ".join(missing))
        log.error("Check helix-agent/.env — see .env.example for template.")
        return False

    # ── Build MIME message ────────────────────────────────────────────────────
    plain_text = text_body if text_body is not None else _strip_html(html_body)

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = f"Helix Agent <{gmail_address}>"
    msg["To"]      = report_email

    # Attach plain text first (RFC 2046 — clients prefer the last part)
    msg.attach(MIMEText(plain_text, "plain", "utf-8"))
    msg.attach(MIMEText(html_body,  "html",  "utf-8"))

    # ── Send ──────────────────────────────────────────────────────────────────
    try:
        log.info("Connecting to %s:%d ...", _SMTP_HOST, _SMTP_PORT)
        with smtplib.SMTP(_SMTP_HOST, _SMTP_PORT, timeout=30) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(gmail_address, app_password)
            server.sendmail(
                from_addr=gmail_address,
                to_addrs=[report_email],
                msg=msg.as_string(),
            )

        log.info("Email sent successfully to %s | Subject: %s", report_email, subject)
        return True

    except smtplib.SMTPAuthenticationError as e:
        log.error("SMTP authentication failed. Check GMAIL_APP_PASSWORD in .env.")
        log.error("Detail: %s", str(e))
        return False

    except smtplib.SMTPConnectError as e:
        log.error("Could not connect to Gmail SMTP. Check network/firewall.")
        log.error("Detail: %s", str(e))
        return False

    except smtplib.SMTPException as e:
        log.error("SMTP error during send: %s", str(e))
        return False

    except OSError as e:
        # Catches socket timeouts, DNS failures, etc.
        log.error("Network/OS error sending email: %s", str(e))
        return False

    except Exception as e:  # noqa: BLE001 — intentional safety net
        log.error("Unexpected error in send_email: %s", str(e))
        return False


# ── Self-test (run this file directly to send a test email) ──────────────────
if __name__ == "__main__":
    TEST_HTML = """
    <html>
    <body style="font-family: monospace; background:#f5f5f5; padding:24px;">
        <h2 style="color:#1a3c5e;">Helix Agent — Test Email</h2>
        <p>If you received this, <strong>send_email.py is working correctly.</strong></p>
        <hr>
        <table style="border-collapse:collapse; width:100%;">
            <tr>
                <td style="padding:8px; border:1px solid #ddd;"><b>GMAIL_ADDRESS</b></td>
                <td style="padding:8px; border:1px solid #ddd;">{gmail}</td>
            </tr>
            <tr>
                <td style="padding:8px; border:1px solid #ddd;"><b>REPORT_EMAIL</b></td>
                <td style="padding:8px; border:1px solid #ddd;">{report}</td>
            </tr>
            <tr>
                <td style="padding:8px; border:1px solid #ddd;"><b>Step</b></td>
                <td style="padding:8px; border:1px solid #ddd;">Step 1 — send_email.py</td>
            </tr>
        </table>
        <p style="color:#888; font-size:12px; margin-top:24px;">
            Helix Agent for HelloTools.net &mdash; Step 1 verification
        </p>
    </body>
    </html>
    """.format(
        gmail=os.getenv("GMAIL_ADDRESS", "(not set)"),
        report=os.getenv("REPORT_EMAIL", "(not set)"),
    )

    print("Running send_email self-test...")
    result = send_email(
        subject="[Helix] Step 1 Test — send_email.py working",
        html_body=TEST_HTML,
    )

    if result:
        print("SUCCESS: Test email sent. Check your inbox.")
    else:
        print("FAILED: Email not sent. See error above.")
        raise SystemExit(1)
