import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingDown, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateFutureInflation,
  formatCurrency,
} from '@/data/inflation-scenarios-data';

interface InflationPurchasingPowerViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Data ──────────────────────────────────────────────── */
const BASE_AMOUNT = 10_000;
const BASE_RATE = 3.0;
const HORIZONS = [5, 10, 15, 20, 25, 30] as const;

const TIME_ROWS = HORIZONS.map((years) => {
  const result = calculateFutureInflation(BASE_AMOUNT, years, BASE_RATE);
  if ('error' in result) throw new Error('Calculation error');
  const purchasingPowerLoss = BASE_AMOUNT - result.purchasingPower;
  const purchasingPowerLossPct = (purchasingPowerLoss / BASE_AMOUNT) * 100;
  return {
    ...result,
    purchasingPowerLoss,
    purchasingPowerLossPct,
  };
});

const RATE_BENCHMARKS = [2.0, 3.0, 4.0, 5.0] as const;
const RATE_ROWS = RATE_BENCHMARKS.map((rate) => {
  const result = calculateFutureInflation(BASE_AMOUNT, 10, rate);
  if ('error' in result) throw new Error('Calculation error');
  const purchasingPowerLoss = BASE_AMOUNT - result.purchasingPower;
  const purchasingPowerLossPct = (purchasingPowerLoss / BASE_AMOUNT) * 100;
  return {
    ...result,
    purchasingPowerLoss,
    purchasingPowerLossPct,
  };
});

export default function InflationPurchasingPowerView({
  locale = DEFAULT_LOCALE,
}: InflationPurchasingPowerViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('inflation-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Inflation Calculator';

  // Benchmark 10-year case ($10,000 at 3% annual inflation)
  const baseCase = TIME_ROWS[1];

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
        <Link href={`${prefix}/tools/inflation-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/inflation-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Inflation Reduces Purchasing Power
        </span>
      </nav>

      {/* Top Banner Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <TrendingDown className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Inflation Reduces Purchasing Power: Real vs. Nominal Value
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Understand how persistent annual price increases erode the buying power of cash over time. See how much goods and services a fixed nominal sum will buy across 5 to 30 years under constant inflation assumptions.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Purchasing Power Mechanism */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding Purchasing Power Erosion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When prices across the economy rise, each individual dollar purchases fewer goods and services. Even when the nominal account balance remains entirely unchanged (for example, $10,000 sitting in a cash safe), its <strong>real purchasing power</strong> declines continuously.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 dark:text-orange-300 mb-1">
                Nominal Value
              </h3>
              <p className="text-xs text-orange-900 dark:text-orange-200/80 leading-relaxed">
                The face value of currency. A $10,000 bill or bank deposit remains $10,000 nominally regardless of inflation.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 mb-1">
                Real Purchasing Power
              </h3>
              <p className="text-xs text-blue-900 dark:text-blue-200/80 leading-relaxed">
                The physical quantity of goods and services that nominal money can purchase: <code>Purchasing Power = Amount / (1 + r)^t</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Worked Example: $10,000 Over 10 Years at 3% Inflation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: $10,000 nominal amount, constant 3.0% annual inflation, compounded annually across 10 years. Verified with the HelloTools Inflation Calculator engine.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 border border-gray-150 dark:border-gray-800 mb-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Nominal Starting Amount:</span>
              <span className="font-bold">{formatCurrency(BASE_AMOUNT)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Annual Inflation Rate:</span>
              <span className="font-bold">3.00%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Time Horizon:</span>
              <span className="font-bold">10 Years</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Compound Inflation Multiplier (1.03^10):</span>
              <span className="font-bold">1.3439</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
              <span>Future Purchasing Power ($10,000 ÷ 1.3439):</span>
              <span className="text-[#1a3c5e] dark:text-blue-400">{formatCurrency(baseCase.purchasingPower)}</span>
            </div>
            <div className="flex justify-between items-center text-red-600 dark:text-red-400 font-semibold pt-1 text-xs">
              <span>Cumulative Loss in Buying Power:</span>
              <span>-{formatCurrency(baseCase.purchasingPowerLoss)} (-{baseCase.purchasingPowerLossPct.toFixed(2)}%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Future Purchasing Power</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(baseCase.purchasingPower)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">What $10,000 will buy in 10 yrs</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Purchasing Power Loss</span>
              <div className="text-xl font-extrabold mt-1 text-orange-300">-{baseCase.purchasingPowerLossPct.toFixed(1)}%</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Erosion of original buying capacity</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Equivalent Future Cost</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(baseCase.equivalentFutureCost)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Cost of same goods in 10 yrs</span>
            </div>
          </div>
        </section>

        {/* Section 3: Time Horizon Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Purchasing Power Across Time Horizons (3% Annual Inflation)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Starting with $10,000 nominal cash. See how purchasing power declines as the time horizon extends up to 30 years.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Time Horizon</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Nominal Balance</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Future Purchasing Power</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Cumulative Buying Power Lost</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Equivalent Future Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {TIME_ROWS.map((row) => (
                  <tr key={row.years} className={row.years === 10 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.years} Years</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(BASE_AMOUNT)}</td>
                    <td className="py-3 px-3 text-[#1a3c5e] dark:text-blue-400 font-bold">{formatCurrency(row.purchasingPower)}</td>
                    <td className="py-3 px-3 text-red-600 dark:text-red-400">-{row.purchasingPowerLossPct.toFixed(2)}%</td>
                    <td className="py-3 px-3 text-right text-slate-700 dark:text-slate-300">{formatCurrency(row.equivalentFutureCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Inflation Rate Sensitivity */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Impact of Different Annual Inflation Rates (10-Year Horizon)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare how different constant annual inflation rates impact the 10-year purchasing power of $10,000.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Annual Inflation Rate</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">10-Year Purchasing Power</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Real Loss ($)</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Cumulative Loss (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {RATE_ROWS.map((row) => (
                  <tr key={row.rate} className={row.rate === 3 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.rate.toFixed(1)}% per year</td>
                    <td className="py-3 px-3 text-[#1a3c5e] dark:text-blue-400 font-bold">{formatCurrency(row.purchasingPower)}</td>
                    <td className="py-3 px-3 text-red-600 dark:text-red-400">-{formatCurrency(row.purchasingPowerLoss)}</td>
                    <td className="py-3 px-3 text-right text-red-600 dark:text-red-400 font-bold">-{row.purchasingPowerLossPct.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Key Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Crucial Principles of Purchasing Power
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <li>
              <strong>Cash does not retain constant real value:</strong> While nominal deposits do not drop in balance on their own, steady 3% annual inflation halves the purchasing power of idle currency in approximately 24 years.
            </li>
            <li>
              <strong>Opposite sides of the same coin:</strong> Equivalent future cost looks forward at how much more currency you need (e.g. $13,439.16 to buy $10,000 worth of goods), whereas purchasing power looks backward at what today’s fixed cash buys ($7,440.94 worth).
            </li>
            <li>
              <strong>Planning relevance:</strong> Understanding real purchasing power helps assess long-term retirement budgets and emergency funds that may sit uninvested for extended years.
            </li>
          </ul>
        </section>

        {/* Educational Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Section 6: FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'What does purchasing power mean in simple terms?',
                a: 'Purchasing power is the quantity of goods or services that one unit of currency can buy. When inflation causes general price levels to rise, each dollar buys fewer items, meaning its purchasing power declines.',
              },
              {
                q: 'Why is purchasing power different from equivalent future cost?',
                a: 'Equivalent future cost asks: "How much will $10,000 of today’s goods cost in 10 years?" (Answer: $13,439.16 at 3%). Purchasing power asks: "What will a fixed $10,000 in cash buy in 10 years in today’s dollars?" (Answer: $7,440.94). Both use the same underlying compound growth rate but evaluate opposite perspectives.',
              },
              {
                q: 'Does this projection account for fluctuations in CPI from year to year?',
                a: 'No. Projection mode assumes a constant, uniform annual inflation rate across the entire duration. In real-world economies, annual inflation rates fluctuate from year to year. Historical calculations in our tool reflect actual BLS CPI-U changes.',
              },
              {
                q: 'Can negative inflation (deflation) increase purchasing power?',
                a: 'Yes. Deflation occurs when average price levels decrease (a negative inflation rate). Under deflation, purchasing power increases over time because the same nominal dollar buys more goods in the future.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#f97316] shrink-0" aria-hidden="true" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 pl-6">
                  {faq.a}
                </p>
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
              href={`${prefix}/tools/inflation-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Inflation Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/inflation-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Inflation Scenarios
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
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
              href={`${prefix}/tools/retirement-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Retirement Savings Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/how-much-will-401k-be-worth-at-65"
              className="text-[#f97316] hover:underline font-semibold"
            >
              How Much Will My 401(k) Be Worth at Age 65?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
