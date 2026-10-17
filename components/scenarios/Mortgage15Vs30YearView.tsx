import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Clock, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcMortgageDetails, formatCurrency } from '@/data/mortgage-scenarios-data';

interface Mortgage15Vs30YearViewProps {
  locale?: Locale;
}

/* ── Fixed Baseline Parameters ──────────────────────────────────────────── */
const HOME_VALUE = 300_000;
const DOWN_PAYMENT = 60_000; // 20% down
const RATE = 4.5;
const TAX_RATE = 1.2;
const ANNUAL_INSURANCE = 1200;

// Baseline 15-Year vs 30-Year on $300k home
const RESULT_30 = calcMortgageDetails({
  homeValue: HOME_VALUE,
  downPayment: DOWN_PAYMENT,
  rate: RATE,
  years: 30,
  tax: TAX_RATE,
  insurance: ANNUAL_INSURANCE,
});

const RESULT_15 = calcMortgageDetails({
  homeValue: HOME_VALUE,
  downPayment: DOWN_PAYMENT,
  rate: RATE,
  years: 15,
  tax: TAX_RATE,
  insurance: ANNUAL_INSURANCE,
});

const MONTHLY_DIFF = Math.round((RESULT_15.monthlyTotal - RESULT_30.monthlyTotal) * 100) / 100;
const INTEREST_SAVED = Math.round((RESULT_30.totalInterest - RESULT_15.totalInterest) * 100) / 100;

// Multiple loan size comparisons
const COMPARISON_TIERS = [
  { label: '$200,000 Loan ($250k Home)', homeVal: 250_000, down: 50_000 },
  { label: '$240,000 Loan ($300k Home)', homeVal: 300_000, down: 60_000 },
  { label: '$320,000 Loan ($400k Home)', homeVal: 400_000, down: 80_000 },
  { label: '$400,000 Loan ($500k Home)', homeVal: 500_000, down: 100_000 },
].map((item) => {
  const r30 = calcMortgageDetails({
    homeValue: item.homeVal,
    downPayment: item.down,
    rate: RATE,
    years: 30,
    tax: TAX_RATE,
    insurance: ANNUAL_INSURANCE,
  });
  const r15 = calcMortgageDetails({
    homeValue: item.homeVal,
    downPayment: item.down,
    rate: RATE,
    years: 15,
    tax: TAX_RATE,
    insurance: ANNUAL_INSURANCE,
  });
  return {
    ...item,
    r30,
    r15,
    monthlyDiff: Math.round((r15.monthlyTotal - r30.monthlyTotal) * 100) / 100,
    interestSaved: Math.round((r30.totalInterest - r15.totalInterest) * 100) / 100,
  };
});

export default function Mortgage15Vs30YearView({
  locale = DEFAULT_LOCALE,
}: Mortgage15Vs30YearViewProps) {
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
          15-Year vs 30-Year Mortgage
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
            15-Year vs 30-Year Mortgage: Monthly Payment and Total Interest
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Compare 15-year and 30-year fixed mortgages side by side. See the core financial trade-off: a lower, more flexible monthly payment versus massive interest savings and debt freedom 15 years earlier.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Core Trade-Off */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Fundamental Loan Term Trade-Off
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Choosing between a 15-year and a 30-year fixed mortgage is primarily a choice between <strong>month-to-month cash flow</strong> and <strong>lifetime interest savings</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                30-Year Mortgage Advantages
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Lower required monthly payments give you greater budget flexibility, cushion against income changes, and make it easier to qualify for a larger purchase.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
                15-Year Mortgage Advantages
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Builds equity twice as fast, cuts total interest by more than half, and pays off the entire balance 15 years sooner.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-semibold text-orange-900 dark:text-orange-300">Worked Comparison Baseline:</p>
            <p>• Home Price: $300,000 | Down Payment: $60,000 (20%) | Loan Amount: $240,000</p>
            <p>• Interest Rate: 4.5% annual fixed rate for both terms</p>
            <p>• Property Tax: 1.2% ($300/mo) | Home Insurance: $1,200/yr ($100/mo) | PMI: $0</p>
          </div>
        </section>

        {/* Section 2: Side-by-Side Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Comparison: $240,000 Loan at 4.5%
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 30-Year Card */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">30-Year Fixed</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold">360 Months</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
                ${RESULT_30.monthlyTotal.toFixed(2)}<span className="text-xs font-normal text-slate-500">/mo</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                <p>• Principal &amp; Interest: ${RESULT_30.monthlyPrincipalAndInterest.toFixed(2)}/mo</p>
                <p>• Taxes &amp; Insurance: ${(RESULT_30.monthlyTax + RESULT_30.monthlyInsurance).toFixed(2)}/mo</p>
                <p>• Total Repaid: ${RESULT_30.totalPrincipalAndInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  • Total Lifetime Interest: ${RESULT_30.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* 15-Year Card */}
            <div className="border border-[#f97316]/50 dark:border-[#f97316]/40 rounded-xl p-5 bg-orange-50/20 dark:bg-orange-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">15-Year Fixed</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 font-semibold">180 Months</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
                ${RESULT_15.monthlyTotal.toFixed(2)}<span className="text-xs font-normal text-slate-500">/mo</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                <p>• Principal &amp; Interest: ${RESULT_15.monthlyPrincipalAndInterest.toFixed(2)}/mo</p>
                <p>• Taxes &amp; Insurance: ${(RESULT_15.monthlyTax + RESULT_15.monthlyInsurance).toFixed(2)}/mo</p>
                <p>• Total Repaid: ${RESULT_15.totalPrincipalAndInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                <p className="font-semibold text-green-700 dark:text-green-400">
                  • Total Lifetime Interest: ${RESULT_15.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Delta Highlight Banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 p-5 rounded-xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1">
            <p className="font-bold text-base text-emerald-800 dark:text-emerald-300">
              Direct Savings Summary:
            </p>
            <p>
              The 15-year loan requires <strong>${MONTHLY_DIFF.toFixed(2)} more per month</strong>, but saves <strong>${INTEREST_SAVED.toLocaleString(undefined, { minimumFractionDigits: 2 })} in total interest</strong> and frees you from mortgage payments 15 years sooner.
            </p>
          </div>
        </section>

        {/* Section 3: Multi-Loan Size Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            15-Year vs 30-Year Comparison by Loan Size
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Compare monthly payments and lifetime interest differences at 4.5% interest rate across various home purchase amounts:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3 pr-3 font-semibold">Loan Tier</th>
                  <th className="py-3 pr-3 font-semibold">30-Yr Total Mo</th>
                  <th className="py-3 pr-3 font-semibold">15-Yr Total Mo</th>
                  <th className="py-3 pr-3 font-semibold">Monthly Delta</th>
                  <th className="py-3 pr-3 font-semibold">30-Yr Total Int</th>
                  <th className="py-3 pr-3 font-semibold">15-Yr Total Int</th>
                  <th className="py-3 font-semibold text-emerald-600 dark:text-emerald-400">Interest Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {COMPARISON_TIERS.map((tier) => (
                  <tr key={tier.label} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-white">
                      {tier.label}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(tier.r30.monthlyTotal, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300">
                      {formatCurrency(tier.r15.monthlyTotal, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-[#f97316] font-semibold">
                      +{formatCurrency(tier.monthlyDiff, locale, 2)}/mo
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(tier.r30.totalInterest, locale, 2)}
                    </td>
                    <td className="py-3 pr-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(tier.r15.totalInterest, locale, 2)}
                    </td>
                    <td className="py-3 font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(tier.interestSaved, locale, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">
            Assumptions: Fixed 4.5% interest rate, 20% down payment, 1.2% property tax, and $1,200/year home insurance.
          </p>
        </section>

        {/* Section 4: Decision Framework */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Which Loan Term Fits Your Goals?
          </h2>
          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                Consider a 30-Year Mortgage if:
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                You want the lowest mandatory monthly payment to protect your cash flow against unexpected life events, or if you prefer directing surplus funds into other investments, retirement accounts, or emergency reserves. You can also make extra principal payments on a 30-year loan whenever cash flow permits without being legally obligated to do so.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                Consider a 15-Year Mortgage if:
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Your household cash flow comfortably accommodates the higher monthly payment, you want guaranteed debt-free homeownership in half the time, and you want to avoid paying tens or hundreds of thousands of dollars in interest over 30 years.
              </p>
            </div>
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
                q: 'Why does a 15-year loan save so much interest?',
                a: 'A 15-year mortgage amortizes principal much faster. Because the loan balance shrinks rapidly each month, subsequent monthly interest charges are calculated on a far smaller principal amount over 180 months instead of 360.',
              },
              {
                q: 'Do 15-year mortgages usually offer lower interest rates than 30-year mortgages?',
                a: 'In many market conditions, lenders offer lower interest rates on 15-year loans (often 0.5% to 0.75% lower) because the lender is exposed to interest-rate and default risk for a shorter period. This example uses identical rates to isolate the impact of loan duration alone.',
              },
              {
                q: 'Can I pay off a 30-year mortgage in 15 years by making extra payments?',
                a: 'Yes. Most standard conventional mortgages have no prepayment penalties. By making extra principal payments on a 30-year loan, you can mimic a 15-year payoff while retaining the flexibility of a lower required monthly payment if an emergency arises.',
              },
              {
                q: 'Does property tax or insurance change between a 15-year and 30-year loan?',
                a: 'No. Property taxes and homeowners insurance are based on property valuation and insurance policies, not loan duration. In both scenarios, monthly taxes and insurance remain identical.',
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
