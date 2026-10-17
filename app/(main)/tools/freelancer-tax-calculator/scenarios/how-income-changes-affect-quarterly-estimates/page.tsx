import React from 'react';
import { Metadata } from 'next';
import FreelancerTaxIncomeImpactView from '@/components/scenarios/FreelancerTaxIncomeImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/freelancer-tax-calculator/scenarios/how-income-changes-affect-quarterly-estimates';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Income Changes Affect Your Quarterly Estimate — HelloTools',
  description:
    'Compare low ($35k), moderate ($80k), and high ($150k) freelance income scenarios to see why quarterly estimated tax vouchers rise faster than gross earnings due to progressive brackets.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Income Changes Affect Your Quarterly Estimate',
    description:
      'Compare low ($35k), moderate ($80k), and high ($150k) freelance income scenarios to see why quarterly estimated tax vouchers rise faster than gross earnings due to progressive brackets.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Income Changes Affect Quarterly Estimates',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FreelancerTaxIncomeImpactPage() {
  return <FreelancerTaxIncomeImpactView locale="en" />;
}
