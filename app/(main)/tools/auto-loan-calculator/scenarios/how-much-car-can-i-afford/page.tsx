import React from 'react';
import { Metadata } from 'next';
import AutoLoanAffordabilityView from '@/components/scenarios/AutoLoanAffordabilityView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/auto-loan-calculator/scenarios/how-much-car-can-i-afford';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Car Can I Afford? – Auto Loan Affordability Scenarios',
  description:
    'Find out how much car you can afford across price tiers from $25,000 to $55,000. Includes worked step-by-step calculations for monthly payments, sales tax, fees, and interest.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Car Can I Afford? – Auto Loan Affordability Scenarios',
    description:
      'Worked auto affordability calculations across multiple vehicle price tiers using standard 60-month loan terms, sales tax, and doc fees.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Auto Loan Affordability Calculation',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowMuchCarCanIAffordPage() {
  return <AutoLoanAffordabilityView locale="en" />;
}
