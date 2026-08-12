'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Settings, ChevronDown, ChevronUp, Info, AlertTriangle } from 'lucide-react';

interface CourseRow {
  name: string;
  grade: string;
  credits: string;
  type: 'regular' | 'honors' | 'ap_ib';
}

const DEFAULT_SCALE = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  'D-': 0.7,
  F: 0.0,
};

export default function GPACalculator() {
  const [activeTab, setActiveTab] = useState<'semester' | 'cumulative'>('semester');
  const [isWeighted, setIsWeighted] = useState(true);
  const [showScaleEditor, setShowScaleEditor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scaleError, setScaleError] = useState<string | null>(null);

  // Customize Scale state
  const [scale, setScale] = useState<Record<string, number>>({ ...DEFAULT_SCALE });
  const [isScaleCustomized, setIsScaleCustomized] = useState(false);

  // --- Tab 1: Semester GPA Rows ---
  const [semesterRows, setSemesterRows] = useState<CourseRow[]>([
    { name: '', grade: 'A', credits: '3', type: 'regular' },
    { name: '', grade: 'B', credits: '3', type: 'regular' },
    { name: '', grade: 'A', credits: '3', type: 'ap_ib' },
  ]);

  // --- Tab 2: Cumulative GPA Header Inputs & Rows ---
  const [currentGPA, setCurrentGPA] = useState('3.50');
  const [currentCredits, setCurrentCredits] = useState('30');
  const [cumulativeSemesterRows, setCumulativeSemesterRows] = useState<CourseRow[]>([
    { name: '', grade: 'A', credits: '3', type: 'regular' },
    { name: '', grade: 'A', credits: '3', type: 'regular' },
    { name: '', grade: 'A', credits: '3', type: 'regular' },
  ]);

  // Result display states
  const [semesterResult, setSemesterResult] = useState<number | null>(null);
  const [cumulativeResult, setCumulativeResult] = useState<{
    semesterGPA: number;
    cumulativeGPA: number;
  } | null>(null);

  // Detect custom scale changes
  useEffect(() => {
    const customized = Object.keys(DEFAULT_SCALE).some(
      (key) => scale[key] !== DEFAULT_SCALE[key as keyof typeof DEFAULT_SCALE]
    );
    setIsScaleCustomized(customized);
  }, [scale]);

  // Reset results on tab or weight switches
  useEffect(() => {
    setError(null);
    setSemesterResult(null);
    setCumulativeResult(null);
  }, [activeTab, isWeighted]);

  // --- Helper: Validate Custom Scale Order ---
  const validateScale = (): boolean => {
    setScaleError(null);
    const keys: Array<keyof typeof DEFAULT_SCALE> = [
      'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'
    ];

    for (const key of keys) {
      const val = scale[key];
      if (val === null || val === undefined || isNaN(val) || val < 0.0 || val > 5.0) {
        setScaleError('All grade point values must be numbers between 0.0 and 5.0.');
        return false;
      }
    }

    // Check descending order (A+ >= A >= A- >= B+ ... >= F)
    for (let i = 0; i < keys.length - 1; i++) {
      if (scale[keys[i]] < scale[keys[i + 1]]) {
        setScaleError('Thresholds must decrease from top to bottom');
        return false;
      }
    }

    // F must be 0.0
    if (scale['F'] !== 0.0) {
      setScaleError('F points must always be fixed at 0.0.');
      return false;
    }

    return true;
  };

  // --- Calculation Helpers ---
  const calculateGPAStats = (rows: CourseRow[]) => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    for (const row of rows) {
      const credits = parseFloat(row.credits);
      if (isNaN(credits) || credits <= 0 || credits > 10.0) {
        return { error: 'Please enter valid credits greater than 0 (max 10).' };
      }

      const basePoints = scale[row.grade] ?? 0.0;
      let courseBonus = 0.0;

      if (isWeighted) {
        if (row.type === 'honors') courseBonus = 0.5;
        if (row.type === 'ap_ib') courseBonus = 1.0;
      }

      // Course points capped strictly at 5.0
      const finalCoursePoints = Math.min(5.0, basePoints + courseBonus);

      totalCredits += credits;
      totalGradePoints += finalCoursePoints * credits;
    }

    if (totalCredits === 0) {
      return { error: 'Total combined credits cannot be zero.' };
    }

    return { semesterGPA: totalGradePoints / totalCredits, semesterCredits: totalCredits };
  };

  // --- Actions for Semester Tab ---
  const handleAddSemesterRow = () => {
    setSemesterRows([...semesterRows, { name: '', grade: 'A', credits: '3', type: 'regular' }]);
  };

  const handleRemoveSemesterRow = (index: number) => {
    if (semesterRows.length > 1) {
      setSemesterRows(semesterRows.filter((_, i) => i !== index));
    }
  };

  const handleResetSemester = () => {
    setSemesterRows([
      { name: '', grade: 'A', credits: '3', type: 'regular' },
      { name: '', grade: 'B', credits: '3', type: 'regular' },
      { name: '', grade: 'A', credits: '3', type: 'ap_ib' },
    ]);
    setSemesterResult(null);
    setError(null);
  };

  const handleCalculateSemester = () => {
    setError(null);
    setSemesterResult(null);

    if (!validateScale()) return;

    if (semesterRows.length === 0) {
      setError('Add at least one course before calculating.');
      return;
    }

    const outcome = calculateGPAStats(semesterRows);
    if (outcome.error) {
      setError(outcome.error);
      return;
    }

    if (outcome.semesterGPA !== undefined) {
      setSemesterResult(outcome.semesterGPA);
    }
  };

  // --- Actions for Cumulative Tab ---
  const handleAddCumulativeRow = () => {
    setCumulativeSemesterRows([
      ...cumulativeSemesterRows,
      { name: '', grade: 'A', credits: '3', type: 'regular' },
    ]);
  };

  const handleRemoveCumulativeRow = (index: number) => {
    if (cumulativeSemesterRows.length > 1) {
      setCumulativeSemesterRows(cumulativeSemesterRows.filter((_, i) => i !== index));
    }
  };

  const handleResetCumulative = () => {
    setCurrentGPA('3.50');
    setCurrentCredits('30');
    setCumulativeSemesterRows([
      { name: '', grade: 'A', credits: '3', type: 'regular' },
      { name: '', grade: 'A', credits: '3', type: 'regular' },
      { name: '', grade: 'A', credits: '3', type: 'regular' },
    ]);
    setCumulativeResult(null);
    setError(null);
  };

  const handleCalculateCumulative = () => {
    setError(null);
    setCumulativeResult(null);

    if (!validateScale()) return;

    const pastGPA = parseFloat(currentGPA);
    const pastCredits = parseFloat(currentCredits);

    if (currentGPA.trim() === '' || currentCredits.trim() === '' || isNaN(pastGPA) || isNaN(pastCredits)) {
      setError('Please enter valid past Cumulative GPA and completed credits.');
      return;
    }

    // Range checks
    const maxGPALimit = isWeighted ? 5.0 : 4.0;
    if (pastGPA < 0.0 || pastGPA > maxGPALimit) {
      setError(`Current Cumulative GPA must be between 0.0 and ${maxGPALimit.toFixed(1)}.`);
      return;
    }

    if (pastCredits < 0.0 || pastCredits > 500.0) {
      setError('Credits completed seems unusually high. Please double-check.');
      return;
    }

    if (cumulativeSemesterRows.length === 0) {
      setError('Add at least one course before calculating.');
      return;
    }

    const newSemester = calculateGPAStats(cumulativeSemesterRows);
    if (newSemester.error) {
      setError(newSemester.error);
      return;
    }

    const semGPA = newSemester.semesterGPA ?? 0;
    const semCredits = newSemester.semesterCredits ?? 0;

    const totalCombinedCredits = pastCredits + semCredits;
    if (totalCombinedCredits <= 0) {
      setError('Total combined credits must be greater than zero.');
      return;
    }

    const overallCumulativeGPA =
      (pastGPA * pastCredits + semGPA * semCredits) / totalCombinedCredits;

    setCumulativeResult({
      semesterGPA: semGPA,
      cumulativeGPA: overallCumulativeGPA,
    });
  };

  // Realtime GPA calculation trigger
  useEffect(() => {
    if (activeTab === 'semester') {
      handleCalculateSemester();
    } else {
      handleCalculateCumulative();
    }
  }, [activeTab, isWeighted, scale, semesterRows, currentGPA, currentCredits, cumulativeSemesterRows]);

  // Result color tiers helper
  const getColorClass = (val: number) => {
    if (val >= 3.5) return 'text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/5 border-blue-200/30 dark:border-blue-900/20';
    if (val >= 2.5) return 'text-green-600 dark:text-green-400 bg-green-50/30 dark:bg-green-950/5 border-green-200/30 dark:border-green-900/20';
    if (val >= 2.0) return 'text-amber-500 dark:text-amber-400 bg-amber-50/30 dark:bg-amber-950/5 border-amber-200/30 dark:border-amber-900/20';
    return 'text-red-500 dark:text-red-400 bg-red-50/30 dark:bg-red-950/5 border-red-200/30 dark:border-red-900/20';
  };

  const getLabelColorClass = (val: number) => {
    if (val >= 3.5) return 'text-blue-500';
    if (val >= 2.5) return 'text-green-500';
    if (val >= 2.0) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Tab Navigators */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('semester')}
          className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'semester'
              ? 'border-[#1a3c5e] dark:border-blue-400 text-[#1a3c5e] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          Semester GPA
        </button>
        <button
          onClick={() => setActiveTab('cumulative')}
          className={`flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-all ${
            activeTab === 'cumulative'
              ? 'border-[#1a3c5e] dark:border-blue-400 text-[#1a3c5e] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          Cumulative GPA
        </button>
      </div>

      {/* Global Config Panel: Weighted Toggle & Custom Scale Setting */}
      <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200/50 dark:border-gray-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Weighted/Unweighted Toggle */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GPA Type</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsWeighted(true)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    isWeighted
                      ? 'bg-blue-50/80 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400'
                      : 'border-gray-200 text-slate-600 dark:border-gray-800 dark:text-slate-400'
                  }`}
                >
                  Weighted (5.0 Max)
                </button>
                <button
                  type="button"
                  onClick={() => setIsWeighted(false)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    !isWeighted
                      ? 'bg-blue-50/80 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400'
                      : 'border-gray-200 text-slate-600 dark:border-gray-800 dark:text-slate-400'
                  }`}
                >
                  Unweighted (4.0 Max)
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowScaleEditor(!showScaleEditor)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Customize Grade Points</span>
            {showScaleEditor ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Collapsible Custom GPA Scale Editor */}
        {showScaleEditor && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-3">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase block">
              Customize Scale Grade Values (AP/Honors weighting is added automatically)
            </span>

            {scaleError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>{scaleError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {Object.keys(scale).map((key) => {
                const isF = key === 'F';
                return (
                  <div key={key} className="flex items-center gap-2 justify-between bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200/60 dark:border-gray-800">
                    <span className="text-sm font-bold text-slate-500">{key}:</span>
                    <input
                      type="number"
                      step="0.1"
                      disabled={isF}
                      value={scale[key]}
                      onChange={(e) => {
                        setScale({
                          ...scale,
                          [key]: parseFloat(e.target.value) || 0.0,
                        });
                      }}
                      className={`w-14 p-1 text-center border rounded text-xs font-bold font-mono focus:outline-none ${
                        isF
                          ? 'bg-gray-100 dark:bg-gray-800/80 border-gray-200 dark:border-gray-800 text-slate-400 cursor-not-allowed'
                          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Standard Scale Warning note (ONLY in main calculator view) */}
      {!showScaleEditor && scale['A+'] === 4.0 && scale['A'] === 4.0 && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 px-1">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>A+ and A are both worth 4.0 points in standard GPA calculation.</span>
        </div>
      )}

      {/* Custom Scale alert banner */}
      {isScaleCustomized && (
        <div className="p-3 rounded-lg bg-amber-50/80 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2 font-semibold">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>⚠️ Custom scale is active — ensure all cumulative inputs align with this scale for accurate results.</span>
        </div>
      )}

      {/* Tab 1: Semester GPA Calculator */}
      {activeTab === 'semester' && (
        <div className="space-y-4">
          {/* Table Headers */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            <div className="col-span-5">Course Name</div>
            <div className="col-span-2 text-center">Grade Letter</div>
            <div className="col-span-2 text-center">Credits / Hours</div>
            <div className="col-span-3 text-center">Class Type</div>
          </div>

          <div className="space-y-3">
            {semesterRows.map((row, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-3 p-3 sm:p-0 border border-gray-200/50 sm:border-none rounded-xl bg-gray-50/30 sm:bg-transparent dark:border-gray-800/50"
              >
                {/* Course Name */}
                <div className="col-span-5">
                  <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Course Name</label>
                  <input
                    type="text"
                    value={row.name}
                    placeholder={`e.g. Course ${idx + 1}`}
                    onChange={(e) => {
                      const newRows = [...semesterRows];
                      newRows[idx].name = e.target.value;
                      setSemesterRows(newRows);
                    }}
                    className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none"
                  />
                </div>

                {/* Grade Letter Selector */}
                <div className="col-span-2">
                  <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Grade Letter</label>
                  <select
                    value={row.grade}
                    onChange={(e) => {
                      const newRows = [...semesterRows];
                      newRows[idx].grade = e.target.value;
                      setSemesterRows(newRows);
                    }}
                    className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none cursor-pointer"
                  >
                    {Object.keys(scale).map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Credits / Hours */}
                <div className="col-span-2">
                  <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Credits</label>
                  <input
                    type="number"
                    step="0.5"
                    value={row.credits}
                    placeholder="3"
                    onChange={(e) => {
                      const newRows = [...semesterRows];
                      newRows[idx].credits = e.target.value;
                      setSemesterRows(newRows);
                    }}
                    className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm text-center font-semibold font-mono focus:outline-none"
                  />
                </div>

                {/* Class Type */}
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-full">
                    <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Class Type</label>
                    <select
                      value={row.type}
                      onChange={(e) => {
                        const newRows = [...semesterRows];
                        newRows[idx].type = e.target.value as CourseRow['type'];
                        setSemesterRows(newRows);
                      }}
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="regular">Regular (+0.0)</option>
                      <option value="honors">Honors (+0.5)</option>
                      <option value="ap_ib">AP / IB (+1.0)</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSemesterRow(idx)}
                    disabled={semesterRows.length <= 1}
                    className="mt-5 sm:mt-0 p-2 text-slate-400 hover:text-red-500 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddSemesterRow}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 dark:border-gray-800 dark:text-slate-300 dark:hover:bg-gray-800/40 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Course</span>
            </button>
            <button
              onClick={handleResetSemester}
              className="btn btn-outline ml-auto py-2.5 px-6"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Cumulative GPA Calculator */}
      {activeTab === 'cumulative' && (
        <div className="space-y-6">
          
          {/* Cumulative past stats headers */}
          <div className="bg-gray-50/50 dark:bg-gray-800/20 p-4 rounded-xl border border-gray-200/50 dark:border-gray-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Past Cumulative Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Current Cumulative GPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={currentGPA}
                  onChange={(e) => setCurrentGPA(e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Credits Completed</label>
                <input
                  type="number"
                  value={currentCredits}
                  onChange={(e) => setCurrentCredits(e.target.value)}
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Table Headers for New Semester */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">New Semester Courses</h3>
            
            <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
              <div className="col-span-5">Course Name</div>
              <div className="col-span-2 text-center">Grade Letter</div>
              <div className="col-span-2 text-center">Credits / Hours</div>
              <div className="col-span-3 text-center">Class Type</div>
            </div>

            <div className="space-y-3">
              {cumulativeSemesterRows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-3 p-3 sm:p-0 border border-gray-200/50 sm:border-none rounded-xl bg-gray-50/30 sm:bg-transparent dark:border-gray-800/50"
                >
                  <div className="col-span-5">
                    <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Course Name</label>
                    <input
                      type="text"
                      value={row.name}
                      placeholder={`e.g. Course ${idx + 1}`}
                      onChange={(e) => {
                        const newRows = [...cumulativeSemesterRows];
                        newRows[idx].name = e.target.value;
                        setCumulativeSemesterRows(newRows);
                      }}
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Grade Letter</label>
                    <select
                      value={row.grade}
                      onChange={(e) => {
                        const newRows = [...cumulativeSemesterRows];
                        newRows[idx].grade = e.target.value;
                        setCumulativeSemesterRows(newRows);
                      }}
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none cursor-pointer"
                    >
                      {Object.keys(scale).map((letter) => (
                        <option key={letter} value={letter}>
                          {letter}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Credits</label>
                    <input
                      type="number"
                      step="0.5"
                      value={row.credits}
                      placeholder="3"
                      onChange={(e) => {
                        const newRows = [...cumulativeSemesterRows];
                        newRows[idx].credits = e.target.value;
                        setCumulativeSemesterRows(newRows);
                      }}
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm text-center font-semibold font-mono focus:outline-none"
                    />
                  </div>

                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-full">
                      <label className="block sm:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Class Type</label>
                      <select
                        value={row.type}
                        onChange={(e) => {
                          const newRows = [...cumulativeSemesterRows];
                          newRows[idx].type = e.target.value as CourseRow['type'];
                          setCumulativeSemesterRows(newRows);
                        }}
                        className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none cursor-pointer"
                      >
                        <option value="regular">Regular (+0.0)</option>
                        <option value="honors">Honors (+0.5)</option>
                        <option value="ap_ib">AP / IB (+1.0)</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCumulativeRow(idx)}
                      disabled={cumulativeSemesterRows.length <= 1}
                      className="mt-5 sm:mt-0 p-2 text-slate-400 hover:text-red-500 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddCumulativeRow}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 dark:border-gray-800 dark:text-slate-300 dark:hover:bg-gray-800/40 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Course</span>
              </button>
              <button
                onClick={handleResetCumulative}
                className="btn btn-outline ml-auto py-2.5 px-6"
              >
                ↺ Reset
              </button>
            </div>
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
      {semesterResult !== null && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className={`border p-6 rounded-2xl text-center space-y-3 ${getColorClass(semesterResult)}`}>
            <span className="text-xs font-bold uppercase tracking-widest block">
              Semester GPA {isWeighted ? '(Weighted)' : '(Unweighted)'}
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono">
              {semesterResult.toFixed(2)}
            </div>
            <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Your average academic level for this semester is graded as{' '}
              <span className={`font-bold ${getLabelColorClass(semesterResult)}`}>
                {semesterResult >= 3.5
                  ? "Dean's List / Excellent"
                  : semesterResult >= 2.5
                  ? 'Good'
                  : semesterResult >= 2.0
                  ? 'Average'
                  : 'At Risk / Academic Probation'}
              </span>.
            </p>
          </div>
        </div>
      )}

      {cumulativeResult !== null && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className={`border p-6 rounded-2xl space-y-4 ${getColorClass(cumulativeResult.cumulativeGPA)}`}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto items-center">
              
              {/* Semester Result */}
              <div className="text-center sm:text-right border-b sm:border-b-0 sm:border-r border-gray-200/50 dark:border-gray-800/50 pb-4 sm:pb-0 sm:pr-6">
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">
                  New Semester GPA {isWeighted ? '(Weighted)' : '(Unweighted)'}
                </span>
                <span className="text-3xl font-extrabold font-mono text-slate-800 dark:text-white">
                  {cumulativeResult.semesterGPA.toFixed(2)}
                </span>
              </div>

              {/* Cumulative Result */}
              <div className="text-center sm:text-left sm:pl-6">
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-1">
                  New Cumulative GPA {isWeighted ? '(Weighted)' : '(Unweighted)'}
                </span>
                <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {cumulativeResult.cumulativeGPA.toFixed(2)}
                </span>
              </div>

            </div>

            <div className="text-center text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Your overall cumulative standing is graded as{' '}
              <span className={`font-bold ${getLabelColorClass(cumulativeResult.cumulativeGPA)}`}>
                {cumulativeResult.cumulativeGPA >= 3.5
                  ? "Dean's List / Excellent"
                  : cumulativeResult.cumulativeGPA >= 2.5
                  ? 'Good'
                  : cumulativeResult.cumulativeGPA >= 2.0
                  ? 'Average'
                  : 'At Risk / Academic Probation'}
              </span>.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
