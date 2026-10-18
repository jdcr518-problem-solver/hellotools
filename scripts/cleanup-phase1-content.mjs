import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const TOOLS_MASTER_PATH = path.join(__dirname, '..', 'data', 'tools-master.ts');

function classifyTool(tool) {
  if (tool.category === 'health') return 'health';
  const slug = tool.slug;
  if (slug.includes('generator') || slug === 'dice-roller') return 'generator';
  if (['currency-converter', 'unit-converter', 'number-to-words-converter', 'word-to-pdf', 'color-picker'].includes(slug)) return 'converter';
  if (tool.category === 'text' || ['json-formatter', 'regex-tester', 'binary-converter', 'base64-converter', 'case-converter'].includes(slug)) return 'text';
  return 'calculator';
}

function getActionSentence(type) {
  switch (type) {
    case 'calculator': return 'Enter your values to calculate the result instantly.';
    case 'text': return 'Paste or type your text to process it instantly.';
    case 'converter': return 'Enter the value and select the units to convert.';
    case 'generator': return 'Choose your preferences and generate the result instantly.';
    case 'health': return 'Enter your measurements to calculate the estimate.';
  }
}

function cleanHowToUse(tool) {
  const type = classifyTool(tool);
  const action = getActionSentence(type);
  const privacyStatement = 'All calculations run locally in your browser—your data remains private and is never stored or transmitted.';
  const textPrivacyStatement = 'All text processing runs locally in your browser—your text remains private and is never stored or transmitted.';
  const privacy = type === 'text' ? textPrivacyStatement : privacyStatement;

  if (tool.slug === 'grade-calculator') {
    const cleaned = tool.seoHowToUse
      .replace('The Grade Calculator is a free, premium web utility designed to simplify your calculation tasks. ', '')
      .trim();
    return `${cleaned}\n\n${action} ${privacy}`;
  }

  if (tool.seoHowToUse && tool.seoHowToUse.includes('detailed, step-by-step instructions: ')) {
    const startMarker = 'detailed, step-by-step instructions: ';
    const endMarker = 'Rest assured';
    const startIdx = tool.seoHowToUse.indexOf(startMarker) + startMarker.length;
    const endIdx = tool.seoHowToUse.indexOf(endMarker);

    if (startIdx !== -1 && endIdx !== -1) {
      const rawSteps = tool.seoHowToUse.slice(startIdx, endIdx).trim();
      // Split into clean lines for steps 1, 2, 3, 4
      const formattedSteps = rawSteps.replace(/(\d+\.)\s*/g, '\n$1 ').trim();
      return `Follow these steps to use the ${tool.name}:\n${formattedSteps}\n\n${action} ${privacy}`;
    }
  }

  // For existing clean tools without boilerplate, keep them clean and make sure they don't have ungrammatical 'numbers' filler
  let text = tool.seoHowToUse || '';
  text = text.replace(/Simply open the page and input your .*? numbers to get immediate answers\./g, action);
  return text;
}

function cleanHowItWorks(tool) {
  if (!tool.seoHowItWorks) return '';
  let text = tool.seoHowItWorks;

  const boilerplateMarker = 'Because the processing happens locally on your device rather than on a remote cloud server, latency is reduced to zero milliseconds.';
  if (text.includes(boilerplateMarker)) {
    const idx = text.indexOf(boilerplateMarker);
    text = text.slice(0, idx).trim();
  }

  return text;
}

function main() {
  console.log('Reading db.json and tools-master.ts...');
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

  let howToUseCleaned = 0;
  let howItWorksCleaned = 0;

  const updatedTools = dbData.tools.map((tool) => {
    const oldHowToUse = tool.seoHowToUse || '';
    const oldHowItWorks = tool.seoHowItWorks || '';

    const newHowToUse = cleanHowToUse(tool);
    const newHowItWorks = cleanHowItWorks(tool);

    if (oldHowToUse !== newHowToUse) howToUseCleaned++;
    if (oldHowItWorks !== newHowItWorks) howItWorksCleaned++;

    return {
      ...tool,
      seoHowToUse: newHowToUse,
      seoHowItWorks: newHowItWorks,
    };
  });

  dbData.tools = updatedTools;

  fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), 'utf-8');
  console.log(`Updated db.json: ${howToUseCleaned} seoHowToUse cleaned, ${howItWorksCleaned} seoHowItWorks cleaned.`);

  // Update tools-master.ts
  const tsContent = `export interface FAQItem {
  q: string;
  a: string;
}

/**
 * Internationalization scope for a tool.
 * Controls whether a tool appears on non-English locale pages.
 * See data/tool-scopes.ts for the slug-to-scope mapping and full documentation.
 *
 *  'universal'       — Safe to translate and show in all locales
 *  'us-only'         — US-jurisdiction-specific; exclude from non-English locales
 *  'us-primary'      — US data but universal concept; show with a disclaimer
 *  'localized'       — Requires locale-specific implementation (not just translation)
 */
export type ToolScope = 'universal' | 'us-only' | 'us-primary' | 'localized';

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
  // New SEO-ready fields
  seoTitle?: string;
  seoDescription?: string;
  seoHowToUse?: string;
  seoHowItWorks?: string;
  seoFaqs?: FAQItem[];
  seoExample?: string;
  quickAnswer?: string;
  mainUseCase?: string;
  schema?: any;
  /**
   * i18n scope classification (optional — defaults to 'universal' if omitted).
   * Use data/tool-scopes.ts to override without modifying this file.
   * See ToolScope type above for scope definitions.
   */
  scope?: ToolScope;
  [key: string]: any;
}

export const toolsMaster: ToolMetadata[] = ${JSON.stringify(updatedTools, null, 2)};
`;

  fs.writeFileSync(TOOLS_MASTER_PATH, tsContent, 'utf-8');
  console.log('Updated tools-master.ts successfully.');
}

main();
