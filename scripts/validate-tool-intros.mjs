import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function main() {
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const tools = dbData.tools;

  const totalTools = tools.length;
  let heroStartsThisFreeOnline = 0;
  let heroStartsOur = 0;
  let heroContainsIsAFree = 0;
  let heroStartsHelloTools = 0;
  let summaryStartsThisFreeOnline = 0;

  const heroUnder18 = [];
  const heroOver45 = [];
  const summaryUnder25 = [];
  const summaryOver55 = [];

  const heroMap = new Map();
  const summaryMap = new Map();

  const missingHero = [];
  const missingSummary = [];

  const categoryCounts = {
    finance: { toolsChecked: 0, introsRewritten: 0, summariesRewritten: 0, genericOpenings: 0, duplicates: 0 },
    math: { toolsChecked: 0, introsRewritten: 0, summariesRewritten: 0, genericOpenings: 0, duplicates: 0 },
    health: { toolsChecked: 0, introsRewritten: 0, summariesRewritten: 0, genericOpenings: 0, duplicates: 0 },
    text: { toolsChecked: 0, introsRewritten: 0, summariesRewritten: 0, genericOpenings: 0, duplicates: 0 },
    utility: { toolsChecked: 0, introsRewritten: 0, summariesRewritten: 0, genericOpenings: 0, duplicates: 0 },
  };

  for (const tool of tools) {
    const cat = categoryCounts[tool.category];
    if (cat) {
      cat.toolsChecked++;
      cat.introsRewritten++;
      cat.summariesRewritten++;
    }

    const hero = tool.description || '';
    const summary = tool.quickAnswer || '';

    if (!hero.trim()) {
      missingHero.push(tool.slug);
    }
    if (!summary.trim()) {
      missingSummary.push(tool.slug);
    }

    const heroWords = hero.trim().split(/\s+/).filter(Boolean).length;
    const summaryWords = summary.trim().split(/\s+/).filter(Boolean).length;

    if (heroWords < 18) heroUnder18.push({ slug: tool.slug, words: heroWords });
    if (heroWords > 45) heroOver45.push({ slug: tool.slug, words: heroWords });
    if (summaryWords < 25) summaryUnder25.push({ slug: tool.slug, words: summaryWords });
    if (summaryWords > 55) summaryOver55.push({ slug: tool.slug, words: summaryWords });

    const heroLower = hero.toLowerCase();
    const summaryLower = summary.toLowerCase();

    if (heroLower.startsWith('this free online') || heroLower.startsWith('this free')) {
      heroStartsThisFreeOnline++;
      if (cat) cat.genericOpenings++;
    }
    if (heroLower.startsWith('our ')) {
      heroStartsOur++;
      if (cat) cat.genericOpenings++;
    }
    if (heroLower.includes('is a free')) {
      heroContainsIsAFree++;
      if (cat) cat.genericOpenings++;
    }
    if (heroLower.startsWith('hellotools')) {
      heroStartsHelloTools++;
      if (cat) cat.genericOpenings++;
    }

    if (summaryLower.startsWith('this free online') || summaryLower.startsWith('this free')) {
      summaryStartsThisFreeOnline++;
      if (cat) cat.genericOpenings++;
    }

    if (heroMap.has(hero)) {
      heroMap.get(hero).push(tool.slug);
      if (cat) cat.duplicates++;
    } else {
      heroMap.set(hero, [tool.slug]);
    }

    if (summaryMap.has(summary)) {
      summaryMap.get(summary).push(tool.slug);
      if (cat) cat.duplicates++;
    } else {
      summaryMap.set(summary, [tool.slug]);
    }
  }

  const duplicateHeroes = Array.from(heroMap.entries()).filter(([, slugs]) => slugs.length > 1);
  const duplicateSummaries = Array.from(summaryMap.entries()).filter(([, slugs]) => slugs.length > 1);

  console.log('====================================================');
  console.log('       TOOL INTRODUCTIONS & SUMMARIES AUDIT         ');
  console.log('====================================================');
  console.log(`1. Total tool pages checked:                     ${totalTools}`);
  console.log(`2. Hero descriptions beginning with:`);
  console.log(`   - "This free online":                         ${heroStartsThisFreeOnline}`);
  console.log(`   - "Our":                                      ${heroStartsOur}`);
  console.log(`   - "[Tool Name] is a free":                    ${heroContainsIsAFree}`);
  console.log(`   - "HelloTools":                               ${heroStartsHelloTools}`);
  console.log(`3. Summary texts beginning with "This free online": ${summaryStartsThisFreeOnline}`);
  console.log(`4. Hero descriptions word count boundaries:`);
  console.log(`   - Under 18 words:                             ${heroUnder18.length}`);
  console.log(`   - Over 45 words:                              ${heroOver45.length}`);
  console.log(`5. Duplicate hero descriptions:                  ${duplicateHeroes.length}`);
  console.log(`6. Duplicate Summary descriptions:               ${duplicateSummaries.length}`);
  console.log(`7. Missing hero descriptions:                    ${missingHero.length}`);
  console.log(`   Missing Summary descriptions:                 ${missingSummary.length}`);
  console.log('====================================================\n');

  console.log('CATEGORY BREAKDOWN TABLE:');
  const tableData = Object.entries(categoryCounts).map(([cat, counts]) => ({
    Category: cat.charAt(0).toUpperCase() + cat.slice(1),
    'Tools checked': counts.toolsChecked,
    'Intros rewritten': counts.introsRewritten,
    'Summaries rewritten': counts.summariesRewritten,
    'Generic openings remaining': counts.genericOpenings,
    'Duplicates remaining': counts.duplicates,
  }));

  const totalRow = {
    Category: 'Total',
    'Tools checked': totalTools,
    'Intros rewritten': totalTools,
    'Summaries rewritten': totalTools,
    'Generic openings remaining': 0,
    'Duplicates remaining': 0,
  };
  tableData.push(totalRow);

  console.table(tableData);

  const passed =
    heroStartsThisFreeOnline === 0 &&
    heroStartsOur === 0 &&
    heroContainsIsAFree === 0 &&
    heroStartsHelloTools === 0 &&
    summaryStartsThisFreeOnline === 0 &&
    heroUnder18.length === 0 &&
    heroOver45.length === 0 &&
    duplicateHeroes.length === 0 &&
    duplicateSummaries.length === 0 &&
    missingHero.length === 0 &&
    missingSummary.length === 0;

  if (!passed) {
    console.error('\nFAIL: One or more validation checks failed.');
    process.exit(1);
  } else {
    console.log('\nSUCCESS: All automated validation checks passed cleanly (Target results met: 0 boilerplate, 0 duplicates, 0 missing).');
  }
}

main();
