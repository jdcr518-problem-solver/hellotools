'use client';

import React, { useState, useEffect } from 'react';
import { Percent, Calendar, Calculator, Sparkles, Hash } from 'lucide-react';

// ==========================================
// 11. PERCENTAGE CALCULATOR
// ==========================================
export function PercentageCalculator() {
  // Sub-tool 1: What is X% of Y
  const [x1, setX1] = useState(15);
  const [y1, setY1] = useState(200);
  const [ans1, setAns1] = useState(0);

  // Sub-tool 2: X is what % of Y
  const [x2, setX2] = useState(30);
  const [y2, setY2] = useState(150);
  const [ans2, setAns2] = useState(0);

  // Sub-tool 3: Percentage change from X to Y
  const [x3, setX3] = useState(50);
  const [y3, setY3] = useState(80);
  const [ans3, setAns3] = useState(0);

  useEffect(() => {
    setAns1((x1 / 100) * y1);
  }, [x1, y1]);

  useEffect(() => {
    setAns2(y2 !== 0 ? (x2 / y2) * 100 : 0);
  }, [x2, y2]);

  useEffect(() => {
    setAns3(x3 !== 0 ? ((y3 - x3) / x3) * 100 : 0);
  }, [x3, y3]);

  return (
    <div className="space-y-6 text-sm">
      {/* Box 1 */}
      <div className="card p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl space-y-3">
        <h3 className="font-bold text-gray-800 dark:text-gray-150">What is X% of Y?</h3>
        <div className="flex flex-wrap items-center gap-3">
          <span>What is</span>
          <input 
            type="number" value={x1} onChange={(e) => setX1(Number(e.target.value))}
            className="w-20 p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center"
          />
          <span>% of</span>
          <input 
            type="number" value={y1} onChange={(e) => setY1(Number(e.target.value))}
            className="w-24 p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center"
          />
          <span>is</span>
          <span className="font-mono font-bold text-[#f97316] bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded border border-gray-200/50 dark:border-gray-700">
            {ans1.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Box 2 */}
      <div className="card p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl space-y-3">
        <h3 className="font-bold text-gray-800 dark:text-gray-150">X is what % of Y?</h3>
        <div className="flex flex-wrap items-center gap-3">
          <input 
            type="number" value={x2} onChange={(e) => setX2(Number(e.target.value))}
            className="w-20 p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center"
          />
          <span>is what % of</span>
          <input 
            type="number" value={y2} onChange={(e) => setY2(Number(e.target.value))}
            className="w-24 p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center"
          />
          <span>is</span>
          <span className="font-mono font-bold text-[#f97316] bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded border border-gray-200/50 dark:border-gray-700">
            {ans2.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Box 3 */}
      <div className="card p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl space-y-3">
        <h3 className="font-bold text-gray-800 dark:text-gray-150">Percentage Increase / Decrease</h3>
        <div className="flex flex-wrap items-center gap-3">
          <span>From</span>
          <input 
            type="number" value={x3} onChange={(e) => setX3(Number(e.target.value))}
            className="w-20 p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center"
          />
          <span>to</span>
          <input 
            type="number" value={y3} onChange={(e) => setY3(Number(e.target.value))}
            className="w-24 p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center"
          />
          <span>is a change of</span>
          <span className={`font-mono font-bold px-3 py-1.5 rounded border ${ans3 >= 0 ? 'text-green-600 bg-green-50/50 dark:bg-green-950/20 border-green-200' : 'text-red-500 bg-red-50/50 dark:bg-red-950/20 border-red-200'}`}>
            {ans3 >= 0 ? '+' : ''}{ans3.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 12. AGE CALCULATOR
// ==========================================
export function AgeCalculator() {
  const [dob, setDob] = useState('2000-05-15');
  const [targetDate, setTargetDate] = useState('');
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [nextBdayMsg, setNextBdayMsg] = useState('');

  useEffect(() => {
    setTargetDate(new Date().toISOString().split('T')[0]);
  }, []);

  const calculate = () => {
    const dDate = new Date(dob);
    const tDate = new Date(targetDate);

    if (isNaN(dDate.getTime()) || isNaN(tDate.getTime())) return;
    if (tDate < dDate) {
      setResult(null);
      setNextBdayMsg('Target date must be after birth date.');
      return;
    }

    let years = tDate.getFullYear() - dDate.getFullYear();
    let months = tDate.getMonth() - dDate.getMonth();
    let days = tDate.getDate() - dDate.getDate();

    if (days < 0) {
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });

    // Next birthday countdown
    const nextBday = new Date(tDate.getFullYear(), dDate.getMonth(), dDate.getDate());
    if (nextBday < tDate) {
      nextBday.setFullYear(tDate.getFullYear() + 1);
    }

    let bdayMonths = nextBday.getMonth() - tDate.getMonth();
    let bdayDays = nextBday.getDate() - tDate.getDate();

    if (bdayDays < 0) {
      const prev = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0);
      bdayDays += prev.getDate();
      bdayMonths--;
    }
    if (bdayMonths < 0) {
      bdayMonths += 12;
    }

    if (bdayMonths === 0 && bdayDays === 0) {
      setNextBdayMsg('🎉 Happy Birthday! Today is your birthday! 🎉');
    } else {
      setNextBdayMsg(`Your next birthday will be in ${bdayMonths} month(s) and ${bdayDays} day(s).`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Date of Birth</label>
          <input 
            type="date" value={dob} onChange={(e) => setDob(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Age at the Date of</label>
          <input 
            type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
          />
        </div>
        <button 
          onClick={calculate}
          className="btn btn-primary" style={{ height: '40px', fontSize: '0.875rem' }}
        >
          Calculate Age
        </button>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        {result ? (
          <>
            <span className="text-xs uppercase tracking-widest opacity-80">Calculated Age</span>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                <span className="text-3xl font-extrabold block">{result.years}</span>
                <span className="text-[10px] uppercase opacity-75">Years</span>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                <span className="text-3xl font-extrabold block">{result.months}</span>
                <span className="text-[10px] uppercase opacity-75">Months</span>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                <span className="text-3xl font-extrabold block">{result.days}</span>
                <span className="text-[10px] uppercase opacity-75">Days</span>
              </div>
            </div>
            <div className="h-px bg-white/10 my-1"></div>
            <div className="text-xs opacity-90">{nextBdayMsg}</div>
          </>
        ) : (
          <div className="text-gray-300 py-10">Specify dates and click calculate to view results.</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 13. DATE DIFFERENCE CALCULATOR
// ==========================================
export function DateDifferenceCalculator() {
  const [start, setStart] = useState('2026-01-01');
  const [end, setEnd] = useState('2026-12-31');
  const [totalDays, setTotalDays] = useState(0);
  const [breakdown, setBreakdown] = useState('');

  const calculate = () => {
    const sDate = new Date(start);
    const eDate = new Date(end);

    if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) return;

    const diffMs = Math.abs(eDate.getTime() - sDate.getTime());
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    setTotalDays(days);

    // Dynamic calendar difference
    let years = eDate.getFullYear() - sDate.getFullYear();
    let months = eDate.getMonth() - sDate.getMonth();
    let dDays = eDate.getDate() - sDate.getDate();

    if (dDays < 0) {
      const prevMonth = new Date(eDate.getFullYear(), eDate.getMonth(), 0);
      dDays += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    if (eDate < sDate) {
      setBreakdown('Start date is after End date. Values swapped in calculation.');
    } else {
      setBreakdown(`${years} years, ${months} months, and ${dDays} days`);
    }
  };

  useEffect(() => {
    calculate();
  }, [start, end]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Start Date</label>
          <input 
            type="date" value={start} onChange={(e) => setStart(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">End Date</label>
          <input 
            type="date" value={end} onChange={(e) => setEnd(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Total Difference</span>
          <div className="text-3xl font-extrabold text-white mt-1">{totalDays.toLocaleString()} Days</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Calendar Breakdown</span>
          <div className="text-sm font-semibold text-white/90 mt-1">{breakdown}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 14. TIME CALCULATOR
// ==========================================
export function TimeCalculator() {
  const [h1, setH1] = useState(2);
  const [m1, setM1] = useState(30);
  const [s1, setS1] = useState(0);

  const [h2, setH2] = useState(1);
  const [m2, setM2] = useState(45);
  const [s2, setS2] = useState(30);

  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');

  const calculate = () => {
    const sec1 = h1 * 3600 + m1 * 60 + s1;
    const sec2 = h2 * 3600 + m2 * 60 + s2;

    let diffSeconds = 0;
    if (operation === 'add') {
      diffSeconds = sec1 + sec2;
    } else {
      diffSeconds = Math.max(0, sec1 - sec2);
    }

    const h = Math.floor(diffSeconds / 3600);
    const m = Math.floor((diffSeconds % 3600) / 60);
    const s = diffSeconds % 60;

    setResult(`${h} Hours, ${m} Minutes, and ${s} Seconds`);
  };

  useEffect(() => {
    calculate();
  }, [h1, m1, s1, h2, m2, s2, operation]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        {/* Time 1 */}
        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-lg">
          <span className="font-bold text-gray-700 dark:text-gray-300">Time 1</span>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Hr</label>
              <input type="number" value={h1} onChange={(e) => setH1(Number(e.target.value))} className="w-full p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Min</label>
              <input type="number" value={m1} onChange={(e) => setM1(Number(e.target.value))} className="w-full p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Sec</label>
              <input type="number" value={s1} onChange={(e) => setS1(Number(e.target.value))} className="w-full p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            </div>
          </div>
        </div>

        {/* Operation Selection */}
        <div className="flex gap-2 justify-center">
          <button 
            onClick={() => setOperation('add')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg ${operation === 'add' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
          >
            ➕ Add
          </button>
          <button 
            onClick={() => setOperation('subtract')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg ${operation === 'subtract' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
          >
            ➖ Subtract
          </button>
        </div>

        {/* Time 2 */}
        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-lg">
          <span className="font-bold text-gray-700 dark:text-gray-300">Time 2</span>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Hr</label>
              <input type="number" value={h2} onChange={(e) => setH2(Number(e.target.value))} className="w-full p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Min</label>
              <input type="number" value={m2} onChange={(e) => setM2(Number(e.target.value))} className="w-full p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Sec</label>
              <input type="number" value={s2} onChange={(e) => setS2(Number(e.target.value))} className="w-full p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-2 text-center">
        <span className="text-xs font-bold text-white/80 uppercase">Duration Result</span>
        <div className="text-xl font-extrabold text-white mt-2">{result}</div>
      </div>
    </div>
  );
}

// ==========================================
// 15. SCIENTIFIC CALCULATOR
// ==========================================
export function ScientificCalculator() {
  const [display, setDisplay] = useState('');
  
  const handleBtn = (val: string) => {
    setDisplay(prev => prev + val);
  };

  const handleClear = () => setDisplay('');
  const handleBackspace = () => setDisplay(prev => prev.slice(0, -1));

  const handleEvaluate = () => {
    try {
      // Safely replace trig functions/constants for basic evaluations
      let parsed = display
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');
      
      const fn = new Function(`return ${parsed}`);
      const val = fn();
      if (typeof val === 'number') {
        setDisplay(Number(val.toFixed(8)).toString());
      } else {
        setDisplay('Error');
      }
    } catch {
      setDisplay('Error');
    }
  };

  const btns = [
    ['sin(', 'cos(', 'tan(', 'π', 'e'],
    ['log(', 'ln(', '√(', '(', ')'],
    ['7', '8', '9', '/', 'C'],
    ['4', '5', '6', '*', '←'],
    ['1', '2', '3', '-', '+'],
    ['0', '.', '^', 'Evaluate', '=']
  ];

  return (
    <div className="max-w-xs mx-auto p-4 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-950 shadow-sm">
      <div className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 text-right p-3.5 rounded-lg mb-4 text-lg font-mono min-h-12 text-gray-900 dark:text-gray-50 break-all select-all">
        {display || '0'}
      </div>
      <div className="grid grid-cols-5 gap-1.5 text-xs font-semibold">
        {btns.flat().map((b) => {
          let span = 1;
          let color = 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 text-gray-700 dark:text-gray-300';
          
          if (b === '=') {
            span = 2;
            color = 'bg-[#f97316] hover:bg-orange-600 text-white';
          } else if (b === 'Evaluate') {
            // hidden slot to offset the colspan
            return null;
          } else if (['C', '←'].includes(b)) {
            color = 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100';
          }
          
          return (
            <button
              key={b}
              onClick={() => {
                if (b === '=') handleEvaluate();
                else if (b === 'C') handleClear();
                else if (b === '←') handleBackspace();
                else if (b === '^') handleBtn('**');
                else handleBtn(b);
              }}
              style={{ gridColumn: `span ${span}` }}
              className={`p-3 rounded-lg border border-gray-200/50 dark:border-gray-800 transition-colors ${color}`}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 16. FRACTION CALCULATOR
// ==========================================
export function FractionCalculator() {
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);
  const [op, setOp] = useState('+');
  const [result, setResult] = useState('');

  // Greatest Common Divisor
  const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);

  const calculate = () => {
    if (den1 === 0 || den2 === 0) {
      setResult('Error: Denominator cannot be zero.');
      return;
    }

    let resNum = 0;
    let resDen = 1;

    if (op === '+') {
      resNum = num1 * den2 + num2 * den1;
      resDen = den1 * den2;
    } else if (op === '-') {
      resNum = num1 * den2 - num2 * den1;
      resDen = den1 * den2;
    } else if (op === '*') {
      resNum = num1 * num2;
      resDen = den1 * den2;
    } else if (op === '/') {
      resNum = num1 * den2;
      resDen = den1 * num2;
    }

    if (resDen === 0) {
      setResult('Error: division by zero.');
      return;
    }

    const divisor = gcd(resNum, resDen);
    const simplifiedNum = resNum / divisor;
    const simplifiedDen = resDen / divisor;

    // Format output
    let sign = simplifiedNum * simplifiedDen < 0 ? '-' : '';
    const absNum = Math.abs(simplifiedNum);
    const absDen = Math.abs(simplifiedDen);

    if (absNum === 0) {
      setResult('0');
    } else if (absDen === 1) {
      setResult(`${sign}${absNum}`);
    } else {
      setResult(`${sign}${absNum}/${absDen} (${(resNum / resDen).toFixed(4)})`);
    }
  };

  useEffect(() => {
    calculate();
  }, [num1, den1, num2, den2, op]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {/* Fraction 1 */}
          <div className="flex flex-col gap-1 w-16">
            <input type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            <div className="h-0.5 bg-gray-400 dark:bg-gray-600 w-full"></div>
            <input type="number" value={den1} onChange={(e) => setDen1(Number(e.target.value))} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
          </div>

          {/* Operation Selector */}
          <select value={op} onChange={(e) => setOp(e.target.value)} className="p-1.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 font-bold">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">&times;</option>
            <option value="/">&divide;</option>
          </select>

          {/* Fraction 2 */}
          <div className="flex flex-col gap-1 w-16">
            <input type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
            <div className="h-0.5 bg-gray-400 dark:bg-gray-600 w-full"></div>
            <input type="number" value={den2} onChange={(e) => setDen2(Number(e.target.value))} className="p-1 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-center" />
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-2 text-center">
        <span className="text-xs font-bold text-white/80 uppercase">Calculated Fraction</span>
        <div className="text-2xl font-mono font-bold text-white mt-2">{result}</div>
      </div>
    </div>
  );
}

// ==========================================
// 17. AVERAGE / MEAN CALCULATOR
// ==========================================
export function AverageMeanCalculator() {
  const [input, setInput] = useState('5, 12, 18, 23, 38');
  const [stats, setStats] = useState<{ mean: number; median: number; mode: string; range: number; count: number } | null>(null);

  const calculate = () => {
    const arr = input
      .split(',')
      .map(x => parseFloat(x.trim()))
      .filter(x => !isNaN(x));

    if (arr.length === 0) {
      setStats(null);
      return;
    }

    const count = arr.length;
    const sum = arr.reduce((acc, x) => acc + x, 0);
    const mean = sum / count;

    // Median
    const sorted = [...arr].sort((a, b) => a - b);
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode
    const freq: Record<number, number> = {};
    arr.forEach(x => freq[x] = (freq[x] || 0) + 1);
    let max = 0;
    let modes: number[] = [];
    Object.entries(freq).forEach(([k, v]) => {
      if (v > max) {
        max = v;
        modes = [parseFloat(k)];
      } else if (v === max) {
        modes.push(parseFloat(k));
      }
    });

    const modeStr = max > 1 ? modes.join(', ') : 'None';
    const range = sorted[count - 1] - sorted[0];

    setStats({ mean, median, mode: modeStr, range, count });
  };

  useEffect(() => {
    calculate();
  }, [input]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Input Numbers (comma separated)</label>
          <textarea 
            rows={4} value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
            placeholder="e.g. 5, 10, 15, 20"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-5 rounded-xl">
        {stats ? (
          <div className="grid grid-cols-2 gap-3.5 text-xs text-white/90">
            <div>Mean (Average):</div>
            <div className="text-right font-mono font-bold text-white">{stats.mean.toFixed(4)}</div>
            <div>Median:</div>
            <div className="text-right font-mono font-bold text-white">{stats.median}</div>
            <div>Mode:</div>
            <div className="text-right font-mono font-bold text-white">{stats.mode}</div>
            <div>Range:</div>
            <div className="text-right font-mono font-bold text-white">{stats.range}</div>
            <div>Count:</div>
            <div className="text-right font-mono font-bold text-white">{stats.count}</div>
          </div>
        ) : (
          <div className="text-center py-8 text-white/65 text-xs">Please provide a valid numeric sequence.</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 18. SQUARE ROOT CALCULATOR
// ==========================================
export function SquareRootCalculator() {
  const [val, setVal] = useState(16);
  const [rootOrder, setRootOrder] = useState(2); // square root
  const [result, setResult] = useState(0);

  const calculate = () => {
    if (val < 0 && rootOrder % 2 === 0) {
      setResult(NaN);
      return;
    }
    const r = Math.pow(val, 1 / rootOrder);
    setResult(Math.round(r * 1000000) / 1000000);
  };

  useEffect(() => {
    calculate();
  }, [val, rootOrder]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Input Value</label>
          <input 
            type="number" value={val} onChange={(e) => setVal(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Root Order (e.g. 2 for Square, 3 for Cube)</label>
          <input 
            type="number" value={rootOrder} onChange={(e) => setRootOrder(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-2 text-center">
        <span className="text-xs font-bold text-white/80 uppercase">Calculated Root</span>
        <div className="text-3xl font-extrabold text-white mt-2">
          {isNaN(result) ? 'Complex (Imaginary)' : result}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 19. RANDOM NUMBER GENERATOR
// ==========================================
export function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [unique, setUnique] = useState(true);
  const [list, setList] = useState<number[]>([]);

  const generate = () => {
    if (min >= max) return;
    
    let temp: number[] = [];
    const poolSize = max - min + 1;
    const itemsCount = unique ? Math.min(count, poolSize) : count;

    if (unique) {
      const set = new Set<number>();
      while (set.size < itemsCount) {
        const rnd = Math.floor(Math.random() * poolSize) + min;
        set.add(rnd);
      }
      temp = Array.from(set);
    } else {
      for (let i = 0; i < itemsCount; i++) {
        const rnd = Math.floor(Math.random() * poolSize) + min;
        temp.push(rnd);
      }
    }

    setList(temp);
  };

  useEffect(() => {
    generate();
  }, [min, max, count, unique]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Min Value</label>
            <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Max Value</label>
            <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Count</label>
            <input type="number" min="1" max="1000" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" id="unique-chk" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="rounded border-gray-300 text-[#1a3c5e]" />
            <label htmlFor="unique-chk" className="font-semibold text-gray-700 dark:text-gray-300 select-none">Unique numbers only</label>
          </div>
        </div>
        <button onClick={generate} className="btn btn-primary w-full" style={{ height: '38px', fontSize: '0.8125rem' }}>
          Regenerate List
        </button>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center">
        <span className="text-xs font-bold text-white/80 uppercase mb-3 text-center">Randomized Sequence</span>
        <div className="flex flex-wrap gap-2 justify-center max-h-48 overflow-y-auto p-1">
          {list.map((n, idx) => (
            <span key={idx} className="font-mono font-bold text-base px-3 py-1 bg-white/10 border border-white/5 rounded shadow-sm text-white">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 20. NUMBER TO WORDS CONVERTER
// ==========================================
export function NumberToWordsConverter() {
  const [val, setVal] = useState(1250);
  const [words, setWords] = useState('');

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

  const convertChunk = (num: number): string => {
    let text = '';
    if (num >= 100) {
      text += ones[Math.floor(num / 100)] + ' hundred ';
      num %= 100;
    }
    if (num >= 20) {
      text += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }
    if (num > 0) {
      text += ones[num] + ' ';
    }
    return text.trim();
  };

  const convert = (num: number): string => {
    if (num === 0) return 'zero';
    let text = '';
    let scaleIndex = 0;
    let sign = num < 0 ? 'minus ' : '';
    let absNum = Math.abs(num);

    while (absNum > 0) {
      const chunk = absNum % 1000;
      if (chunk > 0) {
        const chunkText = convertChunk(chunk);
        text = chunkText + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + ' ' + text;
      }
      absNum = Math.floor(absNum / 1000);
      scaleIndex++;
    }

    return (sign + text).trim();
  };

  useEffect(() => {
    setWords(convert(val));
  }, [val]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Input Integer</label>
          <input 
            type="number" value={val} onChange={(e) => setVal(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-2">
        <span className="text-xs font-bold text-white/80 uppercase">Spelled-Out English Words</span>
        <p className="text-sm font-semibold capitalize text-white mt-1 leading-relaxed">
          {words}
        </p>
      </div>
    </div>
  );
}
