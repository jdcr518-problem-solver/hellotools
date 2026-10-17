import React from 'react';
import { Metadata } from 'next';
import TaxDeductionsImpactView from '@/components/scenarios/TaxDeductionsImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/tax-calculator/scenarios/how-deductions-change-estimated-tax';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Deductions Change Your Estimated Tax: Savings & Shelter Analysis — HelloTools',
  description:
    'Discover how claiming standard or itemized deductions lowers taxable income and shelters earnings at your marginal tax bracket to generate real tax savings.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Deductions Change Your Estimated Tax: Savings & Shelter Analysis',
    description:
      'Discover how claiming standard or itemized deductions lowers taxable income and shelters earnings at your marginal tax bracket to generate real tax savings.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Deductions Change Estimated Tax',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TaxDeductionsImpactPage() {
  return <TaxDeductionsImpactView locale="en" />;
}
