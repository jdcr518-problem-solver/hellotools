'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, RefreshCw, AlertCircle, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  extra: number;
  balance: number;
}

export default function StudentLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('30000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('120'); // Months
  const [extraPayment, setExtraPayment] = useState('0');

  // Outputs
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [payoffMonths, setPayoffMonths] = useState(0);

  // Accelerated stats
  const [acceleratedInterest, setAcceleratedInterest] = useState(0);
  const [interestSaved, setInterestSaved] = useState(0);
  const [monthsSaved, setMonthsSaved] = useState(0);

  // Schedules
  const [monthlySchedule, setMonthlySchedule] = useState<AmortizationRow[]>([]);
  const [annualSchedule, setAnnualSchedule] = useState<AmortizationRow[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleType, setScheduleType] = useState<'monthly' | 'annual'>('annual');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const calculateLoan = () => {
    setErrorMsg(null);

    const P = parseFloat(loanAmount);
    const apr = parseFloat(interestRate);
    const N = parseInt(loanTerm);
    const E = parseFloat(extraPayment) || 0;

    if (isNaN(P) || P <= 0) {
      setErrorMsg('Please enter a valid loan amount.');
      return;
    }
    if (isNaN(apr) || apr < 0 || apr > 100) {
      setErrorMsg('Please enter a valid interest rate between 0% and 100%.');
      return;
    }
    if (isNaN(N) || N < 1 || N > 600) {
      setErrorMsg('Please enter a term between 1 and 600 months.');
      return;
    }
    if (E < 0) {
      setErrorMsg('Extra payment cannot be negative.');
      return;
    }

    const r = (apr / 100) / 12;

    // 1. Standard Monthly Payment (without extra payments)
    let stdPayment = 0;
    if (apr === 0) {
      stdPayment = P / N;
    } else {
      stdPayment = P * (r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    }
    
    // Round to 2 decimal places to model standard financial ledger rounding
    const roundedStdPayment = Math.round(stdPayment * 100) / 100;
    setMonthlyPayment(roundedStdPayment);

    // 2. Standard Repayment Simulation (ledger style to prevent math drift)
    let stdBalance = P;
    let stdTotalInterest = 0;
    for (let month = 1; month <= N; month++) {
      const interestPaid = Math.round(stdBalance * r * 100) / 100;
      let principalPaid = roundedStdPayment - interestPaid;
      if (stdBalance < principalPaid) {
        principalPaid = stdBalance;
      }
      stdTotalInterest += interestPaid;
      stdBalance -= principalPaid;
    }

    // 3. Accelerated Repayment Simulation
    let balance = P;
    let accTotalInterest = 0;
    let period = 0;
    const tempMonthly: AmortizationRow[] = [];

    while (balance > 0.01 && period < 600) {
      period++;
      const interestPaid = Math.round(balance * r * 100) / 100;
      let principalPaid = roundedStdPayment - interestPaid;

      // Handle final payment bounds
      if (balance < principalPaid) {
        principalPaid = balance;
      }

      let extraPaid = E;
      if (balance - principalPaid < extraPaid) {
        extraPaid = Math.max(0, balance - principalPaid);
      }

      accTotalInterest += interestPaid;
      balance = Math.max(0, balance - (principalPaid + extraPaid));

      tempMonthly.push({
        period,
        payment: roundedStdPayment,
        principal: principalPaid,
        interest: interestPaid,
        extra: extraPaid,
        balance: Math.round(balance * 100) / 100,
      });
    }

    // Assign main stats
    setTotalInterest(stdTotalInterest);
    setTotalPayments(P + stdTotalInterest);
    setPayoffMonths(N);

    // Accelerated results
    setAcceleratedInterest(accTotalInterest);
    setInterestSaved(Math.max(0, stdTotalInterest - accTotalInterest));
    setMonthsSaved(Math.max(0, N - period));

    setMonthlySchedule(tempMonthly);

    // Aggregate to Annual Schedule
    const tempAnnual: AmortizationRow[] = [];
    let yearInterest = 0;
    let yearPrincipal = 0;
    let yearExtra = 0;
    let yearPayment = 0;

    tempMonthly.forEach((row, idx) => {
      yearInterest += row.interest;
      yearPrincipal += row.principal;
      yearExtra += row.extra;
      yearPayment += row.payment;

      // Every 12 months or at the end of the schedule
      if (row.period % 12 === 0 || idx === tempMonthly.length - 1) {
        const yearNum = Math.ceil(row.period / 12);
        tempAnnual.push({
          period: yearNum,
          payment: yearPayment,
          principal: yearPrincipal,
          interest: yearInterest,
          extra: yearExtra,
          balance: row.balance,
        });
        // Reset annual aggregators
        yearInterest = 0;
        yearPrincipal = 0;
        yearExtra = 0;
        yearPayment = 0;
      }
    });

    setAnnualSchedule(tempAnnual);
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  const activeSchedule = scheduleType === 'monthly' ? monthlySchedule : annualSchedule;

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Panel Card */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800/80 shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Loan Parameters</h3>

          {/* Loan Amount */}
          <div className="space-y-1">
            <label htmlFor="loan-amount" className="text-xs font-semibold text-slate-500">Loan Amount ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-1">
            <label htmlFor="interest-rate" className="text-xs font-semibold text-slate-500">Interest Rate (APR %)</label>
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

          {/* Loan Term */}
          <div className="space-y-1">
            <label htmlFor="loan-term" className="text-xs font-semibold text-slate-500">Repayment Period (Months)</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                id="loan-term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Extra Monthly Payment */}
          <div className="pt-4 border-t border-gray-150 dark:border-gray-800 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Accelerate Repayment</span>
            <div className="space-y-1">
              <label htmlFor="extra-payment" className="text-xs font-semibold text-slate-500">Extra Monthly Payment ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="extra-payment"
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full pl-9 pr-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-750 dark:text-red-400 text-xs rounded-xl font-semibold flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>

        {/* Output Panel Card (Navy Blue theme) */}
        <div className="lg:col-span-7 bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400">Repayment Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Monthly Payment</span>
                <span className="text-2xl font-black font-mono text-white">${monthlyPayment.toFixed(2)}</span>
              </div>

              <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Total Interest Paid</span>
                <span className="text-2xl font-black font-mono text-white">${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-blue-200">
                <span>Principal: ${(parseFloat(loanAmount) || 0).toLocaleString()}</span>
                <span>Interest: ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="w-full bg-blue-950/50 rounded-full h-3 overflow-hidden flex border border-blue-800/20">
                <div
                  style={{ width: `${(parseFloat(loanAmount) / (parseFloat(loanAmount) + totalInterest)) * 100}%` }}
                  className="bg-blue-500 h-full"
                />
                <div
                  style={{ width: `${(totalInterest / (parseFloat(loanAmount) + totalInterest)) * 100}%` }}
                  className="bg-amber-400 h-full"
                />
              </div>
            </div>
          </div>

          {/* Extra Repayment Acceleration Card */}
          {(parseFloat(extraPayment) || 0) > 0 && (
            <div className="bg-blue-900/40 dark:bg-blue-950/60 p-4 rounded-xl border border-blue-600/30 dark:border-blue-900/20 space-y-3">
              <h4 className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Repayment Acceleration Results</span>
              </h4>
              <div className="grid grid-cols-2 gap-4 text-slate-100">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300 block">Interest Saved</span>
                  <span className="text-lg font-extrabold text-green-400 font-mono">${interestSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300 block">Time Cut Off</span>
                  <span className="text-lg font-extrabold text-green-400 font-mono">{monthsSaved} Months</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-blue-800/35 dark:border-blue-900/20 flex justify-between items-center text-[10px] font-bold text-blue-300">
            <span>Repayment Plan: Standard amortized</span>
            <span>Tax-free interest model</span>
          </div>

        </div>

      </div>

      {/* Amortization Schedule Drawer */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800/80 shadow-sm overflow-hidden">
        
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="w-full p-4 flex justify-between items-center font-bold text-xs uppercase tracking-wider text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all select-none cursor-pointer"
        >
          <span>Repayment Amortization Schedule</span>
          {showSchedule ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showSchedule && (
          <div className="p-5 border-t border-gray-150 dark:border-gray-800 space-y-4">
            
            <div className="flex gap-2 p-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-xs overflow-hidden">
              <button
                onClick={() => setScheduleType('annual')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  scheduleType === 'annual'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                Annual View
              </button>
              <button
                onClick={() => setScheduleType('monthly')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  scheduleType === 'monthly'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                Monthly View
              </button>
            </div>

            <div className="overflow-x-auto max-h-[350px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-850/40 border-b border-gray-150 dark:border-gray-800 text-slate-550 font-bold sticky top-0 backdrop-blur-sm z-10">
                    <th className="p-3">{scheduleType === 'annual' ? 'Year' : 'Month'}</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Principal</th>
                    {parseFloat(extraPayment) > 0 && <th className="p-3">Extra</th>}
                    <th className="p-3">Interest</th>
                    <th className="p-3">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono font-medium text-slate-650 dark:text-slate-350">
                  {activeSchedule.map((row) => (
                    <tr key={`schedule-row-${row.period}`} className="hover:bg-slate-50/20 dark:hover:bg-gray-850/5">
                      <td className="p-3 font-semibold">{row.period}</td>
                      <td className="p-3">${row.payment.toFixed(2)}</td>
                      <td className="p-3">${row.principal.toFixed(2)}</td>
                      {parseFloat(extraPayment) > 0 && (
                        <td className="p-3 text-green-600 dark:text-green-450">${row.extra.toFixed(2)}</td>
                      )}
                      <td className="p-3 text-amber-600 dark:text-amber-500">${row.interest.toFixed(2)}</td>
                      <td className="p-3 font-bold text-slate-800 dark:text-slate-200">${row.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
