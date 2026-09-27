import React from 'react';
import Link from 'next/link';
import { Stethoscope, DollarSign, Info } from 'lucide-react';

interface DisclaimerBoxProps {
  /** 'finance' renders an amber financial disclaimer;
   *  'health'   renders a rose medical disclaimer;
   *  'general'  renders a neutral blue notice. */
  type: 'finance' | 'health' | 'general';
  /** Additional Tailwind classes for outer spacing / margin. */
  className?: string;
  /** compact=true → single-line inline callout (used directly under calculators).
   *  compact=false (default) → full two-line card (used in blog posts). */
  compact?: boolean;
}

const CONFIG = {
  finance: {
    Icon: DollarSign,
    title: 'Financial Disclaimer',
    text: 'Calculations and results are mathematical estimates for planning purposes only and do not constitute certified financial, tax, or investment advice. Verify all terms with a licensed financial advisor or lending officer.',
    wrapCls: 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-950 dark:text-amber-200',
    iconCls: 'text-[#f97316]',
  },
  health: {
    Icon: Stethoscope,
    title: 'Medical & Health Disclaimer',
    text: 'This calculator provides general statistical benchmarks based on clinical population formulas (e.g. WHO, Mifflin-St Jeor) and is not a substitute for professional medical advice, diagnosis, or clinical care. Always consult a qualified physician.',
    wrapCls: 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200',
    iconCls: 'text-rose-500',
  },
  general: {
    Icon: Info,
    title: 'Notice',
    text: 'Calculations are executed client-side in your browser on an "as-is" basis for informational and educational use only.',
    wrapCls: 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30 text-blue-950 dark:text-blue-200',
    iconCls: 'text-blue-500',
  },
} as const;

export default function DisclaimerBox({
  type,
  className = '',
  compact = false,
}: DisclaimerBoxProps) {
  const { Icon, title, text, wrapCls, iconCls } = CONFIG[type] ?? CONFIG.general;

  if (compact) {
    return (
      <aside
        aria-label={title}
        className={`flex items-start gap-2.5 p-3.5 rounded-xl border text-xs leading-relaxed ${wrapCls} ${className}`}
      >
        <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${iconCls}`} aria-hidden="true" />
        <p>
          <span className="font-bold">{title}: </span>
          {text}{' '}
          <Link
            href="/terms"
            className="underline font-semibold hover:text-[#f97316] transition-colors"
          >
            Full Terms &amp; Disclaimers →
          </Link>
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label={title}
      className={`p-5 rounded-2xl border ${wrapCls} ${className}`}
    >
      <div className="flex items-center gap-2 mb-2 font-bold text-sm">
        <Icon className={`h-4 w-4 shrink-0 ${iconCls}`} aria-hidden="true" />
        <span>{title}</span>
      </div>
      <p className="text-xs leading-relaxed opacity-90">
        {text} For our full calculation methodology and limitation-of-liability statement, see our{' '}
        <Link
          href="/terms"
          className="underline font-semibold hover:text-[#f97316] transition-colors"
        >
          Terms &amp; Disclaimers
        </Link>
        .
      </p>
    </aside>
  );
}
