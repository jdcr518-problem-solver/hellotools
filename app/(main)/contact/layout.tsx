import { Metadata } from 'next';
import React from 'react';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the HelloTools team. Suggest new calculators, report bugs, or inquire about partnerships.',
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Us | HelloTools',
    description: 'Get in touch with the HelloTools team. Suggest new calculators, report bugs, or inquire about partnerships.',
    url: `${BASE_URL}/contact`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Contact HelloTools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | HelloTools',
    description: 'Get in touch with the HelloTools team. Suggest new calculators, report bugs, or inquire about partnerships.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
