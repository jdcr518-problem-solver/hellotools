import React from 'react';
import { Metadata } from 'next';
import MortgageDownPaymentView from '@/components/scenarios/MortgageDownPaymentView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/mortgage-calculator/scenarios/how-down-payment-affects-mortgage';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Does a Larger Down Payment Change Your Mortgage? – Down Payment Analysis',
  description:
    'Compare 5%, 10%, 15%, and 20% down payments on a $300k home. See how 20% eliminates PMI fees, lowers monthly payments, and saves over $37,000 in interest.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Does a Larger Down Payment Change Your Mortgage? – Down Payment Analysis',
    description:
      'Detailed breakdown of down payment tiers: discover how increasing upfront equity removes PMI and drastically reduces mortgage interest.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mortgage Down Payment Comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowDownPaymentAffectsMortgagePage() {
  return <MortgageDownPaymentView locale="en" />;
}
