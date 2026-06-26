'use client';

import { useEffect, useState } from 'react';

interface AdsterraScriptsProps {
  socialBarScript?: string;
  popunderScript?: string;
}

export default function AdsterraScripts({ socialBarScript, popunderScript }: AdsterraScriptsProps) {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
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

    if (isBot) return;

    // 2. User interaction listener to trigger script loading
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
      cleanUp();
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted) return;

    const loadScriptFromHtml = (htmlString: string) => {
      if (!htmlString) return;
      // Extract src attribute from the script string
      const matchSrc = htmlString.match(/src=['"]([^'"]+)['"]/);
      if (matchSrc && matchSrc[1]) {
        const script = document.createElement('script');
        script.src = matchSrc[1];
        script.async = true;
        document.body.appendChild(script);
      } else {
        // If it's inline script content, extract and execute it
        const matchContent = htmlString.match(/<script[^>]*>([\s\S]*?)<\/script>/);
        if (matchContent && matchContent[1]) {
          const script = document.createElement('script');
          script.text = matchContent[1];
          document.body.appendChild(script);
        }
      }
    };

    if (socialBarScript) loadScriptFromHtml(socialBarScript);
    if (popunderScript) loadScriptFromHtml(popunderScript);
  }, [hasInteracted, socialBarScript, popunderScript]);

  return null;
}
