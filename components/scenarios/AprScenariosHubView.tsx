import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, Percent, DollarSign, Scale } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { APR_SCENARIOS_SECTION_I18N } from '@/data/apr-scenarios-data';

interface AprScenariosHubViewProps {
  locale?: Locale;
}

export default function AprScenariosHubView({
  locale = DEFAULT_LOCALE,
}: AprScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('apr-calculator', locale);
  const tData = APR_SCENARIOS_SECTION_I18N[locale] || APR_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'APR Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/apr-calculator/scenarios/apr-vs-interest-rate-difference`,
      title: tData.cards.aprVsInterestRate.title,
      description: tData.cards.aprVsInterestRate.description,
      badge: tData.cards.aprVsInterestRate.badge,
      icon: Percent,
    },
    {
      href: `${prefix}/tools/apr-calculator/scenarios/how-fees-affect-loan-apr`,
      title: tData.cards.feesImpact.title,
      description: tData.cards.feesImpact.description,
      badge: tData.cards.feesImpact.badge,
      icon: DollarSign,
    },
    {
      href: `${prefix}/tools/apr-calculator/scenarios/comparing-two-loans-using-apr`,
      title: tData.cards.comparingLoans.title,
      description: tData.cards.comparingLoans.description,
      badge: tData.cards.comparingLoans.badge,
      icon: Scale,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate the APR on your loan offer?',
      subtitle:
        'Use the free APR Calculator to input your exact loan amount, stated interest rate, term in months, and upfront fees to determine your estimated APR and total borrowing cost.',
      button: 'Open APR Calculator',
    },
    es: {
      title: '¿Listo para calcular el APR de su oferta de préstamo?',
      subtitle:
        'Utilice la calculadora gratuita de APR para ingresar su monto, tasa de interés, plazo y comisiones para conocer su costo financiero real.',
      button: 'Abrir Calculadora de APR',
    },
    de: {
      title: 'Bereit, den effektiven Jahreszins Ihres Kredits zu berechnen?',
      subtitle:
        'Nutzen Sie den kostenlosen APR-Rechner mit Kreditsumme, Sollzins, Laufzeit und Vorabgebühren zur Bestimmung der Gesamtkosten.',
      button: 'APR-Rechner öffnen',
    },
    fr: {
      title: 'Prêt à calculer le TAEG / APR de votre offre de prêt ?',
      subtitle:
        'Utilisez le simulateur gratuit en renseignant le montant, le taux nominal, la durée et les frais pour évaluer le coût annuel effectif.',
      button: 'Ouvrir le Simulateur APR',
    },
    pt: {
      title: 'Pronto para calcular o APR do seu financiamento?',
      subtitle:
        'Use a calculadora gratuita de APR para inserir o valor financiado, taxa de juros, prazo e tarifas iniciais para descobrir o custo efetivo real.',
      button: 'Abrir Calculadora de APR',
    },
    ja: {
      title: 'ご検討中のローンの実質年率（APR）を試算してみませんか？',
      subtitle:
        '無料のAPR計算機で借入金額、表面金利、返済月数、借入諸費用を入力し、真の実質年率と支払利息総額をご確認いただけます。',
      button: 'APR計算機を開く',
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
        <Link href={`${prefix}/tools/apr-calculator`} className="hover:text-gray-950 dark:hover:text-white">
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
          href={`${prefix}/tools/apr-calculator`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors shrink-0"
        >
          {cta.button}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
