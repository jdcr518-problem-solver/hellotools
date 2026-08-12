'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, Info, HelpCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// PURE CALCULATION FUNCTIONS (Extracted for independent testing)
// ─────────────────────────────────────────────────────────────────────────────

export interface APRResult {
  estimatedAPR: number;          // Nominal annualized APR: monthly rate * 12 * 100
  monthlyPayment: number;        // Monthly payment based on stated interest rate & full loan amount
  netProceeds: number;           // Loan Amount - Upfront Fees
  totalScheduledInterest: number;// Total interest paid across term at stated rate
  totalFees: number;             // Upfront fees entered
  totalInterestPlusFees: number; // Scheduled interest + upfront fees
  totalCashPaid: number;         // Total monthly payments + upfront fees
}

/**
 * Present Value helper for loan cash flows.
 * Handles r = 0 explicitly to prevent division by zero.
 */
export function pvAtRate(payment: number, n: number, r: number): number {
  if (r === 0) return payment * n;
  return payment * (1 - Math.pow(1 + r, -n)) / r;
}

/**
 * Solves for Estimated APR using bisection method.
 * Returns APRResult object or error string if inputs are out of bounds or fail convergence.
 */
export function calculateAPR(
  loanAmount: number,
  statedRatePct: number,
  termMonths: number,
  feesAmount: number
): APRResult | { error: string } {
  // Input validations & guards
  if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
    return { error: 'Loan amount must be greater than $0.' };
  }
  if (!Number.isFinite(statedRatePct) || statedRatePct < 0) {
    return { error: 'Stated interest rate must be 0% or greater.' };
  }
  if (!Number.isFinite(termMonths) || termMonths < 1 || !Number.isInteger(termMonths)) {
    return { error: 'Loan term must be a whole number of at least 1 month.' };
  }
  if (!Number.isFinite(feesAmount) || feesAmount < 0) {
    return { error: 'Fees cannot be negative.' };
  }
  if (feesAmount >= loanAmount) {
    return { error: 'Fees cannot equal or exceed the total loan amount.' };
  }

  const netProceeds = loanAmount - feesAmount;

  // Step 1: Calculate monthly payment based on stated interest rate and full loan amount
  let monthlyPayment = 0;
  if (statedRatePct === 0) {
    monthlyPayment = loanAmount / termMonths;
  } else {
    const rStated = (statedRatePct / 100) / 12;
    const factor = Math.pow(1 + rStated, termMonths);
    monthlyPayment = loanAmount * rStated * factor / (factor - 1);
  }

  // Step 2: Determine effective monthly rate (bisection solver)
  let effectiveMonthlyRate = 0;

  if (feesAmount === 0) {
    // If no fees, APR equals the stated rate
    effectiveMonthlyRate = (statedRatePct / 100) / 12;
  } else {
    // Bisect to solve for rate r such that PV(monthlyPayment, termMonths, r) === netProceeds
    let lo = 1e-10;
    let hi = 0.5; // High bound corresponding to 600% annual interest rate
    let converged = false;

    for (let i = 0; i < 200; i++) {
      const mid = (lo + hi) / 2;
      const pv = pvAtRate(monthlyPayment, termMonths, mid);
      if (pv > netProceeds) {
        lo = mid;
      } else {
        hi = mid;
      }
      if (Math.abs(hi - lo) < 1e-10) {
        converged = true;
        break;
      }
    }

    if (!converged && Math.abs(pvAtRate(monthlyPayment, termMonths, (lo + hi) / 2) - netProceeds) > 0.01) {
      return { error: 'Could not compute APR for the provided inputs.' };
    }

    effectiveMonthlyRate = (lo + hi) / 2;
  }

  // Step 3: Convert to nominal annualized APR
  const estimatedAPR = effectiveMonthlyRate * 12 * 100;

  // Step 4: Totals calculation
  const totalScheduledInterest = (monthlyPayment * termMonths) - loanAmount;
  const totalFees = feesAmount;
  const totalInterestPlusFees = totalScheduledInterest + totalFees;
  const totalCashPaid = (monthlyPayment * termMonths) + totalFees;

  return {
    estimatedAPR,
    monthlyPayment,
    netProceeds,
    totalScheduledInterest,
    totalFees,
    totalInterestPlusFees,
    totalCashPaid,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function APRCalculator() {
  // String-based input state to safely preserve temporary input editing states
  const [loanAmountStr, setLoanAmountStr] = useState<string>('20000');
  const [statedRateStr, setStatedRateStr] = useState<string>('5');
  const [termMonthsStr, setTermMonthsStr] = useState<string>('60');
  const [feeValStr, setFeeValStr]         = useState<string>('1000');
  const [feeMode, setFeeMode]             = useState<'dollar' | 'percent'>('dollar');

  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);

  // Parsed numerical inputs
  const loanAmount  = parseFloat(loanAmountStr);
  const statedRate  = parseFloat(statedRateStr);
  const termMonths  = parseInt(termMonthsStr, 10);
  const feeValInput = parseFloat(feeValStr);

  // Compute fee amount in dollars depending on mode
  const feesAmount = useMemo(() => {
    if (isNaN(feeValInput) || feeValInput < 0) return 0;
    if (feeMode === 'percent') {
      return (loanAmount || 0) * (feeValInput / 100);
    }
    return feeValInput;
  }, [feeValInput, feeMode, loanAmount]);

  // Validation
  const validationError: string | null = useMemo(() => {
    if (!loanAmountStr.trim() || isNaN(loanAmount) || loanAmount <= 0) return 'Loan amount must be greater than $0.';
    if (loanAmount > 10_000_000) return 'Loan amount cannot exceed $10,000,000.';
    if (!statedRateStr.trim() || isNaN(statedRate) || statedRate < 0) return 'Stated rate must be 0% or greater.';
    if (statedRate > 30) return 'Stated rate cannot exceed 30%.';
    if (!termMonthsStr.trim() || isNaN(termMonths) || termMonths < 1) return 'Loan term must be at least 1 month.';
    if (termMonths > 480) return 'Loan term cannot exceed 480 months (40 years).';
    if (!feeValStr.trim() || isNaN(feeValInput) || feeValInput < 0) return 'Fees cannot be negative.';
    if (feesAmount >= loanAmount) return 'Fees cannot equal or exceed the total loan amount.';
    return null;
  }, [loanAmountStr, loanAmount, statedRateStr, statedRate, termMonthsStr, termMonths, feeValStr, feeValInput, feesAmount]);

  // Derived calculation result
  const calculationResult = useMemo(() => {
    if (validationError) return null;
    return calculateAPR(loanAmount, statedRate, termMonths, feesAmount);
  }, [loanAmount, statedRate, termMonths, feesAmount, validationError]);

  const result = calculationResult && !('error' in calculationResult) ? calculationResult : null;
  const calcError = calculationResult && 'error' in calculationResult ? calculationResult.error : null;

  // Formatters
  const fmt = (n: number) => '$' + (Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—');
  const fmtPct = (n: number) => (Number.isFinite(n) ? n.toFixed(2) + '%' : '—');

  const inputClass = 'w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]';
  const labelClass = 'text-xs font-semibold text-slate-500';

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Input Panel */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Loan & Fee Parameters</h3>

          {/* Loan Amount */}
          <div className="space-y-1">
            <label htmlFor="apr-loan-amount" className={labelClass}>Loan Amount ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="apr-loan-amount"
                type="number"
                min="0.01"
                step="100"
                value={loanAmountStr}
                onChange={(e) => setLoanAmountStr(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Stated Interest Rate */}
          <div className="space-y-1">
            <label htmlFor="apr-stated-rate" className={labelClass}>Stated Interest Rate (%)</label>
            <div className="relative">
              <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="apr-stated-rate"
                type="number"
                min="0"
                max="30"
                step="0.01"
                value={statedRateStr}
                onChange={(e) => setStatedRateStr(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-1">
            <label htmlFor="apr-term-months" className={labelClass}>Loan Term (Months)</label>
            <input
              id="apr-term-months"
              type="number"
              min="1"
              max="480"
              step="1"
              value={termMonthsStr}
              onChange={(e) => setTermMonthsStr(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]"
            />
          </div>

          {/* Fees Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="apr-fee-val" className={labelClass}>Upfront Loan Fees / Points</label>
              <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-0.5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFeeMode('dollar')}
                  className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                    feeMode === 'dollar'
                      ? 'bg-white dark:bg-gray-900 text-blue-600'
                      : 'text-slate-500'
                  }`}
                >
                  $
                </button>
                <button
                  type="button"
                  onClick={() => setFeeMode('percent')}
                  className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
                    feeMode === 'percent'
                      ? 'bg-white dark:bg-gray-900 text-blue-600'
                      : 'text-slate-500'
                  }`}
                >
                  %
                </button>
              </div>
            </div>
            <div className="relative">
              {feeMode === 'dollar' ? (
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              ) : (
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              )}
              <input
                id="apr-fee-val"
                type="number"
                min="0"
                step="10"
                value={feeValStr}
                onChange={(e) => setFeeValStr(e.target.value)}
                className={inputClass}
              />
            </div>
            {feeMode === 'percent' && !isNaN(loanAmount) && loanAmount > 0 && (
              <p className="text-[11px] text-slate-400 mt-1">
                Calculated Fee: {fmt(feesAmount)}
              </p>
            )}
          </div>

          {/* Validation or Logic Errors */}
          {(validationError || calcError) && (
            <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs rounded-lg font-semibold flex items-center gap-1.5">
              <Info className="h-4 w-4 shrink-0" />
              <span>{validationError || calcError}</span>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Estimated APR Primary Card */}
          <div className="bg-[#1a3c5e] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-md min-h-[160px]">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Estimated APR</span>
            
            <div aria-live="polite" aria-label={result ? `Estimated APR: ${fmtPct(result.estimatedAPR)}` : 'Enter valid inputs to calculate APR'}>
              {result ? (
                <div className="text-5xl font-black font-mono text-orange-400">
                  {fmtPct(result.estimatedAPR)}
                </div>
              ) : (
                <div className="text-2xl font-bold text-blue-300/60">—</div>
              )}
            </div>

            {result && (
              <div className="text-xs text-blue-200/90 font-medium">
                Stated Rate: <span className="font-semibold text-white">{fmtPct(statedRate)}</span> | Estimated APR: <span className="font-semibold text-orange-300">{fmtPct(result.estimatedAPR)}</span>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          {result && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Monthly Payment</span>
                <span className="text-lg font-black font-mono">{fmt(result.monthlyPayment)}</span>
              </div>

              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Net Proceeds</span>
                <span className="text-lg font-black font-mono">{fmt(result.netProceeds)}</span>
              </div>

              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Scheduled Interest</span>
                <span className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">{fmt(result.totalScheduledInterest)}</span>
              </div>

              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Fees</span>
                <span className="text-lg font-black font-mono text-amber-500">{fmt(result.totalFees)}</span>
              </div>

              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Interest + Fees</span>
                <span className="text-lg font-black font-mono text-orange-500">{fmt(result.totalInterestPlusFees)}</span>
              </div>

              <div className="bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Cash Paid</span>
                <span className="text-lg font-black font-mono">{fmt(result.totalCashPaid)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assumptions Collapsible Section */}
      <div className="border border-gray-200/60 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
        <button
          type="button"
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="flex items-center justify-between w-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-expanded={showAssumptions}
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-blue-500" />
            Calculation Assumptions & Important Disclosures
          </span>
          <span className="text-blue-600 text-xs font-semibold">{showAssumptions ? 'Hide' : 'Show'}</span>
        </button>

        {showAssumptions && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pt-2 border-t border-gray-200/60 dark:border-gray-800 leading-relaxed">
            <p>
              Estimated annualized borrowing cost includes only the upfront fees entered into this calculator. This calculation represents a nominal annualized rate (monthly rate × 12) and may differ from lender or official regulatory APR calculations, which may incorporate additional underwriting rules, closing costs, or escrow items.
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Assumes a fixed-rate installment loan with equal monthly payments.</li>
              <li>Fees are assumed to be paid upfront at loan origination, reducing net loan proceeds.</li>
              <li>Does not model early prepayment, variable rate adjustments, or late payment penalties.</li>
            </ul>
          </div>
        )}
      </div>

      {/* General Financial Disclaimer */}
      <p className="text-[11px] text-slate-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
        This calculator provides estimates for informational and educational purposes only and does not constitute financial advice. Actual APR and loan terms may vary depending on lender requirements, credit profile, and applicable state/federal regulations.
      </p>
    </div>
  );
}
