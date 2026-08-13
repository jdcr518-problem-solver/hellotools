/**
 * HelloTools — Translation Loading Utilities
 *
 * Server-side utility for loading locale translation files.
 * Client Components should receive translation strings as props —
 * they should NOT import this module directly (to avoid bundling all locale files).
 *
 * Architecture:
 *   Server Component (layout/page)
 *     └── loadTranslations('es')
 *           └── passes result as prop/context to Client Components
 *
 * Translation keys use dot notation: "tool.calculate", "footer.privacy", etc.
 * Missing keys fall back gracefully to the English string, then the key itself.
 */

import { Locale, DEFAULT_LOCALE } from './i18n';

// Static imports — all locale files are bundled server-side only.
// Client Components should not import this module.
import enStrings from '@/locales/en/common.json';
import esStrings from '@/locales/es/common.json';
import deStrings from '@/locales/de/common.json';
import frStrings from '@/locales/fr/common.json';
import ptStrings from '@/locales/pt/common.json';
import jaStrings from '@/locales/ja/common.json';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type TranslationDict = typeof enStrings;

// ─────────────────────────────────────────────────────────────────────────────
// LOCALE STRING MAP
// ─────────────────────────────────────────────────────────────────────────────

const LOCALE_STRINGS: Record<Locale, TranslationDict> = {
  en: enStrings,
  es: esStrings,
  de: deStrings,
  fr: frStrings,
  pt: ptStrings,
  ja: jaStrings,
};

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the full translation dictionary for a given locale.
 * Automatically falls back to English if the locale is unknown.
 */
export function loadTranslations(locale: Locale | string): TranslationDict {
  if (locale in LOCALE_STRINGS) {
    return LOCALE_STRINGS[locale as Locale];
  }
  return LOCALE_STRINGS[DEFAULT_LOCALE];
}

/**
 * Resolves a dot-notation key against a translation dictionary.
 * Falls back to: locale string → English string → key itself.
 *
 * @example
 *   const dict = loadTranslations('es');
 *   t(dict, 'tool.calculate') → "Calcular"
 *   t(dict, 'tool.calculate', enStrings) → "Calcular" (or "Calculate" if missing in es)
 */
export function t(
  dict: TranslationDict,
  key: string,
  fallbackDict?: TranslationDict
): string {
  const resolved = resolveDotKey(dict, key);
  if (resolved !== undefined) return resolved;

  if (fallbackDict) {
    const fallback = resolveDotKey(fallbackDict, key);
    if (fallback !== undefined) return fallback;
  }

  // Last resort: use English
  const englishFallback = resolveDotKey(LOCALE_STRINGS[DEFAULT_LOCALE], key);
  return englishFallback ?? key;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL
// ─────────────────────────────────────────────────────────────────────────────

function resolveDotKey(
  obj: Record<string, unknown>,
  key: string
): string | undefined {
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return undefined;
    }
    current = current[part];
  }
  return typeof current === 'string' ? current : undefined;
}
