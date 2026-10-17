import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Calendar, ArrowRight } from 'lucide-react';
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

interface StudentLoanTermComparisonViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const PRINCIPAL = 35_000;
const RATE = 6.0;

const TERMS = [
  { years: 5, months: 60, label: '5 Years' },
  { years: 10, months: 120, label: '10 Years (Standard)' },
  { years: 15, months: 180, label: '15 Years' },
  { years: 20, months: 240, label: '20 Years' },
  { years: 25, months: 300, label: '25 Years' },
] as const;

/* ── Pre-compute rows using pure verified calculation ────────────────────── */
const ROWS = TERMS.map((term) => {
  const details = calcStudentLoanDetails({
    loanAmount: PRINCIPAL,
    interestRate: RATE,
    loanTermMonths: term.months,
  });

  return {
    ...term,
    monthlyPayment: details.monthlyPayment,
    totalInterest: details.totalInterest,
    totalPayments: details.totalPayments,
    interestPctOfPrincipal: (details.totalInterest / PRINCIPAL) * 100,
  };
});

export default function StudentLoanTermComparisonView({
  locale = DEFAULT_LOCALE,
}: StudentLoanTermComparisonViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('student-loan-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Student Loan Calculator';

  // Worked example term: 10 Years (120 months)
  const standardTier = ROWS[1];
  const shortTier = ROWS[0]; // 5 Years
  const extendedTier = ROWS[4]; // 25 Years

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
          How Loan Term Affects Monthly Payments and Total Interest
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
        <Calendar className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Loan Term Affects Monthly Payments and Total Interest
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Evaluate the financial trade-off between shorter and longer repayment terms. See how extending your repayment schedule lowers monthly installments but dramatically increases cumulative interest expenses.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Loan Term Trade-off Explained */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding the Student Loan Term Trade-Off
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The standard federal student loan repayment plan is <strong>10 years (120 months)</strong>. However, borrowers can often refinance private loans or opt for extended repayment plans spanning 15, 20, or 25 years. While extending the term reduces the mandatory monthly check, it keeps your principal balance outstanding longer, allowing compounding interest to accumulate.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Core Financial Relationship:
            </span>
            Shorter Term = Higher Monthly Payment + Substantially Lower Total Interest
            <br />
            Longer Term = Lower Monthly Payment + Substantially Higher Total Interest
          </div>
          <div className="mt-4 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Baseline Scenario Assumptions:</p>
            <p>• <strong>Loan Principal:</strong> $35,000.00 (representative education debt balance)</p>
            <p>• <strong>Interest Rate:</strong> 6.0% fixed annual percentage rate (APR)</p>
            <p>• <strong>Extra Payments:</strong> $0.00 (standard minimum scheduled installments)</p>
            <p>• <strong>Payment Frequency:</strong> Monthly fixed amortization</p>
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: 10-Year Standard vs. 25-Year Extended Repayment
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Consider a <strong>$35,000 student loan at 6.0% APR</strong> compared under the standard 10-year term and an extended 25-year term:
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span><strong>10-Year Standard Plan (120 Months):</strong> Monthly payment is <strong>${formatNumber(standardTier.monthlyPayment, locale, 2)}</strong>. Total interest paid equals <strong>${formatNumber(standardTier.totalInterest, locale, 2)}</strong>, bringing total repayment to ${formatNumber(standardTier.totalPayments, locale, 2)}.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span><strong>25-Year Extended Plan (300 Months):</strong> Monthly payment drops by $163.06 to <strong>${formatNumber(extendedTier.monthlyPayment, locale, 2)}</strong>, offering immediate monthly relief.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span><strong>The True Long-Term Cost:</strong> Over 25 years, total interest explodes to <strong>${formatNumber(extendedTier.totalInterest, locale, 2)}</strong>—an extra <strong>${formatNumber(extendedTier.totalInterest - standardTier.totalInterest, locale, 2)} in pure interest</strong> (almost triple the standard plan’s interest).</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">4.</span>
              <span><strong>5-Year Accelerated Plan (60 Months):</strong> Alternatively, paying <strong>${formatNumber(shortTier.monthlyPayment, locale, 2)}/month</strong> cuts total interest to just <strong>${formatNumber(shortTier.totalInterest, locale, 2)}</strong>, saving ${formatNumber(standardTier.totalInterest - shortTier.totalInterest, locale, 2)} compared to the 10-year plan.</span>
            </div>
          </div>
          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Key Insight: Extending from 10 to 25 years cuts monthly payments by 42%, but increases total interest by 181%.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              On a 25-year schedule, cumulative interest ($32,650.05) is nearly equal to the original $35,000 principal borrowed.
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Repayment Term Comparison Table ($35,000 Loan at 6.0% APR)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Compare monthly commitments, cumulative borrowing costs, and interest proportions across common term lengths:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Repayment Term</th>
                  <th className="py-3 pr-3 font-semibold">Periods (Months)</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Monthly Payment</th>
                  <th className="py-3 pr-3 font-semibold">Total Interest</th>
                  <th className="py-3 pr-3 font-semibold">Total Paid</th>
                  <th className="py-3 font-semibold">Interest % of Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.months} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400 font-mono">
                      {row.months}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatCurrency(row.monthlyPayment, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.totalInterest, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300 font-medium">
                      {formatCurrency(row.totalPayments, locale, 2)}
                    </td>
                    <td className="py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {row.interestPctOfPrincipal.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Note: All calculations assume fixed 6.0% APR with no grace period or fee capitalization. Results derived from standard amortization ledger mathematics.
          </p>
        </section>

        {/* Section 4: Strategic Term Selection */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How to Choose the Right Repayment Term
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              Selecting the optimal loan term involves balancing your monthly cash flow security with your desire to become debt-free:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>When Shorter Terms Make Sense:</strong> If your monthly income is steady and allows you to comfortably afford a higher payment, a 5- or 7-year term guarantees you minimize interest charges and eliminate education debt before major life milestones (e.g., buying a home).
              </li>
              <li>
                <strong>When Longer Terms Make Sense:</strong> If you are entering a residency, public service career, or lower-paying entry role, selecting a longer term provides downside protection against tight monthly budgets.
              </li>
              <li>
                <strong>The Hybrid Strategy (Pay Longer Term with Extra Payments):</strong> You can choose a 15- or 20-year term for mandatory payment flexibility, while voluntarily making extra monthly payments whenever possible. Since student loans have no prepayment penalties, extra payments directly pay down principal and cut both term and interest.
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
                q: 'What is the standard repayment term for federal student loans?',
                a: 'Under the standard federal repayment plan, loans are automatically amortized over 10 years (120 monthly installments). Direct Consolidation loans with balances over $7,500 may qualify for extended terms from 12 to 30 years.',
              },
              {
                q: 'Can I pay off my student loan early without penalty?',
                a: 'Yes. Under federal law and standard private lending rules in the United States, student loans cannot carry prepayment penalties. You can make extra payments or pay off the entire balance early at any time to save interest.',
              },
              {
                q: 'Does extending my loan term hurt my credit score?',
                a: 'No. Extending your repayment term or refinancing to a longer schedule does not inherently damage your credit score. As long as you make all scheduled payments on time, your credit history will reflect positive repayment performance.',
              },
              {
                q: 'Is it better to invest extra cash or pay off student loans faster?',
                a: 'It depends on your interest rate and risk tolerance. If your loan interest rate is high (e.g., 7% to 9%+), paying it off offers a guaranteed, risk-free return equal to your APR. For low fixed-rate loans (e.g., 3% to 4%), long-term diversified index investing or contributing to an employer-matched 401(k) may offer higher projected returns.',
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
              href={`${prefix}/tools/amortization-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Amortization Calculator
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
              href={`${prefix}/tools/apr-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              APR Calculator
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
