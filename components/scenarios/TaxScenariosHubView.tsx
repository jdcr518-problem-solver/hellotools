import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, LayoutList, Layers, FileSpreadsheet, ShieldCheck, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { TAX_SCENARIOS_SECTION_I18N } from '@/data/tax-scenarios-data';

interface TaxScenariosHubViewProps {
  locale?: Locale;
}

export default function TaxScenariosHubView({
  locale = DEFAULT_LOCALE,
}: TaxScenariosHubViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('tax-calculator', locale);
  const tData = TAX_SCENARIOS_SECTION_I18N[locale] || TAX_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Tax Calculator';

  const scenarios = [
    {
      href: `${prefix}/tools/tax-calculator/scenarios/how-tax-brackets-affect-income-tax`,
      title: tData.cards.taxBrackets.title,
      description: tData.cards.taxBrackets.description,
      badge: tData.cards.taxBrackets.badge,
      icon: Layers,
    },
    {
      href: `${prefix}/tools/tax-calculator/scenarios/gross-income-vs-taxable-income`,
      title: tData.cards.grossVsTaxable.title,
      description: tData.cards.grossVsTaxable.description,
      badge: tData.cards.grossVsTaxable.badge,
      icon: FileSpreadsheet,
    },
    {
      href: `${prefix}/tools/tax-calculator/scenarios/how-deductions-change-estimated-tax`,
      title: tData.cards.deductionsImpact.title,
      description: tData.cards.deductionsImpact.description,
      badge: tData.cards.deductionsImpact.badge,
      icon: ShieldCheck,
    },
  ];

  const ctaLabels: Record<Locale, { title: string; subtitle: string; button: string }> = {
    en: {
      title: 'Ready to calculate your estimated income tax?',
      subtitle:
        'Use the free Tax Calculator to enter your exact gross annual income and standard or itemized deductions to see your progressive bracket breakdown, effective tax rate, and take-home pay.',
      button: 'Open Tax Calculator',
    },
    es: {
      title: '¿Listo para calcular su impuesto sobre la renta estimado?',
      subtitle:
        'Utilice la Calculadora de Impuestos gratuita para ingresar su ingreso anual bruto y deducciones para ver el desglose por tramos impositivos y su ingreso neto.',
      button: 'Abrir Calculadora de Impuestos',
    },
    de: {
      title: 'Bereit, Ihre geschätzte Einkommensteuer zu berechnen?',
      subtitle:
        'Nutzen Sie den kostenlosen Steuerrechner mit Ihrem Bruttojahreseinkommen und Abzügen, um Ihre progressive Tarifaufteilung und das Nettogehalt zu ermitteln.',
      button: 'Steuerrechner öffnen',
    },
    fr: {
      title: 'Prêt à calculer votre impôt sur le revenu estimé ?',
      subtitle:
        'Utilisez le simulateur d’impôt gratuit pour saisir votre revenu brut annuel et vos déductions pour consulter la ventilation par tranches et votre revenu net.',
      button: 'Ouvrir le Simulateur d’Impôt',
    },
    pt: {
      title: 'Pronto para calcular seu imposto de renda estimado?',
      subtitle:
        'Use a Calculadora de Impostos gratuita para inserir sua renda bruta anual e deduções para conferir o demonstrativo por faixas e seu salário líquido.',
      button: 'Abrir Calculadora de Impostos',
    },
    ja: {
      title: '推定所得税額を計算してみませんか？',
      subtitle:
        '無料の税金計算機で年間の総収入と控除額を入力し、累進課税ブラケット別の内訳、実効税率、手取り額をご確認いただけます。',
      button: '税金計算機を開く',
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
        <Link href={`${prefix}/tools/tax-calculator`} className="hover:text-gray-950 dark:hover:text-white">
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
            Tax Calculator Scenarios and Practical Examples
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
          How Federal Income Tax Estimation Works
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          The HelloTools Tax Calculator estimates your federal income tax liability based on the progressive bracket system used by the United States Internal Revenue Service (IRS). Income is taxed in segments, meaning each portion of earnings falls into a defined bracket with its own marginal tax rate.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Gross Income vs Taxable Income
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Gross income reflects total pre-tax earnings. Taxable income is calculated as <code>Math.max(0, Gross Income - Deductions)</code>. Tax brackets apply strictly to the taxable income remainder.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Marginal vs Effective Tax Rate
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your marginal rate is the tax rate applied to your highest dollar of taxable income. Your effective tax rate is your total tax paid divided by gross income, which is always lower than your marginal rate.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-1.5">
            Model Assumptions & Exclusions
          </h3>
          <p className="text-xs text-blue-800 dark:text-blue-200/80 leading-relaxed">
            The Tax Calculator uses 2024 US Federal Single Filer tax brackets and a default standard deduction of $14,600. It estimates federal income taxes only. It excludes state and municipal taxes, FICA (Social Security and Medicare) payroll taxes, alternative minimum tax (AMT), tax credits, and dependent exemptions.
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
          href={`${prefix}/tools/tax-calculator`}
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
            href={`${prefix}/tools/salary-calculator`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Salary Calculator
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
