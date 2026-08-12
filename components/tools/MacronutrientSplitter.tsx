'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Flame, Dumbbell, PieChart, Calculator, RefreshCw } from 'lucide-react';

export default function MacronutrientSplitter() {
  const [totalCalories, setTotalCalories] = useState<string>('2200');
  const [presetDiet, setPresetDiet] = useState<'fitness' | 'keto' | 'zone' | 'lowcarb' | 'endurance' | 'custom'>('fitness');

  // Custom macro ratios (Percentages totaling 100%)
  const [proteinPct, setProteinPct] = useState<number>(35);
  const [carbPct, setCarbPct] = useState<number>(45);
  const [fatPct, setFatPct] = useState<number>(20);

  // Goal & meals per day
  const [goal, setGoal] = useState<'maintenance' | 'cutting' | 'bulking'>('maintenance');
  const [mealsPerDay, setMealsPerDay] = useState<number>(4);

  // Outputs
  const [effectiveCalories, setEffectiveCalories] = useState<number>(2200);
  const [proteinGrams, setProteinGrams] = useState<number>(0);
  const [carbGrams, setCarbGrams] = useState<number>(0);
  const [fatGrams, setFatGrams] = useState<number>(0);
  const [proteinKcal, setProteinKcal] = useState<number>(0);
  const [carbKcal, setCarbKcal] = useState<number>(0);
  const [fatKcal, setFatKcal] = useState<number>(0);

  // Apply diet preset percentages
  const handleDietPresetChange = (p: 'fitness' | 'keto' | 'zone' | 'lowcarb' | 'endurance' | 'custom') => {
    setPresetDiet(p);
    if (p === 'fitness') {
      setProteinPct(35); setCarbPct(45); setFatPct(20);
    } else if (p === 'keto') {
      setProteinPct(25); setCarbPct(5); setFatPct(70);
    } else if (p === 'zone') {
      setProteinPct(30); setCarbPct(40); setFatPct(30);
    } else if (p === 'lowcarb') {
      setProteinPct(40); setCarbPct(20); setFatPct(40);
    } else if (p === 'endurance') {
      setProteinPct(20); setCarbPct(60); setFatPct(20);
    }
  };

  const calculateMacros = () => {
    let baseCals = Math.max(500, parseFloat(totalCalories) || 2200);
    
    // Adjust target calories based on goal
    if (goal === 'cutting') baseCals = Math.round(baseCals * 0.85); // 15% deficit
    else if (goal === 'bulking') baseCals = Math.round(baseCals * 1.15); // 15% surplus

    setEffectiveCalories(baseCals);

    // Normalize ratios to ensure 100% total sum
    const totalRatio = (proteinPct + carbPct + fatPct) || 100;
    const normP = proteinPct / totalRatio;
    const normC = carbPct / totalRatio;
    const normF = fatPct / totalRatio;

    // Kcal per macro: Protein = 4 kcal/g, Carbs = 4 kcal/g, Fat = 9 kcal/g
    const pCalories = baseCals * normP;
    const cCalories = baseCals * normC;
    const fCalories = baseCals * normF;

    setProteinKcal(pCalories);
    setCarbKcal(cCalories);
    setFatKcal(fCalories);

    setProteinGrams(Math.round(pCalories / 4));
    setCarbGrams(Math.round(cCalories / 4));
    setFatGrams(Math.round(fCalories / 9));
  };

  useEffect(() => {
    calculateMacros();
  }, [totalCalories, presetDiet, proteinPct, carbPct, fatPct, goal]);

  const handleReset = () => {
    setTotalCalories('2200');
    setGoal('maintenance');
    setMealsPerDay(4);
    handleDietPresetChange('fitness');
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-6 space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-base flex items-center gap-2 text-slate-900 dark:text-white">
              <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Daily Calorie & Macro Target Inputs
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
              Daily Target Calories (kcal)
            </label>
            <input
              type="number"
              value={totalCalories}
              onChange={(e) => setTotalCalories(e.target.value)}
              placeholder="e.g. 2200"
              className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Primary Fitness Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="maintenance">Maintenance</option>
                <option value="cutting">Fat Loss (-15% Deficit)</option>
                <option value="bulking">Muscle Gain (+15% Surplus)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Meals per Day
              </label>
              <select
                value={mealsPerDay}
                onChange={(e) => setMealsPerDay(Number(e.target.value))}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/50 text-sm font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value={3}>3 Meals / Day</option>
                <option value={4}>4 Meals / Day</option>
                <option value={5}>5 Meals / Day</option>
                <option value={6}>6 Meals / Day</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Select Macro Ratio Preset
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              {[
                { id: 'fitness', label: 'High Protein' },
                { id: 'zone', label: 'Zone 40/30/30' },
                { id: 'keto', label: 'Keto Diet' },
                { id: 'lowcarb', label: 'Low Carb' },
                { id: 'endurance', label: 'Endurance' },
                { id: 'custom', label: 'Custom %' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleDietPresetChange(p.id as any)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    presetDiet === p.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-slate-700 dark:text-slate-300 hover:bg-gray-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {presetDiet === 'custom' && (
            <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                  <span>Protein: {proteinPct}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="70"
                  value={proteinPct}
                  onChange={(e) => setProteinPct(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                  <span>Carbs: {carbPct}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="75"
                  value={carbPct}
                  onChange={(e) => setCarbPct(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex justify-between">
                  <span>Fat: {fatPct}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={fatPct}
                  onChange={(e) => setFatPct(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2844] text-white p-6 rounded-2xl shadow-md space-y-4">
            <div>
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Total Daily Target Intake
              </span>
              <div className="text-4xl font-extrabold text-emerald-400 mt-1">
                {effectiveCalories.toLocaleString()} <span className="text-2xl text-white font-semibold">kcal / day</span>
              </div>
            </div>

            {/* Visual Bar Distribution */}
            <div className="space-y-1">
              <div className="h-3 rounded-full overflow-hidden flex bg-white/10">
                <div style={{ width: `${proteinPct}%` }} className="bg-blue-500 h-full" />
                <div style={{ width: `${carbPct}%` }} className="bg-emerald-500 h-full" />
                <div style={{ width: `${fatPct}%` }} className="bg-amber-500 h-full" />
              </div>
              <div className="flex justify-between text-[11px] text-white/70 font-semibold">
                <span>Pro: {proteinPct}%</span>
                <span>Carbs: {carbPct}%</span>
                <span>Fat: {fatPct}%</span>
              </div>
            </div>
          </div>

          {/* Macro Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-2xl text-center space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-xs uppercase">
                🥩 Protein
              </span>
              <div className="font-mono font-extrabold text-2xl text-blue-600 dark:text-blue-300">
                {proteinGrams}g
              </div>
              <span className="text-slate-500 text-[11px] block font-mono">
                {Math.round(proteinKcal)} kcal
              </span>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-center space-y-1">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs uppercase">
                🌾 Carbs
              </span>
              <div className="font-mono font-extrabold text-2xl text-emerald-600 dark:text-emerald-300">
                {carbGrams}g
              </div>
              <span className="text-slate-500 text-[11px] block font-mono">
                {Math.round(carbKcal)} kcal
              </span>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl text-center space-y-1">
              <span className="font-bold text-amber-600 dark:text-amber-400 block text-xs uppercase">
                🥑 Healthy Fat
              </span>
              <div className="font-mono font-extrabold text-2xl text-amber-600 dark:text-amber-300">
                {fatGrams}g
              </div>
              <span className="text-slate-500 text-[11px] block font-mono">
                {Math.round(fatKcal)} kcal
              </span>
            </div>
          </div>

          {/* Per-Meal Breakdown Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-2xl text-xs space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Target Per Meal ({mealsPerDay} meals / day)
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Calories</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{Math.round(effectiveCalories / mealsPerDay)} kcal</span>
              </div>
              <div className="p-2 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl">
                <span className="text-blue-500 block text-[10px]">Protein</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{Math.round(proteinGrams / mealsPerDay)}g</span>
              </div>
              <div className="p-2 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl">
                <span className="text-emerald-500 block text-[10px]">Carbs</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{Math.round(carbGrams / mealsPerDay)}g</span>
              </div>
              <div className="p-2 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl">
                <span className="text-amber-500 block text-[10px]">Fat</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{Math.round(fatGrams / mealsPerDay)}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
