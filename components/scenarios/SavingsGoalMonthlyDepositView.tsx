import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Target, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateRequiredMonthlyDeposit,
  formatSavingsValue,
} from '@/data/savings-goal-scenarios-data';

interface SavingsGoalMonthlyDepositViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const TARGET_GOAL = 10_000;
const INITIAL_SAVINGS = 1_000;
const APR = 5;
const COMPOUND_FREQ = 12; // monthly compounding
const TIME_HORIZONS = [
  { label: '1 Year (12 months)', months: 12 },
  { label: '2 Years (24 months)', months: 24 },
  { label: '3 Years (36 months)', months: 36 },
  { label: '4 Years (48 months)', months: 48 },
  { label: '5 Years (60 months)', months: 60 },
] as const;

/* ── Pre-compute rows using verified utility ────────────────────────────── */
const ROWS = TIME_HORIZONS.map((h) => {
  const result = calculateRequiredMonthlyDeposit(
    TARGET_GOAL,
    INITIAL_SAVINGS,
    APR,
    COMPOUND_FREQ,
    h.months
  );
  return {
    ...h,
    monthlyDeposit: result.requiredDeposit,
    totalDeposited: result.deposits,
    interestEarned: result.interest,
    endingBalance: result.balance,
  };
});

export default function SavingsGoalMonthlyDepositView({
  locale = DEFAULT_LOCALE,
}: SavingsGoalMonthlyDepositViewProps) {
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
          How Much Should I Save Each Month?
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
        <Target className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Much Should I Save Each Month to Reach My Goal?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            See the exact monthly contribution needed to reach a $10,000 target starting with $1,000 in existing savings at 5% APY with monthly compounding across 1 to 5 years.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Mechanics */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Your Savings Target and Deadline Determine Required Deposits
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When you know your financial target and target deadline, calculating the required monthly deposit depends on three primary factors: your initial lump-sum balance, your annual interest rate (APY), and how frequently interest compounds.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In our HelloTools Savings Goal Calculator, contributions occur at regular monthly intervals while compounding interest is credited monthly on the accumulated balance. Because interest accumulates on prior contributions and past interest, your out-of-pocket contributions total less than the full $10,000 goal.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Compound Simulation Method:
            </span>
            Balance_(t) = Balance_(t-1) × (1 + r/c) + Monthly Contribution
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li><span className="font-bold">r</span> — nominal annual interest rate (e.g. 0.05 for 5%)</li>
            <li><span className="font-bold">c</span> — compounding periods per year (12 for monthly compounding)</li>
            <li><span className="font-bold">Balance_(0)</span> — starting capital ($1,000)</li>
          </ul>
        </section>

        {/* Section 2 – Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Worked Example: 2-Year (24-Month) Savings Plan
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Parameters: $10,000 goal, $1,000 starting savings, 5% annual rate, compounded monthly, 24-month horizon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f97316] block">
                Required Monthly Deposit
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatSavingsValue(ROWS[1].monthlyDeposit)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">per month for 24 months</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Total You Deposit
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatSavingsValue(ROWS[1].totalDeposited)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">$1,000 start + $8,476.32 contributions</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Compound Interest Earned
              </span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                {formatSavingsValue(ROWS[1].interestEarned)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">Ending balance: {formatSavingsValue(ROWS[1].endingBalance)}</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              <strong>Step 1:</strong> You start with $1,000 on day one. During month 1, that $1,000 earns approximately $4.17 in interest at 5% APY ($1,000 × 0.05 / 12).
            </p>
            <p>
              <strong>Step 2:</strong> At the end of month 1, you deposit $353.18, bringing your balance to $1,357.35.
            </p>
            <p>
              <strong>Step 3:</strong> In month 2, interest is earned on the larger $1,357.35 balance ($5.66), accelerating your progress.
            </p>
            <p>
              <strong>Step 4:</strong> By month 24, compound interest contributes $523.77 toward your goal, meaning you only had to save $9,476.32 out of pocket to reach $10,000.
            </p>
          </div>
        </section>

        {/* Section 3 – Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Timeline Comparison: 1 Year to 5 Years
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare how extending your savings horizon reduces your required monthly contribution while increasing compound interest earned.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-slate-600 dark:text-slate-400 font-bold">
                  <th className="p-3">Timeline</th>
                  <th className="p-3">Required Deposit / Month</th>
                  <th className="p-3">Total Deposits</th>
                  <th className="p-3">Interest Earned</th>
                  <th className="p-3">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-slate-700 dark:text-slate-300">
                {ROWS.map((row) => (
                  <tr key={row.months} className="hover:bg-slate-50/40 dark:hover:bg-gray-800/20">
                    <td className="p-3 font-sans font-semibold text-gray-900 dark:text-white">{row.label}</td>
                    <td className="p-3 font-bold text-[#f97316]">{formatSavingsValue(row.monthlyDeposit)}</td>
                    <td className="p-3">{formatSavingsValue(row.totalDeposited)}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">{formatSavingsValue(row.interestEarned)}</td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">{formatSavingsValue(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            Assumes an annual interest rate of 5.00% compounded monthly with $1,000 initial balance toward a $10,000 goal. All calculations match the live Savings Goal Calculator.
          </p>
        </section>

        {/* Section 4 – Strategic takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Key Planning Takeaways
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Doubling your timeframe cuts monthly stress in half:</strong> Moving from 1 year ($728.80/month) to 2 years ($353.18/month) reduces the required monthly burden by more than 51%.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Time lets interest do more heavy lifting:</strong> In a 1-year sprint, interest only provides $254.40. Over 5 years, compound interest generates $1,309.59—more than 5× as much.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Starting with existing savings gives a critical head start:</strong> The initial $1,000 earns interest for the entire duration, lowering monthly deposits compared to starting from $0.</span>
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
                q: 'How does the calculator determine the required monthly contribution?',
                a: 'The calculator runs a high-precision binary search simulation over the exact monthly compounding equation to find the smallest monthly deposit that achieves or surpasses your target goal within your chosen deadline.',
              },
              {
                q: 'Are contributions assumed at the beginning or end of each month?',
                a: 'In this simulation model, monthly deposits are added during each monthly compounding cycle, allowing current balance plus interest to accumulate consecutively.',
              },
              {
                q: 'What if I cannot afford the required monthly deposit?',
                a: 'If the monthly deposit exceeds your budget, you have three options: extend your deadline, lower your target goal amount, or deposit an initial lump sum upfront to boost early compounding.',
              },
              {
                q: 'Does this calculation factor in taxes or account fees?',
                a: 'No. The simulation calculates pure pre-tax interest growth. If your savings are held in a taxable account, taxes on earned interest will slightly reduce your net growth rate.',
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
