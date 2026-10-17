import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, DollarSign, ArrowRight, HelpCircle } from 'lucide-react';
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

interface AprFeesImpactViewProps {
  locale?: Locale;
}

/* ── Verified Scenario 1: Fee Progression on $30,000 Loan (6.0%, 48 Months) ── */
const FEE_LEVELS = [
  { fee: 0, pct: '0%', label: 'Zero Upfront Fees' },
  { fee: 600, pct: '2.0%', label: 'Low Fee (2.0%)' },
  { fee: 1200, pct: '4.0%', label: 'Moderate Fee (4.0%)' },
  { fee: 1800, pct: '6.0%', label: 'Higher Fee (6.0%)' },
  { fee: 2400, pct: '8.0%', label: 'Substantial Fee (8.0%)' },
] as const;

const FEE_ROWS = FEE_LEVELS.map((item) => {
  const res = calculateAPR(30_000, 6.0, 48, item.fee);
  if ('error' in res) throw new Error(res.error);
  return {
    ...item,
    netProceeds: res.netProceeds,
    monthlyPayment: res.monthlyPayment,
    totalScheduledInterest: res.totalScheduledInterest,
    totalInterestPlusFees: res.totalInterestPlusFees,
    totalCashPaid: res.totalCashPaid,
    estimatedAPR: res.estimatedAPR,
    aprIncrease: res.estimatedAPR - 6.0,
  };
});

/* ── Verified Scenario 2: Term Duration Amortization with Fixed $1,200 Fee ── */
const TERM_LEVELS = [
  { months: 24, label: '2 Years (24 Months)' },
  { months: 36, label: '3 Years (36 Months)' },
  { months: 48, label: '4 Years (48 Months)' },
  { months: 60, label: '5 Years (60 Months)' },
  { months: 72, label: '6 Years (72 Months)' },
] as const;

const TERM_ROWS = TERM_LEVELS.map((item) => {
  const res = calculateAPR(30_000, 6.0, item.months, 1200);
  if ('error' in res) throw new Error(res.error);
  return {
    ...item,
    monthlyPayment: res.monthlyPayment,
    totalScheduledInterest: res.totalScheduledInterest,
    totalCashPaid: res.totalCashPaid,
    estimatedAPR: res.estimatedAPR,
  };
});

export default function AprFeesImpactView({
  locale = DEFAULT_LOCALE,
}: AprFeesImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('apr-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'APR Calculator';

  const moderateTier = FEE_ROWS[2]; // $1,200 fee
  const zeroTier = FEE_ROWS[0]; // $0 fee

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
          How Fees Affect Loan APR
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
            How Fees Affect the APR of a Loan
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Discover how upfront financing charges, origination points, and loan duration determine your effective APR. See why short-term loans experience much sharper APR increases from fees than long-term loans.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Fee Mechanism */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Upfront Fees Increase Your Cost of Borrowing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When you borrow money, upfront fees (such as lender origination fees, application charges, or discount points) are typically deducted directly from your loan payout. Because you receive less cash in hand while still repaying interest on the full nominal loan amount, your effective annualized borrowing rate increases.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              The APR Cash Flow Mechanism:
            </span>
            Net Cash Received = Loan Principal - Upfront Fees
            <br />
            Scheduled Monthly Payment = Calculated on Full Principal at Stated Note Rate
            <br />
            Estimated APR = Internal Rate of Return equating Net Cash Received to Monthly Payments
          </div>
          <div className="mt-4 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Baseline Parameters for This Scenario:</p>
            <p>• <strong>Loan Principal:</strong> $30,000.00</p>
            <p>• <strong>Stated Interest Rate:</strong> 6.00% fixed</p>
            <p>• <strong>Standard Loan Term:</strong> 48 Months (4 Years)</p>
            <p>• <strong>Payment Frequency:</strong> Monthly fixed amortization</p>
          </div>
        </section>

        {/* Section 2: Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $0 vs. $1,200 Fee on a $30,000 48-Month Loan
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Consider a borrower taking out a $30,000 48-month loan at 6.00% stated interest rate. Compare the outcomes with zero fees versus a $1,200 (4.0%) upfront fee:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850/30 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">Baseline (Zero Fees)</span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>• Upfront Fee: <strong>$0.00</strong></p>
                <p>• Net Cash Disbursed: <strong>{formatCurrency(zeroTier.netProceeds)}</strong></p>
                <p>• Monthly Payment: <strong>{formatCurrency(zeroTier.monthlyPayment)}</strong></p>
                <p>• Total Scheduled Interest: <strong>{formatCurrency(zeroTier.totalScheduledInterest)}</strong></p>
                <p>• Total Out-of-Pocket Cost: <strong>{formatCurrency(zeroTier.totalCashPaid)}</strong></p>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Estimated APR:</span>
                  <span className="font-mono font-black text-lg text-emerald-600 dark:text-emerald-400">{formatPercent(zeroTier.estimatedAPR)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-orange-200 dark:border-orange-900/40 bg-orange-50/20 dark:bg-orange-950/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">With $1,200 Upfront Fee (4%)</span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>• Upfront Fee: <strong>$1,200.00</strong></p>
                <p>• Net Cash Disbursed: <strong>{formatCurrency(moderateTier.netProceeds)}</strong></p>
                <p>• Monthly Payment: <strong>{formatCurrency(moderateTier.monthlyPayment)}</strong></p>
                <p>• Total Interest + Fees: <strong>{formatCurrency(moderateTier.totalInterestPlusFees)}</strong></p>
                <p>• Total Out-of-Pocket Cost: <strong>{formatCurrency(moderateTier.totalCashPaid)}</strong></p>
                <div className="pt-2 border-t border-orange-200 dark:border-orange-800 flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Estimated APR:</span>
                  <span className="font-mono font-black text-lg text-[#f97316]">{formatPercent(moderateTier.estimatedAPR)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <p className="font-bold text-gray-900 dark:text-white text-base">
              Key Observation: Stated rate stays 6.00%, but APR increases by 2.11 percentage points to 8.11%.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your monthly payment of $704.55 doesn&apos;t change, but your net borrowed cash dropped to $28,800. The $1,200 fee increases your total repayment from $33,818.44 to $35,018.44.
            </p>
          </div>
        </section>

        {/* Section 3: Table 1 - Progression of Fees */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Table 1: Impact of Escalating Upfront Fees ($30,000 Loan, 48 Months at 6.0%)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            See how incremental fees expand the APR and increase total repayment:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Fee Level</th>
                  <th className="py-3 pr-3 font-semibold">Upfront Fee ($)</th>
                  <th className="py-3 pr-3 font-semibold">Net Cash Received</th>
                  <th className="py-3 pr-3 font-semibold">Monthly Payment</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Estimated APR</th>
                  <th className="py-3 pr-3 font-semibold">APR Markup</th>
                  <th className="py-3 font-semibold">Total Cost Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {FEE_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300 font-mono">
                      {formatCurrency(row.fee)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300 font-mono">
                      {formatCurrency(row.netProceeds)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.monthlyPayment)}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatPercent(row.estimatedAPR)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400 font-mono text-xs">
                      +{row.aprIncrease.toFixed(2)}%
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

        {/* Section 4: Table 2 - The Crucial Term Effect */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Table 2: How Loan Term Amortizes Fees ($30,000 Loan at 6.0% with $1,200 Fee)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            The exact same $1,200 fee produces vastly different APRs depending on how many months you have to spread the cost:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Loan Duration</th>
                  <th className="py-3 pr-3 font-semibold">Periods (Months)</th>
                  <th className="py-3 pr-3 font-semibold">Monthly Payment</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Estimated APR</th>
                  <th className="py-3 pr-3 font-semibold">Total Scheduled Interest</th>
                  <th className="py-3 font-semibold">Total Cash Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {TERM_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400 font-mono">
                      {row.months}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.monthlyPayment)}
                    </td>
                    <td className="py-3 pr-3 font-extrabold text-[#f97316]">
                      {formatPercent(row.estimatedAPR)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.totalScheduledInterest)}
                    </td>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300">
                      {formatCurrency(row.totalCashPaid)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-850/40 border border-gray-200 dark:border-gray-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Key Term Takeaway:</strong> On a 24-month term, the $1,200 fee pushes the APR to <strong>10.05%</strong> (a 4.05% markup over the 6% rate). On a 72-month term, that same fee only raises the APR to <strong>7.44%</strong> (a 1.44% markup), because the upfront expense is amortized over six years of payments instead of two.
          </div>
        </section>

        {/* Assumptions & Limitations Box */}
        <div className="border border-gray-200/60 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Calculation Assumptions &amp; Scope Limitations</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Assumes fees are paid upfront at closing, reducing net loan proceeds. Calculations represent nominal annualized APR (monthly rate × 12). Does not model loan capitalization of fees into the principal, early payoff, prepayment penalties, balloon payments, property taxes, or hazard insurance.
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
                q: 'What happens if the lender rolls upfront fees into the loan balance?',
                a: 'If fees are financed (added to the principal balance rather than paid from out-of-pocket cash), your borrowed balance increases. You will pay interest on those fees for the life of the loan, which increases monthly payments and cumulative interest.',
              },
              {
                q: 'Are discount points considered upfront loan fees in APR?',
                a: 'Yes. Discount points paid at closing to lower your stated interest rate are upfront financing charges and are included in the APR calculation.',
              },
              {
                q: 'Why are short-term loans so sensitive to upfront fees?',
                a: 'Upfront fees represent a fixed one-time dollar expense. In a short-term loan (e.g. 12 or 24 months), there are fewer monthly payment periods over which to distribute that cost, resulting in a significantly higher annualized rate.',
              },
              {
                q: 'Are all closing costs included in APR calculations?',
                a: 'No. Generally, only charges directly tied to extending credit (origination fees, processing fees, points, underwriting charges) are included. Third-party closing costs such as notary, recording, or title transfer fees are frequently excluded depending on local regulations.',
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
              href={`${prefix}/tools/auto-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Auto Loan Calculator
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
              href={`${prefix}/tools/mortgage-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Mortgage Calculator
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
