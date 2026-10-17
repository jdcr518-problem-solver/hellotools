import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingUp, ArrowRight, HelpCircle, AlertCircle, CheckCircle, PiggyBank, Sparkles, LineChart } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import {
  calculateNetWorth,
  formatCurrency,
  formatPercent,
} from '@/data/net-worth-scenarios-data';

interface NetWorthSavingsInvestmentsViewProps {
  locale?: Locale;
}

export default function NetWorthSavingsInvestmentsView({
  locale = DEFAULT_LOCALE,
}: NetWorthSavingsInvestmentsViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('net-worth-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Net Worth Calculator';

  // Three snapshot milestones demonstrating asset accumulation over a multi-year timeline
  const milestones = [
    {
      stage: 'Milestone 1: Baseline (Year 0)',
      desc: 'Starting point with entry-level cash reserves, early investment balance, and outstanding student + home debt.',
      assets: { cash: 15000, investments: 20000, realEstate: 150000, vehicles: 20000, retirement: 25000, otherAssets: 0 },
      liabilities: { mortgage: 120000, studentLoans: 15000, creditCards: 0, carLoans: 0, otherDebts: 0 },
    },
    {
      stage: 'Milestone 2: Accumulation (Year 3)',
      desc: 'Cash emergency cushion expanded to $30k, brokerage additions, retirement deposits (+ $30k), and amortizing debts.',
      assets: { cash: 30000, investments: 45000, realEstate: 150000, vehicles: 15000, retirement: 55000, otherAssets: 0 },
      liabilities: { mortgage: 110000, studentLoans: 5000, creditCards: 0, carLoans: 0, otherDebts: 0 },
    },
    {
      stage: 'Milestone 3: Maturity (Year 7)',
      desc: 'Student loans eliminated, substantial 401(k)/IRA and taxable portfolios, and lower mortgage balance.',
      assets: { cash: 40000, investments: 90000, realEstate: 150000, vehicles: 12000, retirement: 120000, otherAssets: 0 },
      liabilities: { mortgage: 95000, studentLoans: 0, creditCards: 0, carLoans: 0, otherDebts: 0 },
    },
  ];

  const m1 = calculateNetWorth({ ...milestones[0].assets, ...milestones[0].liabilities });
  const m3 = calculateNetWorth({ ...milestones[2].assets, ...milestones[2].liabilities });
  const totalWealthGain = m3.netWorth - m1.netWorth;

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
        <Link href={`${prefix}/tools/net-worth-calculator`} className="hover:text-slate-950 dark:hover:text-white">
          {toolName}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/net-worth-calculator/scenarios`} className="hover:text-slate-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">
          Savings &amp; Investments Over Time
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
            How Savings and Investments Affect Net Worth Over Time
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Discover how systematic cash savings, retirement fund deposits, and investment portfolio growth combine with routine debt amortization to expand your personal net worth across financial milestones.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Important Snapshot Limitation Notice */}
        <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-blue-950/20 border border-orange-200/50 dark:border-blue-900/30 text-slate-700 dark:text-blue-200 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
          <AlertCircle className="h-5 w-5 text-[#f97316] shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Snapshot Calculation Notice &amp; Tool Purpose:
            </strong>
            <span>
              The Net Worth Calculator evaluates your balance sheet at a static, point-in-time snapshot. It tracks accumulated cash, investments, and retirement balances as entered, but does not forecast compounding returns or inflation. For automated multi-year compound interest projections or recurring savings timelines, use our dedicated{' '}
              <Link href={`${prefix}/tools/compound-interest-calculator`} className="text-[#f97316] font-semibold hover:underline">
                Compound Interest Calculator
              </Link>{' '}
              and{' '}
              <Link href={`${prefix}/tools/savings-goal-calculator`} className="text-[#f97316] font-semibold hover:underline">
                Savings Goal Calculator
              </Link>.
            </span>
          </div>
        </div>

        {/* Section 1: The Wealth Accumulation Mechanics */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Two Engines of Net Worth Expansion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Net worth increases through two complementary mechanisms working simultaneously: building up asset balances and reducing outstanding liabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
              <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block">
                Engine 1: Asset Expansion
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Directing surplus earnings from each paycheck into liquid cash reserves, tax-advantaged retirement accounts (401k/IRA), and diversified investment portfolios directly increases the asset side of your personal balance sheet.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                Engine 2: Debt Amortization
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                As monthly mortgage and student loan payments chip away at principal balances, your liabilities shrink. Each dollar of debt eliminated increases your net equity cushion, even before factoring in asset growth.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Comparative Milestones Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Tracking Net Worth Across 7-Year Growth Milestones
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The table below illustrates three snapshot points for an individual steadily saving into cash and retirement funds while amortizing a mortgage and student loan:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Timeline Milestone</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Total Assets</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Total Liabilities</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Calculated Net Worth</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Debt Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {milestones.map((m, idx) => {
                  const res = calculateNetWorth({ ...m.assets, ...m.liabilities });
                  return (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 dark:text-white block">{m.stage}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{m.desc}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-green-600 dark:text-green-400 font-semibold">
                        {formatCurrency(res.totalAssets, 0)}
                      </td>
                      <td className="py-3 px-3 font-mono text-red-600 dark:text-red-400 font-semibold">
                        {formatCurrency(res.totalLiabilities, 0)}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        {formatCurrency(res.netWorth, 0)}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                        {formatPercent(res.assetsToDebtRatio)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-green-50/30 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30 flex items-center justify-between text-xs">
            <span className="font-semibold text-green-800 dark:text-green-300">
              Total Net Worth Expansion (Year 0 to Year 7):
            </span>
            <span className="font-mono font-bold text-base text-green-700 dark:text-green-400">
              +{formatCurrency(totalWealthGain, 0)} (Debt ratio drops from 58.7% to 23.1%)
            </span>
          </div>
        </section>

        {/* Section 3: Specialized Forward Projection Tools */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Projecting Future Growth With Specialized Tools
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Because the Net Worth Calculator records static point-in-time balance sheets, use these dedicated calculators when planning dynamic future financial horizons:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href={`${prefix}/tools/compound-interest-calculator`}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#f97316] dark:hover:border-[#f97316] transition-all group block"
            >
              <LineChart className="h-5 w-5 text-[#f97316] mb-2" />
              <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#f97316]">
                Compound Interest Calculator
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Project multi-year compound investment growth with custom compounding frequencies and periodic contributions.
              </p>
            </Link>

            <Link
              href={`${prefix}/tools/savings-goal-calculator`}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#f97316] dark:hover:border-[#f97316] transition-all group block"
            >
              <PiggyBank className="h-5 w-5 text-[#f97316] mb-2" />
              <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#f97316]">
                Savings Goal Calculator
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Determine the exact monthly savings required to hit a specific net asset target within your target timeframe.
              </p>
            </Link>

            <Link
              href={`${prefix}/tools/retirement-calculator`}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#f97316] dark:hover:border-[#f97316] transition-all group block"
            >
              <Sparkles className="h-5 w-5 text-[#f97316] mb-2" />
              <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#f97316]">
                Retirement Savings Calculator
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Model multi-decade retirement nest egg accumulation, employer matches, and post-retirement withdrawal durations.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                How does compound growth appear on a net worth statement?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compound growth appears as an organic increase in the current market value of your &quot;Investment Portfolio&quot; or &quot;Retirement Funds&quot; entries. While the calculator does not project future returns dynamically, entering higher current account balances reflects historical compound accumulation.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Should I prioritize saving into cash or paying off debt first?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Both improve your balance sheet: building cash increases total assets, while paying down debt reduces liabilities. Most general guidelines suggest securing a baseline emergency cash cushion first to prevent taking on expensive debt during unexpected events, then attacking high-interest liabilities.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Do market fluctuations make net worth calculations unreliable?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Short-term market volatility causes investment values to oscillate, which is why financial analysts emphasize tracking the long-term trend rather than short-term gyrations. Recording snapshots on a consistent quarterly basis helps smooth out market noise.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Track Your Asset &amp; Net Worth Growth</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Enter your current savings, investments, and liabilities into the Net Worth Calculator to capture your personal balance sheet today.
            </p>
          </div>
          <Link
            href={`${prefix}/tools/net-worth-calculator`}
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
            Explore Related Financial Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/net-worth-calculator/scenarios/how-to-calculate-net-worth`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How to Calculate Net Worth
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/net-worth-calculator/scenarios/how-debt-affects-net-worth`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Debt Affects Your Net Worth
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/compound-interest-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Compound Interest Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/savings-goal-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Savings Goal Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/retirement-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Retirement Savings Calculator
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
