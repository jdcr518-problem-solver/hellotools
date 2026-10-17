import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, DollarSign, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcAutoLoanDetails, formatCurrency } from '@/data/auto-loan-scenarios-data';

interface AutoLoanAffordabilityViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const RATE = 5.5;
const TERM_MONTHS = 60;
const DOWN_PAYMENT = 5_000;
const TRADE_IN = 2_000;
const SALES_TAX_RATE = 6.0;
const FEES = 500;

const VEHICLE_PRICE_TIERS = [25_000, 30_000, 35_000, 45_000, 55_000] as const;

/* ── Pre-compute rows using the verified auto loan utility ───────────────── */
const ROWS = VEHICLE_PRICE_TIERS.map((price) => {
  const result = calcAutoLoanDetails({
    price,
    downPayment: DOWN_PAYMENT,
    tradeIn: TRADE_IN,
    rate: RATE,
    termMonths: TERM_MONTHS,
    salesTaxRate: SALES_TAX_RATE,
    fees: FEES,
    rollInTax: true,
    rollInFees: true,
  });

  return {
    ...result,
    recommendedMonthlyIncome: Math.round(result.monthlyPayment / 0.10), // 10% rule
  };
});

export default function AutoLoanAffordabilityView({
  locale = DEFAULT_LOCALE,
}: AutoLoanAffordabilityViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('auto-loan-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Auto Loan Calculator';

  const workedTier = ROWS[2]; // $35,000 example

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
          How Much Car Can I Afford?
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
            How Much Car Can I Afford?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Estimate your monthly auto loan commitments across realistic vehicle price tiers. This scenario models monthly payments, sales tax, upfront cash, and total interest using the exact calculations of the HelloTools Auto Loan Calculator.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: How Auto Affordability Works */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Auto Loan Affordability Is Estimated
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            True vehicle affordability depends on the total financed principal rather than the vehicle sticker price alone. Your actual loan amount is calculated by deducting your cash down payment and trade-in credit from the vehicle price, then adding any rolled-in sales tax and mandatory documentation or title fees.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Loan Amount Formula:
            </span>
            Financed Principal = (Vehicle Price - Down Payment - Trade-in) + Sales Tax + Upfront Fees
          </div>
          <div className="mt-4 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Baseline Scenario Assumptions:</p>
            <p>• <strong>Interest Rate:</strong> 5.5% annual percentage rate (APR)</p>
            <p>• <strong>Loan Term:</strong> 60 months (5-year standard term)</p>
            <p>• <strong>Cash Down Payment:</strong> $5,000</p>
            <p>• <strong>Trade-In Allowance:</strong> $2,000 (reduces taxable price basis)</p>
            <p>• <strong>Sales Tax Rate:</strong> 6.0% (applied to net price: Vehicle Price - Trade-in)</p>
            <p>• <strong>Documentation &amp; Registration Fees:</strong> $500 (rolled into loan)</p>
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $35,000 Vehicle Purchase
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Consider financing a vehicle priced at <strong>$35,000</strong> with a <strong>$5,000 cash down payment</strong> and a <strong>$2,000 trade-in allowance</strong>.
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span><strong>Base Loan Balance:</strong> Subtracting down payment and trade-in from the vehicle price leaves a base financed balance of <strong>$28,000.00</strong> ($35,000 - $5,000 - $2,000).</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span><strong>Sales Tax:</strong> The taxable basis is $33,000 ($35,000 - $2,000 trade-in credit). At a 6.0% rate, sales tax equals <strong>${workedTier.salesTaxAmount.toFixed(2)}</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span><strong>Total Financed Principal:</strong> Rolling sales tax ($1,980.00) and documentation fees ($500.00) into the loan produces a total loan amount of <strong>${workedTier.financedPrincipal.toFixed(2)}</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">4.</span>
              <span><strong>Monthly Payment:</strong> Over 60 monthly payments at 5.5% APR, your monthly installment is <strong>${workedTier.monthlyPayment.toFixed(2)}</strong>.</span>
            </div>
          </div>
          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Total Interest Paid: ${workedTier.totalInterest.toFixed(2)} | Total All-Inclusive Cost: ${workedTier.totalVehicleCost.toFixed(2)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Total all-inclusive vehicle cost includes all 60 monthly payments ($34,932.00) plus your cash down payment ($5,000.00) and trade-in credit ($2,000.00).
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Auto Affordability by Price Tier (60 Months, 5.5% APR)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Compare monthly payments, total interest paid, and total purchase cost across common vehicle price tiers:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Vehicle Price</th>
                  <th className="py-3 pr-3 font-semibold">Down + Trade</th>
                  <th className="py-3 pr-3 font-semibold">Financed Amount</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Monthly Payment</th>
                  <th className="py-3 pr-3 font-semibold">Total Interest</th>
                  <th className="py-3 font-semibold">Total Vehicle Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.price} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {formatCurrency(row.price)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.downPayment + row.tradeIn)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.financedPrincipal)}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatCurrency(row.monthlyPayment, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.totalInterest, locale, 2)}
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">
                      {formatCurrency(row.totalVehicleCost, locale, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Note: Figures assume a $5,000 down payment, $2,000 trade-in, 6% sales tax, and $500 fees rolled into the loan. All figures are estimates for educational planning.
          </p>
        </section>

        {/* Section 4: What This Means for Your Auto Budget */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What These Numbers Mean for Your Budget
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              A widely referenced personal finance benchmark is the <strong>10% to 15% rule</strong>: your monthly car payment should ideally not exceed 10% to 15% of your take-home pay. Total transportation costs (including auto insurance, fuel, and routine maintenance) should stay under 20% of net income.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>At $3,800/month net take-home pay:</strong> A 10% limit suggests a car payment around $380/month, aligning well with a <strong>$25,000 vehicle</strong> ($379.73/mo).
              </li>
              <li>
                <strong>At $4,800/month net take-home pay:</strong> A 10% limit provides ~$480/month, comfortably accommodating a <strong>$30,000 vehicle</strong> ($480.97/mo).
              </li>
              <li>
                <strong>At $5,800/month net take-home pay:</strong> A 10% limit allows ~$580/month, fitting a <strong>$35,000 vehicle</strong> ($582.20/mo).
              </li>
              <li>
                <strong>At $7,800/month net take-home pay:</strong> A 10% limit covers ~$780/month, accommodating a <strong>$45,000 vehicle</strong> ($784.68/mo).
              </li>
            </ul>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Remember that older vehicles may require higher maintenance allocations, whereas brand-new vehicles typically incur higher insurance premiums and immediate depreciation.
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
                q: 'Does this affordability estimate include sales tax and dealer fees?',
                a: 'Yes. The calculation applies state sales tax (6.0%) to the net vehicle purchase price after subtracting the trade-in allowance, plus $500 in estimated registration and documentation fees rolled into the financing principal.',
              },
              {
                q: 'What is the 10% to 15% rule for car affordability?',
                a: 'The rule recommends keeping your monthly auto loan payment to no more than 10% to 15% of your net monthly take-home pay, ensuring you maintain sufficient margin for insurance, fuel, savings, and other living expenses.',
              },
              {
                q: 'Does this calculator estimate guarantee loan approval or interest rates?',
                a: 'No. This is a mathematical planning tool. Actual loan terms, interest rates, and loan approval depend on your credit score, employment stability, debt-to-income (DTI) ratio, and individual lender criteria.',
              },
              {
                q: 'How does my credit score affect auto loan affordability?',
                a: 'Borrowers with excellent credit (740+) generally receive the lowest promotional APRs, while lower credit scores may attract rates of 10% to 15% or higher, which can increase monthly payments and add thousands of dollars in total interest.',
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
