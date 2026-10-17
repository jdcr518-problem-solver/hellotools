import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Fuel, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcEvCostComparison, formatCurrency, formatPercent } from '@/data/ev-cost-scenarios-data';

interface EvCostGasPriceImpactViewProps {
  locale?: Locale;
}

export default function EvCostGasPriceImpactView({
  locale = DEFAULT_LOCALE,
}: EvCostGasPriceImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('ev-cost-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'EV Charging vs Gas Cost Calculator';

  // Constants
  const ANNUAL_MILES = 12000;
  const EV_KWH_PER_100 = 30;
  const ELEC_RATE = 0.16;
  const GAS_MPG = 28;

  // Gas price tiers ($/gal)
  const gasPriceTiers = [2.75, 3.25, 3.60, 4.25, 5.00];

  const gasRows = gasPriceTiers.map((price) => ({
    price,
    ...calcEvCostComparison({
      annualMiles: ANNUAL_MILES,
      evKwhPer100: EV_KWH_PER_100,
      elecRate: ELEC_RATE,
      gasMpg: GAS_MPG,
      gasPrice: price,
    }),
  }));

  const baseline360 = gasRows[2]; // $3.60 baseline

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
        <Link href={`${prefix}/tools/ev-cost-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/ev-cost-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Gas Price Impact
        </span>
      </nav>

      {/* Top Banner Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Page Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <Fuel className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Gas Price Changes the EV Savings Gap
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Evaluate how pump price fluctuations from $2.75 to $5.00 per gallon expand or compress the annual savings gap between gasoline vehicles and home EV charging.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Core Assumptions Box */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Comparison Baseline &amp; Controlled Variables
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            All scenarios keep distance and EV electricity rate constant while evaluating varying fuel prices against a standard 28 MPG internal combustion engine:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-gray-900 dark:text-white block mb-1">Annual Distance</span>
              <span className="font-mono text-slate-600 dark:text-slate-400">12,000 miles / year</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1">EV Benchmark</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">30 kWh/100 mi @ $0.16/kWh ($576/yr)</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
              <span className="font-bold text-amber-800 dark:text-amber-400 block mb-1">Gas Fuel Economy</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">28 MPG (~428.57 gal/yr)</span>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-xs text-slate-600 dark:text-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <span className="font-bold">Estimation notice:</span> Calculations model direct fuel and electricity costs. Maintenance differences (oil changes, brake wear), insurance variance, and purchase price amortization are not included.
            </p>
          </div>
        </section>

        {/* Step-by-Step Calculation Walkthrough */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Worked Example: National Baseline Gas Price ($3.60/Gallon)
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p className="font-mono text-xs">
              Annual Gas Gallons = 12,000 miles / 28 MPG = 428.57 gallons
            </p>
            <p className="font-mono text-xs">
              Gas Cost @ $3.60 = 428.57 gallons × $3.60/gal = <span className="font-bold text-amber-600 dark:text-amber-400">$1,542.86 / year</span> ($0.129/mile)
            </p>
            <p className="font-mono text-xs">
              EV Cost @ $0.16 = (12,000 / 100) × 30 × $0.16 = <span className="font-bold text-emerald-600 dark:text-emerald-400">$576.00 / year</span> ($0.048/mile)
            </p>
            <p className="font-mono text-xs">
              Annual Net Savings = $1,542.86 - $576.00 = <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(baseline360.annualSavings, 2)}</span> (~$967/year, {formatPercent(baseline360.savingsPercent)} savings)
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Gas Price Sensitivity Table (12,000 Miles/Year)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
            Observe how pump prices change annual gasoline expenses and widen the EV savings gap against fixed home charging costs ($576/year).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">Gas Price</th>
                  <th scope="col" className="p-3 font-bold text-amber-700 dark:text-amber-400">Gas Annual Cost</th>
                  <th scope="col" className="p-3 font-bold text-slate-700 dark:text-slate-300">Gas Cost Per Mile</th>
                  <th scope="col" className="p-3 font-bold text-[#1a3c5e] dark:text-blue-400">Annual Net Savings</th>
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">5-Year Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {gasRows.map((row) => (
                  <tr
                    key={row.price}
                    className={row.price === 3.60 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-semibold' : ''}
                  >
                    <td className="p-3 text-gray-900 dark:text-white">
                      ${row.price.toFixed(2)} / gal
                      {row.price === 3.60 && <span className="ml-2 text-[10px] text-[#f97316] font-bold">(Baseline)</span>}
                    </td>
                    <td className="p-3 font-mono text-amber-600 dark:text-amber-400">{formatCurrency(row.gasAnnualCost, 0)}</td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{formatCurrency(row.gasCostPerMile, 3)}/mi</td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(row.annualSavings, 0)} ({formatPercent(row.savingsPercent)})</td>
                    <td className="p-3 font-mono text-gray-900 dark:text-white font-bold">{formatCurrency(row.fiveYearSavings, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analysis & Explanations */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding Gas Price Sensitivity
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Gasoline price volatility has a direct multiplying effect on internal combustion vehicle operating costs. When gas is at $2.75 per gallon, annual gas expense is $1,179, yielding an EV savings advantage of $603 per year (51.1%).
            </p>
            <p>
              When gas prices climb to $5.00 per gallon, annual gas expense rises to $2,143, expanding EV savings to $1,567 per year (73.1% reduction) — more than $7,800 over 5 years. For an EV to lose its fuel cost advantage under these conditions, gasoline would need to fall below approximately $1.34 per gallon.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
            Frequently Asked Questions: Gas Prices &amp; EV Comparison
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                How low would gas prices need to drop for a gas car to be cheaper?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                With electricity at $0.16/kWh and an EV using 30 kWh/100 miles ($0.048/mile), gasoline would need to drop below $1.34 per gallon for a 28 MPG vehicle to match the EV fuel cost per mile.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                How do gas price spikes affect 5-year savings?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                At $3.60/gallon, 5-year fuel savings are $4,834. If gasoline averages $4.50/gallon over that period, cumulative 5-year fuel savings exceed $6,700, representing nearly $1,900 in additional savings.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Does a higher MPG gas car close the savings gap?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. A 45 MPG hybrid burning $3.60 gas costs $960 per year ($0.080/mile), narrowing the annual fuel savings gap against the EV from $967 down to $384.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Compare With Your Local Gas Station Prices</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Enter the exact price per gallon in your area into our calculator to view real-time savings projections.
            </p>
          </div>
          <Link
            href={`${prefix}/tools/ev-cost-calculator`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f97316] text-white text-xs sm:text-sm font-bold hover:bg-[#ea580c] transition-colors"
          >
            Open Calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Bottom Navigation & Internal Links */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Explore Other EV Cost Scenarios &amp; Financial Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/ev-cost-calculator/scenarios/ev-vs-gas-cost-for-10000-miles-per-year`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              EV vs Gas Cost for 10,000 Miles Per Year
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/ev-cost-calculator/scenarios/how-electricity-price-affects-ev-charging-savings`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Electricity Price Affects EV Charging Savings
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/auto-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Auto Loan Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/savings-goal-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Savings Goal Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related guide: </span>
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
