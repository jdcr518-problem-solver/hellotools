'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Scale, Flame, Droplet, Smile } from 'lucide-react';

// ==========================================
// 31. BMI CALCULATOR
// ==========================================
export function BMICalculator() {
  const [metric, setMetric] = useState(true);
  const [weight, setWeight] = useState(70); // kg or lbs
  const [height, setHeight] = useState(175); // cm or inches
  const [bmi, setBmi] = useState(0);
  const [status, setStatus] = useState('');

  const calculate = () => {
    let bmiValue = 0;
    if (metric) {
      const heightMeters = height / 100;
      if (heightMeters <= 0) return;
      bmiValue = weight / (heightMeters * heightMeters);
    } else {
      if (height <= 0) return;
      bmiValue = (weight / (height * height)) * 703;
    }

    const roundedBmi = Math.round(bmiValue * 10) / 10;
    setBmi(roundedBmi);

    let s = '';
    if (roundedBmi < 18.5) s = 'Underweight';
    else if (roundedBmi < 25) s = 'Healthy Weight';
    else if (roundedBmi < 30) s = 'Overweight';
    else s = 'Obese';
    setStatus(s);
  };

  useEffect(() => {
    calculate();
  }, [weight, height, metric]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="flex gap-2 mb-2">
          <button onClick={() => { setMetric(true); setWeight(70); setHeight(175); }} className={`px-3 py-1 rounded text-xs font-bold ${metric ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Metric (cm/kg)</button>
          <button onClick={() => { setMetric(false); setWeight(150); setHeight(68); }} className={`px-3 py-1 rounded text-xs font-bold ${!metric ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Imperial (in/lb)</button>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Weight ({metric ? 'kg' : 'lbs'})</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Height ({metric ? 'cm' : 'inches'})</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase">BMI Score</span>
          <div className="text-3xl font-extrabold text-[#1a3c5e] dark:text-blue-400 mt-1">{bmi}</div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-850"></div>
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase font-semibold">Classification</span>
          <div className={`text-lg font-bold mt-1 ${status === 'Healthy Weight' ? 'text-green-600' : 'text-amber-600 dark:text-orange-400'}`}>{status}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 32. CALORIE CALCULATOR (TDEE)
// ==========================================
export function CalorieCalculatorTDEE() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(70); // kg
  const [height, setHeight] = useState(175); // cm
  const [activity, setActivity] = useState(1.2); // sedentary
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);

  const calculate = () => {
    let bmrVal = 0;
    
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      bmrVal = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrVal = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    setBmr(Math.round(bmrVal));
    setTdee(Math.round(bmrVal * activity));
  };

  useEffect(() => {
    calculate();
  }, [age, gender, weight, height, activity]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Age (years)</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
            <option value={1.2}>Sedentary (desk job, no exercise)</option>
            <option value={1.375}>Lightly Active (1-3 days/wk light exercise)</option>
            <option value={1.55}>Moderately Active (3-5 days/wk moderate exercise)</option>
            <option value={1.725}>Very Active (6-7 days/wk heavy exercise)</option>
            <option value={1.9}>Extra Active (physical job &amp; daily workouts)</option>
          </select>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs uppercase tracking-widest opacity-80">BMR (Basal Metabolic Rate)</span>
          <div className="text-2xl font-bold mt-1">{bmr.toLocaleString()} kcal</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div>
          <span className="text-xs uppercase tracking-widest opacity-80">TDEE (Daily Calories Target)</span>
          <div className="text-3xl font-extrabold text-[#f97316] mt-1">{tdee.toLocaleString()} kcal</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 33. BODY FAT PERCENTAGE CALCULATOR
// ==========================================
export function BodyFatPercentageCalculator() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175); // cm
  const [waist, setWaist] = useState(85); // cm
  const [neck, setNeck] = useState(38); // cm
  const [hip, setHip] = useState(95); // cm (for females only)
  const [bodyFat, setBodyFat] = useState(0);

  const calculate = () => {
    let bf = 0;
    // US Navy equations
    if (gender === 'male') {
      if (waist - neck <= 0) return;
      bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      if (waist + hip - neck <= 0) return;
      bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }

    setBodyFat(Math.max(2, Math.min(60, Math.round(bf * 10) / 10)));
  };

  useEffect(() => {
    calculate();
  }, [gender, height, waist, neck, hip]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-2">Waist (cm)</label>
            <input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-2">Neck (cm)</label>
            <input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs" />
          </div>
          {gender === 'female' && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-2">Hip (cm)</label>
              <input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs" />
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase">Estimated Body Fat</span>
          <div className="text-3xl font-extrabold text-[#1a3c5e] dark:text-blue-400 mt-1">{bodyFat}%</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 34. PREGNANCY DUE DATE CALCULATOR
// ==========================================
export function PregnancyDueDateCalculator() {
  const [lmp, setLmp] = useState('2026-01-01');
  const [cycleLength, setCycleLength] = useState(28);
  const [dueDate, setDueDate] = useState('');
  const [conception, setConception] = useState('');
  const [week, setWeek] = useState(0);

  const calculate = () => {
    const lmpDate = new Date(lmp);
    if (isNaN(lmpDate.getTime())) return;

    // Naegele's rule: add 280 days + adjust based on cycle length relative to 28 days
    const daysToAdd = 280 + (cycleLength - 28);
    const due = new Date(lmpDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    const conc = new Date(lmpDate.getTime() + (cycleLength - 14) * 24 * 60 * 60 * 1000);

    const today = new Date();
    const diffMs = today.getTime() - lmpDate.getTime();
    const elapsedWeeks = Math.max(0, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)));

    setDueDate(due.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setConception(conc.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setWeek(elapsedWeeks);
  };

  useEffect(() => {
    calculate();
  }, [lmp, cycleLength]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">First Day of Last Period (LMP)</label>
          <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Cycle Length (days)</label>
          <input type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase">Estimated Due Date</span>
          <div className="text-2xl font-bold text-[#f97316] mt-1">{dueDate}</div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-850"></div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span>Conception (est):</span>
            <div className="font-bold text-gray-900 dark:text-white mt-0.5">{conception}</div>
          </div>
          <div>
            <span>Current Week:</span>
            <div className="font-bold text-[#1a3c5e] dark:text-blue-400 mt-0.5">Week {week}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 35. OVULATION CALCULATOR
// ==========================================
export function OvulationCalculator() {
  const [lmp, setLmp] = useState('2026-01-01');
  const [cycle, setCycle] = useState(28);
  const [ovulation, setOvulation] = useState('');
  const [windowStart, setWindowStart] = useState('');
  const [windowEnd, setWindowEnd] = useState('');

  const calculate = () => {
    const lmpDate = new Date(lmp);
    if (isNaN(lmpDate.getTime())) return;

    // Ovulation is roughly cycle - 14 days after LMP
    const daysToOvulation = cycle - 14;
    const ovDate = new Date(lmpDate.getTime() + daysToOvulation * 24 * 60 * 60 * 1000);
    
    // Fertile window starts 5 days before ovulation
    const start = new Date(ovDate.getTime() - 5 * 24 * 60 * 60 * 1000);
    const end = new Date(ovDate.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day after

    const fmt = { month: 'short' as const, day: 'numeric' as const, year: 'numeric' as const };
    setOvulation(ovDate.toLocaleDateString('en-US', fmt));
    setWindowStart(start.toLocaleDateString('en-US', fmt));
    setWindowEnd(end.toLocaleDateString('en-US', fmt));
  };

  useEffect(() => {
    calculate();
  }, [lmp, cycle]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">First Day of Last Period</label>
          <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Cycle Duration (days)</label>
          <input type="number" value={cycle} onChange={(e) => setCycle(Number(e.target.value))} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase">Ovulation Day (est)</span>
          <div className="text-2xl font-bold text-[#f97316] mt-1">{ovulation}</div>
        </div>
        <div className="h-px bg-gray-200 dark:bg-gray-850"></div>
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase">Most Fertile Window</span>
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
            {windowStart} to {windowEnd}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 36. WATER INTAKE CALCULATOR
// ==========================================
export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState(70); // kg
  const [exercise, setExercise] = useState(30); // minutes/day
  const [targetOz, setTargetOz] = useState(0);
  const [targetL, setTargetL] = useState(0);

  const calculate = () => {
    // 0.5 oz of water per lb of body weight + 12 oz per 30 min of exercise
    const weightLbs = weight * 2.20462;
    const baseOz = weightLbs * 0.5;
    const exerciseOz = (exercise / 30) * 12;
    const totalOz = baseOz + exerciseOz;

    setTargetOz(Math.round(totalOz));
    setTargetL(Math.round((totalOz * 0.0295735) * 10) / 10);
  };

  useEffect(() => {
    calculate();
  }, [weight, exercise]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Daily Exercise (minutes)</label>
          <input type="number" value={exercise} onChange={(e) => setExercise(Number(e.target.value))} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase">Recommended Daily Hydration</span>
          <div className="text-3xl font-extrabold text-[#1a3c5e] dark:text-blue-400 mt-1">{targetL} Liters</div>
          <span className="text-[10px] text-gray-400 block mt-1">({targetOz} Fluid Ounces)</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 37. IDEAL WEIGHT CALCULATOR
// ==========================================
export function IdealWeightCalculator() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175); // cm
  const [devine, setDevine] = useState(0);
  const [robinson, setRobinson] = useState(0);

  const calculate = () => {
    const heightInches = height / 2.54;
    const inchesOver5Feet = Math.max(0, heightInches - 60);

    let dev = 0;
    let rob = 0;

    if (gender === 'male') {
      dev = 50.0 + 2.3 * inchesOver5Feet;
      rob = 52.0 + 1.9 * inchesOver5Feet;
    } else {
      dev = 45.5 + 2.3 * inchesOver5Feet;
      rob = 49.0 + 1.7 * inchesOver5Feet;
    }

    setDevine(Math.round(dev * 10) / 10);
    setRobinson(Math.round(rob * 10) / 10);
  };

  useEffect(() => {
    calculate();
  }, [gender, height]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">Devine Formula</span>
            <span className="text-2xl font-extrabold text-[#1a3c5e] dark:text-blue-400 block mt-1">{devine} kg</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">Robinson Formula</span>
            <span className="text-2xl font-extrabold text-[#1a3c5e] dark:text-blue-400 block mt-1">{robinson} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 38. MACRONUTRIENT CALCULATOR
// ==========================================
export function MacronutrientCalculator() {
  const [calories, setCalories] = useState(2000);
  const [dietType, setDietType] = useState('balanced');
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  const calculate = () => {
    let pRatio = 0.3;
    let cRatio = 0.4;
    let fRatio = 0.3;

    if (dietType === 'lowcarb') {
      pRatio = 0.35;
      cRatio = 0.25;
      fRatio = 0.4;
    } else if (dietType === 'keto') {
      pRatio = 0.2;
      cRatio = 0.05;
      fRatio = 0.75;
    } else if (dietType === 'highprotein') {
      pRatio = 0.4;
      cRatio = 0.35;
      fRatio = 0.25;
    }

    setProtein(Math.round((calories * pRatio) / 4));
    setCarbs(Math.round((calories * cRatio) / 4));
    setFat(Math.round((calories * fRatio) / 9));
  };

  useEffect(() => {
    calculate();
  }, [calories, dietType]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Daily Calorie Target (kcal)</label>
          <input type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Diet Goal Profile</label>
          <select value={dietType} onChange={(e) => setDietType(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
            <option value="balanced">Balanced (40% carb / 30% protein / 30% fat)</option>
            <option value="lowcarb">Low Carb (25% carb / 35% protein / 40% fat)</option>
            <option value="keto">Keto (5% carb / 20% protein / 75% fat)</option>
            <option value="highprotein">High Protein (35% carb / 40% protein / 25% fat)</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col justify-center gap-3">
        <h4 className="font-bold text-gray-800 dark:text-white uppercase text-xs text-center mb-1">Daily Gram Splits</h4>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-lg p-2">
            <span className="font-mono font-bold text-gray-900 dark:text-white block">{protein}g</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Protein</span>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-lg p-2">
            <span className="font-mono font-bold text-gray-900 dark:text-white block">{carbs}g</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Carbs</span>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-lg p-2">
            <span className="font-mono font-bold text-gray-900 dark:text-white block">{fat}g</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Fat</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 39. RUNNING PACE CALCULATOR
// ==========================================
export function RunningPaceCalculator() {
  const [distance, setDistance] = useState(5.0); // km or miles
  const [timeH, setTimeH] = useState(0);
  const [timeM, setTimeM] = useState(25);
  const [timeS, setTimeS] = useState(0);
  const [paceM, setPaceM] = useState(5);
  const [paceS, setPaceS] = useState(0);
  const [calcMode, setCalcMode] = useState('pace'); // calculate 'pace', 'time', or 'distance'

  const calculate = () => {
    const totalTimeSeconds = timeH * 3600 + timeM * 60 + timeS;
    const totalPaceSeconds = paceM * 60 + paceS;

    if (calcMode === 'pace') {
      if (distance <= 0) return;
      const paceSeconds = totalTimeSeconds / distance;
      setPaceM(Math.floor(paceSeconds / 60));
      setPaceS(Math.round(paceSeconds % 60));
    } else if (calcMode === 'time') {
      const timeSeconds = distance * totalPaceSeconds;
      setTimeH(Math.floor(timeSeconds / 3600));
      setTimeM(Math.floor((timeSeconds % 3600) / 60));
      setTimeS(Math.round(timeSeconds % 60));
    } else if (calcMode === 'distance') {
      if (totalPaceSeconds <= 0) return;
      const dist = totalTimeSeconds / totalPaceSeconds;
      setDistance(Math.round(dist * 100) / 100);
    }
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="flex gap-2">
        {['pace', 'time', 'distance'].map(m => (
          <button 
            key={m} onClick={() => setCalcMode(m)}
            className={`px-3 py-1 rounded text-xs font-bold capitalize ${calcMode === m ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            Calculate {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Distance */}
        <div className="border border-gray-150 dark:border-gray-800 p-4 rounded-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Distance (km/mi)</label>
          <input 
            type="number" step="0.01" value={distance} onChange={(e) => setDistance(Number(e.target.value))} disabled={calcMode === 'distance'}
            className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm disabled:bg-gray-100 dark:disabled:bg-gray-900"
          />
        </div>

        {/* Time */}
        <div className="border border-gray-150 dark:border-gray-800 p-4 rounded-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Duration (hr:min:sec)</label>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-center">
            <input type="number" placeholder="Hr" value={timeH} onChange={(e) => setTimeH(Number(e.target.value))} disabled={calcMode === 'time'} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center text-xs" />
            <input type="number" placeholder="Min" value={timeM} onChange={(e) => setTimeM(Number(e.target.value))} disabled={calcMode === 'time'} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center text-xs" />
            <input type="number" placeholder="Sec" value={timeS} onChange={(e) => setTimeS(Number(e.target.value))} disabled={calcMode === 'time'} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center text-xs" />
          </div>
        </div>

        {/* Pace */}
        <div className="border border-gray-150 dark:border-gray-800 p-4 rounded-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Pace (min:sec)</label>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-center">
            <input type="number" placeholder="Min" value={paceM} onChange={(e) => setPaceM(Number(e.target.value))} disabled={calcMode === 'pace'} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center text-xs" />
            <input type="number" placeholder="Sec" value={paceS} onChange={(e) => setPaceS(Number(e.target.value))} disabled={calcMode === 'pace'} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center text-xs" />
          </div>
        </div>
      </div>

      <button onClick={calculate} className="btn btn-primary" style={{ height: '38px', fontSize: '0.8125rem' }}>
        Run Calculation
      </button>
    </div>
  );
}

// ==========================================
// 40. SLEEP CYCLE CALCULATOR
// ==========================================
export function SleepCycleCalculator() {
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeTimes, setWakeTimes] = useState<string[]>([]);

  const calculate = () => {
    const [h, m] = bedtime.split(':').map(Number);
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m);
    date.setSeconds(0);

    // 15 mins to fall asleep
    const startTime = date.getTime() + 15 * 60 * 1000;

    // Standard 90-minute sleep cycles (suggesting 3, 4, 5, and 6 cycles)
    const cycles = [3, 4, 5, 6];
    const results = cycles.map(c => {
      const cycleTime = startTime + c * 90 * 60 * 1000;
      const targetDate = new Date(cycleTime);
      return targetDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    });

    setWakeTimes(results);
  };

  useEffect(() => {
    calculate();
  }, [bedtime]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Expected Bedtime</label>
          <input 
            type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 border border-gray-150 dark:border-gray-800 p-5 rounded-xl">
        <span className="text-xs font-bold text-gray-400 uppercase mb-3 block text-center">Suggested Wake Times</span>
        <div className="grid grid-cols-2 gap-3">
          {wakeTimes.map((time, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-center shadow-sm">
              <span className="text-sm font-bold text-[#1a3c5e] dark:text-blue-400 block">{time}</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">({idx + 3} Sleep Cycles)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
