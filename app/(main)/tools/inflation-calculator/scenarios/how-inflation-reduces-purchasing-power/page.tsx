import React from 'react';
import { Metadata } from 'next';
import InflationPurchasingPowerView from '@/components/scenarios/InflationPurchasingPowerView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/inflation-calculator/scenarios/how-inflation-reduces-purchasing-power';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Inflation Reduces Purchasing Power: Real vs Nominal Value — HelloTools',
  description:
    'Learn how persistent annual inflation erodes the real buying power of a fixed dollar amount over 5 to 30 years with verified worked examples.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Inflation Reduces Purchasing Power: Real vs Nominal Value',
    description:
      'Learn how persistent annual inflation erodes the real buying power of a fixed dollar amount over 5 to 30 years with verified worked examples.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Inflation Reduces Purchasing Power',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function InflationPurchasingPowerPage() {
  return <InflationPurchasingPowerView locale="en" />;
}
