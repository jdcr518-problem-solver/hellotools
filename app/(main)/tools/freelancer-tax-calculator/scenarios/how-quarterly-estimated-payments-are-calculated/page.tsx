import React from 'react';
import { Metadata } from 'next';
import FreelancerTaxCalculationStepsView from '@/components/scenarios/FreelancerTaxCalculationStepsView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/freelancer-tax-calculator/scenarios/how-quarterly-estimated-payments-are-calculated';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Quarterly Estimated Payments Are Calculated: Step-by-Step — HelloTools',
  description:
    'Discover the exact formula sequence behind quarterly estimated tax vouchers: gross revenue, business write-offs, 15.3% SE tax, standard deductions, and 4 periodic payment vouchers.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Quarterly Estimated Payments Are Calculated: Step-by-Step',
    description:
      'Discover the exact formula sequence behind quarterly estimated tax vouchers: gross revenue, business write-offs, 15.3% SE tax, standard deductions, and 4 periodic payment vouchers.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Quarterly Estimated Payments Are Calculated',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FreelancerTaxCalculationStepsPage() {
  return <FreelancerTaxCalculationStepsView locale="en" />;
}
