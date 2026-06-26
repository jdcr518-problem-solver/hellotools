import React from 'react';
import Link from 'next/link';
import { toolsMaster } from '@/data/tools-master';
import { ChevronRight } from 'lucide-react';

interface RelatedToolsProps {
  relatedSlugs: string[];
}

export default function RelatedTools({ relatedSlugs }: RelatedToolsProps) {
  // Find matching tool definitions
  const relatedList = toolsMaster.filter(t => relatedSlugs.includes(t.slug)).slice(0, 4);

  if (relatedList.length === 0) return null;

  return (
    <div className="my-12">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {relatedList.map(tool => (
          <Link 
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group block p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-blue-400 hover:shadow-md transition-all duration-300"
          >
            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] dark:group-hover:text-blue-400 transition-colors flex items-center justify-between text-sm">
              <span>{tool.name}</span>
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
