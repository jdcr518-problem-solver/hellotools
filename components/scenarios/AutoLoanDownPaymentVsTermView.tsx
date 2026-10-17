import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Clock, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcAutoLoanDetails, formatCurrency } from '@/data/auto-loan-scenarios-data';

interface AutoLoanDownPaymentVsTermViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const VEHICLE_PRICE = 35_000;
const TRADE_IN = 2_000;
const RATE = 5.5;
const SALES_TAX_RATE = 6.0;
const FEES = 500;

const TERMS = [36, 48, 60, 72] as const;
const DOWN_PAYMENT_TIERS = [2_000, 5_000, 8_000] as const;

/* ── Matrix computation using the verified auto loan utility ─────────────── */
const MATRIX = TERMS.map((termMonths) => {
  return {
    termMonths,
    results: DOWN_PAYMENT_TIERS.map((downPayment) => {
      return calcAutoLoanDetails({
        price: VEHICLE_PRICE,
        downPayment,
        tradeIn: TRADE_IN,
        rate: RATE,
        termMonths,
        salesTaxRate: SALES_TAX_RATE,
        fees: FEES,
        rollInTax: true,
        rollInFees: true,
      });
    }),
  };
});

export default function AutoLoanDownPaymentVsTermView({
  locale = DEFAULT_LOCALE,
}: AutoLoanDownPaymentVsTermViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('auto-loan-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Auto Loan Calculator';

  // Specific worked comparison: 48-month vs 72-month at $5,000 down
  const row48 = MATRIX.find((m) => m.termMonths === 48)!.results[1]; // $5,000 down
  const row72 = MATRIX.find((m) => m.termMonths === 72)!.results[1]; // $5,000 down
  const monthlySavingsWithLongerTerm = row48.monthlyPayment - row72.monthlyPayment;
  const extraInterestWithLongerTerm = row72.totalInterest - row48.totalInterest;

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
        <Link href={`${prefix}/tools/auto-loan-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/auto-loan-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Larger Down Payment vs Longer Loan Term
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
            Larger Down Payment vs Longer Loan Term
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Compare how putting down more cash upfront versus extending your loan repayment duration impacts your monthly payment, lifetime interest charges, and risk of negative equity.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Trade-Off Explained */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Fundamental Auto Financing Trade-Off
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Car buyers frequently face two different paths to achieve a comfortable monthly payment: increasing their cash down payment or extending their loan term from 36 or 48 months out to 60 or 72 months. While both strategies lower your monthly bill, they produce radically different lifetime financial outcomes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <h3 className="font-bold text-[#1a3c5e] dark:text-blue-300 text-sm mb-1.5">Increasing Down Payment</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Directly reduces the financed principal. This lowers monthly payments AND saves money on total interest because there is less principal accruing interest every day.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/40 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
              <h3 className="font-bold text-[#f97316] text-sm mb-1.5">Extending Loan Term</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Spreads principal repayment across more months, lowering monthly payments but sharply increasing lifetime interest paid and delaying positive vehicle equity.
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-semibold text-gray-900 dark:text-white">Analysis Assumptions:</p>
            <p>• <strong>Vehicle Price:</strong> $35,000 | <strong>Trade-In Allowance:</strong> $2,000</p>
            <p>• <strong>APR:</strong> 5.5% fixed interest | <strong>Sales Tax:</strong> 6.0% rolled into loan | <strong>Fees:</strong> $500 rolled into loan</p>
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Comparison: 48-Month vs. 72-Month Term ($5,000 Down)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Suppose you purchase a $35,000 vehicle with a $5,000 down payment and $2,000 trade-in at 5.5% APR. The total financed principal is $30,480.00. Here is how choosing 48 months compares to 72 months:
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span><strong>48-Month Term:</strong> Monthly payment is <strong>${row48.monthlyPayment.toFixed(2)}</strong>. Total interest paid over 4 years is <strong>${row48.totalInterest.toFixed(2)}</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span><strong>72-Month Term:</strong> Monthly payment drops to <strong>${row72.monthlyPayment.toFixed(2)}</strong>. However, total interest paid jumps to <strong>${row72.totalInterest.toFixed(2)}</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span><strong>Net Difference:</strong> Extending your loan by 24 months saves <strong>${monthlySavingsWithLongerTerm.toFixed(2)} per month</strong> in immediate cash flow, but costs you an extra <strong>${extraInterestWithLongerTerm.toFixed(2)} in total interest</strong>.</span>
            </div>
          </div>
          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Key Takeaway: The $210.88/month relief costs an additional $1,829.36 over the life of the loan.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Furthermore, during years 3 and 4 of a 72-month loan, the vehicle&apos;s market depreciation often exceeds the loan paydown, creating negative equity (owing more than the car is worth).
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Matrix Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Payment &amp; Interest Matrix across Terms and Down Payments
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Compare monthly payments and total interest for a $35,000 vehicle ($2,000 trade-in, 5.5% APR):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Loan Term</th>
                  <th className="py-3 pr-3 font-semibold">$2,000 Down</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">$5,000 Down</th>
                  <th className="py-3 pr-3 font-semibold">$8,000 Down</th>
                  <th className="py-3 font-semibold">Interest Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                {MATRIX.map((m) => {
                  const [d2, d5, d8] = m.results;
                  return (
                    <tr key={m.termMonths} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                        {m.termMonths} Months ({m.termMonths / 12} Yrs)
                      </td>
                      <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                        <div>{formatCurrency(d2.monthlyPayment, locale, 2)}/mo</div>
                        <div className="text-[11px] text-slate-400">Int: {formatCurrency(d2.totalInterest, locale, 2)}</div>
                      </td>
                      <td className="py-3 pr-3 font-bold text-[#f97316]">
                        <div>{formatCurrency(d5.monthlyPayment, locale, 2)}/mo</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Int: {formatCurrency(d5.totalInterest, locale, 2)}</div>
                      </td>
                      <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                        <div>{formatCurrency(d8.monthlyPayment, locale, 2)}/mo</div>
                        <div className="text-[11px] text-slate-400">Int: {formatCurrency(d8.totalInterest, locale, 2)}</div>
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-400 text-xs">
                        {formatCurrency(d8.totalInterest, locale, 0)} – {formatCurrency(d2.totalInterest, locale, 0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Note: Figures assume 5.5% fixed APR, $2,000 trade-in credit, 6% sales tax, and $500 doc fees rolled in. All figures are estimates for educational planning.
          </p>
        </section>

        {/* Section 4: What This Means for Your Financing Decision */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding the Financial Implications
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              When evaluating loan options, keep these practical financing guidelines in mind:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>The 20/4/10 Rule:</strong> Personal finance experts frequently recommend putting at least <strong>20% down</strong>, financing for no more than <strong>4 years (48 months)</strong>, and keeping total vehicle expenses under <strong>10%</strong> of gross monthly income.
              </li>
              <li>
                <strong>Negative Equity Exposure:</strong> Vehicles depreciate quickly during the first three years. If you choose a 72-month or 84-month loan with a low down payment, you will likely be &ldquo;underwater&rdquo; (owing more than the car is worth) for several years, making trading in or selling difficult.
              </li>
              <li>
                <strong>GAP Insurance Requirements:</strong> Long-term loans with minimal down payments often necessitate GAP insurance to cover the difference between fair market value and the remaining loan balance in case of total loss.
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
                q: 'What is the danger of a 72-month or 84-month auto loan?',
                a: 'Long-term auto loans significantly increase total interest costs and extend the period where you owe more than the vehicle is worth. If the car is totaled or you need to sell before the loan ends, you may have to pay thousands of dollars out of pocket to clear the deficit.',
              },
              {
                q: 'How much down payment is recommended for a car loan?',
                a: 'A 20% down payment is ideal for new vehicles to offset initial depreciation and reduce total loan interest. For pre-owned vehicles, 10% to 15% is commonly recommended.',
              },
              {
                q: 'Can a higher down payment help me qualify for a lower interest rate?',
                a: 'Yes. Lenders often offer lower APRs to borrowers with higher down payments because a lower loan-to-value (LTV) ratio represents significantly lower risk for the financial institution.',
              },
              {
                q: 'Is it better to pay cash or take out a low-interest auto loan?',
                a: 'If you can secure a promotional low-interest rate (e.g. 0% to 3% APR) and invest your surplus cash at a higher guaranteed after-tax return, financing may make sense. However, for rates above 5% to 6%, putting more cash down guarantees a risk-free interest savings.',
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
            Explore Related Auto Loan &amp; Financing Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/auto-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Auto Loan Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/auto-loan-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Auto Loan Scenarios
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
