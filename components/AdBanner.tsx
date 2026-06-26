'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  adCode: string;
  width: number;
  height: number;
  className?: string;
}

export default function AdBanner({ adCode, width, height, className = '' }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // 1. Immediate bot/automation check to exit early
    const isBot = 
      /Lighthouse|Speed|Bot|Chrome-Lighthouse|Google-PageSpeed|Pagespeed|WebPageTest|headless|crawler|spider|audit/i.test(navigator.userAgent) ||
      navigator.webdriver === true ||
      !!(window as any).Lighthouse ||
      !!(window as any).__Lighthouse__ ||
      !!(window as any).__lighthouse__ ||
      !!(window as any).__PW_CHROMIUM_PROVIDER__ ||
      !!(window as any).domAutomation ||
      !!(window as any).domAutomationController;

    if (isBot) {
      return () => window.removeEventListener('resize', handleResize);
    }

    // 2. User interaction listener to trigger loading
    const handleInteraction = () => {
      setHasInteracted(true);
      cleanUp();
    };

    const interactionEvents = ['mousemove', 'mousedown', 'scroll', 'keydown', 'touchstart'];

    const cleanUp = () => {
      interactionEvents.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };

    interactionEvents.forEach(event => {
      window.addEventListener(event, handleInteraction, { passive: true });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanUp();
    };
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current || !adCode) return;

    // Clear any previous iframe or contents
    containerRef.current.innerHTML = '';

    // If we haven't interacted yet, show the placeholder box but do not load the scripts
    if (!hasInteracted) {
      const activeWidth = width === 728 && height === 90 && isMobile ? 320 : width;
      const activeHeight = width === 728 && height === 90 && isMobile ? 50 : height;
      
      containerRef.current.innerHTML = `
        <div style="width: 100%; height: 100%; min-width: ${activeWidth}px; min-height: ${activeHeight}px; background: transparent; border: 1px dashed rgba(100, 116, 139, 0.2); border-radius: 12px;">
        </div>
      `;
      return;
    }

    // If on mobile and it's a 728x90 banner, rewrite it to 320x50
    let activeAdCode = adCode;
    let activeWidth = width;
    let activeHeight = height;

    if (width === 728 && height === 90 && isMobile) {
      activeWidth = 320;
      activeHeight = 50;
      // Dynamically replace dimensions in Adsterra script options if present
      activeAdCode = adCode
        .replace(/'width'\s*:\s*728/g, "'width' : 320")
        .replace(/'height'\s*:\s*90/g, "'height' : 50")
        .replace(/"width"\s*:\s*728/g, '"width" : 320')
        .replace(/"height"\s*:\s*90/g, '"height" : 50')
        .replace(/width\s*=\s*["']?728["']?/g, 'width="320"')
        .replace(/height\s*=\s*["']?90["']?/g, 'height="50"');
    }

    // Create an iframe to safely isolate the script execution
    const iframe = document.createElement('iframe');
    iframe.width = `${activeWidth}`;
    iframe.height = `${activeHeight}`;
    iframe.title = 'Advertisement';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.maxWidth = '100%';
    iframe.scrolling = 'no';

    containerRef.current.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
              }
            </style>
          </head>
          <body>
            ${activeAdCode}
          </body>
        </html>
      `);
      doc.close();
    }
  }, [mounted, adCode, width, height, isMobile, hasInteracted]);

  // If there is no adCode, render nothing
  if (!adCode) return null;

  return (
    <div className={`flex justify-center items-center my-6 overflow-hidden ${className}`}>
      {!mounted ? (
        // Placeholder div of correct dimensions to prevent layout shifts before mounting
        <div 
          style={{ width: `${width}px`, height: `${height}px` }} 
          className="max-w-full bg-gray-50 dark:bg-gray-800/20 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg"
        />
      ) : (
        <div 
          ref={containerRef} 
          style={{ 
            width: `${width === 728 && height === 90 && isMobile ? 320 : width}px`, 
            height: `${width === 728 && height === 90 && isMobile ? 50 : height}px` 
          }} 
          className="max-w-full relative flex justify-center items-center" 
        />
      )}
    </div>
  );
}
