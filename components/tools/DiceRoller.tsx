'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trash2, History, RotateCcw, HelpCircle, Info } from 'lucide-react';

type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100' | 'custom';

interface RollSession {
  notation: string;
  rolls: number[];
  modifier: number;
  total: number;
  timestamp: string;
}

export default function DiceRoller() {
  const [diceType, setDiceType] = useState<DiceType>('d6');
  const [customSides, setCustomSides] = useState('20');
  const [numDice, setNumDice] = useState(2);
  const [modifier, setModifier] = useState(0);
  
  const [isRolling, setIsRolling] = useState(false);
  const [currentRolls, setCurrentRolls] = useState<number[]>([3, 4]);
  const [resultSum, setResultSum] = useState<number | null>(null);
  
  const [history, setHistory] = useState<RollSession[]>([]);
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  // Helpers for SVG Shapes
  const getSidesCount = (): number => {
    if (diceType === 'custom') {
      const val = parseInt(customSides);
      return isNaN(val) || val < 2 ? 6 : val;
    }
    const mappings: Record<DiceType, number> = {
      d4: 4,
      d6: 6,
      d8: 8,
      d10: 10,
      d12: 12,
      d20: 20,
      d100: 100,
      custom: 6
    };
    return mappings[diceType];
  };

  // Rejection Sampling Cryptographically Secure RNG (Modulo Bias Guard)
  const getCryptoRandomInt = (min: number, max: number): number => {
    const range = max - min + 1;
    const maxValid = Math.floor(0x100000000 / range) * range;
    const array = new Uint32Array(1);
    do {
      window.crypto.getRandomValues(array);
    } while (array[0] >= maxValid);
    return min + (array[0] % range);
  };

  const rollDice = () => {
    if (isRolling) return;

    setErrorMsg(null);
    const sides = getSidesCount();

    // Input bounds validation
    if (numDice < 1 || numDice > 50) {
      setErrorMsg('Number of dice must be between 1 and 50.');
      return;
    }
    if (modifier < -100 || modifier > 100) {
      setErrorMsg('Modifier must be between -100 and 100.');
      return;
    }
    if (diceType === 'custom') {
      const val = parseInt(customSides);
      if (isNaN(val) || val < 2 || val > 1000) {
        setErrorMsg('Custom sides must be a number between 2 and 1000.');
        return;
      }
    }

    setIsRolling(true);
    setResultSum(null);

    let elapsed = 0;
    const intervalTime = 80; // cycle value every 80ms
    const totalDuration = 500; // roll for 500ms

    if (animationRef.current) clearInterval(animationRef.current);

    animationRef.current = setInterval(() => {
      // Cycle intermediate random numbers within valid range
      const intermediate = Array.from({ length: numDice }, () => getCryptoRandomInt(1, sides));
      setCurrentRolls(intermediate);
      elapsed += intervalTime;

      if (elapsed >= totalDuration) {
        if (animationRef.current) clearInterval(animationRef.current);
        
        // Settle on final cryptographic roll
        const finalRolls = Array.from({ length: numDice }, () => getCryptoRandomInt(1, sides));
        const sum = finalRolls.reduce((a, b) => a + b, 0);
        const total = sum + modifier;

        setCurrentRolls(finalRolls);
        setResultSum(total);
        setIsRolling(false);

        // Add to history (FIFO cap at 10 entries)
        const notation = `${numDice}${diceType === 'custom' ? 'd' + sides : diceType}${
          modifier > 0 ? ' + ' + modifier : modifier < 0 ? ' - ' + Math.abs(modifier) : ''
        }`;
        
        const session: RollSession = {
          notation,
          rolls: finalRolls,
          modifier,
          total,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };

        setHistory((prev) => [session, ...prev].slice(0, 10));
      }
    }, intervalTime);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // State validation errors
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Statistics calculation for the current roll (ignoring modifier)
  const currentRollMin = currentRolls.length > 0 ? Math.min(...currentRolls) : 0;
  const currentRollMax = currentRolls.length > 0 ? Math.max(...currentRolls) : 0;
  const currentRollSum = currentRolls.reduce((a, b) => a + b, 0);
  const currentRollAvg = currentRolls.length > 0 ? (currentRollSum / currentRolls.length).toFixed(2) : '0.00';

  // SVG Polyhedral Outline Renderers
  const renderDiceOutline = (type: DiceType, value: number) => {
    const strokeColor = 'stroke-blue-600 dark:stroke-blue-400';
    const fillColor = 'fill-blue-50/20 dark:fill-blue-950/20';

    if (type === 'd4') {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <polygon points="50,15 15,80 85,80" className={`${strokeColor} ${fillColor}`} strokeWidth="4" strokeLinejoin="round" />
          <text x="50" y="65" textAnchor="middle" className="fill-slate-900 dark:fill-white font-extrabold text-xl font-mono">
            {value}
          </text>
        </svg>
      );
    }
    if (type === 'd8') {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <polygon points="50,10 15,50 50,90 85,50" className={`${strokeColor} ${fillColor}`} strokeWidth="4" strokeLinejoin="round" />
          <line x1="15" y1="50" x2="85" y2="50" className={strokeColor} strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="90" className={strokeColor} strokeWidth="2" />
          <text x="50" y="55" textAnchor="middle" className="fill-slate-900 dark:fill-white font-extrabold text-xl font-mono">
            {value}
          </text>
        </svg>
      );
    }
    if (type === 'd10') {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <polygon points="50,10 85,35 50,90 15,35" className={`${strokeColor} ${fillColor}`} strokeWidth="4" strokeLinejoin="round" />
          <line x1="15" y1="35" x2="85" y2="35" className={strokeColor} strokeWidth="2" />
          <text x="50" y="52" textAnchor="middle" className="fill-slate-900 dark:fill-white font-extrabold text-xl font-mono">
            {value}
          </text>
        </svg>
      );
    }
    if (type === 'd12') {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <polygon points="50,10 85,25 85,65 50,90 15,65 15,25" className={`${strokeColor} ${fillColor}`} strokeWidth="4" strokeLinejoin="round" />
          <text x="50" y="56" textAnchor="middle" className="fill-slate-900 dark:fill-white font-extrabold text-xl font-mono">
            {value}
          </text>
        </svg>
      );
    }
    if (type === 'd20') {
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" className={`${strokeColor} ${fillColor}`} strokeWidth="4" strokeLinejoin="round" />
          <polygon points="50,32 78,50 50,75 22,50" className={`${strokeColor} fill-transparent`} strokeWidth="2" />
          <line x1="50" y1="10" x2="50" y2="32" className={strokeColor} strokeWidth="2" />
          <line x1="15" y1="30" x2="22" y2="50" className={strokeColor} strokeWidth="2" />
          <line x1="85" y1="30" x2="78" y2="50" className={strokeColor} strokeWidth="2" />
          <line x1="15" y1="70" x2="22" y2="50" className={strokeColor} strokeWidth="2" />
          <line x1="85" y1="70" x2="78" y2="50" className={strokeColor} strokeWidth="2" />
          <line x1="50" y1="90" x2="50" y2="75" className={strokeColor} strokeWidth="2" />
          <text x="50" y="56" textAnchor="middle" className="fill-slate-900 dark:fill-white font-extrabold text-lg font-mono">
            {value}
          </text>
        </svg>
      );
    }

    // Default Circle for D100 & Custom
    return (
      <div className="w-full h-full flex items-center justify-center rounded-full border-4 border-blue-600 dark:border-blue-400 bg-blue-50/20 dark:bg-blue-950/20 font-extrabold text-xl font-mono text-slate-800 dark:text-white">
        {value}
      </div>
    );
  };

  // Render traditional D6 dots
  const renderD6Dots = (val: number) => {
    const dotsMap: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    const activeDots = dotsMap[val] || [4];

    return (
      <div className="w-full h-full p-2 grid grid-cols-3 grid-rows-3 gap-1 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border-4 border-blue-600 dark:border-blue-400 shadow-md">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-center w-full h-full">
            {activeDots.includes(idx) && (
              <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-700 dark:bg-blue-400 shadow-sm" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Form Settings Box */}
        <div className="md:col-span-4 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800 space-y-4">
          
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Settings</h3>

          {/* Dice Selector Grid */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500">Select Dice Type</span>
            <div className="grid grid-cols-4 gap-2">
              {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100', 'custom'] as DiceType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-label={`Select ${type} die`}
                  onClick={() => setDiceType(type)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all uppercase ${
                    diceType === type
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : 'border-gray-200 dark:border-gray-800 text-slate-600 dark:text-slate-450 hover:bg-gray-100 dark:hover:bg-gray-850'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Sides Box */}
          {diceType === 'custom' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Number of Sides</label>
              <input
                type="number"
                min="2"
                max="1000"
                value={customSides}
                onChange={(e) => setCustomSides(e.target.value)}
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none"
              />
            </div>
          )}

          {/* Quantity Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <label htmlFor="num-dice-range">Number of Dice</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{numDice}</span>
            </div>
            <input
              id="num-dice-range"
              type="range"
              min="1"
              max="50"
              value={numDice}
              onChange={(e) => setNumDice(parseInt(e.target.value) || 1)}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Modifier Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Modifier (adds/subtracts to total)</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
              <button
                type="button"
                onClick={() => setModifier((m) => Math.max(-100, m - 1))}
                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 font-extrabold text-sm border-r border-gray-200 dark:border-gray-850"
              >
                -
              </button>
              <input
                type="number"
                value={modifier}
                onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                className="w-full text-center p-2 text-sm font-bold font-mono focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setModifier((m) => Math.min(100, m + 1))}
                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750 font-extrabold text-sm border-l border-gray-200 dark:border-gray-850"
              >
                +
              </button>
            </div>
          </div>

          {/* Roll Button */}
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-wait rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>{isRolling ? 'Rolling...' : 'Roll Dice'}</span>
          </button>
        </div>

        {/* Right Dice Render / Results Panel */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-6">
          
          {/* Main Dice View Container */}
          <div className="flex-1 bg-gray-50/30 dark:bg-gray-900/10 border border-gray-200/50 dark:border-gray-850 rounded-2xl p-6 flex flex-col justify-center min-h-[220px]">
            <div 
              aria-live="polite" 
              className="flex flex-wrap justify-center gap-4 max-h-[300px] overflow-y-auto p-2"
            >
              {currentRolls.map((roll, idx) => (
                <div
                  key={idx}
                  className={`h-16 w-16 flex-shrink-0 transition-transform ${
                    isRolling ? 'animate-bounce scale-110 rotate-[360deg]' : ''
                  }`}
                  style={{ animationDuration: '0.4s' }}
                >
                  {diceType === 'd6' ? renderD6Dots(roll) : renderDiceOutline(diceType, roll)}
                </div>
              ))}
            </div>

            {/* D100 Custom Tip */}
            {diceType === 'd100' && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 text-center block mt-3">
                Rolls a single value from 1 to 100, equivalent to percentile dice.
              </span>
            )}
          </div>

          {/* Calculation result cards */}
          {resultSum !== null && !isRolling && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Total Sum Card */}
              <div className="sm:col-span-2 bg-blue-50/30 dark:bg-blue-950/5 border border-blue-200/30 dark:border-blue-900/20 p-4 rounded-xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">Total Sum</span>
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {resultSum}
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  Formula: ({numDice}{diceType}) {modifier > 0 ? '+' : modifier < 0 ? '-' : ''} {modifier !== 0 ? Math.abs(modifier) : ''}
                </span>
              </div>

              {/* Min / Max Card */}
              <div className="bg-gray-50/50 dark:bg-gray-800/10 border border-gray-250 dark:border-gray-800 p-4 rounded-xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Min / Max Dice</span>
                <div className="text-xl font-extrabold font-mono text-slate-800 dark:text-slate-100 pt-1">
                  {currentRollMin} <span className="text-xs text-slate-400">to</span> {currentRollMax}
                </div>
              </div>

              {/* Mean Average Card */}
              <div className="bg-gray-50/50 dark:bg-gray-800/10 border border-gray-250 dark:border-gray-800 p-4 rounded-xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mean Average</span>
                <div className="text-xl font-extrabold font-mono text-slate-800 dark:text-slate-100 pt-1">
                  {currentRollAvg}
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-1.5">
              <Info className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>

      </div>

      {/* History Log Panel */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <History className="h-4 w-4" />
            <span>Roll History (Last 10)</span>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-slate-400 dark:text-slate-600 text-sm font-medium">
            No rolls yet — roll some dice to get started.
          </div>
        ) : (
          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
            {history.map((session, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50/55 dark:bg-gray-800/10 border border-gray-200/60 dark:border-gray-800/80 rounded-xl text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {session.notation}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      {session.timestamp}
                    </span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-mono font-medium">
                    Rolls: [{session.rolls.join(', ')}] {session.modifier > 0 ? '(+' + session.modifier + ')' : session.modifier < 0 ? '(-' + Math.abs(session.modifier) + ')' : ''}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Total</span>
                  <span className="text-lg font-extrabold font-mono text-blue-600 dark:text-blue-400">
                    {session.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
