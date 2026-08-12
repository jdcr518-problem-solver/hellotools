'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, HelpCircle, Clipboard, Check } from 'lucide-react';

export default function StandardDeviationCalculator() {
  const [inputVal, setInputVal] = useState('2, 4, 4, 4, 5, 5, 7, 9');

  // Outputs
  const [mean, setMean] = useState<number | null>(null);
  const [median, setMedian] = useState<number | null>(null);
  const [minVal, setMinVal] = useState<number | null>(null);
  const [maxVal, setMaxVal] = useState<number | null>(null);
  const [rangeVal, setRangeVal] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [popVariance, setPopVariance] = useState<number | null>(null);
  const [samVariance, setSamVariance] = useState<number | null>(null);
  const [popSd, setPopSd] = useState<number | null>(null);
  const [samSd, setSamSd] = useState<number | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const calculateStats = () => {
    setErrorMsg(null);

    // Split by comma, whitespace, or newline
    const numbers = inputVal
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => parseFloat(s));

    // Check for invalid entries
    if (numbers.some(isNaN)) {
      setErrorMsg('Input contains non-numeric values. Please check your data list.');
      return;
    }

    if (numbers.length < 2) {
      setErrorMsg('Please enter at least 2 numbers to compute standard deviation metrics.');
      return;
    }

    const n = numbers.length;
    setCount(n);

    // Mean
    const sum = numbers.reduce((a, b) => a + b, 0);
    const calculatedMean = sum / n;
    setMean(calculatedMean);

    // Median
    const sorted = [...numbers].sort((a, b) => a - b);
    let calculatedMedian = 0;
    if (n % 2 !== 0) {
      calculatedMedian = sorted[Math.floor(n / 2)];
    } else {
      calculatedMedian = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    }
    setMedian(calculatedMedian);

    // Min, Max, Range
    const min = sorted[0];
    const max = sorted[n - 1];
    setMinVal(min);
    setMaxVal(max);
    setRangeVal(max - min);

    // Variance & Standard Deviation
    const sqDiffSum = numbers.reduce((acc, val) => acc + Math.pow(val - calculatedMean, 2), 0);
    
    // Population
    const pVariance = sqDiffSum / n;
    setPopVariance(pVariance);
    setPopSd(Math.sqrt(pVariance));

    // Sample (N-1)
    const sVariance = sqDiffSum / (n - 1);
    setSamVariance(sVariance);
    setSamSd(Math.sqrt(sVariance));
  };

  useEffect(() => {
    calculateStats();
  }, [inputVal]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-800 dark:text-slate-100">
      
      {/* Inputs Column (White Card) */}
      <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800/80 shadow-sm space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Dataset</h3>

        <div className="space-y-1">
          <label htmlFor="numbers-dataset" className="text-xs font-semibold text-slate-500">
            Data values (separated by commas, spaces, or newlines)
          </label>
          <textarea
            id="numbers-dataset"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. 2, 4, 4, 4, 5, 5, 7, 9"
            className="w-full min-h-[160px] p-3 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold font-mono focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-750 dark:text-red-400 text-xs rounded-xl font-semibold flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

      </div>

      {/* Outputs Column (Navy Card) */}
      <div className="lg:col-span-7 bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-6">
        
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400">Statistical metrics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Sample Std Dev (s)</span>
              <span className="text-2xl font-black font-mono text-white">
                {samSd !== null ? samSd.toFixed(4) : 'None'}
              </span>
            </div>

            <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Population Std Dev (σ)</span>
              <span className="text-2xl font-black font-mono text-white">
                {popSd !== null ? popSd.toFixed(4) : 'None'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            
            <div className="bg-blue-900/10 dark:bg-blue-950/25 p-3 rounded-lg border border-blue-800/15 dark:border-blue-900/5">
              <span className="text-[9px] font-bold text-blue-300 block uppercase">Mean (μ)</span>
              <span className="font-mono font-bold">{mean !== null ? mean.toFixed(4) : 'None'}</span>
            </div>

            <div className="bg-blue-900/10 dark:bg-blue-950/25 p-3 rounded-lg border border-blue-800/15 dark:border-blue-900/5">
              <span className="text-[9px] font-bold text-blue-300 block uppercase">Median</span>
              <span className="font-mono font-bold">{median !== null ? median.toFixed(2) : 'None'}</span>
            </div>

            <div className="bg-blue-900/10 dark:bg-blue-950/25 p-3 rounded-lg border border-blue-800/15 dark:border-blue-900/5">
              <span className="text-[9px] font-bold text-blue-300 block uppercase">Count (N)</span>
              <span className="font-mono font-bold">{count !== null ? count : 'None'}</span>
            </div>

            <div className="bg-blue-900/10 dark:bg-blue-950/25 p-3 rounded-lg border border-blue-800/15 dark:border-blue-900/5">
              <span className="text-[9px] font-bold text-blue-300 block uppercase">Range</span>
              <span className="font-mono font-bold">{rangeVal !== null ? rangeVal.toFixed(2) : 'None'}</span>
            </div>

            <div className="bg-blue-900/10 dark:bg-blue-950/25 p-3 rounded-lg border border-blue-800/15 dark:border-blue-900/5">
              <span className="text-[9px] font-bold text-blue-300 block uppercase">Min / Max</span>
              <span className="font-mono font-bold">
                {minVal !== null && maxVal !== null ? `${minVal} / ${maxVal}` : 'None'}
              </span>
            </div>

            <div className="bg-blue-900/10 dark:bg-blue-950/25 p-3 rounded-lg border border-blue-800/15 dark:border-blue-900/5">
              <span className="text-[9px] font-bold text-blue-300 block uppercase">Sample Variance</span>
              <span className="font-mono font-bold">{samVariance !== null ? samVariance.toFixed(4) : 'None'}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
