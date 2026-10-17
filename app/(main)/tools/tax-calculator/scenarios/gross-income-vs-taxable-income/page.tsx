import React from 'react';
import { Metadata } from 'next';
import TaxGrossVsTaxableIncomeView from '@/components/scenarios/TaxGrossVsTaxableIncomeView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/tax-calculator/scenarios/gross-income-vs-taxable-income';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Gross Income vs Taxable Income: Understanding What Gets Taxed — HelloTools',
  description:
    'Learn the difference between gross income and taxable income. See how standard deductions shelter earnings and how the taxable base is determined.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Gross Income vs Taxable Income: Understanding What Gets Taxed',
    description:
      'Learn the difference between gross income and taxable income. See how standard deductions shelter earnings and how the taxable base is determined.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gross Income vs Taxable Income',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TaxGrossVsTaxableIncomePage() {
  return <TaxGrossVsTaxableIncomeView locale="en" />;
}
