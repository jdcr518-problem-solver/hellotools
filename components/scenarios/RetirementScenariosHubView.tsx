import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, DollarSign, Clock, TrendingDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { RETIREMENT_SCENARIOS_SECTION_I18N } from '@/data/retirement-scenarios-data';

interface RetirementScenariosHubViewProps {
  locale?: Locale;
}

export default function RetirementScenariosHubView({ locale = DEFAULT_LOCALE }: RetirementScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('retirement-calculator', locale);
  const tData = RETIREMENT_SCENARIOS_SECTION_I18N[locale] || RETIREMENT_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Retirement Savings Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/retirement-calculator/scenarios/how-much-to-save-for-retirement`,
      title: tData.cards.nestedEgg.title,
      description: tData.cards.nestedEgg.description,
      badge: tData.cards.nestedEgg.badge,
      icon: DollarSign,
    },
    {
      href: `${prefix}/tools/retirement-calculator/scenarios/how-much-to-save-each-month-for-retirement`,
      title: tData.cards.monthlyContribution.title,
      description: tData.cards.monthlyContribution.description,
      badge: tData.cards.monthlyContribution.badge,
      icon: Clock,
    },
    {
      href: `${prefix}/tools/retirement-calculator/scenarios/how-inflation-affects-retirement-savings`,
      title: tData.cards.inflation.title,
      description: tData.cards.inflation.description,
      badge: tData.cards.inflation.badge,
      icon: TrendingDown,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to project your own retirement savings?',
      subtitle:
        'Use the free Retirement Savings Calculator to enter your current age, retirement age, existing savings balance, monthly contribution, and expected return rate.',
      button: 'Open Retirement Savings Calculator',
    },
    es: {
      title: '¿Listo para proyectar tu ahorro para la jubilación?',
      subtitle:
        'Usa la calculadora gratuita para ingresar tu edad actual, edad de jubilación, saldo actual, aportación mensual y tasa de rendimiento esperada.',
      button: 'Abrir Calculadora de Ahorro para Jubilación',
    },
    de: {
      title: 'Bereit, Ihr Rentenvermögen zu berechnen?',
      subtitle:
        'Nutzen Sie den kostenlosen Altersvorsorgerechner für Ihr Einstiegsalter, Rentenalter, aktuelles Guthaben, monatliche Sparrate und erwartete Rendite.',
      button: 'Altersvorsorgerechner öffnen',
    },
    fr: {
      title: 'Prêt à projeter votre épargne retraite ?',
      subtitle:
        'Utilisez le simulateur gratuit en renseignant votre âge actuel, âge de départ à la retraite, solde d\'épargne, versement mensuel et taux de rendement attendu.',
      button: 'Ouvrir le Calculateur d\'Épargne Retraite',
    },
    pt: {
      title: 'Pronto para projetar sua poupança para aposentadoria?',
      subtitle:
        'Use a calculadora gratuita para informar sua idade atual, idade de aposentadoria, saldo existente, aporte mensal e taxa de retorno esperada.',
      button: 'Abrir Calculadora de Poupança para Aposentadoria',
    },
    ja: {
      title: 'ご自身の老後の貯蓄をシミュレーションしてみませんか？',
      subtitle:
        '無料の老後の貯蓄計算ツールで、現在の年齢・定年年齢・現在の貯蓄額・毎月の積立額・期待年利を入力してすぐに試算できます。',
      button: '老後の貯蓄計算ツールを開く',
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
        <Link href={`${prefix}/tools/retirement-calculator`} className="hover:text-gray-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Scenarios
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

      {/* Scenario cards */}
      <div className="grid grid-cols-1 gap-5 mb-10">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <Link
              key={scenario.href}
              href={scenario.href}
              className="group block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-[#f97316] shrink-0 group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#f97316] mb-1">
                      {scenario.badge}
                    </span>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors leading-snug">
                      {scenario.title}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-[#f97316] group-hover:translate-x-1 transition-all mt-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/40 dark:bg-blue-950/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">
            {cta.title}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
            {cta.subtitle}
          </p>
        </div>
        <Link
          href={`${prefix}/tools/retirement-calculator`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors shrink-0"
        >
          {cta.button}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
