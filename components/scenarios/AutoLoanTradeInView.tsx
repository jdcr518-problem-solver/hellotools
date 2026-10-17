import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, RefreshCw, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcAutoLoanDetails, formatCurrency } from '@/data/auto-loan-scenarios-data';

interface AutoLoanTradeInViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const VEHICLE_PRICE = 35_000;
const DOWN_PAYMENT = 5_000;
const RATE = 5.5;
const TERM_MONTHS = 60;
const SALES_TAX_RATE = 6.0;
const FEES = 500;

const TRADE_IN_TIERS = [0, 2_000, 5_000, 10_000] as const;

/* ── Pre-compute rows using the verified auto loan utility ───────────────── */
const ROWS = TRADE_IN_TIERS.map((tradeIn) => {
  return calcAutoLoanDetails({
    price: VEHICLE_PRICE,
    downPayment: DOWN_PAYMENT,
    tradeIn,
    rate: RATE,
    termMonths: TERM_MONTHS,
    salesTaxRate: SALES_TAX_RATE,
    fees: FEES,
    rollInTax: true,
    rollInFees: true,
  });
});

export default function AutoLoanTradeInView({
  locale = DEFAULT_LOCALE,
}: AutoLoanTradeInViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('auto-loan-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Auto Loan Calculator';

  const noTradeRow = ROWS[0]; // $0 trade
  const trade5kRow = ROWS[2]; // $5,000 trade
  const salesTaxSavings = noTradeRow.salesTaxAmount - trade5kRow.salesTaxAmount;
  const interestSavings = noTradeRow.totalInterest - trade5kRow.totalInterest;
  const monthlySavings = noTradeRow.monthlyPayment - trade5kRow.monthlyPayment;
  const totalFinancialBenefit = salesTaxSavings + interestSavings;

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
          How Trade-In Value Affects Your Auto Loan
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
        <RefreshCw className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Trade-In Value Affects Your Auto Loan
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Learn how trading in your current vehicle creates a dual financial benefit: lowering your financed loan principal and significantly reducing your state sales tax liability.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Trade-In Advantage */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Dual Benefit of Vehicle Trade-In Value
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When you trade in an existing vehicle at the time of purchase, its agreed value acts just like cash towards your down payment. Additionally, in the majority of US states and tax jurisdictions, sales tax is assessed only on the <strong>net purchase price</strong> after deducting the trade-in allowance.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Taxable Basis &amp; Financing Formula:
            </span>
            <div>Tax Basis = Vehicle Price - Trade-in Value</div>
            <div>Financed Principal = (Tax Basis - Cash Down Payment) + Sales Tax + Fees</div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Baseline Scenario Assumptions:</p>
            <p>• <strong>Vehicle Price:</strong> $35,000 | <strong>Cash Down Payment:</strong> $5,000</p>
            <p>• <strong>APR:</strong> 5.5% fixed interest | <strong>Loan Term:</strong> 60 months (5 years)</p>
            <p>• <strong>Sales Tax Rate:</strong> 6.0% (applied to net price) | <strong>Doc &amp; Reg Fees:</strong> $500 (rolled in)</p>
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $0 vs. $5,000 Trade-In on a $35,000 Vehicle
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Suppose you buy a $35,000 vehicle with $5,000 cash down. Compare what happens with <strong>no trade-in</strong> versus trading in a vehicle valued at <strong>$5,000</strong>:
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span><strong>Sales Tax Reduction:</strong> Without a trade-in, 6% tax on $35,000 is $2,100.00. With a $5,000 trade-in, tax is calculated on $30,000 ($1,800.00) — an instant <strong>${salesTaxSavings.toFixed(2)} sales tax savings</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span><strong>Loan Principal Reduction:</strong> The total amount financed drops from $32,600.00 down to $27,300.00 (a $5,300.00 reduction because you also borrow $300 less in tax).</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span><strong>Monthly Payment Relief:</strong> Your monthly installment decreases from $622.70 down to $521.46, saving you <strong>${monthlySavings.toFixed(2)} every month</strong>.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">4.</span>
              <span><strong>Total Interest Savings:</strong> Borrowing $5,300 less saves you <strong>${interestSavings.toFixed(2)} in lifetime interest charges</strong> over the 5-year loan.</span>
            </div>
          </div>
          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Total Bonus Financial Savings: ${totalFinancialBenefit.toFixed(2)}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Beyond the $5,000 trade-in equity itself, you gain an extra $300 in reduced tax liability and $774.15 in saved loan interest.
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Trade-In Value Comparison Table ($35,000 Car, 60 Months, 5.5% APR)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            See how different trade-in values affect tax basis, financed loan amount, monthly payments, and total interest:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Trade-In Value</th>
                  <th className="py-3 pr-3 font-semibold">Taxable Basis</th>
                  <th className="py-3 pr-3 font-semibold">Sales Tax (6%)</th>
                  <th className="py-3 pr-3 font-semibold">Financed Amount</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Monthly Payment</th>
                  <th className="py-3 font-semibold">Total Interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                {ROWS.map((row) => (
                  <tr key={row.tradeIn} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.tradeIn === 0 ? 'No Trade-In ($0)' : formatCurrency(row.tradeIn)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.taxBasis)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.salesTaxAmount, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.financedPrincipal)}
                    </td>
                    <td className="py-3 pr-3 font-bold text-[#f97316]">
                      {formatCurrency(row.monthlyPayment, locale, 2)}
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.totalInterest, locale, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Note: Figures assume a $5,000 cash down payment, 6.0% tax, and $500 doc fees rolled into financing. All figures are estimates for educational planning.
          </p>
        </section>

        {/* Section 4: Trade-In Considerations */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Trade-In vs. Private Sale Considerations
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              While selling your old car privately might yield a slightly higher offer price than dealer wholesale value, you should factor in the <strong>sales tax offset</strong> before deciding:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Tax Credit Offset:</strong> If a dealer offers $5,000 for your trade-in in a 6% tax state, that offer is worth $5,300 in equivalent value because of the $300 tax credit. A private buyer would need to pay over $5,300 just to break even after the hassle of titling and advertising.
              </li>
              <li>
                <strong>Existing Loan Balances (Negative Equity):</strong> If you still owe money on your trade-in vehicle and the loan balance exceeds its appraisal value, that negative equity gets rolled into your new loan, increasing your financed amount and monthly payment.
              </li>
              <li>
                <strong>Instant Convenience:</strong> Trading in allows the dealer to handle loan payoff, title transfer, and registration in a single transaction at signing.
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
                q: 'Do all states give a sales tax credit on vehicle trade-ins?',
                a: 'Most US states allow trade-in credit against sales tax, meaning tax is only assessed on the difference between the new car price and the trade-in allowance. However, a few states (such as California, Hawaii, Kentucky, Maryland, and Virginia) do not provide a trade-in tax credit or have unique rules.',
              },
              {
                q: 'What happens if I owe more on my trade-in than it is worth?',
                a: 'This is known as negative equity or being "underwater." If you owe $10,000 on a car that is appraised at $7,000, the remaining $3,000 deficit must either be paid in cash at signing or rolled into your new car loan, which increases your monthly payment.',
              },
              {
                q: 'How does a trade-in affect my down payment requirement?',
                a: 'The net equity from your trade-in counts directly towards the lender’s down payment requirement. For example, if you provide $2,000 cash and have $3,000 in trade-in equity, your effective down payment is $5,000.',
              },
              {
                q: 'Can I combine a cash down payment with a trade-in?',
                a: 'Yes! Combining cash savings with trade-in equity is one of the most effective ways to achieve a 20% down payment threshold, lowering your loan-to-value ratio and minimizing total financing charges.',
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
