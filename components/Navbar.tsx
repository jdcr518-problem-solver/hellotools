'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Cpu, Search, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { toolsMaster } from '@/data/tools-master';

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Group tools by category
  const categories = {
    finance: { name: 'Finance', tools: toolsMaster.filter(t => t.category === 'finance') },
    math: { name: 'Mathematics', tools: toolsMaster.filter(t => t.category === 'math') },
    text: { name: 'Text & Writing', tools: toolsMaster.filter(t => t.category === 'text') },
    health: { name: 'Health & Fitness', tools: toolsMaster.filter(t => t.category === 'health') },
    utility: { name: 'Developer & Utilities', tools: toolsMaster.filter(t => t.category === 'utility') },
  };

  // Sync search input with URL query param if on homepage
  useEffect(() => {
    const search = searchParams?.get('search') || '';
    setSearchQuery(search);
  }, [searchParams]);

  // Handle dark mode initialization and change
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    // Realtime search updates if we are on homepage
    if (window.location.pathname === '/') {
      router.replace(`/?search=${encodeURIComponent(val)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#1a3c5e] dark:text-blue-400">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#1a3c5e] dark:text-blue-400">
            <Cpu className="h-5 w-5" />
          </div>
          <span>HelloTools</span>
        </Link>

        {/* Quick Search (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:relative md:flex md:w-full md:max-w-xs items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search tools..."
            aria-label="Search tools"
            className="w-full h-9 pl-9 pr-4 text-sm rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a3c5e] dark:focus:ring-blue-500 transition-all"
          />
        </form>

        {/* Navigation Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5 text-sm font-semibold text-gray-600 dark:text-gray-300">
            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/" 
                className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                All Tools
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </Link>
            </div>
            <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link>
            <Link href="/tools/emi-calculator" className="hover:text-gray-900 dark:hover:text-white transition-colors">EMI Calculator</Link>
          </nav>

          {/* Sliding Switch Toggle Button */}
          <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-1">
            <Sun className={`h-4 w-4 cursor-pointer transition-colors ${!isDarkMode ? 'text-[#f97316]' : 'text-gray-400'}`} onClick={toggleTheme} />
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200 dark:bg-blue-900/80"
              aria-label="Toggle dark mode"
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
            <Moon className={`h-4 w-4 cursor-pointer transition-colors ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`} onClick={toggleTheme} />
          </div>

          <button className="h-9 px-4 text-xs font-bold rounded-lg border border-[#1a3c5e] dark:border-blue-400 text-[#1a3c5e] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            Sign In
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 md:hidden animate-slide-up">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tools..."
              aria-label="Search tools"
              className="w-full h-9 pl-9 pr-4 text-sm rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
            />
          </form>
          <nav className="flex flex-col gap-3 font-semibold text-gray-600 dark:text-gray-300">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white py-1">All Tools</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white py-1">Blog</Link>
            <Link href="/tools/emi-calculator" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white py-1">EMI Calculator</Link>
            <Link href="/tools/age-calculator" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white py-1">Age Calculator</Link>
          </nav>
        </div>
      )}

      {/* Mega Menu Dropdown */}
      {megaMenuOpen && (
        <div 
          className="absolute top-16 left-0 right-0 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-50 animate-fade-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-6 grid grid-cols-5 gap-6">
            {Object.entries(categories).map(([key, cat]) => (
              <div key={key} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {cat.name}
                </h4>
                <ul className="space-y-1">
                  {cat.tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link 
                        href={`/tools/${tool.slug}`}
                        onClick={() => setMegaMenuOpen(false)}
                        className="block text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all py-0.5 truncate hover:translate-x-1 duration-150"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
