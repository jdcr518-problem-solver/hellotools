import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { CI_SCENARIOS_SECTION_I18N } from '@/data/compound-interest-scenarios-data';

interface CompoundInterestScenariosHubViewProps {
  locale?: Locale;
}

export default function CompoundInterestScenariosHubView({ locale = DEFAULT_LOCALE }: CompoundInterestScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('compound-interest-calculator', locale);
  const tData = CI_SCENARIOS_SECTION_I18N[locale] || CI_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Compound Interest Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/compound-interest-calculator/scenarios/ci-growth-over-time`,
      title: tData.cards.growthOverTime.title,
      description: tData.cards.growthOverTime.description,
      badge: tData.cards.growthOverTime.badge,
    },
    {
      href: `${prefix}/tools/compound-interest-calculator/scenarios/ci-compounding-frequency`,
      title: tData.cards.compoundingFrequency.title,
      description: tData.cards.compoundingFrequency.description,
      badge: tData.cards.compoundingFrequency.badge,
    },
    {
      href: `${prefix}/tools/compound-interest-calculator/scenarios/ci-inflation-adjusted-returns`,
      title: tData.cards.inflationAdjusted.title,
      description: tData.cards.inflationAdjusted.description,
      badge: tData.cards.inflationAdjusted.badge,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate your own compound growth?',
      subtitle: 'Use the free Compound Interest Calculator to enter your own principal, rate, duration, and compounding frequency.',
      button: 'Open Compound Interest Calculator',
    },
    es: {
      title: '¿Listo para simular tu propio interés compuesto?',
      subtitle: 'Usa la calculadora gratuita para indicar tu capital, tasa, plazo y frecuencia de capitalización.',
      button: 'Abrir Calculadora de Interés Compuesto',
    },
    de: {
      title: 'Bereit, Ihr eigenes Zinseszinswachstum zu berechnen?',
      subtitle: 'Nutzen Sie den kostenlosen Rechner für Ihr Startkapital, Zinssatz, Laufzeit und Zinsperiode.',
      button: 'Zinseszinsrechner öffnen',
    },
    fr: {
      title: 'Prêt à calculer votre propre croissance par intérêts composés ?',
      subtitle: 'Utilisez le simulateur gratuit en renseignant votre capital, taux, durée et fréquence de capitalisation.',
      button: "Ouvrir le Calculateur d'Intérêts Composés",
    },
    pt: {
      title: 'Pronto para simular seu próprio crescimento com juros compostos?',
      subtitle: 'Use a calculadora gratuita para informar o capital, taxa, prazo e frequência de capitalização.',
      button: 'Abrir Calculadora de Juros Compostos',
    },
    ja: {
      title: 'ご自身の複利成長を試算してみませんか？',
      subtitle: '無料の複利計算ツールで、元本・金利・期間・複利頻度を入力してすぐに試算できます。',
      button: '複利計算ツールを開く',
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
        <Link href={`${prefix}/tools/compound-interest-calculator`} className="hover:text-gray-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          {locale === 'en' ? 'Scenarios' : tData.heading}
        </span>
      </nav>

      {/* Top Ad banner */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Page header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <LayoutList className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {tData.heading}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            {tData.intro}
          </p>
        </div>
      </div>

      {/* Scenario cards */}
      <div className="space-y-4 mb-12">
        {scenarios.map((scenario) => (
          <Link
            key={scenario.href}
            href={scenario.href}
            className="group flex items-start justify-between gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-md transition-all duration-200"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#f97316] bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 px-2 py-0.5 rounded-full">
                  {scenario.badge}
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors leading-snug">
                {scenario.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                {scenario.description}
              </p>
            </div>
            <ChevronRight
              className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-[#f97316] group-hover:translate-x-1 transition-all mt-1"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      {/* Back to Calculator CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {cta.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {cta.subtitle}
          </p>
        </div>
        <Link
          href={`${prefix}/tools/compound-interest-calculator`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          {cta.button}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
