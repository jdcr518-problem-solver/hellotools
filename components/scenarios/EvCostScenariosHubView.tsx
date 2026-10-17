import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, Zap, Fuel, Gauge, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { EV_COST_SCENARIOS_SECTION_I18N, calcEvCostComparison, formatCurrency, formatPercent } from '@/data/ev-cost-scenarios-data';

interface EvCostScenariosHubViewProps {
  locale?: Locale;
}

export default function EvCostScenariosHubView({ locale = DEFAULT_LOCALE }: EvCostScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('ev-cost-calculator', locale);
  const tData = EV_COST_SCENARIOS_SECTION_I18N[locale] || EV_COST_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'EV Charging vs Gas Cost Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/ev-cost-calculator/scenarios/ev-vs-gas-cost-for-10000-miles-per-year`,
      title: tData.cards.tenThousandMiles.title,
      description: tData.cards.tenThousandMiles.description,
      badge: tData.cards.tenThousandMiles.badge,
      icon: Gauge,
    },
    {
      href: `${prefix}/tools/ev-cost-calculator/scenarios/how-electricity-price-affects-ev-charging-savings`,
      title: tData.cards.electricityPrice.title,
      description: tData.cards.electricityPrice.description,
      badge: tData.cards.electricityPrice.badge,
      icon: Zap,
    },
    {
      href: `${prefix}/tools/ev-cost-calculator/scenarios/how-gas-price-changes-the-ev-savings-gap`,
      title: tData.cards.gasPrice.title,
      description: tData.cards.gasPrice.description,
      badge: tData.cards.gasPrice.badge,
      icon: Fuel,
    },
  ];

  // Baseline scenario summary for quick reference
  const baseline = calcEvCostComparison({
    annualMiles: 12000,
    evKwhPer100: 30,
    elecRate: 0.16,
    gasMpg: 28,
    gasPrice: 3.60,
  });

  const tenK = calcEvCostComparison({
    annualMiles: 10000,
    evKwhPer100: 30,
    elecRate: 0.16,
    gasMpg: 28,
    gasPrice: 3.60,
  });

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate your own EV vs gas cost scenario?',
      subtitle: 'Use the free EV Charging vs Gas Cost Calculator to input your exact annual mileage, home electricity rate, vehicle efficiency, and local gas prices.',
      button: 'Open EV Cost Calculator',
    },
    es: {
      title: '¿Listo para calcular su propio costo de EV frente a gasolina?',
      subtitle: 'Utilice la calculadora gratuita para ingresar su millaje anual exacto, tarifa eléctrica, eficiencia del auto y precio de la gasolina.',
      button: 'Abrir Calculadora de EV',
    },
    de: {
      title: 'Möchten Sie Ihren individuellen E-Auto-Kostenvergleich berechnen?',
      subtitle: 'Nutzen Sie unseren kostenlosen Rechner mit Ihrer persönlichen Jahresfahrleistung, Ihrem Stromtarif, Verbrauch und aktuellen Benzinpreisen.',
      button: 'E-Auto-Rechner öffnen',
    },
    fr: {
      title: 'Prêt à simuler vos propres économies de recharge électrique ?',
      subtitle: 'Personnalisez votre kilométrage annuel, votre tarif d’électricité au kWh, l’efficacité de votre véhicule et le prix du carburant.',
      button: 'Ouvrir le Simulateur',
    },
    pt: {
      title: 'Pronto para calcular sua economia com veículo elétrico?',
      subtitle: 'Insira sua quilometragem anual estimada, valor da tarifa elétrica, consumo do veículo e preço atual da gasolina.',
      button: 'Abrir Calculadora',
    },
    ja: {
      title: 'ご自身の走行条件でEV充電コストとガソリン代を比較しませんか？',
      subtitle: '無料の計算ツールで、年間の想定走行距離、ご家庭の電気料金単価、電費・燃費、近隣のガソリン価格を入力して正確に試算できます。',
      button: 'EV計算機を開く',
    },
  };

  const cta = ctaLabels[locale] || ctaLabels.en;

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
        <Link href={`${prefix}/tools/ev-cost-calculator`} className="hover:text-gray-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Scenarios
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
        <LayoutList className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {tData.heading}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {tData.intro}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Scenario Grid */}
        <section aria-labelledby="hub-scenarios-heading">
          <h2 id="hub-scenarios-heading" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Cost Comparison Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {scenarios.map((scenario) => {
              const IconComponent = scenario.icon;
              return (
                <div
                  key={scenario.href}
                  className="flex flex-col justify-between p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-[#f97316]">
                        <IconComponent className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                        {scenario.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors leading-snug">
                      {scenario.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                      href={scenario.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 group-hover:text-[#f97316] transition-colors"
                    >
                      Explore Scenario
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Comparison Snapshot Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Baseline Annual Cost &amp; Savings Benchmark
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
            Compare annual fuel expenses based on 30 kWh/100 mi for an EV at $0.16/kWh versus a 28 MPG gasoline vehicle at $3.60/gallon.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">Annual Mileage</th>
                  <th scope="col" className="p-3 font-bold text-emerald-700 dark:text-emerald-400">EV Annual Cost</th>
                  <th scope="col" className="p-3 font-bold text-amber-700 dark:text-amber-400">Gas Annual Cost</th>
                  <th scope="col" className="p-3 font-bold text-[#1a3c5e] dark:text-blue-400">Annual Net Savings</th>
                  <th scope="col" className="p-3 font-bold text-gray-900 dark:text-white">5-Year Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr>
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">10,000 miles/yr</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(tenK.evAnnualCost, 0)} ({formatCurrency(tenK.evCostPerMile, 3)}/mi)</td>
                  <td className="p-3 font-mono text-amber-600 dark:text-amber-400">{formatCurrency(tenK.gasAnnualCost, 0)} ({formatCurrency(tenK.gasCostPerMile, 3)}/mi)</td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(tenK.annualSavings, 0)} ({formatPercent(tenK.savingsPercent)})</td>
                  <td className="p-3 font-mono text-gray-900 dark:text-white font-bold">{formatCurrency(tenK.fiveYearSavings, 0)}</td>
                </tr>
                <tr className="bg-orange-50/30 dark:bg-orange-950/10">
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">12,000 miles/yr (Default)</td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(baseline.evAnnualCost, 0)} ({formatCurrency(baseline.evCostPerMile, 3)}/mi)</td>
                  <td className="p-3 font-mono text-amber-600 dark:text-amber-400">{formatCurrency(baseline.gasAnnualCost, 0)} ({formatCurrency(baseline.gasCostPerMile, 3)}/mi)</td>
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(baseline.annualSavings, 0)} ({formatPercent(baseline.savingsPercent)})</td>
                  <td className="p-3 font-mono text-gray-900 dark:text-white font-bold">{formatCurrency(baseline.fiveYearSavings, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
            *Estimates reflect direct fuel and electricity charging costs. Excludes insurance, registration, maintenance, vehicle depreciation, financing charges, and charging equipment installation.
          </p>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">{cta.title}</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              {cta.subtitle}
            </p>
          </div>
          <Link
            href={`${prefix}/tools/ev-cost-calculator`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f97316] text-white text-xs sm:text-sm font-bold hover:bg-[#ea580c] transition-colors"
          >
            {cta.button}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Educational Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Related Financial Tools */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Related Financial Tools &amp; Resources
          </h2>
          <div className="flex flex-wrap gap-3">
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
            <Link
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/unit-converter`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Unit Converter
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
