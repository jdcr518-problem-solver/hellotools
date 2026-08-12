'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, HelpCircle, AlertCircle, Sparkles, Check, TrendingUp, BarChart, ChevronUp, ChevronDown } from 'lucide-react';

interface MonthlyBreakdown {
  month: number;
  deposit: number;
  interestEarned: number;
  totalInterest: number;
  balance: number;
}

export default function SavingsGoalCalculator() {
  const [calcMode, setCalcMode] = useState<'timeline' | 'deposit'>('timeline');

  // Inputs
  const [targetGoal, setTargetGoal] = useState('10000');
  const [currentSavings, setCurrentSavings] = useState('1000');
  const [interestRate, setInterestRate] = useState('5');
  const [compoundFreq, setCompoundFreq] = useState('12'); // Compounds per year: 12=monthly, 365=daily, 4=quarterly, 2=semi, 1=annual

  // Mode: timeline inputs
  const [monthlyDeposit, setMonthlyDeposit] = useState('200');

  // Mode: deposit inputs
  const [targetMonths, setTargetMonths] = useState('24');

  // Outputs
  const [monthsNeeded, setMonthsNeeded] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [endingBalance, setEndingBalance] = useState(0);
  
  // Output: required deposit
  const [requiredDeposit, setRequiredDeposit] = useState(0);

  // Breakdown
  const [breakdown, setBreakdown] = useState<MonthlyBreakdown[]>([]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Compounding helper: calculates the monthly interest factor
  const getMonthlyInterestFactor = (apr: number, freq: number) => {
    const r = apr / 100;
    if (r === 0) return 0;
    // (1 + r/freq) ^ (freq/12) - 1
    return Math.pow(1 + r / freq, freq / 12) - 1;
  };

  const simulateTimeline = (
    goal: number,
    start: number,
    apr: number,
    freq: number,
    monthlySave: number
  ) => {
    let balance = start;
    let totalInterest = 0;
    let t = 0;
    const tempBreakdown: MonthlyBreakdown[] = [];

    const mFactor = getMonthlyInterestFactor(apr, freq);

    // If starting balance is already at or above goal
    if (balance >= goal) {
      return { months: 0, deposits: 0, interest: 0, balance, breakdown: [] };
    }

    // Limit to 600 months (50 years)
    while (balance < goal && t < 600) {
      t++;
      const interestThisMonth = Math.round(balance * mFactor * 100) / 100;
      totalInterest = Math.round((totalInterest + interestThisMonth) * 100) / 100;
      
      balance = Math.round((balance + interestThisMonth + monthlySave) * 100) / 100;

      tempBreakdown.push({
        month: t,
        deposit: monthlySave,
        interestEarned: interestThisMonth,
        totalInterest,
        balance,
      });
    }

    const totalSaved = start + (monthlySave * t);

    return {
      months: t,
      deposits: totalSaved,
      interest: totalInterest,
      balance,
      breakdown: tempBreakdown,
    };
  };

  const calculateSavings = () => {
    setErrorMsg(null);

    const goal = parseFloat(targetGoal);
    const start = parseFloat(currentSavings);
    const apr = parseFloat(interestRate);
    const freq = parseInt(compoundFreq);

    if (isNaN(goal) || goal <= 0) {
      setErrorMsg('Please enter a valid target goal amount.');
      return;
    }
    if (isNaN(start) || start < 0) {
      setErrorMsg('Please enter a valid current savings amount.');
      return;
    }
    if (start >= goal) {
      setErrorMsg('Your current savings already meet or exceed your savings goal!');
      return;
    }
    if (isNaN(apr) || apr < 0 || apr > 100) {
      setErrorMsg('Please enter a valid interest rate between 0% and 100%.');
      return;
    }

    if (calcMode === 'timeline') {
      const monthlySave = parseFloat(monthlyDeposit) || 0;
      if (monthlySave <= 0 && apr === 0) {
        setErrorMsg('Please enter a monthly deposit or an interest rate greater than 0.');
        return;
      }

      const res = simulateTimeline(goal, start, apr, freq, monthlySave);
      setMonthsNeeded(res.months);
      setTotalDeposits(res.deposits);
      setInterestEarned(res.interest);
      setEndingBalance(res.balance);
      setBreakdown(res.breakdown);
    } else {
      const months = parseInt(targetMonths);
      if (isNaN(months) || months < 1 || months > 600) {
        setErrorMsg('Please enter a target timeline between 1 and 600 months.');
        return;
      }

      // Binary search to find the required monthly deposit
      let low = 0;
      let high = goal;
      let bestDeposit = 0;

      for (let i = 0; i < 30; i++) {
        const mid = (low + high) / 2;
        const res = simulateTimeline(goal, start, apr, freq, mid);
        if (res.months <= months && res.months > 0) {
          bestDeposit = mid;
          high = mid; // Try to find a smaller required deposit
        } else {
          low = mid;
        }
      }

      // Re-run simulation with final required deposit
      const roundedDeposit = Math.round(bestDeposit * 100) / 100;
      setRequiredDeposit(roundedDeposit);

      const res = simulateTimeline(goal, start, apr, freq, roundedDeposit);
      setMonthsNeeded(res.months);
      setTotalDeposits(res.deposits);
      setInterestEarned(res.interest);
      setEndingBalance(res.balance);
      setBreakdown(res.breakdown);
    }
  };

  useEffect(() => {
    calculateSavings();
  }, [calcMode, targetGoal, currentSavings, interestRate, compoundFreq, monthlyDeposit, targetMonths]);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* Mode Selector Panel */}
      <div className="flex bg-gray-150 dark:bg-gray-800 rounded-xl p-1 max-w-md overflow-hidden">
        <button
          onClick={() => setCalcMode('timeline')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            calcMode === 'timeline'
              ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          Calculate Time to Goal
        </button>
        <button
          onClick={() => setCalcMode('deposit')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            calcMode === 'deposit'
              ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          Calculate Monthly Deposit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Inputs Column */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800/80 shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Goal Parameters</h3>

          {/* Target Goal */}
          <div className="space-y-1">
            <label htmlFor="target-goal" className="text-xs font-semibold text-slate-500">Savings Target ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="target-goal"
                type="number"
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Current Savings */}
          <div className="space-y-1">
            <label htmlFor="current-savings" className="text-xs font-semibold text-slate-500">Current Savings ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="current-savings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Monthly Deposit (Time Mode) */}
          {calcMode === 'timeline' && (
            <div className="space-y-1">
              <label htmlFor="monthly-deposit" className="text-xs font-semibold text-slate-500">Monthly Contribution ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="monthly-deposit"
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Target Months (Deposit Mode) */}
          {calcMode === 'deposit' && (
            <div className="space-y-1">
              <label htmlFor="target-months" className="text-xs font-semibold text-slate-500">Timeframe (Months)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="target-months"
                  type="number"
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Interest Rate */}
          <div className="space-y-1">
            <label htmlFor="interest-rate" className="text-xs font-semibold text-slate-500">Annual Interest Rate (APY %)</label>
            <div className="relative">
              <Percent className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="interest-rate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="space-y-1">
            <label htmlFor="compound-frequency" className="text-xs font-semibold text-slate-500">Compound Frequency</label>
            <select
              id="compound-frequency"
              value={compoundFreq}
              onChange={(e) => setCompoundFreq(e.target.value)}
              className="w-full p-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none cursor-pointer"
            >
              <option value="365">Daily</option>
              <option value="12">Monthly</option>
              <option value="4">Quarterly</option>
              <option value="2">Semi-annually</option>
              <option value="1">Annually</option>
            </select>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-750 dark:text-red-400 text-xs rounded-xl font-semibold flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>

        {/* Outputs Column */}
        <div className="lg:col-span-7 bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400">Savings Timeline</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {calcMode === 'timeline' ? (
                <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Time to Goal</span>
                  <span className="text-2xl font-black font-mono text-white">
                    {monthsNeeded >= 600 ? '50+ Years' : `${monthsNeeded} Months`}
                  </span>
                </div>
              ) : (
                <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Required Monthly Deposit</span>
                  <span className="text-2xl font-black font-mono text-white">${requiredDeposit.toFixed(2)}</span>
                </div>
              )}

              <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Total Interest Earned</span>
                <span className="text-2xl font-black font-mono text-white">
                  ${interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Visual ratio progress timeline */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-blue-200">
                <span>Start: ${(parseFloat(currentSavings) || 0).toLocaleString()}</span>
                <span>Target: ${(parseFloat(targetGoal) || 0).toLocaleString()}</span>
              </div>
              <div className="w-full bg-blue-950/50 rounded-full h-3 overflow-hidden flex border border-blue-800/20">
                <div
                  style={{ width: `${Math.min(100, (parseFloat(currentSavings) / parseFloat(targetGoal)) * 100)}%` }}
                  className="bg-blue-500 h-full"
                />
                <div
                  style={{ width: `${Math.min(100, (interestEarned / parseFloat(targetGoal)) * 100)}%` }}
                  className="bg-green-400 h-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-900/40 dark:bg-blue-950/60 p-4 rounded-xl border border-blue-600/30 dark:border-blue-900/20 space-y-2">
            <h4 className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span>Investment Breakdown</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-100">
              <div>
                <span className="text-[9px] font-bold text-blue-350 block">Your Deposits</span>
                <span>${(parseFloat(currentSavings) + (calcMode === 'timeline' ? (parseFloat(monthlyDeposit) || 0) : requiredDeposit) * monthsNeeded).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-blue-350 block">Growth Compound Interest</span>
                <span>${interestEarned.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Monthly Breakdown Table */}
      {breakdown.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800/80 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full p-4 flex justify-between items-center font-bold text-xs uppercase tracking-wider text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all select-none cursor-pointer"
          >
            <span>Milestone Growth Table</span>
            {showBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showBreakdown && (
            <div className="p-5 border-t border-gray-150 dark:border-gray-800">
              <div className="overflow-x-auto max-h-[350px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-850/40 border-b border-gray-150 dark:border-gray-800 text-slate-550 font-bold sticky top-0 backdrop-blur-sm z-10">
                      <th className="p-3">Month</th>
                      <th className="p-3">Deposit</th>
                      <th className="p-3">Interest Earned</th>
                      <th className="p-3">Total Interest</th>
                      <th className="p-3">End Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono font-medium text-slate-650 dark:text-slate-350">
                    {breakdown.map((row) => (
                      <tr key={`savings-row-${row.month}`} className="hover:bg-slate-50/20 dark:hover:bg-gray-850/5">
                        <td className="p-3 font-semibold">{row.month}</td>
                        <td className="p-3">${row.deposit.toFixed(2)}</td>
                        <td className="p-3 text-green-600 dark:text-green-450">${row.interestEarned.toFixed(2)}</td>
                        <td className="p-3 text-slate-450">${row.totalInterest.toFixed(2)}</td>
                        <td className="p-3 font-bold text-slate-800 dark:text-slate-200">${row.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
