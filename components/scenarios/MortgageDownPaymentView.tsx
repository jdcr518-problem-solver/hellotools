import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcMortgageDetails, formatCurrency } from '@/data/mortgage-scenarios-data';

interface MortgageDownPaymentViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const HOME_VALUE = 300_000;
const RATE = 4.5;
const YEARS = 30;
const TAX_RATE = 1.2;
const ANNUAL_INSURANCE = 1200;
const PMI_RATE = 0.5;

const DOWN_PAYMENT_TIERS = [
  { pct: 5, label: '5% Down ($15,000)' },
  { pct: 10, label: '10% Down ($30,000)' },
  { pct: 15, label: '15% Down ($45,000)' },
  { pct: 20, label: '20% Down ($60,000)' },
] as const;

/* ── Pre-compute rows using the verified mortgage utility ───────────────── */
const ROWS = DOWN_PAYMENT_TIERS.map((tier) => {
  const downPayment = (HOME_VALUE * tier.pct) / 100;
  const result = calcMortgageDetails({
    homeValue: HOME_VALUE,
    downPayment,
    rate: RATE,
    years: YEARS,
    tax: TAX_RATE,
    insurance: ANNUAL_INSURANCE,
    pmi: PMI_RATE,
  });
  return {
    ...tier,
    ...result,
  };
});

const ROW_5 = ROWS[0];
const ROW_20 = ROWS[3];
const MONTHLY_SAVINGS = Math.round((ROW_5.monthlyTotal - ROW_20.monthlyTotal) * 100) / 100;
const INTEREST_SAVINGS = Math.round((ROW_5.totalInterest - ROW_20.totalInterest) * 100) / 100;

export default function MortgageDownPaymentView({
  locale = DEFAULT_LOCALE,
}: MortgageDownPaymentViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('mortgage-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Mortgage Calculator';

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
          How a Down Payment Changes Your Mortgage
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
        <ShieldCheck className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Does a Larger Down Payment Change Your Mortgage?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Putting more money down when buying a home delivers a triple financial benefit: smaller loan principal, lower monthly payments, and complete removal of Private Mortgage Insurance (PMI) once you reach 20%.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Three Benefits of a Larger Down Payment */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Down Payment Size Alters Your Loan
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Your down payment is the initial equity you invest in the property. Every dollar you contribute upfront reduces the amount you borrow, directly lowering both monthly payments and the lifetime interest you pay to your lender.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a3c5e] dark:text-blue-400">
                1. Smaller Loan Amount
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Borrowing less reduces the monthly principal and interest charges required to pay off the debt over 30 years.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
                2. Elimination of PMI
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Conventional lenders require Private Mortgage Insurance when down payment is below 20%. Reaching 20% drops PMI to $0 immediately.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                3. Compounding Interest Savings
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Because interest compounds monthly on the outstanding balance, a smaller starting balance saves thousands in cumulative interest.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Worked Model Parameters:</p>
            <p>• Home Purchase Price: $300,000 | Fixed Interest Rate: 4.5% | Loan Term: 30 Years (360 months)</p>
            <p>• Property Tax: 1.2% ($300/mo) | Home Insurance: $1,200/yr ($100/mo) | PMI Rate: 0.5% (when down &lt; 20%)</p>
          </div>
        </section>

        {/* Section 2: Comparison Table Across Down Payment Tiers */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Down Payment Comparison: $300,000 Home Purchase
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Notice how increasing your down payment progressively lowers the monthly payment and removes the $118.75/month PMI requirement at 20%:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Down Pmt Tier</th>
                  <th className="py-3 pr-3 font-semibold">Upfront Down Pmt</th>
                  <th className="py-3 pr-3 font-semibold">Loan Principal</th>
                  <th className="py-3 pr-3 font-semibold">Monthly P&amp;I</th>
                  <th className="py-3 pr-3 font-semibold">Monthly PMI</th>
                  <th className="py-3 pr-3 font-semibold text-[#f97316]">Total Monthly</th>
                  <th className="py-3 font-semibold">Total Interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.pct} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {row.label}
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
                    <td className="py-3 pr-3">
                      {row.monthlyPMI > 0 ? (
                        <span className="text-amber-700 dark:text-amber-400 font-medium">
                          {formatCurrency(row.monthlyPMI, locale, 2)}/mo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          $0.00 (No PMI)
                        </span>
                      )}
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
            Taxes ($300/mo) and insurance ($100/mo) are included in the Total Monthly payment column.
          </p>
        </section>

        {/* Section 3: 5% vs 20% Deep-Dive */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Comparing 5% Down vs. 20% Down
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                5% Down ($15,000 Upfront)
              </span>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${ROW_5.monthlyTotal.toFixed(2)}<span className="text-xs font-normal text-slate-500">/mo</span>
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-2 border-t border-gray-200 dark:border-gray-700">
                <li>• Loan balance: ${ROW_5.loanAmount.toLocaleString()}</li>
                <li>• PMI fee: ${ROW_5.monthlyPMI.toFixed(2)}/mo</li>
                <li>• Total interest: ${ROW_5.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                20% Down ($60,000 Upfront)
              </span>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${ROW_20.monthlyTotal.toFixed(2)}<span className="text-xs font-normal text-slate-500">/mo</span>
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-2 border-t border-emerald-200 dark:border-emerald-800">
                <li>• Loan balance: ${ROW_20.loanAmount.toLocaleString()}</li>
                <li>• PMI fee: <strong>$0.00</strong> (Eliminated)</li>
                <li>• Total interest: ${ROW_20.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</li>
              </ul>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 p-5 rounded-xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1">
            <p className="font-bold text-base text-emerald-800 dark:text-emerald-300">
              Key Takeaway:
            </p>
            <p>
              Investing $45,000 more in your down payment saves <strong>${MONTHLY_SAVINGS.toFixed(2)} every month</strong> (a 17.7% reduction in monthly payments) and eliminates <strong>${INTEREST_SAVINGS.toLocaleString(undefined, { minimumFractionDigits: 2 })} in total interest</strong> over 30 years.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" compact={false} />

        {/* Section 4: Scenario FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'What is Private Mortgage Insurance (PMI) and why does 20% remove it?',
                a: 'PMI is insurance that protects the lender if you stop making mortgage payments. Lenders consider loans with less than 20% equity riskier, so they charge an annual PMI premium (typically 0.5%–1.5% of the loan amount). Reaching 20% equity removes this requirement on conventional loans.',
              },
              {
                q: 'Can PMI be removed after buying a home with less than 20% down?',
                a: 'Yes. On conventional loans, homeowners can request PMI cancellation once scheduled amortization or extra principal payments bring the remaining loan balance down to 80% of the original home value.',
              },
              {
                q: 'Should I drain all my savings to reach a 20% down payment?',
                a: 'Not necessarily. While a 20% down payment eliminates PMI and reduces monthly payments, financial planners usually recommend keeping an emergency reserve (3 to 6 months of living expenses) plus cash for moving costs, closing costs, and immediate home repairs.',
              },
              {
                q: 'How does down payment affect property taxes and insurance?',
                a: 'Your down payment does not change property taxes or homeowners insurance premiums. Those costs are assessed based on the property’s market/assessed value and insurance coverage, not the size of your mortgage loan.',
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
              href={`${prefix}/tools/savings-goal-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Savings Goal Calculator
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
