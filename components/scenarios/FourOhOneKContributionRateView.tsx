import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Percent, ArrowRight, HelpCircle, TrendingUp, PiggyBank } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculate401k,
  formatCurrency,
} from '@/data/401k-scenarios-data';

interface FourOhOneKContributionRateViewProps {
  locale?: Locale;
}

/* ── Verified Scenario Data ──────────────────────────────────────────────── */
const BASE_CURRENT_AGE = 30;
const BASE_RETIREMENT_AGE = 65;
const BASE_CURRENT_BALANCE = 10_000;
const BASE_SALARY = 60_000;
const BASE_SALARY_GROWTH = 3;
const BASE_RETURN = 7;
const BASE_MATCH_PCT = 100;
const BASE_MATCH_LIMIT_PCT = 3;

const RATES = [3, 6, 10, 15] as const;

const RATE_SCENARIOS = RATES.map((rate) => {
  const result = calculate401k({
    currentAge: BASE_CURRENT_AGE,
    retirementAge: BASE_RETIREMENT_AGE,
    currentBalance: BASE_CURRENT_BALANCE,
    annualSalary: BASE_SALARY,
    employeeContribPct: rate,
    employerMatchPct: BASE_MATCH_PCT,
    employerMatchLimitPct: BASE_MATCH_LIMIT_PCT,
    annualReturnPct: BASE_RETURN,
    salaryGrowthPct: BASE_SALARY_GROWTH,
  });

  if ('error' in result) {
    throw new Error(`Calculation error: ${result.error}`);
  }

  const baselineResult = calculate401k({
    currentAge: BASE_CURRENT_AGE,
    retirementAge: BASE_RETIREMENT_AGE,
    currentBalance: BASE_CURRENT_BALANCE,
    annualSalary: BASE_SALARY,
    employeeContribPct: 3,
    employerMatchPct: BASE_MATCH_PCT,
    employerMatchLimitPct: BASE_MATCH_LIMIT_PCT,
    annualReturnPct: BASE_RETURN,
    salaryGrowthPct: BASE_SALARY_GROWTH,
  });

  const baselineBalance = 'error' in baselineResult ? 0 : baselineResult.projectedBalance;
  const gainVsBaseline = result.projectedBalance - baselineBalance;

  return {
    rate,
    result,
    gainVsBaseline,
  };
});

export default function FourOhOneKContributionRateView({
  locale = DEFAULT_LOCALE,
}: FourOhOneKContributionRateViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('401k-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || '401(k) Calculator';

  const baseRateCase = RATE_SCENARIOS[0]; // 3%
  const moderateCase = RATE_SCENARIOS[1]; // 6%
  const targetCase = RATE_SCENARIOS[2];   // 10%
  const aggressiveCase = RATE_SCENARIOS[3]; // 15%

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
          Contribution Rate Comparison
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
        <Percent className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Contribution Rate Changes Your Projected 401(k) Balance
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Compare how electing to save 3%, 6%, 10%, or 15% of your annual salary alters lifetime contributions, compound investment growth, and the ultimate retirement balance accumulated over 35 years.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Multiplier Effect of Contribution Rates */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Multiplier Effect of Small Percentage Increases
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When setting up a 401(k), choosing between 3%, 6%, or 10% of your paycheck may seem like a modest monthly budgeting difference. However, because early elective contributions compound over decades, small incremental increases in your savings percentage create vast differences in final retirement wealth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-950 dark:text-orange-300 mb-1 flex items-center gap-1.5">
                <PiggyBank className="h-4 w-4 text-[#f97316]" />
                Modest Increase: 3% to 6% of Salary
              </h3>
              <p className="text-xs text-orange-900 dark:text-orange-200/80 leading-relaxed">
                Doubling your contribution from 3% ($1,800/yr starting) to 6% ($3,600/yr starting) increases your total career contributions by $108,831. But because of compound growth, your final balance increases by <strong>$378,590</strong>—a 3.48× return on the additional saved dollars.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Target Rate: 10% to 15% of Salary
              </h3>
              <p className="text-xs text-blue-900 dark:text-blue-200/80 leading-relaxed">
                Reaching the 15% threshold recommended by many financial professionals elevates the projected ending balance to <strong>$2,378,212</strong>—nearly 2.8 times the 3% baseline. Over $1.71 million of that total represents pure investment growth.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Step-by-Step Worked Example: 3% vs 6% vs 10% vs 15%
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Assumptions: Age 30 to 65 (35-year horizon), $10,000 initial 401(k) balance, $60,000 starting salary with 3% annual raises, 100% employer match up to 3% of salary, and a 7% constant annual portfolio return. All projections represent nominal, pre-tax totals computed by the 401(k) engine.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-5 border border-gray-150 dark:border-gray-800 mb-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Time Horizon / Expected Annual Return:</span>
              <span className="font-bold">35 Years (Age 30 to 65) / 7.0%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Salary Progression:</span>
              <span className="font-bold">$60,000 starting (3.0% annual growth)</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span>Employer Match:</span>
              <span className="font-bold">100% match up to 3% of salary ($108,832 total)</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>3% Contribution Ending Balance:</span>
              <span className="text-slate-700 dark:text-slate-300">{formatCurrency(baseRateCase.result.projectedBalance)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>6% Contribution Ending Balance:</span>
              <span className="text-[#1a3c5e] dark:text-blue-400">{formatCurrency(moderateCase.result.projectedBalance)} (+{formatCurrency(moderateCase.gainVsBaseline)})</span>
            </div>
            <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold text-sm">
              <span>10% Contribution Ending Balance:</span>
              <span className="text-orange-600 dark:text-orange-400">{formatCurrency(targetCase.result.projectedBalance)} (+{formatCurrency(targetCase.gainVsBaseline)})</span>
            </div>
            <div className="flex justify-between items-center text-green-700 dark:text-green-400 font-bold text-sm pt-1 border-t border-dashed border-gray-200 dark:border-gray-700">
              <span>15% Contribution Ending Balance:</span>
              <span>{formatCurrency(aggressiveCase.result.projectedBalance)} (+{formatCurrency(aggressiveCase.gainVsBaseline)})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">At 6% Contribution</span>
              <div className="text-xl font-extrabold mt-1">{formatCurrency(moderateCase.result.projectedBalance)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">+$378,590 vs 3% baseline</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">At 10% Contribution</span>
              <div className="text-xl font-extrabold mt-1 text-orange-300">{formatCurrency(targetCase.result.projectedBalance)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">+$883,376 vs 3% baseline</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1a3c5e] text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">At 15% Contribution</span>
              <div className="text-xl font-extrabold mt-1 text-green-300">{formatCurrency(aggressiveCase.result.projectedBalance)}</div>
              <span className="text-[10px] opacity-75 mt-0.5 block">2.75× the 3% baseline balance</span>
            </div>
          </div>
        </section>

        {/* Section 3: Contribution Rate Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Comparative Analysis: 401(k) Accumulation by Contribution Rate
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Detailed breakdown of employee elective deferrals, fixed employer match, cumulative investment gains, and projected nest eggs across savings percentages.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Rate</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Year 1 Deposit</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Total Employee Contribs</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Total Employer Match</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300">Investment Growth</th>
                  <th className="py-3 px-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Projected Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                {RATE_SCENARIOS.map((row) => {
                  const isHighlighted = row.rate === 6;
                  return (
                    <tr key={row.rate} className={isHighlighted ? 'bg-orange-50/40 dark:bg-orange-950/20 font-bold' : ''}>
                      <td className="py-3 px-3 text-gray-900 dark:text-white font-sans font-semibold">
                        {row.rate}% of Salary
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                        {formatCurrency(BASE_SALARY * (row.rate / 100))}
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                        {formatCurrency(row.result.totalEmployeeContribs)}
                      </td>
                      <td className="py-3 px-3 text-green-600 dark:text-green-400">
                        {formatCurrency(row.result.totalEmployerContribs)}
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                        {formatCurrency(row.result.totalInvestmentGrowth)}
                      </td>
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

        {/* Section 4: Budgeting & IRS Elective Deferral Nuances */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Practical Takeaways for Setting Your Contribution Rate
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              <strong>1. The 1% Auto-Escalation Strategy:</strong> Jumping immediately from 3% to 15% can create cash flow friction in your household budget. Many savers adopt an annual 1% escalation: increasing their contribution rate by 1% each year when receiving an annual raise, reaching 10% to 15% within several years without feeling a net reduction in take-home pay.
            </p>
            <p>
              <strong>2. Statutory Annual Limits Cap High Earners:</strong> In our 15% scenario, the employee&apos;s annual contribution eventually reaches the statutory IRS limit ($24,500 in 2026). Our calculator automatically applies this cap, ensuring that projections do not assume contributions that exceed IRS regulations.
            </p>
            <p>
              <strong>3. Pre-Tax Tax Shield:</strong> In a traditional 401(k), increasing your contribution rate reduces your current taxable wages. For someone in the 22% federal tax bracket, saving an extra $100 per month only reduces take-home pay by approximately $78. Use our <strong>Salary Calculator</strong> and <strong>Tax Calculator</strong> to model your exact take-home pay impact.
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
            Frequently Asked Questions About 401(k) Contribution Rates
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'What is the recommended 401(k) contribution percentage?',
                a: 'Most retirement planners recommend saving between 10% and 15% of your gross income toward retirement (including employer matching funds). If that target is not feasible immediately, begin with whatever percentage secures the maximum employer match and raise it by 1% each year.',
              },
              {
                q: 'What happens if my contribution percentage exceeds the IRS annual limit?',
                a: 'Federal regulations cap elective deferrals at $24,500 for 2026. If a high percentage of your salary would theoretically exceed this amount, payroll systems and our calculator cap employee contributions at the statutory maximum for that year.',
              },
              {
                q: 'Does increasing my contribution rate affect my employer match?',
                a: 'Only up to your employer’s match cap. If your employer matches 100% up to 3% of your salary, contributing 3% captures the entire match ($1,800/yr on $60,000). Increasing your rate to 6%, 10%, or 15% adds to your own savings and compound growth, but your employer match remains capped at 3%.',
              },
              {
                q: 'Are the projected balances nominal or inflation-adjusted?',
                a: 'The figures produced by the 401(k) Calculator are nominal pre-tax dollars. Because long-term inflation will reduce the purchasing power of each dollar over 35 years, pairing your projection with our Inflation Calculator helps estimate what that balance will buy in today’s goods and services.',
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
              href={`${prefix}/tools/salary-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Salary Calculator
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
