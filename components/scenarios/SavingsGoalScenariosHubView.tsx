import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, Target, Clock, TrendingUp } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { SAVINGS_GOAL_SCENARIOS_SECTION_I18N } from '@/data/savings-goal-scenarios-data';

interface SavingsGoalScenariosHubViewProps {
  locale?: Locale;
}

export default function SavingsGoalScenariosHubView({ locale = DEFAULT_LOCALE }: SavingsGoalScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('savings-goal-calculator', locale);
  const tData = SAVINGS_GOAL_SCENARIOS_SECTION_I18N[locale] || SAVINGS_GOAL_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Savings Goal Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/savings-goal-calculator/scenarios/how-much-to-save-each-month`,
      title: tData.cards.monthlyDeposit.title,
      description: tData.cards.monthlyDeposit.description,
      badge: tData.cards.monthlyDeposit.badge,
      icon: Target,
    },
    {
      href: `${prefix}/tools/savings-goal-calculator/scenarios/how-long-to-reach-savings-goal`,
      title: tData.cards.timeline.title,
      description: tData.cards.timeline.description,
      badge: tData.cards.timeline.badge,
      icon: Clock,
    },
    {
      href: `${prefix}/tools/savings-goal-calculator/scenarios/how-inflation-affects-savings-goal`,
      title: tData.cards.inflation.title,
      description: tData.cards.inflation.description,
      badge: tData.cards.inflation.badge,
      icon: TrendingUp,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to map out your own savings goal?',
      subtitle: 'Use the free Savings Goal Calculator to enter your custom target, starting balance, timeline, or monthly contribution.',
      button: 'Open Savings Goal Calculator',
    },
    es: {
      title: '¿Listo para planificar tu propia meta de ahorro?',
      subtitle: 'Usa la calculadora gratuita para ingresar tu meta personalizada, ahorro actual, plazo o aporte mensual.',
      button: 'Abrir Calculadora de Meta de Ahorro',
    },
    de: {
      title: 'Bereit, Ihr persönliches Sparziel zu berechnen?',
      subtitle: 'Nutzen Sie den kostenlosen Sparzielrechner für Ihr individuelles Ziel, Startkapital, Laufzeit oder Monatsrate.',
      button: 'Sparzielrechner öffnen',
    },
    fr: {
      title: 'Prêt à planifier votre propre objectif d\'épargne ?',
      subtitle: 'Utilisez le simulateur gratuit en renseignant votre objectif, capital de départ, durée ou versement mensuel.',
      button: 'Ouvrir le Calculateur d\'Objectif d\'Épargne',
    },
    pt: {
      title: 'Pronto para planejar sua meta de poupança?',
      subtitle: 'Use a calculadora gratuita para informar sua meta personalizada, saldo inicial, prazo ou aporte mensal.',
      button: 'Abrir Calculadora de Meta de Poupança',
    },
    ja: {
      title: 'ご自身の目標貯金をシミュレーションしてみませんか？',
      subtitle: '無料の目標貯金計算機で、目標額・初期貯蓄・希望期間または毎月の積立額を入力してすぐに試算できます。',
      button: '目標貯金計算ツールを開く',
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
        <Link href={`${prefix}/tools/savings-goal-calculator`} className="hover:text-gray-950 dark:hover:text-white">
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
          href={`${prefix}/tools/savings-goal-calculator`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors shrink-0"
        >
          {cta.button}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
