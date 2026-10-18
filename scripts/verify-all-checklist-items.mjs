import fs from 'fs';

const baseUrl = 'http://localhost:3000';

async function checkItem4() {
  console.log('\n======================================================');
  console.log('CHECKLIST ITEM 4: Main Tool Indexability');
  console.log('======================================================');
  const slugs = ['emi-calculator', 'mortgage-calculator', 'word-counter', 'age-calculator', 'calorie-calculator'];
  let pass = true;
  for (const slug of slugs) {
    const res = await fetch(`${baseUrl}/tools/${slug}`);
    const text = await res.text();
    const xRobots = res.headers.get('x-robots-tag');
    const robotsTags = text.match(/<meta[^>]+name=["']robots["'][^>]*>/gi) || [];
    const hasNoindex = robotsTags.some(t => t.includes('noindex')) || (xRobots && xRobots.includes('noindex'));
    const isIndexFollow = robotsTags.some(t => t.includes('index, follow') || t.includes('index,follow'));
    console.log(`URL: ${baseUrl}/tools/${slug}`);
    console.log(`  - Status: ${res.status}`);
    console.log(`  - Robots tags in HTML:`, robotsTags);
    console.log(`  - X-Robots-Tag header:`, xRobots);
    console.log(`  - Has NOINDEX leaked?`, hasNoindex ? 'YES (FAIL)' : 'NO (CLEAN)');
    console.log(`  - Is index, follow?`, isIndexFollow ? 'YES' : 'NO');
    if (hasNoindex || !isIndexFollow) pass = false;
  }
  console.log('RESULT FOR ITEM 4:', pass ? 'PASS' : 'FAIL');
}

async function checkItem1() {
  console.log('\n======================================================');
  console.log('CHECKLIST ITEM 1: Template Hygiene');
  console.log('======================================================');
  const slugs = ['mortgage-calculator', 'age-calculator', 'word-counter', 'bmi-calculator', 'percentage-calculator'];
  const db = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
  let pass = true;

  for (const slug of slugs) {
    const res = await fetch(`${baseUrl}/tools/${slug}`);
    const text = await res.text();
    const tool = db.tools.find(t => t.slug === slug);
    
    // Check 3 repeated boilerplate paragraphs
    const hasBehindTheScenes = text.includes('Behind the scenes, this') || (tool.seoHowItWorks && tool.seoHowItWorks.includes('Behind the scenes, this'));
    const hasRestAssured = text.includes('Rest assured') || (tool.seoHowToUse && tool.seoHowToUse.includes('Rest assured'));
    const hasZeroLatency = text.includes('latency is reduced to zero') || text.includes('zero milliseconds latency');
    const hasVariableNumbers = text.includes('inputs numbers') || text.includes('paragraph inputs numbers') || text.includes('block inputs numbers');

    console.log(`Tool: ${slug}`);
    console.log(`  - "Behind the scenes" present:`, hasBehindTheScenes);
    console.log(`  - "Rest assured" present:`, hasRestAssured);
    console.log(`  - "Zero latency" present:`, hasZeroLatency);
    console.log(`  - "[variable] numbers" present:`, hasVariableNumbers);
    console.log(`  - seoHowItWorks start:`, tool.seoHowItWorks?.slice(0, 80));
    console.log(`  - seoHowToUse end:`, tool.seoHowToUse?.split('\n').slice(-2).join(' '));

    if (hasBehindTheScenes || hasRestAssured || hasZeroLatency || hasVariableNumbers) pass = false;
  }
  console.log('RESULT FOR ITEM 1:', pass ? 'PASS' : 'FAIL');
}

async function checkItem2() {
  console.log('\n======================================================');
  console.log('CHECKLIST ITEM 2: Content Preservation');
  console.log('======================================================');
  const slugs = ['emi-calculator', 'mortgage-calculator', 'word-counter', 'age-calculator', 'bmi-calculator'];
  const db = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
  let pass = true;

  for (const slug of slugs) {
    const res = await fetch(`${baseUrl}/tools/${slug}`);
    const text = await res.text();
    const tool = db.tools.find(t => t.slug === slug);

    const hasSummary = Boolean(tool.quickAnswer && text.includes(tool.quickAnswer));
    const stepMatches = tool.seoHowToUse?.match(/^\d+\.\s+/gm) || [];
    const has4Steps = stepMatches.length === 4;
    const hasFormula = Boolean(tool.formula && text.includes(tool.name));
    const hasExample = Boolean(tool.seoExample && text.includes(tool.seoExample));
    const faqs = tool.seoFaqs || tool.faqs || [];
    const hasFaqs = faqs.length > 0 && text.includes(faqs[0].q);

    console.log(`Tool: ${slug}`);
    console.log(`  - Summary rendered:`, hasSummary, `("${tool.quickAnswer?.slice(0, 50)}...")`);
    console.log(`  - Steps count:`, stepMatches.length, `(4 expected: ${has4Steps})`);
    console.log(`  - Formula section rendered:`, hasFormula);
    console.log(`  - Worked example rendered:`, hasExample);
    console.log(`  - FAQs rendered:`, hasFaqs, `(${faqs.length} FAQs)`);

    if (!hasSummary || !has4Steps || !hasFormula || !hasExample || !hasFaqs) pass = false;
  }
  console.log('RESULT FOR ITEM 2:', pass ? 'PASS' : 'FAIL');
}

async function checkItem5() {
  console.log('\n======================================================');
  console.log('CHECKLIST ITEM 5: DOM Spacing Check');
  console.log('======================================================');
  // 1. Blog page
  const resBlog = await fetch(`${baseUrl}/blog`);
  const textBlog = await resBlog.text();
  const blogBadges = textBlog.match(/<span[^>]*class="[^"]*truncate[^"]*"[^>]*>(.*?)<\/span>\s*<a[^>]*href="\/blog\/[^"]*"[^>]*>(.*?)<\/a>/s);
  
  // Inspect merged strings in blog HTML text
  const mergedBlogRegex = /([a-z0-9])Read Article/i;
  const blogHasMerged = mergedBlogRegex.test(textBlog.replace(/<[^>]+>/g, ''));
  console.log('Blog HTML has merged text like "comparisonRead Article":', blogHasMerged);

  // 2. Header nav
  const resHome = await fetch(`${baseUrl}`);
  const textHome = await resHome.text();
  const headerMergedRegex = /(Blog|Tools|Categories)(EMI Calculator|Mortgage Calculator)/;
  const headerHasMerged = headerMergedRegex.test(textHome.replace(/<[^>]+>/g, ' '));
  console.log('Header text has merged links:', headerHasMerged);

  // 3. Macro calculator
  const resMacro = await fetch(`${baseUrl}/tools/macro-calculator`);
  const textMacro = await resMacro.text();
  // Check client component code of MacroCalculator
  const macroFile = fs.readFileSync('./components/tools/MacroCalculator.tsx', 'utf8');
  console.log('MacroCalculator.tsx snippet around protein/g:');
  const macroMatches = macroFile.match(/(\d+g|\{[^}]+\}g)[A-Za-z]/g) || [];
  console.log('Potential merged patterns in MacroCalculator.tsx:', macroMatches);

  console.log('RESULT FOR ITEM 5: Reporting details');
}

async function checkItem6() {
  console.log('\n======================================================');
  console.log('CHECKLIST ITEM 6: Homepage Deduplication');
  console.log('======================================================');
  const resHome = await fetch(`${baseUrl}`);
  const html = await resHome.text();

  const db = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
  const pctTool = db.tools.find(t => t.slug === 'percentage-calculator');
  const wordTool = db.tools.find(t => t.slug === 'word-counter');

  // Count occurrences of card description
  const countOccurrences = (str, sub) => (str.match(new RegExp(sub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  const pctDescCount = countOccurrences(html, pctTool.description);
  const wordDescCount = countOccurrences(html, wordTool.description);

  console.log(`Percentage Calculator description count in rendered homepage HTML: ${pctDescCount} (Expected: 1)`);
  console.log(`Word Counter description count in rendered homepage HTML: ${wordDescCount} (Expected: 1)`);
  
  const pass = pctDescCount === 1 && wordDescCount === 1;
  console.log('RESULT FOR ITEM 6:', pass ? 'PASS' : 'FAIL');
}

async function checkItem7() {
  console.log('\n======================================================');
  console.log('CHECKLIST ITEM 7: EV Calculator Reassignment');
  console.log('======================================================');
  const db = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
  const evTool = db.tools.find(t => t.slug === 'ev-cost-calculator');
  
  const res = await fetch(`${baseUrl}/tools/ev-cost-calculator`);
  const html = await res.text();

  console.log('Category in db.json:', evTool.category);
  console.log('URL checked:', `${baseUrl}/tools/ev-cost-calculator`);
  console.log('Contains "Home" breadcrumb:', html.includes('Home'));
  console.log('Contains "Finance" breadcrumb:', html.includes('>Finance<') || html.includes('Finance') || html.includes('/#finance'));
  console.log('Contains calculation logic / component:', html.includes('Annual Miles') || html.includes('Electricity Price') || html.includes('Gas Price'));

  const pass = evTool.category === 'finance' && html.includes('Finance') && (html.includes('/#finance') || html.includes('category/finance'));
  console.log('RESULT FOR ITEM 7:', pass ? 'PASS' : 'FAIL');
}

async function checkItem8() {
  console.log('\n======================================================');
  console.log('CHECKLIST ITEM 8: Finance Cluster Links & Sitemap');
  console.log('======================================================');
  const db = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));
  const blogSlugs = ['choose-best-personal-loan', 'understanding-tax-brackets', 'how-to-calculate-loan-amortization-schedule', 'how-much-will-401k-be-worth-at-65', 'apr-vs-interest-rate-difference-explained'];
  
  let allBlogsLink = true;
  for (const bSlug of blogSlugs) {
    const post = db.blogs.find(b => b.slug === bSlug);
    const hasTools = post.content.includes('/tools/');
    console.log(`Blog ${bSlug} has /tools/ links:`, hasTools);
    if (!hasTools) allBlogsLink = false;
  }

  // Check sitemap
  const resSitemap = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemapXml = await resSitemap.text();

  let allBlogsInSitemap = true;
  for (const bSlug of blogSlugs) {
    const inSitemap = sitemapXml.includes(`/blog/${bSlug}`);
    console.log(`Sitemap has /blog/${bSlug}:`, inSitemap);
    if (!inSitemap) allBlogsInSitemap = false;
  }

  // Check finance scenario in sitemap
  const hasFinanceScenarioInSitemap = sitemapXml.includes('/tools/emi-calculator/scenarios');
  console.log(`Sitemap has finance scenario URL:`, hasFinanceScenarioInSitemap);

  const pass = allBlogsLink && allBlogsInSitemap && hasFinanceScenarioInSitemap;
  console.log('RESULT FOR ITEM 8:', pass ? 'PASS' : 'FAIL');
}

async function run() {
  await checkItem4();
  await checkItem1();
  await checkItem2();
  await checkItem5();
  await checkItem6();
  await checkItem7();
  await checkItem8();
}

run();
