import React from 'react';
import { Metadata } from 'next';
import RetirementNestEggView from '@/components/scenarios/RetirementNestEggView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/retirement-calculator/scenarios/how-much-to-save-for-retirement';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Do I Need to Save for Retirement? Scenarios & Calculations',
  description:
    'Calculate the projected retirement nest egg across different monthly savings contributions from $100 to $750 with a starting balance of $5,000 at a 7% return over 35 years.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Do I Need to Save for Retirement?',
    description:
      'Worked retirement savings calculations comparing monthly contributions of $100, $200, $300, $500, and $750 over 35 years at 7% annual return.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Retirement nest egg calculations',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowMuchToSaveForRetirementPage() {
  return <RetirementNestEggView locale="en" />;
}
