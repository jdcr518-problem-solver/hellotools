'use client';

import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

interface EmbedWidgetBoxProps {
  slug: string;
  name: string;
}

export default function EmbedWidgetBox({ slug, name }: EmbedWidgetBoxProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hellotools.net';
  const embedCode = `<iframe src="${baseUrl}/tools/${slug}?embed=true" width="100%" height="650" style="border:none; overflow:hidden;" allowtransparency="true"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#111c35] dark:to-[#0d1527] border border-gray-200 dark:border-blue-900/30 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-500/20 space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100/30 dark:border-blue-500/20">
          <Code className="h-4.5 w-4.5" />
        </div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-wide">
          Embed this Tool on Your Website
        </h2>
      </div>
      
      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        Copy this code snippet to add the {name} to your blog or website for free. It adjusts dynamically to mobile and desktop screens.
      </p>

      <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#070b14] p-3 rounded-xl border border-gray-150 dark:border-blue-950/50 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500/30 transition-all duration-300">
        <label htmlFor={`embed-code-${slug}`} className="sr-only">
          HTML embed code for {name}
        </label>
        <textarea
          id={`embed-code-${slug}`}
          aria-label={`HTML embed code for ${name}`}
          readOnly
          value={embedCode}
          className="flex-grow bg-transparent border-none text-[10px] font-mono text-gray-700 dark:text-gray-300 focus:outline-none resize-none h-14 leading-relaxed custom-scrollbar selection:bg-blue-500/25"
        />
        <button
          onClick={handleCopy}
          aria-label={`Copy embed code for ${name}`}
          className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 shadow-sm active:scale-95 ${
            copied
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-[#1a3c5e] hover:bg-[#204972] border border-transparent text-white dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 animate-scale-in" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
