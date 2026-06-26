import fs from 'fs';
import path from 'path';
import { toolsMaster, ToolMetadata } from '@/data/tools-master';

export interface BlogPost {
  title: string;
  content: string;
  slug: string;
  metaDescription: string;
  keyword: string;
  date: string;
  readingTime: string;
}

export interface HomepageContent {
  heroHeadline: string;
  heroSubheadline: string;
  featuredTools: string[];
}

export interface DBData {
  tools: ToolMetadata[];
  blogs: BlogPost[];
  homepage: HomepageContent;
}

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

export function getDbData(): DBData {
  if (!fs.existsSync(DB_FILE)) {
    const initialData: DBData = {
      tools: toolsMaster,
      blogs: [
        {
          title: "How to Choose the Best Personal Loan for Your Needs",
          slug: "choose-best-personal-loan",
          content: "<p>When planning large life milestones, personal loans provide an effective bridge. Learn how to compare interest rates, evaluate processing fees, and use loan calculators to find your monthly budget.</p><p>Understanding repayment ratios and total interest is critical before signing any contract. It helps to use tools like an EMI calculator to check various combinations of loan tenures and rates.</p>",
          metaDescription: "Learn how to compare interest rates, fees, and repayments to find the best personal loan for your financial targets.",
          keyword: "personal loan comparison",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readingTime: "4 min read"
        },
        {
          title: "Understanding Progressive Tax Brackets Simply",
          slug: "understanding-tax-brackets",
          content: "<p>Progressive taxation scales tax rates as income grows. Discover the difference between your marginal tax rate and effective tax rate with simple examples.</p><p>Many taxpayers mistakenly believe moving to a higher tax bracket taxes all their income at the new rate. In a progressive system, only the income within that specific bracket is taxed at its corresponding rate.</p>",
          metaDescription: "An easy-to-understand guide on progressive taxation brackets, marginal tax rates, and effective rates.",
          keyword: "tax brackets explained",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readingTime: "5 min read"
        }
      ],
      homepage: {
        heroHeadline: "Find the right tool instantly",
        heroSubheadline: "Free, secure, and lightning-fast calculators engineered for immediate results. No accounts, no data logging.",
        featuredTools: [
          'emi-calculator',
          'age-calculator',
          'bmi-calculator',
          'percentage-calculator',
          'password-generator',
          'word-counter',
          'unit-converter',
          'currency-converter'
        ]
      }
    };
    
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  
  const content = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(content);
}

export function saveDbData(data: DBData) {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
