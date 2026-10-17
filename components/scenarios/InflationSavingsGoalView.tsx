import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Target, ArrowRight, HelpCircle } from 'lucide-react';
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

interface InflationSavingsGoalViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Data ──────────────────────────────────────────────── */
const BASE_GOAL = 100_000;
const BASE_RATE = 3.0;
const HORIZONS = [5, 10, 15, 20, 25] as const;

const TIME_ROWS = HORIZONS.map((years) => {
  const result = calculateFutureInflation(BASE_GOAL, years, BASE_RATE);
  if ('error' in result) throw new Error('Calculation error');
  // Purchasing power of unadjusted nominal goal
  const unadjustedPurchasingPower = result.purchasingPower;
  const shortfallInTodayDollars = BASE_GOAL - unadjustedPurchasingPower;
  return {
    ...result,
    adjustedTarget: result.equivalentFutureCost,
    unadjustedPurchasingPower,
    shortfallInTodayDollars,
  };
});

const TARGET_BENCHMARKS = [25_000, 50_000, 100_000, 250_000] as const;
const TARGET_ROWS = TARGET_BENCHMARKS.map((target) => {
  const result = calculateFutureInflation(target, 10, BASE_RATE);
  if ('error' in result) throw new Error('Calculation error');
  return {
    target,
    ...result,
    adjustedTarget: result.equivalentFutureCost,
  };
});

export default function InflationSavingsGoalView({
  locale = DEFAULT_LOCALE,
}: InflationSavingsGoalViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('inflation-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Inflation Calculator';

  // Benchmark 10-year case ($100,000 target at 3% annual inflation)
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
          Inflation-Adjusted Savings Goal
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
        <Target className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Inflation-Adjusted Savings Goal: Protecting Future Buying Power
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Discover why a long-term savings target expressed in today’s dollars must be adjusted upward to account for inflation, and how unadjusted nominal goals leave a substantial purchasing power deficit.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Money Illusion in Savings Goals */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Why Future Savings Targets Must Account for Inflation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When setting a financial milestone—such as saving $100,000 for a home down payment or college fund in 10 or 20 years—people naturally think in terms of <strong>today&apos;s purchasing power</strong>. However, due to compound inflation, reaching exactly $100,000 nominal in the future buys far less than $100,000 buys today.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 dark:text-orange-300 mb-1">
                The Unadjusted Shortfall Risk
              </h3>
              <p className="text-xs text-orange-900 dark:text-orange-200/80 leading-relaxed">
                If you save $100,000 over 10 years at 3% inflation, that nominal sum will only possess <strong>$74,409.39</strong> of purchasing power—falling short of your real objective by over $25,500.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 mb-1">
                The Inflation-Adjusted Target
              </h3>
              <p className="text-xs text-blue-900 dark:text-blue-200/80 leading-relaxed">
                To preserve $100,000 of real purchasing capacity after 10 years, your actual savings target must be adjusted upward to <strong>$134,391.64</strong>: <code>Target × (1 + r)^t</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Worked Example: $100,000 Real Target Over 10 Years
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: $100,000 target in today&apos;s purchasing power, constant 3.0% annual inflation, 10-year savings horizon. Verified with the HelloTools Inflation Calculator engine.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 border border-gray-150 dark:border-gray-800 mb-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Desired Goal in Today&apos;s Dollars:</span>
              <span className="font-bold">{formatCurrency(BASE_GOAL)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Assumed Annual Inflation Rate:</span>
              <span className="font-bold">3.00%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Savings Horizon:</span>
              <span className="font-bold">10 Years</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Compounded Inflation Multiplier (1.03^10):</span>
              <span className="font-bold">1.343916</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
              <span>Required Future Nominal Target ($100,000 × 1.343916):</span>
              <span className="text-[#1a3c5e] dark:text-blue-400">{formatCurrency(baseCase.adjustedTarget)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 pt-1 text-xs">
              <span>Purchasing Power if you only save $100,000 nominal:</span>
              <span className="text-red-600 dark:text-red-400 font-bold">{formatCurrency(baseCase.unadjustedPurchasingPower)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Adjusted Future Target</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(baseCase.adjustedTarget)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Target in 10-year nominal dollars</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Unadjusted Buying Power</span>
              <div className="text-xl font-extrabold mt-1 text-orange-300">{formatCurrency(baseCase.unadjustedPurchasingPower)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">What nominal $100k buys in 10 yrs</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Purchasing Power Deficit</span>
              <div className="text-xl font-extrabold mt-1 text-red-300">-{formatCurrency(baseCase.shortfallInTodayDollars)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Real shortfall if unadjusted</span>
            </div>
          </div>
        </section>

        {/* Section 3: Time Horizon Inflation Adjustment Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Adjusting a $100,000 Target Across Different Horizons (3% Inflation)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare how the required nominal savings target expands as your target horizon increases from 5 to 25 years.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Horizon</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Today&apos;s Target</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Inflated Target Needed</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Unadjusted Buying Power</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Real Shortfall</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {TIME_ROWS.map((row) => (
                  <tr key={row.years} className={row.years === 10 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.years} Years</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(BASE_GOAL)}</td>
                    <td className="py-3 px-3 text-[#1a3c5e] dark:text-blue-400 font-bold">{formatCurrency(row.adjustedTarget)}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.unadjustedPurchasingPower)}</td>
                    <td className="py-3 px-3 text-right text-red-600 dark:text-red-400 font-bold">-{formatCurrency(row.shortfallInTodayDollars)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Target Amounts Benchmark Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Inflation Adjustment Across Savings Target Levels (10-Year Horizon at 3%)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare the necessary 10-year nominal savings adjustment across common financial goals.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Goal in Today&apos;s Dollars</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">10-Year Inflated Target</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Adjustment Needed</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Cumulative Inflation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {TARGET_ROWS.map((row) => (
                  <tr key={row.target} className={row.target === 100_000 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{formatCurrency(row.target)}</td>
                    <td className="py-3 px-3 text-[#1a3c5e] dark:text-blue-400 font-bold">{formatCurrency(row.adjustedTarget)}</td>
                    <td className="py-3 px-3 text-orange-600 dark:text-orange-400">+{formatCurrency(row.additionalCost)}</td>
                    <td className="py-3 px-3 text-right text-slate-900 dark:text-white font-bold">{formatPercent(row.cumulativeInflationPct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Connecting to Savings Goal Calculator */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            How to Reach Your Inflation-Adjusted Savings Target
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Once you have determined your inflation-adjusted future goal using the Inflation Calculator (such as $134,392 for a 10-year $100,000 real goal), the next step is determining how much you need to save each month.
          </p>
          <div className="p-4 rounded-xl bg-orange-50/40 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Use the Savings Goal Calculator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Input your inflation-adjusted target, starting balance, and expected savings interest rate to calculate your required monthly contribution.
              </p>
            </div>
            <Link
              href={`${prefix}/tools/savings-goal-calculator`}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition-colors"
            >
              Open Savings Goal Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
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
                q: 'Why should I adjust my savings goal for inflation?',
                a: 'If you target a fixed nominal amount (e.g. $100,000) for a goal 10 or 20 years away, inflation will make that future sum worth substantially less in real purchasing power. Adjusting your target ensures you will be able to buy what you originally planned.',
              },
              {
                q: 'How does the calculator determine the inflation-adjusted savings target?',
                a: 'The calculator uses the compound future cost formula: Target_adjusted = Target_today × (1 + r)^t, where r is the assumed annual inflation rate and t is the number of years. For $100,000 at 3% over 10 years, the target becomes $134,391.64.',
              },
              {
                q: 'Can investment returns offset inflation in a savings goal?',
                a: 'Yes. In practice, savers often invest in accounts that earn interest or investment yields. If your annual return equals the annual inflation rate, your purchasing power is maintained. If it exceeds inflation, your real wealth grows. Use our Compound Interest and Savings Goal calculators to model returns alongside inflation.',
              },
              {
                q: 'What is a reasonable annual inflation rate assumption for long-term goals?',
                a: 'Historically, central banks such as the U.S. Federal Reserve target a long-run annual inflation rate of approximately 2%. However, many financial planners use 2.5% to 3.5% as a conservative benchmark for long-term planning.',
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
