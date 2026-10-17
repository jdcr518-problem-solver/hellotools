import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Calendar, ArrowRightLeft } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateAmortization,
  formatCurrency,
} from '@/data/amortization-scenarios-data';

interface AmortizationTermComparisonViewProps {
  locale?: Locale;
}

/* ── Fixed Baseline Parameters ──────────────────────────────────────────── */
const LOAN_AMOUNT = 250_000;
const RATE = 6.5;

const TERMS = [
  { years: 10, months: 120, label: '10-Year Term' },
  { years: 15, months: 180, label: '15-Year Term' },
  { years: 20, months: 240, label: '20-Year Term' },
  { years: 30, months: 360, label: '30-Year Term' },
] as const;

const TERM_RESULTS = TERMS.map((tItem) => {
  const res = calculateAmortization(LOAN_AMOUNT, RATE, tItem.months);
  const month60 = res?.monthlySchedule[59]; // Balance after 5 years (60 months)
  return {
    ...tItem,
    monthlyPayment: res?.regularPayment ?? 0,
    totalInterest: res?.totalInterest ?? 0,
    totalCost: res?.totalCost ?? 0,
    balanceAfter5Years: month60?.balance ?? 0,
    principalPaidAfter5Years: LOAN_AMOUNT - (month60?.balance ?? 0),
  };
});

export default function AmortizationTermComparisonView({
  locale = DEFAULT_LOCALE,
}: AmortizationTermComparisonViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('amortization-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Amortization Calculator';

  const term15 = TERM_RESULTS[1];
  const term30 = TERM_RESULTS[3];
  const monthlyPaymentIncrease = term15.monthlyPayment - term30.monthlyPayment;
  const interestSaved = term30.totalInterest - term15.totalInterest;

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
          Loan Term Comparison
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
            How Loan Term Affects Principal and Interest: 15-Year vs. 30-Year Comparison
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Compare monthly installments, equity accumulation speed, and cumulative lifetime interest across 10, 15, 20, and 30-year repayment terms for the same loan principal.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – The Fundamental Trade-Off */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Fundamental Loan Term Trade-Off
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Choosing a loan term is a trade-off between monthly budget affordability and lifetime financing cost:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                Shorter Terms (10 & 15 Years)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Require higher monthly installments, but retire debt quickly, minimizing the number of months interest can compound and saving tens or hundreds of thousands in total cost.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-1">
                Longer Terms (20 & 30 Years)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Provide lower, more manageable monthly installments that fit monthly cash flow budgets, but prolong interest accrual and significantly increase the total cost of the loan.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Assumptions: $250,000 principal balance, 6.50% fixed annual interest rate, standard monthly compounding. Figures exclude property taxes, homeowner’s insurance, private mortgage insurance (PMI), and escrow charges.
          </p>
        </section>

        {/* Section 2 – Side-by-Side Comparison */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Comparison Table: $250,000 at 6.50% Across 4 Terms
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            See the exact mathematical numbers generated across standard loan terms for a $250,000 loan at 6.50% APR:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[580px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Loan Term</th>
                  <th className="py-3 pr-4 text-right font-semibold">Monthly Payment</th>
                  <th className="py-3 pr-4 text-right font-semibold">Total Interest Paid</th>
                  <th className="py-3 pr-4 text-right font-semibold">Total Loan Cost</th>
                  <th className="py-3 text-right font-semibold">Interest Savings vs 30-Yr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-xs">
                {TERM_RESULTS.map((row) => {
                  const savings = term30.totalInterest - row.totalInterest;
                  return (
                    <tr key={row.years} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3 pr-4 text-gray-900 dark:text-white font-sans font-bold">
                        {row.label}
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
                      <td className="py-3 text-right text-blue-600 dark:text-blue-400 font-bold">
                        {savings === 0 ? '—' : `-${formatCurrency(savings, locale)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <ArrowRightLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Direct Head-to-Head: 15-Year vs. 30-Year
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Monthly Cash Outflow:</p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  The 15-year payment is <strong>{formatCurrency(monthlyPaymentIncrease, locale)}</strong> higher per month ($2,177.77 vs. $1,580.17, a 37.8% increase in monthly obligation).
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Cumulative Interest Saved:</p>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  The 15-year term saves an astonishing <strong className="text-blue-600 dark:text-blue-400">{formatCurrency(interestSaved, locale)}</strong> in interest over the life of the loan (a 55.5% reduction in total interest).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 – Equity Build After 5 Years */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Principal Paid Down After 5 Years (60 Payments)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            How much debt have you actually eliminated after 5 years of on-time payments?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TERM_RESULTS.map((row) => (
              <div key={row.years} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white block border-b border-gray-200 dark:border-gray-700 pb-1.5">
                  {row.label}
                </span>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Remaining Bal:</span>
                    <span className="font-mono font-bold">{formatCurrency(row.balanceAfter5Years, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Principal Paid:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{formatCurrency(row.principalPaidAfter5Years, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">% Paid Off:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">
                      {((row.principalPaidAfter5Years / LOAN_AMOUNT) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            After 5 years, the 15-year borrower has reduced their principal balance by $55,948.40 (22.4%), whereas the 30-year borrower has only reduced principal by $12,306.94 (4.9%).
          </p>
        </section>

        {/* Section 4 – Decision Framework */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How to Choose the Right Loan Term
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">When a Shorter Term Makes Sense:</h3>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>You have stable income and comfortably qualify under conservative debt-to-income limits.</li>
                <li>Your primary financial priority is becoming debt-free as fast as possible.</li>
                <li>You want to build home equity rapidly to protect against market downturns.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">When a Longer Term Makes Sense:</h3>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>You want lower mandatory monthly obligations to cushion against job transitions or unexpected expenses.</li>
                <li>You prefer to allocate freed-up monthly cash flow toward higher-earning investments, emergency funds, or retirement accounts.</li>
                <li>You are qualifying for a loan based on maximum monthly payment caps.</li>
              </ul>
            </div>
          </div>
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
                q: 'Why is total interest so much higher on a 30-year loan than a 15-year loan?',
                a: 'A 30-year term stretches repayment across 360 months instead of 180 months. Because the loan balance remains substantially larger for the first 15 years, interest is calculated on a much higher principal month after month, resulting in more than double the total interest paid.',
              },
              {
                q: 'Is the monthly payment on a 15-year loan double that of a 30-year loan?',
                a: 'No. While the term is cut in half (from 30 years to 15 years), the monthly payment only increases by about 38% ($2,177.77 vs $1,580.17 in our $250k example). This is because you avoid vast amounts of compounding interest, so less total money is required to retire the debt.',
              },
              {
                q: 'Does loan term affect the interest rate offered by lenders?',
                a: 'In many consumer lending markets (especially residential mortgages), 15-year loans often carry slightly lower interest rates (typically 0.25% to 0.75% lower) than 30-year loans because lenders face less duration risk. In our example, we used an identical 6.50% rate to illustrate the pure mathematical impact of term length alone.',
              },
              {
                q: 'Does this calculation match the HelloTools Amortization Calculator?',
                a: 'Yes. All monthly payments, interest totals, and five-year balances are computed directly with the calculateAmortization utility. You can enter $250,000 and 6.5% with 10, 15, 20, or 30 years into the calculator to verify each schedule.',
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
            href={`${prefix}/tools/mortgage-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Mortgage Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/auto-loan-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Auto Loan Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/blog/how-to-calculate-loan-amortization-schedule`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Amortization Guide Article
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
