'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// PURE CALCULATION TYPES & FUNCTIONS (outside component for independent testing)
// ─────────────────────────────────────────────────────────────────────────────

interface AmortizationRow {
  period: number;
  date: string | null;       // formatted date string or null if no startDate
  payment: number;           // full precision
  principal: number;         // full precision
  interest: number;          // full precision
  balance: number;           // full precision; exactly 0 on final row
  isFinalPayment: boolean;
}

interface AnnualRow {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  endingBalance: number;
}

interface AmortizationResult {
  regularPayment: number;
  totalInterest: number;
  totalCost: number;
  monthlySchedule: AmortizationRow[];
  annualSchedule: AnnualRow[];
  finalPaymentDiffers: boolean;
  finalPaymentAmount: number;
}

/**
 * Safe calendar-month addition — clamps to last valid day of target month.
 * Avoids timezone shifting by working in local-date components.
 * Tests: Jan 31 + 1 = Feb 28/29, Mar 31 + 1 = Apr 30, Jan 15 + 1 = Feb 15
 */
export function addMonthsSafe(date: Date, months: number): Date {
  const yr  = date.getFullYear();
  const mo  = date.getMonth(); // 0-indexed
  const day = date.getDate();
  const totalMonths = mo + months;
  const targetYear  = yr + Math.floor(totalMonths / 12);
  const targetMonth = ((totalMonths % 12) + 12) % 12; // handle negative wrap
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  return new Date(targetYear, targetMonth, Math.min(day, lastDay));
}

function formatPaymentDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Core amortization calculation — pure function, no side effects.
 * Returns null if inputs are invalid.
 * All balances tracked at full float precision; rounding only at display layer.
 */
export function calculateAmortization(
  loanAmount: number,
  annualRate: number,
  termMonths: number,
  startDate?: Date | null
): AmortizationResult | null {
  // Input guards
  if (!Number.isFinite(loanAmount) || loanAmount <= 0) return null;
  if (!Number.isFinite(annualRate) || annualRate < 0)  return null;
  if (!Number.isFinite(termMonths) || termMonths < 1 || !Number.isInteger(termMonths)) return null;

  const monthlySchedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let regularPayment: number;

  // ── Zero-interest branch ──────────────────────────────────────────────────
  if (annualRate === 0) {
    regularPayment = loanAmount / termMonths;
    for (let i = 1; i <= termMonths; i++) {
      const isFinal = i === termMonths;
      const principal = isFinal ? balance : regularPayment; // absorbs float residual on last
      const interest  = 0;
      const payment   = principal + interest;
      balance = isFinal ? 0 : Math.max(0, balance - principal);
      const date = startDate ? formatPaymentDate(addMonthsSafe(startDate, i)) : null;
      monthlySchedule.push({ period: i, date, payment, principal, interest, balance, isFinalPayment: isFinal });
    }
  } else {
    // ── Standard branch ─────────────────────────────────────────────────────
    const r = (annualRate / 100) / 12;
    const factor = Math.pow(1 + r, termMonths);
    regularPayment = loanAmount * r * factor / (factor - 1);

    for (let i = 1; i <= termMonths; i++) {
      const isFinal = i === termMonths;
      const interest = balance * r; // full precision

      let principal = 0;
      let payment = 0;

      if (isFinal) {
        // Force exact closure: final payment = remaining balance + its interest
        // Guards against negative balance from accumulated float drift
        principal = Math.max(0, balance); // never negative
        payment   = principal + interest;
        balance   = 0; // forced exactly zero
      } else {
        principal = regularPayment - interest;
        payment   = regularPayment;
        balance   = Math.max(0, balance - principal); // guard against tiny negatives
      }

      const date = startDate ? formatPaymentDate(addMonthsSafe(startDate, i)) : null;
      monthlySchedule.push({ period: i, date, payment, principal, interest, balance, isFinalPayment: isFinal });
    }
  }

  // ── Annual aggregation ────────────────────────────────────────────────────
  const annualSchedule: AnnualRow[] = [];
  let yr = 1, annPay = 0, annPrin = 0, annInt = 0;
  monthlySchedule.forEach((row, idx) => {
    annPay  += row.payment;
    annPrin += row.principal;
    annInt  += row.interest;
    const isYearEnd  = (idx + 1) % 12 === 0;
    const isLoanEnd  = idx === monthlySchedule.length - 1;
    if (isYearEnd || isLoanEnd) {
      annualSchedule.push({ year: yr, totalPayment: annPay, totalPrincipal: annPrin, totalInterest: annInt, endingBalance: row.balance });
      yr++; annPay = 0; annPrin = 0; annInt = 0;
    }
  });

  const totalInterest = monthlySchedule.reduce((s, r) => s + r.interest, 0);
  const totalCost = loanAmount + totalInterest;

  // Detect if final payment meaningfully differs from regular payment
  const finalRow = monthlySchedule[monthlySchedule.length - 1];
  const DISPLAY_THRESHOLD = 0.01; // 1 cent — only show message if visible difference
  const finalPaymentDiffers = Math.abs(finalRow.payment - regularPayment) > DISPLAY_THRESHOLD;

  return { regularPayment, totalInterest, totalCost, monthlySchedule, annualSchedule, finalPaymentDiffers, finalPaymentAmount: finalRow.payment };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 12;

export default function AmortizationCalculator() {
  // ── String-based controlled inputs (preserve editing state) ──────────────
  const [loanAmountStr, setLoanAmountStr]   = useState<string>('10000');
  const [annualRateStr, setAnnualRateStr]   = useState<string>('5');
  const [termStr, setTermStr]               = useState<string>('36');
  const [termUnit, setTermUnit]             = useState<'months' | 'years'>('months');
  const [startDateStr, setStartDateStr]     = useState<string>('');

  // ── Table display state ───────────────────────────────────────────────────
  const [scheduleView, setScheduleView]     = useState<'monthly' | 'annual'>('monthly');
  const [showAll, setShowAll]               = useState(false);
  const [page, setPage]                     = useState(0);

  // ── Parse inputs safely ───────────────────────────────────────────────────
  const loanAmount  = parseFloat(loanAmountStr);
  const annualRate  = parseFloat(annualRateStr);
  const termRaw     = parseInt(termStr, 10);
  const termMonths  = termUnit === 'years' ? termRaw * 12 : termRaw;
  const startDate: Date | null = startDateStr
    ? (() => { const d = new Date(startDateStr + 'T12:00:00'); return isNaN(d.getTime()) ? null : d; })()
    : null;

  // ── Validation ────────────────────────────────────────────────────────────
  const validationError: string | null = (() => {
    if (!loanAmountStr.trim() || isNaN(loanAmount) || loanAmount <= 0) return 'Loan amount must be greater than $0.';
    if (loanAmount > 10_000_000) return 'Loan amount cannot exceed $10,000,000.';
    if (!annualRateStr.trim() || isNaN(annualRate) || annualRate < 0) return 'Interest rate must be 0% or greater.';
    if (annualRate > 30) return 'Interest rate cannot exceed 30%.';
    if (!termStr.trim() || isNaN(termRaw) || termRaw < 1) return 'Loan term must be at least 1.';
    if (termMonths > 480) return 'Loan term cannot exceed 480 months (40 years).';
    return null;
  })();

  // ── Calculation (useMemo — re-runs only when inputs change) ──────────────
  const result = useMemo<AmortizationResult | null>(() => {
    if (validationError) return null;
    return calculateAmortization(loanAmount, annualRate, termMonths, startDate);
  }, [loanAmount, annualRate, termMonths, startDateStr, validationError]); // eslint-disable-line

  // ── Reset pagination when inputs change ───────────────────────────────────
  React.useEffect(() => { setPage(0); setShowAll(false); }, [loanAmount, annualRate, termMonths]);

  // ── Table rows ───────────────────────────────────────────────────────────
  const monthlyRows = result?.monthlySchedule ?? [];
  const annualRows  = result?.annualSchedule  ?? [];
  const displayRows = scheduleView === 'monthly' ? monthlyRows : annualRows;
  const visibleRows = showAll ? displayRows : displayRows.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);
  const totalPages  = Math.ceil(displayRows.length / ROWS_PER_PAGE);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const fmt  = (n: number) => '$' + (Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—');
  const fmtN = (n: number) =>       Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';

  const inputClass = 'w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]';
  const labelClass = 'text-xs font-semibold text-slate-700 dark:text-slate-200';

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">

      {/* ── Main Grid: Inputs + Output Card ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Inputs */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Loan Parameters</h3>

          {/* Loan Amount */}
          <div className="space-y-1">
            <label htmlFor="amort-loan-amount" className={labelClass}>Loan Amount ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input id="amort-loan-amount" type="number" min="0.01" max="10000000" step="100"
                value={loanAmountStr} onChange={e => setLoanAmountStr(e.target.value)}
                className={inputClass} aria-describedby="amort-val-error" />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-1">
            <label htmlFor="amort-rate" className={labelClass}>Annual Interest Rate (%)</label>
            <div className="relative">
              <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input id="amort-rate" type="number" min="0" max="30" step="0.01"
                value={annualRateStr} onChange={e => setAnnualRateStr(e.target.value)}
                className={inputClass} />
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="amort-term" className={labelClass}>Loan Term</label>
              <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-0.5 overflow-hidden">
                {(['months', 'years'] as const).map(u => (
                  <button key={u} type="button" onClick={() => setTermUnit(u)}
                    className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${termUnit === u ? 'bg-white dark:bg-gray-900 text-blue-600' : 'text-slate-500'}`}
                    aria-pressed={termUnit === u}>
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <input id="amort-term" type="number" min="1" max={termUnit === 'years' ? 40 : 480} step="1"
              value={termStr} onChange={e => setTermStr(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]" />
          </div>

          {/* Start Date (optional) */}
          <div className="space-y-1">
            <label htmlFor="amort-start-date" className={labelClass}>Loan Start Date <span className="font-normal opacity-60">(optional)</span></label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input id="amort-start-date" type="date"
                value={startDateStr} onChange={e => setStartDateStr(e.target.value)}
                className={inputClass} />
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div id="amort-val-error" role="alert"
              className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs rounded-lg font-semibold">
              {validationError}
            </div>
          )}
        </div>

        {/* Right: Output Card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#1a3c5e] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-md min-h-[160px]">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Monthly Payment</span>

            {/* aria-live on the concise result summary only */}
            <div aria-live="polite" aria-label={result ? `Monthly payment: ${fmt(result.regularPayment)}` : 'Enter valid inputs to calculate'}>
              {result ? (
                <div className="text-5xl font-black font-mono text-white">
                  {fmt(result.regularPayment)}
                </div>
              ) : (
                <div className="text-2xl font-bold text-blue-300/60">—</div>
              )}
            </div>

            {result?.finalPaymentDiffers && (
              <p className="text-xs text-blue-200/80">
                Final payment: {fmt(result.finalPaymentAmount)} (adjusted to close balance to $0.00)
              </p>
            )}
          </div>

          {/* Summary Stats */}
          {result && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Principal', value: fmt(loanAmount) },
                { label: 'Total Interest', value: fmt(result.totalInterest) },
                { label: 'Total Cost', value: fmt(result.totalCost) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{label}</span>
                  <span className="text-base font-black font-mono">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Amortization Schedule ────────────────────────────────────────── */}
      {result && result.monthlySchedule.length > 0 && (
        <div className="space-y-3">
          {/* Tab toggle + Show All */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5" role="tablist" aria-label="Schedule view">
              {(['monthly', 'annual'] as const).map(v => (
                <button key={v} role="tab" aria-selected={scheduleView === v}
                  onClick={() => { setScheduleView(v); setPage(0); setShowAll(false); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${scheduleView === v ? 'bg-white dark:bg-gray-900 text-[#1a3c5e] dark:text-blue-400 shadow-sm' : 'text-slate-500'}`}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!showAll && displayRows.length > ROWS_PER_PAGE && (
                <span className="text-xs text-slate-400">Page {page + 1} of {totalPages}</span>
              )}
              <button onClick={() => { setShowAll(p => !p); setPage(0); }}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 transition-colors">
                <FileText className="h-3.5 w-3.5" />
                {showAll ? 'Paginate' : 'Show All'}
              </button>
            </div>
          </div>

          {/* Table — wrapped for mobile horizontal scroll */}
          <div style={{ overflowX: 'auto' }} className="rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full min-w-[540px] text-sm border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  {scheduleView === 'monthly' ? (
                    <>
                      <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">#</th>
                      <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">{startDate ? 'Date' : 'Month'}</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Payment</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Principal</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Interest</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Balance</th>
                    </>
                  ) : (
                    <>
                      <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Year</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Payments</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Principal</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Interest</th>
                      <th scope="col" className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Ending Balance</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {scheduleView === 'monthly'
                  ? (visibleRows as AmortizationRow[]).map((row) => (
                    <tr key={row.period} className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${row.isFinalPayment ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                      <td className="px-4 py-2.5 text-slate-500 font-medium">{row.period}</td>
                      <td className="px-4 py-2.5 font-medium">{row.date ?? `Month ${row.period}`}</td>
                      <td className="px-4 py-2.5 text-right font-mono">{fmtN(row.payment)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-blue-600 dark:text-blue-400">{fmtN(row.principal)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-orange-500">{fmtN(row.interest)}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-semibold">{fmtN(row.balance)}</td>
                    </tr>
                  ))
                  : (visibleRows as AnnualRow[]).map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-2.5 font-medium">Year {row.year}</td>
                      <td className="px-4 py-2.5 text-right font-mono">{fmtN(row.totalPayment)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-blue-600 dark:text-blue-400">{fmtN(row.totalPrincipal)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-orange-500">{fmtN(row.totalInterest)}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-semibold">{fmtN(row.endingBalance)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Pagination (only when not showing all) */}
          {!showAll && displayRows.length > ROWS_PER_PAGE && (
            <div className="flex justify-center gap-2">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ChevronUp className="h-3 w-3 rotate-[-90deg]" /> Prev
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Next <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Disclaimer ────────────────────────────────────────────────────── */}
      <p className="text-[11px] text-slate-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
        This calculator provides estimates for informational and educational purposes only and does not constitute financial advice. Actual results may vary based on loan terms, fees, and other factors.
      </p>
    </div>
  );
}
