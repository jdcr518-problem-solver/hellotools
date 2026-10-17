import React from 'react';
import { Metadata } from 'next';
import EvCostElectricityPriceImpactView from '@/components/scenarios/EvCostElectricityPriceImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/ev-cost-calculator/scenarios/how-electricity-price-affects-ev-charging-savings';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Electricity Price Affects EV Charging Savings – Utility Rate Analysis',
  description:
    'Discover how residential electricity rates from $0.08 to $0.36 per kWh affect annual EV charging expenses, cost per mile, and net savings versus gasoline.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Electricity Price Affects EV Charging Savings – Utility Rate Analysis',
    description:
      'Sensitivity analysis comparing EV charging expenses against gas car fuel costs across multiple electricity utility price points.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Electricity Price Affects EV Charging Savings',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowElectricityPriceAffectsEvChargingSavingsPage() {
  return <EvCostElectricityPriceImpactView locale="en" />;
}
