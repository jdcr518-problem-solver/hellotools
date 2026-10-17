import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Clock, ArrowRight, HelpCircle, TrendingUp, Calendar } from 'lucide-react';
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

interface FourOhOneKTimeAndGrowthViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Data ──────────────────────────────────────────────── */
const BASE_RETIREMENT_AGE = 65;
const BASE_CURRENT_BALANCE = 10_000;
const BASE_SALARY = 60_000;
const BASE_SALARY_GROWTH = 3;
const BASE_EMPLOYEE_CONTRIB = 6;
const BASE_MATCH_PCT = 100;
const BASE_MATCH_LIMIT_PCT = 3;

// Horizon comparison (Starting at ages 25, 30, 35, 40, 45 to age 65)
const START_AGES = [25, 30, 35, 40, 45] as const;

const HORIZON_SCENARIOS = START_AGES.map((startAge) => {
  const result = calculate401k({
    currentAge: startAge,
    retirementAge: BASE_RETIREMENT_AGE,
    currentBalance: BASE_CURRENT_BALANCE,
    annualSalary: BASE_SALARY,
    employeeContribPct: BASE_EMPLOYEE_CONTRIB,
    employerMatchPct: BASE_MATCH_PCT,
    employerMatchLimitPct: BASE_MATCH_LIMIT_PCT,
    annualReturnPct: 7,
    salaryGrowthPct: BASE_SALARY_GROWTH,
  });

  if ('error' in result) {
    throw new Error(`Calculation error: ${result.error}`);
  }

  const years = BASE_RETIREMENT_AGE - startAge;
  const totalContributions = result.totalEmployeeContribs + result.totalEmployerContribs;

  return {
    startAge,
    years,
    result,
    totalContributions,
  };
});

// Return rate benchmarks at age 30 to 65 (35-year horizon)
const RETURN_RATES = [4, 6, 7, 8, 10] as const;

const RETURN_SCENARIOS = RETURN_RATES.map((annualReturnPct) => {
  const result = calculate401k({
    currentAge: 30,
    retirementAge: BASE_RETIREMENT_AGE,
    currentBalance: BASE_CURRENT_BALANCE,
    annualSalary: BASE_SALARY,
    employeeContribPct: BASE_EMPLOYEE_CONTRIB,
    employerMatchPct: BASE_MATCH_PCT,
    employerMatchLimitPct: BASE_MATCH_LIMIT_PCT,
    annualReturnPct,
    salaryGrowthPct: BASE_SALARY_GROWTH,
  });

  if ('error' in result) {
    throw new Error(`Calculation error: ${result.error}`);
  }

  const totalContributions = result.totalEmployeeContribs + result.totalEmployerContribs;

  return {
    annualReturnPct,
    result,
    totalContributions,
  };
});

export default function FourOhOneKTimeAndGrowthView({
  locale = DEFAULT_LOCALE,
}: FourOhOneKTimeAndGrowthViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('401k-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || '401(k) Calculator';

  const age25Case = HORIZON_SCENARIOS[0]; // Age 25
  const age30Case = HORIZON_SCENARIOS[1]; // Age 30 (benchmark)
  const age35Case = HORIZON_SCENARIOS[2]; // Age 35
  const age45Case = HORIZON_SCENARIOS[4]; // Age 45

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
          Time &amp; Investment Growth
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
        <Clock className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Time and Investment Growth Affect Your 401(k)
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Analyze the mathematical mechanics of compound growth over multi-decade careers. See how starting 10 years earlier dramatically alters your nest egg and how portfolio returns compound into final wealth.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Exponential Curve of Time */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Why Time Is the Strongest Factor in 401(k) Accumulation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Compound interest is non-linear. In the early years of a 401(k), your account balance grows primarily through your own payroll contributions. In later years, however, the returns generated on accumulated past returns far outpace your annual deposits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 dark:text-orange-300 mb-1 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#f97316]" />
                The 10-Year Delay Cost
              </h3>
              <p className="text-xs text-orange-900 dark:text-orange-200/80 leading-relaxed">
                Starting at age 25 rather than age 35 produces a final balance of <strong>$1,841,604</strong> versus <strong>$825,095</strong> at age 65. Delaying by just 10 years cuts the eventual retirement balance by over $1,016,000, even when saving the exact same 6% of salary.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                The Rate of Return Leverage
              </h3>
              <p className="text-xs text-blue-900 dark:text-blue-200/80 leading-relaxed">
                For a 30-year-old saver, an assumed 7% annual return yields <strong>$1,242,536</strong>, with over 72% of the balance ($906,040) resulting from compound interest. Modest differences in annual growth dramatically shape the ending total over a 35-year horizon.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Worked Numerical Example: Horizon Impact */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Worked Example: Starting at 25 vs 30 vs 35 vs 45
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: Target retirement age 65, $10,000 initial balance, $60,000 starting salary with 3% annual salary raises, 6% employee contribution, 100% employer match up to 3% of salary, and a constant 7.0% annual investment return. Computed with the 401(k) calculator engine.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 border border-gray-150 dark:border-gray-800 mb-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Salary / Annual Increase:</span>
              <span className="font-bold">$60,000 starting / 3.0% per year</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Employee Savings / Company Match:</span>
              <span className="font-bold">6% employee / 3% match (9% total annual savings)</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Assumed Annual Return Rate:</span>
              <span className="font-bold">7.0% per year (compounded beginning-of-year)</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>Start at Age 25 (40-year horizon):</span>
              <span className="text-green-600 dark:text-green-400 font-bold">{formatCurrency(age25Case.result.projectedBalance)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>Start at Age 30 (35-year horizon):</span>
              <span className="text-[#1a3c5e] dark:text-blue-400 font-bold">{formatCurrency(age30Case.result.projectedBalance)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>Start at Age 35 (30-year horizon):</span>
              <span className="text-orange-600 dark:text-orange-400 font-bold">{formatCurrency(age35Case.result.projectedBalance)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 text-sm">
              <span>Start at Age 45 (20-year horizon):</span>
              <span className="text-slate-900 dark:text-white font-bold">{formatCurrency(age45Case.result.projectedBalance)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Starting at Age 25</span>
              <div className="text-xl font-extrabold mt-1 text-green-300">{formatCurrency(age25Case.result.projectedBalance)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">77.3% from investment growth</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Starting at Age 30</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(age30Case.result.projectedBalance)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">72.9% from investment growth</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Starting at Age 35</span>
              <div className="text-xl font-extrabold mt-1 text-orange-300">{formatCurrency(age35Case.result.projectedBalance)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">67.6% from investment growth</span>
            </div>
          </div>
        </section>

        {/* Section 3: Time Horizon Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Horizon Comparison Table: Accumulation by Starting Age (to Age 65)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare total career contributions, compound earnings, and ending balances across 20- to 40-year accumulation horizons at 7% annual growth.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Starting Age</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Years to 65</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Total Deposits</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Compound Growth</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Projected Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {HORIZON_SCENARIOS.map((row) => {
                  const isHighlighted = row.startAge === 30;
                  return (
                    <tr key={row.startAge} className={isHighlighted ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                      <td className="py-3 px-3 text-gray-900 dark:text-white font-sans font-semibold">
                        Age {row.startAge}
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{row.years} Years</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.totalContributions)}</td>
                      <td className="py-3 px-3 text-green-600 dark:text-green-400">{formatCurrency(row.result.totalInvestmentGrowth)}</td>
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

        {/* Section 4: Return Rate Benchmark Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Annual Return Rate Comparison (35-Year Horizon, Age 30 to 65)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare ending balances for the same 30-year-old saver across conservative (4%), moderate (6%–7%), and aggressive (8%–10%) average annual return assumptions.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Assumed Annual Return</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Total Deposits</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Compound Growth</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Projected Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {RETURN_SCENARIOS.map((row) => {
                  const isBenchmark = row.annualReturnPct === 7;
                  return (
                    <tr key={row.annualReturnPct} className={isBenchmark ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                      <td className="py-3 px-3 text-gray-900 dark:text-white font-sans font-semibold">
                        {formatPercent(row.annualReturnPct)} per year
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{formatCurrency(row.totalContributions)}</td>
                      <td className="py-3 px-3 text-green-600 dark:text-green-400">{formatCurrency(row.result.totalInvestmentGrowth)}</td>
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

        {/* Section 5: Volatility & Inflation Context */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Important Considerations for Long-Term Projections
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              <strong>1. Constant Return vs. Real Market Fluctuations:</strong> In reality, financial markets experience bull and bear cycles rather than producing a smooth, identical 7% return every calendar year. Sequencing of returns (market drops early vs. late in your career) can affect actual wealth accumulation.
            </p>
            <p>
              <strong>2. Pre-Tax Nominal Totals:</strong> These figures project traditional pre-tax balances without adjusting for inflation or future income tax withholding upon withdrawal. To evaluate what a future $1.24M nest egg can buy in today’s goods and services, use our <strong>Inflation Calculator</strong>.
            </p>
            <p>
              <strong>3. Catch-Up Contributions for Older Savers:</strong> Once you reach age 50, IRS regulations allow catch-up contributions above standard limits. While these baseline scenarios do not include catch-up rules, older savers can accelerate contributions to compensate for shorter time horizons.
            </p>
          </div>
        </section>

        {/* Mid-Content Ad */}
        <AdBanner
          adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_2 || ''}
          width={300}
          height={250}
        />

        {/* Section 6: FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions About Time and 401(k) Growth
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'What is a reasonable annual return assumption for a 401(k)?',
                a: 'Historically, broad stock market benchmarks like the S&P 500 have averaged approximately 10% in nominal annual returns before inflation over long horizons. Many retirement savers use 6% to 8% nominal annual returns to account for diversified asset allocations (stocks and bonds) and fund management expenses.',
              },
              {
                q: 'Why does starting 10 years earlier make such a huge difference?',
                a: 'Compounding is exponential. The contributions made in your 20s compound for 35 to 40 years, doubling multiple times. Contributions made in your 40s only have 15 to 20 years to compound, resulting in far fewer doubling cycles before retirement age.',
              },
              {
                q: 'How does annual compounding work in the 401(k) Calculator?',
                a: 'The calculator assumes beginning-of-year contributions: each year, your employee elective deferral and employer match are added to the existing balance, and that entire combined sum earns the assumed annual investment return for the year.',
              },
              {
                q: 'If I start saving in my 40s, how can I catch up?',
                a: 'While you have fewer years for compound growth to work, you can compensate by increasing your contribution rate (e.g., saving 15% to 20% instead of 6%), using annual raises to bump your savings rate, and taking advantage of IRS catch-up contributions available once you turn age 50.',
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

        {/* Section 7: Next Steps and Related Tools */}
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
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
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
              href={`${prefix}/tools/inflation-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Inflation Calculator
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
