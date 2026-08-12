'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, AlertCircle, Sparkles, Activity } from 'lucide-react';

export default function BMRCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [formula, setFormula] = useState<'mifflin' | 'harris' | 'katch'>('mifflin');

  // Inputs
  const [weight, setWeight] = useState('70'); // kg or lbs
  const [height, setHeight] = useState('175'); // cm or inches
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bodyFat, setBodyFat] = useState(''); // %
  const [activity, setActivity] = useState('1.2'); // multiplier

  // Outputs
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [lbm, setLbm] = useState<number | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const calculateBMR = () => {
    setErrorMsg(null);

    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseInt(age);
    const bf = parseFloat(bodyFat);

    if (isNaN(w) || w <= 0) {
      setErrorMsg('Please enter a valid weight.');
      return;
    }
    if (formula !== 'katch' && (isNaN(h) || h <= 0)) {
      setErrorMsg('Please enter a valid height.');
      return;
    }
    if (isNaN(a) || a < 1 || a > 120) {
      setErrorMsg('Please enter an age between 1 and 120.');
      return;
    }

    // Convert imperial to metric
    if (unit === 'imperial') {
      w = w * 0.45359237; // lbs to kg
      h = h * 2.54; // inches to cm
    }

    let calculatedBmr = 0;
    let calculatedLbm: number | null = null;

    if (formula === 'katch') {
      if (isNaN(bf) || bf < 1 || bf > 80) {
        setErrorMsg('Please enter a body fat percentage between 1% and 80% to calculate using Katch-McArdle.');
        return;
      }
      calculatedLbm = w * (1 - bf / 100);
      calculatedBmr = 370 + 21.6 * calculatedLbm;
      setLbm(calculatedLbm);
    } else {
      // Mifflin-St Jeor
      if (formula === 'mifflin') {
        if (gender === 'male') {
          calculatedBmr = 10 * w + 6.25 * h - 5 * a + 5;
        } else {
          calculatedBmr = 10 * w + 6.25 * h - 5 * a - 161;
        }
      } else {
        // Harris-Benedict (Revised)
        if (gender === 'male') {
          calculatedBmr = 13.397 * w + 4.799 * h - 5.677 * a + 88.362;
        } else {
          calculatedBmr = 9.247 * w + 3.098 * h - 4.330 * a + 447.593;
        }
      }
      // Estimate LBM if Body Fat % is optionally entered in other modes
      if (!isNaN(bf) && bf > 0 && bf <= 100) {
        calculatedLbm = w * (1 - bf / 100);
        setLbm(calculatedLbm);
      } else {
        setLbm(null);
      }
    }

    const multiplier = parseFloat(activity) || 1.2;
    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedBmr * multiplier));
  };

  useEffect(() => {
    calculateBMR();
  }, [unit, formula, weight, height, age, gender, bodyFat, activity]);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* Unit & Formula selector panels */}
      <div className="flex flex-wrap gap-4">
        
        {/* Metric/Imperial units */}
        <div className="flex bg-gray-150 dark:bg-gray-800 rounded-xl p-1 overflow-hidden">
          <button
            onClick={() => { setUnit('metric'); setWeight('70'); setHeight('175'); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              unit === 'metric' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => { setUnit('imperial'); setWeight('154'); setHeight('69'); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              unit === 'imperial' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
            }`}
          >
            Imperial (lbs/in)
          </button>
        </div>

        {/* Formula list */}
        <div className="flex bg-gray-150 dark:bg-gray-800 rounded-xl p-1 overflow-hidden">
          <button
            onClick={() => setFormula('mifflin')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              formula === 'mifflin' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
            }`}
          >
            Mifflin-St Jeor
          </button>
          <button
            onClick={() => setFormula('harris')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              formula === 'harris' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
            }`}
          >
            Harris-Benedict
          </button>
          <button
            onClick={() => setFormula('katch')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              formula === 'katch' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
            }`}
          >
            Katch-McArdle (LBM)
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Parameters Column (White Card) */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800/80 shadow-sm space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Body parameters</h3>

          {/* Weight */}
          <div className="space-y-1">
            <label htmlFor="weight" className="text-xs font-semibold text-slate-500">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
            />
          </div>

          {/* Height (hide for Katch-McArdle if not needed) */}
          {formula !== 'katch' && (
            <div className="space-y-1">
              <label htmlFor="height" className="text-xs font-semibold text-slate-500">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          )}

          {/* Age */}
          <div className="space-y-1">
            <label htmlFor="age" className="text-xs font-semibold text-slate-500">Age (years)</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
            />
          </div>

          {/* Gender (hide for Katch-McArdle) */}
          {formula !== 'katch' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 block mb-1">Gender</label>
              <div className="flex bg-gray-100 dark:bg-gray-850 rounded-lg p-0.5 overflow-hidden">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                    gender === 'male' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                    gender === 'female' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          )}

          {/* Body Fat Percentage */}
          <div className="space-y-1">
            <label htmlFor="body-fat" className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>Body Fat (%)</span>
              {formula === 'katch' && <span className="text-[10px] text-amber-500 font-bold">*Required for Katch-McArdle</span>}
            </label>
            <input
              id="body-fat"
              type="number"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              placeholder="e.g. 15"
              className="w-full px-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
            />
          </div>

          {/* Activity Multiplier */}
          <div className="space-y-1 pt-2 border-t border-gray-150 dark:border-gray-800">
            <label htmlFor="activity-level" className="text-xs font-semibold text-slate-500">Activity Level</label>
            <select
              id="activity-level"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full p-2 border border-gray-250 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none cursor-pointer"
            >
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">Lightly Active (Exercise 1-3 days/week)</option>
              <option value="1.55">Moderately Active (Exercise 3-5 days/week)</option>
              <option value="1.725">Very Active (Exercise 6-7 days/week)</option>
              <option value="1.9">Extra Active (Hard exercise/physical job)</option>
            </select>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-750 dark:text-red-400 text-xs rounded-xl font-semibold flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>

        {/* Output Panel Column (Navy Card) */}
        <div className="lg:col-span-7 bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400">Calculated Energy Outputs</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Basal Metabolic Rate (BMR)</span>
                <span className="text-2xl font-black font-mono text-white">{bmr.toLocaleString()} <span className="text-xs font-bold">kcal/day</span></span>
              </div>

              <div className="bg-blue-900/20 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-800/25 dark:border-blue-900/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 dark:text-blue-400 block">Active Burn (TDEE)</span>
                <span className="text-2xl font-black font-mono text-white">{tdee.toLocaleString()} <span className="text-xs font-bold">kcal/day</span></span>
              </div>
            </div>

            {/* Custom Lean Body Mass (LBM) Metric */}
            {lbm !== null && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-blue-200">
                  <span>Lean Body Mass: {lbm.toFixed(1)} kg ({Math.round(lbm * 2.20462)} lbs)</span>
                  <span>Body Fat: {bodyFat}%</span>
                </div>
                <div className="w-full bg-blue-950/50 rounded-full h-3 overflow-hidden flex border border-blue-800/20">
                  <div
                    style={{ width: `${100 - parseFloat(bodyFat)}%` }}
                    className="bg-blue-500 h-full"
                  />
                  <div
                    style={{ width: `${parseFloat(bodyFat)}%` }}
                    className="bg-amber-400 h-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-900/40 dark:bg-blue-950/60 p-4 rounded-xl border border-blue-600/30 dark:border-blue-900/20 space-y-3">
            <h4 className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-green-400" />
              <span>Recommended Target Calorie Ranges</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              <div className="p-2 bg-blue-900/20 dark:bg-blue-950/30 border border-blue-800/10 rounded-lg">
                <span className="text-[8px] font-bold text-blue-300 block uppercase">Weight Loss</span>
                <span className="font-mono font-bold text-green-400">{Math.max(1200, tdee - 500)}</span>
              </div>
              <div className="p-2 bg-blue-900/20 dark:bg-blue-950/30 border border-blue-800/10 rounded-lg">
                <span className="text-[8px] font-bold text-blue-300 block uppercase">Maintenance</span>
                <span className="font-mono font-bold text-white">{tdee}</span>
              </div>
              <div className="p-2 bg-blue-900/20 dark:bg-blue-950/30 border border-blue-800/10 rounded-lg">
                <span className="text-[8px] font-bold text-blue-300 block uppercase">Weight Gain</span>
                <span className="font-mono font-bold text-amber-400">{tdee + 500}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
