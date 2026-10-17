import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Percent, ArrowUpRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateAmortization,
  formatCurrency,
} from '@/data/amortization-scenarios-data';

interface AmortizationInterestRateImpactViewProps {
  locale?: Locale;
}

/* ── Fixed Baseline Parameters ──────────────────────────────────────────── */
const LOAN_AMOUNT = 100_000;
const TERM_MONTHS = 360; // 30 Years
const RATES = [4.0, 5.5, 7.0, 8.5] as const;

const RATE_RESULTS = RATES.map((rate) => {
  const res = calculateAmortization(LOAN_AMOUNT, rate, TERM_MONTHS);
  return {
    rate,
    monthlyPayment: res?.regularPayment ?? 0,
    totalInterest: res?.totalInterest ?? 0,
    totalCost: res?.totalCost ?? 0,
    interestPercent: res ? (res.totalInterest / res.totalCost) * 100 : 0,
    firstMonthInterest: res ? res.monthlySchedule[0].interest : 0,
    firstMonthPrincipal: res ? res.monthlySchedule[0].principal : 0,
  };
});

export default function AmortizationInterestRateImpactView({
  locale = DEFAULT_LOCALE,
}: AmortizationInterestRateImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('amortization-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Amortization Calculator';

  const baseline = RATE_RESULTS[0]; // 4.0%
  const highest = RATE_RESULTS[3]; // 8.5%
  const monthlyDiff = highest.monthlyPayment - baseline.monthlyPayment;
  const interestDiff = highest.totalInterest - baseline.totalInterest;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl flex-wrap"
      >
        <Link href={prefix || '/'} className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{homeLabel}</span>
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/#finance`} className="hover:text-gray-950 dark:hover:text-white">
          {financeLabel}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/amortization-calculator`} className="hover:text-gray-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/amortization-calculator/scenarios`} className="hover:text-gray-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Interest Rate Impact
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
            How Interest Rate Affects Total Loan Cost and Payment Amortization
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Examine how variations in interest rate compound across an amortization schedule. Discover why even a 1% rate change creates a disproportionately large surge in total lifetime borrowing costs.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Core Concept */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Multiplier Effect of Interest Rates Over Time
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When you take out a loan, the interest rate dictates the fee you pay the lender each month for using their capital. Because installment loans amortize slowly over decades, small increments in the interest rate have an outsized compounding impact on:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
                Immediate Monthly Installment
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Higher interest rates demand larger monthly payments to ensure the loan still amortizes to zero within the agreed loan term.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                Lifetime Interest Ratio
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Higher rates heavily depress early principal reduction, keeping the outstanding loan balance higher for longer and accumulating drastically more interest.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Assumptions: $100,000 fixed principal, 30-year term (360 monthly payments). Compounded monthly. All examples exclude fees, taxes, and insurance to isolate the mathematical impact of interest rates alone.
          </p>
        </section>

        {/* Section 2 – Side-by-Side Comparison */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Comparison Table: $100,000 Loan at 4.0%, 5.5%, 7.0%, and 8.5%
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Compare how a $100,000 30-year loan performs across four different interest rate environments. All numbers are calculated with exact double-precision arithmetic.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Interest Rate</th>
                  <th className="py-3 pr-4 text-right font-semibold">Monthly Payment</th>
                  <th className="py-3 pr-4 text-right font-semibold">Total Interest Paid</th>
                  <th className="py-3 pr-4 text-right font-semibold">Total Cost of Loan</th>
                  <th className="py-3 text-right font-semibold">Interest as % of Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-xs">
                {RATE_RESULTS.map((row) => (
                  <tr key={row.rate} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-4 text-gray-900 dark:text-white font-sans font-bold">
                      {row.rate.toFixed(1)}% APR
                    </td>
                    <td className="py-3 pr-4 text-right font-bold text-gray-900 dark:text-white">
                      {formatCurrency(row.monthlyPayment, locale)}
                    </td>
                    <td className="py-3 pr-4 text-right text-orange-600 dark:text-orange-400">
                      {formatCurrency(row.totalInterest, locale)}
                    </td>
                    <td className="py-3 pr-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.totalCost, locale)}
                    </td>
                    <td className="py-3 text-right text-slate-600 dark:text-slate-300 font-sans">
                      {row.interestPercent.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-orange-50/40 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <ArrowUpRight className="h-4 w-4 text-[#f97316]" />
              The Cumulative Cost of a Higher Rate
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Moving from <strong>4.0%</strong> to <strong>8.5%</strong> increases the monthly payment by <strong>{formatCurrency(monthlyDiff, locale)}</strong> (+61%), but increases total lifetime interest by <strong>{formatCurrency(interestDiff, locale)}</strong> (+146%). At 8.5%, total interest paid (${formatCurrency(highest.totalInterest, locale)}) is nearly 1.8 times the original loan amount borrowed.
            </p>
          </div>
        </section>

        {/* Section 3 – Month 1 Cash Allocation */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Month 1 Allocation: How Rates Suppress Principal Paydown
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            The very first payment illustrates why higher-rate loans amortize so slowly in their initial years.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RATE_RESULTS.map((row) => (
              <div key={row.rate} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white block border-b border-gray-200 dark:border-gray-700 pb-1.5">
                  {row.rate.toFixed(1)}% Rate
                </span>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment:</span>
                    <span className="font-mono font-bold">{formatCurrency(row.monthlyPayment, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Interest:</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400">{formatCurrency(row.firstMonthInterest, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Principal:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{formatCurrency(row.firstMonthPrincipal, locale)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            At 4.0%, Month 1 applies $144.09 toward principal. At 8.5%, despite a payment that is $291.49 larger, only $60.58 goes to principal in Month 1 because interest absorbs $708.33.
          </p>
        </section>

        {/* Section 4 – Practical Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Strategic Insights on Loan Interest Rates
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Rate Shopping Matters More than Loan Size:</strong> Reducing your interest rate by even 0.5% saves tens of thousands in interest over a 30-year amortization schedule.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>The Tipping Point:</strong> Once interest rates approach 7% on a 30-year loan, total interest exceeds the original principal amount borrowed ($139,508.90 interest on a $100,000 loan).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Fixed vs. Adjustable Risks:</strong> An increase in rate on a floating loan not only increases your cash outlay each month, but severely delays when you will build meaningful equity.</span>
            </li>
          </ul>
        </section>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" compact={false} />

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'Why does a 1% rate increase have such a large effect on total interest?',
                a: 'Because on a 30-year loan, that additional 1% is charged every single month on the remaining unpaid balance for up to 360 months. In the early years, the principal barely decreases, so interest accumulates extensively.',
              },
              {
                q: 'How does interest rate affect the speed at which principal balance decreases?',
                a: 'A higher interest rate requires a higher dollar interest charge each month. Even with a larger total monthly installment, a smaller fraction goes to principal during the first 10 to 15 years, meaning your balance declines much more slowly.',
              },
              {
                q: 'What is the difference between stated interest rate and APR?',
                a: 'The stated interest rate is the base percentage used to calculate monthly interest charges in the amortization schedule. APR (Annual Percentage Rate) incorporates both the interest rate and upfront lender fees or closing points.',
              },
              {
                q: 'Does this calculation match the HelloTools Amortization Calculator?',
                a: 'Yes. All payments, monthly breakdowns, and total interest figures are generated directly using the calculateAmortization utility. You can test each interest rate in the calculator to verify the results.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{faq.q}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation & Internal Links */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href={`${prefix}/tools/amortization-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            Open Amortization Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/amortization-calculator/scenarios`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            View All Amortization Scenarios
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/compound-interest-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Compound Interest Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/mortgage-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Mortgage Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/blog/apr-vs-interest-rate-difference-explained`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            APR vs. Interest Rate Guide
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
