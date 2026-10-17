import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Scale, ArrowRight, HelpCircle, CheckCircle, AlertCircle, Building, Wallet, Layers } from 'lucide-react';
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

interface NetWorthCalculationBasicsViewProps {
  locale?: Locale;
}

export default function NetWorthCalculationBasicsView({
  locale = DEFAULT_LOCALE,
}: NetWorthCalculationBasicsViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('net-worth-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Net Worth Calculator';

  // Base worked case matching live calculator defaults
  const baseResult = calculateNetWorth({
    cash: 25000,
    investments: 50000,
    realEstate: 150000,
    vehicles: 25000,
    retirement: 0,
    otherAssets: 0,
    mortgage: 120000,
    studentLoans: 20000,
    creditCards: 10000,
    carLoans: 0,
    otherDebts: 0,
  });

  // Profile comparison table cases
  const profiles = [
    {
      name: 'Early Career / Renter',
      desc: 'Modest emergency savings and entry retirement fund, paired with student debt and auto financing.',
      assets: { cash: 10000, investments: 15000, realEstate: 0, vehicles: 12000, retirement: 8000, otherAssets: 0 },
      liabilities: { mortgage: 0, studentLoans: 28000, creditCards: 4000, carLoans: 8000, otherDebts: 0 },
    },
    {
      name: 'Mid-Career Homeowner (Default)',
      desc: 'Substantial real estate equity, growing portfolio, and traditional amortizing home mortgage.',
      assets: { cash: 25000, investments: 50000, realEstate: 150000, vehicles: 25000, retirement: 0, otherAssets: 0 },
      liabilities: { mortgage: 120000, studentLoans: 20000, creditCards: 10000, carLoans: 0, otherDebts: 0 },
    },
    {
      name: 'High Equity / Low Debt',
      desc: 'Substantial retirement and brokerage balances, mature mortgage payoff, zero consumer liabilities.',
      assets: { cash: 40000, investments: 180000, realEstate: 320000, vehicles: 20000, retirement: 140000, otherAssets: 0 },
      liabilities: { mortgage: 60000, studentLoans: 0, creditCards: 0, carLoans: 0, otherDebts: 0 },
    },
  ];

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
          How to Calculate Net Worth
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
        <Scale className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How to Calculate Your Net Worth
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive, step-by-step guide to calculating your personal net worth by organizing liquid and fixed assets, subtracting all debt obligations, and interpreting your debt-to-asset ratio.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Core Net Worth Formula */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            The Fundamental Net Worth Formula
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Net worth represents the monetary difference between everything you own (your total assets) and everything you owe to creditors or lenders (your total liabilities). The calculation follows one universal accounting equation:
          </p>

          <div className="bg-slate-50 dark:bg-gray-800/60 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-1 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              The Balance Sheet Equation
            </span>
            <div className="text-lg sm:text-xl font-mono font-black text-[#1a3c5e] dark:text-blue-300">
              Net Worth = Total Assets − Total Liabilities
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assets side */}
            <div className="p-4 rounded-xl bg-green-50/40 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30 space-y-2">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                  Total Assets (What You Own)
                </span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <li>• <strong>Cash &amp; Bank Accounts:</strong> Checking, savings, high-yield deposit accounts.</li>
                <li>• <strong>Investment Portfolio:</strong> Taxable brokerage accounts, stocks, mutual funds, ETFs.</li>
                <li>• <strong>Real Estate Property:</strong> Estimated fair market value of primary home or properties.</li>
                <li>• <strong>Vehicle Resale Value:</strong> Realistic private-party or trade-in value of automobiles.</li>
                <li>• <strong>Retirement Funds:</strong> 401(k), traditional/Roth IRA, pension cash equivalents.</li>
                <li>• <strong>Other Valuables:</strong> Jewelry, collectibles, equipment, or business equity.</li>
              </ul>
            </div>

            {/* Liabilities side */}
            <div className="p-4 rounded-xl bg-red-50/40 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 space-y-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                  Total Liabilities (What You Owe)
                </span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <li>• <strong>Mortgage Balance:</strong> Remaining principal owed on your home loan.</li>
                <li>• <strong>Student Loan Debt:</strong> Federal and private student loan balances.</li>
                <li>• <strong>Credit Card Balances:</strong> Revolving consumer card debt and store cards.</li>
                <li>• <strong>Car Loan Debt:</strong> Remaining balance owed to auto finance lenders.</li>
                <li>• <strong>Other Debts:</strong> Medical bills, personal installment loans, back taxes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Worked Numerical Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Numerical Example (Default Balance Sheet)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Consider the standard inputs pre-loaded into our Net Worth Calculator for a typical mid-career homeowner with bank reserves, home equity, and multiple debt obligations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-200 block text-xs uppercase tracking-wider">
                Step 1: Sum Assets
              </span>
              <div className="space-y-1 font-mono text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span>Cash &amp; Bank:</span><span>$25,000</span></div>
                <div className="flex justify-between"><span>Investments:</span><span>$50,000</span></div>
                <div className="flex justify-between"><span>Real Estate:</span><span>$150,000</span></div>
                <div className="flex justify-between"><span>Vehicles:</span><span>$25,000</span></div>
                <div className="flex justify-between"><span>Retirement / Other:</span><span>$0</span></div>
                <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">
                  <span>Total Assets:</span>
                  <span>{formatCurrency(baseResult.totalAssets, 2)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-200 block text-xs uppercase tracking-wider">
                Step 2: Sum Liabilities
              </span>
              <div className="space-y-1 font-mono text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span>Mortgage:</span><span>$120,000</span></div>
                <div className="flex justify-between"><span>Student Loans:</span><span>$20,000</span></div>
                <div className="flex justify-between"><span>Credit Cards:</span><span>$10,000</span></div>
                <div className="flex justify-between"><span>Car / Other Debts:</span><span>$0</span></div>
                <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-700 font-bold text-red-600 dark:text-red-400">
                  <span>Total Liabilities:</span>
                  <span>{formatCurrency(baseResult.totalLiabilities, 2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
                Step 3: Compute Net Worth &amp; Debt Ratio
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                $250,000.00 total assets minus $150,000.00 total liabilities leaves a positive balance sheet cushion.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-black font-mono text-green-600 dark:text-green-400">
                {formatCurrency(baseResult.netWorth, 2)}
              </div>
              <div className="text-[11px] font-bold font-mono text-slate-500 dark:text-slate-400">
                Debt Ratio: {formatPercent(baseResult.assetsToDebtRatio)} of Assets
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Comparative Profile Analysis */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Comparing Net Worth Across Financial Profiles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Net worth changes dramatically depending on whether your wealth is held in liquid savings, real estate equity, or offset by heavy student loans or credit card obligations:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Financial Profile</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Total Assets</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Total Liabilities</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Net Worth</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Debt Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {profiles.map((p, idx) => {
                  const res = calculateNetWorth({ ...p.assets, ...p.liabilities });
                  return (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 dark:text-white block">{p.name}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{p.desc}</span>
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
        </section>

        {/* Section 4: What is Included vs Excluded */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            What the Net Worth Snapshot Includes and Excludes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>Explicitly Included</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Stated market values for all liquid checking/savings accounts, taxable brokerage investments, primary real estate property, fair-market vehicle values, 401(k)/IRA retirement accounts, and current balances for mortgages, student loans, car notes, and consumer cards.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Explicitly Excluded</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Future salary expectations, unvested stock grants, speculative asset appreciation, future interest accumulation, deferred taxes upon retirement withdrawals (e.g., traditional 401(k) tax liabilities), and inflation discounting.
              </p>
            </div>
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
                How often should I recalculate my personal net worth?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Most financial planners recommend recalculating your net worth quarterly or annually. Checking too frequently (such as daily or weekly) introduces noise from stock market volatility and routine paycheck deposit timing that does not reflect underlying financial progress.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Should I list my vehicle at purchase price or resale value?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Always list vehicles at their current private-party or trade-in market resale value (such as Kelley Blue Book values), rather than the original sticker price. Vehicles are rapidly depreciating assets, and entering purchase price overstates your true balance sheet equity.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Can your net worth be negative?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. If your total liabilities (such as high student loan debt, auto loans, or credit card balances) exceed the market value of your total assets, your net worth will be negative. This is common among recent university graduates and young professionals entering the workforce.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Does a high net worth guarantee good cash flow?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Not necessarily. An individual can have a substantial net worth tied up in illiquid assets (such as real estate or private business equity) while still experiencing tight monthly cash flow if liquid bank reserves are low. Net worth reflects wealth accumulation, not monthly cash liquidity.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">Calculate Your Personal Net Worth Now</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Plug your exact checking balances, retirement funds, real estate equity, and current debts into our live calculator for an immediate, private snapshot.
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
            Explore Other Net Worth Scenarios &amp; Related Calculators
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${prefix}/tools/net-worth-calculator/scenarios/how-debt-affects-net-worth`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Debt Affects Your Net Worth
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/net-worth-calculator/scenarios/how-savings-and-investments-affect-net-worth`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              How Savings and Investments Affect Net Worth Over Time
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
            <Link
              href={`${prefix}/tools/mortgage-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Mortgage Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related guide: </span>
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
