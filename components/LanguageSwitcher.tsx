'use client';

/**
 * HelloTools — Language Switcher Component
 *
 * A Navbar dropdown that lets users switch between supported locales.
 *
 * Phase 2 behavior:
 *  - English (en) and Spanish (es) are indexable and live for all 10 pilot tools.
 *  - Other locales (de, fr, pt, ja) show a "Soon" badge and route safely to the locale homepage.
 *  - Keyboard accessible with ARIA attributes.
 */

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import {
  LOCALES,
  LOCALE_CONFIGS,
  DEFAULT_LOCALE,
  detectLocaleFromPathname,
  isPilotTool,
  Locale,
} from '@/lib/i18n';

interface LanguageSwitcherProps {
  className?: string;
}

function getTargetHref(pathname: string, targetLocale: Locale): string {
  const currentLocale = detectLocaleFromPathname(pathname);
  const targetConfig = LOCALE_CONFIGS[targetLocale];
  const rawPath =
    currentLocale !== DEFAULT_LOCALE
      ? pathname.replace(new RegExp(`^/${currentLocale}`), '') || '/'
      : pathname;

  // If target locale is not indexable yet, route to its locale landing page (/de, /fr, etc.)
  if (!targetConfig.indexable && targetLocale !== DEFAULT_LOCALE) {
    return `/${targetLocale}`;
  }

  // Check if current path is a tool page: /tools/[slug]
  const match = rawPath.match(/^\/tools\/([^/]+)$/);
  if (match) {
    const slug = match[1];
    if (isPilotTool(slug)) {
      return targetLocale === DEFAULT_LOCALE ? `/tools/${slug}` : `/${targetLocale}/tools/${slug}`;
    } else {
      return targetLocale === DEFAULT_LOCALE ? `/tools/${slug}` : `/${targetLocale}`;
    }
  }

  // General page (homepage, etc.)
  if (rawPath === '/') {
    return targetLocale === DEFAULT_LOCALE ? '/' : `/${targetLocale}`;
  }

  return targetLocale === DEFAULT_LOCALE ? rawPath : `/${targetLocale}${rawPath}`;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const currentLocale: Locale = detectLocaleFromPathname(pathname);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 h-9 px-3 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline text-xs font-semibold">
          {LOCALE_CONFIGS[currentLocale].nativeName}
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 top-full mt-1.5 w-56 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="px-3 pt-2.5 pb-1.5 border-b border-gray-100 dark:border-gray-800">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500">
              Language / Idioma / 言語
            </p>
          </div>

          {/* Locale list */}
          {LOCALES.map((locale) => {
            const config = LOCALE_CONFIGS[locale];
            const isActive = locale === currentLocale;
            const isLive = config.indexable || locale === DEFAULT_LOCALE;
            const href = getTargetHref(pathname, locale);

            return (
              <Link
                key={locale}
                href={href}
                role="option"
                aria-selected={isActive}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    {config.nativeName}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">{config.name}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {!isLive && (
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                  {isActive && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-blue-500" aria-hidden="true" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
