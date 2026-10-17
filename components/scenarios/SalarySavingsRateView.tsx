import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, PiggyBank, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateSalaryBreakdown,
  formatCurrency,
} from '@/data/salary-scenarios-data';

interface SalarySavingsRateViewProps {
  locale?: Locale;
}

/* ── Benchmark Salary Tiers with Tiered Savings Calculations ─────────────── */
const SAVINGS_TIERS = [
  { annualGross: 40_000, label: 'Entry Tier ($40k/yr)' },
  { annualGross: 60_000, label: 'Standard Salary ($60k/yr)' },
  { annualGross: 80_000, label: 'Mid-Career ($80k/yr)' },
  { annualGross: 100_000, label: 'Six-Figure Earner ($100k/yr)' },
  { annualGross: 125_000, label: 'Senior Tier ($125k/yr)' },
] as const;

const ROWS = SAVINGS_TIERS.map((tier) => {
  const res = calculateSalaryBreakdown(tier.annualGross, 'year', 40);
  const monthly = res.monthly;

  return {
    ...tier,
    annual: res.annualSalary,
    monthly,
    biweekly: res.biweekly,
    save10Monthly: monthly * 0.10,
    save10Annual: res.annualSalary * 0.10,
    save15Monthly: monthly * 0.15,
    save15Annual: res.annualSalary * 0.15,
    save20Monthly: monthly * 0.20,
    save20Annual: res.annualSalary * 0.20,
    save20Biweekly: res.biweekly * 0.20,
  };
});

export default function SalarySavingsRateView({
  locale = DEFAULT_LOCALE,
}: SalarySavingsRateViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('salary-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Salary Calculator';

  // Base worked example ($60,000 annual)
  const baseCase = ROWS[1];

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
        <Link href={`${prefix}/tools/salary-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/salary-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Much Should I Save From My Salary?
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
        <PiggyBank className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Much Should I Save From My Salary? Benchmarks and Calculations
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Translate your annual or monthly salary into clear savings targets. Compare the standard 10%, 15%, and 20% savings benchmarks across monthly and bi-weekly paychecks.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Savings Frameworks */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Standard Savings Benchmarks for Salary Planning
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Personal finance planners typically recommend targeting between 10% and 20% of your earnings toward savings, debt payoff beyond minimums, and long-term investments. Here is how three common benchmarks function:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  10% Starter Target
                </span>
                <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  Baseline
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                An accessible entry point for early-career workers or households actively paying down non-mortgage consumer debts. Focuses on building an initial 1-month to 3-month emergency reserve.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  15% Retirement Benchmark
                </span>
                <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                The standard rule-of-thumb endorsed by financial advisers for retirement preparedness. Includes employee 401(k) contributions, employer matching funds, and IRA investments.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 bg-orange-50/30 dark:bg-orange-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
                  20% Rule (50/30/20)
                </span>
                <span className="text-xs font-bold bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 px-2 py-0.5 rounded-full">
                  Aggressive
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Derived from the 50/30/20 budget (50% needs, 30% wants, 20% savings). Directs one-fifth of income toward high-yield savings, investments, and rapid wealth accumulation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Worked Example: Savings on a $60,000 Annual Salary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
            Based on the HelloTools Salary Calculator, a <strong>$60,000 annual wage</strong> translates to <strong>$5,000.00 gross per month</strong> ($2,307.69 bi-weekly). Here is how much you set aside under each benchmark:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                10% Savings Rate
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatCurrency(baseCase.save10Monthly)} / mo
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                {formatCurrency(baseCase.save10Annual)} saved per year
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
                15% Savings Rate
              </span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                {formatCurrency(baseCase.save15Monthly)} / mo
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                {formatCurrency(baseCase.save15Annual)} saved per year
              </p>
            </div>

            <div className="p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 bg-orange-50/30 dark:bg-orange-950/20">
              <span className="text-xs text-[#f97316] uppercase font-semibold">
                20% Savings Target
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatCurrency(baseCase.save20Monthly)} / mo
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                {formatCurrency(baseCase.save20Annual)} saved per year ({formatCurrency(baseCase.save20Biweekly)}/paycheck)
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/40 dark:bg-blue-950/20 text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
            <strong>Where to Allocate Your Savings:</strong> A balanced approach splits the 20% target into three buckets: (1) First $1,000–$5,000 into a liquid emergency fund, (2) 401(k) contributions up to the employer match threshold, and (3) tax-advantaged retirement accounts (such as an IRA or HSA). Use our dedicated <strong>Savings Goal Calculator</strong> to project how compound interest accelerates your balance over 5, 10, or 20 years.
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Savings Target Breakdown Across Salary Levels
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
            Compare monthly and annual savings amounts across representative income tiers under 10%, 15%, and 20% allocation rates.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-3 px-4">Income Tier</th>
                  <th className="py-3 px-4 text-right">Annual Salary</th>
                  <th className="py-3 px-4 text-right">Monthly Gross</th>
                  <th className="py-3 px-4 text-right">10% Monthly</th>
                  <th className="py-3 px-4 text-right text-emerald-700 dark:text-emerald-400">
                    15% Monthly
                  </th>
                  <th className="py-3 px-4 text-right font-bold text-orange-600 dark:text-orange-400">
                    20% Monthly (Annual)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {ROWS.map((row) => (
                  <tr
                    key={row.annualGross}
                    className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/20 ${
                      row.annualGross === baseCase.annualGross ? 'bg-orange-50/30 dark:bg-orange-950/10 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-sans font-medium text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.annual)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                      {formatCurrency(row.monthly)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.save10Monthly)}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                      {formatCurrency(row.save15Monthly)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#f97316]">
                      {formatCurrency(row.save20Monthly)}{' '}
                      <span className="text-[11px] font-normal text-gray-400 dark:text-gray-500">
                        ({formatCurrency(row.save20Annual)}/yr)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            * All figures are illustrative proportional calculations derived from gross salary baselines. Adjust targets according to your household debt profile, employer benefits, and living cost requirements.
          </p>
        </section>

        {/* Section 4: Assumptions and Scope */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Savings Planning Assumptions and Guidelines
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              <strong>Gross vs Take-Home Savings Benchmarks:</strong> The 15% retirement rule is traditionally computed on gross income (since 401(k) contributions are pre-tax and employer matches are based on gross salary). The 50/30/20 budgeting rule was originally designed around net take-home pay. Whichever standard you choose, consistency and automated transfers matter far more than the formula choice.
            </p>
            <p>
              <strong>Employer Match Inclusion:</strong> If your employer matches 100% of your 401(k) contributions up to 4% of salary, contributing 5% of your salary effectively captures a 9% overall retirement contribution rate.
            </p>
            <p>
              <strong>Emergency Reserves:</strong> Financial experts universally recommend holding 3 to 6 months of essential living expenses in an FDIC-insured high-yield savings account before aggressively committing extra cash to non-liquid investments.
            </p>
          </div>
        </section>

        {/* Educational Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Section 5: Scenario FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'Should I calculate my savings rate from my gross salary or net take-home pay?',
                a: 'For retirement planning, calculating based on gross income is standard because 401(k) and traditional retirement contributions are deducted pre-tax before income tax is calculated. For short-term cash savings and discretionary emergency funds, measuring savings against your actual net take-home deposit provides a clearer picture of your monthly cash flow.',
              },
              {
                q: 'What is the 50/30/20 budgeting rule?',
                a: 'Popularized by financial experts, the 50/30/20 framework divides your spendable income into three categories: 50% for essential needs (housing, utilities, groceries, healthcare), 30% for personal wants (dining out, entertainment, hobbies), and 20% for savings, investments, and debt payments beyond minimum amounts.',
              },
              {
                q: 'Should I pay off high-interest debt or save money first?',
                a: 'Most financial planners recommend building a small starter emergency fund ($1,000 to 1 month of living expenses) first, then aggressively directing surplus funds toward high-interest consumer debt (such as credit cards charging 20%+ APR). Once high-interest debt is eliminated, you can redirect those monthly payments toward full emergency reserves and retirement savings.',
              },
              {
                q: 'How can I automate my salary savings so I don&apos;t spend it?',
                a: 'Set up split direct deposits through your employer payroll portal to deposit a fixed dollar amount or percentage directly into a separate high-yield savings account on payday. Alternatively, schedule automated recurring bank transfers from checking to savings for the morning after your payday.',
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
              href={`${prefix}/tools/salary-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Salary Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/salary-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Salary Scenarios
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
              href={`${prefix}/tools/retirement-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Retirement Savings Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/understanding-tax-brackets"
              className="text-[#f97316] hover:underline font-semibold"
            >
              Understanding Progressive Tax Brackets Simply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
