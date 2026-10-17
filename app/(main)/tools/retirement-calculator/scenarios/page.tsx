import React from 'react';
import { Metadata } from 'next';
import RetirementScenariosHubView from '@/components/scenarios/RetirementScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/retirement-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Retirement Savings Calculator Scenarios and Examples',
  description:
    'Explore worked retirement savings scenarios: how much you need to save, how starting age and monthly contributions affect your nest egg, and how inflation changes your future target.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Retirement Savings Calculator Scenarios and Examples',
    description:
      'Worked examples and projections showing how current savings, monthly deposits, time horizon, and inflation interact to build your retirement nest egg.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Retirement Savings Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RetirementScenariosHubPage() {
  return <RetirementScenariosHubView locale="en" />;
}
