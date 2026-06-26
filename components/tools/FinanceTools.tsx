'use client';

import React, { useState, useEffect } from 'react';
import { Percent, DollarSign, Calendar, Clock, RefreshCw } from 'lucide-react';

// ==========================================
// 1. EMI / LOAN CALCULATOR
// ==========================================
export function EMICalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [tenure, setTenure] = useState(5);
  const [isYears, setIsYears] = useState(true);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculate = () => {
    const principal = amount;
    const monthlyRate = (rate / 12) / 100;
    const months = isYears ? tenure * 12 : tenure;

    if (months <= 0) return;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const roundedEmi = Math.round(monthlyPayment * 100) / 100;
    const total = roundedEmi * months;
    const interest = total - principal;

    setEmi(roundedEmi);
    setTotalPayment(total);
    setTotalInterest(interest);
  };

  useEffect(() => {
    calculate();
  }, [amount, rate, tenure, isYears]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Loan Amount ($)</label>
            <input 
              type="range" min="1000" max="1000000" step="5000" value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f97316]"
            />
            <input 
              type="number" value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-2 w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Interest Rate (% p.a.)</label>
            <input 
              type="range" min="1" max="25" step="0.1" value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f97316]"
            />
            <input 
              type="number" step="0.1" value={rate} 
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-2 w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold">Tenure</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsYears(true)}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${isYears ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  Years
                </button>
                <button 
                  onClick={() => setIsYears(false)}
                  className={`px-2 py-0.5 text-xs font-bold rounded ${!isYears ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  Months
                </button>
              </div>
            </div>
            <input 
              type="range" min="1" max={isYears ? 30 : 360} step="1" value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f97316]"
            />
            <input 
              type="number" value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
              className="mt-2 w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest opacity-80">Monthly EMI</span>
            <div className="text-3xl font-extrabold mt-1">${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="h-px bg-white/10 my-1"></div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-[10px] uppercase opacity-75">Total Interest</span>
              <div className="text-lg font-bold mt-0.5">${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div>
              <span className="text-[10px] uppercase opacity-75">Total Payment</span>
              <div className="text-lg font-bold mt-0.5">${totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. COMPOUND INTEREST CALCULATOR
// ==========================================
export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5.0);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12); // monthly compounding
  const [total, setTotal] = useState(0);
  const [interest, setInterest] = useState(0);

  const calculate = () => {
    const P = principal;
    const r = rate / 100;
    const t = years;
    const n = frequency;

    const A = P * Math.pow(1 + r / n, n * t);
    const roundedTotal = Math.round(A * 100) / 100;
    const roundedInterest = Math.round((roundedTotal - P) * 100) / 100;

    setTotal(roundedTotal);
    setInterest(roundedInterest);
  };

  useEffect(() => {
    calculate();
  }, [principal, rate, years, frequency]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Initial Principal ($)</label>
          <input 
            type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:ring-1 focus:ring-[#1a3c5e]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Interest Rate (% p.a.)</label>
          <input 
            type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Duration (Years)</label>
          <input 
            type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Compounding Frequency</label>
          <select 
            value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
          >
            <option value={365}>Daily</option>
            <option value={12}>Monthly</option>
            <option value={4}>Quarterly</option>
            <option value={2}>Semi-Annually</option>
            <option value={1}>Annually</option>
          </select>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">End Balance</span>
          <div className="text-3xl font-extrabold text-white mt-1">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Interest Gained</span>
          <div className="text-xl font-bold text-[#f97316] mt-1">${interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SIMPLE INTEREST CALCULATOR
// ==========================================
export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5.0);
  const [years, setYears] = useState(10);
  const [total, setTotal] = useState(0);
  const [interest, setInterest] = useState(0);

  const calculate = () => {
    const P = principal;
    const r = rate / 100;
    const t = years;

    const I = P * r * t;
    const roundedInterest = Math.round(I * 100) / 100;
    const roundedTotal = Math.round((P + roundedInterest) * 100) / 100;

    setInterest(roundedInterest);
    setTotal(roundedTotal);
  };

  useEffect(() => {
    calculate();
  }, [principal, rate, years]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Principal ($)</label>
          <input 
            type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Annual Rate (%)</label>
          <input 
            type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Tenure (Years)</label>
          <input 
            type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Interest Earned</span>
          <div className="text-2xl font-bold text-[#f97316] mt-1">${interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Final Total</span>
          <div className="text-3xl font-extrabold text-white mt-1">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. MORTGAGE CALCULATOR
// ==========================================
export function MortgageCalculator() {
  const [homeValue, setHomeValue] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(30);
  const [tax, setTax] = useState(1.2); // property tax % p.a.
  const [insurance, setInsurance] = useState(1200); // annual home insurance
  const [pmi, setPmi] = useState(0.5); // Private Mortgage Insurance % p.a. if down < 20%
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculate = () => {
    const P = homeValue - downPayment;
    const r = (rate / 12) / 100;
    const n = years * 12;

    if (P <= 0 || n <= 0) return;

    let emi = 0;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const monthlyTax = (homeValue * (tax / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    
    // PMI is applied if down payment is less than 20% of home value
    const requiresPMI = downPayment < homeValue * 0.2;
    const monthlyPMI = requiresPMI ? (P * (pmi / 100)) / 12 : 0;

    const total = emi + monthlyTax + monthlyInsurance + monthlyPMI;
    setMonthlyPayment(Math.round(total * 100) / 100);
  };

  useEffect(() => {
    calculate();
  }, [homeValue, downPayment, rate, years, tax, insurance, pmi]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Home Value ($)</label>
            <input 
              type="number" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Down Payment ($)</label>
            <input 
              type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Rate (%)</label>
            <input 
              type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Years</label>
            <input 
              type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider mb-2">Property Tax (%)</label>
            <input 
              type="number" step="0.1" value={tax} onChange={(e) => setTax(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs"
            />
          </div>
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider mb-2">Home Ins ($/yr)</label>
            <input 
              type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs"
            />
          </div>
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider mb-2">PMI Rate (%)</label>
            <input 
              type="number" step="0.1" value={pmi} onChange={(e) => setPmi(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center items-center">
        <span className="text-xs uppercase tracking-widest opacity-85">Monthly Payment</span>
        <div className="text-3xl font-extrabold mt-2">${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        <p className="text-[10px] text-white/70 text-center mt-3 max-w-[200px]">
          Includes Principal &amp; Interest, Tax, Insurance and PMI (if down payment &lt; 20%)
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 5. SALARY CALCULATOR
// ==========================================
export function SalaryCalculator() {
  const [payAmount, setPayAmount] = useState(50000);
  const [period, setPeriod] = useState('year'); // 'hour', 'week', 'month', 'year'
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [breakdown, setBreakdown] = useState<Record<string, number>>({});

  const calculate = () => {
    let annualSalary = 0;
    const weeklyHours = hoursPerWeek || 40;

    if (period === 'year') {
      annualSalary = payAmount;
    } else if (period === 'month') {
      annualSalary = payAmount * 12;
    } else if (period === 'week') {
      annualSalary = payAmount * 52;
    } else if (period === 'hour') {
      annualSalary = payAmount * weeklyHours * 52;
    }

    setBreakdown({
      hourly: annualSalary / (weeklyHours * 52),
      daily: annualSalary / 260, // 52 weeks * 5 days
      weekly: annualSalary / 52,
      biweekly: annualSalary / 26,
      monthly: annualSalary / 12,
      yearly: annualSalary
    });
  };

  useEffect(() => {
    calculate();
  }, [payAmount, period, hoursPerWeek]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Wage Amount ($)</label>
          <input 
            type="number" value={payAmount} onChange={(e) => setPayAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Pay Period</label>
          <select 
            value={period} onChange={(e) => setPeriod(e.target.value)}
            className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          >
            <option value="year">Yearly</option>
            <option value="month">Monthly</option>
            <option value="week">Weekly</option>
            <option value="hour">Hourly</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Hours Per Week</label>
          <input 
            type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden text-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 font-semibold border-b border-gray-200 dark:border-gray-800">
              <th className="p-3 text-left">Period</th>
              <th className="p-3 text-right">Income (Gross)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150 dark:divide-gray-850">
            {Object.entries(breakdown).map(([key, val]) => (
              <tr key={key} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                <td className="p-3 font-semibold capitalize text-gray-700 dark:text-gray-300">{key}</td>
                <td className="p-3 text-right font-mono font-bold text-gray-950 dark:text-gray-50">
                  ${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 6. TAX CALCULATOR
// ==========================================
export function TaxCalculator() {
  const [income, setIncome] = useState(75000);
  const [deductions, setDeductions] = useState(14600); // standard 2024 single filer deduction
  const [taxOwed, setTaxOwed] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  const calculate = () => {
    const taxableIncome = Math.max(0, income - deductions);
    
    // US Federal brackets for 2024 Single Filers
    const brackets = [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ];

    let remaining = taxableIncome;
    let computedTax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
      const currentSpan = bracket.limit - previousLimit;
      const taxableInBracket = Math.min(remaining, currentSpan);
      
      computedTax += taxableInBracket * bracket.rate;
      remaining -= taxableInBracket;
      previousLimit = bracket.limit;

      if (remaining <= 0) break;
    }

    const net = income - computedTax;
    const ratePercentage = income > 0 ? (computedTax / income) * 100 : 0;

    setTaxOwed(Math.round(computedTax * 100) / 100);
    setEffectiveRate(Math.round(ratePercentage * 100) / 100);
    setNetIncome(Math.round(net * 100) / 100);
  };

  useEffect(() => {
    calculate();
  }, [income, deductions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Gross Annual Income ($)</label>
          <input 
            type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Deductions (e.g. Standard Deduction) ($)</label>
          <input 
            type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest opacity-80">Estimated Federal Tax</span>
          <div className="text-2xl font-bold mt-1">${taxOwed.toLocaleString()}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-1">
          <div>
            <span className="text-[10px] uppercase opacity-75 font-semibold">Effective Tax Rate</span>
            <div className="text-base font-bold mt-0.5">{effectiveRate}%</div>
          </div>
          <div>
            <span className="text-[10px] uppercase opacity-75 font-semibold">Net Take-Home Pay</span>
            <div className="text-base font-bold mt-0.5">${netIncome.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. DISCOUNT / SALE PRICE CALCULATOR
// ==========================================
export function DiscountCalculator() {
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);
  const [tax, setTax] = useState(8.25);
  const [savings, setSavings] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const calculate = () => {
    const discAmount = price * (discount / 100);
    const priceAfterDiscount = price - discAmount;
    const taxAmount = priceAfterDiscount * (tax / 100);
    const total = priceAfterDiscount + taxAmount;

    setSavings(Math.round(discAmount * 100) / 100);
    setFinalPrice(Math.round(total * 100) / 100);
  };

  useEffect(() => {
    calculate();
  }, [price, discount, tax]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Original Price ($)</label>
          <input 
            type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Discount (%)</label>
            <input 
              type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Sales Tax (%)</label>
            <input 
              type="number" step="0.01" value={tax} onChange={(e) => setTax(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">You Save</span>
          <div className="text-2xl font-bold text-[#f97316] mt-1">${savings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Final Price (with tax)</span>
          <div className="text-3xl font-extrabold text-white mt-1">${finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. TIP CALCULATOR
// ==========================================
export function TipCalculator() {
  const [bill, setBill] = useState(80);
  const [tipPercent, setTipPercent] = useState(18);
  const [guests, setGuests] = useState(2);
  const [tipTotal, setTipTotal] = useState(0);
  const [billTotal, setBillTotal] = useState(0);
  const [sharePerPerson, setSharePerPerson] = useState(0);

  const calculate = () => {
    const tip = bill * (tipPercent / 100);
    const total = bill + tip;
    const count = Math.max(1, guests);
    const perPerson = total / count;

    setTipTotal(Math.round(tip * 100) / 100);
    setBillTotal(Math.round(total * 100) / 100);
    setSharePerPerson(Math.round(perPerson * 100) / 100);
  };

  useEffect(() => {
    calculate();
  }, [bill, tipPercent, guests]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Total Bill ($)</label>
          <input 
            type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Tip (%)</label>
            <input 
              type="number" value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Guests</label>
            <input 
              type="number" min="1" value={guests} onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-3.5">
        <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
          <div>Tip Amount:</div>
          <div className="text-right font-bold text-white">${tipTotal.toFixed(2)}</div>
          <div>Total Bill:</div>
          <div className="text-right font-bold text-white">${billTotal.toFixed(2)}</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Share Per Person</span>
          <div className="text-3xl font-extrabold text-white mt-1">${sharePerPerson.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. RETIREMENT SAVINGS CALCULATOR
// ==========================================
export function RetirementSavingsCalculator() {
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [rate, setRate] = useState(7.0);
  const [nestEgg, setNestEgg] = useState(0);

  const calculate = () => {
    const years = Math.max(0, retirementAge - currentAge);
    const months = years * 12;
    const r = (rate / 12) / 100;
    
    let total = currentSavings;

    if (r === 0) {
      total = currentSavings + (monthlyContribution * months);
    } else {
      // Compound growth on initial savings plus monthly contributions annuity
      const savingsGrowth = currentSavings * Math.pow(1 + r, months);
      const annuityGrowth = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
      total = savingsGrowth + annuityGrowth;
    }

    setNestEgg(Math.round(total * 100) / 100);
  };

  useEffect(() => {
    calculate();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, rate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Current Age</label>
            <input 
              type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Retirement Age</label>
            <input 
              type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Current Nest Egg ($)</label>
            <input 
              type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Monthly Deposit ($)</label>
            <input 
              type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Return Rate (%)</label>
          <input 
            type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center items-center">
        <span className="text-xs uppercase tracking-widest opacity-85">Retirement Nest Egg</span>
        <div className="text-3xl font-extrabold mt-2">${nestEgg.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        <p className="text-[10px] text-white/70 text-center mt-3 max-w-[200px]">
          Estimated cumulative balance after {retirementAge - currentAge} years compounding at {rate}% annual return.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 10. CURRENCY CONVERTER
// ==========================================
export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [converted, setConverted] = useState(0);

  // Static offline conversion rates relative to 1 USD
  const rates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 156.40,
    CAD: 1.37,
    AUD: 1.51,
    INR: 83.50
  };

  const calculate = () => {
    const usdEquivalent = amount / rates[fromCurrency];
    const targetValue = usdEquivalent * rates[toCurrency];
    setConverted(Math.round(targetValue * 100) / 100);
  };

  useEffect(() => {
    calculate();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Amount</label>
          <input 
            type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">From</label>
            <select 
              value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            >
              {Object.keys(rates).map(cur => <option key={cur} value={cur}>{cur}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">To</label>
            <select 
              value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
            >
              {Object.keys(rates).map(cur => <option key={cur} value={cur}>{cur}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Converted Value</span>
          <div className="text-3xl font-extrabold text-white mt-1">
            {converted.toLocaleString(undefined, { minimumFractionDigits: 2 })} {toCurrency}
          </div>
          <div className="text-[10px] text-white/70 mt-2">
            Rate reference: 1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
          </div>
        </div>
      </div>
    </div>
  );
}
