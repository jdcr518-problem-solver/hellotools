import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Clock, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  simulateTimeline,
  formatSavingsValue,
} from '@/data/savings-goal-scenarios-data';

interface SavingsGoalTimelineViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const TARGET_GOAL = 10_000;
const INITIAL_SAVINGS = 1_000;
const APR = 5;
const COMPOUND_FREQ = 12; // monthly compounding
const CONTRIBUTION_OPTIONS = [100, 150, 200, 300, 500] as const;

/* ── Pre-compute rows using verified simulation utility ──────────────────── */
const ROWS = CONTRIBUTION_OPTIONS.map((monthlyDeposit) => {
  const result = simulateTimeline(
    TARGET_GOAL,
    INITIAL_SAVINGS,
    APR,
    COMPOUND_FREQ,
    monthlyDeposit
  );
  return {
    monthlyDeposit,
    months: result.months,
    years: (result.months / 12).toFixed(1),
    totalDeposited: result.deposits,
    interestEarned: result.interest,
    endingBalance: result.balance,
  };
});

export default function SavingsGoalTimelineView({
  locale = DEFAULT_LOCALE,
}: SavingsGoalTimelineViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('savings-goal-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Savings Goal Calculator';

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
        <Link href={`${prefix}/tools/savings-goal-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/savings-goal-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Long Will It Take to Reach My Goal?
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
        <Clock className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Long Will It Take to Reach My Savings Goal?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            Compare how different monthly contribution sizes impact your timeline to reach a $10,000 target with $1,000 initial savings and 5% APY compounding monthly.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Concept */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Contribution Size Compresses Your Savings Timeline
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When your savings target is fixed, the single largest lever you control is your recurring monthly contribution. Increasing your monthly deposit doesn’t just add cash directly; it also grows the balance earlier in the timeline, allowing compound interest to accumulate on larger sums.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In our simulation, we calculate how many months it takes for your starting capital plus monthly contributions and earned interest to cross the $10,000 threshold.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Iterative Timeline Condition:
            </span>
            Simulate month t = 1, 2, 3... until Balance_(t) &gt;= Target Goal ($10,000)
          </div>
        </section>

        {/* Section 2 – Worked Comparison Highlights */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Worked Example: $200/Month Baseline vs. $500/Month Fast Track
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Parameters: $10,000 goal, $1,000 starting savings, 5% annual rate, monthly compounding.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Moderate Pace: $200 / Month
              </span>
              <span className="text-3xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {ROWS[2].months} Months
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 mt-2 block">
                Approximately {ROWS[2].years} years. Total interest earned: {formatSavingsValue(ROWS[2].interestEarned)}.
              </span>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Accelerated Pace: $500 / Month
              </span>
              <span className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                {ROWS[4].months} Months
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 mt-2 block">
                Just 1.5 years (saves 23 full months!). Total interest earned: {formatSavingsValue(ROWS[4].interestEarned)}.
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              By increasing your contribution from $200 to $500 monthly, you reach your $10,000 target in 18 months instead of 41 months — cutting nearly two years off your waiting time.
            </p>
          </div>
        </section>

        {/* Section 3 – Full Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Timeline Comparison Across 5 Contribution Levels
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Review how increasing monthly contributions from $100 to $500 shortens the savings duration from over 6 years down to 1.5 years.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-slate-600 dark:text-slate-400 font-bold">
                  <th className="p-3">Monthly Deposit</th>
                  <th className="p-3">Time to Goal</th>
                  <th className="p-3">Years</th>
                  <th className="p-3">Total Deposited</th>
                  <th className="p-3">Interest Earned</th>
                  <th className="p-3">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-slate-700 dark:text-slate-300">
                {ROWS.map((row) => (
                  <tr key={row.monthlyDeposit} className="hover:bg-slate-50/40 dark:hover:bg-gray-800/20">
                    <td className="p-3 font-sans font-bold text-[#f97316]">{formatSavingsValue(row.monthlyDeposit)}/mo</td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">{row.months} Months</td>
                    <td className="p-3 text-slate-500">{row.years} yrs</td>
                    <td className="p-3">{formatSavingsValue(row.totalDeposited)}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">{formatSavingsValue(row.interestEarned)}</td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">{formatSavingsValue(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            Based on a $10,000 goal, $1,000 initial savings, and 5% annual interest compounded monthly. Matches calculations in the live HelloTools Savings Goal Calculator.
          </p>
        </section>

        {/* Section 4 – Practical Observations */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Strategic Insights on Savings Timelines
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Diminishing timeline returns at very high contributions:</strong> Jumping from $100 to $200 per month trims 33 full months (from 74 down to 41). Jumping from $300 to $500 trims 10 months. The initial boost provides the largest relative timeline relief.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Longer timelines generate higher cumulative interest:</strong> At $100/month, the money stays in the account for over 6 years, earning $1,607.09 in compound interest—accounting for 16% of the final goal.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Automating contributions protects the timeline:</strong> Missing even two months of contributions delays compound growth and extends the finish line further than just the missing cash amount.</span>
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
                q: 'What happens if I stop contributing after a few months?',
                a: 'If contributions stop, your accumulated balance continues to earn compound interest, but reaching your target goal will take substantially longer without fresh deposits.',
              },
              {
                q: 'How does interest rate affect the required timeline?',
                a: 'Higher APYs accelerate balance growth, meaning you reach the target in fewer months. For shorter horizons (under 2 years), your monthly contribution is the dominant driver; for horizons beyond 5 years, interest rate becomes increasingly influential.',
              },
              {
                q: 'Can I start with zero dollars in initial savings?',
                a: 'Yes. The Savings Goal Calculator supports a $0 starting balance. The timeline will simply take slightly longer because no initial capital is earning interest in month one.',
              },
              {
                q: 'Is there a limit on how long the calculator can simulate?',
                a: 'The calculator simulates up to 600 months (50 years). If a very low deposit cannot reach the goal within 50 years, the calculator indicates that the timeframe exceeds 50 years.',
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
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`${prefix}/tools/savings-goal-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            Open Savings Goal Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/savings-goal-calculator/scenarios`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            View All Savings Goal Scenarios
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/simple-interest-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Simple Interest Calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
