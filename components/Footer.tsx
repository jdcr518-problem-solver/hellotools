import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, Lock, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
              <Cpu className="h-5 w-5 text-[#1a3c5e] dark:text-blue-400" />
              <span>HelloTools</span>
            </Link>
            <p className="text-xs leading-relaxed">
              Providing instant, secure, and offline-ready calculators engineered to premium standards. We do not store or track your numeric values.
            </p>
            <p className="text-xs">&copy; {new Date().getFullYear()} HelloTools. All rights reserved.</p>
            {process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK && (
              <a 
                href={process.env.NEXT_PUBLIC_ADSTERRA_DIRECT_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-gray-400 dark:text-gray-650 hover:text-[#f97316] dark:hover:text-blue-400 hover:underline transition-colors mt-1.5 inline-block"
              >
                Sponsored
              </a>
            )}
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Categories</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/?category=finance" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">Finance Tools</Link></li>
              <li><Link href="/?category=math" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">Math &amp; Algebra</Link></li>
              <li><Link href="/?category=text" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">Text Utilities</Link></li>
              <li><Link href="/?category=health" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">Health &amp; Fitness</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="#" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-[#f97316] dark:hover:text-blue-400 transition-colors">Sitemap XML</Link></li>
            </ul>
          </div>

          {/* Verification Badges */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">Secure &amp; Verified</h4>
            <p className="text-xs leading-relaxed">
              All tools execute entirely in your web browser. No inputs are transmitted to our servers.
            </p>
            <div className="flex items-center gap-4 text-gray-400 dark:text-gray-500">
              <span title="Verified Safe"><ShieldCheck className="h-6 w-6 hover:text-green-500 transition-colors" /></span>
              <span title="Secure Encryption"><Lock className="h-6 w-6 hover:text-blue-500 transition-colors" /></span>
              <span title="Lightning Fast"><Zap className="h-6 w-6 hover:text-amber-500 transition-colors" /></span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
