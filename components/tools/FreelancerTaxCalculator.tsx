'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Calculator, Info, ShieldCheck, AlertCircle, MapPin } from 'lucide-react';

const STATE_TAX_PRESETS: Record<string, { name: string; rate: number }> = {
  'none': { name: 'No State Income Tax (TX, FL, WA, NV, AK, SD, WY, TN)', rate: 0.0 },
  'CA': { name: 'California (~9.3%)', rate: 9.3 },
  'NY': { name: 'New York (~6.5%)', rate: 6.5 },
  'PA': { name: 'Pennsylvania (3.07% Flat)', rate: 3.07 },
  'IL': { name: 'Illinois (4.95% Flat)', rate: 4.95 },
  'MA': { name: 'Massachusetts (5.0% Flat)', rate: 5.0 },
  'NC': { name: 'North Carolina (4.75% Flat)', rate: 4.75 },
  'CO': { name: 'Colorado (4.4% Flat)', rate: 4.4 },
  'GA': { name: 'Georgia (~5.49%)', rate: 5.49 },
  'VA': { name: 'Virginia (~5.75%)', rate: 5.75 },
  'custom': { name: 'Custom Rate %', rate: 5.0 },
};

const TAX_YEAR_CONFIG: Record<string, { name: string; ssCap: number; stdSingle: number; stdJoint: number; stdHead: number; stdSeparate: number }> = {
  '2024': { name: '2024 Tax Year', ssCap: 168600, stdSingle: 14600, stdJoint: 29200, stdHead: 21900, stdSeparate: 14600 },
  '2025': { name: '2025 Tax Year', ssCap: 176100, stdSingle: 15000, stdJoint: 30000, stdHead: 22500, stdSeparate: 15000 },
  '2026': { name: '2026 Tax Year', ssCap: 181800, stdSingle: 15700, stdJoint: 31400, stdHead: 23550, stdSeparate: 15700 },
};

export default function FreelancerTaxCalculator() {
  const [taxYear, setTaxYear] = useState<'2024' | '2025' | '2026'>('2024');
  const [grossIncome, setGrossIncome] = useState<string>('80000');
  const [expenses, setExpenses] = useState<string>('10000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'joint' | 'head' | 'separate'>('single');
  const [stateKey, setStateKey] = useState<string>('none');
  const [stateTaxRate, setStateTaxRate] = useState<string>('0.0');
  const [includeState, setIncludeState] = useState<boolean>(true);

  // Output states
  const [netIncome, setNetIncome] = useState<number>(0);
  const [seTaxableIncome, setSeTaxableIncome] = useState<number>(0);
  const [socialSecurityTax, setSocialSecurityTax] = useState<number>(0);
  const [medicareTax, setMedicareTax] = useState<number>(0);
  const [addMedicareTax, setAddMedicareTax] = useState<number>(0);
  const [selfEmploymentTax, setSelfEmploymentTax] = useState<number>(0);
  const [halfSeDeduction, setHalfSeDeduction] = useState<number>(0);
  const [currentStdDeduction, setCurrentStdDeduction] = useState<number>(14600);
  const [taxableFederalBase, setTaxableFederalBase] = useState<number>(0);
  const [estimatedIncomeTax, setEstimatedIncomeTax] = useState<number>(0);
  const [stateTax, setStateTax] = useState<number>(0);
  const [totalAnnualTax, setTotalAnnualTax] = useState<number>(0);
  const [quarterlyPayment, setQuarterlyPayment] = useState<number>(0);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(0);

  const handleStateChange = (key: string) => {
    setStateKey(key);
    if (key !== 'custom') {
      const preset = STATE_TAX_PRESETS[key];
      if (preset) {
        setStateTaxRate(preset.rate.toString());
      }
    }
  };

  const calculateTaxes = () => {
    const gross = Math.max(0, parseFloat(grossIncome) || 0);
    const exp = Math.max(0, parseFloat(expenses) || 0);
    const stateRate = includeState ? Math.max(0, parseFloat(stateTaxRate) || 0) : 0;

    const net = Math.max(0, gross - exp);
    setNetIncome(net);

    // Self-Employment Taxable Base (IRS Schedule SE: 92.35% of Net Profit)
    const seProfits = net * 0.9235;
    setSeTaxableIncome(seProfits);

    // Get year-specific caps
    const config = TAX_YEAR_CONFIG[taxYear] || TAX_YEAR_CONFIG['2024'];

    // Social Security Tax (12.4% up to SS Cap)
    const ssTaxable = Math.min(seProfits, config.ssCap);
    const ssTax = ssTaxable * 0.124;
    setSocialSecurityTax(ssTax);

    // Medicare Tax (2.9% on all SE profits)
    const medTax = seProfits * 0.029;
    setMedicareTax(medTax);

    // Additional Medicare Tax (0.9% on SE profits above threshold)
    // IRS Threshold: $200,000 for Single/Head/Separate; $250,000 for Married Filing Jointly
    let addMedicareThreshold = 200000;
    if (filingStatus === 'joint') addMedicareThreshold = 250000;

    const addMedTax = seProfits > addMedicareThreshold ? (seProfits - addMedicareThreshold) * 0.009 : 0;
    setAddMedicareTax(addMedTax);

    // Total Self-Employment Tax
    const totalSeTax = ssTax + medTax + addMedTax;
    setSelfEmploymentTax(totalSeTax);

    // 50% SE Tax Deduction from Adjusted Gross Income
    const seDeduction = totalSeTax * 0.5;
    setHalfSeDeduction(seDeduction);

    // Standard deduction based on tax year & filing status
    let stdDeduction = config.stdSingle;
    if (filingStatus === 'joint') stdDeduction = config.stdJoint;
    else if (filingStatus === 'head') stdDeduction = config.stdHead;
    else if (filingStatus === 'separate') stdDeduction = config.stdSeparate;
    setCurrentStdDeduction(stdDeduction);

    const taxableIncomeForFederal = Math.max(0, net - seDeduction - stdDeduction);
    setTaxableFederalBase(taxableIncomeForFederal);

    // Precise Federal Progressive Tax Brackets calculation (2024 IRS Brackets)
    let fedTax = 0;
    if (filingStatus === 'joint') {
      if (taxableIncomeForFederal > 383900) fedTax = 78221 + (taxableIncomeForFederal - 383900) * 0.32;
      else if (taxableIncomeForFederal > 201050) fedTax = 34337 + (taxableIncomeForFederal - 201050) * 0.24;
      else if (taxableIncomeForFederal > 94300) fedTax = 10852 + (taxableIncomeForFederal - 94300) * 0.22;
      else if (taxableIncomeForFederal > 23200) fedTax = 2320 + (taxableIncomeForFederal - 23200) * 0.12;
      else fedTax = taxableIncomeForFederal * 0.10;
    } else {
      if (taxableIncomeForFederal > 191950) fedTax = 39110.50 + (taxableIncomeForFederal - 191950) * 0.32;
      else if (taxableIncomeForFederal > 100525) fedTax = 17168.50 + (taxableIncomeForFederal - 100525) * 0.24;
      else if (taxableIncomeForFederal > 47150) fedTax = 5426.00 + (taxableIncomeForFederal - 47150) * 0.22;
      else if (taxableIncomeForFederal > 11600) fedTax = 1160.00 + (taxableIncomeForFederal - 11600) * 0.12;
      else fedTax = taxableIncomeForFederal * 0.10;
    }
    setEstimatedIncomeTax(fedTax);

    // State Tax Calculation: State Rate x Taxable Federal Base
    const stTax = Math.max(0, (taxableIncomeForFederal * stateRate) / 100);
    setStateTax(stTax);

    // Totals
    const annualTotal = totalSeTax + fedTax + stTax;
    setTotalAnnualTax(annualTotal);
    setQuarterlyPayment(annualTotal / 4);
    setEffectiveTaxRate(gross > 0 ? (annualTotal / gross) * 100 : 0);
  };

  useEffect(() => {
    calculateTaxes();
  }, [taxYear, grossIncome, expenses, filingStatus, stateTaxRate, includeState]);

  const handleReset = () => {
    setTaxYear('2024');
    setGrossIncome('80000');
    setExpenses('10000');
    setFilingStatus('single');
    setStateKey('none');
    setStateTaxRate('0.0');
    setIncludeState(true);
  };

  const activeConfig = TAX_YEAR_CONFIG[taxYear] || TAX_YEAR_CONFIG['2024'];

  const getFilingLabel = () => {
    if (filingStatus === 'single') return 'single filer';
    if (filingStatus === 'joint') return 'married filing jointly';
    if (filingStatus === 'head') return 'head of household';
    return 'married filing separately';
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-6 space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-white">
              <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              1099 Business Income & Tax Settings
            </h3>
            <button
              onClick={handleReset}
              className="px-3 py-1 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-800 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ↺ Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Tax Year (SS Cap)
              </label>
              <select
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value as any)}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="2024">2024 ($168,600 SS Cap)</option>
                <option value="2025">2025 ($176,100 SS Cap)</option>
                <option value="2026">2026 ($181,800 SS Cap)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Tax Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as any)}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="single">Single</option>
                <option value="joint">Married Filing Jointly</option>
                <option value="separate">Married Filing Separately</option>
                <option value="head">Head of Household</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Annual 1099 Gross Income ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 font-medium">$</span>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                placeholder="e.g. 80000"
                className="w-full pl-7 pr-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Annual Write-Offs & Business Expenses ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 font-medium">$</span>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full pl-7 pr-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Includes software, internet, home office, gear, supplies, travel, and health insurance.
            </p>
          </div>

          {/* Standard Deduction Callout Note */}
          <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 flex items-start gap-2 text-xs text-blue-900 dark:text-blue-200">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">
                Standard deduction: ${currentStdDeduction.toLocaleString()} ({taxYear}, {getFilingLabel()}).
              </span>
              <span className="text-[11px] text-blue-700/80 dark:text-blue-300/70">
                Adjusts automatically based on the tax year and filing status selected above.
              </span>
            </div>
          </div>

          {/* State Selector Section */}
          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-gray-950/40 border border-gray-200/80 dark:border-gray-800 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-purple-500" />
              US State Income Tax Location
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-8">
                <select
                  value={stateKey}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-xs font-semibold focus:outline-none focus:border-blue-500"
                >
                  {Object.entries(STATE_TAX_PRESETS).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4">
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={stateTaxRate}
                    onChange={(e) => { setStateTaxRate(e.target.value); setStateKey('custom'); }}
                    disabled={!includeState}
                    className="w-full pr-6 pl-2.5 py-1.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-xs font-semibold focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                  <span className="absolute right-2.5 top-1.5 text-gray-400 text-xs font-bold">%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="include-state-chk"
                checked={includeState}
                onChange={(e) => setIncludeState(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="include-state-chk" className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
                Include State Income Tax in Quarterly Payments
              </label>
            </div>
          </div>
        </div>

        {/* Output Results Panel */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2844] text-white p-6 rounded-2xl shadow-md space-y-4">
            <div>
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Quarterly Estimated Tax Voucher (Pay 4x / year)
              </span>
              <div className="text-4xl font-extrabold text-emerald-400 mt-1">
                ${quarterlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-white/70 mt-1">
                Due April 15, June 15, September 15, and January 15.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-white/70 block">Total Annual Tax:</span>
                <span className="font-mono font-bold text-base text-white">
                  ${totalAnnualTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-white/70 block">Effective Tax Rate:</span>
                <span className="font-mono font-bold text-base text-emerald-300">
                  {effectiveTaxRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl space-y-3 text-xs">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-500" /> Tax Component Breakdown
              </span>
              <span className="text-[11px] font-semibold text-slate-400">{taxYear} IRS Rules</span>
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Net 1099 Profit (Gross - Write-Offs):</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                  ${netIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">SE Taxable Profit (92.35% of Net):</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                  ${seTaxableIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Social Security Tax (12.4% up to ${activeConfig.ssCap.toLocaleString()}):</span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                  +${socialSecurityTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Medicare Tax (2.9% on all SE profit):</span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                  +${medicareTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {addMedicareTax > 0 && (
                <div className="flex justify-between items-center bg-purple-50/60 dark:bg-purple-950/20 p-1.5 rounded-lg border border-purple-200/40">
                  <span className="text-purple-700 dark:text-purple-300 font-bold">
                    Additional Medicare Tax (0.9% over ${filingStatus === 'joint' ? '250k' : '200k'}):
                  </span>
                  <span className="font-mono font-bold text-purple-700 dark:text-purple-300">
                    +${addMedicareTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-1 border-t border-gray-100 dark:border-gray-800">
                <span className="text-slate-600 dark:text-slate-400 font-bold">Total Self-Employment Tax (SE Tax):</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  +${selfEmploymentTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-500">
                <span>50% SE Tax Write-Off Deduction:</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  -${halfSeDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-500">
                <span>Standard Deduction ({getFilingLabel()}):</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  -${currentStdDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-gray-100 dark:border-gray-800 font-bold">
                <span className="text-slate-800 dark:text-slate-200">Taxable Federal Base:</span>
                <span className="font-mono text-slate-900 dark:text-slate-100">
                  ${taxableFederalBase.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Estimated Federal Income Tax:</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                  +${estimatedIncomeTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {includeState && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Estimated State Income Tax ({stateTaxRate}%):</span>
                  <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">
                    +${stateTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quarterly Payment Deadlines Schedule */}
      <div className="bg-slate-50 dark:bg-gray-950 border border-gray-200/80 dark:border-gray-800 p-5 rounded-2xl">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-blue-600" />
          IRS Quarterly Estimated Tax Payment Due Dates ({taxYear})
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-xl">
            <span className="text-blue-600 dark:text-blue-400 font-bold block">Q1 Payment</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm">April 15</span>
            <span className="font-mono text-slate-500 text-[11px] block mt-1">
              ${quarterlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-xl">
            <span className="text-blue-600 dark:text-blue-400 font-bold block">Q2 Payment</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm">June 15</span>
            <span className="font-mono text-slate-500 text-[11px] block mt-1">
              ${quarterlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-xl">
            <span className="text-blue-600 dark:text-blue-400 font-bold block">Q3 Payment</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm">September 15</span>
            <span className="font-mono text-slate-500 text-[11px] block mt-1">
              ${quarterlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-xl">
            <span className="text-blue-600 dark:text-blue-400 font-bold block">Q4 Payment</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 block text-sm">January 15</span>
            <span className="font-mono text-slate-500 text-[11px] block mt-1">
              ${quarterlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
