import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingUp, ArrowRight, HelpCircle, CheckCircle, BarChart3, AlertCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateFreelancerTax,
  formatCurrency,
  formatPercent,
} from '@/data/freelancer-tax-scenarios-data';

interface FreelancerTaxIncomeImpactViewProps {
  locale?: Locale;
}

/* ── Benchmark Income Tiers (2024 Single Filer, 0% State Tax) ─────────────── */
const INCOME_TIERS = [
  {
    key: 'low',
    tier: 'Part-Time / Early Stage',
    gross: 35_000,
    expenses: 4_000,
    expenseRatio: '11.4%',
    description: 'Supplemental freelancing or launching solo business with low overhead',
  },
  {
    key: 'moderate',
    tier: 'Full-Time Independent (Default)',
    gross: 80_000,
    expenses: 10_000,
    expenseRatio: '12.5%',
    description: 'Full-time independent professional or contractor with typical expenses',
  },
  {
    key: 'high',
    tier: 'Established Solo / Specialist',
    gross: 150_000,
    expenses: 20_000,
    expenseRatio: '13.3%',
    description: 'Experienced solo consultant, senior software engineer, or agency lead',
  },
] as const;

const TIER_RESULTS = INCOME_TIERS.map((tier) => {
  const result = calculateFreelancerTax({
    taxYear: '2024',
    grossIncome: tier.gross,
    expenses: tier.expenses,
    filingStatus: 'single',
    includeState: false,
    stateTaxRate: 0,
  });

  return {
    ...tier,
    result,
  };
});

export default function FreelancerTaxIncomeImpactView({
  locale = DEFAULT_LOCALE,
}: FreelancerTaxIncomeImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('freelancer-tax-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Freelancer Quarterly Tax Calculator';

  const lowTier = TIER_RESULTS[0];
  const modTier = TIER_RESULTS[1];
  const highTier = TIER_RESULTS[2];

  const incomeMultiplier = (highTier.gross / lowTier.gross).toFixed(1);
  const taxMultiplier = (highTier.result.totalAnnualTax / lowTier.result.totalAnnualTax).toFixed(1);

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
        <Link href={`${prefix}/tools/freelancer-tax-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/freelancer-tax-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Income Changes Impact
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
        <TrendingUp className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Income Changes Affect Your Quarterly Estimate
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Compare low, moderate, and higher freelance income scenarios to understand how progressive tax brackets and standard deductions cause quarterly vouchers to scale non-linearly with revenue.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Non-Linear Scaling Analysis */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Why Quarterly Tax Payments Rise Faster Than Gross Revenue
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A common misconception among new freelancers is that taxes grow in exact linear proportion to earnings (e.g., doubling income simply doubles your tax). In reality, federal progressive marginal brackets (10%, 12%, 22%, 24%) combined with fixed deductions cause quarterly estimates to accelerate as income expands:
          </p>

          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 text-xs text-blue-900 dark:text-blue-200 space-y-1">
            <span className="font-bold block text-sm">Key Scaling Metric:</span>
            <span>
              Moving from <strong>$35,000</strong> to <strong>$150,000</strong> in gross revenue represents a <strong>{incomeMultiplier}x</strong> increase in earnings. However, your total annual estimated tax jumps from <strong>$5,853.35</strong> to <strong>$36,902.71</strong> — a <strong>{taxMultiplier}x</strong> surge! Consequently, required quarterly vouchers climb from <strong>$1,463.34</strong> to <strong>$9,225.68</strong> per quarter.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">
                Part-Time ($35k Gross)
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                {formatCurrency(lowTier.result.quarterlyPayment)} / qtr
              </span>
              <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 block mt-1">
                {formatPercent(lowTier.result.effectiveTaxRate)} Effective Rate
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">
                Full-Time ($80k Gross)
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                {formatCurrency(modTier.result.quarterlyPayment)} / qtr
              </span>
              <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 block mt-1">
                {formatPercent(modTier.result.effectiveTaxRate)} Effective Rate
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">
                Established ($150k Gross)
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                {formatCurrency(highTier.result.quarterlyPayment)} / qtr
              </span>
              <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 block mt-1">
                {formatPercent(highTier.result.effectiveTaxRate)} Effective Rate
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Side-by-Side Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Detailed Side-by-Side Tax Breakdown Across Income Tiers
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            All calculations verified against the 2024 single filer configuration with standard deduction ($14,600) and Schedule SE rules.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/75 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Tax Metric</th>
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Part-Time ($35k)</th>
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Full-Time ($80k)</th>
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Established ($150k)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-2.5 px-3 font-sans font-semibold text-gray-900 dark:text-white">
                    Gross 1099 Income
                  </td>
                  <td className="py-2.5 px-3">{formatCurrency(lowTier.gross, 0)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(modTier.gross, 0)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(highTier.gross, 0)}</td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-2.5 px-3 font-sans font-semibold text-gray-900 dark:text-white">
                    Business Expenses
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">
                    -{formatCurrency(lowTier.expenses, 0)}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">
                    -{formatCurrency(modTier.expenses, 0)}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">
                    -{formatCurrency(highTier.expenses, 0)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 bg-slate-50/40 dark:bg-gray-800/20 font-bold">
                  <td className="py-2.5 px-3 font-sans text-gray-900 dark:text-white">
                    Net 1099 Profit
                  </td>
                  <td className="py-2.5 px-3">{formatCurrency(lowTier.result.netIncome, 0)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(modTier.result.netIncome, 0)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(highTier.result.netIncome, 0)}</td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-2.5 px-3 font-sans text-gray-900 dark:text-white">
                    SE Taxable Base (92.35%)
                  </td>
                  <td className="py-2.5 px-3">{formatCurrency(lowTier.result.seTaxableIncome, 2)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(modTier.result.seTaxableIncome, 2)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(highTier.result.seTaxableIncome, 2)}</td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-2.5 px-3 font-sans font-semibold text-amber-600 dark:text-amber-400">
                    Total SE Tax (15.3%)
                  </td>
                  <td className="py-2.5 px-3 text-amber-600 dark:text-amber-400">
                    {formatCurrency(lowTier.result.selfEmploymentTax, 2)}
                  </td>
                  <td className="py-2.5 px-3 text-amber-600 dark:text-amber-400">
                    {formatCurrency(modTier.result.selfEmploymentTax, 2)}
                  </td>
                  <td className="py-2.5 px-3 text-amber-600 dark:text-amber-400">
                    {formatCurrency(highTier.result.selfEmploymentTax, 2)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-2.5 px-3 font-sans text-gray-900 dark:text-white">
                    Federal Taxable Base
                  </td>
                  <td className="py-2.5 px-3">{formatCurrency(lowTier.result.taxableFederalBase, 2)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(modTier.result.taxableFederalBase, 2)}</td>
                  <td className="py-2.5 px-3">{formatCurrency(highTier.result.taxableFederalBase, 2)}</td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-2.5 px-3 font-sans font-semibold text-blue-600 dark:text-blue-400">
                    Federal Income Tax
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">
                    {formatCurrency(lowTier.result.estimatedIncomeTax, 2)}
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">
                    {formatCurrency(modTier.result.estimatedIncomeTax, 2)}
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">
                    {formatCurrency(highTier.result.estimatedIncomeTax, 2)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 bg-blue-50/30 dark:bg-blue-950/20 font-bold">
                  <td className="py-3 px-3 font-sans text-slate-900 dark:text-white">
                    Total Annual Tax
                  </td>
                  <td className="py-3 px-3 text-slate-900 dark:text-white">
                    {formatCurrency(lowTier.result.totalAnnualTax, 2)}
                  </td>
                  <td className="py-3 px-3 text-slate-900 dark:text-white">
                    {formatCurrency(modTier.result.totalAnnualTax, 2)}
                  </td>
                  <td className="py-3 px-3 text-slate-900 dark:text-white">
                    {formatCurrency(highTier.result.totalAnnualTax, 2)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 bg-emerald-50/30 dark:bg-emerald-950/20 font-bold">
                  <td className="py-3 px-3 font-sans text-emerald-700 dark:text-emerald-300">
                    Quarterly Voucher (4x / yr)
                  </td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatCurrency(lowTier.result.quarterlyPayment, 2)}
                  </td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatCurrency(modTier.result.quarterlyPayment, 2)}
                  </td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatCurrency(highTier.result.quarterlyPayment, 2)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 font-bold">
                  <td className="py-2.5 px-3 font-sans text-blue-700 dark:text-blue-300">
                    Effective Tax Rate
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">
                    {formatPercent(lowTier.result.effectiveTaxRate)}
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">
                    {formatPercent(modTier.result.effectiveTaxRate)}
                  </td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">
                    {formatPercent(highTier.result.effectiveTaxRate)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Scenario FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Why does the effective tax rate increase from 16.7% to 24.6%?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Self-employment tax is mostly flat (15.3%), but federal income tax is progressive. At $35k gross income, the $14,600 standard deduction shields over 47% of net profit from federal income tax. At $150k gross income, the standard deduction shields only 11% of net profit, pushing the majority of earnings into the 22% and 24% marginal tax brackets.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                What happens to Social Security tax if my net earnings exceed the wage cap?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The calculator incorporates the IRS Social Security annual wage cap ($168,600 for 2024, $176,100 for 2025, and $181,800 for 2026). Once your Schedule SE taxable earnings pass that threshold, you no longer pay the 12.4% Social Security tax on subsequent earnings, though the 2.9% Medicare tax continues uncapped.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                How should I adjust my quarterly payments if my income suddenly jumps mid-year?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If you land a major new contract or raise your billing rates mid-year, recalculate your estimated annual totals immediately using the calculator. Increasing your remaining quarterly payments prevents a large surprise tax bill and potential underpayment penalties when filing your annual return.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Simulate Your Current Income Bracket</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Use the live Freelancer Quarterly Tax Calculator to enter your custom revenue projection and discover your exact tax rate and quarterly vouchers.
            </p>
          </div>
          <Link
            href={`${prefix}/tools/freelancer-tax-calculator`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f97316] text-white text-xs sm:text-sm font-bold hover:bg-[#ea580c] transition-colors"
          >
            Open Calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Bottom Navigation & Internal Links */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Explore Other Freelancer Tax Scenarios & Related Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/freelancer-tax-calculator/scenarios/how-much-to-set-aside-from-each-payment`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Much Should I Set Aside From Each Payment?
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/freelancer-tax-calculator/scenarios/how-quarterly-estimated-payments-are-calculated`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Quarterly Estimated Payments Are Calculated
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
              href={`${prefix}/tools/tax-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Income Tax Calculator
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
    </div>
  );
}
