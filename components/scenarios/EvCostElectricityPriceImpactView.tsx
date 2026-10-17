import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Zap, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcEvCostComparison, formatCurrency, formatPercent } from '@/data/ev-cost-scenarios-data';

interface EvCostElectricityPriceImpactViewProps {
  locale?: Locale;
}

export default function EvCostElectricityPriceImpactView({
  locale = DEFAULT_LOCALE,
}: EvCostElectricityPriceImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('ev-cost-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'EV Charging vs Gas Cost Calculator';

  // Constants
  const ANNUAL_MILES = 12000;
  const EV_KWH_PER_100 = 30;
  const GAS_MPG = 28;
  const GAS_PRICE = 3.60;

  // Electricity rate tiers ($/kWh)
  const rateTiers = [0.08, 0.12, 0.16, 0.22, 0.28, 0.36];

  const rateRows = rateTiers.map((rate) => ({
    rate,
    ...calcEvCostComparison({
      annualMiles: ANNUAL_MILES,
      evKwhPer100: EV_KWH_PER_100,
      elecRate: rate,
      gasMpg: GAS_MPG,
      gasPrice: GAS_PRICE,
    }),
  }));

  const baseline16 = rateRows[2]; // $0.16 baseline

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
          Electricity Price Impact
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
        <Zap className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Electricity Price Affects EV Charging Savings
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Analyze how residential and regional electricity rates ranging from $0.08 to $0.36 per kWh alter annual charging costs and the net savings gap versus gasoline.
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
            To isolate the financial impact of electricity prices, driving distance and vehicle efficiencies are held constant across all tiers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-gray-900 dark:text-white block mb-1">Annual Distance</span>
              <span className="font-mono text-slate-600 dark:text-slate-400">12,000 miles / year</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1">EV Efficiency</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">30 kWh / 100 mi (3,600 kWh)</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
              <span className="font-bold text-amber-800 dark:text-amber-400 block mb-1">Gas Benchmark</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">28 MPG @ $3.60/gal ($1,543/yr)</span>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-xs text-slate-600 dark:text-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <span className="font-bold">Cost boundaries:</span> Estimates reflect direct electricity consumption. Public DC fast charging rates typically range higher ($0.30-$0.50/kWh), and tiered or time-of-use (TOU) rates vary by utility.
            </p>
          </div>
        </section>

        {/* Step-by-Step Calculation Walkthrough */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Worked Example: National Average Electricity Rate ($0.16/kWh)
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p className="font-mono text-xs">
              Annual EV kWh = (12,000 miles / 100) × 30 kWh = 3,600 kWh
            </p>
            <p className="font-mono text-xs">
              EV Cost @ $0.16 = 3,600 kWh × $0.16 = <span className="font-bold text-emerald-600 dark:text-emerald-400">$576.00 / year</span> ($0.048/mile)
            </p>
            <p className="font-mono text-xs">
              Gas Cost @ $3.60 = (12,000 miles / 28 MPG) × $3.60 = <span className="font-bold text-amber-600 dark:text-amber-400">$1,542.86 / year</span> ($0.129/mile)
            </p>
            <p className="font-mono text-xs">
              Annual Net Savings = $1,542.86 - $576.00 = <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(baseline16.annualSavings, 2)}</span> (~$967/year, {formatPercent(baseline16.savingsPercent)} savings)
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Electricity Price Sensitivity Table (12,000 Miles/Year)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
            Compare annual charging cost, cost per mile, and net fuel savings against a 28 MPG gas car at $3.60/gal ($1,543/yr).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">Electricity Rate</th>
                  <th scope="col" className="p-3 font-bold text-emerald-700 dark:text-emerald-400">EV Annual Cost</th>
                  <th scope="col" className="p-3 font-bold text-slate-700 dark:text-slate-300">Cost Per Mile</th>
                  <th scope="col" className="p-3 font-bold text-[#1a3c5e] dark:text-blue-400">Annual Net Savings</th>
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">5-Year Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rateRows.map((row) => (
                  <tr
                    key={row.rate}
                    className={row.rate === 0.16 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-semibold' : ''}
                  >
                    <td className="p-3 text-gray-900 dark:text-white">
                      ${row.rate.toFixed(2)} / kWh
                      {row.rate === 0.16 && <span className="ml-2 text-[10px] text-[#f97316] font-bold">(National Avg)</span>}
                    </td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(row.evAnnualCost, 0)}</td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{formatCurrency(row.evCostPerMile, 3)}/mi</td>
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
            Financial Impact of Electricity Rates on EV Economics
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Electricity price is one of the most decisive variables in total EV fuel expenditure. When electricity is inexpensive ($0.08/kWh off-peak), charging an EV costs just $288 annually ($0.024/mile), generating over $1,250 in annual fuel savings versus a 28 MPG gas car.
            </p>
            <p>
              Even at higher residential rates of $0.28 per kWh, an EV running at 30 kWh/100 miles costs $1,008 per year ($0.084/mile), maintaining a $535 annual advantage over $3.60 gasoline. The mathematical breakeven point occurs at approximately $0.43 per kWh, where EV electricity costs equal gasoline fuel expenses.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
            Frequently Asked Questions: Electricity Rates &amp; EV Costs
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                At what electricity price does an EV cost the same as a gas car?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                With gasoline at $3.60 per gallon and a 28 MPG vehicle ($0.129/mile), an EV using 30 kWh per 100 miles reaches parity at approximately $0.43 per kWh. Below $0.43/kWh, the EV is cheaper per mile to fuel.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                How does off-peak charging affect these numbers?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Many electric utilities offer time-of-use (TOU) plans with overnight rates as low as $0.08 to $0.10 per kWh. Charging exclusively during off-peak hours can increase annual fuel savings from ~$967 to over $1,200 per year.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Are public fast chargers more expensive than home charging?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. DC fast-charging networks typically charge between $0.30 and $0.50 per kWh, plus idle or session fees. Relying primarily on public fast chargers substantially narrows the fuel savings gap compared to home overnight charging.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Calculate With Your Local Electric Utility Rate</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Check your electric bill and input your exact kWh rate to see your personalized annual savings.
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
              href={`${prefix}/tools/ev-cost-calculator/scenarios/how-gas-price-changes-the-ev-savings-gap`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Gas Price Changes the EV Savings Gap
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
