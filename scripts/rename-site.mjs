import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const filesToUpdate = [
  'data/db.json',
  'data/tools-master.ts',
  'components/Navbar.tsx',
  'components/Footer.tsx',
  'components/tools/UtilityTools.tsx',
  'app/layout.tsx',
  'app/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/tools/[slug]/page.tsx',
  'app/sitemap.ts',
  'app/robots.ts',
  'scripts/generate-seo-data.mjs',
  'scripts/generate-llms-txt.mjs',
  '.env',
  'README.md'
];

console.log("Starting rename operation: ToolsKit -> HelloTools...");

for (const relPath of filesToUpdate) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping non-existent file: ${relPath}`);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // Store original to check if changed
  const original = content;

  // Replacements
  // 1. Replace base URLs
  content = content.replaceAll('toolskit-premium.vercel.app', 'hellotools.net');
  content = content.replaceAll('toolskit.com', 'hellotools.net');
  
  // 2. Replace case-sensitive "ToolsKit" -> "HelloTools"
  content = content.replaceAll('ToolsKit', 'HelloTools');
  
  // 3. Replace lowercase "toolskit" -> "hellotools"
  content = content.replaceAll('toolskit', 'hellotools');
  
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Successfully updated: ${relPath}`);
  } else {
    console.log(`No changes needed for: ${relPath}`);
  }
}

console.log("Rename operation completed successfully!");
