import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, ShieldAlert } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcCompoundInterest, inflationAdjusted, formatCIValue } from '@/data/compound-interest-scenarios-data';

interface CiInflationAdjustedViewProps {
  locale?: Locale;
}

/* ── Fixed scenario parameters ──────────────────────────────────────────── */
const PRINCIPAL = 10_000;
const RATE_PCT = 7;
const FREQ = 12; // monthly compounding
const INFLATION_PCT = 3;

type InflationRow = {
  years: number;
  nominal: number;
  real: number;
  interestNominal: number;
  realGain: number; // real value minus original principal
};

const PERIODS = [5, 10, 15, 20] as const;

/* ── Pre-compute all rows ────────────────────────────────────────────────── */
const ROWS: InflationRow[] = PERIODS.map((years) => {
  const { total } = calcCompoundInterest(PRINCIPAL, RATE_PCT, FREQ, years);
  const real = inflationAdjusted(total, INFLATION_PCT, years);
  return {
    years,
    nominal: total,
    real,
    interestNominal: Math.round((total - PRINCIPAL) * 100) / 100,
    realGain: Math.round((real - PRINCIPAL) * 100) / 100,
  };
});

/* ── View component ──────────────────────────────────────────────────────── */
export default function CiInflationAdjustedView({ locale = DEFAULT_LOCALE }: CiInflationAdjustedViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('compound-interest-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Compound Interest Calculator';

  const row20 = ROWS[3]; // 20-year row

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
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">How Inflation Changes the Future Value of Your Money</span>
      </nav>

      {/* Top Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <ShieldAlert className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Inflation Changes the Future Value of Your Money
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            The Compound Interest Calculator shows your nominal future balance — the number of dollars you will have. But a dollar in the future buys less than a dollar today because of inflation. This page explains the difference between nominal and real (inflation-adjusted) future value, and shows how to calculate both for the same starting deposit.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – Nominal vs real */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Nominal vs Real Future Value
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            <span className="font-semibold">Nominal future value</span> is the balance produced by the compound interest formula — the number of currency units in the account. This is what the HelloTools Compound Interest Calculator displays.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            <span className="font-semibold">Real future value</span> (purchasing power) adjusts the nominal amount for the general rise in prices over the same period. If inflation runs at 3% per year, goods that cost $1.00 today will cost roughly $1.03 next year. A nominal balance of {formatCIValue(row20.nominal)} in 20 years does not buy {formatCIValue(row20.nominal)} worth of today&apos;s goods — it buys approximately {formatCIValue(row20.real)} in today&apos;s purchasing power.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Nominal growth formula (calculator output):
              </span>
              <p className="font-mono text-[13px] text-gray-700 dark:text-gray-200">A = P × (1 + r/n)^(n×t)</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Inflation adjustment (applied to A):
              </span>
              <p className="font-mono text-[13px] text-gray-700 dark:text-gray-200">Real value = A ÷ (1 + i)^t</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            Assumptions: Principal $10,000 · Nominal annual investment return 7% · Compounding: monthly (n = 12) · Inflation rate 3% per annum (a fixed illustrative rate, not a forecast). Inflation adjustment uses the same compounding logic as the growth formula. All figures are rounded to the nearest cent.
          </p>
        </section>

        {/* Section 2 – Worked example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $10,000 at 7% Over 20 Years with 3% Inflation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Deposit $10,000 today at a nominal 7% annual rate, compounded monthly. Assume prices rise at 3% per year throughout the period.
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">Step 1.</span>
              <span>Calculate the nominal balance after 20 years: A = $10,000 × (1 + 0.07/12)^(240) ≈ {formatCIValue(row20.nominal)}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">Step 2.</span>
              <span>Calculate the cumulative inflation factor over 20 years: (1.03)^20 ≈ 1.8061</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">Step 3.</span>
              <span>Divide the nominal balance by the inflation factor: {formatCIValue(row20.nominal)} ÷ 1.8061 ≈ {formatCIValue(row20.real)}</span>
            </div>
          </div>
          <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <div className="flex justify-between">
              <span>Nominal balance after 20 years:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatCIValue(row20.nominal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Real (inflation-adjusted) value in today&apos;s dollars:</span>
              <span className="font-semibold text-[#f97316]">{formatCIValue(row20.real)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Original deposit:</span>
              <span>$10,000.00</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            The calculator displays the nominal figure ({formatCIValue(row20.nominal)}). The real purchasing power of that balance in today&apos;s dollars is {formatCIValue(row20.real)} — still comfortably above the original $10,000, meaning the investment outpaced 3% inflation over 20 years at 7% nominal. Use the{' '}
            <Link href={`${prefix}/tools/compound-interest-calculator`} className="text-[#f97316] hover:underline font-semibold">
              Compound Interest Calculator
            </Link>{' '}
            to compute the nominal balance for your own inputs.
          </p>
        </section>

        {/* Section 3 – Comparison table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Nominal vs Real Value Table
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Assumptions: Principal $10,000 · Nominal investment rate 7% · Compounding: monthly · Inflation rate 3% per annum · All figures in today&apos;s purchasing power (real) or nominal dollars.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Period</th>
                  <th className="py-3 pr-4 font-semibold">Nominal Balance</th>
                  <th className="py-3 pr-4 font-semibold">Real Value (Today&apos;s $)</th>
                  <th className="py-3 font-semibold">Real Gain vs. Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ROWS.map((row) => (
                  <tr key={row.years} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                      {row.years} years
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      {formatCIValue(row.nominal)}
                    </td>
                    <td className="py-3 pr-4 text-[#f97316] font-bold">
                      {formatCIValue(row.real)}
                    </td>
                    <td className={`py-3 font-semibold ${row.realGain >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {row.realGain >= 0 ? '+' : ''}{formatCIValue(row.realGain)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Mathematical estimates for planning purposes only. Actual investment returns and inflation rates will differ.
          </p>
        </section>

        {/* Section 4 – Key takeaways */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Key Takeaways
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>At 7% nominal and 3% inflation, your real return is roughly 7% − 3% = 4% per year (more precisely, (1.07/1.03) − 1 ≈ 3.88%). This is sometimes called the real rate of return.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>If your investment rate equals the inflation rate, your real purchasing power does not grow at all — you are only keeping pace with rising prices.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>The HelloTools calculator shows the nominal balance. To find the real value for your situation: calculate the nominal balance, then divide by (1 + your expected inflation rate)^years.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>Inflation rate and investment return are both uncertain. The 3% inflation and 7% rate in this example are illustrative only. Past inflation rates do not predict future rates.</span>
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
                q: 'Does the Compound Interest Calculator include an inflation adjustment?',
                a: 'The main calculator shows the nominal future balance. This scenario page separately illustrates how to apply a standard inflation-deflation step. To see the real value, take the calculator\'s output and divide it by (1 + your assumed inflation rate)^years.',
              },
              {
                q: 'What inflation rate should I use?',
                a: 'The 3% rate in this example is illustrative — a rough historical average for developed economies. Actual future inflation is uncertain. For planning purposes you may want to run the calculation with a range of inflation assumptions (e.g. 2%, 3%, 5%) to understand sensitivity.',
              },
              {
                q: 'What if my investment return is lower than inflation?',
                a: 'If your nominal return is below the inflation rate, your real purchasing power declines over time — even though your nominal account balance grows. For example, a 2% nominal return with 3% inflation means you are losing purchasing power at approximately 1% per year.',
              },
              {
                q: 'Is 7% a realistic investment return?',
                a: 'The 7% nominal annual rate is used as a round illustrative number only. It is not a recommendation or guarantee. Actual returns on savings accounts, bonds, stocks, or other assets vary widely and are not predictable. Always consult a licensed financial adviser for personal investment decisions.',
              },
              {
                q: 'How does inflation affect compound interest in practice?',
                a: 'Both inflation and compound interest are exponential processes — they work in opposite directions on purchasing power. A higher investment return helps offset inflation, but whether your money "beats" inflation depends on the difference between the two rates over the investment horizon.',
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
            href={`${prefix}/tools/inflation-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Inflation Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
