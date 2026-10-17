import React from 'react';
import { Metadata } from 'next';
import EmiExtraPaymentView from '@/components/scenarios/EmiExtraPaymentView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/emi-calculator/scenarios/emi-extra-payment-savings';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Interest Can I Save by Paying Extra Each Month?',
  description:
    'Learn how an extra monthly payment above your standard EMI reduces your loan repayment period and total interest. Worked example with a comparison table.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Interest Can I Save by Paying Extra Each Month?',
    description:
      'Worked example showing how an additional $100/month on top of your EMI shortens the loan term and reduces total interest paid.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Extra EMI payment savings',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function EmiExtraPaymentPage() {
  return <EmiExtraPaymentView locale="en" />;
}
