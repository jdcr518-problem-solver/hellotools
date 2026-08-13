/**
 * HelloTools — Tool Scope Classification
 *
 * Maps tool slugs to their internationalization scope.
 * This is separate from tools-master.ts to avoid touching the large data file.
 *
 * Scope definitions:
 *
 *  'universal'        — Formula/logic works identically for all countries.
 *                       Safe to translate and deploy in all locales.
 *                       Examples: BMI, age, percentage, tip, unit converter.
 *
 *  'us-only'         — Deeply US-specific: IRS rules, SSA programs, US state taxes.
 *                       Do NOT translate these for non-English locales.
 *                       Showing them in /es/, /de/ etc. would be misinformation.
 *                       Examples: 401(k), Freelancer Tax (US).
 *
 *  'us-primary'      — US data/terminology but the underlying concept is global.
 *                       Can appear on non-English locales WITH a clear disclaimer
 *                       that the data reflects US figures.
 *                       Examples: Inflation (US CPI), Student Loan.
 *
 *  'localized'       — Requires locale-specific data or regulatory knowledge.
 *                       Must be built separately per locale rather than translated.
 *                       Examples: Country-specific tax, pension, benefits calculators.
 *
 * Tools not listed here default to 'universal'.
 * Update this file when adding new tools or reclassifying existing ones.
 */

export type ToolScope = 'universal' | 'us-only' | 'us-primary' | 'localized';

/**
 * Explicit scope overrides.
 * Any slug not in this map is treated as 'universal'.
 */
export const TOOL_SCOPE_MAP: Record<string, ToolScope> = {
  // ── US-ONLY (do not translate; do not show on non-English locale pages) ──
  '401k-calculator':          'us-only',
  'freelancer-tax-calculator': 'us-only',

  // ── US-PRIMARY (translatable with a disclaimer) ──
  'inflation-calculator':    'us-primary',  // uses US BLS CPI-U data
  'student-loan-calculator': 'us-primary',  // US-context terminology
  'tax-calculator':          'us-primary',  // audit needed; treating as us-primary conservatively

  // ── LOCALIZED (needs locale-specific implementation, not just translation) ──
  // (none yet — future country-specific tools will go here)

  // ── Everything else is implicitly 'universal' ──
  // Examples already covered by default:
  // 'emi-calculator', 'bmi-calculator', 'age-calculator', 'percentage-calculator',
  // 'amortization-calculator', 'compound-interest-calculator', 'tip-calculator',
  // 'unit-converter', 'calorie-calculator', 'mortgage-calculator', etc.
};

/**
 * Returns the scope for a given tool slug.
 * Defaults to 'universal' if the slug is not explicitly classified.
 */
export function getToolScope(slug: string): ToolScope {
  return TOOL_SCOPE_MAP[slug] ?? 'universal';
}

/**
 * Returns true if the tool is safe to show on non-English locale pages
 * (either as-is for 'universal', or with a disclaimer for 'us-primary').
 */
export function isToolTranslatable(slug: string): boolean {
  const scope = getToolScope(slug);
  return scope === 'universal' || scope === 'us-primary';
}

/**
 * Returns true if the tool should be restricted to the English locale only.
 */
export function isToolEnglishOnly(slug: string): boolean {
  const scope = getToolScope(slug);
  return scope === 'us-only';
}

/**
 * Returns slugs that should NOT appear on a given non-English locale.
 */
export function getEnglishOnlySlugs(): string[] {
  return Object.entries(TOOL_SCOPE_MAP)
    .filter(([, scope]) => scope === 'us-only')
    .map(([slug]) => slug);
}
