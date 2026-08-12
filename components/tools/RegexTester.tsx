'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clipboard, Check, Trash2, HelpCircle, AlertCircle, FileText, Settings, Play } from 'lucide-react';

interface MatchInfo {
  index: number;
  value: string;
  groups: string[];
  groupNames: (string | null)[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('(\\d+)');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testString, setTestString] = useState('Hello World 1234, order 5678');
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [timeoutError, setTimeoutError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);

  // Parse flag object to flag string
  const getFlagString = () => {
    return (
      (flags.g ? 'g' : '') +
      (flags.i ? 'i' : '') +
      (flags.m ? 'm' : '') +
      (flags.s ? 's' : '')
    );
  };

  const executeRegex = () => {
    setErrorMsg(null);
    setTimeoutError(null);

    if (!pattern) {
      setMatches([]);
      return;
    }

    // Kill any existing worker
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    // Build Web Worker inline script blob to shield main thread from ReDoS
    const workerCode = `
      self.onmessage = function(e) {
        const { pattern, flags, text } = e.data;
        try {
          // Parse named capture groups from pattern source
          const names = [];
          const groupRegex = /\\(\\?<([^>]+)>/g;
          let matchNames;
          while ((matchNames = groupRegex.exec(pattern)) !== null) {
            names.push(matchNames[1]);
          }

          const regex = new RegExp(pattern, flags);
          const results = [];
          let match;
          
          if (flags.includes('g')) {
            while ((match = regex.exec(text)) !== null) {
              if (match.index === regex.lastIndex) {
                regex.lastIndex++;
              }
              const groups = match.slice(1);
              const groupNames = [];
              
              // Map capture groups
              for (let idx = 0; idx < groups.length; idx++) {
                // If there are named capture groups, map them
                if (match.groups && Object.keys(match.groups).length > 0) {
                  const name = Object.keys(match.groups).find(key => match.groups[key] === groups[idx]);
                  groupNames.push(name || null);
                } else {
                  groupNames.push(null);
                }
              }

              results.push({
                index: match.index,
                value: match[0],
                groups,
                groupNames
              });
            }
          } else {
            match = regex.exec(text);
            if (match) {
              const groups = match.slice(1);
              const groupNames = [];
              for (let idx = 0; idx < groups.length; idx++) {
                if (match.groups && Object.keys(match.groups).length > 0) {
                  const name = Object.keys(match.groups).find(key => match.groups[key] === groups[idx]);
                  groupNames.push(name || null);
                } else {
                  groupNames.push(null);
                }
              }
              results.push({
                index: match.index,
                value: match[0],
                groups,
                groupNames
              });
            }
          }

          self.postMessage({ status: 'success', matches: results });
        } catch (err) {
          self.postMessage({ status: 'error', message: err.message });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    // Set 2-second timeout to terminate ReDoS patterns
    const timer = setTimeout(() => {
      worker.terminate();
      setTimeoutError("Pattern timed out — this pattern may cause catastrophic backtracking. Simplify your regex.");
      setMatches([]);
    }, 2000);

    worker.onmessage = (e) => {
      clearTimeout(timer);
      const { status, matches: results, message } = e.data;
      if (status === 'success') {
        setMatches(results);
      } else {
        setErrorMsg(message);
        setMatches([]);
      }
      worker.terminate();
    };

    worker.postMessage({
      pattern,
      flags: getFlagString(),
      text: testString
    });
  };

  useEffect(() => {
    executeRegex();
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [pattern, flags.g, flags.i, flags.m, flags.s, testString]);

  // Highlight matches inside test string
  const renderHighlightedString = () => {
    if (matches.length === 0 || !testString) return testString;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Sort matches by index to render sequentially
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    sortedMatches.forEach((m, idx) => {
      // Unmatched segment
      if (m.index > lastIndex) {
        elements.push(testString.substring(lastIndex, m.index));
      }

      // Matched segment (highlighted)
      elements.push(
        <mark
          key={`match-${idx}`}
          className="bg-yellow-200 dark:bg-yellow-900/60 text-slate-900 dark:text-slate-100 rounded-sm px-0.5 border border-yellow-300 dark:border-yellow-800/40"
        >
          {m.value}
        </mark>
      );

      lastIndex = m.index + m.value.length;
    });

    // Remainder segment
    if (lastIndex < testString.length) {
      elements.push(testString.substring(lastIndex));
    }

    return elements;
  };

  const handleFlagToggle = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-7 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Regular Expression Parameters</h3>

          {/* Pattern Input */}
          <div className="space-y-1">
            <label htmlFor="regex-pattern" className="text-xs font-semibold text-slate-500">Pattern</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400 font-mono font-bold text-sm">/</span>
              <input
                id="regex-pattern"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className={`w-full pl-6 pr-12 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm font-mono font-bold focus:outline-none ${
                  errorMsg ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-gray-800'
                }`}
                placeholder="([a-zA-Z]+)"
              />
              <span className="absolute right-3 text-slate-400 font-mono font-bold text-sm">/{getFlagString()}</span>
            </div>
          </div>

          {/* Flags checkboxes */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 block">Expression Flags</span>
            <div className="flex flex-wrap gap-4 text-xs font-bold">
              
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags.g}
                  onChange={() => handleFlagToggle('g')}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Global (g)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags.i}
                  onChange={() => handleFlagToggle('i')}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Case-Insensitive (i)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags.m}
                  onChange={() => handleFlagToggle('m')}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Multiline (m)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags.s}
                  onChange={() => handleFlagToggle('s')}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>dotAll (s)</span>
              </label>

            </div>
          </div>

          {/* Test String Input */}
          <div className="space-y-1">
            <label htmlFor="regex-test-string" className="text-xs font-semibold text-slate-500">Test String</label>
            <textarea
              id="regex-test-string"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to match pattern against..."
              className="w-full h-44 p-3.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm font-semibold focus:outline-none resize-none"
            />
          </div>

        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Matches Preview Summary Card */}
          <div className="bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-md min-h-[140px]">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400">
              Pattern Match Status
            </span>
            <div aria-live="polite" className="text-4xl font-black font-mono text-white dark:text-blue-400">
              {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
            </div>
            
            {timeoutError && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-xs rounded-lg font-semibold flex items-center gap-1.5 mt-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{timeoutError}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-xs rounded-lg font-semibold flex items-center gap-1.5 mt-2 font-mono">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Highlighted Results Box */}
          <div className="space-y-1.5 flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Live Highlight Preview
            </span>
            <div
              className="flex-1 w-full p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-950/10 text-sm font-semibold font-mono overflow-auto whitespace-pre-wrap min-h-[180px]"
            >
              {renderHighlightedString()}
            </div>
          </div>

        </div>

      </div>

      {/* Capture Groups details Table */}
      {matches.length > 0 && (
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-450 block">
            Capture Group Details
          </span>
          <div className="overflow-x-auto border border-gray-200/50 dark:border-gray-850 rounded-2xl shadow-sm bg-white dark:bg-gray-900/20">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/40 border-b border-gray-200 dark:border-gray-850 text-slate-500 font-bold">
                  <th className="p-3.5">Match #</th>
                  <th className="p-3.5">Group #</th>
                  <th className="p-3.5">Group Name</th>
                  <th className="p-3.5">Matched Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 dark:divide-gray-850 font-mono font-medium">
                {matches.map((match, matchIdx) => (
                  <React.Fragment key={`match-row-${matchIdx}`}>
                    {/* Entire matched string */}
                    <tr className="hover:bg-slate-50/40 dark:hover:bg-gray-850/10 bg-slate-50/20 dark:bg-gray-900/10">
                      <td className="p-3 font-bold text-blue-600 dark:text-blue-450" rowSpan={match.groups.length + 1}>
                        Match {matchIdx + 1} (idx: {match.index})
                      </td>
                      <td className="p-3 text-slate-400 font-semibold">Group 0 (Full)</td>
                      <td className="p-3 text-slate-400">—</td>
                      <td className="p-3 text-slate-800 dark:text-slate-200 font-bold">{match.value}</td>
                    </tr>
                    {/* Capture groups */}
                    {match.groups.map((groupVal, grpIdx) => (
                      <tr key={`match-grp-${matchIdx}-${grpIdx}`} className="hover:bg-slate-50/40 dark:hover:bg-gray-850/10">
                        <td className="p-3 text-slate-400">Group {grpIdx + 1}</td>
                        <td className="p-3 font-semibold text-slate-600 dark:text-slate-350">
                          {match.groupNames[grpIdx] || '—'}
                        </td>
                        <td className="p-3 text-slate-800 dark:text-slate-200">{groupVal !== undefined ? groupVal : 'undefined'}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Regex Quick Cheat-Sheet */}
      <details className="group bg-gray-50/50 dark:bg-gray-800/15 border border-gray-250/50 dark:border-gray-800/80 rounded-2xl p-4 transition-all">
        <summary className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer list-none select-none">
          <span>Regex Quick Cheat-Sheet Reference</span>
          <span className="transition group-open:rotate-180">▼</span>
        </summary>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
          
          <div className="space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Character Classes</span>
            <ul className="space-y-1 font-mono text-slate-500 text-[11px]">
              <li><strong className="text-slate-700 dark:text-slate-350">.</strong> - Any character except newline</li>
              <li><strong className="text-slate-700 dark:text-slate-350">\d</strong> - Any digit (0-9)</li>
              <li><strong className="text-slate-700 dark:text-slate-350">\w</strong> - Word character (a-z, A-Z, 0-9, _)</li>
              <li><strong className="text-slate-700 dark:text-slate-350">\s</strong> - Whitespace character</li>
              <li><strong className="text-slate-700 dark:text-slate-350">[abc]</strong> - Any character in brackets</li>
              <li><strong className="text-slate-700 dark:text-slate-350">[^abc]</strong> - Any character NOT in brackets</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Quantifiers</span>
            <ul className="space-y-1 font-mono text-slate-500 text-[11px]">
              <li><strong className="text-slate-700 dark:text-slate-350">*</strong> - 0 or more times</li>
              <li><strong className="text-slate-700 dark:text-slate-350">+</strong> - 1 or more times</li>
              <li><strong className="text-slate-700 dark:text-slate-350">?</strong> - 0 or 1 time (optional)</li>
              <li><strong className="text-slate-700 dark:text-slate-350">{`{n}`}</strong> - Exactly n times</li>
              <li><strong className="text-slate-700 dark:text-slate-350">{`{n,}`}</strong> - n or more times</li>
              <li><strong className="text-slate-700 dark:text-slate-350">{`{n,m}`}</strong> - Between n and m times</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Anchors & Groups</span>
            <ul className="space-y-1 font-mono text-slate-500 text-[11px]">
              <li><strong className="text-slate-700 dark:text-slate-350">^</strong> - Start of string / line</li>
              <li><strong className="text-slate-700 dark:text-slate-350">$</strong> - End of string / line</li>
              <li><strong className="text-slate-700 dark:text-slate-350">\b</strong> - Word boundary</li>
              <li><strong className="text-slate-700 dark:text-slate-350">(abc)</strong> - Capture group</li>
              <li><strong className="text-slate-700 dark:text-slate-350">(?:abc)</strong> - Non-capturing group</li>
              <li><strong className="text-slate-700 dark:text-slate-350">(?&lt;name&gt;abc)</strong> - Named capture group</li>
            </ul>
          </div>

        </div>
      </details>

    </div>
  );
}
