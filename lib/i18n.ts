/**
 * HelloTools — Centralized i18n Configuration
 *
 * Single source of truth for all locale metadata.
 * Do not duplicate these values elsewhere in the codebase.
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export const LOCALES = ['en', 'es', 'de', 'fr', 'pt', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];

export interface LocaleConfig {
  /** Short locale code used in URLs: es, de, fr, pt, ja */
  code: Locale;
  /** English display name */
  name: string;
  /** Native display name shown to users */
  nativeName: string;
  /** BCP-47 tag used for Intl APIs (e.g. 'de-DE', 'pt-BR') */
  intlCode: string;
  /** BCP-47 hreflang tag used for SEO alternates (e.g. 'pt-BR', 'es') */
  hreflangCode: string;
  /** html lang attribute value */
  htmlLang: string;
  /** Text direction */
  dir: 'ltr' | 'rtl';
  /** Whether this locale is production-ready and safe to index. */
  indexable: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCALE REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    intlCode: 'en-US',
    hreflangCode: 'en',
    htmlLang: 'en',
    dir: 'ltr',
    indexable: true,
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    intlCode: 'es-ES',
    hreflangCode: 'es',
    htmlLang: 'es',
    dir: 'ltr',
    indexable: true,
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    intlCode: 'de-DE',
    hreflangCode: 'de',
    htmlLang: 'de',
    dir: 'ltr',
    indexable: true, // Enabled in Phase 3
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    intlCode: 'fr-FR',
    hreflangCode: 'fr',
    htmlLang: 'fr',
    dir: 'ltr',
    indexable: true, // Enabled in Phase 3
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    intlCode: 'pt-BR',
    hreflangCode: 'pt-BR', // BCP-47 hreflang tag for Brazilian Portuguese
    htmlLang: 'pt-BR',
    dir: 'ltr',
    indexable: true, // Enabled in Phase 3
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    intlCode: 'ja-JP',
    hreflangCode: 'ja',
    htmlLang: 'ja',
    dir: 'ltr',
    indexable: true, // Enabled in Phase 3
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

/** The default/primary locale — English stays at /tools/[slug] (no prefix). */
export const DEFAULT_LOCALE: Locale = 'en';

/** All non-English locales that use a /[locale]/ URL prefix. */
export const NON_DEFAULT_LOCALES = LOCALES.filter(
  (l): l is Exclude<Locale, 'en'> => l !== DEFAULT_LOCALE
);

/** Locales that are currently enabled for production indexing. */
export const INDEXABLE_LOCALES = LOCALES.filter((l) => LOCALE_CONFIGS[l].indexable);

/** The supported tools for multilingual routes (Phase 2 pilot + Phase 4 Batch A + Batch B = 44 tools). */
export const PILOT_TOOLS = [
  'amortization-calculator',
  'bmi-calculator',
  'age-calculator',
  'compound-interest-calculator',
  'percentage-calculator',
  'emi-calculator',
  'calorie-calculator',
  'tip-calculator',
  'mortgage-calculator',
  'unit-converter',
  // Phase 4 Batch A Tools (15)
  'discount-calculator',
  'simple-interest-calculator',
  'bmr-calculator',
  'water-intake-calculator',
  'date-difference-calculator',
  'time-calculator',
  'fraction-calculator',
  'average-calculator',
  'word-counter',
  'character-counter',
  'password-generator',
  'password-strength-checker',
  'json-formatter',
  'qr-code-generator',
  'base64-converter',
  // Phase 4 Batch B Tools (19)
  'savings-goal-calculator',
  'auto-loan-calculator',
  'net-worth-calculator',
  'salary-calculator',
  'currency-converter',
  'scientific-calculator',
  'square-root-calculator',
  'random-number-generator',
  'grade-calculator',
  'case-converter',
  'remove-duplicate-lines',
  'text-sorter',
  'whitespace-remover',
  'ideal-weight-calculator',
  'body-fat-calculator',
  'macro-calculator',
  'pregnancy-calculator',
  'ovulation-calculator',
  'running-pace-calculator',
  // Phase 4 Batch C Tools (20)
  'retirement-calculator',
  'text-reverser',
  'word-frequency-counter',
  'palindrome-checker',
  'sleep-cycle-calculator',
  'color-picker',
  'aspect-ratio-calculator',
  'binary-converter',
  'word-to-pdf',
  'uuid-generator',
  'dice-roller',
  'hash-generator',
  'regex-tester',
  'student-loan-calculator',
  'markdown-editor',
  'lorem-ipsum-generator',
  'standard-deviation-calculator',
  'ev-cost-calculator',
  'macronutrient-splitter',
  'apr-calculator',
] as const;

export type PilotToolSlug = (typeof PILOT_TOOLS)[number];

/** Type guard: checks if a slug is one of the supported multilingual tools. */
export function isPilotTool(slug: string): boolean {
  return (PILOT_TOOLS as readonly string[]).includes(slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Type-guard: checks if a value is a valid Locale code. */
export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Returns the LocaleConfig for a locale, with a type-safe default. */
export function getLocaleConfig(locale: Locale): LocaleConfig {
  return LOCALE_CONFIGS[locale];
}

/**
 * Detects the current locale from a Next.js pathname.
 * Returns DEFAULT_LOCALE if the pathname has no valid locale prefix.
 */
export function detectLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0] ?? '';
  if (isValidLocale(first) && first !== DEFAULT_LOCALE) {
    return first;
  }
  return DEFAULT_LOCALE;
}

/**
 * Given a pathname and a target locale, returns the equivalent URL
 * in the target locale.
 */
export function switchLocale(
  pathname: string,
  currentLocale: Locale,
  targetLocale: Locale
): string {
  const stripped =
    currentLocale !== DEFAULT_LOCALE
      ? pathname.replace(new RegExp(`^/${currentLocale}`), '') || '/'
      : pathname;

  if (targetLocale === DEFAULT_LOCALE) {
    return stripped;
  }
  return `/${targetLocale}${stripped}`;
}

/**
 * Generates the reciprocal hreflang map for metadata.
 * For pilot tools, returns alternates for en, es, de, fr, pt-BR, ja, and x-default.
 * For non-pilot tool slugs, returns undefined so no hreflang is generated (prevents 404 links).
 * For homepages (no slug), returns alternates for the homepages.
 */
export function getHreflangMap(slug?: string): Record<string, string> | undefined {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';

  if (slug) {
    if (!isPilotTool(slug)) return undefined;
    return {
      'en': `${baseUrl}/tools/${slug}`,
      'es': `${baseUrl}/es/tools/${slug}`,
      'de': `${baseUrl}/de/tools/${slug}`,
      'fr': `${baseUrl}/fr/tools/${slug}`,
      'pt-BR': `${baseUrl}/pt/tools/${slug}`,
      'ja': `${baseUrl}/ja/tools/${slug}`,
      'x-default': `${baseUrl}/tools/${slug}`,
    };
  }

  return {
    'en': baseUrl,
    'es': `${baseUrl}/es`,
    'de': `${baseUrl}/de`,
    'fr': `${baseUrl}/fr`,
    'pt-BR': `${baseUrl}/pt`,
    'ja': `${baseUrl}/ja`,
    'x-default': baseUrl,
  };
}
