import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, DollarSign, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcMortgageDetails, formatCurrency } from '@/data/mortgage-scenarios-data';

interface MortgageAffordabilityViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const RATE = 4.5;
const YEARS = 30;
const TAX_RATE = 1.2;
const ANNUAL_INSURANCE = 1200;
const PMI_RATE = 0.5;

const HOME_PRICE_TIERS = [250_000, 300_000, 350_000, 400_000, 500_000] as const;

/* ── Pre-compute rows using the verified mortgage utility ───────────────── */
const ROWS = HOME_PRICE_TIERS.map((homeValue) => {
  const downPayment = homeValue * 0.2; // 20% down benchmark
  const result = calcMortgageDetails({
    homeValue,
    downPayment,
    rate: RATE,
    years: YEARS,
    tax: TAX_RATE,
    insurance: ANNUAL_INSURANCE,
    pmi: PMI_RATE,
  });
  return {
    ...result,
    downPaymentPct: 20,
    grossIncomeGuideline: Math.round(result.monthlyTotal / 0.28), // 28% rule guideline
  };
});

export default function MortgageAffordabilityView({
  locale = DEFAULT_LOCALE,
}: MortgageAffordabilityViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('mortgage-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Mortgage Calculator';

  const workedTier = ROWS[1]; // $300k example

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
        <Link href={`${prefix}/tools/mortgage-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/mortgage-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Much House Can I Afford?
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
            How Much House Can I Afford?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Estimate your monthly housing commitments across different home price tiers. This scenario breaks down principal, interest, property taxes, and homeowners insurance using the exact math of the HelloTools Mortgage Calculator.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: How Mortgage Affordability Works */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Housing Affordability Is Estimated
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A sustainable home purchase is determined not only by the listing price, but by your all-in monthly payment (often abbreviated as PITI: Principal, Interest, Taxes, and Insurance). When you put at least 20% down, you also avoid private mortgage insurance (PMI), keeping recurring monthly costs lower.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Monthly Payment Breakdown:
            </span>
            Total Payment = Monthly P&amp;I + (Home Value × Tax% ÷ 12) + (Annual Insurance ÷ 12) + PMI
          </div>
          <div className="mt-4 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Baseline Scenario Assumptions:</p>
            <p>• <strong>Interest Rate:</strong> 4.5% annual fixed rate</p>
            <p>• <strong>Loan Term:</strong> 30 years (360 monthly payments)</p>
            <p>• <strong>Down Payment:</strong> 20% of home value (eliminates PMI)</p>
            <p>• <strong>Property Tax:</strong> 1.2% per year of home value</p>
            <p>• <strong>Homeowners Insurance:</strong> $1,200 annually ($100/month)</p>
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $300,000 Home Purchase
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Suppose you consider buying a home priced at <strong>$300,000</strong> with a <strong>20% down payment</strong> ($60,000). Your loan amount is <strong>$240,000</strong> over 30 years at 4.5% fixed interest.
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span><strong>Principal &amp; Interest (P&amp;I):</strong> Using the loan amortization formula, the base monthly payment is <strong>${workedTier.monthlyPrincipalAndInterest.toFixed(2)}</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span><strong>Property Tax:</strong> At 1.2% per year, annual taxes equal $3,600, or <strong>${workedTier.monthlyTax.toFixed(2)}/month</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span><strong>Home Insurance:</strong> $1,200 per year equals <strong>${workedTier.monthlyInsurance.toFixed(2)}/month</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">4.</span>
              <span><strong>PMI:</strong> Because you paid 20% down, PMI is <strong>$0.00</strong>.</span>
            </div>
          </div>
          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Total Estimated Monthly Payment: ${workedTier.monthlyTotal.toFixed(2)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Over the full 30-year term, total principal &amp; interest repaid is ${workedTier.totalPrincipalAndInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}, representing ${workedTier.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })} in total interest paid.
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Affordability by Home Price Tier (20% Down, 4.5% Rate, 30 Years)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Compare estimated monthly commitments and lifetime interest across standard home purchase prices:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Home Price</th>
                  <th className="py-3 pr-3 font-semibold">Down Pmt (20%)</th>
                  <th className="py-3 pr-3 font-semibold">Loan Amount</th>
                  <th className="py-3 pr-3 font-semibold">P&amp;I / Mo</th>
                  <th className="py-3 pr-3 font-semibold">Tax &amp; Ins / Mo</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Total Monthly</th>
                  <th className="py-3 font-semibold">Total Interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.homeValue} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {formatCurrency(row.homeValue)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.downPayment)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.loanAmount)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.monthlyPrincipalAndInterest, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.monthlyTax + row.monthlyInsurance, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatCurrency(row.monthlyTotal, locale, 2)}
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.totalInterest, locale, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Note: Figures are calculated using exact standard loan amortization formulas. All figures are estimates for educational planning.
          </p>
        </section>

        {/* Section 4: What This Means for Your Housing Budget */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What These Numbers Mean for Your Budget
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              A standard rule of thumb in mortgage planning is the <strong>28% front-end guideline</strong>: financial advisers generally suggest keeping total monthly housing costs at or below 28% of your gross monthly household income.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>At $5,000/month gross income ($60k/year):</strong> A 28% ceiling suggests a housing payment around $1,400/month, matching a ~$250,000 home ($1,363.37/mo).
              </li>
              <li>
                <strong>At $6,000/month gross income ($72k/year):</strong> A 28% ceiling suggests ~$1,680/month, comfortably fitting a $300,000 home ($1,616.04/mo).
              </li>
              <li>
                <strong>At $8,000/month gross income ($96k/year):</strong> A 28% ceiling allows ~$2,240/month, which covers a $400,000 home ($2,121.39/mo).
              </li>
              <li>
                <strong>At $10,000/month gross income ($120k/year):</strong> A 28% ceiling allows ~$2,800/month, accommodating a $500,000 home ($2,626.74/mo).
              </li>
            </ul>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Keep in mind that lenders also review your total debt-to-income (DTI) ratio (including student loans, auto loans, and credit card payments). Existing debts will lower the maximum mortgage payment a lender will approve.
            </p>
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
                q: 'Does this affordability estimate include property tax and insurance?',
                a: 'Yes. The calculation factors in estimated property taxes (1.2% per year) and homeowners insurance ($1,200/year), giving you a more realistic estimate than principal and interest alone.',
              },
              {
                q: 'What is the 28% housing affordability rule?',
                a: 'The 28% rule is a widely used personal-finance guideline stating that your total monthly housing costs (principal, interest, property tax, and insurance) should not exceed 28% of your gross monthly income.',
              },
              {
                q: 'Does this estimate guarantee mortgage approval?',
                a: 'No. This is a mathematical planning estimate based on standard loan formulas. Actual lender approval depends on credit scores, debt-to-income (DTI) ratios, proof of income, lender overlays, and property appraisal.',
              },
              {
                q: 'How does an interest rate change affect my affordability?',
                a: 'Even a 1% increase in interest rate noticeably increases monthly principal and interest. For instance, on a $240,000 loan, an increase from 4.5% to 5.5% raises the monthly P&I from $1,216.04 to $1,362.69 — an extra $146.65 each month.',
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
            Explore Related Mortgage &amp; Loan Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/mortgage-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Mortgage Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/mortgage-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Mortgage Scenarios
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
