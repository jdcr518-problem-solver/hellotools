import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Clock, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calcRetirementNestEgg,
  formatRetirementValue,
} from '@/data/retirement-scenarios-data';

interface RetirementTimeHorizonViewProps {
  locale?: Locale;
}

/* ── Fixed Scenario Parameters ──────────────────────────────────────────── */
const RETIREMENT_AGE = 65;
const CURRENT_SAVINGS = 5_000;
const MONTHLY_CONTRIBUTION = 300;
const ANNUAL_RATE_PCT = 7.0;
const START_AGES = [25, 30, 35, 40, 45] as const;

/* ── Pre-compute rows using verified utility ─── */
const ROWS = START_AGES.map((age) => {
  const result = calcRetirementNestEgg(
    age,
    RETIREMENT_AGE,
    CURRENT_SAVINGS,
    MONTHLY_CONTRIBUTION,
    ANNUAL_RATE_PCT
  );
  return { startAge: age, ...result };
});

// Compare age 25 vs age 35 for key example
const AGE_25 = ROWS[0];
const AGE_35 = ROWS[2];

export default function RetirementTimeHorizonView({ locale = DEFAULT_LOCALE }: RetirementTimeHorizonViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('retirement-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Retirement Savings Calculator';

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
        <Link href={`${prefix}/tools/retirement-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/retirement-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          How Much Should I Save Each Month?
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
        <Clock className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Much Should I Save Each Month for Retirement?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            See how the timeline to retirement and starting age influence the accumulation of wealth when contributing ${MONTHLY_CONTRIBUTION} each month at a {ANNUAL_RATE_PCT}% return rate with ${CURRENT_SAVINGS.toLocaleString()} starting capital.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Mechanics */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Time Horizon Drives Compound Growth in Retirement Planning
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When saving for retirement, regular monthly contributions are only one half of the equation. The other half is the length of time your money has to compound. In our Retirement Savings Calculator, interest is credited and compounded on a monthly cycle.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Every extra decade of compounding drastically multiplies your nest egg. If you begin saving later, maintaining the exact same monthly contribution results in a much smaller final balance because there is less time for investment gains to compound.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Compounding Horizon Equation:
            </span>
            Total Growth = Nest Egg − (Initial Balance + Monthly Contribution × Months)
          </div>
        </section>

        {/* Section 2 – Worked Comparison Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Worked Example: Starting at Age 25 vs. Age 35
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Parameters: ${CURRENT_SAVINGS.toLocaleString()} starting nest egg, ${MONTHLY_CONTRIBUTION}/month contribution, {ANNUAL_RATE_PCT}% annual return, retirement at age 65.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                Starting at Age 25 (40-Year Horizon)
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatRetirementValue(AGE_25.nestEgg)}
              </span>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>You deposit: {formatRetirementValue(AGE_25.totalContributions)}</div>
                <div>Compound growth: {formatRetirementValue(AGE_25.totalGrowth)}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f97316] block">
                Starting at Age 35 (30-Year Horizon)
              </span>
              <span className="text-2xl font-black font-mono text-gray-900 dark:text-white mt-1 block">
                {formatRetirementValue(AGE_35.nestEgg)}
              </span>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>You deposit: {formatRetirementValue(AGE_35.totalContributions)}</div>
                <div>Compound growth: {formatRetirementValue(AGE_35.totalGrowth)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              Starting just 10 years earlier at age 25 requires only <strong>${(AGE_25.totalContributions - AGE_35.totalContributions).toLocaleString()}</strong> in additional lifetime contributions ($300/mo × 120 months), yet produces an extra <strong>${(Math.round((AGE_25.nestEgg - AGE_35.nestEgg) * 100) / 100).toLocaleString()}</strong> in the final nest egg.
            </p>
            <p>
              This difference occurs because the early contributions compound across all 40 years, showcasing how starting early reduces the monthly burden required to build wealth.
            </p>
          </div>
        </section>

        {/* Section 3 – Comparison Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Starting Age Comparison Table
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Compare ending balances across different starting ages for someone saving ${MONTHLY_CONTRIBUTION} monthly with ${CURRENT_SAVINGS.toLocaleString()} starting capital at a {ANNUAL_RATE_PCT}% annual return until age 65.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-slate-600 dark:text-slate-400 font-bold">
                  <th className="p-3">Starting Age</th>
                  <th className="p-3">Years to Grow</th>
                  <th className="p-3">Total Contributed</th>
                  <th className="p-3">Compound Growth</th>
                  <th className="p-3">Nominal Nest Egg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono text-slate-700 dark:text-slate-300">
                {ROWS.map((row) => (
                  <tr key={row.startAge} className="hover:bg-slate-50/40 dark:hover:bg-gray-800/20">
                    <td className="p-3 font-sans font-semibold text-gray-900 dark:text-white">Age {row.startAge}</td>
                    <td className="p-3">{row.years} years</td>
                    <td className="p-3">{formatRetirementValue(row.totalContributions)}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">{formatRetirementValue(row.totalGrowth)}</td>
                    <td className="p-3 font-bold text-[#f97316]">{formatRetirementValue(row.nestEgg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            All calculations assume continuous monthly deposits of ${MONTHLY_CONTRIBUTION} compounding monthly at {ANNUAL_RATE_PCT}% annually. Nominal results match the live Retirement Savings Calculator.
          </p>
        </section>

        {/* Section 4 – Takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Key Planning Takeaways
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Earlier contributions have maximum leverage:</strong> Deposits made between ages 25 and 35 produce more long-term growth than deposits made closer to retirement.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Catching up requires higher savings rates:</strong> If starting at age 40, a saver has only 25 years until age 65, which means they must increase monthly deposits to achieve the same balance as someone starting at 25.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span><strong>Consistent contributions beat market timing:</strong> Automating steady monthly contributions allows dollar-cost averaging and steady compounding over decades.</span>
            </li>
          </ul>
        </section>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" compact={false} />

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              {
                q: 'What if I want to retire earlier than age 65?',
                a: 'Retiring earlier shortens the compounding timeframe and lengthens the drawdown period. In the calculator, you can lower the retirement age input to immediately see the revised nest egg.',
              },
              {
                q: 'Can I increase my monthly contribution as my salary grows?',
                a: 'Yes. The calculator uses a fixed monthly deposit, but in reality, raising contributions over time helps compensate for a later start or accelerates your timeline.',
              },
              {
                q: 'Are returns credited monthly or annually in this model?',
                a: 'The retirement utility compounds interest on a monthly basis using the formula r = annualRate / 12 / 100, matching regular monthly deposit timing.',
              },
              {
                q: 'How does starting age affect the share of interest vs. contributions?',
                a: 'At age 25, compound interest accounts for over 80% of the final balance. At age 45, interest accounts for roughly 56%, meaning late starters must supply a much larger share from direct contributions.',
              },
            ].map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{faq.q}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Link
            href={`${prefix}/tools/retirement-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            Open Retirement Savings Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/retirement-calculator/scenarios`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            View All Retirement Savings Scenarios
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/savings-goal-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Savings Goal Calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
