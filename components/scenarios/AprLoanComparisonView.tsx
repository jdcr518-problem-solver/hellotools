import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Scale, ArrowRight, HelpCircle } from 'lucide-react';
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

interface AprLoanComparisonViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Loan Offers for $25,000 over 60 Months ───────────── */
const LOAN_OFFERS = [
  {
    key: 'offerA',
    name: 'Offer A: Low Rate + High Fee',
    rate: 5.5,
    fees: 1250,
    highlight: 'Lowest Stated Rate',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
  },
  {
    key: 'offerB',
    name: 'Offer B: Higher Rate + Zero Fee',
    rate: 7.0,
    fees: 0,
    highlight: 'No Upfront Fees',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
  },
  {
    key: 'offerC',
    name: 'Offer C: Moderate Rate + Low Fee',
    rate: 6.0,
    fees: 500,
    highlight: 'Lowest Overall APR',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
] as const;

const PRINCIPAL = 25_000;
const TERM_MONTHS = 60;

const PROCESSED_OFFERS = LOAN_OFFERS.map((offer) => {
  const res = calculateAPR(PRINCIPAL, offer.rate, TERM_MONTHS, offer.fees);
  if ('error' in res) throw new Error(res.error);
  return {
    ...offer,
    monthlyPayment: res.monthlyPayment,
    netProceeds: res.netProceeds,
    totalScheduledInterest: res.totalScheduledInterest,
    totalFees: res.totalFees,
    totalInterestPlusFees: res.totalInterestPlusFees,
    totalCashPaid: res.totalCashPaid,
    estimatedAPR: res.estimatedAPR,
  };
});

export default function AprLoanComparisonView({
  locale = DEFAULT_LOCALE,
}: AprLoanComparisonViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('apr-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'APR Calculator';

  const [offerA, offerB, offerC] = PROCESSED_OFFERS;

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
          Comparing Loans Using APR
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
        <Scale className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Comparing Two Loans Using APR
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Learn how to compare loan offers with competing interest rates and fee structures. See why comparing advertised rates alone can lead to paying hundreds of dollars more over the life of a loan.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Comparison Challenge */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Why Comparing Stated Interest Rates Is Misleading
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When shopping for personal loans, auto refinancing, or mortgages, lenders present options that trade off lower interest rates for higher upfront fees. If you judge an offer purely by its nominal rate, you risk selecting an option with heavy hidden costs.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              The Golden Rule of Loan Comparison:
            </span>
            Stated Interest Rate shows monthly payment cash flow.
            <br />
            Estimated APR + Total Cash Paid reveals the genuine lowest-cost financing option.
          </div>
        </section>

        {/* Section 2: Worked Example Comparing Three Offers */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Comparison: $25,000 Loan Over 60 Months (5 Years)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Compare three realistic lending proposals for a <strong>$25,000 installment loan</strong> repaid over <strong>60 monthly installments</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROCESSED_OFFERS.map((offer) => (
              <div
                key={offer.key}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850/30 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      {offer.name.split(':')[0]}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${offer.badgeClass}`}>
                      {offer.highlight}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <p>• Stated Interest Rate: <strong>{formatPercent(offer.rate)}</strong></p>
                    <p>• Upfront Fee: <strong>{formatCurrency(offer.fees)}</strong></p>
                    <p>• Net Cash Disbursed: <strong>{formatCurrency(offer.netProceeds)}</strong></p>
                    <p>• Monthly Installment: <strong>{formatCurrency(offer.monthlyPayment)}</strong></p>
                    <p>• Scheduled Interest: <strong>{formatCurrency(offer.totalScheduledInterest)}</strong></p>
                    <p>• Total Cash Paid: <strong>{formatCurrency(offer.totalCashPaid)}</strong></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Estimated APR:</span>
                    <span className="font-mono font-black text-xl text-[#f97316]">
                      {formatPercent(offer.estimatedAPR)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              The Surprising Result: The lowest interest rate is NOT the cheapest loan!
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed list-disc pl-4 space-y-1">
              <li>
                <strong>Offer A (5.50% rate):</strong> Has the lowest monthly installment ({formatCurrency(offerA.monthlyPayment)}), but the $1,250 upfront origination fee inflates its Estimated APR to <strong>{formatPercent(offerA.estimatedAPR)}</strong> and total cost to {formatCurrency(offerA.totalCashPaid)}.
              </li>
              <li>
                <strong>Offer B (7.00% rate):</strong> Advertises a rate 1.50% higher, yet charges zero fees. Its total cost is {formatCurrency(offerB.totalCashPaid)}—saving <strong>$200.00</strong> compared to Offer A!
              </li>
              <li>
                <strong>Offer C (6.00% rate):</strong> With a modest $500 fee, Offer C achieves the lowest overall APR at <strong>{formatPercent(offerC.estimatedAPR)}</strong> and the lowest total cash paid at {formatCurrency(offerC.totalCashPaid)} ($402.54 cheaper than Offer A).
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Head-to-Head Loan Comparison Summary ($25,000 Principal, 60 Months)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Direct side-by-side evaluation of cash flows, fee impacts, and true borrowing costs:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Offer Details</th>
                  <th className="py-3 pr-3 font-semibold">Stated Rate</th>
                  <th className="py-3 pr-3 font-semibold">Upfront Fee</th>
                  <th className="py-3 pr-3 font-semibold">Monthly Payment</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Estimated APR</th>
                  <th className="py-3 pr-3 font-semibold">Total Interest + Fees</th>
                  <th className="py-3 font-semibold">Total Cash Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {PROCESSED_OFFERS.map((row) => (
                  <tr key={row.key} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.name}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatPercent(row.rate)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300 font-mono">
                      {formatCurrency(row.fees)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.monthlyPayment)}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatPercent(row.estimatedAPR)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.totalInterestPlusFees)}
                    </td>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.totalCashPaid)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Break-Even and Decision Framework */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Break-Even Analysis Framework
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>
              When considering paying upfront points or fees to obtain a lower stated rate, calculate your <strong>break-even time horizon</strong>:
            </p>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-850/40 border border-gray-200 dark:border-gray-800 space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Break-Even Formula:</strong> Break-Even Period (Months) = Difference in Upfront Fees ÷ Monthly Payment Savings
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                In our comparison of Offer A ($1,250 fee, $477.53/mo) and Offer B ($0 fee, $495.03/mo):
                <br />
                Monthly savings = $495.03 - $477.53 = $17.50 per month.
                <br />
                Break-even horizon = $1,250 ÷ $17.50 = <strong>71.4 months</strong>.
              </p>
              <p className="text-xs text-[#f97316] font-semibold">
                Because the entire loan lasts only 60 months, you will NEVER reach the break-even point on Offer A! You lose $200 over the life of the loan.
              </p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
              If you plan to sell a car, refinance a mortgage, or pay down personal debt ahead of schedule, paying high upfront points is almost never advantageous.
            </p>
          </div>
        </section>

        {/* Assumptions & Limitations Box */}
        <div className="border border-gray-200/60 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Calculation Assumptions &amp; Scope Limitations</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All three offers evaluate the same loan principal ($25,000) and repayment term (60 months). Assumes fixed interest rates and equal monthly payments with upfront fees paid out-of-pocket at closing. Does not model early payoff, late penalties, or variable rate changes. APR is an informational estimate.
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
                q: 'Should I always pick the loan with the lowest APR?',
                a: 'If you intend to hold the loan for its complete contractual term, the loan with the lowest APR will deliver the lowest total cost of borrowing. However, if you plan to pay off or refinance early, a zero-fee loan with a slightly higher APR may be cheaper because you avoid non-refundable upfront charges.',
              },
              {
                q: 'Can two loans with the same interest rate have different APRs?',
                a: 'Yes. If Loan 1 charges a 2% origination fee and Loan 2 charges zero fees, both may share a 6.00% note rate, but Loan 1 will have a higher APR due to the upfront fee.',
              },
              {
                q: 'Why do lenders offer low rate loans with high fees?',
                a: 'Lenders use lower stated interest rates in marketing headlines to attract borrowers who sort by interest rate. Upfront fees allow the lender to collect revenue immediately on day one regardless of when the loan is paid off.',
              },
              {
                q: 'Does loan comparison differ for mortgages versus personal loans?',
                a: 'The mathematical principle is identical. However, mortgages involve significantly more third-party settlement costs (title, appraisal, escrow) that may or may not be included in statutory APR disclosures depending on jurisdiction, whereas personal loans typically only have an origination fee.',
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
              href={`${prefix}/tools/auto-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Auto Loan Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/emi-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              EMI Calculator
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
