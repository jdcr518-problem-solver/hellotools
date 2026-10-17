import React from 'react';
import { Metadata } from 'next';
import FreelancerTaxScenariosHubView from '@/components/scenarios/FreelancerTaxScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/freelancer-tax-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Freelancer Quarterly Tax Calculator Scenarios and Practical Examples — HelloTools',
  description:
    'Explore practical freelancer tax scenarios to calculate reserve percentages, understand Schedule SE 15.3% tax formulas, and see how income fluctuations impact your quarterly vouchers.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Freelancer Quarterly Tax Calculator Scenarios and Practical Examples',
    description:
      'Explore practical freelancer tax scenarios to calculate reserve percentages, understand Schedule SE 15.3% tax formulas, and see how income fluctuations impact your quarterly vouchers.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Freelancer Quarterly Tax Calculator Scenarios and Practical Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FreelancerTaxScenariosHubPage() {
  return <FreelancerTaxScenariosHubView locale="en" />;
}
