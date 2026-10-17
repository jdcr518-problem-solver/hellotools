import React from 'react';
import { Metadata } from 'next';
import FreelancerTaxSetAsideReserveView from '@/components/scenarios/FreelancerTaxSetAsideReserveView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/freelancer-tax-calculator/scenarios/how-much-to-set-aside-from-each-payment';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Should I Set Aside From Each Freelance Payment? — HelloTools',
  description:
    'Learn how to establish a consistent percentage reserve from every freelance invoice to reliably cover self-employment tax, federal income tax, and quarterly estimated payments.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Should I Set Aside From Each Freelance Payment?',
    description:
      'Learn how to establish a consistent percentage reserve from every freelance invoice to reliably cover self-employment tax, federal income tax, and quarterly estimated payments.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Much to Set Aside From Freelance Payment',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FreelancerTaxSetAsideReservePage() {
  return <FreelancerTaxSetAsideReserveView locale="en" />;
}
