'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Check, Key, RefreshCw, Clipboard, Download, Upload, Copy } from 'lucide-react';
import QRCode from 'qrcode';

// ==========================================
// 41. PASSWORD GENERATOR
// ==========================================
export function PasswordGenerator() {
  const [length, setLength] = useState(14);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNums, setIncludeNums] = useState(true);
  const [includeSyms, setIncludeSyms] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charPool = '';
    if (includeUpper) charPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charPool += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNums) charPool += '0123456789';
    if (includeSyms) charPool += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charPool.length === 0) {
      setPassword('');
      return;
    }

    let pass = '';
    // Generate secure values using crypto API if available
    const isCrypto = typeof window !== 'undefined' && window.crypto;
    for (let i = 0; i < length; i++) {
      let rnd = 0;
      if (isCrypto) {
        const arr = new Uint32Array(1);
        window.crypto.getRandomValues(arr);
        rnd = arr[0] % charPool.length;
      } else {
        rnd = Math.floor(Math.random() * charPool.length);
      }
      pass += charPool.charAt(rnd);
    }
    setPassword(pass);
  };

  useEffect(() => {
    generate();
  }, [length, includeUpper, includeLower, includeNums, includeSyms]);

  const copy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Password Length: {length}</label>
          <input 
            type="range" min="6" max="32" value={length} onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded appearance-none cursor-pointer accent-[#f97316]"
          />
        </div>
        <div className="space-y-3 font-semibold text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="up-chk" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="rounded text-[#1a3c5e]" />
            <label htmlFor="up-chk" className="select-none">Include Uppercase Letters</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="lo-chk" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} className="rounded text-[#1a3c5e]" />
            <label htmlFor="lo-chk" className="select-none">Include Lowercase Letters</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="num-chk" checked={includeNums} onChange={(e) => setIncludeNums(e.target.checked)} className="rounded text-[#1a3c5e]" />
            <label htmlFor="num-chk" className="select-none">Include Numbers</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="sym-chk" checked={includeSyms} onChange={(e) => setIncludeSyms(e.target.checked)} className="rounded text-[#1a3c5e]" />
            <label htmlFor="sym-chk" className="select-none">Include Symbols</label>
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Generated Code</span>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-full font-mono text-base font-bold bg-slate-950/40 border border-white/10 rounded p-2.5 break-all text-white select-all min-h-11">
              {password || 'Select options'}
            </div>
            <button onClick={copy} className="flex h-10 w-10 items-center justify-center border border-white/10 rounded-lg hover:bg-white/10 bg-white/5 cursor-pointer transition-colors shrink-0">
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Clipboard className="h-4 w-4 text-white/70" />}
            </button>
          </div>
        </div>
        <button onClick={generate} className="btn btn-outline w-full gap-2 border-white/20 text-white hover:bg-white/10" style={{ height: '36px', fontSize: '0.8125rem' }}>
          <RefreshCw className="h-3.5 w-3.5" /> Regenerate
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 42. PASSWORD STRENGTH CHECKER
// ==========================================
export function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [entropy, setEntropy] = useState(0);
  const [strength, setStrength] = useState('Weak');

  const check = () => {
    if (password.length === 0) {
      setEntropy(0);
      setStrength('Weak');
      return;
    }

    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(password)) pool += 32;

    const ent = password.length * Math.log2(pool);
    setEntropy(Math.round(ent));

    let str = 'Weak';
    if (ent >= 80) str = 'Excellent';
    else if (ent >= 50) str = 'Strong';
    else if (ent >= 35) str = 'Medium';
    setStrength(str);
  };

  useEffect(() => {
    check();
  }, [password]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Input Password</label>
          <input 
            type="text" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
            placeholder="Type password to evaluate strength..."
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-3.5 text-center">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Entropy</span>
          <div className="text-2xl font-bold text-white mt-1">{entropy} bits</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Security Rating</span>
          <div className={`text-xl font-extrabold mt-1 ${
            strength === 'Excellent' ? 'text-green-300' :
            strength === 'Strong' ? 'text-blue-300' :
            strength === 'Medium' ? 'text-orange-300' : 'text-red-400'
          }`}>{strength}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 43. UNIT CONVERTER
// ==========================================
export function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight' | 'temp' | 'speed'>('length');
  const [val, setVal] = useState(1);
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');
  const [result, setResult] = useState(0);

  const units = {
    length: {
      m: { name: 'Meter', factor: 1.0 },
      cm: { name: 'Centimeter', factor: 0.01 },
      mm: { name: 'Millimeter', factor: 0.001 },
      km: { name: 'Kilometer', factor: 1000.0 },
      in: { name: 'Inch', factor: 0.0254 },
      ft: { name: 'Foot', factor: 0.3048 },
      yd: { name: 'Yard', factor: 0.9144 },
      mi: { name: 'Mile', factor: 1609.344 }
    },
    weight: {
      g: { name: 'Gram', factor: 1.0 },
      kg: { name: 'Kilogram', factor: 1000.0 },
      mg: { name: 'Milligram', factor: 0.001 },
      lb: { name: 'Pound', factor: 453.59237 },
      oz: { name: 'Ounce', factor: 28.349523 }
    },
    temp: {
      C: { name: 'Celsius', factor: 1 },
      F: { name: 'Fahrenheit', factor: 1 },
      K: { name: 'Kelvin', factor: 1 }
    },
    speed: {
      mps: { name: 'M/S', factor: 1.0 },
      kmh: { name: 'KM/H', factor: 0.277778 },
      mph: { name: 'MPH', factor: 0.44704 },
      knot: { name: 'Knot', factor: 0.514444 }
    }
  };

  const convert = () => {
    if (category === 'temp') {
      let celsius = val;
      if (fromUnit === 'F') celsius = (val - 32) * 5/9;
      if (fromUnit === 'K') celsius = val - 273.15;

      let convertedVal = celsius;
      if (toUnit === 'F') convertedVal = celsius * 9/5 + 32;
      if (toUnit === 'K') convertedVal = celsius + 273.15;
      setResult(Math.round(convertedVal * 1000) / 1000);
      return;
    }

    const catUnits = units[category];
    const fromFactor = (catUnits as any)[fromUnit].factor;
    const toFactor = (catUnits as any)[toUnit].factor;

    const baseValue = val * fromFactor;
    const finalVal = baseValue / toFactor;
    setResult(Math.round(finalVal * 10000) / 10000);
  };

  useEffect(() => {
    // Reset units on category change
    const availableKeys = Object.keys(units[category]);
    setFromUnit(availableKeys[0]);
    setToUnit(availableKeys[1]);
  }, [category]);

  useEffect(() => {
    convert();
  }, [val, fromUnit, toUnit, category]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm">
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temp">Temperature</option>
            <option value="speed">Speed</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Value</label>
            <input type="number" value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">From</label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs">
              {Object.entries(units[category]).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">To</label>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs">
              {Object.entries(units[category]).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Converted Value</span>
          <div className="text-3xl font-extrabold text-white mt-1">
            {result.toLocaleString()} {toUnit}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 44. COLOR PICKER & CONVERTER
// ==========================================
export function ColorPickerConverter() {
  const [hex, setHex] = useState('#1a3c5e');
  const [rgb, setRgb] = useState('rgb(26, 60, 94)');
  const [hsl, setHsl] = useState('hsl(210, 57%, 24%)');

  const hexToRgb = (hexStr: string) => {
    const cleanHex = hexStr.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleColorChange = (newHex: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(newHex)) return;
    setHex(newHex);
    const { r, g, b } = hexToRgb(newHex);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    const { h, s, l } = rgbToHsl(r, g, b);
    setHsl(`hsl(${h}, ${s}%, ${l}%)`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4 flex flex-col justify-center">
        <div className="flex items-center gap-4">
          <input 
            type="color" value={hex} onChange={(e) => handleColorChange(e.target.value)}
            className="h-16 w-16 border-2 border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer"
          />
          <div className="flex-grow">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">HEX Color</label>
            <input 
              type="text" value={hex} onChange={(e) => handleColorChange(e.target.value)}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 font-mono text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-5 rounded-xl flex flex-col justify-center gap-3">
        <div className="grid grid-cols-2 gap-3.5 font-mono text-xs text-white/95">
          <div>RGB representation:</div>
          <div className="text-right font-bold text-white">{rgb}</div>
          <div>HSL representation:</div>
          <div className="text-right font-bold text-white">{hsl}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 45. ASPECT RATIO CALCULATOR
// ==========================================
// ==========================================
// 45. ASPECT RATIO CALCULATOR
// ==========================================
export function AspectRatioCalculator() {
  const [activeTab, setActiveTab] = useState<'finder' | 'missing' | 'presets'>('finder');
  
  // Tab 1 state: Ratio Finder
  const [origW, setOrigW] = useState<string>('1920');
  const [origH, setOrigH] = useState<string>('1080');
  const [targW, setTargW] = useState<string>('');
  const [targH, setTargH] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  // Tab 2 state: Missing Dimension
  const [knownType, setKnownType] = useState<'width' | 'height'>('width');
  const [knownVal, setKnownVal] = useState<string>('1920');
  const [ratioW, setRatioW] = useState<string>('16');
  const [ratioH, setRatioH] = useState<string>('9');

  // Core Math Helper Functions
  const gcd = (a: number, b: number): number => {
    const x = Math.abs(Math.round(a));
    const y = Math.abs(Math.round(b));
    return y === 0 ? x : gcd(y, x % y);
  };

  const simplifyRatio = (w: number, h: number): string => {
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return '—';
    const roundedW = Math.round(w);
    const roundedH = Math.round(h);
    const divisor = gcd(roundedW, roundedH);
    if (divisor === 0) return '—';
    return `${roundedW / divisor}:${roundedH / divisor}`;
  };

  // Presets definition
  const presetsList = [
    { label: '16:9', rW: 16, rH: 9, origW: 1920, origH: 1080, name: 'HD Video, YouTube, TV' },
    { label: '4:3', rW: 4, rH: 3, origW: 1024, origH: 768, name: 'Standard Definition, iPad' },
    { label: '1:1', rW: 1, rH: 1, origW: 1080, origH: 1080, name: 'Instagram Square, Profile Photos' },
    { label: '9:16', rW: 9, rH: 16, origW: 1080, origH: 1920, name: 'Mobile Video, Reels, TikTok' },
    { label: '21:9', rW: 21, rH: 9, origW: 2560, origH: 1080, name: 'Ultrawide Monitor, Cinematic' },
    { label: '4:5', rW: 4, rH: 5, origW: 1080, origH: 1350, name: 'Instagram Portrait' },
    { label: '3:2', rW: 3, rH: 2, origW: 1200, origH: 800, name: 'DSLR Photos, MacBook Display' },
    { label: '2:1', rW: 2, rH: 1, origW: 1200, origH: 600, name: 'Panoramic, Twitter Header' },
  ];

  const applyPreset = (preset: typeof presetsList[0]) => {
    setSelectedPreset(preset.label);
    setOrigW(String(preset.origW));
    setOrigH(String(preset.origH));
    setRatioW(String(preset.rW));
    setRatioH(String(preset.rH));
  };

  // Tab 1 Calculations
  const oWNum = Number(origW);
  const oHNum = Number(origH);
  const tWNum = Number(targW);
  const tHNum = Number(targH);

  const isOrigValid = !isNaN(oWNum) && !isNaN(oHNum) && oWNum > 0 && oHNum > 0;
  const isTargFilled = targW.trim() !== '' && targH.trim() !== '';
  const isTargValid = isTargFilled && !isNaN(tWNum) && !isNaN(tHNum) && tWNum > 0 && tHNum > 0;

  const origRatioStr = isOrigValid ? simplifyRatio(oWNum, oHNum) : '—';
  const targRatioStr = isTargValid ? simplifyRatio(tWNum, tHNum) : '—';

  const isMatch = isOrigValid && isTargValid && origRatioStr === targRatioStr;
  const scaleFactor = isOrigValid && isTargValid ? (tWNum / oWNum) : null;
  const scaleFormatted = scaleFactor !== null ? `${scaleFactor.toFixed(2)}×` : null;

  let scaleLabel = '';
  if (scaleFactor !== null) {
    if (Math.abs(scaleFactor - 1) < 0.001) scaleLabel = 'Same size';
    else if (scaleFactor > 1) scaleLabel = 'Upscaling';
    else scaleLabel = 'Downscaling';
  }

  // Tab 2 Calculations
  const kValNum = Number(knownVal);
  const rWNum = Number(ratioW);
  const rHNum = Number(ratioH);

  const isMissingValid = !isNaN(kValNum) && !isNaN(rWNum) && !isNaN(rHNum) && kValNum > 0 && rWNum > 0 && rHNum > 0;

  let calculatedDim = 0;
  let formulaText = '';
  let fullDimText = '';
  let calculatedRatioStr = '';

  if (isMissingValid) {
    if (knownType === 'width') {
      calculatedDim = Math.round((kValNum * rHNum) / rWNum);
      formulaText = `${kValNum} × (${rHNum} ÷ ${rWNum}) = ${calculatedDim}`;
      fullDimText = `${kValNum} × ${calculatedDim} px`;
      calculatedRatioStr = simplifyRatio(kValNum, calculatedDim);
    } else {
      calculatedDim = Math.round((kValNum * rWNum) / rHNum);
      formulaText = `${kValNum} × (${rWNum} ÷ ${rHNum}) = ${calculatedDim}`;
      fullDimText = `${calculatedDim} × ${kValNum} px`;
      calculatedRatioStr = simplifyRatio(calculatedDim, kValNum);
    }
  }

  return (
    <div className="space-y-6 text-sm">
      {/* 3-Tab Navigation Bar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
        <button
          onClick={() => setActiveTab('finder')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'finder'
              ? 'bg-[#1a3c5e] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Ratio Finder & Scaler
        </button>
        <button
          onClick={() => setActiveTab('missing')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'missing'
              ? 'bg-[#1a3c5e] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Missing Dimension Solver
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'presets'
              ? 'bg-[#1a3c5e] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Preset Ratios Reference
        </button>
      </div>

      {/* TAB 1: RATIO FINDER */}
      {activeTab === 'finder' && (
        <div className="space-y-6">
          {/* Quick Preset Buttons Above Inputs */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Quick Preset Selection
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetsList.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    selectedPreset === p.label
                      ? 'bg-[#f97316] text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Columns */}
            <div className="space-y-4">
              {/* Original Dimensions */}
              <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-xl space-y-3 bg-white dark:bg-gray-900">
                <span className="font-bold text-gray-800 dark:text-gray-200 block text-xs uppercase tracking-wider">
                  Original Dimensions (Required)
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Width (px)</label>
                    <input
                      type="number"
                      value={origW}
                      onChange={(e) => { setOrigW(e.target.value); setSelectedPreset(''); }}
                      placeholder="e.g. 1920"
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Height (px)</label>
                    <input
                      type="number"
                      value={origH}
                      onChange={(e) => { setOrigH(e.target.value); setSelectedPreset(''); }}
                      placeholder="e.g. 1080"
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {((origW !== '' && Number(origW) <= 0) || (origH !== '' && Number(origH) <= 0)) && (
                  <p className="text-xs text-red-500 font-semibold mt-1">Dimensions must be greater than zero</p>
                )}
              </div>

              {/* Target Dimensions (Optional) */}
              <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-xl space-y-3 bg-white dark:bg-gray-900">
                <span className="font-bold text-gray-800 dark:text-gray-200 block text-xs uppercase tracking-wider">
                  Target Dimensions (Optional)
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Target Width (px)</label>
                    <input
                      type="number"
                      value={targW}
                      onChange={(e) => setTargW(e.target.value)}
                      placeholder="e.g. 1280"
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Target Height (px)</label>
                    <input
                      type="number"
                      value={targH}
                      onChange={(e) => setTargH(e.target.value)}
                      placeholder="e.g. 720"
                      className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {((targW !== '' && Number(targW) <= 0) || (targH !== '' && Number(targH) <= 0)) && (
                  <p className="text-xs text-red-500 font-semibold mt-1">Target dimensions must be greater than zero</p>
                )}
              </div>
            </div>

            {/* Results Panel */}
            <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
              {/* Card 1: Original Ratio */}
              <div>
                <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">Original Dimensions</span>
                <div className="text-4xl font-extrabold text-white mt-1">{origRatioStr}</div>
              </div>

              {/* Card 2: Target Ratio */}
              {isTargValid && (
                <>
                  <div className="h-px bg-white/10 my-1" />
                  <div>
                    <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">Target Dimensions</span>
                    <div className="text-2xl font-bold text-white/90 mt-1">{targRatioStr}</div>
                  </div>
                </>
              )}

              {/* Card 3 & 4: Proportionality & Scale Factor */}
              {isOrigValid && isTargValid && (
                <>
                  <div className="h-px bg-white/10 my-1" />
                  <div className="space-y-2">
                    <div
                      className={`p-3 rounded-lg border text-xs font-bold ${
                        isMatch
                          ? 'bg-green-500/20 border-green-400/40 text-green-300'
                          : 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                      }`}
                    >
                      {isMatch
                        ? `✅ Proportions match — both are ${origRatioStr}`
                        : `⚠️ Proportions differ — Original: ${origRatioStr}, Target: ${targRatioStr}`}
                    </div>

                    <div className="bg-white/10 border border-white/10 p-3 rounded-lg text-xs space-y-0.5">
                      <span className="text-white/70 block uppercase text-[10px] tracking-wider">Scale Factor</span>
                      <div className="text-lg font-bold text-[#f97316]">
                        Target is {scaleFormatted} the original size
                      </div>
                      <span className="text-white/80 block text-[10px] font-semibold">({scaleLabel})</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MISSING DIMENSION CALCULATOR */}
      {activeTab === 'missing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 border border-gray-200 dark:border-gray-800 p-5 rounded-xl bg-white dark:bg-gray-900">
            <span className="font-bold text-gray-800 dark:text-gray-200 block text-xs uppercase tracking-wider">
              Known Dimension & Target Ratio
            </span>

            {/* Toggle Width / Height */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Known Dimension Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setKnownType('width')}
                  className={`flex-1 py-2 rounded text-xs font-bold ${
                    knownType === 'width' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Known Width
                </button>
                <button
                  type="button"
                  onClick={() => setKnownType('height')}
                  className={`flex-1 py-2 rounded text-xs font-bold ${
                    knownType === 'height' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Known Height
                </button>
              </div>
            </div>

            {/* Known Dimension Value */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Known {knownType === 'width' ? 'Width' : 'Height'} (px)
              </label>
              <input
                type="number"
                value={knownVal}
                onChange={(e) => setKnownVal(e.target.value)}
                placeholder="e.g. 1920"
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-500"
              />
              {knownVal !== '' && Number(knownVal) <= 0 && (
                <p className="text-xs text-red-500 font-semibold mt-1">Known dimension must be greater than zero</p>
              )}
            </div>

            {/* Target Ratio Inputs */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Target Ratio (W : H)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={ratioW}
                  onChange={(e) => setRatioW(e.target.value)}
                  placeholder="16"
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm text-center focus:outline-none"
                />
                <span className="font-bold text-gray-400">:</span>
                <input
                  type="number"
                  value={ratioH}
                  onChange={(e) => setRatioH(e.target.value)}
                  placeholder="9"
                  className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm text-center focus:outline-none"
                />
              </div>
              {((ratioW !== '' && Number(ratioW) <= 0) || (ratioH !== '' && Number(ratioH) <= 0)) && (
                <p className="text-xs text-red-500 font-semibold mt-1">Ratio values must be greater than zero</p>
              )}
            </div>
          </div>

          {/* Tab 2 Results */}
          <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
            {isMissingValid ? (
              <>
                <div>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">
                    Calculated {knownType === 'width' ? 'Height' : 'Width'}
                  </span>
                  <div className="text-4xl font-extrabold text-[#f97316] mt-1">
                    {calculatedDim.toLocaleString()} <span className="text-lg font-bold text-white/80">px</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-1" />

                <div className="space-y-1 text-xs">
                  <div className="text-white/80 font-mono">Formula: {formulaText}</div>
                  <div className="text-white font-bold">Full Dimensions: {fullDimText}</div>
                  <div className="text-green-300 font-semibold">Simplified Ratio: {calculatedRatioStr}</div>
                </div>
              </>
            ) : (
              <div className="text-white/70 text-xs">Enter valid dimension and ratio numbers above to see calculated result.</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PRESET RATIOS REFERENCE */}
      {activeTab === 'presets' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Click any preset below to automatically load its resolution and ratio into the calculator tabs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {presetsList.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  applyPreset(preset);
                  setActiveTab('finder');
                }}
                className="text-left p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] hover:shadow-md transition-all group"
              >
                <div className="text-2xl font-extrabold text-[#1a3c5e] dark:text-blue-400 group-hover:text-[#f97316]">
                  {preset.label}
                </div>
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-1">
                  {preset.origW} × {preset.origH} px
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                  {preset.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// ==========================================
// 46. BINARY TO TEXT CONVERTER
// ==========================================
export function BinaryToTextConverter() {
  const [input, setInput] = useState('01001000 01100101 01101100 01101100 01101111');
  const [output, setOutput] = useState('');
  const [isBinaryToText, setIsBinaryToText] = useState(true);

  const convert = () => {
    try {
      if (isBinaryToText) {
        const cleaned = input.trim().split(/\s+/);
        const text = cleaned.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        setOutput(text);
      } else {
        const binary = input.split('').map(char => {
          const bin = char.charCodeAt(0).toString(2);
          return bin.padStart(8, '0');
        }).join(' ');
        setOutput(binary);
      }
    } catch {
      setOutput('Invalid input sequence.');
    }
  };

  useEffect(() => {
    convert();
  }, [input, isBinaryToText]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => { setIsBinaryToText(true); setInput('01001000 01100101 01101100 01101100 01101111'); }} className={`px-3 py-1 rounded text-xs font-bold ${isBinaryToText ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Binary to Text</button>
          <button onClick={() => { setIsBinaryToText(false); setInput('Hello'); }} className={`px-3 py-1 rounded text-xs font-bold ${!isBinaryToText ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Text to Binary</button>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input</label>
          <textarea rows={5} value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 font-mono text-sm focus:outline-none" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Result Output</label>
        <textarea rows={7} readOnly value={output} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-950 font-mono text-sm text-gray-800 dark:text-gray-200 focus:outline-none" />
      </div>
    </div>
  );
}

// ==========================================
// 47. BASE64 ENCODER / DECODER
// ==========================================
export function Base64EncoderDecoder() {
  const [input, setInput] = useState('Hello World');
  const [output, setOutput] = useState('');
  const [isEncode, setIsEncode] = useState(true);
  const [copied, setCopied] = useState(false);

  const translate = () => {
    try {
      if (isEncode) {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch {
      setOutput('Invalid Base64 sequence.');
    }
  };

  useEffect(() => {
    translate();
  }, [input, isEncode]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="flex gap-2 p-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg w-fit">
          <button 
            onClick={() => { setIsEncode(true); setInput('Hello World'); }} 
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${isEncode ? 'bg-[#1a3c5e] text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}
          >
            Base64 Encode
          </button>
          <button 
            onClick={() => { setIsEncode(false); setInput('SGVsbG8gV29ybGQ='); }} 
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${!isEncode ? 'bg-[#1a3c5e] text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}
          >
            Base64 Decode
          </button>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Input Text</label>
          <textarea 
            rows={5} 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all resize-none" 
            placeholder="Enter text to translate..."
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-between gap-4 relative overflow-hidden min-h-[220px]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        
        <div>
          <span className="text-[10px] uppercase tracking-widest opacity-85 font-semibold">Translated Output</span>
          <div className="mt-2 bg-slate-950/45 border border-white/10 rounded-xl p-3.5 font-mono text-xs text-white selection:bg-blue-500/30 overflow-y-auto h-28 break-all custom-scrollbar leading-relaxed">
            {output}
          </div>
        </div>

        <button 
          onClick={copyToClipboard}
          className={`w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 shadow-sm active:scale-95 border border-transparent ${
            copied
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-white/10 hover:bg-white/15 text-white cursor-pointer hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 animate-scale-in" />
              <span>Copied Output!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Output</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 48. WORD TO PDF (BASIC)
// ==========================================
export function WordToPDFConverter() {
  const [text, setText] = useState('HelloTools Document Export\n\nThis is a basic text document template compiled locally in your web browser. Feel free to edit this structure and trigger the Print command (Save as PDF) using the button below.');

  const triggerExport = () => {
    // Open a simple print window styled as a document sheet
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Exported PDF - HelloTools</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
            h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
            pre { white-space: pre-wrap; font-family: inherit; }
          </style>
        </head>
        <body>
          <pre>${text}</pre>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-5 text-sm">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Compose Rich Text Document</label>
        <textarea 
          rows={8} value={text} onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm focus:outline-none"
        />
      </div>
      <button 
        onClick={triggerExport}
        className="btn btn-primary gap-2" style={{ height: '40px', fontSize: '0.875rem' }}
      >
        <Download className="h-4 w-4" /> Export to PDF
      </button>
    </div>
  );
}

// ==========================================
// 49. QR CODE GENERATOR
// ==========================================
export function QRCodeGenerator() {
  const [text, setText] = useState('https://hellotools.net');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [fgColor, setFgColor] = useState('#1a3c5e');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copySuccess, setCopySuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawQRCode = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      await QRCode.toCanvas(canvas, text || ' ', {
        width: size,
        margin: margin,
        errorCorrectionLevel: errorCorrectionLevel,
        color: {
          dark: fgColor,
          light: bgColor
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    drawQRCode();
  }, [text, size, margin, errorCorrectionLevel, fgColor, bgColor]);

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    } catch (err) {
      console.error('Failed to copy image: ', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-sm">
      {/* Settings Column */}
      <div className="md:col-span-7 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 space-y-4">
        <div>
          <label htmlFor="qr-text" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            QR Code Text or URL
          </label>
          <textarea
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none h-20 resize-none font-semibold"
            placeholder="Type text or paste URL here..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Size */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <label htmlFor="qr-size">Size (px)</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{size}px</span>
            </div>
            <input
              id="qr-size"
              type="range"
              min="128"
              max="512"
              step="8"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value) || 256)}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Margin */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <label htmlFor="qr-margin">Margin (Quiet Zone)</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{margin} cells</span>
            </div>
            <input
              id="qr-margin"
              type="range"
              min="0"
              max="8"
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value) || 0)}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Error Correction */}
          <div className="space-y-1 sm:col-span-1">
            <label htmlFor="qr-ec" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Error Correction
            </label>
            <select
              id="qr-ec"
              value={errorCorrectionLevel}
              onChange={(e) => setErrorCorrectionLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="L">Low (7% recovery)</option>
              <option value="M">Medium (15% recovery)</option>
              <option value="Q">Quartile (25% recovery)</option>
              <option value="H">High (30% recovery)</option>
            </select>
          </div>

          {/* Fg Color */}
          <div className="space-y-1 sm:col-span-1">
            <label htmlFor="qr-fg" className="block text-xs font-semibold text-slate-500 mb-1.5">
              QR Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-8 border border-gray-200 dark:border-gray-800 rounded bg-transparent cursor-pointer p-0 animate-fade-in"
              />
              <input
                id="qr-fg"
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 font-mono font-semibold focus:outline-none"
              />
            </div>
          </div>

          {/* Bg Color */}
          <div className="space-y-1 sm:col-span-1">
            <label htmlFor="qr-bg" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-8 border border-gray-200 dark:border-gray-800 rounded bg-transparent cursor-pointer p-0"
              />
              <input
                id="qr-bg"
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 font-mono font-semibold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={downloadQR}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={copyToClipboard}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-slate-700 dark:text-slate-200 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/40 rounded-lg transition-all cursor-pointer"
          >
            <Copy className="h-4 w-4" />
            <span>{copySuccess ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
        </div>
      </div>

      {/* Preview Column */}
      <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#1a3c5e] text-white dark:bg-slate-900/40 border border-transparent dark:border-gray-800 p-6 rounded-2xl shadow-md min-h-[300px]">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-200 dark:text-blue-400 mb-4 block">
          QR Code Preview
        </span>
        <div className="bg-white p-3 rounded-lg shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="rounded bg-white max-w-full"
            style={{ width: '100%', maxWidth: '256px', height: 'auto' }}
          />
        </div>
        <span className="text-[10px] text-blue-300 dark:text-blue-400 text-center block mt-4 font-semibold">
          Point your phone camera to scan the code
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 50. UUID / RANDOM ID GENERATOR
// ==========================================
export function UUIDGenerator() {
  const [uuid, setUuid] = useState('');
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUUID = (): string => {
    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const num = Math.min(Math.max(1, count), 50);
    const temp: string[] = [];
    for (let i = 0; i < num; i++) {
      temp.push(generateUUID());
    }
    setUuid(temp[0]);
    setList(temp);
  };

  useEffect(() => {
    handleGenerate();
  }, [count]);

  const copyAll = () => {
    navigator.clipboard.writeText(list.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">Count to Generate</label>
          <input 
            type="number" min="1" max="50" value={count} onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm"
          />
        </div>
        <button onClick={handleGenerate} className="btn btn-primary" style={{ height: '38px', fontSize: '0.8125rem' }}>
          Regenerate IDs
        </button>
      </div>

      <div className="bg-[#1a3c5e] text-white p-5 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-white/80 uppercase">Generated UUID v4 List</span>
          <button onClick={copyAll} className="inline-flex h-8 items-center gap-1.5 border border-white/10 bg-white/5 px-3.5 text-xs font-bold rounded-lg hover:bg-white/10 cursor-pointer shadow-sm text-white">
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Clipboard className="h-3.5 w-3.5 text-white/70" />}
            <span>Copy All</span>
          </button>
        </div>
        <div className="font-mono text-xs bg-slate-950/40 border border-white/10 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2 select-all leading-relaxed text-white">
          {list.map((id, idx) => (
            <div key={idx} className="hover:text-blue-300 transition-colors">{id}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
