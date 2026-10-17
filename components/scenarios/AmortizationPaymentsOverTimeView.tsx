import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Clock } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateAmortization,
  formatCurrency,
} from '@/data/amortization-scenarios-data';

interface AmortizationPaymentsOverTimeViewProps {
  locale?: Locale;
}

/* ── Fixed Baseline Parameters ──────────────────────────────────────────── */
const LOAN_AMOUNT = 200_000;
const ANNUAL_RATE = 6.0;
const TERM_MONTHS = 360; // 30 Years

const RESULT = calculateAmortization(LOAN_AMOUNT, ANNUAL_RATE, TERM_MONTHS);

export default function AmortizationPaymentsOverTimeView({
  locale = DEFAULT_LOCALE,
}: AmortizationPaymentsOverTimeViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('amortization-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Amortization Calculator';

  if (!RESULT) return null;

  const monthlyPayment = RESULT.regularPayment;
  const totalInterest = RESULT.totalInterest;
  const totalCost = RESULT.totalCost;

  // Selected payment milestones from the 360-month schedule
  const schedule = RESULT.monthlySchedule;
  const milestoneIndices = [0, 59, 119, 179, 222, 239, 299, 359];
  const milestoneRows = milestoneIndices
    .map((idx) => schedule[idx])
    .filter(Boolean);

  // Selected annual summaries
  const annualSchedule = RESULT.annualSchedule;
  const annualMilestones = [0, 4, 9, 14, 19, 24, 29]
    .map((idx) => annualSchedule[idx])
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl flex-wrap"
      >
        <Link href={prefix || '/'} className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{homeLabel}</span>
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/#finance`} className="hover:text-gray-950 dark:hover:text-white">
          {financeLabel}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/amortization-calculator`} className="hover:text-gray-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/amortization-calculator/scenarios`} className="hover:text-gray-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Payments Change Over Time
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
            How Loan Payments Change Over Time: Principal vs. Interest Breakdown
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Understand how fixed installment loans are structured. While your total monthly payment remains constant, the internal distribution between interest charges and principal debt reduction transforms dramatically from Year 1 to Year 30.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Mechanics */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Fixed Amortization Splits Each Payment
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            On any fixed-rate installment loan (such as a standard 30-year mortgage or fixed personal loan), every monthly payment is divided into two parts:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
                1. Monthly Interest
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Calculated as <code className="font-mono bg-white dark:bg-gray-900 px-1 py-0.5 rounded">Current Balance × (Annual Rate ÷ 12)</code>. Because your balance is highest at the beginning, interest takes the lion&apos;s share of your earliest payments.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                2. Principal Reduction
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Calculated as <code className="font-mono bg-white dark:bg-gray-900 px-1 py-0.5 rounded">Total Payment − Interest</code>. As the balance shrinks each month, less interest accrues, allowing a greater share of subsequent payments to wipe out principal.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Baseline assumptions for this scenario: $200,000 starting principal, 6.00% fixed annual interest rate, 30-year term (360 monthly payments). Property taxes, insurance, escrow, and extra payments are excluded to reflect the standard mathematical amortization curve.
          </p>
        </section>

        {/* Section 2 – Worked numerical example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $200,000 Loan at 6.0% for 30 Years
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Using the standard amortization formula, a $200,000 loan at 6.00% interest over 360 months requires a fixed monthly payment of <strong className="text-gray-900 dark:text-white">{formatCurrency(monthlyPayment, locale)}</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Fixed Monthly Payment
              </span>
              <span className="text-xl font-black font-mono text-gray-900 dark:text-white">
                {formatCurrency(monthlyPayment, locale)}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Interest Over Term
              </span>
              <span className="text-xl font-black font-mono text-orange-600 dark:text-orange-400">
                {formatCurrency(totalInterest, locale)}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Lifetime Cost
              </span>
              <span className="text-xl font-black font-mono text-gray-900 dark:text-white">
                {formatCurrency(totalCost, locale)}
              </span>
            </div>
          </div>

          <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Key Milestone Comparison: Month 1 vs. Month 360
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Month 1 (First Payment):</p>
                <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Interest: <strong className="text-orange-600 dark:text-orange-400">$1,000.00</strong> (83.4% of payment)</li>
                  <li>Principal: <strong className="text-blue-600 dark:text-blue-400">$199.10</strong> (16.6% of payment)</li>
                  <li>Ending Balance: $199,800.90</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Month 360 (Final Payment):</p>
                <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Interest: <strong className="text-orange-600 dark:text-orange-400">$5.97</strong> (0.5% of payment)</li>
                  <li>Principal: <strong className="text-blue-600 dark:text-blue-400">$1,193.14</strong> (99.5% of payment)</li>
                  <li>Ending Balance: $0.00</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 – Milestone Progression Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Schedule Milestones: How the Payment Mix Shifts
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            This table tracks specific monthly payment snapshots across the 30-year schedule, showing the exact dollar amounts and percentage shift from interest to principal.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[540px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Payment #</th>
                  <th className="py-3 pr-4 font-semibold">Timeline</th>
                  <th className="py-3 pr-4 text-right font-semibold">Monthly Payment</th>
                  <th className="py-3 pr-4 text-right font-semibold">Principal Paid</th>
                  <th className="py-3 pr-4 text-right font-semibold">Interest Paid</th>
                  <th className="py-3 text-right font-semibold">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-xs">
                {milestoneRows.map((row) => {
                  const timeline =
                    row.period === 1
                      ? 'Start'
                      : row.period === 60
                      ? 'Year 5'
                      : row.period === 120
                      ? 'Year 10'
                      : row.period === 180
                      ? 'Year 15 (Midpoint)'
                      : row.period === 223
                      ? 'Crossover Point'
                      : row.period === 240
                      ? 'Year 20'
                      : row.period === 300
                      ? 'Year 25'
                      : 'Final Month';

                  const isCrossover = row.period === 223;

                  return (
                    <tr
                      key={row.period}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${
                        isCrossover ? 'bg-orange-50/40 dark:bg-orange-950/20 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 pr-4 text-gray-900 dark:text-white font-sans font-semibold">
                        Month {row.period}
                      </td>
                      <td className="py-3 pr-4 text-gray-600 dark:text-gray-300 font-sans">
                        {timeline}
                      </td>
                      <td className="py-3 pr-4 text-right text-gray-900 dark:text-white">
                        {formatCurrency(row.payment, locale)}
                      </td>
                      <td className="py-3 pr-4 text-right text-blue-600 dark:text-blue-400">
                        {formatCurrency(row.principal, locale)}
                      </td>
                      <td className="py-3 pr-4 text-right text-orange-600 dark:text-orange-400">
                        {formatCurrency(row.interest, locale)}
                      </td>
                      <td className="py-3 text-right text-gray-900 dark:text-white">
                        {formatCurrency(row.balance, locale)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 leading-relaxed">
            Note: Month 223 (approximately 18.5 years in) represents the &ldquo;crossover point&rdquo; where principal repaid (${formatCurrency(schedule[222].principal, locale)}) first exceeds interest paid (${formatCurrency(schedule[222].interest, locale)}).
          </p>
        </section>

        {/* Section 4 – Annual Breakdown Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Annual Cumulative Summary Milestones
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Annual aggregates illustrate the cumulative pace of debt payoff. Early years produce heavy interest deductions for tax filers who itemize, whereas later years accelerate net worth accumulation.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Year</th>
                  <th className="py-3 pr-4 text-right font-semibold">Total Paid</th>
                  <th className="py-3 pr-4 text-right font-semibold">Principal Paid</th>
                  <th className="py-3 pr-4 text-right font-semibold">Interest Paid</th>
                  <th className="py-3 text-right font-semibold">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-xs">
                {annualMilestones.map((yr) => (
                  <tr key={yr.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-4 text-gray-900 dark:text-white font-sans font-semibold">
                      Year {yr.year}
                    </td>
                    <td className="py-3 pr-4 text-right text-gray-700 dark:text-gray-300">
                      {formatCurrency(yr.totalPayment, locale)}
                    </td>
                    <td className="py-3 pr-4 text-right text-blue-600 dark:text-blue-400">
                      {formatCurrency(yr.totalPrincipal, locale)}
                    </td>
                    <td className="py-3 pr-4 text-right text-orange-600 dark:text-orange-400">
                      {formatCurrency(yr.totalInterest, locale)}
                    </td>
                    <td className="py-3 text-right text-gray-900 dark:text-white">
                      {formatCurrency(yr.endingBalance, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 – Practical Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Key Insights from Payment Progression
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>The Crossover Point happens late:</strong> On a 30-year fixed loan at 6%, the point where more than 50% of your payment reduces principal occurs in Month 223 (Year 19), far past the chronological midpoint of 15 years.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Early equity builds slowly:</strong> After 5 full years (60 payments totaling $71,946.06), the remaining balance is still $186,108.71. Over 80% of all payments in those first 5 years went directly to interest.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Terminal payoff accelerates:</strong> In the final 5 years (Years 25 to 30), balance reduction speeds up exponentially as nearly the entire monthly payment reduces principal.</span>
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
                q: 'Why is most of my early loan payment allocated to interest?',
                a: 'Interest is charged directly on the outstanding principal balance. In Month 1, your balance is at its maximum ($200,000), resulting in the largest possible monthly interest charge ($1,000 at 6%). Because the total payment is fixed at $1,199.10, only the leftover amount ($199.10) is applied to principal.',
              },
              {
                q: 'At what point does more of the payment go toward principal than interest?',
                a: 'The crossover point depends on the interest rate and term. At 6% on a 30-year loan, crossover occurs in Month 223 (Year 19). At higher interest rates, crossover occurs even later; at lower interest rates, crossover occurs earlier in the loan life.',
              },
              {
                q: 'Does the monthly payment amount ever change on a fixed amortization loan?',
                a: 'No. On a standard fixed installment loan, the base principal-and-interest installment remains exactly the same every month until maturity. If your monthly mortgage bill changes in the real world, it is almost always due to fluctuations in escrow items such as local property taxes or homeowner’s insurance.',
              },
              {
                q: 'Does this calculation match the HelloTools Amortization Calculator?',
                a: 'Yes. This scenario is computed using the exact same calculateAmortization utility that powers the main calculator. You can reproduce this exact table by entering $200,000 loan amount, 6% interest rate, and 30 years into the tool.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{faq.q}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation & Internal Links */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href={`${prefix}/tools/amortization-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            Open Amortization Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/amortization-calculator/scenarios`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            View All Amortization Scenarios
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/mortgage-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Mortgage Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/emi-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            EMI Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/blog/how-to-calculate-loan-amortization-schedule`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Amortization Guide Article
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
