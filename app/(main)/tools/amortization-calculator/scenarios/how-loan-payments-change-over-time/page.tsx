import React from 'react';
import { Metadata } from 'next';
import AmortizationPaymentsOverTimeView from '@/components/scenarios/AmortizationPaymentsOverTimeView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/amortization-calculator/scenarios/how-loan-payments-change-over-time';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Loan Payments Change Over Time: Principal vs. Interest Breakdown',
  description:
    'Learn how loan payments shift from interest-heavy to principal-heavy over time. View worked 30-year amortization milestones and identify the crossover point.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Loan Payments Change Over Time: Principal vs. Interest Breakdown',
    description:
      'Worked step-by-step example of how monthly payments transition from 83% interest in Month 1 to 99% principal in Month 360.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Loan Payments Change Over Time',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowLoanPaymentsChangeOverTimePage() {
  return <AmortizationPaymentsOverTimeView locale="en" />;
}
