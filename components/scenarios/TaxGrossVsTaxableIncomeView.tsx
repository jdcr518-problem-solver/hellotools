import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, FileSpreadsheet, ArrowRight, HelpCircle } from 'lucide-react';
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

interface TaxGrossVsTaxableIncomeViewProps {
  locale?: Locale;
}

/* ── Benchmark Gross Incomes with Verified Calculations ──────────────────── */
const BENCHMARK_CASES = [
  { gross: 30_000, label: 'Entry Level ($30,000)' },
  { gross: 50_000, label: 'Early Career ($50,000)' },
  { gross: 75_000, label: 'Median Professional ($75,000)' },
  { gross: 100_000, label: 'Established Professional ($100,000)' },
  { gross: 150_000, label: 'Senior Specialist ($150,000)' },
] as const;

const STANDARD_DEDUCTION_2024 = 14_600;

const ROWS = BENCHMARK_CASES.map((item) => {
  const result = calculateTaxEstimate(item.gross, STANDARD_DEDUCTION_2024);
  const shelteredPct = (STANDARD_DEDUCTION_2024 / item.gross) * 100;
  const taxableRate = result.taxableIncome > 0 ? (result.taxOwed / result.taxableIncome) * 100 : 0;
  return {
    ...item,
    ...result,
    shelteredPct: Math.round(shelteredPct * 10) / 10,
    taxableRate: Math.round(taxableRate * 100) / 100,
  };
});

export default function TaxGrossVsTaxableIncomeView({
  locale = DEFAULT_LOCALE,
}: TaxGrossVsTaxableIncomeViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('tax-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Tax Calculator';

  // Base worked case ($75,000 annual gross — default calculator value)
  const baseCase = ROWS[2];

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
          Gross Income vs Taxable Income
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
        <FileSpreadsheet className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Gross Income vs Taxable Income: Understanding What Gets Taxed
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Discover the crucial distinction between your total pre-tax earnings (gross income) and the actual dollar amount subjected to progressive tax brackets (taxable income) after deducting allowable exclusions.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Fundamental Concept */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Bridge from Gross Pay to Taxable Income
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            You do not pay income tax on every dollar you earn. The tax calculation formula begins with your <strong>Gross Income</strong>, subtracts your <strong>Deductions</strong>, and applies progressive tax brackets solely to the remaining <strong>Taxable Income</strong>:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl font-mono text-xs sm:text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 my-4 text-center">
            Taxable Income = Math.max(0, Gross Annual Income - Allowable Deductions)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5">
                Gross Annual Income
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The total compensation you receive from wages, salaries, bonuses, dividends, and interest before any taxes, retirement contributions, or deductions are subtracted.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5">
                Taxable Income Base
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The portion of your earnings that is actually subject to federal income tax. Deductions act as a 0% tax shelter, lowering your taxable income base dollar-for-dollar.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Worked Example ($75,000 default) */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Worked Example: $75,000 Gross Income Breakdown
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Calculated with 2024 single filer standard deduction ($14,600). Verified against the HelloTools Tax Calculator.
          </p>

          <div className="space-y-4 font-mono text-xs mb-6">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800 space-y-2.5">
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                <span>1. Gross Annual Income:</span>
                <span className="font-bold">{formatCurrency(baseCase.grossIncome)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                <span>2. Standard Deduction (Sheltered at 0% tax):</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">-{formatCurrency(baseCase.deductions)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
                <span>3. Net Taxable Income Subject to Brackets:</span>
                <span className="text-[#f97316]">{formatCurrency(baseCase.taxableIncome)}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50/30 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-2">
              <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                <span>10% Bracket on first $11,600:</span>
                <span>$1,160.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                <span>12% Bracket on $11,600 to $47,150 ($35,550):</span>
                <span>$4,266.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                <span>22% Bracket on remaining $13,250 ($47,150 to $60,400):</span>
                <span>$2,915.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold border-t border-orange-200 dark:border-orange-800 pt-2 text-sm">
                <span>Total Federal Tax Owed:</span>
                <span className="text-[#1a3c5e] dark:text-blue-400">{formatCurrency(baseCase.taxOwed)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Gross Effective Rate</span>
              <div className="text-xl font-extrabold mt-1">{formatPercent(baseCase.effectiveRate)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">$8,341 ÷ $75,000</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Taxable Effective Rate</span>
              <div className="text-xl font-extrabold mt-1">{formatPercent(baseCase.taxableRate)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">$8,341 ÷ $60,400</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Net Take-Home Pay</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(baseCase.netIncome)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">$75,000 - $8,341</span>
            </div>
          </div>
        </section>

        {/* Section 3: Comparison Across Incomes */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            How Deductions Protect Different Income Levels
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            The $14,600 standard deduction provides an outsized percentage benefit to entry and mid-tier earners, sheltering a significant portion of their earnings completely from federal taxation.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Profile</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Gross Income</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Deduction</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Taxable Income</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">% Sheltered</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Estimated Tax</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Take-Home Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {ROWS.map((row) => (
                  <tr key={row.gross} className={row.gross === 75_000 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.label}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.gross)}</td>
                    <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400">-{formatCurrency(row.deductions)}</td>
                    <td className="py-3 px-3 text-slate-900 dark:text-white">{formatCurrency(row.taxableIncome)}</td>
                    <td className="py-3 px-3 text-[#f97316] font-bold">{row.shelteredPct}%</td>
                    <td className="py-3 px-3 text-slate-900 dark:text-white">{formatCurrency(row.taxOwed)}</td>
                    <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(row.netIncome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Practical Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Practical Budgeting Implications
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              1. <strong>Do Not Confuse Gross Salary with Spendable Cash:</strong> If you are offered an annual compensation package of $75,000, your federal tax obligation will be approximately $8,341, leaving an estimated $66,659 in net annual pay before state taxes or payroll deductions.
            </p>
            <p>
              2. <strong>Deductions Create a Zero-Tax Foundation:</strong> A single filer earning $30,000 pays federal income tax on only $15,400 of their income because the first $14,600 is fully sheltered by the standard deduction.
            </p>
            <p>
              3. <strong>Itemized vs Standard:</strong> Filers choose either the standard deduction or itemized deductions (such as mortgage interest, state/local taxes up to statutory caps, and charitable contributions). You take whichever is higher to minimize taxable income.
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
                q: 'What is the primary difference between gross income and taxable income?',
                a: 'Gross income is your total earnings before any adjustments or deductions. Taxable income is the smaller amount that remains after subtracting allowable deductions (such as the standard deduction). Progressive tax rates are applied exclusively to taxable income.',
              },
              {
                q: 'Can deductions reduce my taxable income below zero?',
                a: 'No. In the HelloTools Tax Calculator model, taxable income cannot drop below zero (calculated as Math.max(0, income - deductions)). If your deductions equal or exceed your gross income, your taxable income is $0 and your federal tax liability is $0.',
              },
              {
                q: 'Why does effective tax rate differ when calculated against gross vs taxable income?',
                a: 'Your effective rate against gross income (Total Tax / Gross Income) indicates what fraction of your total earnings went to taxes. Your effective rate against taxable income (Total Tax / Taxable Income) measures the average tax on the taxable portion only, and is naturally higher because it excludes the deduction shelter.',
              },
              {
                q: 'Does this calculator include pre-tax payroll deductions like 401(k) or health insurance?',
                a: 'You can input voluntary pre-tax deductions into the "Deductions" field along with your standard deduction to model how contributing to a traditional 401(k), HSA, or health premium reduces your taxable income base.',
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
              href={`${prefix}/tools/savings-goal-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Savings Goal Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/retirement-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Retirement Savings Calculator
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
