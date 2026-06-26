import React from 'react';
import Link from 'next/link';
import { DollarSign, Hash, FileText, Heart, Cpu, ChevronRight } from 'lucide-react';

interface ToolCardProps {
  name: string;
  slug: string;
  description: string;
  category: string;
}

export default function ToolCard({ name, slug, description, category }: ToolCardProps) {
  // Map categories to specific icons and colors
  const categoryConfig: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
    finance: {
      icon: <DollarSign className="h-5 w-5" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      text: 'text-emerald-600 dark:text-emerald-400'
    },
    math: {
      icon: <Hash className="h-5 w-5" />,
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      text: 'text-blue-600 dark:text-blue-400'
    },
    text: {
      icon: <FileText className="h-5 w-5" />,
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      text: 'text-purple-600 dark:text-purple-400'
    },
    health: {
      icon: <Heart className="h-5 w-5" />,
      bg: 'bg-rose-50 dark:bg-rose-950/30',
      text: 'text-rose-600 dark:text-rose-400'
    },
    utility: {
      icon: <Cpu className="h-5 w-5" />,
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      text: 'text-amber-600 dark:text-amber-400'
    }
  };

  const config = categoryConfig[category] || categoryConfig.utility;

  return (
    <Link 
      href={`/tools/${slug}`}
      className="group flex flex-col justify-between p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-blue-400 hover:shadow-md transition-all duration-300"
    >
      <div>
        <div className={`h-10 w-10 rounded-lg ${config.bg} ${config.text} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
          {config.icon}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] dark:group-hover:text-blue-400 transition-colors text-base mb-2">
          {name}
        </h3>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-blue-200/70 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 mt-4 group-hover:text-[#f97316] transition-colors">
        <span>Use Tool</span>
        <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
