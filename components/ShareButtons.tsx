'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Link2, Send, Check } from 'lucide-react';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getTwitterLink = () => {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('Check out this awesome free utility tool!')}`;
  };

  const getWhatsAppLink = () => {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this tool: ' + currentUrl)}`;
  };

  return (
    <div className="flex flex-col gap-3 my-6 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
        <Share2 className="h-3.5 w-3.5" />
        <span>Share This Tool</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        
        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 shadow-sm cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* Twitter */}
        <a
          href={getTwitterLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-black text-white px-3.5 text-xs font-semibold hover:bg-gray-900 shadow-sm cursor-pointer transition-colors"
        >
          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Share on X</span>
        </a>

        {/* WhatsApp */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-green-600 text-white px-3.5 text-xs font-semibold hover:bg-green-700 shadow-sm cursor-pointer transition-colors"
        >
          <Send className="h-4 w-4" />
          <span>WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
