import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Briefcase, ArrowRight, HelpCircle, CheckCircle, TrendingUp } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculate401k,
  formatCurrency,
  formatPercent,
} from '@/data/401k-scenarios-data';

interface FourOhOneKEmployerMatchViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Data ──────────────────────────────────────────────── */
const BASE_CURRENT_AGE = 30;
const BASE_RETIREMENT_AGE = 65;
const BASE_CURRENT_BALANCE = 10_000;
const BASE_SALARY = 60_000;
const BASE_SALARY_GROWTH = 3;
const BASE_RETURN = 7;
const BASE_EMPLOYEE_CONTRIB = 6;

const MATCH_SCENARIOS = [
  {
    name: 'No Match (0%)',
    description: 'Self-funded contributions only',
    employerMatchPct: 0,
    employerMatchLimitPct: 0,
    effectiveMatchPct: 0,
  },
  {
    name: '50% Match up to 6%',
    description: 'Company contributes $0.50 per $1.00 saved (3% of pay)',
    employerMatchPct: 50,
    employerMatchLimitPct: 6,
    effectiveMatchPct: 3,
  },
  {
    name: '100% Match up to 3%',
    description: 'Dollar-for-dollar match capped at 3% of salary',
    employerMatchPct: 100,
    employerMatchLimitPct: 3,
    effectiveMatchPct: 3,
  },
  {
    name: '100% Match up to 6%',
    description: 'Full dollar-for-dollar match on full 6% contribution',
    employerMatchPct: 100,
    employerMatchLimitPct: 6,
    effectiveMatchPct: 6,
  },
] as const;

const SCENARIO_RESULTS = MATCH_SCENARIOS.map((scenario) => {
  const result = calculate401k({
    currentAge: BASE_CURRENT_AGE,
    retirementAge: BASE_RETIREMENT_AGE,
    currentBalance: BASE_CURRENT_BALANCE,
    annualSalary: BASE_SALARY,
    employeeContribPct: BASE_EMPLOYEE_CONTRIB,
    employerMatchPct: scenario.employerMatchPct,
    employerMatchLimitPct: scenario.employerMatchLimitPct,
    annualReturnPct: BASE_RETURN,
    salaryGrowthPct: BASE_SALARY_GROWTH,
  });

  if ('error' in result) {
    throw new Error(`Calculation error: ${result.error}`);
  }

  return {
    ...scenario,
    result,
  };
});

export default function FourOhOneKEmployerMatchView({
  locale = DEFAULT_LOCALE,
}: FourOhOneKEmployerMatchViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('401k-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || '401(k) Calculator';

  const noMatch = SCENARIO_RESULTS[0];
  const standardMatch = SCENARIO_RESULTS[1]; // 50% up to 6% (3% effective)

  const matchAdvantage = standardMatch.result.projectedBalance - noMatch.result.projectedBalance;
  const matchGrowthAdvantage = standardMatch.result.totalInvestmentGrowth - noMatch.result.totalInvestmentGrowth;

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
        <Link href={`${prefix}/tools/401k-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/401k-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Employer Match Growth
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
        <Briefcase className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Employer Match Affects Your 401(k) Growth
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Examine how company matching contributions act as an immediate guaranteed return on payroll deductions and compound into hundreds of thousands of dollars in extra retirement wealth over a 35-year career.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Economics of Employer Matching */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Two-Fold Power of an Employer 401(k) Match
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An employer match is one of the most powerful wealth-building tools available to employees. When your employer offers a matching contribution, you benefit in two distinct ways:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 dark:text-orange-300 mb-1 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-[#f97316]" />
                1. Instant 50% to 100% Return
              </h3>
              <p className="text-xs text-orange-900 dark:text-orange-200/80 leading-relaxed">
                If your company matches 50 cents on the dollar, you earn an instant 50% return on your contribution before any market returns occur. A dollar-for-dollar match provides an immediate 100% gain on that portion of your savings.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                2. Multi-Decade Compound Growth
              </h3>
              <p className="text-xs text-blue-900 dark:text-blue-200/80 leading-relaxed">
                Employer match dollars do not sit idle in cash. They are invested in the same portfolio, compounding year after year. Over a 30- to 35-year career, the investment earnings generated by matching dollars often exceed the match contributions themselves.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Worked Example: 35-Year Career Projection
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: Age 30 to 65 (35-year horizon), $10,000 starting balance, $60,000 starting salary, 3% annual salary increases, 7% constant annual investment return, and a 6% employee elective deferral ($3,600 in Year 1). All values are pre-tax nominal amounts computed by the HelloTools 401(k) engine.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 border border-gray-150 dark:border-gray-800 mb-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Time Horizon:</span>
              <span className="font-bold">35 Years (Age 30 to 65)</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Starting Salary / Annual Growth:</span>
              <span className="font-bold">$60,000 / 3.0% per year</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Employee Elective Deferral:</span>
              <span className="font-bold">6% of salary ($217,663 total contributed)</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Assumed Annual Portfolio Return:</span>
              <span className="font-bold">7.0% (compounded beginning-of-year)</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>Ending Balance without Employer Match:</span>
              <span className="text-slate-700 dark:text-slate-300">{formatCurrency(noMatch.result.projectedBalance)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>Ending Balance with 50% Match (up to 6%):</span>
              <span className="text-[#1a3c5e] dark:text-blue-400">{formatCurrency(standardMatch.result.projectedBalance)}</span>
            </div>
            <div className="flex justify-between items-center text-orange-700 dark:text-orange-400 font-bold pt-1 text-sm border-t border-dashed border-gray-200 dark:border-gray-700">
              <span>Net Wealth Added by Employer Match:</span>
              <span>+{formatCurrency(matchAdvantage)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Employer Match Deposited</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(standardMatch.result.totalEmployerContribs)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Direct company contributions</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Growth Generated by Match</span>
              <div className="text-xl font-extrabold mt-1 text-orange-300">+{formatCurrency(matchGrowthAdvantage)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">Compound growth on match dollars</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Total Value of Match</span>
              <div className="text-xl font-extrabold mt-1 text-green-300">+{formatCurrency(matchAdvantage)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">3.48× return on match deposits</span>
            </div>
          </div>
        </section>

        {/* Section 3: Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Comparative Analysis: 401(k) Balances Across Match Formulas
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare how different employer matching structures alter lifetime deposits, investment growth, and the final projected nest egg at age 65.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Match Structure</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Effective Match</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Employee Contribs</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Employer Contribs</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Investment Growth</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Projected Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {SCENARIO_RESULTS.map((row, idx) => {
                  const isHighlighted = idx === 1; // 50% match up to 6%
                  return (
                    <tr key={row.name} className={isHighlighted ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                      <td className="py-3 px-3 text-gray-900 dark:text-white font-sans">
                        <div className="font-semibold">{row.name}</div>
                        <div className="text-[11px] text-gray-500 font-normal">{row.description}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatPercent(row.effectiveMatchPct)}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.result.totalEmployeeContribs)}</td>
                      <td className="py-3 px-3 text-green-600 dark:text-green-400 font-bold">{formatCurrency(row.result.totalEmployerContribs)}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.result.totalInvestmentGrowth)}</td>
                      <td className="py-3 px-3 text-right text-[#1a3c5e] dark:text-blue-400 font-bold text-sm">
                        {formatCurrency(row.result.projectedBalance)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Key Insights */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            What These Calculations Reveal for Retirement Savers
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              <strong>1. The Full Match Should Be Your Minimum Baseline:</strong> Contributing below the threshold required to capture your company&apos;s full match leaves compensation on the table. In our benchmark case, capturing the 3% effective match added over $378,000 to the employee&apos;s ending balance.
            </p>
            <p>
              <strong>2. Employer Contributions Are Not Subject to Elective Deferral Caps:</strong> In 2026, employees can defer up to $24,500 of their salary. Employer matching contributions do not count toward this employee deferral limit, allowing your total annual 401(k) savings to exceed the individual employee cap.
            </p>
            <p>
              <strong>3. Nominal, Pre-Tax Balances:</strong> All results displayed here reflect traditional pre-tax 401(k) accumulations. Withdrawals during retirement are generally subject to ordinary income taxes, and future purchasing power will depend on real-world inflation over the 35-year accumulation period.
            </p>
          </div>
        </section>

        {/* Mid-Content Ad */}
        <AdBanner
          adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_2 || ''}
          width={300}
          height={250}
        />

        {/* Section 5: FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions About 401(k) Employer Matches
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'What is a typical employer 401(k) match formula?',
                a: 'The most common corporate matching formula in the United States is 50% of employee contributions up to 6% of salary (an effective 3% match). Another common variation is a 100% dollar-for-dollar match up to 3% to 5% of pay.',
              },
              {
                q: 'How does the calculator compute employer matching contributions?',
                a: 'The calculator identifies the matched portion of your contribution as the lesser of your employee contribution rate and the employer match cap percentage. It then multiplies that matched percentage by the employer match rate and your annual salary: salary × min(employeePct, matchLimitPct) × (matchPct / 100).',
              },
              {
                q: 'Do employer match contributions count toward the 2026 IRS $24,500 contribution limit?',
                a: 'No. The 2026 elective deferral limit of $24,500 applies exclusively to employee contributions. Employer contributions count toward the broader overall Section 415(c) annual additions limit, which is significantly higher ($70,000 in recent tax years).',
              },
              {
                q: 'Why does the employer match generate so much investment growth in the simulation?',
                a: 'Because the employer match is deposited each year alongside employee contributions and compounded over decades at the assumed 7% annual return. Over 35 years, compound interest on the $108,832 in company matches produces $269,758 in additional investment gains.',
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

        {/* Educational Disclaimer */}
        <DisclaimerBox type="finance" />

        {/* Section 6: Next Steps and Related Tools */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Explore Related Financial Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/401k-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              Open 401(k) Calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/401k-calculator/scenarios`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              View All 401(k) Scenarios
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
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/salary-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Salary Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/how-much-will-401k-be-worth-at-65"
              className="text-[#f97316] hover:underline font-semibold"
            >
              How Much Will My 401(k) Be Worth at Age 65?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
