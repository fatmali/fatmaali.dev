'use client';

import { useEffect, useRef, useState } from 'react';

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

export default function Turnstile({
  siteKey,
  onVerify,
  theme = 'auto',
  size = 'normal',
}: TurnstileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Stable onVerify reference
  const onVerifyRef = useRef(onVerify);
  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  // Load the Cloudflare Turnstile script
  useEffect(() => {
    const scriptId = 'cf-turnstile-script';
    
    // Check if script is already loaded
    if (document.getElementById(scriptId)) {
      setIsLoaded(true);
      return;
    }
    
    // Create and load script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    
    document.head.appendChild(script);
    
    return () => {
      // No need to remove the script as it should be kept for the entire session
    };
  }, []);
  
  // Initialize the widget when the script is loaded
  useEffect(() => {
    // Clean up any previous widgets to prevent multiple instances
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
    
    if (!isLoaded || !ref.current || typeof window.turnstile === 'undefined') {
      return;
    }
    
    // Create a stable callback that doesn't trigger rerenders
    const handleVerify = (token: string) => {
      onVerifyRef.current(token);
    };
    
    // Render the widget with a timeout to ensure the DOM is ready
    const renderWidget = () => {
      if (!ref.current) return;
      
      try {
        const widgetId = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: handleVerify,
          theme,
          size,
          'refresh-expired': 'auto',
          'retry-interval': 10000, // Wait 10 seconds before retrying on error
        });
        
        widgetIdRef.current = widgetId;
      } catch (error) {
        console.error('Error rendering Turnstile widget:', error);
      }
    };
    
    // Small delay to prevent race conditions
    const timeoutId = setTimeout(renderWidget, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (error) {
          console.error('Error removing Turnstile widget:', error);
        }
      }
    };
  }, [isLoaded, siteKey, theme, size]);

  return <div ref={ref} className="cf-turnstile mt-4" data-theme={theme} />;
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
        'refresh-expired'?: string;
        'retry-interval'?: number;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}