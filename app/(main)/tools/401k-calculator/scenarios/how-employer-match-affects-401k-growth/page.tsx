import React from 'react';
import { Metadata } from 'next';
import FourOhOneKEmployerMatchView from '@/components/scenarios/FourOhOneKEmployerMatchView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/401k-calculator/scenarios/how-employer-match-affects-401k-growth';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Employer Match Affects Your 401(k) Growth — HelloTools',
  description:
    'Discover how company matching contributions provide an immediate boost to your savings and compound into hundreds of thousands of dollars in extra retirement wealth.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Employer Match Affects Your 401(k) Growth',
    description:
      'Discover how company matching contributions provide an immediate boost to your savings and compound into hundreds of thousands of dollars in extra retirement wealth.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Employer Match Affects Your 401(k) Growth',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FourOhOneKEmployerMatchPage() {
  return <FourOhOneKEmployerMatchView locale="en" />;
}
