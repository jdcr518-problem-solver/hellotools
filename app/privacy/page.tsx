import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-12 text-center shadow-xl sm:px-12 my-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Shield className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Privacy First Policy</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-blue-100/70">
            Last Updated: June 2026. Learn how we protect your digital footprint on HelloTools.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
        
        {/* Quick Summary Box */}
        <section className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-[#f97316]" />
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Our Core Promise</h3>
          </div>
          <p className="text-sm">
            HelloTools is engineered to operate directly in your web browser. All calculations, text analysis, and developer conversions are performed locally on your computer. **Your raw inputs never touch our servers.**
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            1. Information We Collect
          </h2>
          <p className="text-sm">
            We do not collect or store any personal data or input values entered into our calculators and utility tools. Any numbers, formulas, or text you input remain completely private inside your local browser memory and are deleted once the tab is closed.
          </p>
          <p className="text-sm font-semibold">
            We do, however, collect anonymous diagnostic data through third-party tools to help optimize site performance:
          </p>
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li><strong>Analytics & Diagnostics:</strong> We use Vercel Analytics and Speed Insights to record anonymous pageviews, load speeds, and device/browser categories. No IP addresses or identifying details are logged.</li>
            <li><strong>Log Data:</strong> Like most websites, our host automatically collects server logs (e.g., HTTP request methods, response codes, and referral page urls) for stability and security monitoring.</li>
          </ul>
        </section>

        {/* 2. Google AdSense & Advertising Cookies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            2. Google AdSense &amp; Third-Party Cookies
          </h2>
          <p className="text-sm">
            We serve advertisements through Google AdSense to keep our service 100% free. Google and third-party vendors use cookies to serve ads based on your previous visits to our website or other sites on the internet.
          </p>
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 text-sm space-y-3">
            <p className="font-semibold text-orange-850 dark:text-orange-300">Important Cookie Info:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>Google’s use of advertising cookies enables it and its partners to serve ads based on your visit to HelloTools and other sites on the Internet.</li>
              <li>You may opt-out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f97316]">Google Ads Settings</a> page.</li>
              <li>Alternatively, you can opt-out of a third-party vendor's use of cookies for personalized advertising by visiting the <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f97316]">www.aboutads.info</a> page.</li>
            </ul>
          </div>
        </section>

        {/* 3. GDPR & CCPA Compliance */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            3. Your Privacy Rights (GDPR &amp; CCPA)
          </h2>
          <p className="text-sm">
            Depending on your location, you may have specific data rights:
          </p>
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li><strong>GDPR (European Users):</strong> Under the General Data Protection Regulation, you have the right to request access to, correction of, or deletion of any telemetry data we hold. Since we store no personal IDs, there is typically no data linked to your identity.</li>
            <li><strong>CCPA (California Users):</strong> Under the California Consumer Privacy Act, you have the right to know what personal data is collected and opt out of the "sale" of personal data (which includes personalized advertising cookie collection). You can control your ad preferences using the links in Section 2.</li>
          </ul>
        </section>

        {/* 4. Data Security */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            4. Data Security
          </h2>
          <p className="text-sm">
            We use industry-standard HTTPS/TLS encryption to secure all transmissions between your browser and our servers. Because all calculations take place within your local browser, your numeric inputs are shielded from network intercepts and server database leaks.
          </p>
        </section>

        {/* 5. Contact Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            5. Contact Us
          </h2>
          <p className="text-sm">
            If you have any questions or feedback about this Privacy Policy, please feel free to reach out to us:
          </p>
          <div className="flex items-center gap-3 text-sm font-semibold mt-2">
            <Mail className="h-5 w-5 text-[#f97316]" />
            <span>Email: <a href="mailto:contact@hellotools.net" className="hover:text-[#f97316] underline">contact@hellotools.net</a></span>
          </div>
        </section>

      </div>
    </div>
  );
}
