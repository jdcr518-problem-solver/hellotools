import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { MORTGAGE_SCENARIOS_SECTION_I18N } from '@/data/mortgage-scenarios-data';

interface MortgageScenariosHubViewProps {
  locale?: Locale;
}

export default function MortgageScenariosHubView({ locale = DEFAULT_LOCALE }: MortgageScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('mortgage-calculator', locale);
  const tData = MORTGAGE_SCENARIOS_SECTION_I18N[locale] || MORTGAGE_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Mortgage Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/mortgage-calculator/scenarios/how-much-house-can-i-afford`,
      title: tData.cards.affordability.title,
      description: tData.cards.affordability.description,
      badge: tData.cards.affordability.badge,
      icon: DollarSign,
    },
    {
      href: `${prefix}/tools/mortgage-calculator/scenarios/15-year-vs-30-year-mortgage`,
      title: tData.cards.termComparison.title,
      description: tData.cards.termComparison.description,
      badge: tData.cards.termComparison.badge,
      icon: Clock,
    },
    {
      href: `${prefix}/tools/mortgage-calculator/scenarios/how-down-payment-affects-mortgage`,
      title: tData.cards.downPayment.title,
      description: tData.cards.downPayment.description,
      badge: tData.cards.downPayment.badge,
      icon: ShieldCheck,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate your own mortgage scenario?',
      subtitle: 'Use the free Mortgage Calculator to enter your custom home value, down payment, interest rate, term, property tax, and insurance.',
      button: 'Open Mortgage Calculator',
    },
    es: {
      title: '¿Listo para calcular su propio escenario de hipoteca?',
      subtitle: 'Use la calculadora gratuita de hipotecas para ingresar su valor de propiedad, pago inicial, tasa de interés, plazo e impuestos.',
      button: 'Abrir Calculadora de Hipotecas',
    },
    de: {
      title: 'Bereit, Ihre persönliche Hypothek zu berechnen?',
      subtitle: 'Nutzen Sie den kostenlosen Hypothekenrechner mit individuellen Werten für Kaufpreis, Eigenkapital, Zins und Laufzeit.',
      button: 'Hypothekenrechner öffnen',
    },
    fr: {
      title: 'Prêt à simuler votre propre prêt immobilier ?',
      subtitle: 'Utilisez le simulateur gratuit en indiquant votre prix d’achat, apport personnel, taux d’intérêt, durée et taxes.',
      button: 'Ouvrir le Simulateur de Prêt Immobilier',
    },
    pt: {
      title: 'Pronto para calcular seu próprio financiamento imobiliário?',
      subtitle: 'Use a calculadora gratuita para simular valor do imóvel, entrada, taxa de juros, prazo e seguros.',
      button: 'Abrir Calculadora de Hipoteca',
    },
    ja: {
      title: 'ご自身の住宅ローンをシミュレーションしてみませんか？',
      subtitle: '無料の住宅ローン計算ツールで、物件価格、頭金、金利、返済期間、固定資産税を入力して詳細な試算ができます。',
      button: '住宅ローン計算機を開く',
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
        <Link href={`${prefix}/tools/mortgage-calculator`} className="hover:text-gray-950 dark:hover:text-white">
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

      {/* YMYL Educational Disclaimer */}
      <div className="mb-10">
        <DisclaimerBox type="finance" compact />
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
          href={`${prefix}/tools/mortgage-calculator`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors shrink-0"
        >
          {cta.button}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
