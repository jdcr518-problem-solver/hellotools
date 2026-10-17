import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Layers, ArrowRight, HelpCircle } from 'lucide-react';
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

interface TaxBracketsImpactViewProps {
  locale?: Locale;
}

/* ── Benchmark Incomes with Verified Calculations ────────────────────────── */
const BENCHMARK_INCOMES = [
  { gross: 45_000, label: 'Entry Career ($45,000)' },
  { gross: 65_000, label: 'Mid-Level Professional ($65,000)' },
  { gross: 85_000, label: 'Senior Professional ($85,000)' },
  { gross: 120_000, label: 'Management Tier ($120,000)' },
  { gross: 160_000, label: 'Lead / Director ($160,000)' },
  { gross: 220_000, label: 'Executive Tier ($220,000)' },
] as const;

const STANDARD_DEDUCTION_2024 = 14_600;

const ROWS = BENCHMARK_INCOMES.map((tier) => {
  const result = calculateTaxEstimate(tier.gross, STANDARD_DEDUCTION_2024);
  return {
    ...tier,
    ...result,
  };
});

export default function TaxBracketsImpactView({
  locale = DEFAULT_LOCALE,
}: TaxBracketsImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('tax-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Tax Calculator';

  // Worked example case ($85,000 annual gross)
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
          How Tax Brackets Affect Income Tax
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
        <Layers className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Tax Brackets Affect Your Income Tax: Progressive Rates Explained
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Learn how progressive marginal tax brackets work in practice. Discover why moving into a higher tax bracket only taxes your additional dollars at the higher rate and never reduces your total take-home pay.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Progressive Bucket System */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Progressive Tax Brackets Work
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A common financial misconception is that entering a higher tax bracket causes your entire income to be taxed at that higher rate. In a <strong>progressive tax system</strong>, tax rates apply in sequential tiers or &ldquo;buckets.&rdquo;
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 dark:text-orange-300 mb-1">
                Marginal Tax Rate
              </h3>
              <p className="text-xs text-orange-900 dark:text-orange-200/80 leading-relaxed">
                The tax rate applied strictly to your <em>last dollar</em> of taxable income. If your taxable income reaches the 22% bracket, only the dollars inside that specific bracket pay 22%.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 mb-1">
                Effective Tax Rate
              </h3>
              <p className="text-xs text-blue-900 dark:text-blue-200/80 leading-relaxed">
                The actual percentage of your total income paid in tax (<code>Total Tax Owed / Gross Income</code>). Because earlier portions of your earnings are taxed at 0%, 10%, and 12%, your effective rate is always lower than your marginal bracket.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Calculation: $85,000 Gross Income
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: 2024 US Federal Single Filer rates, standard deduction of $14,600, no state taxes or credits. Verified with the HelloTools Tax Calculator engine.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 border border-gray-150 dark:border-gray-800 mb-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Gross Annual Income:</span>
              <span className="font-bold">{formatCurrency(baseCase.grossIncome)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Less Standard Deduction (2024 Single):</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">-{formatCurrency(baseCase.deductions)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold border-t border-gray-200 dark:border-gray-700 pt-2 text-sm">
              <span>Taxable Income Base:</span>
              <span>{formatCurrency(baseCase.taxableIncome)}</span>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-2.5 px-3 font-semibold text-gray-700 dark:text-gray-300">Bracket Rate</th>
                  <th className="py-2.5 px-3 font-semibold text-gray-700 dark:text-gray-300">2024 Income Range</th>
                  <th className="py-2.5 px-3 font-semibold text-gray-700 dark:text-gray-300">Taxable in Bracket</th>
                  <th className="py-2.5 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Tax Owed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {baseCase.bracketBreakdown.map((b, idx) => (
                  <tr key={idx} className={b.taxableInBracket > 0 ? 'bg-orange-50/20 dark:bg-orange-950/10' : 'opacity-40'}>
                    <td className="py-2 px-3 font-bold text-gray-900 dark:text-white">{b.ratePercentStr}</td>
                    <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{b.rangeLabel}</td>
                    <td className="py-2 px-3 text-slate-800 dark:text-slate-200">{formatCurrency(b.taxableInBracket)}</td>
                    <td className="py-2 px-3 text-right font-bold text-gray-900 dark:text-white">{formatCurrency(b.taxInBracket)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Total Estimated Tax</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(baseCase.taxOwed)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Sum of bracket taxes</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Effective Tax Rate</span>
              <div className="text-xl font-extrabold mt-1">{formatPercent(baseCase.effectiveRate)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">$10,541 ÷ $85,000</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Net Take-Home Pay</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(baseCase.netIncome)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Income minus tax</span>
            </div>
          </div>
        </section>

        {/* Section 3: Income Tiers Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Progressive Tax Across Career Income Tiers
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare taxable income, top marginal bracket, effective tax rate, and take-home pay across salary levels assuming 2024 single filer standard deduction ($14,600).
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Income Level</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Gross Income</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Taxable Base</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Top Bracket</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Est. Tax Owed</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Effective Rate</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Take-Home Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {ROWS.map((row) => (
                  <tr key={row.gross} className={row.gross === 85_000 ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                    <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">{row.label}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.gross)}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.taxableIncome)}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        {Math.round(row.marginalRate * 100)}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-900 dark:text-white">{formatCurrency(row.taxOwed)}</td>
                    <td className="py-3 px-3 text-[#f97316] font-bold">{formatPercent(row.effectiveRate)}</td>
                    <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(row.netIncome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Key Insights & Limitations */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Crucial Rules of Progressive Taxation
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <li>
              <strong>A raise never reduces your take-home pay:</strong> When a pay raise moves you from the 12% bracket into the 22% bracket, the 22% rate only applies to the dollars above $47,150. All earlier dollars continue to be taxed at 10% and 12%.
            </li>
            <li>
              <strong>Effective rate is what matters for budgeting:</strong> Budgeting based on your marginal bracket overestimates tax liability. A single filer earning $85,000 has a marginal bracket of 22%, but pays an effective rate of only 12.40%.
            </li>
            <li>
              <strong>Federal vs Other Taxes:</strong> The HelloTools Tax Calculator models US federal income taxes. State income taxes, local taxes, and FICA payroll taxes (6.2% Social Security + 1.45% Medicare) are not included in this model.
            </li>
          </ul>
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
                q: 'Can getting a salary raise push me into a higher tax bracket and leave me with less money?',
                a: 'No. This is one of the most widespread tax myths. In a progressive tax system, only the income that exceeds the bracket boundary is taxed at the higher marginal rate. All earnings below that threshold are taxed at the same lower bracket rates as before.',
              },
              {
                q: 'What is the difference between marginal tax rate and effective tax rate?',
                a: 'Your marginal tax rate is the rate charged on your highest dollar of taxable income. Your effective tax rate is your total tax paid divided by your total income. Because your first tiers of income are taxed at lower rates (or 0% due to deductions), your effective rate is always lower than your marginal rate.',
              },
              {
                q: 'How does the standard deduction interact with tax brackets?',
                a: 'The standard deduction ($14,600 for single filers in 2024) is subtracted directly from your gross income before tax brackets are applied. This effectively creates a "0% bracket" on your initial earnings.',
              },
              {
                q: 'What taxes are excluded from this Tax Calculator scenario?',
                a: 'This calculation reflects US federal income taxes for single filers. It does not calculate state income taxes, municipal taxes, payroll taxes (Social Security and Medicare), alternative minimum tax (AMT), or potential tax credits.',
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
