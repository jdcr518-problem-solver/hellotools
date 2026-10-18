async function test() {
  const baseUrl = 'http://localhost:3000';
  
  // 1. Test main tool page
  const resMain = await fetch(`${baseUrl}/tools/emi-calculator`);
  const textMain = await resMain.text();
  const canonicalMain = textMain.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0];
  const robotsMain = textMain.match(/<meta[^>]+name=["']robots["'][^>]*>/gi);
  const xRobotsMain = resMain.headers.get('x-robots-tag');

  console.log('=== 1. MAIN TOOL PAGE (/tools/emi-calculator) ===');
  console.log('HTTP Status:', resMain.status);
  console.log('Robots Meta:', robotsMain);
  console.log('Canonical Link:', canonicalMain);
  console.log('X-Robots-Tag Header:', xRobotsMain);

  // 2. Test embed URL
  const resEmbed = await fetch(`${baseUrl}/tools/emi-calculator?embed=true`);
  const textEmbed = await resEmbed.text();
  const canonicalEmbed = textEmbed.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0];
  const robotsEmbed = textEmbed.match(/<meta[^>]+name=["']robots["'][^>]*>/gi);
  const xRobotsEmbed = resEmbed.headers.get('x-robots-tag');

  console.log('\n=== 2. EMBED PAGE (/tools/emi-calculator?embed=true) ===');
  console.log('HTTP Status:', resEmbed.status);
  console.log('Robots Meta Tags:', robotsEmbed);
  console.log('Canonical Link:', canonicalEmbed);
  console.log('X-Robots-Tag Header:', xRobotsEmbed);
  console.log('Iframe Content rendered:', textEmbed.includes('Powered by HelloTools') && textEmbed.includes('EMI / Loan Calculator'));

  // 3. Test localized embed URL
  const resLocaleEmbed = await fetch(`${baseUrl}/es/tools/emi-calculator?embed=true`);
  const textLocaleEmbed = await resLocaleEmbed.text();
  const canonicalLocaleEmbed = textLocaleEmbed.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0];
  const robotsLocaleEmbed = textLocaleEmbed.match(/<meta[^>]+name=["']robots["'][^>]*>/gi);
  const xRobotsLocaleEmbed = resLocaleEmbed.headers.get('x-robots-tag');

  console.log('\n=== 3. LOCALIZED EMBED PAGE (/es/tools/emi-calculator?embed=true) ===');
  console.log('HTTP Status:', resLocaleEmbed.status);
  console.log('Robots Meta Tags:', robotsLocaleEmbed);
  console.log('Canonical Link:', canonicalLocaleEmbed);
  console.log('X-Robots-Tag Header:', xRobotsLocaleEmbed);

  // 4. Automated Assertions
  console.log('\n=== 4. VERIFICATION ASSERTIONS ===');
  const isMainIndexable = !robotsMain || robotsMain.some(r => r.includes('index') && !r.includes('noindex'));
  const isEmbedNoindexed = (robotsEmbed && robotsEmbed.some(r => r.includes('noindex'))) || xRobotsEmbed?.includes('noindex');
  const isEmbedCanonicalClean = canonicalEmbed?.includes('href="https://hellotools.net/tools/emi-calculator"') && !canonicalEmbed?.includes('embed=true');
  const isLocaleEmbedNoindexed = (robotsLocaleEmbed && robotsLocaleEmbed.some(r => r.includes('noindex'))) || xRobotsLocaleEmbed?.includes('noindex');

  console.log('Main tool page is indexable:', isMainIndexable ? 'PASS ✓' : 'FAIL ✗');
  console.log('Embed URL has noindex:', isEmbedNoindexed ? 'PASS ✓' : 'FAIL ✗');
  console.log('Embed URL canonicalizes to clean tool URL:', isEmbedCanonicalClean ? 'PASS ✓' : 'FAIL ✗');
  console.log('Embed iframe view renders tool component:', textEmbed.includes('Powered by HelloTools') ? 'PASS ✓' : 'FAIL ✗');
  console.log('Localized embed has noindex:', isLocaleEmbedNoindexed ? 'PASS ✓' : 'FAIL ✗');
}

test().catch(console.error);
