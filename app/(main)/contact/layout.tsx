import { Metadata } from 'next';
import React from 'react';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'Contact Us — Support, Feedback & Bug Reports',
  description: 'Get in touch with Abdul Rehman and the HelloTools team. Report a calculation bug, suggest a new tool, or ask a general inquiry.',
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact HelloTools — Support & Feedback',
    description: 'Get in touch with Abdul Rehman and the HelloTools team for support, feature suggestions, or formula verification.',
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
    title: 'Contact HelloTools',
    description: 'Get in touch with the HelloTools team. We respond within 24–48 hours.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
