import React from 'react';
import { Metadata } from 'next';
import SavingsGoalInflationView from '@/components/scenarios/SavingsGoalInflationView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/savings-goal-calculator/scenarios/how-inflation-affects-savings-goal';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Inflation Affects Your Savings Goal',
  description:
    'Learn how a 3% annual inflation rate reduces purchasing power over 1 to 10 years and calculate the adjusted monthly savings required to meet your real financial target.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Inflation Affects Your Savings Goal',
    description:
      'Compare nominal savings goals against inflation-adjusted targets over 1 to 10 years. Understand purchasing power preservation with worked examples.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Inflation impact on savings goal',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowInflationAffectsSavingsGoalPage() {
  return <SavingsGoalInflationView locale="en" />;
}
