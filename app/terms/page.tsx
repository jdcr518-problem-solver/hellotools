import React from 'react';
import { ShieldAlert, CheckCircle, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-12 text-center shadow-xl sm:px-12 my-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <ShieldAlert className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Usage Agreement</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-blue-100/70">
            Last Updated: June 2026. Please read the rules governing the use of HelloTools.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        
        {/* Intro */}
        <section className="space-y-3">
          <p>
            Welcome to HelloTools (referred to as "we", "us", or "our"). By accessing or using our website located at `hellotools.net` (the "Site") and our suite of free online calculators and web tools (the "Services"), you agree to comply with and be bound by the following Terms of Service.
          </p>
          <p>
            If you do not agree with any part of these terms, please discontinue your use of our Site and Services immediately.
          </p>
        </section>

        {/* 1. License & Permitted Use */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            1. Permitted Use &amp; User License
          </h2>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable license to access and use our online tools for personal, educational, or professional computations.
          </p>
          <p className="font-semibold">You agree not to use the Site or Services to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Attempt to reverse engineer, scrape, or programmatically extract the source code or database values from our tools.</li>
            <li>Use automated bots or scripts to query the calculators in a manner that causes degradation of service or server load.</li>
            <li>Incorporate our tools into third-party frame overlays (iFrames) without written permission.</li>
          </ul>
        </section>

        {/* 2. Calculation Accuracy & Disclaimers */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            2. Accuracy of Calculations &amp; Disclaimers
          </h2>
          <p>
            While we strive to ensure that all formulas, algorithms, and calculators are accurate and free of mathematical errors, **all outputs are provided on an "as-is" and "as-available" basis.**
          </p>
          
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 space-y-3">
            <div className="flex items-center gap-2 text-orange-850 dark:text-orange-300 font-bold">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <span>Financial &amp; Medical Disclaimers:</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xs text-orange-950 dark:text-orange-200/90">
              <li><strong>No Financial Advice:</strong> Financial calculators (like the EMI or Mortgage calculator) are for estimate purposes only. Do not use them as the sole basis for taking out loans or signing legal contracts. Verify all terms with a licensed financial professional.</li>
              <li><strong>No Medical Advice:</strong> Health utilities (like the BMI or Body Fat calculator) are for educational informational purposes only and do not substitute for professional medical advice, diagnosis, or treatment.</li>
            </ul>
          </div>
        </section>

        {/* 3. Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            3. Intellectual Property Rights
          </h2>
          <p>
            The Site design, logo, branding, custom styling, layout patterns, and specialized TypeScript computing algorithms are the exclusive intellectual property of HelloTools and are protected by international copyright and trademark laws.
          </p>
        </section>

        {/* 4. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall HelloTools, its developers, or its affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages (including loss of profits, data, or financial loss) arising out of your use or inability to use our tools, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        {/* 5. Changes to the Terms */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            5. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will indicate changes by updating the "Last Updated" date at the top of this page. Your continued use of the Site after revisions are posted constitutes acceptance of those changes.
          </p>
        </section>

        {/* 6. Contact Support */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            6. Contact Support
          </h2>
          <p>
            If you have questions regarding these terms, please contact us at:
          </p>
          <div className="flex items-center gap-2 font-semibold">
            <Mail className="h-4 w-4 text-[#f97316]" />
            <span>Email: <a href="mailto:contact@hellotools.net" className="hover:text-[#f97316] underline">contact@hellotools.net</a></span>
          </div>
        </section>

      </div>
    </div>
  );
}
