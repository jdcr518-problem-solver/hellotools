import React from 'react';
import { Metadata } from 'next';
import InflationPriceRiseView from '@/components/scenarios/InflationPriceRiseView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/inflation-calculator/scenarios/how-much-will-prices-rise-over-time';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Will Prices Rise Over Time? Projecting Future Costs — HelloTools',
  description:
    'Calculate how current living expenses and product prices increase over multi-year horizons using compound annual inflation modeling.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Will Prices Rise Over Time? Projecting Future Costs',
    description:
      'Calculate how current living expenses and product prices increase over multi-year horizons using compound annual inflation modeling.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Much Will Prices Rise Over Time',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function InflationPriceRisePage() {
  return <InflationPriceRiseView locale="en" />;
}
