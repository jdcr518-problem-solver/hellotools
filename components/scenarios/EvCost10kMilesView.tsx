import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Gauge, ArrowRight, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcEvCostComparison, formatCurrency, formatNumber, formatPercent } from '@/data/ev-cost-scenarios-data';

interface EvCost10kMilesViewProps {
  locale?: Locale;
}

export default function EvCost10kMilesView({ locale = DEFAULT_LOCALE }: EvCost10kMilesViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('ev-cost-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'EV Charging vs Gas Cost Calculator';

  // Fixed baseline parameters for 10k mile comparison
  const EV_KWH_PER_100 = 30; // 30 kWh / 100 mi
  const ELEC_RATE = 0.16; // $0.16 / kWh
  const GAS_MPG = 28; // 28 MPG
  const GAS_PRICE = 3.60; // $3.60 / gallon

  // Target worked scenario at 10,000 miles
  const worked10k = calcEvCostComparison({
    annualMiles: 10000,
    evKwhPer100: EV_KWH_PER_100,
    elecRate: ELEC_RATE,
    gasMpg: GAS_MPG,
    gasPrice: GAS_PRICE,
  });

  // Tiers for comparison table
  const mileageTiers = [5000, 8000, 10000, 12000, 15000, 20000];
  const tierResults = mileageTiers.map((miles) => ({
    miles,
    ...calcEvCostComparison({
      annualMiles: miles,
      evKwhPer100: EV_KWH_PER_100,
      elecRate: ELEC_RATE,
      gasMpg: GAS_MPG,
      gasPrice: GAS_PRICE,
    }),
  }));

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
          10,000 Miles Per Year
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
        <Gauge className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            EV vs Gas Cost for 10,000 Miles Per Year
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            A step-by-step mathematical comparison of annual home charging costs versus gasoline pump expenses for drivers traveling 10,000 miles annually.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Core Assumptions Box */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Baseline Inputs &amp; Working Assumptions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            All calculations strictly use the verified formula from our EV Charging vs Gas Cost Calculator. The table below details the baseline parameters used for this 10,000-mile benchmark:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2">
                Electric Vehicle (EV) Parameters
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li><span className="font-semibold">Annual Distance:</span> 10,000 miles</li>
                <li><span className="font-semibold">EV Efficiency:</span> 30 kWh per 100 miles</li>
                <li><span className="font-semibold">Electricity Rate:</span> $0.16 per kWh</li>
                <li><span className="font-semibold">Annual Energy Used:</span> 3,000 kWh</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
                Gasoline Vehicle Parameters
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li><span className="font-semibold">Annual Distance:</span> 10,000 miles</li>
                <li><span className="font-semibold">Fuel Economy:</span> 28 MPG</li>
                <li><span className="font-semibold">Gasoline Price:</span> $3.60 per gallon</li>
                <li><span className="font-semibold">Annual Fuel Used:</span> ~357.14 gallons</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-xs text-slate-600 dark:text-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <span className="font-bold">What is included &amp; excluded:</span> This scenario models direct electricity and gasoline fuel consumption. It excludes vehicle depreciation, battery degradation, financing interest, insurance premiums, maintenance, charging hardware purchase, and commercial public fast-charging surcharges.
            </p>
          </div>
        </section>

        {/* Step-by-Step Calculation Walkthrough */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Worked Step-by-Step Calculation
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                Step 1: Calculate EV Annual Electricity Expense
              </h3>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                Total kWh = (10,000 miles / 100) × 30 kWh = 3,000 kWh
              </p>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                EV Annual Cost = 3,000 kWh × $0.16/kWh = <span className="font-bold text-emerald-600 dark:text-emerald-400">$480.00</span>
              </p>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                EV Cost Per Mile = $480.00 / 10,000 miles = <span className="font-bold text-emerald-600 dark:text-emerald-400">$0.048 per mile</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                Step 2: Calculate Gasoline Vehicle Annual Fuel Expense
              </h3>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                Total Gallons = 10,000 miles / 28 MPG = 357.14 gallons
              </p>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                Gas Annual Cost = 357.14 gallons × $3.60/gal = <span className="font-bold text-amber-600 dark:text-amber-400">$1,285.71</span> (~$1,286)
              </p>
              <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                Gas Cost Per Mile = $1,285.71 / 10,000 miles = <span className="font-bold text-amber-600 dark:text-amber-400">$0.129 per mile</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 space-y-2">
              <h3 className="font-bold text-emerald-800 dark:text-emerald-400 text-xs uppercase tracking-wider">
                Step 3: Calculate Annual and Multi-Year Savings
              </h3>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300">
                Annual Net Savings = $1,285.71 - $480.00 = <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(worked10k.annualSavings, 2)}</span> (~$806/year)
              </p>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300">
                Percentage Reduction = ({formatCurrency(worked10k.annualSavings, 2)} / $1,285.71) × 100 = <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatPercent(worked10k.savingsPercent)}</span>
              </p>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300">
                5-Year Cumulative Savings = {formatCurrency(worked10k.annualSavings, 2)} × 5 = <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(worked10k.fiveYearSavings, 0)}</span>
              </p>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300">
                10-Year Cumulative Savings = {formatCurrency(worked10k.annualSavings, 2)} × 10 = <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(worked10k.tenYearSavings, 0)}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Mileage Tier Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Annual Driving Distance Comparison Table
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
            See how annual mileage changes fuel costs and expands annual net savings under identical efficiency assumptions (30 kWh/100 mi @ $0.16 vs 28 MPG @ $3.60).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">Annual Mileage</th>
                  <th scope="col" className="p-3 font-bold text-emerald-700 dark:text-emerald-400">EV Annual Cost</th>
                  <th scope="col" className="p-3 font-bold text-amber-700 dark:text-amber-400">Gas Annual Cost</th>
                  <th scope="col" className="p-3 font-bold text-[#1a3c5e] dark:text-blue-400">Annual Savings</th>
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">5-Year Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {tierResults.map((row) => (
                  <tr
                    key={row.miles}
                    className={row.miles === 10000 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-semibold' : ''}
                  >
                    <td className="p-3 text-gray-900 dark:text-white">
                      {formatNumber(row.miles)} mi/yr
                      {row.miles === 10000 && <span className="ml-2 text-[10px] text-[#f97316] font-bold">(Target Scenario)</span>}
                    </td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(row.evAnnualCost, 0)}</td>
                    <td className="p-3 font-mono text-amber-600 dark:text-amber-400">{formatCurrency(row.gasAnnualCost, 0)}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(row.annualSavings, 0)}</td>
                    <td className="p-3 font-mono text-gray-900 dark:text-white font-bold">{formatCurrency(row.fiveYearSavings, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What the Result Means */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding the 10,000-Mile Cost Comparison
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              At 10,000 miles per year, an electric vehicle operating at standard efficiency uses $0.048 of electricity per mile, compared to $0.129 of gasoline for an average 28 MPG internal combustion engine. This yields an estimated annual fuel savings of approximately $806, representing a 62.7% reduction in direct fuel expenditure.
            </p>
            <p>
              Because fuel savings scale linearly with distance traveled, higher-mileage drivers accumulate savings faster. However, prospective vehicle purchasers must weigh these fuel savings against purchase price differences, home charging installation costs, insurance rate differences, and regional electricity pricing structures.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
            Frequently Asked Questions: 10,000-Mile Driving Costs
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                How much does it cost to charge an EV for 10,000 miles?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                At an average efficiency of 30 kWh per 100 miles and a typical residential rate of $0.16 per kWh, charging an EV for 10,000 miles requires 3,000 kWh and costs approximately $480 per year.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Does driving fewer than 10,000 miles reduce EV savings?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. While you save the same percentage per mile (~63%), the absolute dollar savings scale down with lower mileage. For example, at 5,000 miles per year, fuel savings are roughly $403 per year rather than $806.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Does this calculation include public fast charging?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No. This calculation uses residential electric rates. Commercial DC fast chargers typically cost between $0.30 and $0.50 per kWh, which increases electricity expenditure compared to home charging.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Calculate Your Custom Driving Distance</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Adjust your exact mileage, electricity tariffs, and vehicle efficiency ratings in our interactive calculator.
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
              href={`${prefix}/tools/ev-cost-calculator/scenarios/how-electricity-price-affects-ev-charging-savings`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Electricity Price Affects EV Charging Savings
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
