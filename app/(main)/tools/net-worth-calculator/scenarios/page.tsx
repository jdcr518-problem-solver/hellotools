import React from 'react';
import { Metadata } from 'next';
import NetWorthScenariosHubView from '@/components/scenarios/NetWorthScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/net-worth-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Net Worth Calculator Scenarios and Practical Examples — HelloTools',
  description:
    'Explore practical net worth scenarios to analyze how asset accumulation, mortgage liabilities, student debt, and cash savings determine your personal balance sheet.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Net Worth Calculator Scenarios and Practical Examples',
    description:
      'Explore practical net worth scenarios to analyze how asset accumulation, mortgage liabilities, student debt, and cash savings determine your personal balance sheet.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Net Worth Calculator Scenarios and Practical Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function NetWorthScenariosHubPage() {
  return <NetWorthScenariosHubView locale="en" />;
}
