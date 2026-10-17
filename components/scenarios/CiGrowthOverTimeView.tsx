import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingUp } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcCompoundInterest, formatCIValue } from '@/data/compound-interest-scenarios-data';

interface CiGrowthOverTimeViewProps {
  locale?: Locale;
}

/* ── Fixed scenario parameters ──────────────────────────────────────────── */
const PRINCIPAL = 10_000;
const RATE_PCT = 7;
const FREQ = 12; // monthly compounding
const PERIODS = [5, 10, 15, 20] as const;

/* ── Pre-compute rows using the shared utility ───────────────────────────── */
const ROWS = PERIODS.map((years) => {
  const { total, interest } = calcCompoundInterest(PRINCIPAL, RATE_PCT, FREQ, years);
  return { years, total, interest };
});

/* ── Page content (English only — full quality, single scenario) ─────────── */
export default function CiGrowthOverTimeView({ locale = DEFAULT_LOCALE }: CiGrowthOverTimeViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('compound-interest-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Compound Interest Calculator';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl flex-wrap"
      >
        <Link href={prefix || '/'} className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{homeLabel}</span>
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/#finance`} className="hover:text-gray-950 dark:hover:text-white">{financeLabel}</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/compound-interest-calculator`} className="hover:text-gray-950 dark:hover:text-white">{toolName}</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/compound-interest-calculator/scenarios`} className="hover:text-gray-950 dark:hover:text-white">
          Scenarios
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">How Much Will a Lump-Sum Investment Grow Over Time?</span>
      </nav>

      {/* Top Ad */}
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
            How Much Will a Lump-Sum Investment Grow Over Time?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            This page shows how a single initial deposit grows through compound interest when left untouched for 5, 10, 15, and 20 years. The example uses a fixed principal, interest rate, and compounding frequency so you can follow the arithmetic step by step.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – What compound growth means */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What Compound Growth Means in Practice
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            With simple interest you earn a fixed amount each year on the original principal. With compound interest you earn interest on both the original principal and on all interest already credited. Over long periods this difference is dramatic — interest earned in year 1 itself earns interest in years 2 through 20.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The compound interest formula used by the HelloTools calculator is:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Formula:
            </span>
            A = P × (1 + r ÷ n)^(n × t)
          </div>
          <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li><span className="font-bold">A</span> — final balance (what you end up with)</li>
            <li><span className="font-bold">P</span> — initial principal (your starting deposit)</li>
            <li><span className="font-bold">r</span> — nominal annual interest rate expressed as a decimal (e.g. 7% → 0.07)</li>
            <li><span className="font-bold">n</span> — number of compounding periods per year (12 for monthly)</li>
            <li><span className="font-bold">t</span> — investment duration in years</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            Assumptions for this page: The 7% rate is a nominal annual rate, not an effective annual rate (EAR). The calculator compounds monthly (n = 12). No contributions are added after the initial deposit. Figures are rounded to the nearest cent.
          </p>
        </section>

        {/* Section 2 – Worked example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $10,000 at 7% Compounded Monthly
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Suppose you deposit $10,000 today into a savings or investment account that earns 7% per annum, compounded monthly. You make no additional deposits and make no withdrawals.
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span>Monthly period rate = 7% ÷ 12 = 0.5833% per month (r ÷ n = 0.07 ÷ 12 ≈ 0.005833)</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span>After 10 years (120 months): A = $10,000 × (1 + 0.005833)^120</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span>(1.005833)^120 ≈ 2.00966 → A ≈ $10,000 × 2.00966</span>
            </div>
          </div>
          <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p>Nominal annual rate: 7% · Compounding: monthly (n = 12) · Principal: $10,000</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              10-year balance: {formatCIValue(ROWS[1].total)} (interest earned: {formatCIValue(ROWS[1].interest)})
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Results are computed with 64-bit floating-point arithmetic and rounded to the nearest cent. Enter your own numbers in the{' '}
            <Link href={`${prefix}/tools/compound-interest-calculator`} className="text-[#f97316] hover:underline font-semibold">
              Compound Interest Calculator
            </Link>{' '}
            to get precise results for your situation.
          </p>
        </section>

        {/* Section 3 – Comparison table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Growth Table: $10,000 at 7% Monthly Compounding
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Assumptions: Initial principal $10,000 · Nominal annual rate 7% · Compounding frequency: monthly (12×/year) · No additional contributions · All figures are exact to the nearest cent.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Investment Period</th>
                  <th className="py-3 pr-4 font-semibold">Final Balance</th>
                  <th className="py-3 pr-4 font-semibold">Interest Earned</th>
                  <th className="py-3 font-semibold">Growth Multiple</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.years} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                      {row.years} years
                    </td>
                    <td className="py-3 pr-4 text-[#f97316] font-bold">
                      {formatCIValue(row.total)}
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      +{formatCIValue(row.interest)}
                    </td>
                    <td className="py-3 text-gray-700 dark:text-gray-300">
                      {(row.total / PRINCIPAL).toFixed(2)}×
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            These figures are mathematical estimates for planning purposes only. Actual returns depend on the specific account, product, or investment vehicle used.
          </p>
        </section>

        {/* Section 4 – What the numbers tell you */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What the Numbers Tell You
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>At 5 years, almost 30% of the ending balance ({formatCIValue(ROWS[0].interest)}) is interest — a meaningful but modest contribution.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>At 10 years, interest exceeds the original deposit: {formatCIValue(ROWS[1].interest)} in interest versus $10,000 in principal.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>At 20 years, the interest earned ({formatCIValue(ROWS[3].interest)}) is about 3× the original deposit. The money has grown to {(ROWS[3].total / PRINCIPAL).toFixed(2)}× its original value.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>Starting earlier has a larger impact than almost any other single factor. Investing $10,000 for 20 years produces more than twice the ending balance of investing the same amount for 10 years at the same rate.</span>
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
                q: 'Does this calculation match the HelloTools Compound Interest Calculator?',
                a: 'Yes. This page uses the same formula — A = P × (1 + r/n)^(n×t) — and the same rounding to the nearest cent as the live calculator. You can verify any row by entering the matching values in the calculator.',
              },
              {
                q: 'Is 7% a realistic interest rate?',
                a: 'The 7% nominal annual rate is used purely as a fixed example to illustrate how growth scales over time. It is not a recommendation or forecast. Savings accounts, fixed deposits, bonds, and equity indices all have different expected rates with different risk profiles.',
              },
              {
                q: 'What happens if I add money every month instead of investing a lump sum?',
                a: 'The HelloTools Compound Interest Calculator shown on this site calculates lump-sum growth. If you want to model regular monthly contributions, you would need a separate calculation (each contribution effectively becomes its own lump sum compounded for a different remaining period).',
              },
              {
                q: 'Why does interest grow faster in later years?',
                a: 'Because interest is credited to your balance each period, and the next period\'s interest is calculated on the larger balance. In the early years the balance is close to the original principal; by year 15 you are earning 7% on a balance nearly three times the original deposit.',
              },
              {
                q: 'How does this differ from the inflation-adjusted scenario?',
                a: 'This scenario shows the nominal (face-value) balance — the number of dollars you would have. The inflation-adjusted scenario shows what those dollars can actually buy, after accounting for rising prices. See the inflation scenario for more detail.',
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
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`${prefix}/tools/compound-interest-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            Open Compound Interest Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/compound-interest-calculator/scenarios`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            View All Compound Interest Scenarios
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/savings-goal-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Savings Goal Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
