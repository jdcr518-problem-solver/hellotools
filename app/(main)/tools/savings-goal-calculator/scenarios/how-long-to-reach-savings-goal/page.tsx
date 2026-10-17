import React from 'react';
import { Metadata } from 'next';
import SavingsGoalTimelineView from '@/components/scenarios/SavingsGoalTimelineView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/savings-goal-calculator/scenarios/how-long-to-reach-savings-goal';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Long Will It Take to Reach My Savings Goal?',
  description:
    'Compare how monthly contributions of $100, $150, $200, $300, and $500 affect your timeline to reach a $10,000 savings goal with 5% APY compounded monthly.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Long Will It Take to Reach My Savings Goal?',
    description:
      'Worked savings timeline example: compare 5 monthly contribution rates to accumulate $10,000 starting with $1,000 at 5% APY.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Savings timeline comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowLongToReachSavingsGoalPage() {
  return <SavingsGoalTimelineView locale="en" />;
}
