import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, DollarSign, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calcMaxAffordableStudentLoan,
  formatCurrency,
  formatNumber,
} from '@/data/student-loan-scenarios-data';

interface StudentLoanAffordabilityViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const RATE = 6.5; // 6.5% APR
const TERM_MONTHS = 120; // 10 years standard repayment

const INCOME_TIERS = [
  { grossMonthly: 3000, targetPct: 10 },
  { grossMonthly: 4000, targetPct: 10 },
  { grossMonthly: 5000, targetPct: 10 },
  { grossMonthly: 6500, targetPct: 10 },
  { grossMonthly: 8000, targetPct: 10 },
] as const;

/* ── Pre-compute rows using pure verified calculation ────────────────────── */
const ROWS = INCOME_TIERS.map((tier) => {
  const targetPayment = (tier.grossMonthly * tier.targetPct) / 100;
  const { maxPrincipal, verifiedDetails } = calcMaxAffordableStudentLoan(
    targetPayment,
    RATE,
    TERM_MONTHS
  );

  return {
    grossMonthly: tier.grossMonthly,
    annualGross: tier.grossMonthly * 12,
    targetPayment,
    maxPrincipal,
    monthlyPayment: verifiedDetails.monthlyPayment,
    totalInterest: verifiedDetails.totalInterest,
    totalPayments: verifiedDetails.totalPayments,
  };
});

export default function StudentLoanAffordabilityView({
  locale = DEFAULT_LOCALE,
}: StudentLoanAffordabilityViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('student-loan-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Student Loan Calculator';

  // Worked example tier ($4,000/month gross income)
  const workedTier = ROWS[1];

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
          How Much Student Loan Can I Afford?
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
            How Much Student Loan Can I Afford?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Estimate an affordable student loan principal based on standard financial planning rules of thumb, monthly income allocations, and standard 10-year repayment terms.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: How Student Loan Affordability Works */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Student Loan Affordability Is Estimated
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Financial aid counselors and personal finance experts widely recommend keeping total monthly student loan debt service at or below <strong>8% to 10% of gross monthly income</strong>. Another common rule of thumb is that total education debt borrowed should ideally not exceed your expected first-year starting salary after graduation.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Affordable Principal Formula:
            </span>
            Max Principal = Target Monthly Payment ÷ [r(1 + r)^N ÷ ((1 + r)^N - 1)]
          </div>
          <div className="mt-4 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Baseline Scenario Assumptions:</p>
            <p>• <strong>Interest Rate:</strong> 6.5% fixed annual percentage rate (APR)</p>
            <p>• <strong>Repayment Period:</strong> 120 months (Standard 10-year amortized term)</p>
            <p>• <strong>Income Allocation:</strong> 10% of gross pre-tax monthly income</p>
            <p>• <strong>Repayment Structure:</strong> Standard fixed amortizing monthly installments</p>
            <p>• <strong>Excluded Factors:</strong> Origination fees, deferment capitalization, income-driven repayment formulas, and loan forgiveness programs are excluded from this baseline model.</p>
          </div>
        </section>

        {/* Section 2: Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $48,000 Annual Salary ($4,000/Month Gross)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Suppose an undergraduate anticipates an entry-level gross starting salary of <strong>$48,000 per year</strong> ($4,000 per month). Using the 10% debt budget guideline:
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span><strong>Target Monthly Repayment:</strong> 10% of $4,000 equals a maximum monthly payment budget of <strong>$400.00</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span><strong>Monthly Interest Rate:</strong> With an annual rate of 6.5%, the monthly interest rate is <em>r = 0.065 ÷ 12 ≈ 0.0054167</em>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span><strong>Amortization Factor:</strong> Over 120 months, the standard monthly payment factor is <em>[r(1+r)^120] ÷ [(1+r)^120 - 1] ≈ 0.0113548</em>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">4.</span>
              <span><strong>Calculated Affordable Loan Principal:</strong> Dividing $400.00 by 0.0113548 gives an estimated affordable borrowing limit of <strong>${formatNumber(workedTier.maxPrincipal, locale, 0)}</strong>.</span>
            </div>
          </div>
          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Verified Monthly Payment: ${formatNumber(workedTier.monthlyPayment, locale, 2)} | Total Lifetime Interest: ${formatNumber(workedTier.totalInterest, locale, 2)} | Total Repayment: ${formatNumber(workedTier.totalPayments, locale, 2)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Over the standard 10-year term, borrowing ${formatNumber(workedTier.maxPrincipal, locale, 0)} results in ${formatNumber(workedTier.totalInterest, locale, 2)} in cumulative interest charges, bringing total repayment to ${formatNumber(workedTier.totalPayments, locale, 2)}.
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Student Loan Affordability Across Income Levels (10-Year Term, 6.5% APR)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            This table compares affordable principal balances and repayment obligations assuming 10% of gross salary is allocated toward student debt:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Monthly Income</th>
                  <th className="py-3 pr-3 font-semibold">Annual Salary</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Target Payment (10%)</th>
                  <th className="py-3 pr-3 font-semibold">Affordable Principal</th>
                  <th className="py-3 pr-3 font-semibold">Total Interest</th>
                  <th className="py-3 font-semibold">Total Repayment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.grossMonthly} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {formatCurrency(row.grossMonthly, locale, 0)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.annualGross, locale, 0)}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatCurrency(row.monthlyPayment, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 font-semibold text-slate-800 dark:text-slate-200">
                      {formatCurrency(row.maxPrincipal, locale, 0)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
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
            Note: All calculations use standard fixed monthly amortization at 6.5% APR over 120 months. Individual lender underwriting requirements may vary.
          </p>
        </section>

        {/* Section 4: What This Means for Your Student Debt Budget */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What These Numbers Mean for Your Education Budget
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              Borrowing for education is an investment in future earning power, but overborrowing relative to expected earnings can strain your early-career financial flexibility:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Total Debt vs. Starting Salary:</strong> If you borrow more than 100% of your projected first-year starting salary, your monthly payments on a 10-year repayment plan will exceed 10% of your gross income, making it harder to afford housing, transportation, and retirement savings.
              </li>
              <li>
                <strong>Take-Home Pay Reality:</strong> While rules of thumb use gross income, your take-home pay is reduced by federal, state, and payroll taxes. A $400/month payment represents 10% of a $4,000 gross salary, but can consume 13% to 15% of your actual net paycheck.
              </li>
              <li>
                <strong>Budgeting for Other Debt:</strong> If you also expect to have an auto loan, credit card obligations, or rent, lenders look at your total Debt-to-Income (DTI) ratio. Keeping student loans under 10% helps ensure total debt stays well within standard lender limits (under 36% to 43%).
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
                q: 'What is the 8% to 10% rule for student loan debt?',
                a: 'The 8% to 10% rule advises that your total monthly student loan obligations should not exceed 8% to 10% of your gross monthly income. This ensures you maintain adequate cash flow for rent, food, transportation, emergency savings, and retirement contributions.',
              },
              {
                q: 'Does this affordability estimate guarantee that a lender will approve my loan?',
                a: 'No. This estimate is a budgeting guideline based solely on mathematical loan formulas. Actual loan approval and interest rates depend on credit scores, co-signers, employment history, school eligibility, and individual lender criteria.',
              },
              {
                q: 'What if my starting salary is lower than anticipated?',
                a: 'If your actual income is lower than expected, monthly fixed payments will absorb a larger portion of your take-home pay. For federal student loans, borrowers may explore income-driven repayment plans through the federal government; private loans typically require refinancing or hardship forbearance agreements.',
              },
              {
                q: 'Does this calculation include loan origination fees?',
                a: 'No. Federal student loans charge an upfront origination fee (typically 1.057% for direct subsidized/unsubsidized loans and 4.228% for PLUS loans) deducted from the disbursement. To account for fees, you would need to borrow slightly more to net your required tuition amount.',
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
            <Link
              href={`${prefix}/tools/savings-goal-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Savings Goal Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/how-to-calculate-loan-amortization-schedule"
              className="text-[#f97316] hover:underline font-semibold"
            >
              How to Calculate a Loan Amortization Schedule Step-by-Step
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
