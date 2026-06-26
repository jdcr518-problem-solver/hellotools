import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const LLMS_TXT_PATH = path.join(__dirname, '..', 'public', 'llms.txt');

function main() {
  console.log("Generating public/llms.txt...");
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const tools = dbData.tools;
  const baseUrl = 'https://hellotools.net';

  // Category mapping
  const categoryNames = {
    finance: 'Finance Calculators',
    math: 'Math & Time Solvers',
    text: 'Text Utilities & Analyzers',
    health: 'Health & Fitness Trackers',
    utility: 'Developer & System Utilities'
  };

  // Group tools by category
  const groupedTools = {};
  Object.keys(categoryNames).forEach(cat => {
    groupedTools[cat] = [];
  });

  tools.forEach(tool => {
    if (groupedTools[tool.category]) {
      groupedTools[tool.category].push(tool);
    } else {
      groupedTools.utility.push(tool);
    }
  });

  let content = `# HelloTools

HelloTools is a premium, 100% free collection of utility calculators and text processing tools. Every single tool runs client-side inside the user's web browser, guaranteeing that input data is never sent to external servers or logged. There are no signups, no fees, and no software installations required.

## Core Features
- **Zero Data Logging**: Absolute security and privacy.
- **Blazing Fast**: JavaScript-based instant computations.
- **Responsive Layout**: Seamless mobile, tablet, and desktop views.

## Available Tools by Category

`;

  Object.entries(categoryNames).forEach(([catKey, catName]) => {
    content += `### ${catName}\n\n`;
    const catTools = groupedTools[catKey] || [];
    catTools.forEach(tool => {
      const toolUrl = `${baseUrl}/tools/${tool.slug}`;
      const desc = tool.seoDescription || tool.description;
      content += `- [${tool.name}](${toolUrl}): ${desc}\n`;
    });
    content += `\n`;
  });

  fs.writeFileSync(LLMS_TXT_PATH, content, 'utf-8');
  console.log(`Generated public/llms.txt successfully at ${LLMS_TXT_PATH}`);
}

main();
