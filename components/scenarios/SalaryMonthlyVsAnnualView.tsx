import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Calendar, ArrowRight, HelpCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateSalaryBreakdown,
  formatCurrency,
} from '@/data/salary-scenarios-data';

interface SalaryMonthlyVsAnnualViewProps {
  locale?: Locale;
}

/* ── Benchmark Monthly Salaries with Verified Calculation Breakdown ─────── */
const MONTHLY_TIERS = [
  { monthlyWage: 2_500, label: 'Entry Level ($2,500/mo)' },
  { monthlyWage: 4_000, label: 'Mid Associate ($4,000/mo)' },
  { monthlyWage: 5_000, label: 'Standard Full-Time ($5,000/mo)' },
  { monthlyWage: 6_500, label: 'Senior Professional ($6,500/mo)' },
  { monthlyWage: 8_500, label: 'Lead Specialist ($8,500/mo)' },
  { monthlyWage: 12_000, label: 'Executive ($12,000/mo)' },
] as const;

const ROWS = MONTHLY_TIERS.map((tier) => {
  const res = calculateSalaryBreakdown(tier.monthlyWage, 'month', 40);
  return {
    ...tier,
    annual: res.annualSalary,
    monthly: res.monthly,
    biweekly: res.biweekly,
    weekly: res.weekly,
    daily: res.daily,
    hourly: res.hourly,
  };
});

export default function SalaryMonthlyVsAnnualView({
  locale = DEFAULT_LOCALE,
}: SalaryMonthlyVsAnnualViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('salary-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Salary Calculator';

  // Base worked example ($5,000/month = $60,000/year)
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
        <Link href={`${prefix}/tools/salary-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/salary-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Monthly vs Annual Salary Conversion
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
        <Calendar className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Monthly vs Annual Salary Conversion: How to Convert Pay Accurately
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Learn how monthly salaries translate into annual wages, bi-weekly paychecks, weekly pay, and hourly rates. Avoid common calculation pitfalls when converting job compensation packages.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Core Conversion Formulas */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Monthly and Annual Salaries Are Calculated
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A common mistake when evaluating compensation is assuming that a month contains exactly 4 weeks. In reality, with 52 weeks in a calendar year, an average month contains <strong>4.333 weeks</strong> (52 ÷ 12). The HelloTools Salary Calculator uses standard financial payroll conventions to guarantee exact proportional conversions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Monthly to Annual
              </span>
              <p className="text-sm font-mono text-gray-900 dark:text-white font-semibold">
                Annual Salary = Monthly Wage × 12
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Twelve equal calendar billing cycles establish the baseline yearly earnings.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
                Annual to Bi-Weekly
              </span>
              <p className="text-sm font-mono text-gray-900 dark:text-white font-semibold">
                Bi-Weekly Pay = Annual Salary ÷ 26
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Paid every two weeks, generating 26 pay periods rather than 24 semi-monthly periods.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Annual to Weekly
              </span>
              <p className="text-sm font-mono text-gray-900 dark:text-white font-semibold">
                Weekly Pay = Annual Salary ÷ 52
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                52 discrete weekly pay periods per solar calendar year.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Annual to Hourly
              </span>
              <p className="text-sm font-mono text-gray-900 dark:text-white font-semibold">
                Hourly Wage = Annual Salary ÷ (Hours/Week × 52)
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Divided by 2,080 annual working hours for standard 40-hour workweeks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Worked Example: $5,000 per Month Conversion
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
            Inputting <strong>$5,000 monthly</strong> into the HelloTools Salary Calculator with standard 40 hours per week yields the following verified breakdown:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/20">
              <span className="text-xs text-blue-700 dark:text-blue-400 uppercase font-semibold">
                Annual Gross
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatCurrency(baseCase.annual)}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                $5,000 × 12 months
              </p>
            </div>

            <div className="p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 bg-orange-50/30 dark:bg-orange-950/20">
              <span className="text-xs text-[#f97316] uppercase font-semibold">
                Bi-Weekly Pay
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatCurrency(baseCase.biweekly)}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                $60,000 ÷ 26 pay periods
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                Weekly Pay
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatCurrency(baseCase.weekly)}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                $60,000 ÷ 52 weeks
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                Daily Pay (5-day week)
              </span>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {formatCurrency(baseCase.daily)}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                $60,000 ÷ 260 work days
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 col-span-2 sm:col-span-2">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
                Hourly Equivalent (40h/week)
              </span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
                {formatCurrency(baseCase.hourly)} / hour
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                $60,000 ÷ 2,080 annual working hours
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>The 4-Week Month Pitfall:</strong> If you divide $5,000 by 4, you get $1,250 per week ($65,000/yr)—an overstatement of $5,000 per year! Because there are 52 weeks in a year (not 48), true weekly compensation for a $5,000/month salary is <strong>$1,153.85</strong>.
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Salary Conversion Reference Table
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
            Compare how monthly wage levels translate across annual, bi-weekly, weekly, daily, and hourly benchmarks based on 40 hours per week and 52 weeks per year.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-3 px-4">Pay Tier</th>
                  <th className="py-3 px-4 text-right">Monthly</th>
                  <th className="py-3 px-4 text-right font-bold text-blue-700 dark:text-blue-400">
                    Annual Gross
                  </th>
                  <th className="py-3 px-4 text-right">Bi-Weekly (26x)</th>
                  <th className="py-3 px-4 text-right">Weekly (52x)</th>
                  <th className="py-3 px-4 text-right">Hourly (40h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {ROWS.map((row) => (
                  <tr
                    key={row.monthlyWage}
                    className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/20 ${
                      row.monthlyWage === baseCase.monthlyWage ? 'bg-orange-50/30 dark:bg-orange-950/10 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-sans font-medium text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                      {formatCurrency(row.monthly)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-blue-700 dark:text-blue-400">
                      {formatCurrency(row.annual)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                      {formatCurrency(row.biweekly)}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                      {formatCurrency(row.weekly)}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                      {formatCurrency(row.hourly)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            * All figures represent pre-tax gross compensation. Conversions are calculated with mathematical precision: Annual = Monthly × 12, Bi-weekly = Annual ÷ 26, Weekly = Annual ÷ 52, Daily = Annual ÷ 260, Hourly = Annual ÷ (WeeklyHours × 52).
          </p>
        </section>

        {/* Section 4: Assumptions and Scope */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Conversion Assumptions and Methodology
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              <strong>Standard Work Hours:</strong> Standard full-time employment is defined as 40 hours per week across 52 weeks, equaling 2,080 annual working hours. If your standard workweek is 35, 37.5, or 45 hours, adjust the &quot;Hours Per Week&quot; field in the Salary Calculator to receive a tailored hourly rate.
            </p>
            <p>
              <strong>Working Days Per Year:</strong> Assuming a standard 5-day Monday through Friday schedule, there are 260 working days per year (52 weeks × 5 days). Depending on calendar alignment and leap years, actual calendar years contain 260, 261, or occasionally 262 weekdays.
            </p>
            <p>
              <strong>Paid vs Unpaid Time Off:</strong> Calculations assume standard paid employment contracts where holiday and PTO days are compensated. If you are an hourly contractor without paid time off, multiply your hourly rate only by the actual billable hours worked.
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
                q: 'Why is weekly pay not simply my monthly salary divided by 4?',
                a: 'Only February in a non-leap year has exactly 28 days (4 weeks). Every other calendar month has 30 or 31 days (4.28 to 4.43 weeks). Dividing by 4 accounts for only 48 weeks, missing 4 full weeks of salary over the course of the year.',
              },
              {
                q: 'What is a bi-weekly paycheck schedule and why do 2 months have 3 paychecks?',
                a: 'A bi-weekly payroll system distributes paychecks every two weeks, resulting in 26 pay periods per year (52 weeks ÷ 2). Because 26 paychecks divided across 12 months equals 2.167 paychecks per month, exactly two months every year contain three paychecks instead of two.',
              },
              {
                q: 'How many total working hours are counted in a full-time year?',
                a: 'A standard full-time employee working 40 hours per week logs 2,080 hours per year (40 hours × 52 weeks). This benchmark is used widely across corporate compensation planning and federal wage guidelines.',
              },
              {
                q: 'How do salaried contracts compare to hourly wage contracts?',
                a: 'Salaried contracts establish an agreed annual compensation figure regardless of whether a given workweek requires 38 or 44 hours (subject to exempt labor rules). Hourly employees are paid for exact recorded hours worked, often receiving 1.5x overtime for hours exceeding 40 per week.',
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
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/mortgage-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Mortgage Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/choose-best-personal-loan"
              className="text-[#f97316] hover:underline font-semibold"
            >
              How to Choose the Best Personal Loan for Your Needs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
