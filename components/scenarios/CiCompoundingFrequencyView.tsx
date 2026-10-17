import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, BarChart3 } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcCompoundInterest, formatCIValue } from '@/data/compound-interest-scenarios-data';

interface CiCompoundingFrequencyViewProps {
  locale?: Locale;
}

/* ── Fixed scenario parameters ──────────────────────────────────────────── */
const PRINCIPAL = 5_000;
const RATE_PCT = 8;
const YEARS = 15;

type FrequencyRow = {
  label: string;
  n: number;
  total: number;
  interest: number;
};

/* ── Pre-compute rows using the shared utility ───────────────────────────── */
const FREQUENCY_ROWS: FrequencyRow[] = [
  { label: 'Annually (1×/year)', n: 1, ...calcCompoundInterest(PRINCIPAL, RATE_PCT, 1, YEARS) },
  { label: 'Quarterly (4×/year)', n: 4, ...calcCompoundInterest(PRINCIPAL, RATE_PCT, 4, YEARS) },
  { label: 'Monthly (12×/year)', n: 12, ...calcCompoundInterest(PRINCIPAL, RATE_PCT, 12, YEARS) },
  { label: 'Daily (365×/year)', n: 365, ...calcCompoundInterest(PRINCIPAL, RATE_PCT, 365, YEARS) },
];

/* ── View component ──────────────────────────────────────────────────────── */
export default function CiCompoundingFrequencyView({ locale = DEFAULT_LOCALE }: CiCompoundingFrequencyViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('compound-interest-calculator', locale);
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'Compound Interest Calculator';

  const monthlyRow = FREQUENCY_ROWS.find((r) => r.n === 12)!;
  const annualRow = FREQUENCY_ROWS.find((r) => r.n === 1)!;
  const dailyRow = FREQUENCY_ROWS.find((r) => r.n === 365)!;
  const extraVsAnnual = Math.round((monthlyRow.total - annualRow.total) * 100) / 100;

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
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">How Compounding Frequency Affects Your Final Balance</span>
      </nav>

      {/* Top Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <BarChart3 className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            How Compounding Frequency Affects Your Final Balance
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            Compounding frequency determines how often earned interest is credited to your account and begins earning its own interest. This page compares the final balance of the same principal at the same annual rate across four frequencies — annual, quarterly, monthly, and daily — over a fixed 15-year period.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1 – How frequency works */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Why Frequency Changes the Outcome
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The annual rate (for example, 8%) tells you the total interest that would be earned over a full year if compounding happened only once. When compounding happens more often, each sub-period uses a slightly smaller periodic rate but the interest is added to the balance sooner, so it starts compounding earlier.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For monthly compounding, the periodic rate is 8% ÷ 12 = 0.6667% per month. For daily compounding, it is 8% ÷ 365 ≈ 0.0219% per day. More frequent compounding means more periods over which the reinvested interest compounds — which is why higher frequency always produces a higher ending balance for the same nominal rate.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Formula (same for all frequencies):
            </span>
            A = P × (1 + r ÷ n)^(n × t)
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            Assumptions: P = $5,000 · r = 8% nominal annual rate (not an effective annual rate) · t = 15 years · No additional contributions. Figures are rounded to the nearest cent.
          </p>
        </section>

        {/* Section 2 – Worked example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Worked Example: $5,000 at 8% for 15 Years
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Starting with $5,000 at a nominal 8% annual rate, kept for 15 years, the ending balance changes with compounding frequency:
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">Annual:</span>
              <span>A = $5,000 × (1 + 0.08)^15 = {formatCIValue(annualRow.total)}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">Monthly:</span>
              <span>A = $5,000 × (1 + 0.08/12)^(12×15) = {formatCIValue(monthlyRow.total)}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">Daily:</span>
              <span>A = $5,000 × (1 + 0.08/365)^(365×15) = {formatCIValue(dailyRow.total)}</span>
            </div>
          </div>
          <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p>Switching from annual to monthly compounding adds {formatCIValue(extraVsAnnual)} over 15 years on a $5,000 deposit — with no change to the nominal interest rate.</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              The difference between daily and annual compounding: {formatCIValue(Math.round((dailyRow.total - annualRow.total) * 100) / 100)}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            You can verify these numbers in the{' '}
            <Link href={`${prefix}/tools/compound-interest-calculator`} className="text-[#f97316] hover:underline font-semibold">
              Compound Interest Calculator
            </Link>{' '}
            by changing the compounding frequency dropdown while keeping all other inputs fixed.
          </p>
        </section>

        {/* Section 3 – Comparison table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Compounding Frequency Comparison Table
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            Assumptions: Principal $5,000 · Nominal annual rate 8% · Duration 15 years · No additional contributions.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">Compounding Frequency</th>
                  <th className="py-3 pr-4 font-semibold">Final Balance</th>
                  <th className="py-3 pr-4 font-semibold">Interest Earned</th>
                  <th className="py-3 font-semibold">vs. Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {FREQUENCY_ROWS.map((row) => (
                  <tr key={row.n} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                      {row.label}
                    </td>
                    <td className="py-3 pr-4 text-[#f97316] font-bold">
                      {formatCIValue(row.total)}
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      +{formatCIValue(row.interest)}
                    </td>
                    <td className="py-3 text-gray-700 dark:text-gray-300">
                      {row.n === 1
                        ? '—'
                        : `+${formatCIValue(Math.round((row.total - annualRow.total) * 100) / 100)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            These figures are mathematical estimates. Actual returns depend on the terms of the specific account or investment product.
          </p>
        </section>

        {/* Section 4 – What this means */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            What This Means for You
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>The difference between annual and daily compounding ({formatCIValue(Math.round((dailyRow.total - annualRow.total) * 100) / 100)} over 15 years) is meaningful but not dramatic. The nominal rate has a far bigger impact than compounding frequency.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>When comparing savings accounts or fixed deposits, a higher nominal rate with less frequent compounding often beats a lower rate with daily compounding. Always compare the Annual Percentage Yield (APY / EAR), not just the stated nominal rate.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#f97316] font-bold shrink-0">•</span>
              <span>The compounding frequency option in the HelloTools calculator lets you match whichever convention your bank or investment account uses — daily for most savings accounts, quarterly for many term deposits, and monthly for many bonds or certificates of deposit.</span>
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
                q: 'What is the difference between nominal rate and effective annual rate (EAR)?',
                a: 'The nominal rate (also called the stated or annual percentage rate) is the rate before compounding effects are included. The effective annual rate (EAR) accounts for compounding within the year. For a nominal rate of 8% compounded monthly, the EAR is (1 + 0.08/12)^12 − 1 ≈ 8.30%. The HelloTools calculator takes a nominal annual rate as input.',
              },
              {
                q: 'Which compounding frequency should I choose in the calculator?',
                a: 'Match the compounding convention used by your actual account. Most savings accounts compound daily; many term deposits or CDs compound quarterly or annually. Check your account agreement or ask your bank.',
              },
              {
                q: 'Does daily compounding produce the maximum possible balance?',
                a: 'Daily compounding is the most frequent option offered by the calculator and produces the highest balance for a given nominal rate. Continuous compounding (a mathematical limit) would be marginally higher, but real-world accounts do not typically compound continuously.',
              },
              {
                q: 'Why are all results shown before tax?',
                a: 'Interest income is taxable in most jurisdictions. The calculator shows gross (pre-tax) returns. Your net return will depend on your applicable tax rate, account type (e.g. tax-deferred retirement account), and local regulations.',
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
            href={`${prefix}/tools/simple-interest-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Simple Interest Calculator
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
