import React from 'react';
import { Metadata } from 'next';
import FourOhOneKScenariosHubView from '@/components/scenarios/FourOhOneKScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/401k-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: '401(k) Calculator Scenarios and Practical Examples — HelloTools',
  description:
    'Explore practical 401(k) retirement scenarios to analyze how employer matching formulas, contribution rates, compounding horizons, and annual returns affect your ending balance.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: '401(k) Calculator Scenarios and Practical Examples',
    description:
      'Explore practical 401(k) retirement scenarios to analyze how employer matching formulas, contribution rates, compounding horizons, and annual returns affect your ending balance.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: '401(k) Calculator Scenarios and Practical Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FourOhOneKScenariosHubPage() {
  return <FourOhOneKScenariosHubView locale="en" />;
}
