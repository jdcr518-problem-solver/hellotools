import React from 'react';
import { Metadata } from 'next';
import NetWorthCalculationBasicsView from '@/components/scenarios/NetWorthCalculationBasicsView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/net-worth-calculator/scenarios/how-to-calculate-net-worth';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How to Calculate Your Net Worth — Step-by-Step Guide — HelloTools',
  description:
    'Learn how to calculate your personal net worth by listing liquid and fixed assets, subtracting all outstanding debt liabilities, and checking your debt ratio.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How to Calculate Your Net Worth — Step-by-Step Guide',
    description:
      'Learn how to calculate your personal net worth by listing liquid and fixed assets, subtracting all outstanding debt liabilities, and checking your debt ratio.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How to Calculate Your Net Worth',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowToCalculateNetWorthPage() {
  return <NetWorthCalculationBasicsView locale="en" />;
}
