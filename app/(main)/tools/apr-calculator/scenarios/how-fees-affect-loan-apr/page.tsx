import React from 'react';
import { Metadata } from 'next';
import AprFeesImpactView from '@/components/scenarios/AprFeesImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/apr-calculator/scenarios/how-fees-affect-loan-apr';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Fees Affect the APR of a Loan — HelloTools',
  description:
    'Discover how upfront financing charges, origination points, and loan duration determine your effective APR and total out-of-pocket borrowing costs.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Fees Affect the APR of a Loan',
    description:
      'Discover how upfront financing charges, origination points, and loan duration determine your effective APR and total out-of-pocket borrowing costs.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Fees Affect the APR of a Loan',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowFeesAffectLoanAprPage() {
  return <AprFeesImpactView locale="en" />;
}
