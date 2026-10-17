import React from 'react';
import { Metadata } from 'next';
import RetirementTimeHorizonView from '@/components/scenarios/RetirementTimeHorizonView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/retirement-calculator/scenarios/how-much-to-save-each-month-for-retirement';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Should I Save Each Month for Retirement? Age & Horizon Guide',
  description:
    'Compare projected retirement balances when saving $300 a month starting at ages 25, 30, 35, 40, and 45. See how starting earlier multiplies your compound growth.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Should I Save Each Month for Retirement?',
    description:
      'Worked examples demonstrating how starting age impacts compound interest and final retirement wealth with $300 monthly savings at 7% return.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Monthly retirement savings and starting age comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowMuchToSaveEachMonthForRetirementPage() {
  return <RetirementTimeHorizonView locale="en" />;
}
