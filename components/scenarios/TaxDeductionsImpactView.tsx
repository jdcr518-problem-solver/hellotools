import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateTaxEstimate,
  formatCurrency,
  formatPercent,
} from '@/data/tax-scenarios-data';

interface TaxDeductionsImpactViewProps {
  locale?: Locale;
}

/* ── Benchmark Deduction Scenarios at $85,000 Gross Income ──────────────── */
const BASE_GROSS_INCOME = 85_000;

const DEDUCTION_SCENARIOS = [
  { deduction: 0, label: 'Zero Deductions ($0)', description: 'Hypothetical baseline without claiming deductions' },
  { deduction: 10_000, label: 'Partial Deductions ($10,000)', description: 'Below standard deduction threshold' },
  { deduction: 14_600, label: '2024 Standard Deduction ($14,600)', description: 'IRS default allowance for Single filers' },
  { deduction: 22_000, label: 'Itemized Deductions ($22,000)', description: 'Mortgage interest, state taxes & charitable gifts' },
  { deduction: 30_000, label: 'High Itemized / Pre-tax ($30,000)', description: 'Itemized deductions plus pre-tax health/retirement' },
] as const;

const zeroResult = calculateTaxEstimate(BASE_GROSS_INCOME, 0);

const ROWS = DEDUCTION_SCENARIOS.map((tier) => {
  const result = calculateTaxEstimate(BASE_GROSS_INCOME, tier.deduction);
  const taxSavings = zeroResult.taxOwed - result.taxOwed;
  return {
    ...tier,
    ...result,
    taxSavings: Math.round(taxSavings * 100) / 100,
  };
});

/* Marginal value of a $1,000 deduction */
const MARGINAL_TIERS = [
  { bracket: '10%', savings: 100, note: 'Saves $100 per $1,000 deducted' },
  { bracket: '12%', savings: 120, note: 'Saves $120 per $1,000 deducted' },
  { bracket: '22%', savings: 220, note: 'Saves $220 per $1,000 deducted' },
  { bracket: '24%', savings: 240, note: 'Saves $240 per $1,000 deducted' },
  { bracket: '32%', savings: 320, note: 'Saves $320 per $1,000 deducted' },
  { bracket: '35%', savings: 350, note: 'Saves $350 per $1,000 deducted' },
  { bracket: '37%', savings: 370, note: 'Saves $370 per $1,000 deducted' },
];

export default function TaxDeductionsImpactView({
  locale = DEFAULT_LOCALE,
}: TaxDeductionsImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('tax-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Tax Calculator';

  // Standard deduction baseline row
  const standardCase = ROWS[2];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl flex-wrap"
      >
        <Link href={prefix || '/'} className="hover:text-slate-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{homeLabel}</span>
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/#finance`} className="hover:text-slate-950 dark:hover:text-white">
          {financeLabel}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/tax-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/tax-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Deductions Change Estimated Tax
        </span>
      </nav>

      {/* Top Banner Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <ShieldCheck className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Deductions Change Your Estimated Tax: Savings & Shelter Analysis
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            See how standard and itemized deductions reduce your taxable income base. Learn why deductions save taxes at your highest marginal tax rate and how to calculate your net savings.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Core Mechanism */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Deductions Generate Real Tax Savings
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A tax deduction is not a direct credit off your tax bill. Instead, deductions <strong>reduce the taxable income amount</strong> before progressive tax rates are computed. Because deductions subtract from the top layer of your earnings, every dollar of deduction saves tax at your <strong>marginal tax rate</strong>:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl font-mono text-xs sm:text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 my-4 text-center">
            Tax Savings = Deduction Amount × Marginal Tax Bracket Rate
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            For example, if you are in the 22% marginal tax bracket, a $1,000 deduction saves you $220 in federal income taxes. A taxpayer in the 32% bracket saves $320 on that identical $1,000 deduction.
          </p>
        </section>

        {/* Section 2: Worked Scenario Table at $85,000 Gross Income */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Comparison: Deductions Impact at $85,000 Gross Income
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Gross income fixed at $85,000 under 2024 single filer brackets. Demonstrates how increasing deductions lowers taxable income, reduces effective rate, and increases net take-home pay.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Deduction Tier</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Deduction ($)</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Taxable Income</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Est. Tax Owed</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Effective Rate</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-emerald-600 dark:text-emerald-400">Tax Savings</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Net Take-Home</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {ROWS.map((row) => (
                  <tr key={row.deduction} className={row.deduction === 14_600 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.label}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.deduction)}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.taxableIncome)}</td>
                    <td className="py-3 px-3 text-slate-900 dark:text-white">{formatCurrency(row.taxOwed)}</td>
                    <td className="py-3 px-3 text-[#f97316] font-bold">{formatPercent(row.effectiveRate)}</td>
                    <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                      {row.taxSavings > 0 ? `+${formatCurrency(row.taxSavings)}` : '$0.00'}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-gray-900 dark:text-white">{formatCurrency(row.netIncome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Standard Deduction Shelter</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(standardCase.taxSavings)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Saved vs zero deductions</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Effective Rate Drop</span>
              <div className="text-xl font-extrabold mt-1">16.18% → 12.40%</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">-3.78% lower effective tax</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Take-Home Increase</span>
              <div className="text-xl font-extrabold mt-1">+{formatCurrency(standardCase.taxSavings)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Direct cash retained</span>
            </div>
          </div>
        </section>

        {/* Section 3: Marginal Value by Bracket */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Tax Savings Per $1,000 Deduction by Bracket
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            The value of a tax deduction is directly tied to the marginal rate applied to your highest dollars of taxable income.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            {MARGINAL_TIERS.map((tier) => (
              <div key={tier.bracket} className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block font-sans">Bracket {tier.bracket}</span>
                <span className="text-lg font-extrabold text-[#f97316] block mt-1">${tier.savings}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans mt-0.5 block">per $1,000 deduction</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Standard vs Itemized Deductions */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Standard vs Itemized Deductions
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              When filing income taxes, taxpayers choose between the <strong>Standard Deduction</strong> (a fixed dollar allowance established by the IRS each year based on filing status) and <strong>Itemized Deductions</strong> (the sum of eligible expenses such as state/local taxes up to $10,000, mortgage interest, and charitable donations).
            </p>
            <p>
              <strong>The Golden Rule:</strong> You should only itemize deductions if the total sum of your itemized expenses exceeds the standard deduction. For example, if your allowable itemized deductions total $22,000, itemizing shelters an extra $7,400 beyond the standard deduction ($22,000 - $14,600), producing an extra $1,628 in tax savings for a 22% bracket taxpayer.
            </p>
          </div>
        </section>

        {/* Educational Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Section 5: Scenario FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'How do deductions reduce my estimated federal tax?',
                a: 'Deductions are subtracted from your gross annual income to arrive at your taxable income base. Because progressive tax rates are applied to the smaller taxable remainder, every dollar of deduction shelters income from your top marginal tax bracket.',
              },
              {
                q: 'What is the 2024 standard deduction for single filers?',
                a: 'For the 2024 tax year, the IRS standard deduction for single filers is $14,600. This is the default deduction prefilled in the HelloTools Tax Calculator.',
              },
              {
                q: 'What is the difference between a tax deduction and a tax credit?',
                a: 'A tax deduction reduces your taxable income, saving you money based on your marginal tax rate (e.g. a $1,000 deduction in the 22% bracket saves $220). A tax credit is a dollar-for-dollar reduction of the final tax bill (e.g. a $1,000 credit saves exactly $1,000 regardless of your bracket).',
              },
              {
                q: 'Can I enter custom deductions into the HelloTools Tax Calculator?',
                a: 'Yes. The "Deductions" field accepts any valid numeric dollar amount. You can enter your expected itemized deduction total, standard deduction, or combined pre-tax retirement and health savings to see how they impact your estimated tax liability.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#f97316] shrink-0" aria-hidden="true" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Navigation and Internal Links */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Explore Related Financial Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/tax-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Tax Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/tax-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Tax Scenarios
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
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/understanding-tax-brackets"
              className="text-[#f97316] hover:underline font-semibold"
            >
              Understanding Progressive Tax Brackets Simply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
