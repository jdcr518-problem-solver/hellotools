import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Calculator, ArrowRight, HelpCircle, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';
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

interface FreelancerTaxCalculationStepsViewProps {
  locale?: Locale;
}

export default function FreelancerTaxCalculationStepsView({
  locale = DEFAULT_LOCALE,
}: FreelancerTaxCalculationStepsViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('freelancer-tax-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Freelancer Quarterly Tax Calculator';

  // Base worked case matching live calculator defaults
  const baseResult = calculateFreelancerTax({
    taxYear: '2024',
    grossIncome: 80_000,
    expenses: 10_000,
    filingStatus: 'single',
    includeState: false,
    stateTaxRate: 0,
  });

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
          How Payments Are Calculated
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
        <Calculator className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Quarterly Estimated Payments Are Calculated
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive, step-by-step walkthrough of the mathematical formula used by the Freelancer Quarterly Tax Calculator to derive self-employment tax, taxable federal base, progressive brackets, and quarterly payment vouchers.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Core Formula Breakdown */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Complete 4-Stage Calculation Pipeline
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The IRS estimated tax calculation involves two independent tax layers: Self-Employment Tax (covering FICA payroll obligations) and Progressive Income Tax. The calculator resolves them in four sequential stages:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-1.5">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                Stage 1: Net Business Profit
              </span>
              <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800 text-slate-800 dark:text-slate-200">
                Net Profit = Gross 1099 Income - Eligible Business Expenses
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Only your net earnings are subject to taxation. Legitimate deductions reduce every subsequent tax calculation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                Stage 2: Self-Employment (SE) Tax
              </span>
              <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800 text-slate-800 dark:text-slate-200">
                SE Profit = Net Profit × 92.35%
                <br />
                SE Tax = (SE Profit × 12.4% SS [capped]) + (SE Profit × 2.9% Med)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pursuant to Schedule SE, 92.35% of net profit is subject to 15.3% FICA contributions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-1.5">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                Stage 3: Taxable Federal Base
              </span>
              <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800 text-slate-800 dark:text-slate-200">
                Taxable Base = Net - (50% × SE Tax) - Standard Deduction
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You deduct half of your SE tax plus your standard deduction before progressive tax brackets apply.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-1.5">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                Stage 4: Quarterly Vouchers
              </span>
              <div className="font-mono text-xs bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800 text-slate-800 dark:text-slate-200">
                Quarterly Voucher = (SE Tax + Federal Tax + State Tax) ÷ 4
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Total annual tax liability is divided into 4 equal periodic payments due on IRS calendar deadlines.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Verified Numerical Walkthrough */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Mathematical Walkthrough ($80,000 Gross Baseline)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Input parameters: 2024 tax year, Single filer, $80,000 gross freelance revenue, $10,000 business write-offs, 0% state tax.
          </p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/30">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                <span>Step 1: Calculate Net Business Profit</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">$70,000.00</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                $80,000.00 (Gross) - $10,000.00 (Deductible Expenses) = $70,000.00 Net 1099 Profit
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/30">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                <span>Step 2: Determine Schedule SE Taxable Profit (92.35%)</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">$64,645.00</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                $70,000.00 × 0.9235 = $64,645.00 subject to Self-Employment Tax
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/30">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                <span>Step 3: Compute Self-Employment Tax (15.3%)</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">+$9,890.69</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono space-y-0.5">
                <p>• Social Security (12.4%): $64,645.00 × 0.124 = $8,015.98 (below $168,600 cap)</p>
                <p>• Medicare (2.9%): $64,645.00 × 0.029 = $1,874.71</p>
                <p>• Additional Medicare (0.9%): $0.00 (income under $200k threshold)</p>
                <p className="font-bold pt-1 text-slate-800 dark:text-slate-200">
                  Total SE Tax = $8,015.98 + $1,874.71 = $9,890.69
                </p>
              </div>
            </div>

            {/* Step 4 & 5 */}
            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/30">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                <span>Step 4 & 5: Deduct 50% SE Tax & Standard Deduction</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">-$19,545.34</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono space-y-0.5">
                <p>• Deductible 50% of SE Tax: $9,890.69 × 0.5 = $4,945.34</p>
                <p>• 2024 Single Standard Deduction: $14,600.00</p>
                <p className="font-bold pt-1 text-slate-800 dark:text-slate-200">
                  Federal Taxable Base = $70,000.00 - $4,945.34 - $14,600.00 = $50,454.66
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/30">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                <span>Step 6: Compute Progressive Federal Income Tax</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">+$6,153.02</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-mono space-y-0.5">
                <p>• 10% on first $11,600: $1,160.00</p>
                <p>• 12% from $11,600 to $47,150: ($47,150 - $11,600) × 0.12 = $4,266.00</p>
                <p>• 22% on remainder above $47,150: ($50,454.66 - $47,150) × 0.22 = $727.02</p>
                <p className="font-bold pt-1 text-slate-800 dark:text-slate-200">
                  Total Federal Income Tax = $1,160.00 + $4,266.00 + $727.02 = $6,153.02
                </p>
              </div>
            </div>

            {/* Step 7 */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-200 mb-1">
                <span>Step 7: Sum Total Annual Tax & Divide Into 4 Vouchers</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(baseResult.quarterlyPayment)} / quarter
                </span>
              </div>
              <div className="text-xs text-blue-800 dark:text-blue-300 font-mono space-y-0.5">
                <p>• Total Annual Tax = $9,890.69 (SE Tax) + $6,153.02 (Fed Tax) = $16,043.71</p>
                <p>• Quarterly Payment Voucher = $16,043.71 ÷ 4 = $4,010.93 per quarter</p>
                <p>• Effective Tax Rate = ($16,043.71 ÷ $80,000.00) × 100 = 20.1%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: IRS Payment Calendar */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Quarterly Payment Schedule & Deadlines
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            The IRS divides estimated tax payments into 4 specific payment periods throughout the calendar year:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Q1 Payment</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm mt-0.5">April 15</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Covers Jan 1 – Mar 31</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white block mt-2">
                {formatCurrency(baseResult.quarterlyPayment)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Q2 Payment</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm mt-0.5">June 15</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Covers Apr 1 – May 31</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white block mt-2">
                {formatCurrency(baseResult.quarterlyPayment)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Q3 Payment</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm mt-0.5">September 15</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Covers Jun 1 – Aug 31</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white block mt-2">
                {formatCurrency(baseResult.quarterlyPayment)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Q4 Payment</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm mt-0.5">January 15</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Covers Sep 1 – Dec 31</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white block mt-2">
                {formatCurrency(baseResult.quarterlyPayment)}
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Scenario FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Why does the calculator multiply net profit by 92.35% for SE tax?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                IRS Schedule SE gives self-employed individuals an equivalent deduction to the employer portion of payroll taxes by assessing self-employment tax on only 92.35% of net earnings (100% minus 7.65%), rather than 100% of profits.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Can I deduct business expenses even if I take the standard deduction?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! Business write-offs are reported on Schedule C to determine your net profit (an “above-the-line” deduction). The standard deduction is then subtracted afterward from your adjusted gross income to determine your federal income tax base. You receive the full benefit of both.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Are quarterly payments required to be equal?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Most freelancers use the regular installment method, paying 4 equal vouchers based on annual estimates. However, if your earnings are seasonal or concentrated in certain quarters, the IRS also permits the Annualized Income Installment Method to match payments closer to when revenue is earned.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Calculate Your Personal 4 Quarterly Vouchers</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Plug your exact gross earnings, write-offs, and filing status into the live calculator to see your precise Schedule SE profit, federal brackets, and quarterly payment amounts.
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
              href={`${prefix}/tools/freelancer-tax-calculator/scenarios/how-income-changes-affect-quarterly-estimates`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Income Changes Affect Your Quarterly Estimate
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
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
