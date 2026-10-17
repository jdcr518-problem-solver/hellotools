import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, Briefcase, Percent, Clock, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { FOUR_OH_ONE_K_SCENARIOS_SECTION_I18N } from '@/data/401k-scenarios-data';

interface FourOhOneKScenariosHubViewProps {
  locale?: Locale;
}

export default function FourOhOneKScenariosHubView({
  locale = DEFAULT_LOCALE,
}: FourOhOneKScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('401k-calculator', locale);
  const tData =
    FOUR_OH_ONE_K_SCENARIOS_SECTION_I18N[locale] || FOUR_OH_ONE_K_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || '401(k) Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/401k-calculator/scenarios/how-employer-match-affects-401k-growth`,
      title: tData.cards.employerMatch.title,
      description: tData.cards.employerMatch.description,
      badge: tData.cards.employerMatch.badge,
      icon: Briefcase,
    },
    {
      href: `${prefix}/tools/401k-calculator/scenarios/how-contribution-rate-changes-projected-balance`,
      title: tData.cards.contributionRate.title,
      description: tData.cards.contributionRate.description,
      badge: tData.cards.contributionRate.badge,
      icon: Percent,
    },
    {
      href: `${prefix}/tools/401k-calculator/scenarios/how-time-and-growth-affect-401k`,
      title: tData.cards.timeAndGrowth.title,
      description: tData.cards.timeAndGrowth.description,
      badge: tData.cards.timeAndGrowth.badge,
      icon: Clock,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to project your personal 401(k) retirement balance?',
      subtitle:
        'Use the free 401(k) Calculator to test your specific salary, current balance, elective contribution percentage, employer match rules, and target retirement age.',
      button: 'Open 401(k) Calculator',
    },
    es: {
      title: '¿Listo para calcular su saldo de jubilación 401(k)?',
      subtitle:
        'Utilice la Calculadora de 401(k) gratuita para ingresar su salario, porcentaje de ahorro, contrapartida de la empresa y edad estimada de jubilación.',
      button: 'Abrir Calculadora de 401(k)',
    },
    de: {
      title: 'Bereit, Ihr persönliches 401(k)-Altersguthaben zu berechnen?',
      subtitle:
        'Nutzen Sie den kostenlosen 401(k)-Rechner mit Ihrem Gehalt, Sparquote, Firmenzuschuss und geplantem Rentenalter.',
      button: '401(k)-Rechner öffnen',
    },
    fr: {
      title: 'Prêt à simuler votre capital retraite 401(k) ?',
      subtitle:
        'Utilisez le simulateur 401(k) gratuit pour évaluer vos cotisations salariales, l’abondement patronal et le capital final à l’âge de la retraite.',
      button: 'Ouvrir le Simulateur 401(k)',
    },
    pt: {
      title: 'Pronto para calcular seu saldo de aposentadoria 401(k)?',
      subtitle:
        'Use a Calculadora 401(k) gratuita para simular seu salário, percentual de contribuição, contrapartida da empresa e idade de aposentadoria.',
      button: 'Abrir Calculadora 401(k)',
    },
    ja: {
      title: '401(k)の将来資産額をシミュレーションしてみませんか？',
      subtitle:
        '無料の401(k)計算機を使って、現在の年収、拠出割合、企業マッチング条件、目標退職年齢に応じた受取総額を試算できます。',
      button: '401(k)計算機を開く',
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
        <Link href={`${prefix}/tools/401k-calculator`} className="hover:text-gray-950 dark:hover:text-white">
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
            401(k) Calculator Scenarios and Practical Examples
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Explore worked examples and comparative analyses demonstrating how employer matching formulas, elective contribution rates, compounding horizons, and annual return assumptions shape your retirement balance.
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

      {/* Contextual Guide: Understanding 401(k) Calculations */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          How 401(k) Retirement Projections Work
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A defined-contribution 401(k) plan builds wealth through three compounding drivers: regular employee payroll deductions, company matching contributions, and long-term investment growth. Our scenarios model these variables using the exact mathematical engine of our 401(k) Calculator:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Elective Deferral Cap:</strong> Employee contributions are subject to statutory annual limits ($24,500 for the 2026 tax year).</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Employer Matching Formula:</strong> Matches are modeled as a percentage of salary matched up to a specified percentage cap (e.g., 50% match up to 6% of pay).</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Beginning-of-Year Compounding:</strong> Contributions occur throughout the year and are assumed to compound alongside the annual investment return rate.</span>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
            <span className="font-bold text-[#f97316] shrink-0">•</span>
            <span><strong>Nominal Pre-Tax Values:</strong> Projections represent pre-tax, nominal account balances before future retirement distributions, taxes, or inflation erosion.</span>
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
          href={`${prefix}/tools/401k-calculator`}
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
            href={`${prefix}/tools/401k-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            401(k) Calculator
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
            href={`${prefix}/tools/salary-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Salary Calculator
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/tax-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Tax Calculator
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
