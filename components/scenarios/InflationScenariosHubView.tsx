import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, TrendingDown, TrendingUp, Target, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { INFLATION_SCENARIOS_SECTION_I18N } from '@/data/inflation-scenarios-data';

interface InflationScenariosHubViewProps {
  locale?: Locale;
}

export default function InflationScenariosHubView({
  locale = DEFAULT_LOCALE,
}: InflationScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('inflation-calculator', locale);
  const tData = INFLATION_SCENARIOS_SECTION_I18N[locale] || INFLATION_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Inflation Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/inflation-calculator/scenarios/how-inflation-reduces-purchasing-power`,
      title: tData.cards.purchasingPower.title,
      description: tData.cards.purchasingPower.description,
      badge: tData.cards.purchasingPower.badge,
      icon: TrendingDown,
    },
    {
      href: `${prefix}/tools/inflation-calculator/scenarios/how-much-will-prices-rise-over-time`,
      title: tData.cards.priceRise.title,
      description: tData.cards.priceRise.description,
      badge: tData.cards.priceRise.badge,
      icon: TrendingUp,
    },
    {
      href: `${prefix}/tools/inflation-calculator/scenarios/inflation-adjusted-savings-goal`,
      title: tData.cards.savingsGoal.title,
      description: tData.cards.savingsGoal.description,
      badge: tData.cards.savingsGoal.badge,
      icon: Target,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate your own inflation projections?',
      subtitle:
        'Use the free Inflation Calculator to explore historical purchasing power changes using official U.S. BLS CPI-U data or project future costs using your custom annual inflation rate assumption.',
      button: 'Open Inflation Calculator',
    },
    es: {
      title: '¿Listo para calcular sus propias proyecciones de inflación?',
      subtitle:
        'Utilice la Calculadora de Inflación gratuita para ver cambios históricos de poder adquisitivo con datos oficiales de CPI-U o proyecte costos futuros con su tasa estimada.',
      button: 'Abrir Calculadora de Inflación',
    },
    de: {
      title: 'Bereit, Ihre eigenen Inflationsszenarien zu berechnen?',
      subtitle:
        'Nutzen Sie den kostenlosen Inflationsrechner, um historische Kaufkraftänderungen anhand von CPI-U-Daten zu prüfen oder Zukunftskosten mit Ihrer Inflationsannahme zu berechnen.',
      button: 'Inflationsrechner öffnen',
    },
    fr: {
      title: 'Prêt à calculer vos propres projections d’inflation ?',
      subtitle:
        'Utilisez le simulateur d’inflation gratuit pour analyser l’évolution historique du pouvoir d’achat ou projeter vos coûts futurs selon un taux annuel personnalisé.',
      button: 'Ouvrir le Simulateur d’Inflation',
    },
    pt: {
      title: 'Pronto para calcular suas projeções de inflação?',
      subtitle:
        'Use a Calculadora de Inflação gratuita para comparar o poder de compra histórico ou projetar custos futuros com base em taxas anuais personalizadas.',
      button: 'Abrir Calculadora de Inflação',
    },
    ja: {
      title: '独自のインフレ予測を計算してみませんか？',
      subtitle:
        '無料のインフレ計算機を使って、米労働統計局（BLS）の公式CPIデータに基づく過去の購買力推移や、指定した年間インフレ率による将来コストの試算を行えます。',
      button: 'インフレ計算機を開く',
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
        <Link href={`${prefix}/tools/inflation-calculator`} className="hover:text-gray-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold">Scenarios</span>
      </nav>

      {/* Top Banner Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Hub Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <LayoutList className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Inflation Calculator Scenarios and Practical Examples
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {tData.intro}
          </p>
        </div>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <Link
              key={scenario.href}
              href={scenario.href}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-50 dark:bg-orange-950/40 text-[#f97316] border border-orange-200 dark:border-orange-800">
                    {scenario.badge}
                  </span>
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-[#f97316] transition-colors" aria-hidden="true" />
                </div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors leading-snug mb-2">
                  {scenario.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 group-hover:text-[#f97316] dark:group-hover:text-[#f97316] transition-colors">
                <span>Explore Scenario</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Educational Guide Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          How Inflation Projections and Purchasing Power Work
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Inflation represents the broad increase in prices and corresponding decline in the purchasing power of money over time. The HelloTools Inflation Calculator models these effects through two distinct, mathematically sound perspectives:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Equivalent Future Cost
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Answers: <em>&ldquo;How many dollars will I need in the future to buy what costs $X today?&rdquo;</em> Calculated using compound growth: <code>Cost = Amount × (1 + r)^t</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Future Purchasing Power
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Answers: <em>&ldquo;What will a fixed nominal sum of $X buy in future years?&rdquo;</em> Calculated by discounting nominal money: <code>Purchasing Power = Amount / (1 + r)^t</code>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-1.5">
            Key Modeling Assumptions &amp; Scope
          </h3>
          <p className="text-xs text-blue-800 dark:text-blue-200/80 leading-relaxed">
            All calculations assume a constant annual inflation rate compounded annually. Projections are mathematical estimates for educational planning; they do not predict future economic cycles, variable CPI fluctuations, taxes, or investment yields.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold">{cta.title}</h2>
          <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            {cta.subtitle}
          </p>
        </div>
        <Link
          href={`${prefix}/tools/inflation-calculator`}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f97316] text-white text-xs sm:text-sm font-bold hover:bg-[#ea580c] transition-colors"
        >
          {cta.button}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Disclaimer */}
      <DisclaimerBox type="finance" />

      {/* Bottom Internal Links */}
      <div className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          Explore Related Financial Calculators
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${prefix}/tools/compound-interest-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Compound Interest Calculator
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
            href={`${prefix}/tools/retirement-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Retirement Savings Calculator
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/salary-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Salary Calculator
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
          <span>Related guide: </span>
          <Link
            href="/blog/how-much-will-401k-be-worth-at-65"
            className="text-[#f97316] hover:underline font-semibold"
          >
            How Much Will My 401(k) Be Worth at Age 65?
          </Link>
        </div>
      </div>
    </div>
  );
}
