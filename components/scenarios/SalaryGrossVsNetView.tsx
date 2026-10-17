import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Wallet, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateSalaryBreakdown,
  formatCurrency,
  formatPercent,
} from '@/data/salary-scenarios-data';

interface SalaryGrossVsNetViewProps {
  locale?: Locale;
}

/* ── Benchmark Salary Tiers with Verified Gross Conversions ──────────────── */
const SALARY_TIERS = [
  { annualGross: 45_000, label: 'Entry Career ($45k)', estTaxPct: 18.5 },
  { annualGross: 65_000, label: 'Mid-Level Professional ($65k)', estTaxPct: 22.0 },
  { annualGross: 85_000, label: 'Senior Professional ($85k)', estTaxPct: 24.5 },
  { annualGross: 110_000, label: 'Lead / Management ($110k)', estTaxPct: 27.5 },
  { annualGross: 140_000, label: 'Executive Tier ($140k)', estTaxPct: 30.0 },
] as const;

const ROWS = SALARY_TIERS.map((tier) => {
  const breakdown = calculateSalaryBreakdown(tier.annualGross, 'year', 40);
  const estTotalWithholding = tier.annualGross * (tier.estTaxPct / 100);
  const estAnnualNet = tier.annualGross - estTotalWithholding;
  const estMonthlyNet = estAnnualNet / 12;
  const estBiweeklyNet = estAnnualNet / 26;

  return {
    ...tier,
    grossYearly: breakdown.annualSalary,
    grossMonthly: breakdown.monthly,
    grossBiweekly: breakdown.biweekly,
    grossHourly: breakdown.hourly,
    estTotalWithholding,
    estAnnualNet,
    estMonthlyNet,
    estBiweeklyNet,
  };
});

export default function SalaryGrossVsNetView({
  locale = DEFAULT_LOCALE,
}: SalaryGrossVsNetViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('salary-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Salary Calculator';

  // Base worked example ($65,000 annual)
  const baseCase = ROWS[1];

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
        <Link href={`${prefix}/tools/salary-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/salary-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Gross vs Take-Home Salary
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
        <Wallet className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Gross Salary vs Take-Home Salary: What You Actually Keep
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Understand why your paycheck direct deposit is less than your contractual pay rate. Learn how mandatory taxes, payroll deductions, and retirement contributions separate gross wages from net take-home earnings.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Fundamental Concept */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Difference Between Gross Pay and Net Take-Home Pay
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When an employer offers you a job offer letter or annual contract, the headline figure is almost always your <strong>Gross Salary</strong>. However, the amount that lands in your checking account on payday is your <strong>Net Take-Home Pay</strong>. Understanding this distinction is essential for realistic household budgeting:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Gross Salary (Contractual Earnings)
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                The total compensation agreed upon with your employer prior to any withholdings, taxes, or benefits deductions. This is the baseline converted by the HelloTools Salary Calculator across hourly, weekly, bi-weekly, monthly, and yearly frequencies.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Net Take-Home Pay (Spendable Income)
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                The actual dollar amount disbursed into your bank account after mandatory statutory taxes (income tax, FICA/Social Security & Medicare) and optional pre-tax deductions (health insurance premiums, HSA/FSA, 401(k) contributions) are deducted.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Fundamental Paycheck Formula:
            </span>
            Take-Home (Net) Pay = Gross Salary − Mandatory Taxes (Federal, State, FICA) − Voluntary Deductions (Health, 401(k))
          </div>
        </section>

        {/* Section 2: Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Worked Numerical Example: $65,000 Gross Annual Salary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
            In this example, an employee earns an annual gross salary of <strong>$65,000</strong> working 40 hours per week over 52 weeks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                Gross Monthly Pay
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatCurrency(baseCase.grossMonthly)}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                $65,000 ÷ 12 months ($31.25/hr)
              </p>
            </div>

            <div className="p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/20 dark:bg-red-950/20">
              <span className="text-xs text-red-600 dark:text-red-400 uppercase font-semibold">
                Est. Monthly Deductions & Taxes
              </span>
              <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">
                {formatCurrency(baseCase.estTotalWithholding / 12)}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                ~22.0% composite rate (FICA + Income Tax)
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/20">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                Est. Monthly Take-Home Pay
              </span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {formatCurrency(baseCase.estMonthlyNet)}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Estimated net spendable cash per month
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-slate-50/60 dark:bg-gray-800/30 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <p className="font-semibold text-gray-900 dark:text-white">
              Paycheck Conversion Breakdown for this Example:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Bi-weekly gross pay:</strong> $2,500.00 (26 pay periods per year)</li>
              <li><strong>Bi-weekly estimated net take-home:</strong> ~{formatCurrency(baseCase.estBiweeklyNet)}</li>
              <li><strong>Weekly gross pay:</strong> $1,250.00 (52 pay weeks per year)</li>
              <li><strong>Hourly wage equivalent:</strong> $31.25 per hour (at 40 regular hours/week)</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Gross vs Estimated Net Take-Home Across Income Tiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
            The table below demonstrates how gross earnings convert across monthly and bi-weekly frequencies and illustrates representative net take-home ranges after standard tax deductions.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-3 px-4">Income Tier</th>
                  <th className="py-3 px-4 text-right">Gross Annual</th>
                  <th className="py-3 px-4 text-right">Gross Monthly</th>
                  <th className="py-3 px-4 text-right">Gross Bi-Weekly</th>
                  <th className="py-3 px-4 text-right">Est. Withholding</th>
                  <th className="py-3 px-4 text-right font-bold text-emerald-700 dark:text-emerald-400">
                    Est. Monthly Net
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {ROWS.map((row) => (
                  <tr
                    key={row.annualGross}
                    className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/20 ${
                      row.annualGross === baseCase.annualGross ? 'bg-orange-50/30 dark:bg-orange-950/10 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-sans font-medium text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.grossYearly)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.grossMonthly)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                      {formatCurrency(row.grossBiweekly)}
                    </td>
                    <td className="py-3 px-4 text-right text-red-600 dark:text-red-400">
                      ~{formatPercent(row.estTaxPct)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(row.estMonthlyNet)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            * Note: Gross conversions are exact mathematical distributions from the HelloTools Salary Calculator. Estimated net amounts reflect typical single filer composite withholding brackets (FICA + federal + state income tax) and vary based on personal tax filing status, exemptions, local taxes, and voluntary benefit deductions.
          </p>
        </section>

        {/* Section 4: Assumptions and Scope */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Calculator Scope and Important Assumptions
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              <strong>Gross Conversion Logic:</strong> The HelloTools Salary Calculator converts wages strictly on a gross basis. It uses the standard accounting baseline of 52 weeks per year, 26 bi-weekly periods, 12 months, 260 working days (5 days/week), and 2,080 working hours (at 40 hours per week).
            </p>
            <p>
              <strong>What the Calculator Excludes:</strong> The main Salary Calculator intentionally excludes jurisdiction-specific income tax schedules, local surcharges, retirement 401(k) elective deferrals, union dues, flexible spending accounts, and health insurance copays. Because individual tax situations differ widely by location, marital status, and dependents, those factors are analyzed in dedicated tax calculators.
            </p>
            <p>
              <strong>No Personalized Tax Advice:</strong> Figures displayed in these scenarios are educational estimates. For binding payroll withholdings or tax filings, consult official tax forms (such as IRS Form W-4) or a qualified certified tax professional.
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
                q: 'Why is my paycheck direct deposit so much lower than my gross salary rate?',
                a: 'Employers are required by law to withhold federal, state, and payroll taxes (such as Social Security and Medicare) before issuing payment. Additionally, any voluntary pre-tax deductions you enrolled in—such as employee health insurance premiums, dental plans, HSA/FSA contributions, and 401(k) retirement contributions—are subtracted from your gross compensation.',
              },
              {
                q: 'What is the difference between pre-tax and post-tax deductions?',
                a: 'Pre-tax deductions (such as traditional 401(k) contributions and health insurance premiums) are subtracted from your gross income before income taxes are computed, lowering your overall taxable earnings. Post-tax deductions (such as Roth 401(k) contributions or wage garnishments) are deducted after all statutory taxes have been withheld.',
              },
              {
                q: 'Why does the HelloTools Salary Calculator calculate gross pay rather than net pay?',
                a: 'Gross pay is an objective mathematical conversion that applies universally regardless of location or household status. Net take-home pay depends heavily on individual filing status, state and municipal tax jurisdictions, deductions, and exemptions. For net tax modeling, explore our dedicated Tax Calculator.',
              },
              {
                q: 'How do overtime hours affect my gross versus take-home salary?',
                a: 'Under standard non-exempt labor laws, hours worked beyond 40 per week are typically compensated at 1.5 times your standard hourly rate (time-and-a-half). While this increases your total gross earnings, the additional income may be withheld at a higher marginal bracket for that specific pay cycle.',
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
              href={`${prefix}/tools/salary-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open Salary Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/salary-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All Salary Scenarios
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
