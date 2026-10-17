import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, Wallet, Calendar, PiggyBank, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { SALARY_SCENARIOS_SECTION_I18N } from '@/data/salary-scenarios-data';

interface SalaryScenariosHubViewProps {
  locale?: Locale;
}

export default function SalaryScenariosHubView({
  locale = DEFAULT_LOCALE,
}: SalaryScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('salary-calculator', locale);
  const tData = SALARY_SCENARIOS_SECTION_I18N[locale] || SALARY_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Salary Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/salary-calculator/scenarios/gross-salary-vs-take-home-salary`,
      title: tData.cards.grossVsTakeHome.title,
      description: tData.cards.grossVsTakeHome.description,
      badge: tData.cards.grossVsTakeHome.badge,
      icon: Wallet,
    },
    {
      href: `${prefix}/tools/salary-calculator/scenarios/monthly-vs-annual-salary-conversion`,
      title: tData.cards.monthlyVsAnnual.title,
      description: tData.cards.monthlyVsAnnual.description,
      badge: tData.cards.monthlyVsAnnual.badge,
      icon: Calendar,
    },
    {
      href: `${prefix}/tools/salary-calculator/scenarios/how-much-should-i-save-from-salary`,
      title: tData.cards.howMuchToSave.title,
      description: tData.cards.howMuchToSave.description,
      badge: tData.cards.howMuchToSave.badge,
      icon: PiggyBank,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to convert your salary or wage?',
      subtitle:
        'Use the free Salary Calculator to input your exact wage amount, pay frequency (yearly, monthly, weekly, or hourly), and work hours per week to calculate your complete income breakdown.',
      button: 'Open Salary Calculator',
    },
    es: {
      title: '¿Listo para calcular y convertir su salario?',
      subtitle:
        'Utilice la Calculadora de Salario gratuita para ingresar su sueldo, período de cobro y horas de trabajo semanales para ver el desglose completo.',
      button: 'Abrir Calculadora de Salario',
    },
    de: {
      title: 'Bereit, Ihr Gehalt präzise umzurechnen?',
      subtitle:
        'Nutzen Sie den kostenlosen Gehaltsrechner mit Betrag, Auszahlungsintervall und Wochenarbeitszeit für eine lückenlose Einkommensübersicht.',
      button: 'Gehaltsrechner öffnen',
    },
    fr: {
      title: 'Prêt à convertir votre salaire avec précision ?',
      subtitle:
        'Utilisez le simulateur de salaire gratuit pour saisir votre rémunération, fréquence de paie et heures hebdomadaires pour obtenir une ventilation exhaustive.',
      button: 'Ouvrir le Calculateur de Salaire',
    },
    pt: {
      title: 'Pronto para converter e analisar seu salário?',
      subtitle:
        'Use a Calculadora de Salário gratuita para inserir sua remuneração, período de pagamento e horas semanais para conferir o demonstrativo integral.',
      button: 'Abrir Calculadora de Salário',
    },
    ja: {
      title: '給与や時給の換算を計算してみませんか？',
      subtitle:
        '無料の給与計算機で支給額、支払頻度（年給・月給・週給・時給）、週あたりの労働時間を入力し、全期間の給与内訳をご確認いただけます。',
      button: '給与計算機を開く',
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
        <Link href={`${prefix}/tools/salary-calculator`} className="hover:text-gray-950 dark:hover:text-white">
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

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                  <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#f97316]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                    {scenario.badge}
                  </span>
                </div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors mb-2 leading-snug">
                  {scenario.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {scenario.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-[#1a3c5e] dark:text-blue-400 group-hover:text-[#f97316] dark:group-hover:text-[#f97316] transition-colors">
                <span>Explore scenario</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Calculator CTA Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-slate-50 to-orange-50/30 dark:from-gray-900 dark:to-orange-950/10 p-6 sm:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {cta.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-2xl">
          {cta.subtitle}
        </p>
        <Link
          href={`${prefix}/tools/salary-calculator`}
          className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          {cta.button}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Educational Disclaimer */}
      <div className="mb-8">
        <DisclaimerBox type="finance" />
      </div>

      {/* Related Financial Calculators */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 p-6 space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          Related Financial Calculators
        </h3>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href={`${prefix}/tools/tax-calculator`}
            className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            Tax Calculator
          </Link>
          <Link
            href={`${prefix}/tools/savings-goal-calculator`}
            className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            Savings Goal Calculator
          </Link>
          <Link
            href={`${prefix}/tools/compound-interest-calculator`}
            className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            Compound Interest Calculator
          </Link>
          <Link
            href={`${prefix}/tools/retirement-calculator`}
            className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            Retirement Savings Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
