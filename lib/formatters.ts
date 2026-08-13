/**
 * HelloTools — Locale-Aware Formatting Utilities
 *
 * Centralizes all Intl.NumberFormat / Intl.DateTimeFormat usage.
 * Prevents hydration mismatches by using explicit locale codes (never `undefined`).
 *
 * Rules:
 *  - ALWAYS pass an explicit locale — never rely on `undefined` (browser default)
 *    because the server (Vercel Node.js, en-US) and client may differ.
 *  - These functions are safe to call in both Server and Client Components.
 *  - Calculation logic (raw numbers) must never be modified here — only display.
 *
 * Usage:
 *   import { formatCurrency, formatNumber } from '@/lib/formatters';
 *   formatCurrency(1234.56, 'USD', 'en') → "$1,234.56"
 *   formatCurrency(1234.56, 'EUR', 'de') → "1.234,56 €"
 *   formatNumber(1234.56, 'de')          → "1.234,56"
 *   formatNumber(1234.56, 'fr')          → "1 234,56"
 */

import { Locale, DEFAULT_LOCALE, LOCALE_CONFIGS } from './i18n';

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Maps a Locale code to its BCP-47 Intl identifier. Falls back to en-US. */
function intlCode(locale: Locale): string {
  return LOCALE_CONFIGS[locale]?.intlCode ?? LOCALE_CONFIGS[DEFAULT_LOCALE].intlCode;
}

/** Returns '—' for non-finite values to avoid NaN/Infinity in UI. */
function guardFinite(value: number): boolean {
  return Number.isFinite(value);
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Formats a plain number with locale-appropriate thousands/decimal separators.
 *
 * @example
 *   formatNumber(1234567.89, 'en')   → "1,234,567.89"
 *   formatNumber(1234567.89, 'de')   → "1.234.567,89"
 *   formatNumber(1234567.89, 'fr')   → "1 234 567,89"
 */
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  if (!guardFinite(value)) return '—';
  return new Intl.NumberFormat(intlCode(locale), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

/**
 * Formats a number as a currency value.
 * The currency code (ISO 4217) is separate from the locale for maximum flexibility.
 * Universal tools should let the user choose currency; only auto-assign for country-specific tools.
 *
 * @example
 *   formatCurrency(1234.56, 'USD', 'en')   → "$1,234.56"
 *   formatCurrency(1234.56, 'EUR', 'de')   → "1.234,56 €"
 *   formatCurrency(1234.56, 'JPY', 'ja')   → "¥1,235"
 *   formatCurrency(1234.56, 'BRL', 'pt')   → "R$ 1.234,56"
 */
export function formatCurrency(
  value: number,
  currency: string,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  if (!guardFinite(value)) return '—';
  return new Intl.NumberFormat(intlCode(locale), {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

/**
 * Formats a ratio (0–1 or 0–100) as a locale-appropriate percentage.
 * Pass the raw decimal form (e.g., 0.0523 for 5.23%).
 *
 * @example
 *   formatPercent(0.0523, 'en')   → "5.23%"
 *   formatPercent(0.0523, 'de')   → "5,23 %"
 *   formatPercent(0.0523, 'fr')   → "5,23 %"
 */
export function formatPercent(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  if (!guardFinite(value)) return '—';
  return new Intl.NumberFormat(intlCode(locale), {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

/**
 * Formats a whole number (no decimal places).
 *
 * @example
 *   formatInteger(1234567, 'en')   → "1,234,567"
 *   formatInteger(1234567, 'de')   → "1.234.567"
 */
export function formatInteger(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  if (!guardFinite(value)) return '—';
  return new Intl.NumberFormat(intlCode(locale), {
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

/**
 * Formats a Date object using locale-appropriate conventions.
 *
 * @example
 *   formatDate(new Date('2025-01-15'), 'en')   → "Jan 15, 2025"
 *   formatDate(new Date('2025-01-15'), 'de')   → "15. Jan. 2025"
 *   formatDate(new Date('2025-01-15'), 'fr')   → "15 janv. 2025"
 *   formatDate(new Date('2025-01-15'), 'ja')   → "2025年1月15日"
 */
export function formatDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(intlCode(locale), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(date);
}

/**
 * Formats a month+year pair (useful for amortization schedules, etc.).
 *
 * @example
 *   formatMonthYear(new Date('2025-01-01'), 'en')   → "Jan 2025"
 *   formatMonthYear(new Date('2025-01-01'), 'de')   → "Jan. 2025"
 *   formatMonthYear(new Date('2025-01-01'), 'ja')   → "2025年1月"
 */
export function formatMonthYear(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlCode(locale), {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Convenience: formats with exactly N decimal places.
 */
export function formatFixed(
  value: number,
  locale: Locale,
  fractionDigits: number
): string {
  if (!guardFinite(value)) return '—';
  return new Intl.NumberFormat(intlCode(locale), {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
