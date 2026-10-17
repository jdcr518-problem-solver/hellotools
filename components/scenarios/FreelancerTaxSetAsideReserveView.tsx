import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, PiggyBank, ArrowRight, HelpCircle, CheckCircle, Percent, AlertCircle } from 'lucide-react';
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

interface FreelancerTaxSetAsideReserveViewProps {
  locale?: Locale;
}

/* ── Benchmark Profiles Based on $80,000 Annual Gross Revenue ────────────── */
const BASE_GROSS = 80_000;

const PROFILES = [
  {
    key: 'low-overhead',
    name: 'Low Overhead Freelancer',
    description: 'Minimal deductible expenses ($5,000/yr) — e.g., remote writer, translator, digital marketer',
    expenses: 5_000,
    includeState: false,
    stateRate: 0,
    stateLabel: '0% State Tax',
    recommendedReservePct: 25,
  },
  {
    key: 'moderate-overhead',
    name: 'Typical Freelancer (Default)',
    description: 'Standard deductible write-offs ($10,000/yr) — e.g., software, gear, home office, travel',
    expenses: 10_000,
    includeState: false,
    stateRate: 0,
    stateLabel: '0% State Tax',
    recommendedReservePct: 22,
  },
  {
    key: 'high-overhead',
    name: 'Higher Overhead Freelancer',
    description: 'Substantial deductible costs ($20,000/yr) — e.g., equipment leases, studio, subcontracting',
    expenses: 20_000,
    includeState: false,
    stateRate: 0,
    stateLabel: '0% State Tax',
    recommendedReservePct: 18,
  },
  {
    key: 'state-tax-ca',
    name: 'Freelancer with State Income Tax',
    description: 'Standard expenses ($10,000/yr) located in a state with income tax (~9.3% CA benchmark)',
    expenses: 10_000,
    includeState: true,
    stateRate: 9.3,
    stateLabel: '9.3% State Tax (CA)',
    recommendedReservePct: 28,
  },
] as const;

const PROFILE_RESULTS = PROFILES.map((p) => {
  const result = calculateFreelancerTax({
    taxYear: '2024',
    grossIncome: BASE_GROSS,
    expenses: p.expenses,
    filingStatus: 'single',
    includeState: p.includeState,
    stateTaxRate: p.stateRate,
  });

  return {
    ...p,
    result,
  };
});

export default function FreelancerTaxSetAsideReserveView({
  locale = DEFAULT_LOCALE,
}: FreelancerTaxSetAsideReserveViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('freelancer-tax-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Freelancer Quarterly Tax Calculator';

  const defaultProfile = PROFILE_RESULTS[1]; // $80,000 gross, $10,000 expenses

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
          Set-Aside Percentage Reserve
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
        <PiggyBank className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Much Should I Set Aside From Each Freelance Payment?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            A practical guide to implementing a percentage-based tax reserve from every client invoice to ensure full coverage of self-employment tax, federal income tax, and quarterly estimated vouchers.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Core Reserve Rule */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Percentage-Based Tax Reserve Rule
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Unlike salaried employees whose taxes are withheld from each paycheck, 1099 independent contractors receive the entire gross invoice amount. Without setting funds aside immediately, quarterly deadlines can create unexpected cash shortages.
          </p>
          <div className="p-4 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 text-xs text-orange-950 dark:text-orange-200">
            <span className="font-bold block text-sm mb-1">
              General Benchmark: Reserve 20% to 30% of Every Invoiced Dollar
            </span>
            <span>
              Your true effective tax rate depends on your gross revenue, business write-offs, and state tax rate. For a single filer with $80,000 gross income and $10,000 expenses, the calculator determines an effective tax rate of <strong>20.1%</strong> ($16,043.71 total tax / $80,000 gross). Reserving 22% to 25% provides an automatic buffer for quarterly payments.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                <Percent className="h-4 w-4 text-blue-500" />
                Where Does the Reserve Money Go?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Roughly 15.3% covers your Self-Employment (SE) tax obligation (Social Security and Medicare), while the remaining portion covers your progressive federal and state income tax brackets after the standard deduction.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Why Deductible Expenses Lower the Rate
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Eligible business write-offs directly reduce net profit before SE tax and income tax are calculated. The higher your verified business expenses, the lower your effective tax percentage of gross revenue.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Worked Example ($2,000 Invoice Breakdown) */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Worked Numerical Example: Handling a $2,000 Client Payment
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: 2024 single filer, $80,000 projected gross income, $10,000 annual business expenses (12.5% expense ratio), 0% state tax rate.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Gross Client Payment</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                $2,000.00
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Single client invoice received</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
              <span className="text-xs text-amber-700 dark:text-amber-400 block font-semibold">
                Tax Reserve (22% allocation)
              </span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1 block">
                $440.00
              </span>
              <span className="text-[11px] text-amber-700/80 dark:text-amber-300/80 block mt-1">
                Moved to dedicated tax sub-account
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 block font-semibold">
                Available Operating Cash
              </span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                $1,560.00
              </span>
              <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80 block mt-1">
                For personal take-home and overhead
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs space-y-2">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Full-Year Projected Gross Revenue:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">$80,000.00</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Full-Year Business Write-Offs:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">-$10,000.00</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Estimated Annual Total Tax:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {formatCurrency(defaultProfile.result.totalAnnualTax)}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Exact Effective Tax Rate:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {formatPercent(defaultProfile.result.effectiveTaxRate)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700 font-bold">
              <span className="text-slate-900 dark:text-white">Quarterly Voucher Payment (4x / year):</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                {formatCurrency(defaultProfile.result.quarterlyPayment)}
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Comparison Table across Overhead and State Profiles */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Overhead and State Tax Impact on Recommended Reserve Percentage
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            All cases model $80,000 annual gross revenue for a 2024 single filer using the exact HelloTools calculator logic.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/75 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Profile</th>
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Write-Offs</th>
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Net Profit</th>
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Annual Tax</th>
                  <th className="py-3 px-3 font-bold text-gray-900 dark:text-white">Quarterly Voucher</th>
                  <th className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">Effective Rate</th>
                  <th className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">Suggested Reserve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {PROFILE_RESULTS.map((row) => (
                  <tr key={row.key} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="py-3 px-3 font-sans font-semibold text-gray-900 dark:text-white">
                      {row.name}
                      <span className="block text-[10px] text-gray-400 font-normal">{row.stateLabel}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.expenses, 0)}
                    </td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-semibold">
                      {formatCurrency(row.result.netIncome, 0)}
                    </td>
                    <td className="py-3 px-3 text-slate-900 dark:text-white">
                      {formatCurrency(row.result.totalAnnualTax, 0)}
                    </td>
                    <td className="py-3 px-3 text-slate-900 dark:text-white font-semibold">
                      {formatCurrency(row.result.quarterlyPayment, 2)}
                    </td>
                    <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">
                      {formatPercent(row.result.effectiveTaxRate)}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                      {row.recommendedReservePct}% of gross
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Practical Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Practical Implementation Guidelines
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>
                <strong>Maintain a separate tax bank account:</strong> Transfer your reserve percentage immediately upon receiving any client invoice payment. Keeping tax funds isolated prevents accidental spending during dry months.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>
                <strong>Track write-offs consistently:</strong> Every $1,000 in legitimate business deductions reduces your net taxable profit, lowering both self-employment tax and federal income tax obligations.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>
                <strong>Review estimates mid-year:</strong> If your monthly revenue increases significantly beyond your initial annual projection, adjust your quarterly payments upward to avoid underpayment penalties at year-end.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Scenario FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Is setting aside 25% to 30% enough if I also have state income tax?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                In states with moderate to high income tax (such as California, New York, or Oregon), your combined effective tax burden often reaches 25% to 28% of gross revenue at an $80k income level. Setting aside 28% to 30% covers both federal self-employment, federal income, and state obligations comfortably.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                What if my freelance income fluctuates wildly each month?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A percentage-based system naturally adapts to irregular income. When you bill $10,000 in a busy month, you set aside $2,200 (at 22%). When you bill $2,000 in a slow month, you set aside $440. By the time quarterly payments arrive on April 15, June 15, September 15, and January 15, your reserve account reflects your actual earnings.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Does the calculator include self-employment deductions in its reserve calculation?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. The calculator accounts for Schedule SE rules (taxing 92.35% of net profit), computes the 50% deduction of self-employment tax from adjusted gross income, and incorporates your filing status standard deduction before deriving your effective tax rate.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Calculate Your Specific Tax Reserve</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Enter your own projected gross revenue, eligible write-offs, and state tax rate into the live calculator to determine your personalized effective tax rate and quarterly vouchers.
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
              href={`${prefix}/tools/freelancer-tax-calculator/scenarios/how-quarterly-estimated-payments-are-calculated`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Quarterly Estimated Payments Are Calculated
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
