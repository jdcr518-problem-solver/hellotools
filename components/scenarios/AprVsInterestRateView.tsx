import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Percent, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateAPR,
  formatCurrency,
  formatPercent,
  formatNumber,
} from '@/data/apr-scenarios-data';

interface AprVsInterestRateViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Table Data computed via pure calculateAPR ─────────── */
const COMPARISONS = [
  { loanAmount: 10_000, rate: 6.0, months: 36, fees: 0, label: '3-Year Small Loan (Zero Fees)' },
  { loanAmount: 10_000, rate: 6.0, months: 36, fees: 300, label: '3-Year Small Loan ($300 / 3% Fee)' },
  { loanAmount: 20_000, rate: 5.0, months: 60, fees: 0, label: '5-Year Mid Loan (Zero Fees)' },
  { loanAmount: 20_000, rate: 5.0, months: 60, fees: 500, label: '5-Year Mid Loan ($500 / 2.5% Fee)' },
  { loanAmount: 20_000, rate: 5.0, months: 60, fees: 1000, label: '5-Year Mid Loan ($1,000 / 5% Fee)' },
  { loanAmount: 50_000, rate: 7.0, months: 120, fees: 1500, label: '10-Year Large Loan ($1,500 / 3% Fee)' },
] as const;

const ROWS = COMPARISONS.map((item) => {
  const res = calculateAPR(item.loanAmount, item.rate, item.months, item.fees);
  if ('error' in res) {
    throw new Error(`Calculation failed: ${res.error}`);
  }
  return {
    ...item,
    monthlyPayment: res.monthlyPayment,
    netProceeds: res.netProceeds,
    totalScheduledInterest: res.totalScheduledInterest,
    totalCashPaid: res.totalCashPaid,
    estimatedAPR: res.estimatedAPR,
    aprGap: res.estimatedAPR - item.rate,
  };
});

export default function AprVsInterestRateView({
  locale = DEFAULT_LOCALE,
}: AprVsInterestRateViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('apr-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'APR Calculator';

  // Base worked examples ($20,000, 5%, 60 months)
  const baseZeroFee = ROWS[2]; // Zero fee
  const baseWithFee = ROWS[4]; // $1,000 fee

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
        <Link href={`${prefix}/tools/apr-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/apr-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          APR vs Interest Rate
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
            APR vs Interest Rate: What Is the Difference?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Understand how a loan&apos;s nominal interest rate differs from its Annual Percentage Rate (APR). See how upfront lender fees, points, and loan terms affect your true annualized borrowing cost.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Fundamental Concept */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Fundamental Difference Between Interest Rate and APR
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When shopping for personal loans, auto loans, or mortgages, lenders advertise two distinct percentages: the <strong>Stated (Nominal) Interest Rate</strong> and the <strong>Annual Percentage Rate (APR)</strong>. While related, they measure fundamentally different costs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Stated Interest Rate (Note Rate)
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                The annual percentage charged strictly on the outstanding principal balance. It directly determines your recurring monthly payment. It excludes all upfront fees and origination costs.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 bg-orange-50/30 dark:bg-orange-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
                Annual Percentage Rate (APR)
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A standardized annualized measure of total borrowing cost. It incorporates both the stated interest rate and upfront financing charges (fees or discount points), expressed as a single annualized percentage rate.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Core Financial Rule:
            </span>
            If Upfront Fees = $0, Estimated APR = Stated Interest Rate
            <br />
            If Upfront Fees &gt; $0, Estimated APR &gt; Stated Interest Rate
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Numerical Example: $20,000 Loan Over 60 Months at 5.0%
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            To see how fees alter effective borrowing cost, consider a <strong>$20,000 installment loan</strong> at a <strong>5.0% stated interest rate</strong> with a <strong>60-month term</strong>, comparing zero fees against a $1,000 (5.0%) upfront origination fee:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Option A: Zero Fees</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold">$0 Fees</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>• Stated Interest Rate: <strong>5.00%</strong></p>
                <p>• Upfront Fees: <strong>$0.00</strong></p>
                <p>• Net Proceeds Received: <strong>{formatCurrency(baseZeroFee.netProceeds)}</strong></p>
                <p>• Monthly Installment: <strong>{formatCurrency(baseZeroFee.monthlyPayment)}</strong></p>
                <p>• Total Interest Paid: <strong>{formatCurrency(baseZeroFee.totalScheduledInterest)}</strong></p>
                <p>• Total Cash Paid: <strong>{formatCurrency(baseZeroFee.totalCashPaid)}</strong></p>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Estimated APR:</span>
                  <span className="font-mono font-black text-lg text-emerald-600 dark:text-emerald-400">{formatPercent(baseZeroFee.estimatedAPR)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-orange-200 dark:border-orange-900/40 bg-orange-50/20 dark:bg-orange-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Option B: With $1,000 Fee</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300 font-semibold">$1,000 Fee (5%)</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>• Stated Interest Rate: <strong>5.00%</strong></p>
                <p>• Upfront Fees: <strong>$1,000.00</strong></p>
                <p>• Net Proceeds Received: <strong>{formatCurrency(baseWithFee.netProceeds)}</strong></p>
                <p>• Monthly Installment: <strong>{formatCurrency(baseWithFee.monthlyPayment)}</strong></p>
                <p>• Total Interest Paid: <strong>{formatCurrency(baseWithFee.totalScheduledInterest)}</strong></p>
                <p>• Total Cash Paid: <strong>{formatCurrency(baseWithFee.totalCashPaid)}</strong></p>
                <div className="pt-2 border-t border-orange-200 dark:border-orange-800 flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Estimated APR:</span>
                  <span className="font-mono font-black text-lg text-[#f97316]">{formatPercent(baseWithFee.estimatedAPR)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Why the APR jumped from 5.00% to 7.13%:
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              In Option B, you borrow $20,000 on paper and repay monthly installments based on $20,000. However, after deducting the $1,000 upfront fee, you only receive $19,000 in spendable cash. Solving for the internal monthly rate that amortizes $19,000 with 60 payments of $377.42 yields an effective rate of 0.594% per month, or an annualized APR of <strong>7.13%</strong>.
            </p>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Stated Rate vs. APR Across Representative Loan Scenarios
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            See how different loan balances, stated interest rates, terms, and upfront fees widen the gap between stated rate and estimated APR:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Scenario</th>
                  <th className="py-3 pr-3 font-semibold">Loan Principal</th>
                  <th className="py-3 pr-3 font-semibold">Stated Rate</th>
                  <th className="py-3 pr-3 font-semibold">Term</th>
                  <th className="py-3 pr-3 font-semibold">Upfront Fees</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Estimated APR</th>
                  <th className="py-3 font-semibold">Total Cash Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300 font-mono">
                      {formatCurrency(row.loanAmount)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatPercent(row.rate)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400 font-mono">
                      {row.months} mo
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.fees)}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatPercent(row.estimatedAPR)}
                    </td>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.totalCashPaid)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Note: All calculations use the verified bisection method from HelloTools APR Calculator. Values assume fixed-rate monthly installments paid to maturity without early payoff.
          </p>
        </section>

        {/* Section 4: Practical Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Borrowers Should Use APR vs. Stated Rate
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              Both metrics provide vital information, but they serve different decision-making purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Use Stated Rate for Budgeting:</strong> Your recurring monthly obligation is computed solely using the stated interest rate and total loan principal. Use this number to confirm the payment fits your monthly cash flow.
              </li>
              <li>
                <strong>Use APR for Comparing Lenders:</strong> Lenders often market lower stated interest rates while charging substantial origination or processing fees. APR rolls these costs together, leveling the playing field.
              </li>
              <li>
                <strong>Consider Your Expected Holding Period:</strong> The APR calculation assumes you hold the loan for its full contractual term. If you plan to refinance or pay off early, upfront fees are amortized over fewer months, making the effective cost of borrowing even higher than the quoted APR.
              </li>
            </ul>
          </div>
        </section>

        {/* Assumptions & Limitations Box */}
        <div className="border border-gray-200/60 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Calculation Assumptions &amp; Scope Limitations</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Calculations reflect a fixed-rate installment loan with level monthly payments. Fees are treated as upfront financing charges that reduce net cash proceeds. This tool calculates a nominal annualized APR (monthly rate × 12) based strictly on user-entered fees. It excludes property taxes, hazard insurance, escrow items, variable rate adjustments, late payment fees, or country-specific statutory disclosure rules.
          </p>
        </div>

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
                q: 'Can APR ever be lower than the stated interest rate?',
                a: 'In standard consumer installment loans with positive or zero fees, APR is never lower than the stated rate. It equals the stated rate when upfront fees are $0, and exceeds it whenever positive upfront fees are charged. An APR could technically fall below the note rate only in subsidized transactions with negative fees (lender credits/rebates exceeding total closing costs).',
              },
              {
                q: 'Why does APR assume the loan is held for its full term?',
                a: 'Standard APR formulas assume contractual repayment over the entire agreed schedule. If a borrower pays off a 5-year loan in 2 years, upfront fees have less time to amortize, which substantially raises the effective annualized cost of borrowing.',
              },
              {
                q: 'What fees are typically included in APR calculations?',
                a: 'Lender origination fees, discount points, processing charges, and mandatory financing costs are standard inclusions. Ancillary non-financing costs—such as title search, appraisal, credit report fees, or notary charges—depend on loan type and jurisdiction.',
              },
              {
                q: 'How does loan duration impact the gap between rate and APR?',
                a: 'Shorter loan durations produce a much larger gap between stated rate and APR for the exact same dollar fee. On a 2-year loan, a $1,000 fee must be absorbed over 24 months, whereas on a 10-year loan, that same fee is spread across 120 months.',
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
            Explore Related Financial Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/apr-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open APR Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/apr-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All APR Scenarios
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
              href={`${prefix}/tools/auto-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Auto Loan Calculator
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
