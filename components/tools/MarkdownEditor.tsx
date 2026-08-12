'use client';

import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Bold, Italic, Code, Link, List, Copy, Check, Eye, Edit2 } from 'lucide-react';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(
    `# Markdown Previewer\n\nType some markdown on the left (or top on mobile) to see it rendered instantly on the right!\n\n## Quick Features:\n- **Bold** & *Italic* text support\n- Code blocks like \`const x = 5;\`\n- Clickable [Links](https://hellotools.net)\n\n### Code Snippet Example:\n\`\`\`javascript\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\`\`\``
  );
  const [htmlPreview, setHtmlPreview] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split');
  const [isCopied, setIsCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Set up marked options
  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }, []);

  // Update HTML preview with DOMPurify sanitization
  useEffect(() => {
    try {
      const rawHtml = marked.parse(markdown) as string;
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      setHtmlPreview(cleanHtml);
    } catch (e) {
      setHtmlPreview('<p class="text-red-500 font-semibold">Failed to parse Markdown.</p>');
    }
  }, [markdown]);

  const insertMarkdown = (syntax: 'bold' | 'italic' | 'code' | 'link' | 'list') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    let replacement = '';
    switch (syntax) {
      case 'bold':
        replacement = `**${selected || 'bold text'}**`;
        break;
      case 'italic':
        replacement = `*${selected || 'italic text'}*`;
        break;
      case 'code':
        replacement = selected.includes('\n')
          ? `\`\`\`\n${selected || 'code block'}\n\`\`\``
          : `\`${selected || 'code inline'}\``;
        break;
      case 'link':
        replacement = `[${selected || 'link text'}](https://example.com)`;
        break;
      case 'list':
        replacement = `\n- ${selected || 'list item'}`;
        break;
    }

    const updatedText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdown(updatedText);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  };

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(htmlPreview);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-100">
      
      {/* Editor Toolbar & Split Controls */}
      <div className="flex flex-wrap justify-between items-center bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800/80 rounded-xl p-2 gap-2 shadow-sm">
        
        {/* Formatting actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => insertMarkdown('bold')}
            title="Bold"
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertMarkdown('italic')}
            title="Italic"
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertMarkdown('code')}
            title="Code Block"
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertMarkdown('link')}
            title="Link"
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
          >
            <Link className="h-4 w-4" />
          </button>
          <button
            onClick={() => insertMarkdown('list')}
            title="Bullet List"
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition cursor-pointer"
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* View Mode controls */}
        <div className="flex items-center gap-2">
          
          <div className="flex bg-gray-100 dark:bg-gray-850 rounded-lg p-0.5 overflow-hidden">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'editor' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
              }`}
            >
              <Edit2 className="h-3 w-3" />
              <span className="hidden sm:inline">Write</span>
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'split' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
              }`}
            >
              <span className="hidden sm:inline">Split View</span>
              <span className="sm:hidden">Split</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'preview' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-slate-550'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span className="hidden sm:inline">Preview</span>
            </button>
          </div>

          <button
            onClick={handleCopyHTML}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-sm transition cursor-pointer"
          >
            {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{isCopied ? 'Copied HTML' : 'Copy HTML'}</span>
          </button>

        </div>

      </div>

      {/* Editor & Preview Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[450px]">
        
        {/* Markdown Raw Editor (White Card) */}
        {(activeTab === 'editor' || activeTab === 'split') && (
          <div className={`${activeTab === 'editor' ? 'lg:col-span-12' : 'lg:col-span-6'} bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-150 dark:border-gray-800/80 shadow-sm flex flex-col`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Markdown Editor</span>
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full flex-1 min-h-[350px] p-3 border border-gray-250 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-sm font-semibold font-mono focus:outline-none resize-none leading-relaxed"
            />
          </div>
        )}

        {/* HTML Rendered Preview (Navy Card) */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className={`${activeTab === 'preview' ? 'lg:col-span-12' : 'lg:col-span-6'} bg-[#1a3c5e] text-white dark:bg-blue-950/20 border border-transparent dark:border-blue-900/30 rounded-2xl p-5 shadow-md flex flex-col`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 dark:text-blue-400 block mb-2">Live Render Preview</span>
            <div className="w-full flex-1 min-h-[350px] p-4 bg-blue-900/15 dark:bg-blue-950/40 border border-blue-800/25 dark:border-blue-900/10 rounded-xl overflow-y-auto">
              <div
                className="prose prose-sm prose-invert max-w-none focus:outline-none break-words leading-relaxed"
                dangerouslySetInnerHTML={{ __html: htmlPreview || '<p class="text-blue-300">Nothing to preview...</p>' }}
              />
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
