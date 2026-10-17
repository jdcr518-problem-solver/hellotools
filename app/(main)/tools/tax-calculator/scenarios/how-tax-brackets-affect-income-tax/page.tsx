import React from 'react';
import { Metadata } from 'next';
import TaxBracketsImpactView from '@/components/scenarios/TaxBracketsImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/tax-calculator/scenarios/how-tax-brackets-affect-income-tax';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Tax Brackets Affect Your Income Tax: Progressive Rates Explained — HelloTools',
  description:
    'Learn how progressive marginal tax brackets work in practice and discover why entering a higher tax bracket never reduces your total take-home pay.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Tax Brackets Affect Your Income Tax: Progressive Rates Explained',
    description:
      'Learn how progressive marginal tax brackets work in practice and discover why entering a higher tax bracket never reduces your total take-home pay.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Tax Brackets Affect Income Tax',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TaxBracketsImpactPage() {
  return <TaxBracketsImpactView locale="en" />;
}
