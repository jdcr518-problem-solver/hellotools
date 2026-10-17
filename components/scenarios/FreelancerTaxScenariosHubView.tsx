import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, PiggyBank, Calculator, TrendingUp, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { FREELANCER_TAX_SCENARIOS_SECTION_I18N } from '@/data/freelancer-tax-scenarios-data';

interface FreelancerTaxScenariosHubViewProps {
  locale?: Locale;
}

export default function FreelancerTaxScenariosHubView({
  locale = DEFAULT_LOCALE,
}: FreelancerTaxScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('freelancer-tax-calculator', locale);
  const tData =
    FREELANCER_TAX_SCENARIOS_SECTION_I18N[locale] || FREELANCER_TAX_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Freelancer Quarterly Tax Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/freelancer-tax-calculator/scenarios/how-much-to-set-aside-from-each-payment`,
      title: tData.cards.setAsideReserve.title,
      description: tData.cards.setAsideReserve.description,
      badge: tData.cards.setAsideReserve.badge,
      icon: PiggyBank,
    },
    {
      href: `${prefix}/tools/freelancer-tax-calculator/scenarios/how-quarterly-estimated-payments-are-calculated`,
      title: tData.cards.calculationSteps.title,
      description: tData.cards.calculationSteps.description,
      badge: tData.cards.calculationSteps.badge,
      icon: Calculator,
    },
    {
      href: `${prefix}/tools/freelancer-tax-calculator/scenarios/how-income-changes-affect-quarterly-estimates`,
      title: tData.cards.incomeImpact.title,
      description: tData.cards.incomeImpact.description,
      badge: tData.cards.incomeImpact.badge,
      icon: TrendingUp,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate your quarterly estimated tax?',
      subtitle:
        'Use the free Freelancer Quarterly Tax Calculator to enter your projected 1099 annual gross revenue, business write-offs, tax year, filing status, and optional state tax rate to determine your 4 quarterly voucher amounts.',
      button: 'Open Freelancer Tax Calculator',
    },
    es: {
      title: '¿Listo para calcular su impuesto trimestral estimado?',
      subtitle:
        'Utilice la Calculadora de Impuestos para Freelancers gratuita para calcular sus 4 cupones trimestrales con sus ingresos 1099, gastos deducibles y estado civil fiscal.',
      button: 'Abrir Calculadora de Freelance',
    },
    de: {
      title: 'Bereit, Ihre geschätzten vierteljährlichen Steuern zu berechnen?',
      subtitle:
        'Nutzen Sie den kostenlosen Freiberufler-Steuerrechner, um Ihre 4 Quartalszahlungen anhand Ihrer Bruttoeinnahmen, Ausgaben und Abzüge zu berechnen.',
      button: 'Freiberufler-Steuerrechner öffnen',
    },
    fr: {
      title: 'Prêt à calculer vos acomptes provisionnels trimestriels ?',
      subtitle:
        'Utilisez le simulateur gratuit d’impôts pour freelances pour estimer vos 4 versements trimestriels à partir de vos revenus 1099 et charges déductibles.',
      button: 'Ouvrir le Simulateur Freelance',
    },
    pt: {
      title: 'Pronto para calcular seus tributos trimestrais estimados?',
      subtitle:
        'Use a Calculadora de Impostos para Freelancers gratuita para definir suas 4 parcelas trimestrais com base em receita bruta, despesas e dedução padrão.',
      button: 'Abrir Calculadora para Freelancers',
    },
    ja: {
      title: '四半期予定納税額をシミュレーションしてみませんか？',
      subtitle:
        '無料のフリーランス税金計算機で想定1099総収入、経費控除、申告区分を入力し、年4回の分割納税額を簡単に試算できます。',
      button: 'フリーランス税金計算機を開く',
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
        <Link href={`${prefix}/tools/freelancer-tax-calculator`} className="hover:text-gray-950 dark:hover:text-white">
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
            Freelancer Quarterly Tax Calculator Scenarios and Practical Examples
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
          How Freelancer Quarterly Tax Estimation Works
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Unlike traditional W-2 employees whose employers automatically withhold income and FICA payroll taxes each pay period, independent contractors (1099 freelancers) receive gross compensation and are responsible for paying their own taxes. The HelloTools Freelancer Quarterly Tax Calculator estimates these obligations across two core tax components:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              1. Self-Employment Tax (SE Tax)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Covers Social Security (12.4% on 92.35% of net profit up to the annual cap) and Medicare (2.9% uncapped, plus 0.9% for high earners). The IRS allows you to deduct 50% of this SE tax when calculating your federal taxable income base.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              2. Progressive Federal & State Income Tax
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculated on net business profit after subtracting both the 50% SE tax write-off and your filing status standard deduction. Progressive federal brackets (10% to 32%) plus optional state tax are applied to this taxable base.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-1.5">
            Model Assumptions & Exclusions
          </h3>
          <p className="text-xs text-blue-800 dark:text-blue-200/80 leading-relaxed">
            The calculator divides your estimated total annual tax burden into 4 equal quarterly voucher payments (traditionally due April 15, June 15, September 15, and January 15). It models federal progressive brackets, self-employment tax, standard deductions, and state tax rate presets. It excludes local city taxes, self-employed retirement plan contributions (SEP-IRA/Solo 401k), qualified business income (QBI) deductions, tax credits, and penalties.
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
          href={`${prefix}/tools/freelancer-tax-calculator`}
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
            href={`${prefix}/tools/tax-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Income Tax Calculator
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/salary-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Salary Calculator
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
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
          <span>Related guide: </span>
          <Link
            href="/blog/understanding-tax-brackets"
            className="text-[#f97316] hover:underline font-semibold"
          >
            Understanding Progressive Tax Brackets Simply
          </Link>
        </div>
      </div>
    </div>
  );
}
