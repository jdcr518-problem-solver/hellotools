import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, CreditCard, ArrowRight, HelpCircle, AlertTriangle, ShieldCheck, TrendingDown, Layers } from 'lucide-react';
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

interface NetWorthDebtImpactViewProps {
  locale?: Locale;
}

export default function NetWorthDebtImpactView({
  locale = DEFAULT_LOCALE,
}: NetWorthDebtImpactViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('net-worth-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Net Worth Calculator';

  // Fixed baseline asset portfolio of $200,000 across 3 debt reduction tiers
  const baseAssets = {
    cash: 25000,
    investments: 35000,
    realEstate: 120000,
    vehicles: 20000,
    retirement: 0,
    otherAssets: 0,
  };

  const debtTiers = [
    {
      name: 'High Leverage / Heavy Debt',
      desc: 'Active mortgage alongside large student loans, car notes, and revolving credit card balances.',
      liabilities: { mortgage: 110000, studentLoans: 35000, creditCards: 18000, carLoans: 15000, otherDebts: 7000 },
    },
    {
      name: 'Moderate Debt (Consumer Cards Cleared)',
      desc: 'Revolving cards and personal debt eliminated; remaining balance in amortizing loans.',
      liabilities: { mortgage: 105000, studentLoans: 25000, creditCards: 0, carLoans: 10000, otherDebts: 0 },
    },
    {
      name: 'Low Debt (Mortgage Only)',
      desc: 'All non-mortgage liabilities paid in full; sole remaining obligation is the home mortgage.',
      liabilities: { mortgage: 90000, studentLoans: 0, creditCards: 0, carLoans: 0, otherDebts: 0 },
    },
    {
      name: 'Deficit / Negative Net Worth Tier',
      desc: 'Total loan obligations surpass total personal asset holdings (e.g., student loans + credit cards).',
      overrideAssets: { cash: 10000, investments: 5000, realEstate: 0, vehicles: 15000, retirement: 30000, otherAssets: 0 },
      liabilities: { mortgage: 0, studentLoans: 55000, creditCards: 22000, carLoans: 18000, otherDebts: 0 },
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
          How Debt Affects Net Worth
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
        <CreditCard className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Debt Affects Your Net Worth
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Examine how different liability amounts, unsecured consumer debt, and secured loans compress your net worth and alter your debt-to-asset leverage ratio.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: The Direct Impact of Liabilities */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How Liabilities Alter Your Balance Sheet
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            In net-worth accounting, every dollar of outstanding liability is a direct dollar-for-dollar reduction of your total net worth. However, different categories of debt affect your overall financial position in distinct ways:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                1. Asset-Backed Debt
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mortgages are backed by real estate. While the loan creates a liability, the property value is recorded on the asset side, creating home equity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                2. Depreciating Debt
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Car loans finance vehicles that decline in value over time. If vehicle depreciation outpaces debt paydown, the loan can exceed the car&apos;s resale value.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                3. Unsecured Debt
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Credit card balances and personal loans represent pure liabilities without an offsetting enduring asset, exerting maximum drag on net worth.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Comparative Debt Reduction Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Comparing Identical Assets Across 4 Debt Levels
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The table below demonstrates how varying debt balances affect net worth and debt ratio. In Tiers 1 through 3, total assets remain identical at $200,000 to highlight the isolated impact of debt reduction:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Liability Tier</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Total Assets</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Total Liabilities</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Calculated Net Worth</th>
                  <th className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Debt Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {debtTiers.map((tier, idx) => {
                  const assetsToUse = tier.overrideAssets || baseAssets;
                  const res = calculateNetWorth({ ...assetsToUse, ...tier.liabilities });
                  return (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 dark:text-white block">{tier.name}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{tier.desc}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-green-600 dark:text-green-400 font-semibold">
                        {formatCurrency(res.totalAssets, 0)}
                      </td>
                      <td className="py-3 px-3 font-mono text-red-600 dark:text-red-400 font-semibold">
                        {formatCurrency(res.totalLiabilities, 0)}
                      </td>
                      <td
                        className={`py-3 px-3 font-mono font-bold ${
                          res.isPositive ? 'text-slate-900 dark:text-white' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
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

        {/* Section 3: Understanding the Debt-to-Asset Ratio */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Interpreting the Calculator&apos;s Debt-to-Asset Ratio
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            The Net Worth Calculator computes the debt ratio as:
          </p>
          <div className="font-mono text-xs bg-slate-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-slate-800 dark:text-slate-200 text-center">
            Debt Ratio = (Total Liabilities ÷ Total Assets) × 100
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            When total liabilities equal $150,000 and total assets equal $250,000, the debt ratio is 60.0%. This indicates that 60% of what you hold is funded through debt obligations, leaving a 40% equity cushion. If liabilities exceed assets, the calculator caps the visual ratio at 100%, indicating a balance sheet deficit.
          </p>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#f97316]" />
            Frequently Asked Questions About Debt &amp; Net Worth
          </h2>
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Does paying off debt using cash change your net worth immediately?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mathematically, paying down debt with existing cash does not change net worth on that day: cash assets decrease by the same amount liabilities decrease ($1,000 less cash − $1,000 less debt = $0 change in net worth). However, it improves your debt-to-asset ratio and eliminates future ongoing interest expenses.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                How does taking out a mortgage affect initial net worth?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When purchasing a home, your liquid cash down payment converts into home equity. The new mortgage liability is balanced by the home&apos;s fair market value added to the asset side, meaning net worth typically experiences only a minor change related to transaction fees and closing costs.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                What is the best way to reverse a negative net worth?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Reversing a negative net worth requires either increasing total assets (saving money from income, building retirement balances) or paying down existing liabilities, especially high-interest credit card debt that compounds aggressively.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f243a] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold">See How Your Debts Impact Your Net Worth</h2>
            <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Enter your current mortgages, student loans, car financing, and card balances into the live calculator to view your immediate debt-to-asset ratio.
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
              href={`${prefix}/tools/student-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Student Loan Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/auto-loan-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Auto Loan Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/mortgage-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Mortgage Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href={`${prefix}/tools/savings-goal-calculator`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
            >
              Savings Goal Calculator
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Related reading: </span>
            <Link
              href="/blog/how-to-calculate-loan-amortization-schedule"
              className="text-[#f97316] hover:underline font-semibold"
            >
              How to Calculate a Loan Amortization Schedule Step-by-Step
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
