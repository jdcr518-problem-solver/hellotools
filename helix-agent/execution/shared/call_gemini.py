"""
shared/call_gemini.py
=====================
Helix agent — Step 3 shared utility.
Calls Gemini REST API directly via HTTP requests (no gRPC/cygrpc DLL dependencies).

Usage:
    from execution.shared.call_gemini import call_gemini

    response_text = call_gemini(
        prompt="Analyze these 3 SEO titles...",
        system_instruction="You are an expert SEO strategist."
    )
"""

import os
import logging
from pathlib import Path
import requests
from dotenv import load_dotenv

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [call_gemini] %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("call_gemini")

# ── Load .env ─────────────────────────────────────────────────────────────────
_ROOT = Path(__file__).resolve().parent.parent.parent  # helix-agent/
load_dotenv(_ROOT / ".env")

_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"


def call_gemini(
    prompt: str,
    system_instruction: str | None = None,
    model_name: str | None = None,
    temperature: float = 0.7,
) -> str:
    """
    Call Gemini REST API with prompt and return text response.

    Args:
        prompt: Main user text prompt.
        system_instruction: Optional system instruction text.
        model_name: Model name override (defaults to GEMINI_MODEL in .env or 'gemini-1.5-flash').
        temperature: Sampling temperature (0.0 to 1.0).

    Returns:
        Generated text string response. Empty string if error occurs.
    """
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key or api_key == "FILL_ME":
        log.error("GEMINI_API_KEY is missing or invalid in .env")
        return ""

    model_id = model_name or os.getenv("GEMINI_MODEL", "gemini-1.5-flash").strip()
    url = f"{_API_BASE}/{model_id}:generateContent?key={api_key}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": temperature
        }
    }

    if system_instruction:
        payload["systemInstruction"] = {
            "parts": [
                {"text": system_instruction}
            ]
        }

    try:
        max_retries = 3
        for attempt in range(max_retries):
            log.info("Calling Gemini REST API (%s)... [Attempt %d]", model_id, attempt + 1)
            resp = requests.post(url, json=payload, timeout=60)
            
            if resp.status_code == 429:
                log.warning("Gemini 429 Rate Limit (Free tier 5 RPM). Pausing 20s before retry...")
                import time
                time.sleep(20)
                continue
            
            if resp.status_code != 200:
                log.error("Gemini API HTTP Error %d: %s", resp.status_code, resp.text)
                return ""

            data = resp.json()
            candidates = data.get("candidates", [])
            if not candidates:
                log.warning("No candidates returned from Gemini API.")
                return ""

            parts = candidates[0].get("content", {}).get("parts", [])
            text_result = "".join(p.get("text", "") for p in parts).strip()

            log.info("Received response (%d chars)", len(text_result))
            return text_result

        log.error("Gemini API call failed after %d retries.", max_retries)
        return ""

    except requests.exceptions.RequestException as err:
        log.error("HTTP Request Error calling Gemini API: %s", str(err))
        return ""
    except Exception as err:
        log.error("Unexpected error in call_gemini: %s", str(err))
        return ""


# ── Self-test ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("Testing call_gemini.py via REST API...")
    test_prompt = "Respond with 'GEMINI_OK' and one sentence explaining what HelloTools.net does."
    res = call_gemini(prompt=test_prompt)
    print("\nResult from Gemini:")
    print(res)
    if "GEMINI_OK" in res or len(res) > 0:
        print("\nSUCCESS: call_gemini.py verified end-to-end!")
    else:
        print("\nFAILED: call_gemini.py returned empty output.")
