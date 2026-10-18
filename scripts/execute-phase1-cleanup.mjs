import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const TOOLS_MASTER_PATH = path.join(process.cwd(), 'data', 'tools-master.ts');

const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// Helper: Tool type action sentence strictly conforming to Phase 1 specs
function getActionSentence(tool) {
  const { category, slug } = tool;
  if (category === 'health') {
    return 'Enter your measurements to calculate the estimate.';
  }
  if (
    slug.includes('generator') ||
    slug === 'dice-roller'
  ) {
    return 'Choose your preferences and generate the result instantly.';
  }
  if (
    ['currency-converter', 'unit-converter', 'number-to-words-converter', 'word-to-pdf', 'color-picker'].includes(slug)
  ) {
    return 'Enter the value and select the units to convert.';
  }
  if (
    category === 'text' ||
    ['json-formatter', 'regex-tester', 'binary-converter', 'base64-converter', 'markdown-editor'].includes(slug)
  ) {
    return 'Paste or type your text to process it instantly.';
  }
  return 'Enter your values to calculate the result instantly.';
}

// Identify tools where privacy statement genuinely adds value (sensitive finance, passwords, hashes, private text)
function shouldIncludePrivacy(tool) {
  const { category, slug } = tool;
  if (category === 'text') return true;
  if (['tax-calculator', 'freelancer-tax-calculator', 'salary-calculator', 'net-worth-calculator'].includes(slug)) return true;
  if (['password-generator', 'password-strength-checker', 'hash-generator', 'base64-converter', 'json-formatter'].includes(slug)) return true;
  return false;
}

// Clean descriptions of templated / ungrammatical text
const DESCRIPTION_FIXES = {
  'word-counter': 'Count words, characters, sentences, and paragraphs in your text instantly. Free online word counter with reading time estimation.',
  'character-counter': 'Count characters with and without spaces, words, and line breaks in your text instantly. Free character limit counter.',
  'whitespace-remover': 'Clean formatting by removing extra spaces, trailing whitespace, and blank lines instantly. Free text cleaner.',
  'case-converter': 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more instantly. Free text case converter.',
  'text-reverser': 'Reverse entire text strings, word order, or letter sequences instantly. Free online text reverser.',
  'remove-duplicate-lines': 'Remove duplicate lines from text lists and sort unique entries instantly. Free list deduplicator.',
  'text-sorter': 'Sort lists of text alphabetically, numerically, by length, or in reverse order instantly. Free online text sorter.',
  'password-strength-checker': 'Test password strength and calculate entropy against brute-force attacks instantly. Free secure password tester.',
  'qr-code-generator': 'Generate custom, scannable QR codes from URLs or text instantly. Download PNG graphics locally with no account required.',
  'uuid-generator': 'Generate standard RFC 4122 Version-4 UUIDs in bulk instantly. Free developer UUID generator.',
  'markdown-editor': 'Write, edit, and preview Markdown with live HTML preview and export tools. Free client-side Markdown editor.'
};

let cleanedHowItWorksCount = 0;
let cleanedHowToUseCount = 0;
let cleanedDescriptionsCount = 0;

for (const tool of db.tools) {
  // 1. Clean seoHowItWorks: completely strip the repeated "Behind the scenes..." boilerplate
  if (tool.seoHowItWorks) {
    let text = tool.seoHowItWorks;
    if (text.includes('Specifically, ')) {
      let core = text.split('Specifically, ')[1].trim();
      // Capitalize first letter
      core = core.charAt(0).toUpperCase() + core.slice(1);
      // Ensure it starts with "The tool" or "The calculator" if it starts with "it"
      if (core.startsWith('It ')) {
        const noun = tool.category === 'health' || tool.slug.includes('calculator') ? 'The calculator' : 'The tool';
        core = `${noun} ${core.slice(3)}`;
      }
      tool.seoHowItWorks = core;
      cleanedHowItWorksCount++;
    } else if (text.startsWith('Behind the scenes, ')) {
      // If no "Specifically, ", strip up to standard math logic or first period
      text = text.replace(/^Behind the scenes,[^.]+\.\s*/i, '');
      tool.seoHowItWorks = text.trim();
      cleanedHowItWorksCount++;
    }
  }

  // 2. Clean seoHowToUse: ensure correct action sentence and remove filler
  if (tool.seoHowToUse) {
    let text = tool.seoHowToUse;
    
    // Remove any "Rest assured..." sentences
    text = text.replace(/Rest assured[^.]*\.\s*/gi, '');
    
    // Extract steps section
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const stepLines = lines.filter(l => /^\d+\.\s+/.test(l));
    
    if (stepLines.length > 0) {
      let header = `Follow these steps to use the ${tool.name}:`;
      const actionSentence = getActionSentence(tool);
      const privacyNote = shouldIncludePrivacy(tool)
        ? ' All processing runs locally in your browser—no data is stored or transmitted.'
        : '';
      
      tool.seoHowToUse = `${header}\n${stepLines.join('\n')}\n\n${actionSentence}${privacyNote}`;
      cleanedHowToUseCount++;
    }
  }

  // 3. Fix ungrammatical descriptions
  if (DESCRIPTION_FIXES[tool.slug]) {
    tool.seoDescription = DESCRIPTION_FIXES[tool.slug];
    cleanedDescriptionsCount++;
  } else if (tool.seoDescription && tool.seoDescription.includes('inputs numbers')) {
    tool.seoDescription = tool.seoDescription.replace(/inputs numbers\.?/g, 'values instantly.');
    cleanedDescriptionsCount++;
  }
}

// Write updated db.json
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');

// Write updated data/tools-master.ts
const tsContent = `export interface FAQItem {
  q: string;
  a: string;
}

export interface ToolMetadata {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  keywords: string;
  howToUse: string;
  formula: string;
  faqs: FAQItem[];
  relatedSlugs: string[];
  // SEO-ready fields
  seoTitle?: string;
  seoDescription?: string;
  seoHowToUse?: string;
  seoHowItWorks?: string;
  seoFaqs?: FAQItem[];
  seoExample?: string;
  quickAnswer?: string;
  mainUseCase?: string;
}

export const toolsMaster: ToolMetadata[] = ${JSON.stringify(db.tools, null, 2)};
`;

fs.writeFileSync(TOOLS_MASTER_PATH, tsContent, 'utf8');

console.log(`Phase 1 Cleanup Complete:
- Cleaned seoHowItWorks: ${cleanedHowItWorksCount} tools
- Cleaned seoHowToUse: ${cleanedHowToUseCount} tools
- Cleaned descriptions: ${cleanedDescriptionsCount} tools
Both data/db.json and data/tools-master.ts synchronized.`);
