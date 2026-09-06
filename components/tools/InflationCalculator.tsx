'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, ChevronDown, ChevronUp } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CPI-U ANNUAL AVERAGE DATA
// Source: U.S. Bureau of Labor Statistics — CPI-U (All Items, All Urban Consumers)
// Series: CUUR0000SA0 — Annual Averages
// Coverage: 1913–2024
// Data last verified against BLS published tables (June 2025 release)
// Update: add new year below and increment LAST_CPI_YEAR
// Verify at: https://www.bls.gov/cpi/tables/supplemental-files/
// ─────────────────────────────────────────────────────────────────────────────
const CPI_DATA: Record<number, number> = {
  1913: 9.9,  1914: 10.0, 1915: 10.1, 1916: 10.9, 1917: 12.8, 1918: 15.1,
  1919: 17.3, 1920: 20.0, 1921: 17.9, 1922: 16.8, 1923: 17.1, 1924: 17.1,
  1925: 17.5, 1926: 17.7, 1927: 17.4, 1928: 17.1, 1929: 17.1, 1930: 16.7,
  1931: 15.2, 1932: 13.7, 1933: 13.0, 1934: 13.4, 1935: 13.7, 1936: 13.9,
  1937: 14.4, 1938: 14.1, 1939: 13.9, 1940: 14.0, 1941: 14.7, 1942: 16.3,
  1943: 17.3, 1944: 17.6, 1945: 18.0, 1946: 19.5, 1947: 22.3, 1948: 24.1,
  1949: 23.8, 1950: 24.1, 1951: 26.0, 1952: 26.5, 1953: 26.7, 1954: 26.9,
  1955: 26.8, 1956: 27.2, 1957: 28.1, 1958: 28.9, 1959: 29.1, 1960: 29.6,
  1961: 29.9, 1962: 30.2, 1963: 30.6, 1964: 31.0, 1965: 31.5, 1966: 32.4,
  1967: 33.4, 1968: 34.8, 1969: 36.7, 1970: 38.8, 1971: 40.5, 1972: 41.8,
  1973: 44.4, 1974: 49.3, 1975: 53.8, 1976: 56.9, 1977: 60.6, 1978: 65.2,
  1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6, 1984: 103.9,
  1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0, 1990: 130.7,
  1991: 136.2, 1992: 140.3, 1993: 144.5, 1994: 148.2, 1995: 152.4, 1996: 156.9,
  1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2, 2001: 177.1, 2002: 179.9,
  2003: 184.0, 2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.3, 2008: 215.3,
  2009: 214.5, 2010: 218.1, 2011: 224.9, 2012: 229.6, 2013: 233.0, 2014: 236.7,
  2015: 237.0, 2016: 240.0, 2017: 245.1, 2018: 251.1, 2019: 255.7, 2020: 258.8,
  2021: 270.9, 2022: 292.7, 2023: 304.7, 2024: 314.0,
};
const FIRST_CPI_YEAR = 1913;
const LAST_CPI_YEAR  = 2024;

// Validate CPI data at module load (catches issues during development)
if (process.env.NODE_ENV !== 'production') {
  const expectedCount = LAST_CPI_YEAR - FIRST_CPI_YEAR + 1;
  const actualCount   = Object.keys(CPI_DATA).length;
  if (actualCount !== expectedCount) {
    console.error(`CPI_DATA has ${actualCount} entries; expected ${expectedCount} (${FIRST_CPI_YEAR}–${LAST_CPI_YEAR})`);
  }
  for (let y = FIRST_CPI_YEAR; y <= LAST_CPI_YEAR; y++) {
    if (!CPI_DATA[y] || !Number.isFinite(CPI_DATA[y]) || CPI_DATA[y] <= 0) {
      console.error(`CPI_DATA[${y}] is invalid:`, CPI_DATA[y]);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PURE CALCULATION FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface InflationResultA {
  mode: 'historical';
  originalAmount: number;
  equivalentValue: number;
  additionalCost: number;
  cumulativeInflationPct: number;
  startYear: number;
  endYear: number;
  startCPI: number;
  endCPI: number;
}

export interface InflationResultB {
  mode: 'projection';
  originalAmount: number;
  equivalentFutureCost: number;
  additionalCost: number;
  cumulativeInflationPct: number;
  purchasingPower: number;   // how much original amount buys in future dollars
  years: number;
  rate: number;
  yearlyData: { year: number; value: number; cumulativePct: number }[];
}

export type InflationResult = InflationResultA | InflationResultB;

export function calculateHistoricalInflation(
  amount: number,
  startYear: number,
  endYear: number
): InflationResultA | { error: string } {
  if (!Number.isFinite(amount) || amount <= 0) return { error: 'Amount must be greater than 0.' };
  if (!CPI_DATA[startYear] || !CPI_DATA[endYear]) return { error: 'CPI data not available for selected years.' };

  const startCPI = CPI_DATA[startYear];
  const endCPI   = CPI_DATA[endYear];

  if (startYear === endYear) {
    return {
      mode: 'historical', originalAmount: amount, equivalentValue: amount,
      additionalCost: 0, cumulativeInflationPct: 0,
      startYear, endYear, startCPI, endCPI
    };
  }

  const equivalentValue = amount * (endCPI / startCPI);
  const additionalCost  = equivalentValue - amount;
  const cumulativeInflationPct = (additionalCost / amount) * 100;

  return { mode: 'historical', originalAmount: amount, equivalentValue, additionalCost, cumulativeInflationPct, startYear, endYear, startCPI, endCPI };
}

export function calculateFutureInflation(
  amount: number,
  years: number,
  ratePct: number
): InflationResultB | { error: string } {
  if (!Number.isFinite(amount) || amount <= 0) return { error: 'Amount must be greater than 0.' };
  if (!Number.isFinite(years)  || years < 1 || !Number.isInteger(years)) return { error: 'Years must be a whole number ≥ 1.' };
  if (!Number.isFinite(ratePct)) return { error: 'Inflation rate must be a valid number.' };

  const base = 1 + ratePct / 100;
  if (base <= 0) return { error: 'Inflation rate is too negative — result would be mathematically undefined.' };

  const equivalentFutureCost  = amount * Math.pow(base, years);
  const additionalCost         = equivalentFutureCost - amount;
  const cumulativeInflationPct = (additionalCost / amount) * 100;
  const purchasingPower        = amount / Math.pow(base, years);

  // Year-by-year data (for table)
  const yearlyData = Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    const val = amount * Math.pow(base, y);
    return { year: y, value: val, cumulativePct: ((val - amount) / amount) * 100 };
  });

  return { mode: 'projection', originalAmount: amount, equivalentFutureCost, additionalCost, cumulativeInflationPct, purchasingPower, years, rate: ratePct, yearlyData };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const YEAR_TABLE_THRESHOLD = 30;
const YEAR_TABLE_PAGE = 20;

export default function InflationCalculator() {
  const [mode, setMode] = useState<'historical' | 'projection'>('historical');

  // ── Historical Mode Inputs ─────────────────────────────────────────────
  const [histAmountStr, setHistAmountStr]   = useState<string>('1000');
  const [histStartYear, setHistStartYear]   = useState<number>(1990);
  const [histEndYear, setHistEndYear]       = useState<number>(LAST_CPI_YEAR);

  // ── Projection Mode Inputs ─────────────────────────────────────────────
  const [projAmountStr, setProjAmountStr]   = useState<string>('1000');
  const [projYearsStr, setProjYearsStr]     = useState<string>('10');
  const [projRateStr, setProjRateStr]       = useState<string>('3');

  // ── Table display state ────────────────────────────────────────────────
  const [showYearTable, setShowYearTable]   = useState(false);
  const [yearPage, setYearPage]             = useState(0);

  // ── Parse helpers ──────────────────────────────────────────────────────
  const histAmount  = parseFloat(histAmountStr);
  const projAmount  = parseFloat(projAmountStr);
  const projYears   = parseInt(projYearsStr, 10);
  const projRate    = parseFloat(projRateStr);

  // ── Validation ─────────────────────────────────────────────────────────
  const histValidation: string | null = (() => {
    if (!histAmountStr.trim() || isNaN(histAmount) || histAmount <= 0) return 'Amount must be greater than $0.';
    if (histAmount > 1_000_000_000) return 'Amount cannot exceed $1,000,000,000.';
    return null;
  })();

  const projValidation: string | null = (() => {
    if (!projAmountStr.trim() || isNaN(projAmount) || projAmount <= 0) return 'Amount must be greater than $0.';
    if (projAmount > 1_000_000_000) return 'Amount cannot exceed $1,000,000,000.';
    if (!projYearsStr.trim() || isNaN(projYears) || projYears < 1) return 'Years must be at least 1.';
    if (projYears > 100) return 'Years cannot exceed 100.';
    if (!projRateStr.trim() || isNaN(projRate)) return 'Inflation rate must be a valid number.';
    if (projRate < -5) return 'Inflation rate cannot be less than −5%.';
    if (projRate > 25) return 'Inflation rate cannot exceed 25%.';
    if ((1 + projRate / 100) <= 0) return 'Inflation rate is too negative — result is undefined.';
    return null;
  })();

  // ── Calculations ────────────────────────────────────────────────────────
  const histResult = useMemo(() => {
    if (histValidation) return null;
    const r = calculateHistoricalInflation(histAmount, histStartYear, histEndYear);
    return 'error' in r ? null : r;
  }, [histAmount, histStartYear, histEndYear, histValidation]); // eslint-disable-line

  const projResult = useMemo(() => {
    if (projValidation) return null;
    const r = calculateFutureInflation(projAmount, projYears, projRate);
    return 'error' in r ? null : r;
  }, [projAmount, projYears, projRate, projValidation]); // eslint-disable-line

  const result = mode === 'historical' ? histResult : projResult;
  const validationError = mode === 'historical' ? histValidation : projValidation;

  // ── Helpers ──────────────────────────────────────────────────────────────
  const fmt  = (n: number) => '$' + (Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—');
  const fmtPct = (n: number) => (Number.isFinite(n) ? (n >= 0 ? '+' : '') + n.toFixed(2) + '%' : '—');
  const inputClass = 'w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]';
  const labelClass = 'text-xs font-semibold text-slate-700 dark:text-slate-200';

  const cpiYears = Array.from({ length: LAST_CPI_YEAR - FIRST_CPI_YEAR + 1 }, (_, i) => FIRST_CPI_YEAR + i).reverse();

  // Year-by-year table for projection mode
  const yearlyData = projResult?.yearlyData ?? [];
  const showTableToggle = yearlyData.length > 0;
  const defaultOpen = yearlyData.length <= YEAR_TABLE_THRESHOLD;
  const visibleYears = showYearTable
    ? yearlyData.slice(yearPage * YEAR_TABLE_PAGE, (yearPage + 1) * YEAR_TABLE_PAGE)
    : [];
  const yearTotalPages = Math.ceil(yearlyData.length / YEAR_TABLE_PAGE);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">

      {/* ── Mode Tabs ──────────────────────────────────────────────────── */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-full sm:w-auto" role="tablist" aria-label="Calculator mode">
        {(['historical', 'projection'] as const).map(m => (
          <button key={m} role="tab" aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${mode === m ? 'bg-white dark:bg-gray-900 text-[#1a3c5e] dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {m === 'historical' ? '📊 Historical CPI' : '🔮 Future Projection'}
          </button>
        ))}
      </div>

      {/* ── Mode sub-label ─────────────────────────────────────────────── */}
      <p className="text-xs text-slate-400 -mt-3">
        {mode === 'historical'
          ? 'Inflation estimate based on annual-average U.S. CPI-U data (1913–2024)'
          : 'Assumes a constant annual inflation rate. Results are nominal estimates.'}
      </p>

      {/* ── Main Grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Inputs */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Parameters</h3>

          {/* Amount */}
          <div className="space-y-1">
            <label htmlFor="infl-amount" className={labelClass}>Amount ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input id="infl-amount" type="number" min="0.01" step="100"
                value={mode === 'historical' ? histAmountStr : projAmountStr}
                onChange={e => mode === 'historical' ? setHistAmountStr(e.target.value) : setProjAmountStr(e.target.value)}
                className={inputClass} />
            </div>
          </div>

          {mode === 'historical' ? (
            <>
              {/* Start Year */}
              <div className="space-y-1">
                <label htmlFor="infl-start-year" className={labelClass}>Start Year</label>
                <select id="infl-start-year" value={histStartYear}
                  onChange={e => setHistStartYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]">
                  {cpiYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              {/* End Year */}
              <div className="space-y-1">
                <label htmlFor="infl-end-year" className={labelClass}>End Year</label>
                <select id="infl-end-year" value={histEndYear}
                  onChange={e => setHistEndYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]">
                  {cpiYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Years */}
              <div className="space-y-1">
                <label htmlFor="infl-years" className={labelClass}>Number of Years</label>
                <input id="infl-years" type="number" min="1" max="100" step="1"
                  value={projYearsStr} onChange={e => setProjYearsStr(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]" />
              </div>
              {/* Rate */}
              <div className="space-y-1">
                <label htmlFor="infl-rate" className={labelClass}>Annual Inflation Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input id="infl-rate" type="number" min="-5" max="25" step="0.1"
                    value={projRateStr} onChange={e => setProjRateStr(e.target.value)}
                    className={inputClass} />
                </div>
              </div>
            </>
          )}

          {validationError && (
            <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs rounded-lg font-semibold">
              {validationError}
            </div>
          )}
        </div>

        {/* Right: Output Card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#1a3c5e] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-md min-h-[160px]">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {mode === 'historical' ? `Equivalent Value in ${histEndYear}` : 'Equivalent Future Cost'}
            </span>
            <div aria-live="polite" aria-label={result ? `Equivalent value: ${fmt(mode === 'historical' ? (result as InflationResultA).equivalentValue : (result as InflationResultB).equivalentFutureCost)}` : 'Enter valid inputs'}>
              {result ? (
                <div className="text-5xl font-black font-mono text-white">
                  {mode === 'historical'
                    ? fmt((result as InflationResultA).equivalentValue)
                    : fmt((result as InflationResultB).equivalentFutureCost)}
                </div>
              ) : (
                <div className="text-2xl font-bold text-blue-300/60">—</div>
              )}
            </div>
            {mode === 'projection' && projResult && (
              <p className="text-xs text-blue-200/80">Assumes a constant annual inflation rate of {projRate}%</p>
            )}
          </div>

          {result && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cumulative Inflation</span>
                <span className="text-lg font-black font-mono text-orange-500">{fmtPct(result.cumulativeInflationPct)}</span>
              </div>
              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Additional Cost</span>
                <span className="text-lg font-black font-mono">{fmt(result.additionalCost)}</span>
              </div>
              {mode === 'projection' && projResult && projRate !== 0 && (
                <div className="col-span-2 bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Purchasing Power of {fmt(projAmount)} in {projYears} Year{projYears !== 1 ? 's' : ''}
                  </span>
                  <span className="text-lg font-black font-mono">{fmt(projResult.purchasingPower)}</span>
                  <p className="text-[10px] text-slate-400 mt-1">This answers: "What will ${projAmount.toLocaleString()} buy {projYears} years from now?" — a separate concept from equivalent future cost.</p>
                </div>
              )}
              {mode === 'historical' && histResult && (
                <div className="col-span-2 bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">CPI Reference</span>
                  <span className="text-xs text-slate-500">{histStartYear}: {histResult.startCPI.toFixed(1)} → {histEndYear}: {histResult.endCPI.toFixed(1)}</span>
                  <p className="text-[10px] text-slate-400 mt-1">CPI data through 2024, sourced from the U.S. Bureau of Labor Statistics.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Year-by-Year Table (Projection only) ─────────────────────────── */}
      {mode === 'projection' && projResult && showTableToggle && (
        <div className="space-y-3">
          <button
            onClick={() => { setShowYearTable(p => { const next = !p; if (next && defaultOpen) setYearPage(0); return next; }); }}
            aria-expanded={showYearTable}
            className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors">
            {showYearTable ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {showYearTable ? 'Hide' : 'Show'} year-by-year breakdown
          </button>

          {showYearTable && (
            <>
              <div style={{ overflowX: 'auto' }} className="rounded-xl border border-gray-200 dark:border-gray-800">
                <table className="w-full min-w-[400px] text-sm border-collapse">
                  <thead className="bg-gray-50 dark:bg-gray-800/60">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Year</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Equivalent Cost</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Cumulative Inflation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {visibleYears.map(row => (
                      <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium">Year {row.year}</td>
                        <td className="px-4 py-2.5 text-right font-mono">{fmt(row.value)}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-orange-500">{fmtPct(row.cumulativePct)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {yearlyData.length > YEAR_TABLE_PAGE && (
                <div className="flex justify-center gap-2">
                  <button onClick={() => setYearPage(p => Math.max(0, p - 1))} disabled={yearPage === 0}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">← Prev</button>
                  <span className="px-3 py-1.5 text-xs text-slate-400">Page {yearPage + 1} of {yearTotalPages}</span>
                  <button onClick={() => setYearPage(p => Math.min(yearTotalPages - 1, p + 1))} disabled={yearPage === yearTotalPages - 1}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Next →</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Disclaimer ─────────────────────────────────────────────────────── */}
      <p className="text-[11px] text-slate-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
        This calculator provides estimates for informational and educational purposes only and does not constitute financial advice. Historical CPI data sourced from the U.S. Bureau of Labor Statistics. Projection mode assumes a constant annual inflation rate and does not account for variable economic conditions.
      </p>
    </div>
  );
}
