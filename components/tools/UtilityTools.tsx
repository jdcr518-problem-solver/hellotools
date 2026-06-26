'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Check, Key, RefreshCw, Clipboard, Download, Upload } from 'lucide-react';

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
export function AspectRatioCalculator() {
  const [ow, setOw] = useState(1920);
  const [oh, setOh] = useState(1080);
  const [tw, setTw] = useState(1280);
  const [th, setTh] = useState(720);

  // Greatest Common Divisor
  const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);

  const calculateHeight = (newWidth: number) => {
    setTw(newWidth);
    if (ow === 0) return;
    setTh(Math.round((oh / ow) * newWidth));
  };

  const calculateWidth = (newHeight: number) => {
    setTh(newHeight);
    if (oh === 0) return;
    setTw(Math.round((ow / oh) * newHeight));
  };

  const divisor = gcd(ow, oh);
  const ratioX = divisor !== 0 ? ow / divisor : 0;
  const ratioY = divisor !== 0 ? oh / divisor : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-xl space-y-3">
          <span className="font-bold text-gray-700 dark:text-gray-300">Original Dimensions</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Width (px)</label>
              <input type="number" value={ow} onChange={(e) => setOw(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Height (px)</label>
              <input type="number" value={oh} onChange={(e) => setOh(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
            </div>
          </div>
        </div>

        <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-xl space-y-3">
          <span className="font-bold text-gray-700 dark:text-gray-300">Target Dimensions</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Width (px)</label>
              <input type="number" value={tw} onChange={(e) => calculateHeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block uppercase mb-1">Height (px)</label>
              <input type="number" value={th} onChange={(e) => calculateWidth(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase">Proportional Ratio</span>
          <div className="text-3xl font-extrabold text-white mt-1">{ratioX}:{ratioY}</div>
        </div>
      </div>
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => { setIsEncode(true); setInput('Hello World'); }} className={`px-3 py-1 rounded text-xs font-bold ${isEncode ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Base64 Encode</button>
          <button onClick={() => { setIsEncode(false); setInput('SGVsbG8gV29ybGQ='); }} className={`px-3 py-1 rounded text-xs font-bold ${!isEncode ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Base64 Decode</button>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input Text</label>
          <textarea rows={5} value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Translated Output</label>
        <textarea rows={7} readOnly value={output} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-950 font-mono text-sm text-gray-800 dark:text-gray-200 focus:outline-none" />
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
  const [url, setUrl] = useState('https://yoursite.com');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render a mock styled QR code canvas that incorporates finder markers and data pixels based on input hash
  const drawQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);

    // Grid details
    const gridSize = 21; // 21x21 grid
    const cellSize = 10;
    const padding = 23;

    // Helper to draw a square marker (Finder Pattern)
    const drawMarker = (x: number, y: number) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(padding + x * cellSize, padding + y * cellSize, 7 * cellSize, 7 * cellSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(padding + (x + 1) * cellSize, padding + (y + 1) * cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fillStyle = '#000000';
      ctx.fillRect(padding + (x + 2) * cellSize, padding + (y + 2) * cellSize, 3 * cellSize, 3 * cellSize);
    };

    // Draw three main finder patterns
    drawMarker(0, 0); // Top-left
    drawMarker(14, 0); // Top-right
    drawMarker(0, 14); // Bottom-left

    // Simple hash function to generate deterministic data cells based on URL
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = (hash << 5) - hash + url.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    // Populate data cells
    ctx.fillStyle = '#000000';
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Skip finder pattern areas
        const isFinder = (row < 8 && col < 8) || (row < 8 && col > 12) || (row > 12 && col < 8);
        if (isFinder) continue;

        // Deterministic pseudo-randomness based on coordinate and hash
        const cellSeed = Math.abs(Math.sin(row * 12.9898 + col * 78.233 + hash) * 43758.5453) % 1;
        if (cellSeed > 0.5) {
          ctx.fillRect(padding + col * cellSize, padding + row * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  useEffect(() => {
    drawQRCode();
  }, [url]);

  const downloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">QR Code Target URL or Text</label>
          <input 
            type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
            placeholder="https://..."
          />
        </div>
        <button onClick={downloadQR} className="btn btn-outline gap-2" style={{ height: '36px', fontSize: '0.8125rem' }}>
          <Download className="h-4 w-4" /> Download QR Image
        </button>
      </div>

      <div className="flex flex-col items-center justify-center bg-[#1a3c5e] p-6 rounded-xl">
        <canvas 
          ref={canvasRef} width={256} height={256}
          className="border border-white/10 bg-white rounded-lg shadow-sm"
        />
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
