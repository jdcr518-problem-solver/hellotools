import React from 'react';
import { Metadata } from 'next';
import SavingsGoalMonthlyDepositView from '@/components/scenarios/SavingsGoalMonthlyDepositView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/savings-goal-calculator/scenarios/how-much-to-save-each-month';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Should I Save Each Month to Reach My Goal?',
  description:
    'Find the required monthly savings deposit to grow $1,000 into $10,000 across 1 to 5 years at 5% APY compounded monthly. Includes verified step-by-step calculations and a timeline comparison table.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Should I Save Each Month to Reach My Goal?',
    description:
      'Worked savings goal example: turning $1,000 into $10,000 at 5% APY over 1–5 years. Understand the monthly contribution required to hit your deadline.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Required monthly savings calculation',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowMuchToSaveEachMonthPage() {
  return <SavingsGoalMonthlyDepositView locale="en" />;
}
