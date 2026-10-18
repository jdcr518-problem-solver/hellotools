/**
 * tool-linking-data.ts
 *
 * Central lookup table for every priority tool's internal linking metadata.
 * Consumed by app/(main)/tools/[slug]/page.tsx to inject:
 *  - YMYL disclaimer type  ('finance' | 'health' | null)
 *  - Category slug + name
 *  - Related article slugs (already stored in db.json relatedSlugs for tools;
 *    this file covers the blog article links and category overrides)
 *
 * ADD new tools here as the catalog expands.
 */

import type { RelatedArticle } from '@/components/ToolInternalLinks';

export interface ToolLinkingMeta {
  /** Maps to DisclaimerBox type; null = no disclaimer rendered */
  disclaimer: 'finance' | 'health' | null;
  categorySlug: string;
  categoryName: string;
  /** Blog articles to show in the "Learn More" section */
  articles: RelatedArticle[];
}

export const TOOL_LINKING_DATA: Record<string, ToolLinkingMeta> = {

  // ─── FINANCE ──────────────────────────────────────────────────────────────

  'emi-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule Step-by-Step',
        readingTime: '5 min read',
        snippet: 'Understand how each payment splits between principal and interest over the loan tenure.',
      },
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '4 min read',
        snippet: 'Learn how lenders advertise rates vs. what you actually pay.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'mortgage-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule Step-by-Step',
        readingTime: '5 min read',
      },
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '4 min read',
      },
    ],
  },

  'auto-loan-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '4 min read',
        snippet: 'Know the true cost of your auto loan before you sign.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'ev-cost-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '4 min read',
        snippet: 'Know the true financing costs when calculating auto purchases.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'simple-interest-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
      },
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule Step-by-Step',
        readingTime: '5 min read',
      },
    ],
  },

  'compound-interest-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-much-will-401k-be-worth-at-65',
        title: 'How Much Will My 401(k) Be Worth at Age 65?',
        readingTime: '5 min read',
        snippet: 'See how compound growth transforms consistent contributions over decades.',
      },
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule',
        readingTime: '5 min read',
      },
    ],
  },

  'savings-goal-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-much-will-401k-be-worth-at-65',
        title: 'How Much Will My 401(k) Be Worth at Age 65?',
        readingTime: '5 min read',
        snippet: 'See how regular contributions and compound growth build substantial wealth over time.',
      },
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
      },
    ],
  },

  'retirement-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-much-will-401k-be-worth-at-65',
        title: 'How Much Will My 401(k) Be Worth at Age 65?',
        readingTime: '5 min read',
        snippet: 'Understand the compound growth mechanics of retirement wealth accumulated over several decades.',
      },
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
      },
    ],
  },

  '401k-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-much-will-401k-be-worth-at-65',
        title: 'How Much Will My 401(k) Be Worth at Age 65?',
        readingTime: '5 min read',
        snippet: 'Understand the compound growth mechanics of retirement wealth accumulated over several decades.',
      },
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
      },
    ],
  },

  'amortization-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule Step-by-Step',
        readingTime: '5 min read',
        snippet: 'Deep-dive into how amortization splits each payment month by month.',
      },
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '4 min read',
      },
    ],
  },

  'student-loan-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule Step-by-Step',
        readingTime: '5 min read',
        snippet: 'Deep-dive into how amortization splits each payment month by month.',
      },
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '4 min read',
        snippet: 'Understand the critical difference between nominal rate and APR when evaluating education loans.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'apr-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '5 min read',
        snippet: 'Understand why APR is always higher than your stated interest rate and how lender fees impact true borrowing cost.',
      },
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule Step-by-Step',
        readingTime: '5 min read',
        snippet: 'Deep-dive into how amortization splits each payment month by month.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'salary-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
        snippet: 'A plain-language guide to how progressive marginal tax rates actually work and affect take-home pay.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'tip-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
      },
    ],
  },

  'discount-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
        snippet: 'Understand net purchasing power, financing terms, and effective savings when evaluating purchases.',
      },
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
      },
    ],
  },

  'currency-converter': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'apr-vs-interest-rate-difference-explained',
        title: 'APR vs. Stated Interest Rate: Why the Difference Matters',
        readingTime: '4 min read',
        snippet: 'Learn how exchange fees, markup, and hidden financing costs impact international purchasing power.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'tax-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
        snippet: 'A plain-language guide to how progressive marginal tax rates actually work.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  'inflation-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-much-will-401k-be-worth-at-65',
        title: 'How Much Will My 401(k) Be Worth at Age 65?',
        readingTime: '5 min read',
        snippet: 'Understand how compound growth and inflation interact over multi-decade financial horizons.',
      },
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
      },
    ],
  },

  'freelancer-tax-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'understanding-tax-brackets',
        title: 'Understanding Progressive Tax Brackets Simply',
        readingTime: '4 min read',
        snippet: 'A plain-language guide to how progressive marginal tax rates actually work and affect take-home pay.',
      },
      {
        slug: 'how-much-will-401k-be-worth-at-65',
        title: 'How Much Will My 401(k) Be Worth at Age 65?',
        readingTime: '5 min read',
      },
    ],
  },

  'net-worth-calculator': {
    disclaimer: 'finance',
    categorySlug: 'finance',
    categoryName: 'Finance',
    articles: [
      {
        slug: 'how-much-will-401k-be-worth-at-65',
        title: 'How Much Will My 401(k) Be Worth at Age 65?',
        readingTime: '5 min read',
        snippet: 'Understand the compound growth mechanics of retirement wealth accumulated over several decades.',
      },
      {
        slug: 'how-to-calculate-loan-amortization-schedule',
        title: 'How to Calculate a Loan Amortization Schedule Step-by-Step',
        readingTime: '5 min read',
        snippet: 'Understand how loan amortization steadily reduces debt liabilities and builds personal equity.',
      },
      {
        slug: 'choose-best-personal-loan',
        title: 'How to Choose the Best Personal Loan for Your Needs',
        readingTime: '6 min read',
      },
    ],
  },

  // ─── HEALTH ───────────────────────────────────────────────────────────────

  'bmi-calculator': {
    disclaimer: 'health',
    categorySlug: 'health',
    categoryName: 'Health & Fitness',
    articles: [], // No health guides yet → falls back to hub card
  },

  'body-fat-calculator': {
    disclaimer: 'health',
    categorySlug: 'health',
    categoryName: 'Health & Fitness',
    articles: [],
  },

  'calorie-calculator': {
    disclaimer: 'health',
    categorySlug: 'health',
    categoryName: 'Health & Fitness',
    articles: [],
  },

  'ideal-weight-calculator': {
    disclaimer: 'health',
    categorySlug: 'health',
    categoryName: 'Health & Fitness',
    articles: [],
  },

  'ovulation-calculator': {
    disclaimer: 'health',
    categorySlug: 'health',
    categoryName: 'Health & Fitness',
    articles: [],
  },

  'pregnancy-calculator': {
    disclaimer: 'health',
    categorySlug: 'health',
    categoryName: 'Health & Fitness',
    articles: [],
  },

  // ─── TEXT UTILITIES ───────────────────────────────────────────────────────

  'word-counter': {
    disclaimer: null,
    categorySlug: 'text',
    categoryName: 'Text Utilities',
    articles: [],
  },

  'character-counter': {
    disclaimer: null,
    categorySlug: 'text',
    categoryName: 'Text Utilities',
    articles: [],
  },

  'lorem-ipsum-generator': {
    disclaimer: null,
    categorySlug: 'text',
    categoryName: 'Text Utilities',
    articles: [],
  },

  // ─── DEVELOPER / UTILITY ──────────────────────────────────────────────────

  'password-generator': {
    disclaimer: null,
    categorySlug: 'utility',
    categoryName: 'Developer & Utility',
    articles: [],
  },

  'base64-converter': {
    disclaimer: null,
    categorySlug: 'utility',
    categoryName: 'Developer & Utility',
    articles: [],
  },

  'json-formatter': {
    disclaimer: null,
    categorySlug: 'utility',
    categoryName: 'Developer & Utility',
    articles: [],
  },
};
