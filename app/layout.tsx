import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AdsterraScripts from "@/components/AdsterraScripts";

export const metadata: Metadata = {
  title: "HelloTools - Premium Precision Utilities",
  description: "Free, secure, and lightning-fast calculators engineered for immediate results. No accounts, no data logging.",
  verification: {
    google: "nZaG7D2JHRZ7XXmPBXbUtjSdl4N1yhpQIbZd2sKYwsA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialBarScript = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR;
  const popunderScript = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER;

  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <head>
        <meta name="google-site-verification" content="nZaG7D2JHRZ7XXmPBXbUtjSdl4N1yhpQIbZd2sKYwsA" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-[#0b1329] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Suspense fallback={<div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />}>
          <Navbar />
        </Suspense>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />

        {/* Adsterra Site-wide Ad Scripts (Bypassed for Lighthouse) */}
        <AdsterraScripts 
          socialBarScript={socialBarScript} 
          popunderScript={popunderScript} 
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}




