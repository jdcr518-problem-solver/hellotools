import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Percent, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calcStudentLoanDetails,
  formatCurrency,
  formatNumber,
} from '@/data/student-loan-scenarios-data';

interface StudentLoanRateComparisonViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const PRINCIPAL = 40_000;
const TERM_MONTHS = 120; // 10 years standard repayment

const RATE_TIERS = [
  { rate: 4.5, label: '4.5% APR', description: 'Federal Undergraduate Subsidized/Unsubsidized benchmark' },
  { rate: 6.5, label: '6.5% APR', description: 'Federal Graduate / Direct Unsubsidized tier' },
  { rate: 8.0, label: '8.0% APR', description: 'Federal Direct PLUS / Standard Private Loan' },
  { rate: 10.0, label: '10.0% APR', description: 'High-APR Private / Credit-based student loan' },
] as const;

/* ── Pre-compute rows using pure verified calculation ────────────────────── */
const ROWS = RATE_TIERS.map((tier) => {
  const details = calcStudentLoanDetails({
    loanAmount: PRINCIPAL,
    interestRate: tier.rate,
    loanTermMonths: TERM_MONTHS,
  });

  return {
    ...tier,
    monthlyPayment: details.monthlyPayment,
    totalInterest: details.totalInterest,
    totalPayments: details.totalPayments,
  };
});

export default function StudentLoanRateComparisonView({
  locale = DEFAULT_LOCALE,
}: StudentLoanRateComparisonViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('student-loan-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Student Loan Calculator';

  const baseTier = ROWS[0]; // 4.5% APR
  const workedTier = ROWS[1]; // 6.5% APR worked example
  const highTier = ROWS[3]; // 10.0% APR

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
        <Link href={`${prefix}/tools/student-loan-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/student-loan-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Interest Rate Changes Your Student Loan Cost
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
        <Percent className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Interest Rate Changes Your Student Loan Cost
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Examine how variations in student loan interest rates affect your monthly payment, cumulative interest, and total repayment amount over a standard 10-year term.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Impact of Interest Rate */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Why Even a Small Interest Rate Difference Matters
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because student loans are amortized over 10 or more years, interest accrues every single month against your remaining principal balance. Even a 1% or 2% difference in annual percentage rate (APR) compounds substantially, resulting in thousands of dollars in additional financing charges over the life of the loan.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Monthly Amortization Formula:
            </span>
            Monthly Payment = Principal × [r(1 + r)^N] ÷ [(1 + r)^N - 1]
            <br />
            Where r = Annual Rate ÷ 12 and N = 120 Months
          </div>
          <div className="mt-4 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Baseline Scenario Assumptions:</p>
            <p>• <strong>Loan Principal:</strong> $40,000.00 (representative four-year undergraduate or graduate loan balance)</p>
            <p>• <strong>Repayment Period:</strong> 120 months (10-year standard term)</p>
            <p>• <strong>Extra Payments:</strong> $0.00 (only scheduled monthly installments)</p>
            <p>• <strong>Rates Compared:</strong> 4.5%, 6.5%, 8.0%, and 10.0% fixed APR</p>
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $40,000 Loan at 4.5% vs. 6.5% vs. 10.0% APR
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Let us trace how interest accumulates on a <strong>$40,000 loan balance</strong> across different interest rate tiers over 120 months:
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span><strong>Low-Rate Tier (4.5% APR):</strong> Monthly installment is <strong>${formatNumber(baseTier.monthlyPayment, locale, 2)}</strong>. Total interest paid is <strong>${formatNumber(baseTier.totalInterest, locale, 2)}</strong>, with a total cost of ${formatNumber(baseTier.totalPayments, locale, 2)}.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span><strong>Moderate-Rate Tier (6.5% APR):</strong> Increasing the rate by 2.0% raises the monthly payment by $39.64 to <strong>${formatNumber(workedTier.monthlyPayment, locale, 2)}</strong>, adding <strong>${formatNumber(workedTier.totalInterest - baseTier.totalInterest, locale, 2)} in extra interest</strong> (${formatNumber(workedTier.totalInterest, locale, 2)} total interest).</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span><strong>High-Rate Tier (10.0% APR):</strong> A 10.0% APR increases the payment to <strong>${formatNumber(highTier.monthlyPayment, locale, 2)}/month</strong> (+$114.05/month vs 4.5%), generating a staggering <strong>${formatNumber(highTier.totalInterest, locale, 2)} in total interest</strong>.</span>
            </div>
          </div>
          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Key Finding: A rate change from 4.5% to 10.0% adds $13,686.09 in total interest charges—an increase of more than 140%.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              At 10% APR, interest represents 36.9% of your total payments, compared to just 19.6% at 4.5% APR.
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Interest Rate Comparison Table ($40,000 Principal, 10-Year Term)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Compare monthly installments and total borrowing costs across representative student loan interest rates:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Interest Rate (APR)</th>
                  <th className="py-3 pr-3 font-semibold">Market Benchmark</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Monthly Payment</th>
                  <th className="py-3 pr-3 font-semibold">Total Interest</th>
                  <th className="py-3 font-semibold">Total Loan Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.rate} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 pr-3 text-xs text-slate-600 dark:text-slate-400">
                      {row.description}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatCurrency(row.monthlyPayment, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.totalInterest, locale, 2)}
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">
                      {formatCurrency(row.totalPayments, locale, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Note: All figures assume fixed interest rates amortized over 120 equal monthly installments with zero origination fees.
          </p>
        </section>

        {/* Section 4: Practical Rate Management */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Practical Strategies to Lower Your Interest Burden
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              Managing your interest rate is one of the most effective ways to reduce student debt costs:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Automatic Payment Discounts:</strong> Most federal loan servicers and private lenders offer a standard <strong>0.25% interest rate discount</strong> for enrolling in automated recurring payments (autopay). On a $40,000 10-year loan, a 0.25% discount saves approximately $600 in lifetime interest.
              </li>
              <li>
                <strong>Federal Fixed vs. Private Variable:</strong> Federal student loans have fixed interest rates set annually by federal statute. Private student loans often offer variable-rate options, which may start lower but can rise over time as benchmark interest rates climb.
              </li>
              <li>
                <strong>Refinancing Opportunities:</strong> If your credit score or income improves substantially after entering the workforce, refinancing private student loans at a lower fixed rate can shave percentage points off your borrowing rate and save thousands in interest.
              </li>
            </ul>
          </div>
        </section>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" compact={false} />

        {/* Section 5: Scenario FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'How are federal student loan interest rates determined?',
                a: 'Federal student loan interest rates are set each year by the U.S. Congress based on the high yield of the 10-year Treasury note plus a statutory markup. Once disbursed, federal direct loans have a fixed interest rate that never changes for the life of that loan.',
              },
              {
                q: 'What is the difference between subsidized and unsubsidized student loans?',
                a: 'For federal Direct Subsidized loans, the government pays the interest while you are enrolled in school at least half-time and during grace periods. For Unsubsidized loans, interest accrues immediately from the date of disbursement and is capitalized if unpaid.',
              },
              {
                q: 'Can refinancing lower my student loan interest rate?',
                a: 'Yes, if you have good credit (typically 670+) and sufficient income, private lenders may offer lower rates than your current loans. However, refinancing federal loans with a private lender permanently forfeits federal protections like income-driven repayment and forgiveness programs.',
              },
              {
                q: 'Does making extra principal payments reduce my effective interest rate?',
                a: 'While it does not change your contract APR, extra payments directly pay down your principal balance early. Since interest is calculated on remaining balance, paying down principal reduces total interest accrued, achieving the same financial benefit as a lower interest rate.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{faq.q}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation and Internal Links */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Explore Related Student Loan &amp; Financing Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/student-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Student Loan Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/student-loan-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Student Loan Scenarios
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/apr-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              APR Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/emi-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              EMI Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/amortization-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Amortization Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/apr-vs-interest-rate-difference-explained"
              className="text-[#f97316] hover:underline font-semibold"
            >
              APR vs. Stated Interest Rate: Why the Difference Matters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
