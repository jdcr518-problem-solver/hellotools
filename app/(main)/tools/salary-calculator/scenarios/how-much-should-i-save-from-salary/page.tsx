import React from 'react';
import { Metadata } from 'next';
import SalarySavingsRateView from '@/components/scenarios/SalarySavingsRateView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/salary-calculator/scenarios/how-much-should-i-save-from-salary';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Should I Save From My Salary? Benchmarks and Calculations — HelloTools',
  description:
    'Calculate how much to save from your paycheck using 10%, 15%, and 20% guidelines. See monthly and annual savings targets based on your salary level.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Should I Save From My Salary? Benchmarks and Calculations',
    description:
      'Calculate how much to save from your paycheck using 10%, 15%, and 20% guidelines. See monthly and annual savings targets based on your salary level.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Much Should I Save From My Salary?',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SalarySavingsRatePage() {
  return <SalarySavingsRateView locale="en" />;
}
