'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, AlertCircle, Sparkles, TrendingUp, TrendingDown, Clipboard, Check } from 'lucide-react';

export default function NetWorthCalculator() {
  // Assets inputs
  const [cash, setCash] = useState('25000');
  const [investments, setInvestments] = useState('50000');
  const [realEstate, setRealEstate] = useState('150000');
  const [vehicles, setVehicles] = useState('25000');
  const [retirement, setRetirement] = useState('0');
  const [otherAssets, setOtherAssets] = useState('0');

  // Liabilities inputs
  const [mortgage, setMortgage] = useState('120000');
  const [studentLoans, setStudentLoans] = useState('20000');
  const [creditCards, setCreditCards] = useState('10000');
  const [carLoans, setCarLoans] = useState('0');
  const [otherDebts, setOtherDebts] = useState('0');

  // Calculations outputs
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [assetsToDebtRatio, setAssetsToDebtRatio] = useState(0);

  const calculateNetWorth = () => {
    // Parse helper
    const val = (s: string) => parseFloat(s) || 0;

    const assetsSum =
      val(cash) +
      val(investments) +
      val(realEstate) +
      val(vehicles) +
      val(retirement) +
      val(otherAssets);

    const liabilitiesSum =
      val(mortgage) +
      val(studentLoans) +
      val(creditCards) +
      val(carLoans) +
      val(otherDebts);

    const result = assetsSum - liabilitiesSum;

    setTotalAssets(assetsSum);
    setTotalLiabilities(liabilitiesSum);
    setNetWorth(result);

    // Compute ratio for the bar (debt as percentage of assets)
    if (assetsSum === 0) {
      setAssetsToDebtRatio(liabilitiesSum > 0 ? 100 : 0);
    } else {
      setAssetsToDebtRatio(Math.min(100, (liabilitiesSum / assetsSum) * 100));
    }
  };

  useEffect(() => {
    calculateNetWorth();
  }, [cash, investments, realEstate, vehicles, retirement, otherAssets, mortgage, studentLoans, creditCards, carLoans, otherDebts]);

  const isPositive = netWorth >= 0;

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs Column (Assets and Liabilities Lists - White Card) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800/80 shadow-sm space-y-6">
          
          {/* ASSETS SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-450 border-b border-green-100 dark:border-green-950/20 pb-2">
              Assets (What you own)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cash & Bank */}
              <div className="space-y-1">
                <label htmlFor="cash-bank" className="text-xs font-semibold text-slate-500">Cash & Bank Accounts ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="cash-bank"
                    type="number"
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Investments */}
              <div className="space-y-1">
                <label htmlFor="investments" className="text-xs font-semibold text-slate-500">Investment Portfolio ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="investments"
                    type="number"
                    value={investments}
                    onChange={(e) => setInvestments(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Real Estate */}
              <div className="space-y-1">
                <label htmlFor="real-estate" className="text-xs font-semibold text-slate-500">Real Estate Property ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="real-estate"
                    type="number"
                    value={realEstate}
                    onChange={(e) => setRealEstate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Vehicles */}
              <div className="space-y-1">
                <label htmlFor="vehicles" className="text-xs font-semibold text-slate-500">Vehicle Resale Value ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="vehicles"
                    type="number"
                    value={vehicles}
                    onChange={(e) => setVehicles(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Retirement */}
              <div className="space-y-1">
                <label htmlFor="retirement" className="text-xs font-semibold text-slate-500">Retirement Funds (401k/IRA) ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="retirement"
                    type="number"
                    value={retirement}
                    onChange={(e) => setRetirement(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Other Assets */}
              <div className="space-y-1">
                <label htmlFor="other-assets" className="text-xs font-semibold text-slate-500">Other / Valuables ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="other-assets"
                    type="number"
                    value={otherAssets}
                    onChange={(e) => setOtherAssets(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* LIABILITIES SECTION */}
          <div className="space-y-4 pt-4 border-t border-gray-150 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-650 dark:text-red-400 border-b border-red-55 dark:border-red-950/20 pb-2">
              Liabilities (What you owe)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mortgage */}
              <div className="space-y-1">
                <label htmlFor="mortgage" className="text-xs font-semibold text-slate-500">Mortgage Balance ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="mortgage"
                    type="number"
                    value={mortgage}
                    onChange={(e) => setMortgage(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Student Loans */}
              <div className="space-y-1">
                <label htmlFor="student-loans" className="text-xs font-semibold text-slate-500">Student Loan Debt ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="student-loans"
                    type="number"
                    value={studentLoans}
                    onChange={(e) => setStudentLoans(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Credit Cards */}
              <div className="space-y-1">
                <label htmlFor="credit-cards" className="text-xs font-semibold text-slate-500">Credit Card Balances ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="credit-cards"
                    type="number"
                    value={creditCards}
                    onChange={(e) => setCreditCards(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Car Loans */}
              <div className="space-y-1">
                <label htmlFor="car-loans" className="text-xs font-semibold text-slate-500">Car Loan Debt ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="car-loans"
                    type="number"
                    value={carLoans}
                    onChange={(e) => setCarLoans(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Other Debts */}
              <div className="space-y-1">
                <label htmlFor="other-debts" className="text-xs font-semibold text-slate-500">Other Debts / Bills ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="other-debts"
                    type="number"
                    value={otherDebts}
                    onChange={(e) => setOtherDebts(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Outputs Column (Navy Blue Card / Results Cards) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Main Net Worth Card */}
          <div className="bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 space-y-4 shadow-md flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200 dark:text-blue-400">
                Net Worth Summary
              </span>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-300 dark:text-blue-400 uppercase tracking-wider block">Calculated Net Worth</span>
                <div
                  className={`text-4xl font-black font-mono transition-all ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isPositive ? '' : '-'}${Math.abs(netWorth).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-blue-900/40 dark:border-blue-900/20">
              <div className="flex justify-between text-xs font-bold">
                <span>Total Assets:</span>
                <span className="font-mono text-green-400">${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span>Total Liabilities:</span>
                <span className="font-mono text-red-400">${totalLiabilities.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Assets vs Debt Ratio Progress Bar */}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-[10px] font-bold text-blue-200">
                <span>Debt Ratio</span>
                <span className="font-mono">{assetsToDebtRatio.toFixed(1)}% of Assets</span>
              </div>
              <div className="w-full bg-blue-950/50 rounded-full h-2.5 overflow-hidden flex border border-blue-800/10">
                <div
                  style={{ width: `${100 - assetsToDebtRatio}%` }}
                  className="bg-green-500 h-full"
                />
                <div
                  style={{ width: `${assetsToDebtRatio}%` }}
                  className="bg-red-500 h-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-3 rounded-lg bg-blue-900/30 dark:bg-blue-950/40 border border-blue-800/25 dark:border-blue-900/10 text-[10px] font-bold text-blue-200 mt-4 leading-relaxed">
              {isPositive ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-400 shrink-0" />
                  <span>Your net worth is positive! You own more than you owe. Focus on building assets and paying down high-interest liabilities.</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-400 shrink-0" />
                  <span>Your net worth is negative. You owe more than you own. Prioritize paying off high-interest credit cards and short term loans.</span>
                </>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
