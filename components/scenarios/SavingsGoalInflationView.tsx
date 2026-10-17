import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingUp, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateRequiredMonthlyDeposit,
  inflationAdjusted,
  formatSavingsValue,
} from '@/data/savings-goal-scenarios-data';

interface SavingsGoalInflationViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const NOMINAL_TARGET = 10_000;
const INITIAL_SAVINGS = 1_000;
const APR = 5;
const COMPOUND_FREQ = 12; // monthly compounding
const INFLATION_RATE_PCT = 3; // 3% annual inflation assumption
const PERIODS = [
  { label: '1 Year (12 mo)', years: 1, months: 12 },
  { label: '2 Years (24 mo)', years: 2, months: 24 },
  { label: '3 Years (36 mo)', years: 3, months: 36 },
  { label: '5 Years (60 mo)', years: 5, months: 60 },
  { label: '10 Years (120 mo)', years: 10, months: 120 },
] as const;

/* ── Pre-compute rows using verified utility ────────────────────────────── */
const ROWS = PERIODS.map((p) => {
  // 1. What $10,000 in future buys in today's money (purchasing power)
  const purchasingPowerOf10k = inflationAdjusted(NOMINAL_TARGET, INFLATION_RATE_PCT, p.years);

  // 2. Future cost of what costs $10,000 today:
  const inflatedTarget = Math.round(NOMINAL_TARGET * Math.pow(1 + INFLATION_RATE_PCT / 100, p.years) * 100) / 100;

  // 3. Required monthly deposit for nominal $10,000
  const reqNominal = calculateRequiredMonthlyDeposit(NOMINAL_TARGET, INITIAL_SAVINGS, APR, COMPOUND_FREQ, p.months);

  // 4. Required monthly deposit to reach the inflated target (maintaining real purchasing power)
  const reqAdjusted = calculateRequiredMonthlyDeposit(inflatedTarget, INITIAL_SAVINGS, APR, COMPOUND_FREQ, p.months);

  return {
    ...p,
    purchasingPowerOf10k,
    purchasingLossPct: Math.round(((NOMINAL_TARGET - purchasingPowerOf10k) / NOMINAL_TARGET) * 1000) / 10,
    inflatedTarget,
    monthlyDepositNominal: reqNominal.requiredDeposit,
    monthlyDepositAdjusted: reqAdjusted.requiredDeposit,
    extraMonthlyNeeded: Math.round((reqAdjusted.requiredDeposit - reqNominal.requiredDeposit) * 100) / 100,
  };
});

export default function SavingsGoalInflationView({
  locale = DEFAULT_LOCALE,
}: SavingsGoalInflationViewProps) {
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
          How Inflation Affects Your Goal
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
        <TrendingUp className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Inflation Affects Your Savings Goal
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            Understand the critical gap between reaching a nominal $10,000 balance and retaining full real purchasing power over 1 to 10 years at a 3% annual inflation rate.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Nominal vs Real Target */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Nominal Goals vs. Real Purchasing Power
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A standard savings goal calculator works in <strong>nominal dollars</strong> — the actual face-value dollar balance you see printed on a bank statement. However, if goods and services rise in price over time due to inflation, the future purchasing power of that nominal dollar amount steadily declines.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If your goal is to buy a car, pay a wedding expense, or fund a tuition deposit 5 years from now, reaching exactly $10,000 nominal might leave you short if that expense has risen to $11,592.74 due to inflation.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Purchasing Power Adjustment Formula:
            </span>
            Real Purchasing Power = Nominal Goal ÷ (1 + i)^t
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li><span className="font-bold">i</span> — annual inflation rate (3% in this model)</li>
            <li><span className="font-bold">t</span> — time horizon in years</li>
          </ul>
        </section>

        {/* Section 2 – Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Worked Example: 5-Year Savings Goal Under 3% Inflation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Parameters: $10,000 nominal goal, $1,000 initial savings, 5% annual interest compounded monthly, 3% annual inflation over 5 years (60 months).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f97316] block">
                Purchasing Power of $10,000
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatSavingsValue(ROWS[3].purchasingPowerOf10k)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                A 13.7% loss in real purchasing power
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Adjusted Future Target
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatSavingsValue(ROWS[3].inflatedTarget)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Target needed to buy $10,000 of goods in Year 5
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Adjusted Monthly Deposit
              </span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                {formatSavingsValue(ROWS[3].monthlyDepositAdjusted)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                +{formatSavingsValue(ROWS[3].extraMonthlyNeeded)}/mo vs. nominal ($128.18/mo)
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              To maintain the exact purchasing power of $10,000 over 5 years, you need to save an extra <strong>$23.42 per month</strong> ($151.60 vs. $128.18). Because your savings account earns 5% interest while inflation runs at 3%, your real rate of return is positive (+2%), which helps you outpace inflation.
            </p>
          </div>
        </section>

        {/* Section 3 – Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Inflation Impact Table (1 to 10 Years)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Review how inflation erodes purchasing power and increases the monthly contribution required to maintain real target value.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-slate-600 dark:text-slate-400 font-bold">
                  <th className="p-3">Horizon</th>
                  <th className="p-3">Real Value of $10k</th>
                  <th className="p-3">Adjusted Goal Target</th>
                  <th className="p-3">Nominal Monthly Save</th>
                  <th className="p-3">Inflation-Adjusted Save</th>
                  <th className="p-3">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-slate-700 dark:text-slate-300">
                {ROWS.map((row) => (
                  <tr key={row.years} className="hover:bg-slate-50/40 dark:hover:bg-gray-800/20">
                    <td className="p-3 font-sans font-semibold text-gray-900 dark:text-white">{row.label}</td>
                    <td className="p-3 text-red-600 dark:text-red-400">{formatSavingsValue(row.purchasingPowerOf10k)}</td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">{formatSavingsValue(row.inflatedTarget)}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{formatSavingsValue(row.monthlyDepositNominal)}/mo</td>
                    <td className="p-3 font-bold text-[#f97316]">{formatSavingsValue(row.monthlyDepositAdjusted)}/mo</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">+{formatSavingsValue(row.extraMonthlyNeeded)}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            Assumes 3.00% constant annual inflation, 5.00% annual savings yield compounded monthly, and $1,000 initial savings.
          </p>
        </section>

        {/* Section 4 – Strategic takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How to Protect Your Savings Goal From Inflation
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Keep interest rate above the inflation rate:</strong> When your savings earn 5% and inflation is 3%, your real purchasing power expands. If your account only earns 0.5% while inflation is 3%, you lose purchasing power every month.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Adjust your target amount annually:</strong> For long-term goals (3+ years), revisit your savings target once a year and increase your monthly contribution by the rate of inflation.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Short-term goals have low inflation risk:</strong> Over 12 to 24 months, inflation causes only a 2.9% to 5.7% shift, so nominal targets are usually accurate enough for emergency funds or holiday budgets.</span>
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
                q: 'Does the live Savings Goal Calculator adjust for inflation automatically?',
                a: 'The main Savings Goal Calculator computes nominal future balances based on your chosen APY. To plan for inflation, you can either enter an inflation-adjusted target goal amount or enter a "real return" rate (your APY minus expected inflation).',
              },
              {
                q: 'What is a reasonable long-term inflation assumption?',
                a: 'Most central banks target an annual inflation rate of approximately 2% to 3%. Historical long-term averages in developed economies often range between 2.5% and 3.5%.',
              },
              {
                q: 'Where can I calculate historical or projected inflation figures?',
                a: 'You can use the HelloTools Inflation Calculator, which provides official BLS Consumer Price Index (CPI-U) data as well as custom future inflation projections.',
              },
              {
                q: 'Are high-yield savings accounts enough to beat inflation?',
                a: 'When central bank interest rates are high, high-yield savings accounts often offer rates that match or slightly exceed inflation. However, taxes on interest income can reduce your net return, making long-term goals beyond 5–10 years better suited for diversified investment accounts.',
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
