import React from 'react';
import { Metadata } from 'next';
import SavingsGoalScenariosHubView from '@/components/scenarios/SavingsGoalScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/savings-goal-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Savings Goal Calculator Scenarios and Examples',
  description:
    'Explore worked savings goal scenarios: how much to save each month, how long it takes to reach your goal, and how inflation affects your target balance. Every scenario includes a step-by-step numerical breakdown.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Savings Goal Calculator Scenarios and Examples',
    description:
      'See worked examples of how starting savings, target amount, monthly deposits, compound interest, and inflation impact your savings timeline.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Savings Goal Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SavingsGoalScenariosHubPage() {
  return <SavingsGoalScenariosHubView locale="en" />;
}
