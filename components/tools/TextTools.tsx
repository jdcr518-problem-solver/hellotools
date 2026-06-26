'use client';

import React, { useState, useEffect } from 'react';
import { Type, Sparkles, Trash2, ListOrdered, CheckCircle2 } from 'lucide-react';

// ==========================================
// 21. WORD COUNTER
// ==========================================
export function WordCounter() {
  const [text, setText] = useState('Type or paste your text here to analyze content stats.');
  const [stats, setStats] = useState({ words: 0, charsWithSpace: 0, charsNoSpace: 0, sentences: 0, paragraphs: 0, readingTime: 0 });

  useEffect(() => {
    const charsWithSpace = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    
    const words = text
      .trim()
      .split(/\s+/)
      .filter(x => x.length > 0).length;

    const sentences = text
      .split(/[.!?]+/)
      .filter(x => x.trim().length > 0).length;

    const paragraphs = text
      .split(/\n+/)
      .filter(x => x.trim().length > 0).length;

    // 225 words per minute average reading speed
    const readingTime = Math.ceil(words / 225);

    setStats({ words, charsWithSpace, charsNoSpace, sentences, paragraphs, readingTime });
  }, [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      <div className="md:col-span-2 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Input Text</label>
        <textarea 
          rows={8} value={text} onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a3c5e]"
        />
      </div>

      <div className="bg-[#1a3c5e] text-white p-5 rounded-xl flex flex-col justify-center gap-3">
        <h4 className="font-bold text-white/90 uppercase text-xs mb-1">Text Metrics</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
          <div>Words:</div>
          <div className="text-right font-mono font-bold text-white">{stats.words}</div>
          <div>Chars (with spaces):</div>
          <div className="text-right font-mono font-bold text-white">{stats.charsWithSpace}</div>
          <div>Chars (no spaces):</div>
          <div className="text-right font-mono font-bold text-white">{stats.charsNoSpace}</div>
          <div>Sentences:</div>
          <div className="text-right font-mono font-bold text-white">{stats.sentences}</div>
          <div>Paragraphs:</div>
          <div className="text-right font-mono font-bold text-white">{stats.paragraphs}</div>
        </div>
        <div className="h-px bg-white/10 my-1"></div>
        <div className="text-xs text-center">
          Est. Reading Time: <span className="font-bold text-[#f97316]">{stats.readingTime} min</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 22. CHARACTER COUNTER
// ==========================================
export function CharacterCounter() {
  const [text, setText] = useState('Quick letter limit count.');
  const [chars, setChars] = useState(0);
  const [noSpaces, setNoSpaces] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    setChars(text.length);
    setNoSpaces(text.replace(/\s/g, '').length);
    setLines(text.split('\n').length);
  }, [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      <div className="md:col-span-2 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Input Text</label>
        <textarea 
          rows={6} value={text} onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm focus:outline-none"
        />
      </div>

      <div className="bg-[#1a3c5e] text-white p-5 rounded-xl flex flex-col justify-center gap-4 text-center">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 border border-white/5 rounded-lg p-2 shadow-sm">
            <span className="text-2xl font-extrabold text-white block">{chars}</span>
            <span className="text-[10px] text-white/70 block uppercase">Chars</span>
          </div>
          <div className="bg-white/10 border border-white/5 rounded-lg p-2 shadow-sm">
            <span className="text-2xl font-extrabold text-white block">{noSpaces}</span>
            <span className="text-[10px] text-white/70 block uppercase">No Space</span>
          </div>
          <div className="bg-white/10 border border-white/5 rounded-lg p-2 shadow-sm">
            <span className="text-2xl font-extrabold text-white block">{lines}</span>
            <span className="text-[10px] text-white/70 block uppercase">Lines</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 23. CASE CONVERTER
// ==========================================
export function CaseConverter() {
  const [text, setText] = useState('sample case conversion text.');

  const toUpper = () => setText(prev => prev.toUpperCase());
  const toLower = () => setText(prev => prev.toLowerCase());
  
  const toTitle = () => {
    const converted = text
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    setText(converted);
  };

  const toSentence = () => {
    const converted = text
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, g1, g2) => g1 + g2.toUpperCase());
    setText(converted);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input Text</label>
        <textarea 
          rows={6} value={text} onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button onClick={toUpper} className="btn btn-outline" style={{ height: '36px', fontSize: '0.8125rem' }}>UPPERCASE</button>
        <button onClick={toLower} className="btn btn-outline" style={{ height: '36px', fontSize: '0.8125rem' }}>lowercase</button>
        <button onClick={toTitle} className="btn btn-outline" style={{ height: '36px', fontSize: '0.8125rem' }}>Title Case</button>
        <button onClick={toSentence} className="btn btn-outline" style={{ height: '36px', fontSize: '0.8125rem' }}>Sentence case</button>
      </div>
    </div>
  );
}

// ==========================================
// 24. TEXT REVERSER
// ==========================================
export function TextReverser() {
  const [text, setText] = useState('Reverse this string');
  const [mode, setMode] = useState('letters'); // 'letters', 'words', 'lines'
  const [result, setResult] = useState('');

  const reverse = () => {
    if (mode === 'letters') {
      setResult(text.split('').reverse().join(''));
    } else if (mode === 'words') {
      setResult(text.split(' ').reverse().join(' '));
    } else if (mode === 'lines') {
      setResult(text.split('\n').reverse().join('\n'));
    }
  };

  useEffect(() => {
    reverse();
  }, [text, mode]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input Text</label>
          <textarea 
            rows={5} value={text} onChange={(e) => setText(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Reverse Mode</label>
          <div className="flex gap-2">
            {['letters', 'words', 'lines'].map(m => (
              <button 
                key={m} onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-xs font-bold rounded capitalize ${mode === m ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Reversed Output</label>
        <textarea 
          rows={7} readOnly value={result}
          className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-950 font-mono text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
        />
      </div>
    </div>
  );
}

// ==========================================
// 25. REMOVE DUPLICATE LINES
// ==========================================
export function RemoveDuplicateLines() {
  const [input, setInput] = useState('Apple\nOrange\nApple\nBanana\nOrange');
  const [output, setOutput] = useState('');
  const [removedCount, setRemovedCount] = useState(0);

  const clean = () => {
    const lines = input.split('\n');
    const uniqueLines = Array.from(new Set(lines));
    setOutput(uniqueLines.join('\n'));
    setRemovedCount(lines.length - uniqueLines.length);
  };

  useEffect(() => {
    clean();
  }, [input]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Original List (one per line)</label>
        <textarea 
          rows={8} value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 font-mono text-sm focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Deduplicated List</label>
          <span className="text-[10px] text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded font-bold">
            Removed {removedCount} duplicate(s)
          </span>
        </div>
        <textarea 
          rows={8} readOnly value={output}
          className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-950 font-mono text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
        />
      </div>
    </div>
  );
}

// ==========================================
// 26. TEXT SORTER
// ==========================================
export function TextSorter() {
  const [input, setInput] = useState('Orange\nApple\nGrape\nBanana');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [sortBy, setSortBy] = useState('alpha'); // 'alpha', 'length'
  const [output, setOutput] = useState('');

  const sortLines = () => {
    const lines = input.split('\n').filter(l => l.trim().length > 0);
    
    lines.sort((a, b) => {
      if (sortBy === 'length') {
        return a.length - b.length;
      }
      return a.localeCompare(b);
    });

    if (sortOrder === 'desc') {
      lines.reverse();
    }

    setOutput(lines.join('\n'));
  };

  useEffect(() => {
    sortLines();
  }, [input, sortOrder, sortBy]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input List</label>
          <textarea 
            rows={6} value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 font-mono text-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-bold">
          <div>
            <label className="block text-[10px] text-gray-400 uppercase mb-1">Direction</label>
            <div className="flex gap-2">
              <button onClick={() => setSortOrder('asc')} className={`px-2 py-1 rounded ${sortOrder === 'asc' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>A-Z</button>
              <button onClick={() => setSortOrder('desc')} className={`px-2 py-1 rounded ${sortOrder === 'desc' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Z-A</button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 uppercase mb-1">Method</label>
            <div className="flex gap-2">
              <button onClick={() => setSortBy('alpha')} className={`px-2 py-1 rounded ${sortBy === 'alpha' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Alphabetical</button>
              <button onClick={() => setSortBy('length')} className={`px-2 py-1 rounded ${sortBy === 'length' ? 'bg-[#1a3c5e] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Line Length</button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Sorted Output</label>
        <textarea 
          rows={9} readOnly value={output}
          className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-950 font-mono text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
        />
      </div>
    </div>
  );
}

// ==========================================
// 27. WHITESPACE REMOVER
// ==========================================
export function WhitespaceRemover() {
  const [text, setText] = useState('  Clean    spaces   and\nempty   lines. \n\n ');
  const [result, setResult] = useState('');

  const clean = (type: 'trim' | 'double' | 'lines' | 'all') => {
    let cleaned = text;
    if (type === 'trim') {
      cleaned = text.split('\n').map(l => l.trim()).join('\n').trim();
    } else if (type === 'double') {
      cleaned = text.replace(/ {2,}/g, ' ');
    } else if (type === 'lines') {
      cleaned = text.split('\n').filter(l => l.trim().length > 0).join('\n');
    } else if (type === 'all') {
      cleaned = text.replace(/\s+/g, '');
    }
    setResult(cleaned);
  };

  useEffect(() => {
    clean('trim');
  }, [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input Text</label>
          <textarea 
            rows={6} value={text} onChange={(e) => setText(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => clean('trim')} className="btn btn-outline" style={{ height: '32px', padding: '0 12px', fontSize: '0.75rem' }}>Trim Edges</button>
          <button onClick={() => clean('double')} className="btn btn-outline" style={{ height: '32px', padding: '0 12px', fontSize: '0.75rem' }}>Fix Double Spaces</button>
          <button onClick={() => clean('lines')} className="btn btn-outline" style={{ height: '32px', padding: '0 12px', fontSize: '0.75rem' }}>Remove Empty Lines</button>
          <button onClick={() => clean('all')} className="btn btn-outline" style={{ height: '32px', padding: '0 12px', fontSize: '0.75rem' }}>Strip All Spaces</button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Cleaned Text</label>
        <textarea 
          rows={9} readOnly value={result}
          className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-950 text-sm text-gray-800 dark:text-gray-200 focus:outline-none"
        />
      </div>
    </div>
  );
}

// ==========================================
// 28. WORD FREQUENCY COUNTER
// ==========================================
export function WordFrequencyCounter() {
  const [text, setText] = useState('Word count, word frequency, frequency checks.');
  const [freqList, setFreqList] = useState<Array<{ word: string; count: number; density: number }>>([]);

  const analyze = () => {
    // Regex matches words (alphanumerics)
    const words = text
      .toLowerCase()
      .match(/\b[a-z0-9']+\b/g) || [];

    const totalWords = words.length;
    if (totalWords === 0) {
      setFreqList([]);
      return;
    }

    const counts: Record<string, number> = {};
    words.forEach(w => counts[w] = (counts[w] || 0) + 1);

    const sorted = Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        density: Math.round((count / totalWords) * 100 * 100) / 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    setFreqList(sorted);
  };

  useEffect(() => {
    analyze();
  }, [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      <div className="md:col-span-2 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Input Text</label>
        <textarea 
          rows={7} value={text} onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm focus:outline-none"
        />
      </div>

      <div className="border border-gray-250 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 max-h-[300px] overflow-y-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 border-b border-gray-200 dark:border-gray-800 font-semibold">
              <th className="p-2.5 text-left">Word</th>
              <th className="p-2.5 text-center">Count</th>
              <th className="p-2.5 text-right">Density</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150 dark:divide-gray-850">
            {freqList.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                <td className="p-2.5 font-semibold text-gray-700 dark:text-gray-300">{item.word}</td>
                <td className="p-2.5 text-center font-mono font-bold text-gray-900 dark:text-gray-100">{item.count}</td>
                <td className="p-2.5 text-right font-mono text-gray-500 dark:text-gray-400">{item.density}%</td>
              </tr>
            ))}
            {freqList.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-400">No words found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 29. PALINDROME CHECKER
// ==========================================
export function PalindromeChecker() {
  const [input, setInput] = useState('A man, a plan, a canal, Panama!');
  const [isPalindrome, setIsPalindrome] = useState(false);

  const check = () => {
    // Normalise: lower case, strip non-alphanumeric
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleaned.length === 0) {
      setIsPalindrome(false);
      return;
    }
    const reversed = cleaned.split('').reverse().join('');
    setIsPalindrome(cleaned === reversed);
  };

  useEffect(() => {
    check();
  }, [input]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Input Text</label>
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-gray-900 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#1a3c5e] text-white p-6 rounded-xl flex flex-col justify-center items-center gap-2">
        <span className="text-xs font-bold text-white/80 uppercase">Verification Result</span>
        <div className={`text-xl font-extrabold px-6 py-2 rounded-full border ${isPalindrome ? 'text-green-300 bg-green-950/30 border-green-500/20' : 'text-red-400 bg-red-950/30 border-red-500/20'}`}>
          {isPalindrome ? '✅ Valid Palindrome' : '❌ Not a Palindrome'}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 30. READABILITY SCORE CHECKER
// ==========================================
export function ReadabilityScoreChecker() {
  const [text, setText] = useState('Next.js is a flexible React framework that allows developers to ship search engine optimized, high-performance static websites. It provides pre-rendering, lazy loading, and route optimizations natively.');
  const [results, setResults] = useState<{ score: number; grade: string; ease: string } | null>(null);

  // Helper to count syllables in a word
  const countSyllables = (word: string): number => {
    let cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
    if (cleaned.length <= 3) return 1;
    cleaned = cleaned.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    cleaned = cleaned.replace(/^y/, '');
    const syllables = cleaned.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  const checkReadability = () => {
    const cleanText = text.trim();
    if (cleanText.length === 0) {
      setResults(null);
      return;
    }

    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
    const wordsList = cleanText.match(/\b[a-z0-9']+\b/gi) || [];
    const wordsCount = wordsList.length || 1;
    
    let totalSyllables = 0;
    wordsList.forEach(w => totalSyllables += countSyllables(w));

    // Flesch Reading Ease Formula
    const score = 206.835 - 1.015 * (wordsCount / sentences) - 84.6 * (totalSyllables / wordsCount);
    const finalScore = Math.max(0, Math.min(100, Math.round(score * 10) / 10));

    let ease = '';
    let grade = '';
    
    if (finalScore >= 90) {
      ease = 'Very Easy';
      grade = '5th Grade';
    } else if (finalScore >= 80) {
      ease = 'Easy';
      grade = '6th Grade';
    } else if (finalScore >= 70) {
      ease = 'Fairly Easy';
      grade = '7th Grade';
    } else if (finalScore >= 60) {
      ease = 'Standard / Plain English';
      grade = '8th - 9th Grade';
    } else if (finalScore >= 50) {
      ease = 'Fairly Difficult';
      grade = '10th - 12th Grade';
    } else if (finalScore >= 30) {
      ease = 'Difficult';
      grade = 'College Student';
    } else {
      ease = 'Very Confusing / Academic';
      grade = 'College Graduate';
    }

    setResults({ score: finalScore, grade, ease });
  };

  useEffect(() => {
    checkReadability();
  }, [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      <div className="md:col-span-2 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Input Text</label>
        <textarea 
          rows={6} value={text} onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm focus:outline-none"
        />
      </div>

      <div className="bg-[#1a3c5e] text-white p-5 rounded-xl flex flex-col justify-center gap-3.5">
        <h4 className="font-bold text-white/90 uppercase text-xs">Readability Summary</h4>
        {results ? (
          <div className="space-y-3 text-xs text-white/90">
            <div className="flex justify-between">
              <span>Flesch Score:</span>
              <span className="font-mono font-bold text-white">{results.score} / 100</span>
            </div>
            <div className="flex justify-between">
              <span>Ease:</span>
              <span className="font-bold text-[#f97316]">{results.ease}</span>
            </div>
            <div className="flex justify-between">
              <span>Education Grade:</span>
              <span className="font-bold text-blue-300">{results.grade}</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-white/65">Input writing to check reading level.</div>
        )}
      </div>
    </div>
  );
}
