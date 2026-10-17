import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingDown, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calcRetirementNestEgg,
  inflationAdjustedRetirement,
  formatRetirementValue,
} from '@/data/retirement-scenarios-data';

interface RetirementInflationViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const CURRENT_SAVINGS = 5_000;
const MONTHLY_CONTRIBUTION = 300;
const ANNUAL_RATE_PCT = 7.0;
const BASE_INFLATION_RATE = 3.0;

// Test across horizons: 20, 25, 30, 35, 40 years to retirement
const HORIZONS = [
  { years: 20, startAge: 45 },
  { years: 25, startAge: 40 },
  { years: 30, startAge: 35 },
  { years: 35, startAge: 30 },
  { years: 40, startAge: 25 },
] as const;

/* ── Pre-compute rows using verified utility ─── */
const ROWS = HORIZONS.map((h) => {
  const sim = calcRetirementNestEgg(
    h.startAge,
    65,
    CURRENT_SAVINGS,
    MONTHLY_CONTRIBUTION,
    ANNUAL_RATE_PCT
  );
  const realValue = inflationAdjustedRetirement(sim.nestEgg, BASE_INFLATION_RATE, h.years);
  const purchasingPowerLoss = Math.round((sim.nestEgg - realValue) * 100) / 100;
  const purchasingPowerLossPct = Math.round(((sim.nestEgg - realValue) / sim.nestEgg) * 1000) / 10;

  return {
    ...h,
    nominalNestEgg: sim.nestEgg,
    realValue,
    purchasingPowerLoss,
    purchasingPowerLossPct,
  };
});

// Highlight 35-year row (age 30 to 65)
const HIGHLIGHT = ROWS[3];

export default function RetirementInflationView({ locale = DEFAULT_LOCALE }: RetirementInflationViewProps) {
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
          How Inflation Changes Your Target
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
        <TrendingDown className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Inflation Changes Your Retirement Savings Target
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            Understand why nominal projections differ from real purchasing power, and how a {BASE_INFLATION_RATE}% inflation rate alters what your retirement savings can actually buy decades from today.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Mechanics */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Nominal Retirement Projections vs. Real Spending Power
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Retirement Savings Calculator outputs a <strong>nominal nest egg</strong>—the literal currency balance projected in your account at your target retirement age. It factors in compound growth on contributions at your selected rate of return.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, consumer prices increase over time due to inflation. Over long time horizons of 20 to 40 years, goods and services cost substantially more. While your portfolio may show $500,000 or $1,000,000, its purchasing power in today’s dollars is lower.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Purchasing Power Adjustment Formula:
            </span>
            Real Value = Nominal Balance ÷ (1 + InflationRate)^Years
          </div>
        </section>

        {/* Section 2 – Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Worked Example: 35-Year Horizon at {BASE_INFLATION_RATE}% Inflation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Saving ${MONTHLY_CONTRIBUTION}/mo from age 30 to 65 with ${CURRENT_SAVINGS.toLocaleString()} starting balance at {ANNUAL_RATE_PCT}% return.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block">
                Nominal Nest Egg
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatRetirementValue(HIGHLIGHT.nominalNestEgg)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">face value projected at age 65</span>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f97316] block">
                Real Purchasing Power (3% Inf)
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatRetirementValue(HIGHLIGHT.realValue)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">value in today&apos;s purchasing power</span>
            </div>

            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block">
                Purchasing Power Erosion
              </span>
              <span className="text-2xl font-black font-mono text-red-600 dark:text-red-400 mt-1 block">
                {HIGHLIGHT.purchasingPowerLossPct}%
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">loss in real spending capability</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              Over 35 years, compounded at 3% annual inflation, prices roughly triple. A future balance of {formatRetirementValue(HIGHLIGHT.nominalNestEgg)} will buy goods and services equivalent to about <strong>{formatRetirementValue(HIGHLIGHT.realValue)}</strong> in today&apos;s prices.
            </p>
            <p>
              Because the portfolio return ({ANNUAL_RATE_PCT}%) exceeds inflation ({BASE_INFLATION_RATE}%), the real return is still positive (+4%), allowing real wealth accumulation despite substantial inflation.
            </p>
          </div>
        </section>

        {/* Section 3 – Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Inflation Impact Across Horizons (3% Inflation)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare nominal future value versus real purchasing power across retirement horizons from 20 to 40 years.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-slate-600 dark:text-slate-400 font-bold">
                  <th className="p-3">Horizon</th>
                  <th className="p-3">Nominal Nest Egg</th>
                  <th className="p-3">Real Purchasing Power</th>
                  <th className="p-3">Inflation Loss</th>
                  <th className="p-3">Erosion %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-slate-700 dark:text-slate-300">
                {ROWS.map((row) => (
                  <tr key={row.years} className="hover:bg-slate-50/40 dark:hover:bg-gray-800/20">
                    <td className="p-3 font-sans font-semibold text-gray-900 dark:text-white">{row.years} years (Age {row.startAge})</td>
                    <td className="p-3 font-bold text-blue-600 dark:text-blue-400">{formatRetirementValue(row.nominalNestEgg)}</td>
                    <td className="p-3 font-bold text-[#f97316]">{formatRetirementValue(row.realValue)}</td>
                    <td className="p-3 text-red-600 dark:text-red-400">-{formatRetirementValue(row.purchasingPowerLoss)}</td>
                    <td className="p-3">{row.purchasingPowerLossPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            Assumes steady 3.0% annual inflation, 7.0% annual nominal return, $300 monthly savings, and $5,000 initial balance.
          </p>
        </section>

        {/* Section 4 – Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How to Account for Inflation in Your Plan
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Use a real return rate input:</strong> In the Retirement Savings Calculator, you can enter an inflation-adjusted return rate (e.g. 4% or 5% instead of 7%) to view results directly in real purchasing power terms.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Increase contributions with salary:</strong> Periodic contribution increases help counter the gradual impact of inflation on future savings.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Measure your progress against living costs:</strong> Rather than aiming for a fixed dollar figure, review retirement targets periodically against current living expenses.</span>
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
                q: 'Does the Retirement Savings Calculator allow me to input an inflation rate?',
                a: 'The current calculator operates on a nominal return basis. You can simulate inflation by entering a "real return" rate (such as 4% instead of 7%), which produces an inflation-adjusted nest egg estimate.',
              },
              {
                q: 'What is the historical average inflation rate?',
                a: 'In the US and many developed markets, long-term consumer price inflation has historically averaged around 2.5% to 3.5% per year, though specific periods can experience higher or lower rates.',
              },
              {
                q: 'Where can I check historical and projected inflation numbers?',
                a: 'You can explore historical CPI data and project future purchasing power changes with the HelloTools Inflation Calculator.',
              },
              {
                q: 'Why does cash lose value faster than an investment portfolio?',
                a: 'Cash kept in low-interest accounts typically earns less than inflation, losing real purchasing power each year. A diversified portfolio yielding 7% outperforms a 3% inflation rate, creating real growth.',
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
            href={`${prefix}/tools/inflation-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Inflation Calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
