'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Fuel, DollarSign, TrendingDown, Award, Calculator } from 'lucide-react';

export default function EVCostCalculator() {
  const [annualMiles, setAnnualMiles] = useState<string>('12000');
  
  // EV Inputs
  const [evKwhPer100, setEvKwhPer100] = useState<string>('30'); // 30 kWh per 100 miles
  const [elecRate, setElecRate] = useState<string>('0.16'); // $0.16 / kWh
  
  // Gas Inputs
  const [gasMpg, setGasMpg] = useState<string>('28'); // 28 MPG
  const [gasPrice, setGasPrice] = useState<string>('3.60'); // $3.60 / gallon

  // Output states
  const [evAnnualCost, setEvAnnualCost] = useState<number>(0);
  const [gasAnnualCost, setGasAnnualCost] = useState<number>(0);
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [fiveYearSavings, setFiveYearSavings] = useState<number>(0);
  const [tenYearSavings, setTenYearSavings] = useState<number>(0);
  const [evCostPerMile, setEvCostPerMile] = useState<number>(0);
  const [gasCostPerMile, setGasCostPerMile] = useState<number>(0);
  const [savingsPercent, setSavingsPercent] = useState<number>(0);

  const calculateCosts = () => {
    const miles = Math.max(0, parseFloat(annualMiles) || 0);
    
    // EV math
    const kwhPer100 = Math.max(0.1, parseFloat(evKwhPer100) || 30);
    const rateElec = Math.max(0, parseFloat(elecRate) || 0);

    const totalKwh = (miles / 100) * kwhPer100;
    const evCost = totalKwh * rateElec;
    const evPerMile = miles > 0 ? evCost / miles : 0;

    // Gas math
    const mpg = Math.max(0.1, parseFloat(gasMpg) || 28);
    const gPrice = Math.max(0, parseFloat(gasPrice) || 0);

    const totalGallons = miles / mpg;
    const gasCost = totalGallons * gPrice;
    const gasPerMile = miles > 0 ? gasCost / miles : 0;

    // Savings
    const yearlySavings = gasCost - evCost;
    const pct = gasCost > 0 ? (yearlySavings / gasCost) * 100 : 0;

    setEvAnnualCost(evCost);
    setGasAnnualCost(gasCost);
    setAnnualSavings(yearlySavings);
    setFiveYearSavings(yearlySavings * 5);
    setTenYearSavings(yearlySavings * 10);
    setEvCostPerMile(evPerMile);
    setGasCostPerMile(gasPerMile);
    setSavingsPercent(pct);
  };

  useEffect(() => {
    calculateCosts();
  }, [annualMiles, evKwhPer100, elecRate, gasMpg, gasPrice]);

  const handleReset = () => {
    setAnnualMiles('12000');
    setEvKwhPer100('30');
    setElecRate('0.16');
    setGasMpg('28');
    setGasPrice('3.60');
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-6 space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-white">
              <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Driving & Fuel Comparison Inputs
            </h3>
            <button
              onClick={handleReset}
              className="px-3 py-1 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ↺ Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Estimated Annual Distance (Miles / Km)
            </label>
            <input
              type="number"
              value={annualMiles}
              onChange={(e) => setAnnualMiles(e.target.value)}
              placeholder="e.g. 12000"
              className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* EV Section */}
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Zap className="h-4 w-4" /> Electric Vehicle (EV) Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  EV Efficiency (kWh/100 mi)
                </label>
                <input
                  type="number"
                  value={evKwhPer100}
                  onChange={(e) => setEvKwhPer100(e.target.value)}
                  placeholder="30"
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Electricity Rate ($/kWh)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={elecRate}
                  onChange={(e) => setElecRate(e.target.value)}
                  placeholder="0.16"
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Gas Section */}
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Fuel className="h-4 w-4" /> Gasoline Car Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Fuel Economy (MPG)
                </label>
                <input
                  type="number"
                  value={gasMpg}
                  onChange={(e) => setGasMpg(e.target.value)}
                  placeholder="28"
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Gasoline Price ($/gallon)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={gasPrice}
                  onChange={(e) => setGasPrice(e.target.value)}
                  placeholder="3.60"
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2844] text-white p-6 rounded-2xl shadow-md space-y-4">
            <div>
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Estimated Net Fuel Savings with EV
              </span>
              <div className="text-4xl font-extrabold text-emerald-400 mt-1">
                ${annualSavings > 0 ? annualSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'} / year
              </div>
              <p className="text-xs text-white/70 mt-1">
                You save <span className="font-bold text-emerald-300">{savingsPercent.toFixed(1)}%</span> on fuel costs per year driving EV.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-white/70 block">5-Year Net Savings:</span>
                <span className="font-mono font-bold text-base text-emerald-300">
                  ${fiveYearSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div>
                <span className="text-white/70 block">10-Year Net Savings:</span>
                <span className="font-mono font-bold text-base text-emerald-300">
                  ${tenYearSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          {/* Direct Comparison Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-xs uppercase tracking-wider">
                ⚡ EV Annual Cost
              </span>
              <div className="font-mono font-extrabold text-2xl text-emerald-600 dark:text-emerald-300">
                ${evAnnualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <span className="text-slate-500 text-[11px] block font-mono">
                ${evCostPerMile.toFixed(3)} per mile
              </span>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 block text-xs uppercase tracking-wider">
                ⛽ Gas Annual Cost
              </span>
              <div className="font-mono font-extrabold text-2xl text-amber-600 dark:text-amber-300">
                ${gasAnnualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <span className="text-slate-500 text-[11px] block font-mono">
                ${gasCostPerMile.toFixed(3)} per mile
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
