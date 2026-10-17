import React from 'react';
import { Metadata } from 'next';
import EvCostGasPriceImpactView from '@/components/scenarios/EvCostGasPriceImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/ev-cost-calculator/scenarios/how-gas-price-changes-the-ev-savings-gap';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Gas Price Changes the EV Savings Gap – Fuel Price Analysis',
  description:
    'Examine how gasoline pump prices from $2.75 to $5.00 per gallon expand or compress the annual savings gap between EVs and gasoline cars.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Gas Price Changes the EV Savings Gap – Fuel Price Analysis',
    description:
      'Detailed sensitivity analysis measuring how pump price fluctuations alter annual fuel costs and multi-year EV savings.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Gas Price Changes the EV Savings Gap',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowGasPriceChangesEvSavingsGapPage() {
  return <EvCostGasPriceImpactView locale="en" />;
}
