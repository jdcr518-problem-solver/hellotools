import React from 'react';
import { Metadata } from 'next';
import SalaryScenariosHubView from '@/components/scenarios/SalaryScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/salary-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Salary Calculator Scenarios and Examples',
  description:
    'Explore realistic wage and salary scenarios to see how hourly, monthly, and annual wages convert, understand gross versus take-home pay, and establish targeted savings plans.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Salary Calculator Scenarios and Examples',
    description:
      'Explore realistic wage and salary scenarios to see how hourly, monthly, and annual wages convert, understand gross versus take-home pay, and establish targeted savings plans.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Salary Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SalaryScenariosHubPage() {
  return <SalaryScenariosHubView locale="en" />;
}
