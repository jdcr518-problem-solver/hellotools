'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Settings, ChevronDown, ChevronUp, Info, AlertTriangle } from 'lucide-react';

export default function GradeCalculator() {
  const [activeTab, setActiveTab] = useState<'weighted' | 'points' | 'final'>('weighted');
  const [scaleType, setScaleType] = useState<'standard' | 'plusminus'>('standard');
  const [showScaleEditor, setShowScaleEditor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scaleError, setScaleError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    percentage: number;
    letterGrade: string;
    note?: string;
    outcomeType?: 'achievable' | 'unachievable' | 'secured';
    description?: string;
  } | null>(null);

  // Default Standard Scale Thresholds
  const [standardScale, setStandardScale] = useState({
    A: 90,
    B: 80,
    C: 70,
    D: 60,
  });

  // Default Plus/Minus Scale Thresholds
  const [plusMinusScale, setPlusMinusScale] = useState({
    'A+': 97,
    A: 93,
    'A-': 90,
    'B+': 87,
    B: 83,
    'B-': 80,
    'C+': 77,
    C: 73,
    'C-': 70,
    'D+': 67,
    D: 63,
    'D-': 60,
  });

  // --- Tab 1: Weighted Calculator Rows ---
  const [weightedRows, setWeightedRows] = useState<Array<{ name: string; grade: string; weight: string }>>([
    { name: 'Homework', grade: '', weight: '' },
    { name: 'Exams', grade: '', weight: '' },
  ]);

  // --- Tab 2: Point-Based Calculator Rows ---
  const [pointsRows, setPointsRows] = useState<Array<{ name: string; earned: string; max: string }>>([
    { name: 'Assignment 1', earned: '', max: '' },
    { name: 'Assignment 2', earned: '', max: '' },
  ]);

  // --- Tab 3: Final Exam Requirement Fields ---
  const [currentGrade, setCurrentGrade] = useState('');
  const [targetGrade, setTargetGrade] = useState('');
  const [finalWeight, setFinalWeight] = useState('');

  // --- Reset Handlers ---
  const handleResetWeighted = () => {
    setWeightedRows([
      { name: 'Homework', grade: '', weight: '' },
      { name: 'Exams', grade: '', weight: '' },
    ]);
    setResult(null);
    setError(null);
  };

  const handleResetPoints = () => {
    setPointsRows([
      { name: 'Assignment 1', earned: '', max: '' },
      { name: 'Assignment 2', earned: '', max: '' },
    ]);
    setResult(null);
    setError(null);
  };

  const handleResetFinal = () => {
    setCurrentGrade('');
    setTargetGrade('');
    setFinalWeight('');
    setResult(null);
    setError(null);
  };

  // Reset results when switching tabs
  useEffect(() => {
    setResult(null);
    setError(null);
  }, [activeTab]);

  // Reset results if scale settings change
  useEffect(() => {
    setResult(null);
  }, [scaleType, standardScale, plusMinusScale]);

  // --- Helper: Validate Scale Thresholds ---
  const validateScale = (): boolean => {
    setScaleError(null);

    if (scaleType === 'standard') {
      const { A, B, C, D } = standardScale;
      // Check blanks or invalid bounds
      if ([A, B, C, D].some(val => val === null || val === undefined || isNaN(val) || val < 0 || val > 100)) {
        setScaleError('All thresholds must be valid numbers between 0 and 100.');
        return false;
      }
      // Check strictly descending order
      if (!(A > B && B > C && C > D && D > 0)) {
        setScaleError('Thresholds must decrease from top to bottom');
        return false;
      }
    } else {
      const keys: Array<keyof typeof plusMinusScale> = [
        'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-'
      ];
      // Check blanks or bounds
      for (const key of keys) {
        const val = plusMinusScale[key];
        if (val === null || val === undefined || isNaN(val) || val < 0 || val > 100) {
          setScaleError('All thresholds must be valid numbers between 0 and 100.');
          return false;
        }
      }
      // Check strictly descending
      for (let i = 0; i < keys.length - 1; i++) {
        if (plusMinusScale[keys[i]] <= plusMinusScale[keys[i + 1]]) {
          setScaleError('Thresholds must decrease from top to bottom');
          return false;
        }
      }
      if (plusMinusScale['D-'] <= 0) {
        setScaleError('Thresholds must decrease from top to bottom');
        return false;
      }
    }

    return true;
  };

  // --- Helper: Convert Percentage to Letter Grade ---
  const getLetterGrade = (percentage: number): string => {
    if (scaleType === 'standard') {
      if (percentage >= standardScale.A) return 'A';
      if (percentage >= standardScale.B) return 'B';
      if (percentage >= standardScale.C) return 'C';
      if (percentage >= standardScale.D) return 'D';
      return 'F';
    } else {
      if (percentage >= plusMinusScale['A+']) return 'A+';
      if (percentage >= plusMinusScale.A) return 'A';
      if (percentage >= plusMinusScale['A-']) return 'A-';
      if (percentage >= plusMinusScale['B+']) return 'B+';
      if (percentage >= plusMinusScale.B) return 'B';
      if (percentage >= plusMinusScale['B-']) return 'B-';
      if (percentage >= plusMinusScale['C+']) return 'C+';
      if (percentage >= plusMinusScale.C) return 'C';
      if (percentage >= plusMinusScale['C-']) return 'C-';
      if (percentage >= plusMinusScale['D+']) return 'D+';
      if (percentage >= plusMinusScale.D) return 'D';
      if (percentage >= plusMinusScale['D-']) return 'D-';
      return 'F';
    }
  };

  // --- Tab 1 Actions: Weighted Calculator ---
  const handleAddWeightedRow = () => {
    setWeightedRows([...weightedRows, { name: '', grade: '', weight: '' }]);
  };

  const handleRemoveWeightedRow = (index: number) => {
    if (weightedRows.length > 1) {
      setWeightedRows(weightedRows.filter((_, i) => i !== index));
    }
  };

  const calculateWeighted = () => {
    setError(null);
    setResult(null);

    if (!validateScale()) return;

    if (weightedRows.length === 0) {
      setError('Please add at least one category.');
      return;
    }

    let totalWeight = 0;
    let weightedSum = 0;

    for (const row of weightedRows) {
      const g = parseFloat(row.grade);
      const w = parseFloat(row.weight);

      if (row.grade.trim() === '' || row.weight.trim() === '' || isNaN(g) || isNaN(w)) {
        setError('Please fill in all grade and weight fields with valid numbers.');
        return;
      }

      if (g < 0 || g > 100) {
        setError('Every Grade field must be a number between 0 and 100.');
        return;
      }

      if (w <= 0) {
        setError('Every Weight field must be a number greater than 0.');
        return;
      }

      weightedSum += g * w;
      totalWeight += w;
    }

    if (totalWeight === 0) {
      setError('Total weight cannot be zero.');
      return;
    }

    const percentage = weightedSum / totalWeight;
    const letter = getLetterGrade(percentage);
    const roundedTotalWeight = Math.round(totalWeight * 100) / 100;

    let note;
    if (roundedTotalWeight !== 100) {
      note = `Your weights added up to ${roundedTotalWeight}% — result has been normalized automatically.`;
    }

    setResult({
      percentage,
      letterGrade: letter,
      note,
    });
  };

  // --- Tab 2 Actions: Point-Based Calculator ---
  const handleAddPointsRow = () => {
    setPointsRows([...pointsRows, { name: '', earned: '', max: '' }]);
  };

  const handleRemovePointsRow = (index: number) => {
    if (pointsRows.length > 1) {
      setPointsRows(pointsRows.filter((_, i) => i !== index));
    }
  };

  const calculatePoints = () => {
    setError(null);
    setResult(null);

    if (!validateScale()) return;

    if (pointsRows.length === 0) {
      setError('Please add at least one assignment.');
      return;
    }

    let totalEarned = 0;
    let totalMax = 0;

    for (const row of pointsRows) {
      const e = parseFloat(row.earned);
      const m = parseFloat(row.max);

      if (row.earned.trim() === '' || row.max.trim() === '' || isNaN(e) || isNaN(m)) {
        setError('Please fill in all fields. Max points must be greater than zero.');
        return;
      }

      if (e < 0) {
        setError('Points Earned must be a number ≥ 0.');
        return;
      }

      if (m <= 0) {
        setError('Please fill in all fields. Max points must be greater than zero.');
        return;
      }

      totalEarned += e;
      totalMax += m;
    }

    if (totalMax === 0) {
      setError('Total max points must be greater than zero.');
      return;
    }

    const percentage = (totalEarned / totalMax) * 100;
    const letter = getLetterGrade(percentage);

    setResult({
      percentage,
      letterGrade: letter,
    });
  };

  // --- Tab 3 Actions: Final Exam Requirement ---
  const calculateFinalGoal = () => {
    setError(null);
    setResult(null);

    const c = parseFloat(currentGrade);
    const t = parseFloat(targetGrade);
    const w = parseFloat(finalWeight);

    if (currentGrade.trim() === '' || targetGrade.trim() === '' || finalWeight.trim() === '' || isNaN(c) || isNaN(t) || isNaN(w)) {
      setError('Please fill in all fields with valid numbers.');
      return;
    }

    if (c < 0 || c > 100) {
      setError('Current Grade must be between 0 and 100.');
      return;
    }

    if (t < 0 || t > 100) {
      setError('Target Grade must be between 0 and 100.');
      return;
    }

    if (w < 1 || w > 100) {
      setError('Final exam weight must be between 1 and 100.');
      return;
    }

    const wDec = w / 100;
    const requiredScore = (t - c * (1 - wDec)) / wDec;

    if (requiredScore > 100) {
      setResult({
        percentage: requiredScore,
        letterGrade: '-',
        outcomeType: 'unachievable',
        description: `Even a perfect score on the final won't reach your target grade. Consider speaking with your instructor about extra credit options.`,
      });
    } else if (requiredScore < 0) {
      setResult({
        percentage: 0,
        letterGrade: '-',
        outcomeType: 'secured',
        description: `You've already locked in your target grade even if you score 0% on the final.`,
      });
    } else {
      setResult({
        percentage: requiredScore,
        letterGrade: '-',
        outcomeType: 'achievable',
      });
    }
  };

  // Realtime calculation trigger
  useEffect(() => {
    if (activeTab === 'weighted') {
      const hasValidRow = weightedRows.some(r => r.grade.trim() !== '' && r.weight.trim() !== '');
      if (hasValidRow) calculateWeighted();
    } else if (activeTab === 'points') {
      const hasValidRow = pointsRows.some(r => r.earned.trim() !== '' && r.max.trim() !== '');
      if (hasValidRow) calculatePoints();
    } else if (activeTab === 'final') {
      if (currentGrade.trim() !== '' && targetGrade.trim() !== '' && finalWeight.trim() !== '') {
        calculateFinalGoal();
      }
    }
  }, [activeTab, weightedRows, pointsRows, currentGrade, targetGrade, finalWeight, scaleType, standardScale, plusMinusScale]);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('weighted')}
          className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'weighted'
              ? 'border-[#1a3c5e] dark:border-blue-400 text-[#1a3c5e] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          Weighted Grade
        </button>
        <button
          onClick={() => setActiveTab('points')}
          className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'points'
              ? 'border-[#1a3c5e] dark:border-blue-400 text-[#1a3c5e] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          Points-Based
        </button>
        <button
          onClick={() => setActiveTab('final')}
          className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'final'
              ? 'border-[#1a3c5e] dark:border-blue-400 text-[#1a3c5e] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          Final Exam Goal
        </button>
      </div>

      {/* Grade Scale Controller (Hidden for Final Exam Goal) */}
      {activeTab !== 'final' && (
        <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200/50 dark:border-gray-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Grading Scale</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setScaleType('standard')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    scaleType === 'standard'
                      ? 'bg-blue-50/80 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400'
                      : 'border-gray-200 text-slate-600 dark:border-gray-800 dark:text-slate-400'
                  }`}
                >
                  Standard (A-F)
                </button>
                <button
                  type="button"
                  onClick={() => setScaleType('plusminus')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    scaleType === 'plusminus'
                      ? 'bg-blue-50/80 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400'
                      : 'border-gray-200 text-slate-600 dark:border-gray-800 dark:text-slate-400'
                  }`}
                >
                  Plus/Minus (+/-)
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowScaleEditor(!showScaleEditor)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Customize Scale</span>
              {showScaleEditor ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Collapsible Scale Editor */}
          {showScaleEditor && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase block mb-3">Edit Minimum Percentages</span>
              
              {scaleError && (
                <div className="mb-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>{scaleError}</span>
                </div>
              )}

              {scaleType === 'standard' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.keys(standardScale).map((key) => {
                    const k = key as keyof typeof standardScale;
                    return (
                      <div key={k} className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-500">{k} min:</span>
                        <input
                          type="number"
                          value={standardScale[k]}
                          onChange={(e) => {
                            setStandardScale({
                              ...standardScale,
                              [k]: parseFloat(e.target.value) || 0
                            });
                          }}
                          className="w-16 p-1 text-center border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm font-bold font-mono"
                        />
                        <span className="text-xs text-slate-400">%</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-500">F min:</span>
                    <input
                      type="text"
                      disabled
                      value="0"
                      className="w-16 p-1 text-center border border-gray-200 dark:border-gray-800 rounded bg-gray-100 dark:bg-gray-800/80 text-sm font-bold font-mono text-slate-400 cursor-not-allowed"
                    />
                    <span className="text-xs text-slate-400">%</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4">
                  {Object.keys(plusMinusScale).map((key) => {
                    const k = key as keyof typeof plusMinusScale;
                    return (
                      <div key={k} className="flex items-center gap-2 justify-between">
                        <span className="text-sm font-bold text-slate-500 w-12">{k} min:</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={plusMinusScale[k]}
                            onChange={(e) => {
                              setPlusMinusScale({
                                ...plusMinusScale,
                                [k]: parseFloat(e.target.value) || 0
                              });
                            }}
                            className="w-16 p-1 text-center border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm font-bold font-mono"
                          />
                          <span className="text-xs text-slate-400">%</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-2 justify-between">
                    <span className="text-sm font-bold text-slate-500 w-12">F min:</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        disabled
                        value="0"
                        className="w-16 p-1 text-center border border-gray-200 dark:border-gray-800 rounded bg-gray-100 dark:bg-gray-800/80 text-sm font-bold font-mono text-slate-400 cursor-not-allowed"
                      />
                      <span className="text-xs text-slate-400">%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main calculation tab views */}

      {/* Tab 1: Weighted Grade Calculator */}
      {activeTab === 'weighted' && (
        <div className="space-y-4">
          
          {/* Table Headers */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            <div className="col-span-6">Category Name</div>
            <div className="col-span-3 text-center">Grade (%)</div>
            <div className="col-span-3 text-center">Weight (%)</div>
          </div>

          <div className="space-y-3">
            {weightedRows.map((row, idx) => (
              <div 
                key={idx}
                className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-3 p-3 sm:p-0 border border-gray-200/50 sm:border-none rounded-xl bg-gray-50/30 sm:bg-transparent dark:border-gray-800/50"
              >
                {/* Mobile Title Row */}
                <div className="col-span-6">
                  <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={row.name}
                    placeholder="e.g. Homework"
                    onChange={(e) => {
                      const newRows = [...weightedRows];
                      newRows[idx].name = e.target.value;
                      setWeightedRows(newRows);
                    }}
                    className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="col-span-3 flex items-center gap-1.5">
                  <div className="w-full">
                    <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Grade (%)</label>
                    <input
                      type="number"
                      value={row.grade}
                      placeholder="90"
                      onChange={(e) => {
                        const newRows = [...weightedRows];
                        newRows[idx].grade = e.target.value;
                        setWeightedRows(newRows);
                      }}
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm text-center font-semibold font-mono focus:outline-none"
                    />
                  </div>
                  <span className="sm:hidden text-xs text-slate-400 mt-5">%</span>
                </div>

                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-full">
                    <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Weight (%)</label>
                    <input
                      type="number"
                      value={row.weight}
                      placeholder="20"
                      onChange={(e) => {
                        const newRows = [...weightedRows];
                        newRows[idx].weight = e.target.value;
                        setWeightedRows(newRows);
                      }}
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm text-center font-semibold font-mono focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveWeightedRow(idx)}
                    disabled={weightedRows.length <= 1}
                    className="mt-5 sm:mt-0 p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddWeightedRow}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 dark:border-gray-800 dark:text-slate-300 dark:hover:bg-gray-800/40 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Category</span>
            </button>
            <button
              onClick={handleResetWeighted}
              className="btn btn-outline ml-auto py-2 px-6"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Point-Based Calculator */}
      {activeTab === 'points' && (
        <div className="space-y-4">
          
          {/* Table Headers */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            <div className="col-span-6">Assignment Name</div>
            <div className="col-span-3 text-center">Points Earned</div>
            <div className="col-span-3 text-center">Max Points</div>
          </div>

          <div className="space-y-3">
            {pointsRows.map((row, idx) => {
              const showWarning = row.earned !== '' && row.max !== '' && parseFloat(row.earned) > parseFloat(row.max);
              return (
                <div key={idx} className="space-y-1">
                  <div 
                    className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-3 p-3 sm:p-0 border border-gray-200/50 sm:border-none rounded-xl bg-gray-50/30 sm:bg-transparent dark:border-gray-800/50"
                  >
                    {/* Mobile Title Row */}
                    <div className="col-span-6">
                      <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Assignment Name</label>
                      <input
                        type="text"
                        value={row.name}
                        placeholder={`e.g. Assignment ${idx + 1}`}
                        onChange={(e) => {
                          const newRows = [...pointsRows];
                          newRows[idx].name = e.target.value;
                          setPointsRows(newRows);
                        }}
                        className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Points Earned</label>
                      <input
                        type="number"
                        value={row.earned}
                        placeholder="45"
                        onChange={(e) => {
                          const newRows = [...pointsRows];
                          newRows[idx].earned = e.target.value;
                          setPointsRows(newRows);
                        }}
                        className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm text-center font-semibold font-mono focus:outline-none"
                      />
                    </div>

                    <div className="col-span-3 flex items-center gap-2">
                      <div className="w-full">
                        <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Max Points</label>
                        <input
                          type="number"
                          value={row.max}
                          placeholder="50"
                          onChange={(e) => {
                            const newRows = [...pointsRows];
                            newRows[idx].max = e.target.value;
                            setPointsRows(newRows);
                          }}
                          className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm text-center font-semibold font-mono focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePointsRow(idx)}
                        disabled={pointsRows.length <= 1}
                        className="mt-5 sm:mt-0 p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {showWarning && (
                    <div className="text-[11px] text-amber-500 dark:text-amber-400 flex items-center gap-1 px-1">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span>Points earned exceeds max points</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddPointsRow}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 dark:border-gray-800 dark:text-slate-300 dark:hover:bg-gray-800/40 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Assignment</span>
            </button>
            <button
              onClick={handleResetPoints}
              className="btn btn-outline ml-auto py-2 px-6"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Final Exam Goal Calculator */}
      {activeTab === 'final' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Current Grade (%)</label>
              <input
                type="number"
                value={currentGrade}
                placeholder="85"
                onChange={(e) => setCurrentGrade(e.target.value)}
                className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target Grade (%)</label>
              <input
                type="number"
                value={targetGrade}
                placeholder="90"
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Final Exam Weight (%)</label>
              <input
                type="number"
                value={finalWeight}
                placeholder="20"
                onChange={(e) => setFinalWeight(e.target.value)}
                className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div className="flex">
            <button
              onClick={handleResetFinal}
              className="btn btn-outline ml-auto py-2.5 px-8"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      )}

      {/* Global Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-700 dark:text-red-400 text-sm flex items-start gap-2 font-semibold">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Display Panel */}
      {result && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          
          {/* Output Mode 1: Final Exam Out of Reach */}
          {result.outcomeType === 'unachievable' && (
            <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-200/40 dark:border-red-900/30 p-6 rounded-2xl text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500">Not achievable</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-red-600 dark:text-red-400">
                {result.percentage.toFixed(2)}% Needed
              </div>
              <p className="text-xs sm:text-sm text-red-700/80 dark:text-red-400/70 max-w-lg mx-auto leading-relaxed">
                {result.description}
              </p>
            </div>
          )}

          {/* Output Mode 2: Final Exam Target Secured */}
          {result.outcomeType === 'secured' && (
            <div className="bg-green-50/50 dark:bg-green-950/10 border border-green-200/40 dark:border-green-900/30 p-6 rounded-2xl text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-green-500">Already secured!</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-green-600 dark:text-green-400">
                0.00% Needed
              </div>
              <p className="text-xs sm:text-sm text-green-700/80 dark:text-green-400/70 max-w-lg mx-auto leading-relaxed">
                {result.description}
              </p>
            </div>
          )}

          {/* Output Mode 3: Normal Final Exam Target calculation */}
          {result.outcomeType === 'achievable' && (
            <div className={`border p-6 rounded-2xl text-center space-y-3 ${
              result.percentage >= 80
                ? 'bg-gray-50/50 dark:bg-gray-800/10 border-gray-200 dark:border-gray-800'
                : result.percentage >= 60
                ? 'bg-amber-50/30 dark:bg-amber-950/5 border-amber-200/30 dark:border-amber-900/20'
                : 'bg-green-50/30 dark:bg-green-950/5 border-green-200/30 dark:border-green-900/20'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-widest ${
                result.percentage >= 80
                  ? 'text-slate-500'
                  : result.percentage >= 60
                  ? 'text-amber-500 dark:text-amber-400'
                  : 'text-green-500 dark:text-green-400'
              }`}>
                Score Needed
              </span>
              <div className={`text-4xl sm:text-5xl font-extrabold font-mono ${
                result.percentage >= 80
                  ? 'text-slate-900 dark:text-white'
                  : result.percentage >= 60
                  ? 'text-amber-500 dark:text-amber-400'
                  : 'text-green-500 dark:text-green-400'
              }`}>
                {result.percentage.toFixed(2)}%
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                score needed on your final exam to reach {parseFloat(targetGrade).toFixed(2)}% in the course.
              </p>
            </div>
          )}

          {/* Output Mode 4: Weighted / Points Grade score output */}
          {!result.outcomeType && (
            <div className={`border p-6 rounded-2xl text-center space-y-3 ${
              result.percentage >= 80
                ? 'bg-blue-50/30 dark:bg-blue-950/5 border-blue-200/30 dark:border-blue-900/20'
                : result.percentage >= 70
                ? 'bg-amber-50/30 dark:bg-amber-950/5 border-amber-200/30 dark:border-amber-900/20'
                : 'bg-red-50/30 dark:bg-red-950/5 border-red-200/30 dark:border-red-900/20'
            }`}>
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto items-center">
                <div className="text-left border-r border-gray-200 dark:border-gray-800 pr-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${
                    result.percentage >= 80
                      ? 'text-blue-500 dark:text-blue-400'
                      : result.percentage >= 70
                      ? 'text-amber-500 dark:text-amber-400'
                      : 'text-red-500 dark:text-red-400'
                  }`}>
                    Overall Score
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-800 dark:text-white">
                    {result.percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="text-center pl-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                    Letter Grade
                  </span>
                  <span className={`text-4xl sm:text-5xl font-extrabold ${
                    result.percentage >= 80
                      ? 'text-blue-600 dark:text-blue-400'
                      : result.percentage >= 70
                      ? 'text-amber-500 dark:text-amber-400'
                      : 'text-red-500 dark:text-red-400'
                  }`}>
                    {result.letterGrade}
                  </span>
                </div>
              </div>

              {/* Normalization Note (Weighted Tab only) */}
              {result.note && (
                <div className="pt-3 flex items-center gap-1.5 justify-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  <span>{result.note}</span>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
