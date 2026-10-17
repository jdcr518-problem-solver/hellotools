import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, Scale, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { NET_WORTH_SCENARIOS_SECTION_I18N } from '@/data/net-worth-scenarios-data';

interface NetWorthScenariosHubViewProps {
  locale?: Locale;
}

export default function NetWorthScenariosHubView({
  locale = DEFAULT_LOCALE,
}: NetWorthScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('net-worth-calculator', locale);
  const tData =
    NET_WORTH_SCENARIOS_SECTION_I18N[locale] || NET_WORTH_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Net Worth Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/net-worth-calculator/scenarios/how-to-calculate-net-worth`,
      title: tData.cards.calculateNetWorth.title,
      description: tData.cards.calculateNetWorth.description,
      badge: tData.cards.calculateNetWorth.badge,
      icon: Scale,
    },
    {
      href: `${prefix}/tools/net-worth-calculator/scenarios/how-debt-affects-net-worth`,
      title: tData.cards.debtImpact.title,
      description: tData.cards.debtImpact.description,
      badge: tData.cards.debtImpact.badge,
      icon: CreditCard,
    },
    {
      href: `${prefix}/tools/net-worth-calculator/scenarios/how-savings-and-investments-affect-net-worth`,
      title: tData.cards.savingsAndInvestments.title,
      description: tData.cards.savingsAndInvestments.description,
      badge: tData.cards.savingsAndInvestments.badge,
      icon: TrendingUp,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate your personal net worth snapshot?',
      subtitle:
        'Use our free, private Net Worth Calculator to enter your exact bank balances, investments, real estate, vehicles, and debt balances for an instant breakdown.',
      button: 'Open Net Worth Calculator',
    },
    es: {
      title: '¿Listo para calcular su patrimonio neto personal?',
      subtitle:
        'Utilice nuestra Calculadora de Patrimonio Neto gratuita para ingresar sus activos, ahorros y deudas con total privacidad.',
      button: 'Abrir Calculadora de Patrimonio Neto',
    },
    de: {
      title: 'Bereit, Ihr persönliches Nettovermögen zu ermitteln?',
      subtitle:
        'Nutzen Sie unseren kostenlosen, sicheren Nettovermögen-Rechner für eine präzise Aufschlüsselung von Guthaben, Immobilien und Krediten.',
      button: 'Nettovermögen-Rechner öffnen',
    },
    fr: {
      title: 'Prêt à calculer votre valeur nette personnelle ?',
      subtitle:
        'Utilisez notre simulateur gratuit et confidentiel pour évaluer vos actifs, vos placements et vos passifs en temps réel.',
      button: 'Ouvrir le Simulateur de Valeur Nette',
    },
    pt: {
      title: 'Pronto para calcular seu patrimônio líquido pessoal?',
      subtitle:
        'Utilize nossa Calculadora de Patrimônio Líquido gratuita para somar seus bens e subtrair suas dívidas com total privacidade.',
      button: 'Abrir Calculadora de Patrimônio Líquido',
    },
    ja: {
      title: '個人の純資産スナップショットを計算してみませんか？',
      subtitle:
        '無料かつ安全な純資産計算機を使って、手元資金、投資口座、不動産、負債残高を整理し、現在の純資産を即座に算出できます。',
      button: '純資産計算機を開く',
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
        <Link href={`${prefix}/tools/net-worth-calculator`} className="hover:text-gray-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">Scenarios</span>
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
            Net Worth Calculator Scenarios and Practical Examples
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Explore practical worked scenarios and comparative profiles demonstrating how asset categories, debt obligations, savings additions, and liabilities shape your personal balance sheet and debt ratio.
          </p>
        </div>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {scenarios.map((scenario) => {
          const IconComponent = scenario.icon;
          return (
            <Link
              key={scenario.href}
              href={scenario.href}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-[#f97316] dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/50">
                    {scenario.badge}
                  </span>
                  <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-[#f97316] transition-colors" aria-hidden="true" />
                </div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors leading-snug mb-2">
                  {scenario.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              <div className="mt-5 flex items-center text-xs font-bold text-[#1a3c5e] dark:text-blue-400 group-hover:text-[#f97316] dark:group-hover:text-[#f97316] transition-colors">
                <span>View Scenario &amp; Analysis</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Contextual Guide: Understanding Net Worth Calculations */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          How Personal Net Worth Calculations Work
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Personal net worth is the fundamental snapshot metric of your overall financial standing at any single point in time. It measures the net value that remains after every outstanding obligation is subtracted from every asset you own:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Supported Asset Categories:</strong> Cash &amp; bank balances, investment portfolios, real estate property values, vehicle resale values, retirement accounts (401k/IRA), and other valuables.</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Supported Liability Categories:</strong> Mortgage balances, student loan debt, credit card balances, car loans, and miscellaneous personal debts or outstanding bills.</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Point-in-Time Snapshot:</strong> Net worth represents an unadjusted, static point-in-time calculation. It does not project speculative future investment returns, inflation discounting, or amortization schedules.</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Debt-to-Asset Ratio:</strong> Measures total liabilities as a percentage of total assets (capped at 100%), highlighting your leverage ratio and equity cushion.</span>
          </li>
        </ul>
      </div>

      {/* Interactive Tool CTA */}
      <div className="rounded-2xl border border-orange-200 dark:border-orange-800 bg-orange-50/40 dark:bg-orange-950/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            {cta.title}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            {cta.subtitle}
          </p>
        </div>
        <Link
          href={`${prefix}/tools/net-worth-calculator`}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition-colors"
        >
          {cta.button}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* YMYL Educational Disclaimer */}
      <DisclaimerBox type="finance" />

      {/* Related Tools Links */}
      <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-5">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          Explore Related Financial Calculators
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`${prefix}/tools/net-worth-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            Net Worth Calculator
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/retirement-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Retirement Savings Calculator
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
            href={`${prefix}/tools/compound-interest-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Compound Interest Calculator
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/mortgage-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Mortgage Calculator
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/inflation-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Inflation Calculator
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
  );
}
