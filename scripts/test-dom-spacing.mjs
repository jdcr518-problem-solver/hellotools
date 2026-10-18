async function test() {
  const blogRes = await fetch('http://localhost:3000/blog');
  const blogHtml = await blogRes.text();
  const readArticleIdx = blogHtml.indexOf('Read Article');
  if (readArticleIdx !== -1) {
    const chunk = blogHtml.substring(readArticleIdx - 200, readArticleIdx + 50);
    console.log('--- BLOG SPACING SNIPPET ---');
    console.log(chunk);
    const hasSrOnly = chunk.includes('class="sr-only"> </span>');
    console.log('Blog has accessible text node separator:', hasSrOnly);
  }

  const macroRes = await fetch('http://localhost:3000/tools/macro-calculator');
  const macroHtml = await macroRes.text();
  console.log('--- MACRO CALCULATOR CHECK ---');
  console.log('Includes "{protein} g" pattern or "g Protein" separated:', macroHtml.includes(' g') || macroHtml.includes('Protein'));

  const navRes = await fetch('http://localhost:3000/');
  const navHtml = await navRes.text();
  const blogNavIdx = navHtml.indexOf('Blog</a>');
  if (blogNavIdx !== -1) {
    const chunk = navHtml.substring(blogNavIdx - 10, blogNavIdx + 120);
    console.log('--- NAVBAR SPACING SNIPPET ---');
    console.log(chunk);
  }
}

test().catch(console.error);
