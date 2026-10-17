import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingUp, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateFutureInflation,
  formatCurrency,
  formatPercent,
} from '@/data/inflation-scenarios-data';

interface InflationPriceRiseViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Data ──────────────────────────────────────────────── */
const BASE_COST = 5_000;
const BASE_RATE = 3.0;
const HORIZONS = [5, 10, 15, 20, 25, 30] as const;

const TIME_ROWS = HORIZONS.map((years) => {
  const result = calculateFutureInflation(BASE_COST, years, BASE_RATE);
  if ('error' in result) throw new Error('Calculation error');
  return result;
});

const RATE_BENCHMARKS = [2.0, 3.0, 4.0, 5.0] as const;
const RATE_ROWS = RATE_BENCHMARKS.map((rate) => {
  const result = calculateFutureInflation(BASE_COST, 10, rate);
  if ('error' in result) throw new Error('Calculation error');
  return result;
});

export default function InflationPriceRiseView({
  locale = DEFAULT_LOCALE,
}: InflationPriceRiseViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('inflation-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Inflation Calculator';

  // Benchmark 10-year case ($5,000 at 3% annual inflation)
  const baseCase = TIME_ROWS[1];

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
        <Link href={`${prefix}/tools/inflation-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/inflation-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Much Will Prices Rise Over Time?
        </span>
      </nav>

      {/* Top Banner Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <TrendingUp className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Much Will Prices Rise Over Time? Projecting Future Living Costs
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            See how living expenses, goods, and services rise over multi-year horizons due to compounding inflation. Model how current prices change across 5 to 30 years under realistic inflation assumptions.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Compounding Price Growth Concept */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Compounding Causes Prices to Accelerate
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Inflation compounds annually: each year’s percentage increase builds on top of all preceding price increases. Even a modest 3% annual inflation rate results in a <strong>34.39% cumulative price rise</strong> over a 10-year span, and more than doubles prices over 24 years.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 dark:text-orange-300 mb-1">
                Compound Future Cost Formula
              </h3>
              <p className="text-xs text-orange-900 dark:text-orange-200/80 leading-relaxed">
                <code>Equivalent Future Cost = Current Cost × (1 + r)^t</code>, where <code>r</code> is the annual inflation rate and <code>t</code> is the number of years elapsed.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 mb-1">
                Additional Cumulative Cost
              </h3>
              <p className="text-xs text-blue-900 dark:text-blue-200/80 leading-relaxed">
                <code>Additional Cost = Future Cost − Current Cost</code>. This measures the dollar increase required simply to maintain your current standard of living.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Worked Example: $5,000 Current Expense Over 10 Years
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: $5,000 starting expense, 3.0% annual inflation rate, compounded annually for 10 years. Verified with the HelloTools Inflation Calculator engine.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 border border-gray-150 dark:border-gray-800 mb-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Today&apos;s Baseline Cost:</span>
              <span className="font-bold">{formatCurrency(BASE_COST)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Annual Inflation Rate:</span>
              <span className="font-bold">3.00%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Time Period:</span>
              <span className="font-bold">10 Years</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Compound Factor (1.03^10):</span>
              <span className="font-bold">1.343916</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
              <span>Equivalent Future Cost ($5,000 × 1.343916):</span>
              <span className="text-[#1a3c5e] dark:text-blue-400">{formatCurrency(baseCase.equivalentFutureCost)}</span>
            </div>
            <div className="flex justify-between items-center text-orange-600 dark:text-orange-400 font-semibold pt-1 text-xs">
              <span>Additional Price Rise Needed:</span>
              <span>+{formatCurrency(baseCase.additionalCost)} ({formatPercent(baseCase.cumulativeInflationPct)})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Equivalent Future Cost</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(baseCase.equivalentFutureCost)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Price of $5,000 goods in 10 yrs</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Additional Out-of-Pocket</span>
              <div className="text-xl font-extrabold mt-1 text-orange-300">+{formatCurrency(baseCase.additionalCost)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Dollar increase due to inflation</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Cumulative Price Rise</span>
              <div className="text-xl font-extrabold mt-1">{formatPercent(baseCase.cumulativeInflationPct)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Total percentage increase</span>
            </div>
          </div>
        </section>

        {/* Section 3: Time Horizon Milestones Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Projected Cost Across Multi-Year Horizons (3% Inflation)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Starting with a $5,000 baseline expense. See how future cost rises steadily over 5, 10, 15, 20, 25, and 30 years.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Time Horizon</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Current Cost</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Equivalent Future Cost</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Dollar Increase</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Cumulative Inflation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {TIME_ROWS.map((row) => (
                  <tr key={row.years} className={row.years === 10 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.years} Years</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(BASE_COST)}</td>
                    <td className="py-3 px-3 text-[#1a3c5e] dark:text-blue-400 font-bold">{formatCurrency(row.equivalentFutureCost)}</td>
                    <td className="py-3 px-3 text-orange-600 dark:text-orange-400">+{formatCurrency(row.additionalCost)}</td>
                    <td className="py-3 px-3 text-right text-slate-900 dark:text-white font-bold">{formatPercent(row.cumulativeInflationPct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Inflation Rate Sensitivity Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Comparing Inflation Rates on a $5,000 Budget (10-Year Horizon)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare 10-year projected cost under conservative, historical average, and elevated inflation environments.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Annual Inflation Rate</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">10-Year Future Cost</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Additional Cost</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Cumulative Price Rise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {RATE_ROWS.map((row) => (
                  <tr key={row.rate} className={row.rate === 3 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.rate.toFixed(1)}% per year</td>
                    <td className="py-3 px-3 text-[#1a3c5e] dark:text-blue-400 font-bold">{formatCurrency(row.equivalentFutureCost)}</td>
                    <td className="py-3 px-3 text-orange-600 dark:text-orange-400">+{formatCurrency(row.additionalCost)}</td>
                    <td className="py-3 px-3 text-right text-slate-900 dark:text-white font-bold">{formatPercent(row.cumulativeInflationPct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Practical Budgeting Guidelines */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Practical Budgeting Insights for Inflation Planning
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <li>
              <strong>Fixed budgets require periodic indexing:</strong> If an ongoing budget or pension remains fixed while prices rise by 3% annually, purchasing capability contracts by approximately 25.6% after 10 years.
            </li>
            <li>
              <strong>The Rule of 72 for Price Doubling:</strong> Divide 72 by the annual inflation rate to find approximately how many years it will take for general prices to double. At 3% annual inflation, prices double in about 24 years (72 ÷ 3 = 24).
            </li>
            <li>
              <strong>Category variance:</strong> Actual inflation differs across goods: healthcare and education historically rise faster than technological equipment. The calculator provides a macro-level benchmark.
            </li>
          </ul>
        </section>

        {/* Educational Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Section 6: FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'How does compounding affect inflation projections?',
                a: 'Compounding means that inflation applies not only to the starting baseline cost, but also to every prior year’s accumulated price increase. A 3% annual rate produces a 34.39% increase over 10 years rather than simple 30% (10 × 3%).',
              },
              {
                q: 'What is the difference between simple inflation and cumulative inflation?',
                a: 'Simple inflation would multiply the annual rate by the number of years (e.g. 3% × 10 = 30%). Cumulative compound inflation accounts for price growth on top of price growth: (1 + 0.03)^10 − 1 = 34.39%. The calculator uses exact compound math.',
              },
              {
                q: 'Can this calculation be used to estimate future college tuition or medical costs?',
                a: 'Yes, as a broad mathematical baseline. However, keep in mind that specific sectors like higher education, housing, and healthcare have historically experienced price inflation rates higher than the general Consumer Price Index.',
              },
              {
                q: 'What assumptions are built into this price projection model?',
                a: 'The model assumes a constant annual inflation rate compounded yearly. It does not account for temporary macroeconomic spikes, supply chain disruptions, taxes, or local geographical cost differences.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#f97316] shrink-0" aria-hidden="true" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation and Internal Links */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Explore Related Financial Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/inflation-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Inflation Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/inflation-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Inflation Scenarios
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/savings-goal-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Savings Goal Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/retirement-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Retirement Savings Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/how-much-will-401k-be-worth-at-65"
              className="text-[#f97316] hover:underline font-semibold"
            >
              How Much Will My 401(k) Be Worth at Age 65?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
