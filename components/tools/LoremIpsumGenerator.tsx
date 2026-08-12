'use client';

import React, { useState, useEffect } from 'react';
import { Clipboard, Check, RefreshCw } from 'lucide-react';

const WORDS_CORPUS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod",
  "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim",
  "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate",
  "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt",
  "mollit", "anim", "id", "est", "laborum", "a", "ac", "aliquam", "aliquet", "auctor", "auctor",
  "congue", "curabitur", "cursus", "diam", "donec", "egestas", "elementum", "erat", "eros", "facilisis",
  "faucibus", "feugiat", "fringilla", "gravida", "habitant", "iaculis", "integer", "justo", "lectus",
  "libero", "lobortis", "lacinia", "maecenas", "mauris", "metus", "morbi", "nam", "nec", "nibh",
  "nisi", "nunc", "odio", "orci", "ornare", "pharetra", "porta", "porttitor", "potenti", "pretium",
  "quisque", "risus", "rutrum", "sapien", "scelerisque", "sem", "semper", "sodales", "sollicitudin",
  "tellus", "tincidunt", "tristique", "turpis", "ullamcorper", "urna", "valutpat", "varius", "vehicula",
  "vel", "vestibulum", "vitae", "vivamus", "viverra", "volutpat", "vulputate"
];

export default function LoremIpsumGenerator() {
  const [genType, setGenType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState('5');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const getRandomWord = () => WORDS_CORPUS[Math.floor(Math.random() * WORDS_CORPUS.length)];

  const makeSentence = () => {
    const wordCount = Math.floor(Math.random() * 8) + 8; // 8 to 15 words
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(getRandomWord());
    }
    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateLorem = () => {
    const num = Math.max(1, parseInt(count) || 1);
    let output = '';

    if (genType === 'paragraphs') {
      const paras: string[] = [];
      for (let p = 0; p < num; p++) {
        const sentenceCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 sentences
        const sentences: string[] = [];
        
        for (let s = 0; s < sentenceCount; s++) {
          sentences.push(makeSentence());
        }

        // Apply standard start phrase
        if (p === 0 && startWithLorem) {
          const standardStart = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
          sentences.unshift(standardStart);
        }

        paras.push(sentences.join(' '));
      }
      output = paras.join('\n\n');
    } else if (genType === 'sentences') {
      const sentences: string[] = [];
      for (let s = 0; s < num; s++) {
        sentences.push(makeSentence());
      }

      if (startWithLorem && sentences.length > 0) {
        sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      }

      output = sentences.join(' ');
    } else {
      // Words mode
      const words: string[] = [];
      if (startWithLorem) {
        words.push("Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit.");
      }

      const wordsToGen = startWithLorem ? Math.max(0, num - 8) : num;
      for (let w = 0; w < wordsToGen; w++) {
        words.push(getRandomWord());
      }
      output = words.join(' ');
    }

    setGeneratedText(output);
  };

  useEffect(() => {
    generateLorem();
  }, [genType, count, startWithLorem]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-slate-800 dark:text-slate-100">
      
      {/* Input Options Column (White Card) */}
      <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800/80 shadow-sm space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Generator Options</h3>

        {/* Generator Type Selector */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500">Generate type</label>
          <div className="flex bg-gray-100 dark:bg-gray-850 rounded-lg p-0.5 overflow-hidden">
            <button
              onClick={() => { setGenType('paragraphs'); setCount('5'); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                genType === 'paragraphs' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
              }`}
            >
              Paragraphs
            </button>
            <button
              onClick={() => { setGenType('sentences'); setCount('10'); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                genType === 'sentences' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
              }`}
            >
              Sentences
            </button>
            <button
              onClick={() => { setGenType('words'); setCount('100'); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                genType === 'words' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
              }`}
            >
              Words
            </button>
          </div>
        </div>

        {/* Quantity Count Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>Count</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">{count}</span>
          </div>
          <input
            type="range"
            min="1"
            max={genType === 'paragraphs' ? '50' : genType === 'sentences' ? '100' : '1000'}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Start with Lorem Checkbox */}
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          <span>Start with "Lorem ipsum dolor sit..."</span>
        </label>

        {/* Re-generate Button */}
        <button
          onClick={generateLorem}
          className="w-full py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-250 dark:border-gray-850 hover:bg-gray-100 text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4 text-slate-400" />
          <span>Regenerate Text</span>
        </button>

      </div>

      {/* Output Generated Text Column (Navy Card) */}
      <div className="lg:col-span-7 bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
        
        <div className="space-y-3 flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400">
              Generated Lorem Ipsum
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 py-1 px-3 bg-blue-650 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-sm transition cursor-pointer"
            >
              {isCopied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="w-full flex-1 min-h-[280px] max-h-[360px] p-4 bg-blue-900/15 dark:bg-blue-950/40 border border-blue-800/25 dark:border-blue-900/10 rounded-xl overflow-y-auto">
            <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium text-blue-100 select-text">
              {generatedText}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
