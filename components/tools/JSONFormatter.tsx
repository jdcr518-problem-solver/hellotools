'use client';

import React, { useState } from 'react';
import { Clipboard, Check, Trash2, FileCode, AlertCircle, Sparkles } from 'lucide-react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState('2');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleClear = () => {
    setInput('');
    setOutput('');
    setValidationError(null);
    setWarningMsg(null);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const processJSON = (action: 'format' | 'minify') => {
    setValidationError(null);
    setWarningMsg(null);

    const rawInput = input.trim();
    if (!rawInput) {
      setOutput('');
      return;
    }

    // Size checks
    const sizeInBytes = new Blob([rawInput]).size;
    if (sizeInBytes > 5 * 1024 * 1024) {
      setValidationError('File too large. Maximum supported size is 5MB.');
      setOutput('');
      return;
    } else if (sizeInBytes > 1 * 1024 * 1024) {
      setWarningMsg('Large JSON detected — formatting may be slow.');
    }

    try {
      const parsed = JSON.parse(rawInput);
      if (action === 'minify') {
        setOutput(JSON.stringify(parsed));
      } else {
        const space = indent === 'tab' ? '\t' : parseInt(indent) || 2;
        setOutput(JSON.stringify(parsed, null, space));
      }
    } catch (err: any) {
      setValidationError(err.message || 'Invalid JSON format');
      setOutput('');
    }
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column (Input Pane - White/Gray theme) */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="json-input" className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Input Raw JSON
            </label>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 dark:border-gray-800 dark:text-slate-355 dark:hover:bg-gray-800/40 transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>

          <textarea
            id="json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...&#10;e.g., {"name":"John", "skills":["React", "Node"]}'
            className="w-full h-[400px] p-4 border border-gray-250 dark:border-gray-800 rounded-xl bg-gray-50/30 dark:bg-gray-950/20 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
        </div>

        {/* Right Column (Output Pane - Navy Blue theme) */}
        <div className="bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 shadow-md space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <label htmlFor="json-output" className="text-xs font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400">
              Formatted Output
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white hover:bg-gray-100 text-[#1a3c5e] shadow-sm transition-all cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>

          <textarea
            id="json-output"
            readOnly
            value={output}
            placeholder="Output will appear here..."
            className="w-full flex-1 min-h-[400px] p-4 border border-blue-800/40 dark:border-blue-900/30 rounded-xl bg-blue-900/30 dark:bg-blue-950/40 text-white placeholder-blue-300/40 text-sm font-mono focus:outline-none resize-none"
          />
        </div>

      </div>

      {/* Control Actions Panel */}
      <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="indent-style" className="text-xs font-bold text-slate-500">
            Tab Size:
          </label>
          <select
            id="indent-style"
            value={indent}
            onChange={(e) => setIndent(e.target.value)}
            className="p-2 rounded-lg border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tabs</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => processJSON('format')}
            className="flex items-center gap-1.5 py-2.5 px-6 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <FileCode className="h-4 w-4" />
            <span>Beautify</span>
          </button>
          
          <button
            onClick={() => processJSON('minify')}
            className="flex items-center gap-1.5 py-2.5 px-6 text-xs font-bold text-slate-700 border border-gray-250 bg-white hover:bg-gray-50 dark:text-slate-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Minify</span>
          </button>
        </div>
      </div>

      {/* Validation Message Banners */}
      <div aria-live="polite">
        {validationError && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/15 border border-red-200/50 dark:border-red-900/30 text-red-700 dark:text-red-400 text-sm flex items-start gap-2 font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {warningMsg && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/15 border border-amber-200/50 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 text-sm flex items-start gap-2 font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{warningMsg}</span>
          </div>
        )}

        {!validationError && output && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/10 border border-green-200/30 dark:border-green-900/20 text-green-700 dark:text-green-400 text-sm flex items-center gap-2 font-semibold">
            <Check className="h-4 w-4 shrink-0" />
            <span>JSON is valid and formatted successfully.</span>
          </div>
        )}
      </div>

    </div>
  );
}
