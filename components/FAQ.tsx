'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/data/tools-master';

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="my-10 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-[#f97316]" />
        <span>Frequently Asked Questions</span>
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="border-b border-gray-100 dark:border-gray-850 last:border-b-0 pb-3 last:pb-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between py-2 text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-[#f97316] transition-colors"
              >
                <span className="text-sm">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#f97316]' : 'text-gray-400'}`} />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-xs leading-relaxed text-slate-600 dark:text-blue-200/70 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg border border-gray-100/50 dark:border-gray-800">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
