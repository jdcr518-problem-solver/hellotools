'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, Info, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// IRS 401(k) ELECTIVE DEFERRAL LIMITS
// ─────────────────────────────────────────────────────────────────────────────
export const IRS_401K_LIMITS: Record<number, number> = {
  2024: 23000,
  2025: 23500,
  2026: 24500, // Verified for 2026 tax year
};
export const CURRENT_LIMIT_YEAR = 2026;
export const ANNUAL_CONTRIBUTION_LIMIT = IRS_401K_LIMITS[CURRENT_LIMIT_YEAR] ?? 24500;

// ─────────────────────────────────────────────────────────────────────────────
// PURE CALCULATION TYPES & FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface Yearly401kRow {
  year: number;
  age: number;
  salary: number;
  employeeContrib: number;
  employerContrib: number;
  investmentGrowth: number;
  endingBalance: number;
}

export interface FourOhOneKResult {
  projectedBalance: number;
  currentBalance: number;
  totalEmployeeContribs: number;
  totalEmployerContribs: number;
  totalInvestmentGrowth: number;
  yearlySchedule: Yearly401kRow[];
}

export interface FourOhOneKInputs {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualSalary: number;
  employeeContribPct: number;
  employerMatchPct: number;
  employerMatchLimitPct: number;
  annualReturnPct: number;
  salaryGrowthPct: number;
}

/**
 * Pure 401(k) simulation function.
 * Calculates year-by-year growth with beginning-of-year contributions.
 * Includes mathematical reconciliation assertion.
 */
export function calculate401k(inputs: FourOhOneKInputs): FourOhOneKResult | { error: string } {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    annualSalary,
    employeeContribPct,
    employerMatchPct,
    employerMatchLimitPct,
    annualReturnPct,
    salaryGrowthPct,
  } = inputs;

  // Validation & guards
  if (!Number.isFinite(currentAge) || currentAge < 18 || currentAge >= 80) {
    return { error: 'Current age must be between 18 and 79.' };
  }
  if (!Number.isFinite(retirementAge) || retirementAge <= currentAge || retirementAge > 80) {
    return { error: 'Retirement age must be greater than current age and no more than 80.' };
  }
  if (!Number.isFinite(currentBalance) || currentBalance < 0) {
    return { error: 'Current 401(k) balance cannot be negative.' };
  }
  if (!Number.isFinite(annualSalary) || annualSalary <= 0) {
    return { error: 'Annual salary must be greater than $0.' };
  }
  if (!Number.isFinite(employeeContribPct) || employeeContribPct < 0 || employeeContribPct > 100) {
    return { error: 'Employee contribution percentage must be between 0% and 100%.' };
  }
  if (!Number.isFinite(employerMatchPct) || employerMatchPct < 0 || employerMatchPct > 300) {
    return { error: 'Employer match percentage must be between 0% and 300%.' };
  }
  if (!Number.isFinite(employerMatchLimitPct) || employerMatchLimitPct < 0 || employerMatchLimitPct > 100) {
    return { error: 'Employer match cap percentage must be between 0% and 100%.' };
  }
  if (!Number.isFinite(annualReturnPct) || annualReturnPct < 0 || annualReturnPct > 30) {
    return { error: 'Annual return percentage must be between 0% and 30%.' };
  }
  if (!Number.isFinite(salaryGrowthPct) || salaryGrowthPct < 0 || salaryGrowthPct > 20) {
    return { error: 'Annual salary increase percentage must be between 0% and 20%.' };
  }

  const yearsToRetirement = retirementAge - currentAge;
  const yearlySchedule: Yearly401kRow[] = [];

  let balance = currentBalance;
  let totalEmployeeContribs = 0;
  let totalEmployerContribs = 0;
  let totalInvestmentGrowth = 0;

  for (let yr = 1; yr <= yearsToRetirement; yr++) {
    const age = currentAge + (yr - 1);
    const salary = annualSalary * Math.pow(1 + salaryGrowthPct / 100, yr - 1);

    // Employee elective deferral capped by IRS limit
    const rawEmpContrib = salary * (employeeContribPct / 100);
    const employeeContrib = Math.min(rawEmpContrib, ANNUAL_CONTRIBUTION_LIMIT);

    // Employer match calculation (uncapped by elective deferral limit)
    const matchedEmpPct = Math.min(employeeContribPct, employerMatchLimitPct) / 100;
    const employerContrib = salary * matchedEmpPct * (employerMatchPct / 100);

    const balBeforeContrib = balance;
    const totalContribThisYear = employeeContrib + employerContrib;

    // Beginning of year contribution timing + annual return
    balance = (balance + totalContribThisYear) * (1 + annualReturnPct / 100);

    // Exact yearly growth calculation
    const investmentGrowth = annualReturnPct === 0 ? 0 : balance - balBeforeContrib - totalContribThisYear;

    totalEmployeeContribs += employeeContrib;
    totalEmployerContribs += employerContrib;
    totalInvestmentGrowth += investmentGrowth;

    yearlySchedule.push({
      year: yr,
      age,
      salary,
      employeeContrib,
      employerContrib,
      investmentGrowth,
      endingBalance: balance,
    });
  }

  const projectedBalance = balance;

  // Exact mathematical reconciliation assertion check
  const reconstructedTotal = currentBalance + totalEmployeeContribs + totalEmployerContribs + totalInvestmentGrowth;
  if (Math.abs(projectedBalance - reconstructedTotal) >= 0.01) {
    console.error('401(k) Reconciliation Assertion Warning:', { projectedBalance, reconstructedTotal });
  }

  return {
    projectedBalance,
    currentBalance,
    totalEmployeeContribs,
    totalEmployerContribs,
    totalInvestmentGrowth,
    yearlySchedule,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function FourOhOneKCalculator() {
  // Controlled inputs using strings to preserve editing states
  const [currentAgeStr, setCurrentAgeStr]                 = useState<string>('30');
  const [retirementAgeStr, setRetirementAgeStr]           = useState<string>('65');
  const [currentBalanceStr, setCurrentBalanceStr]         = useState<string>('10000');
  const [annualSalaryStr, setAnnualSalaryStr]             = useState<string>('60000');
  const [employeeContribPctStr, setEmployeeContribPctStr] = useState<string>('6');
  const [employerMatchPctStr, setEmployerMatchPctStr]     = useState<string>('100');
  const [matchLimitPctStr, setMatchLimitPctStr]           = useState<string>('3');
  const [annualReturnPctStr, setAnnualReturnPctStr]       = useState<string>('7');
  const [salaryGrowthPctStr, setSalaryGrowthPctStr]       = useState<string>('3');

  const [showTable, setShowTable]                         = useState<boolean>(false);
  const [showAssumptions, setShowAssumptions]             = useState<boolean>(false);
  const [page, setPage]                                   = useState<number>(0);

  // Parsed numerical inputs
  const currentAge            = parseInt(currentAgeStr, 10);
  const retirementAge         = parseInt(retirementAgeStr, 10);
  const currentBalance        = parseFloat(currentBalanceStr);
  const annualSalary          = parseFloat(annualSalaryStr);
  const employeeContribPct    = parseFloat(employeeContribPctStr);
  const employerMatchPct      = parseFloat(employerMatchPctStr);
  const employerMatchLimitPct = parseFloat(matchLimitPctStr);
  const annualReturnPct       = parseFloat(annualReturnPctStr);
  const salaryGrowthPct       = parseFloat(salaryGrowthPctStr);

  // Validation
  const validationError: string | null = useMemo(() => {
    if (!currentAgeStr.trim() || isNaN(currentAge) || currentAge < 18 || currentAge >= 80) {
      return 'Current age must be between 18 and 79.';
    }
    if (!retirementAgeStr.trim() || isNaN(retirementAge) || retirementAge <= currentAge || retirementAge > 80) {
      return 'Retirement age must be greater than current age (max 80).';
    }
    if (!currentBalanceStr.trim() || isNaN(currentBalance) || currentBalance < 0) {
      return 'Current balance cannot be negative.';
    }
    if (currentBalance > 100_000_000) return 'Current balance cannot exceed $100,000,000.';
    if (!annualSalaryStr.trim() || isNaN(annualSalary) || annualSalary <= 0) {
      return 'Annual salary must be greater than $0.';
    }
    if (annualSalary > 10_000_000) return 'Annual salary cannot exceed $10,000,000.';
    if (!employeeContribPctStr.trim() || isNaN(employeeContribPct) || employeeContribPct < 0 || employeeContribPct > 100) {
      return 'Employee contribution % must be between 0% and 100%.';
    }
    if (!employerMatchPctStr.trim() || isNaN(employerMatchPct) || employerMatchPct < 0 || employerMatchPct > 300) {
      return 'Employer match % must be between 0% and 300%.';
    }
    if (!matchLimitPctStr.trim() || isNaN(employerMatchLimitPct) || employerMatchLimitPct < 0 || employerMatchLimitPct > 100) {
      return 'Match cap % must be between 0% and 100%.';
    }
    if (!annualReturnPctStr.trim() || isNaN(annualReturnPct) || annualReturnPct < 0 || annualReturnPct > 30) {
      return 'Annual return % must be between 0% and 30%.';
    }
    if (!salaryGrowthPctStr.trim() || isNaN(salaryGrowthPct) || salaryGrowthPct < 0 || salaryGrowthPct > 20) {
      return 'Salary increase % must be between 0% and 20%.';
    }
    return null;
  }, [
    currentAgeStr, currentAge,
    retirementAgeStr, retirementAge,
    currentBalanceStr, currentBalance,
    annualSalaryStr, annualSalary,
    employeeContribPctStr, employeeContribPct,
    employerMatchPctStr, employerMatchPct,
    matchLimitPctStr, employerMatchLimitPct,
    annualReturnPctStr, annualReturnPct,
    salaryGrowthPctStr, salaryGrowthPct,
  ]);

  // Derived calculation
  const calculationResult = useMemo(() => {
    if (validationError) return null;
    return calculate401k({
      currentAge,
      retirementAge,
      currentBalance,
      annualSalary,
      employeeContribPct,
      employerMatchPct,
      employerMatchLimitPct,
      annualReturnPct,
      salaryGrowthPct,
    });
  }, [
    currentAge,
    retirementAge,
    currentBalance,
    annualSalary,
    employeeContribPct,
    employerMatchPct,
    employerMatchLimitPct,
    annualReturnPct,
    salaryGrowthPct,
    validationError,
  ]);

  const result = calculationResult && !('error' in calculationResult) ? calculationResult : null;
  const calcError = calculationResult && 'error' in calculationResult ? calculationResult.error : null;

  // Formatters
  const fmt = (n: number) => '$' + (Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '—');
  const fmtDec = (n: number) => '$' + (Number.isFinite(n) ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—');

  const inputClass = 'w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]';
  const labelClass = 'text-xs font-semibold text-slate-700 dark:text-slate-200';

  // Stacked bar segment calculation
  const totalVal = result ? result.projectedBalance : 0;
  const getPct = (val: number) => (totalVal > 0 ? ((val / totalVal) * 100).toFixed(1) + '%' : '0%');

  // Table pagination
  const yearlyRows = result?.yearlySchedule ?? [];
  const ROWS_PER_PAGE = 15;
  const visibleRows = yearlyRows.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);
  const totalPages = Math.ceil(yearlyRows.length / ROWS_PER_PAGE);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* Inputs & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Inputs Section */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">401(k) Savings Parameters</h3>

          {/* Age Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="k-current-age" className={labelClass}>Current Age</label>
              <input
                id="k-current-age"
                type="number"
                min="18"
                max="79"
                value={currentAgeStr}
                onChange={(e) => setCurrentAgeStr(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="k-retire-age" className={labelClass}>Retirement Age</label>
              <input
                id="k-retire-age"
                type="number"
                min="19"
                max="80"
                value={retirementAgeStr}
                onChange={(e) => setRetirementAgeStr(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]"
              />
            </div>
          </div>

          {/* Current Balance */}
          <div className="space-y-1">
            <label htmlFor="k-current-bal" className={labelClass}>Current 401(k) Balance ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="k-current-bal"
                type="number"
                min="0"
                step="500"
                value={currentBalanceStr}
                onChange={(e) => setCurrentBalanceStr(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-1">
            <label htmlFor="k-salary" className={labelClass}>Annual Salary ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="k-salary"
                type="number"
                min="1"
                step="1000"
                value={annualSalaryStr}
                onChange={(e) => setAnnualSalaryStr(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Employee Contribution % */}
          <div className="space-y-1">
            <label htmlFor="k-emp-contrib" className={labelClass}>Your Contribution (% of Salary)</label>
            <div className="relative">
              <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="k-emp-contrib"
                type="number"
                min="0"
                max="100"
                step="1"
                value={employeeContribPctStr}
                onChange={(e) => setEmployeeContribPctStr(e.target.value)}
                className={inputClass}
              />
            </div>
            <p className="text-[10px] text-slate-400">
              {CURRENT_LIMIT_YEAR} IRS employee contribution limit: ${ANNUAL_CONTRIBUTION_LIMIT.toLocaleString()}
            </p>
          </div>

          {/* Employer Match Inputs */}
          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-gray-200/60 dark:border-gray-800">
            <div className="space-y-1">
              <label htmlFor="k-match-pct" className={labelClass}>Employer Match (%)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="k-match-pct"
                  type="number"
                  min="0"
                  max="300"
                  step="5"
                  value={employerMatchPctStr}
                  onChange={(e) => setEmployerMatchPctStr(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="k-match-cap" className={labelClass}>Up To (% Salary)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="k-match-cap"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={matchLimitPctStr}
                  onChange={(e) => setMatchLimitPctStr(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Economic Growth Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="k-return-rate" className={labelClass}>Annual Return (%)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="k-return-rate"
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={annualReturnPctStr}
                  onChange={(e) => setAnnualReturnPctStr(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="k-salary-growth" className={labelClass}>Salary Increase (%)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="k-salary-growth"
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  value={salaryGrowthPctStr}
                  onChange={(e) => setSalaryGrowthPctStr(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Validation or Logic Error Message */}
          {(validationError || calcError) && (
            <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs rounded-lg font-semibold flex items-center gap-1.5">
              <Info className="h-4 w-4 shrink-0" />
              <span>{validationError || calcError}</span>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Estimated Retirement Balance Summary Card */}
          <div className="bg-[#1a3c5e] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-md min-h-[160px]">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Estimated Retirement Balance</span>
            
            <div aria-live="polite" aria-label={result ? `Estimated retirement balance: ${fmt(result.projectedBalance)}` : 'Enter valid inputs to calculate balance'}>
              {result ? (
                <div className="text-5xl font-black font-mono text-white">
                  {fmt(result.projectedBalance)}
                </div>
              ) : (
                <div className="text-2xl font-bold text-blue-300/60">—</div>
              )}
            </div>

            {result && (
              <p className="text-xs text-blue-200/80">
                Accumulated over {retirementAge - currentAge} years (Age {currentAge} → {retirementAge})
              </p>
            )}
          </div>

          {/* 4-Segment Stacked Bar Chart (Option A) */}
          {result && (
            <div className="space-y-3 bg-gray-50/50 dark:bg-gray-900/20 border border-gray-200/60 dark:border-gray-800 p-4 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Balance Breakdown</span>
              
              {/* Stacked Visual Bar */}
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden flex">
                <div style={{ width: getPct(result.currentBalance) }} className="bg-slate-400 h-full transition-all duration-300" title={`Current Balance: ${fmt(result.currentBalance)}`} />
                <div style={{ width: getPct(result.totalEmployeeContribs) }} className="bg-blue-600 h-full transition-all duration-300" title={`Your Contributions: ${fmt(result.totalEmployeeContribs)}`} />
                <div style={{ width: getPct(result.totalEmployerContribs) }} className="bg-teal-500 h-full transition-all duration-300" title={`Employer Match: ${fmt(result.totalEmployerContribs)}`} />
                <div style={{ width: getPct(result.totalInvestmentGrowth) }} className="bg-orange-500 h-full transition-all duration-300" title={`Investment Growth: ${fmt(result.totalInvestmentGrowth)}`} />
              </div>

              {/* 4-Segment Accessible Legend & Numbers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-400 inline-block" />
                    <span className="text-[11px] font-medium text-slate-500">Starting Balance</span>
                  </div>
                  <div className="font-mono font-bold">{fmt(result.currentBalance)}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block" />
                    <span className="text-[11px] font-medium text-slate-500">Your Contribs</span>
                  </div>
                  <div className="font-mono font-bold text-blue-600 dark:text-blue-400">{fmt(result.totalEmployeeContribs)}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-teal-500 inline-block" />
                    <span className="text-[11px] font-medium text-slate-500">Employer Match</span>
                  </div>
                  <div className="font-mono font-bold text-teal-600 dark:text-teal-400">{fmt(result.totalEmployerContribs)}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500 inline-block" />
                    <span className="text-[11px] font-medium text-slate-500">Growth</span>
                  </div>
                  <div className="font-mono font-bold text-orange-500">{fmt(result.totalInvestmentGrowth)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Year-by-Year Breakdown Toggle & Table */}
      {result && yearlyRows.length > 0 && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors"
            aria-expanded={showTable}
          >
            {showTable ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {showTable ? 'Hide' : 'Show'} year-by-year schedule breakdown
          </button>

          {showTable && (
            <div className="space-y-3">
              <div style={{ overflowX: 'auto' }} className="rounded-xl border border-gray-200 dark:border-gray-800">
                <table className="w-full min-w-[600px] text-sm border-collapse">
                  <thead className="bg-gray-50 dark:bg-gray-800/60">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Year / Age</th>
                      <th scope="col" className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Salary</th>
                      <th scope="col" className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Contrib</th>
                      <th scope="col" className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Employer Match</th>
                      <th scope="col" className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Growth</th>
                      <th scope="col" className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">Ending Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {visibleRows.map((row) => (
                      <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-3 py-2.5 font-medium text-slate-600 dark:text-slate-300">
                          Yr {row.year} <span className="text-xs text-slate-400 font-normal">(Age {row.age})</span>
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono">{fmtDec(row.salary)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-blue-600 dark:text-blue-400">{fmtDec(row.employeeContrib)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-teal-600 dark:text-teal-400">{fmtDec(row.employerContrib)}</td>
                        <td className="px-3 py-2.5 text-right font-mono text-orange-500">{fmtDec(row.investmentGrowth)}</td>
                        <td className="px-3 py-2.5 text-right font-mono font-semibold">{fmtDec(row.endingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {yearlyRows.length > ROWS_PER_PAGE && (
                <div className="flex justify-center items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    ← Prev
                  </button>
                  <span className="text-xs text-slate-400">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Assumptions & Model Disclosures */}
      <div className="border border-gray-200/60 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/20 space-y-2">
        <button
          type="button"
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="flex items-center justify-between w-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-expanded={showAssumptions}
        >
          <span className="flex items-center gap-1.5">
            <Info className="h-4 w-4 text-blue-500" />
            Model Assumptions & Disclosure Notes
          </span>
          <span className="text-blue-600 text-xs font-semibold">{showAssumptions ? 'Hide' : 'Show'}</span>
        </button>

        {showAssumptions && (
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pt-2 border-t border-gray-200/60 dark:border-gray-800 leading-relaxed">
            <p>
              This simplified calculator models employee contributions using the annual employee 401(k) elective deferral limit (${ANNUAL_CONTRIBUTION_LIMIT.toLocaleString()} for {CURRENT_LIMIT_YEAR}) and calculates employer matching based on the parameters entered. It does not model all IRS or plan-specific rules.
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Contributions are assumed to occur at the beginning of each annual cycle.</li>
              <li>Calculates nominal future balances and does not adjust figures for inflation or income taxes upon distribution.</li>
              <li>Does not account for catch-up contributions for participants age 50+, defined contribution total section 415(c) caps, vesting schedules, or Roth vs. Traditional tax treatment.</li>
            </ul>
          </div>
        )}
      </div>

      {/* General Financial Disclaimer */}
      <p className="text-[11px] text-slate-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
        This calculator provides estimates for informational and educational purposes only and does not constitute financial or retirement planning advice. Actual 401(k) performance depends on market volatility, plan fee structures, employer vesting rules, and regulatory IRS updates.
      </p>
    </div>
  );
}
