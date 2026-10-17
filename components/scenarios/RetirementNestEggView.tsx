import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, DollarSign, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calcRetirementNestEgg,
  formatRetirementValue,
} from '@/data/retirement-scenarios-data';

interface RetirementNestEggViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
/*
 * These parameters match the default inputs in the live Retirement Savings Calculator.
 * Changing these constants requires re-verifying every displayed number.
 */
const CURRENT_AGE = 30;
const RETIREMENT_AGE = 65;
const CURRENT_SAVINGS = 5_000;   // $5,000 starting nest egg
const ANNUAL_RATE_PCT = 7.0;     // 7% annual return (nominal)
const MONTHLY_CONTRIBUTIONS = [100, 200, 300, 500, 750] as const;

/* ── Pre-compute rows using verified utility (matches live calculator) ─── */
const ROWS = MONTHLY_CONTRIBUTIONS.map((mc) => {
  const result = calcRetirementNestEgg(
    CURRENT_AGE,
    RETIREMENT_AGE,
    CURRENT_SAVINGS,
    mc,
    ANNUAL_RATE_PCT
  );
  return { monthlyContribution: mc, ...result };
});

// Highlight row: $300/month (index 2)
const HIGHLIGHT = ROWS[2];

export default function RetirementNestEggView({ locale = DEFAULT_LOCALE }: RetirementNestEggViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('retirement-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Retirement Savings Calculator';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl flex-wrap"
      >
        <Link href={prefix || '/'} className="hover:text-slate-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{homeLabel}</span>
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/#finance`} className="hover:text-slate-950 dark:hover:text-white">
          {financeLabel}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/retirement-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/retirement-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Much Do I Need to Save?
        </span>
      </nav>

      {/* Top Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <DollarSign className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Much Do I Need to Save for Retirement?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            See how your monthly contribution amount—from $100 to $750 per month—affects the total retirement nest egg when starting at age {CURRENT_AGE} with ${CURRENT_SAVINGS.toLocaleString()} in existing savings and a {ANNUAL_RATE_PCT}% expected annual return, retiring at age {RETIREMENT_AGE}.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – How the Formula Works */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Monthly Contributions Build Your Retirement Nest Egg
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Retirement Savings Calculator uses two components to project your future balance. First, your current savings grows by compounding monthly at your chosen annual return rate. Second, each monthly contribution earns compound interest from the month it is deposited until retirement. Both values are added together to produce the nominal projected nest egg.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because contributions made early in your career have decades to compound, small monthly increases have a dramatically outsized effect on the final balance. The result shown is a <strong>nominal future value</strong>—it reflects the actual dollar amount projected at retirement age, not adjusted for inflation.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Retirement Calculator Formula (Monthly Compounding):
            </span>
            Nest Egg = CurrentSavings × (1 + r)^months + MonthlyContrib × ((1 + r)^months − 1) / r
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li><span className="font-bold">r</span> — monthly interest rate = AnnualRate / 12 / 100</li>
            <li><span className="font-bold">months</span> — (RetirementAge − CurrentAge) × 12</li>
            <li><span className="font-bold">MonthlyContrib</span> — fixed monthly deposit amount</li>
          </ul>
        </section>

        {/* Section 2 – Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Worked Example: ${HIGHLIGHT.monthlyContribution}/Month Over {HIGHLIGHT.years} Years
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Parameters: Current age {CURRENT_AGE}, retirement age {RETIREMENT_AGE}, ${CURRENT_SAVINGS.toLocaleString()} initial savings, ${HIGHLIGHT.monthlyContribution}/month contribution, {ANNUAL_RATE_PCT}% annual return, monthly compounding.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f97316] block">
                Projected Nest Egg
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatRetirementValue(HIGHLIGHT.nestEgg)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">nominal value at age {RETIREMENT_AGE}</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Total You Contribute
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatRetirementValue(HIGHLIGHT.totalContributions)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">${CURRENT_SAVINGS.toLocaleString()} start + ${(HIGHLIGHT.monthlyContribution * HIGHLIGHT.months).toLocaleString()} deposits</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Compound Growth
              </span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                {formatRetirementValue(HIGHLIGHT.totalGrowth)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {Math.round((HIGHLIGHT.totalGrowth / HIGHLIGHT.nestEgg) * 100)}% of total nest egg is compound growth
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              <strong>Step 1:</strong> Your $5,000 starting balance begins compounding immediately at {ANNUAL_RATE_PCT}% annually (≈ 0.583% per month). Over {HIGHLIGHT.years} years, this alone grows to approximately $54,192.
            </p>
            <p>
              <strong>Step 2:</strong> Each $300 monthly deposit is added at the end of the month and then earns compound interest for all remaining months. Deposits made in month 1 compound for {HIGHLIGHT.months - 1} additional months; deposits in the final month earn no additional interest.
            </p>
            <p>
              <strong>Step 3:</strong> The combined result is {formatRetirementValue(HIGHLIGHT.nestEgg)}. You deposit {formatRetirementValue(HIGHLIGHT.totalContributions)} out of pocket; compound growth contributes the remaining {formatRetirementValue(HIGHLIGHT.totalGrowth)}.
            </p>
            <p>
              <strong>Important:</strong> This is a nominal projection. The actual purchasing power of this amount at retirement will depend on the rate of inflation between now and age {RETIREMENT_AGE}. See the inflation scenario for details.
            </p>
          </div>
        </section>

        {/* Section 3 – Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Contribution Comparison: $100 to $750 per Month
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            All rows assume: current age {CURRENT_AGE}, retirement age {RETIREMENT_AGE} ({HIGHLIGHT.years}-year horizon), ${CURRENT_SAVINGS.toLocaleString()} starting balance, {ANNUAL_RATE_PCT}% annual return, monthly compounding. Results are nominal future values.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-slate-600 dark:text-slate-400 font-bold">
                  <th className="p-3">Monthly Contribution</th>
                  <th className="p-3">Projected Nest Egg</th>
                  <th className="p-3">Total Contributions</th>
                  <th className="p-3">Compound Growth</th>
                  <th className="p-3">Growth Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-slate-700 dark:text-slate-300">
                {ROWS.map((row) => (
                  <tr key={row.monthlyContribution} className={`hover:bg-slate-50/40 dark:hover:bg-gray-800/20 ${row.monthlyContribution === 300 ? 'bg-orange-50/30 dark:bg-orange-950/10' : ''}`}>
                    <td className="p-3 font-sans font-semibold text-gray-900 dark:text-white">
                      ${row.monthlyContribution}/mo
                      {row.monthlyContribution === 300 && (
                        <span className="ml-2 text-[10px] font-bold text-[#f97316] uppercase">default</span>
                      )}
                    </td>
                    <td className="p-3 font-bold text-[#f97316]">{formatRetirementValue(row.nestEgg)}</td>
                    <td className="p-3">{formatRetirementValue(row.totalContributions)}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">{formatRetirementValue(row.totalGrowth)}</td>
                    <td className="p-3">{Math.round((row.totalGrowth / row.nestEgg) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            All values are nominal (not inflation-adjusted). Results match the live Retirement Savings Calculator. Assumes monthly compounding at {ANNUAL_RATE_PCT}% annual return.
          </p>
        </section>

        {/* Section 4 – Key Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Key Planning Takeaways
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Doubling contributions more than doubles the nest egg:</strong> Going from $100/month ($237,636) to $200/month ($417,742) more than doubles the balance, because larger deposits earn more compound interest over the same 35-year period.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Compound growth dominates over long horizons:</strong> At $300/month, compound growth ({formatRetirementValue(HIGHLIGHT.totalGrowth)}) accounts for {Math.round((HIGHLIGHT.totalGrowth / HIGHLIGHT.nestEgg) * 100)}% of the projected nest egg—you directly contribute only {Math.round((HIGHLIGHT.totalContributions / HIGHLIGHT.nestEgg) * 100)}% of the final balance.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Results are estimates, not guarantees:</strong> The {ANNUAL_RATE_PCT}% return rate is a user-specified assumption. Actual investment returns vary each year and can be negative. This calculator does not represent personalized financial advice.</span>
            </li>
          </ul>
        </section>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" compact={false} />

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'What does "nominal nest egg" mean?',
                a: 'A nominal value is the actual dollar amount shown at face value, without adjusting for inflation. The calculator projects the number of dollars you will have at retirement age—not the equivalent purchasing power in today\'s money. Inflation will reduce how much those dollars can actually buy.',
              },
              {
                q: 'Does the calculator include Social Security or pension income?',
                a: 'No. The Retirement Savings Calculator focuses exclusively on personal savings growth from your current balance and monthly contributions. Social Security benefits, pension income, employer matches, or other income sources are not factored in.',
              },
              {
                q: 'Is 7% a realistic annual return rate?',
                a: 'A 7% nominal annual return is a commonly cited long-term average for diversified equity portfolios, based on historical US stock market performance. However, actual returns are not guaranteed, vary significantly year to year, and depend on the asset mix chosen. You can adjust the return rate in the calculator to test different scenarios.',
              },
              {
                q: 'Why does compound growth make up such a large share of the final balance?',
                a: 'Over a 35-year horizon, each dollar deposited early has decades to multiply. Because interest earns interest on itself every month, the growth accelerates significantly over long periods. This is why starting earlier—even with the same monthly amount—produces dramatically larger results.',
              },
              {
                q: 'Does a higher contribution always beat a higher return rate?',
                a: 'Not necessarily. At shorter time horizons, a higher contribution amount has a proportionally larger effect. Over very long horizons (30+ years), return rate differences have an exponential impact. Both levers matter, and you can compare their effects directly in the main Retirement Savings Calculator.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{faq.q}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Link
            href={`${prefix}/tools/retirement-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            Open Retirement Savings Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/retirement-calculator/scenarios`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            View All Retirement Savings Scenarios
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/compound-interest-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Compound Interest Calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
