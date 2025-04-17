'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

// Replace this with your actual Google Analytics measurement ID when you have it
const GA_MEASUREMENT_ID = "G-GF72R3HK3X";
declare global {
  interface Window {
    gtag: (command: string, action: string, params: unknown) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { 
  action: string; 
  category?: string; 
  label?: string; 
  value?: number;
}) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Common events that can be used throughout the site
export const trackEvents = {
  // CV download tracking
  trackCVDownload: () => {
    event({
      action: 'download',
      category: 'cv',
      label: 'resume_download',
    });
  },
  
  // External link clicks
  trackExternalLinkClick: (url: string, label: string = 'external_link') => {
    event({
      action: 'click',
      category: 'outbound',
      label: `${label}: ${url}`,
    });
  },
  
  // Contact form submissions
  trackContactSubmit: (success: boolean) => {
    event({
      action: 'submit',
      category: 'contact',
      label: success ? 'success' : 'failure',
    });
  },
  
  // Project view/clicks
  trackProjectClick: (projectName: string) => {
    event({
      action: 'click',
      category: 'project',
      label: projectName,
    });
  },
  
  // Blog engagement
  trackBlogEngagement: (slug: string, action: 'view' | 'complete' | 'share') => {
    event({
      action,
      category: 'blog',
      label: slug,
    });
  },
  
  // Scroll depth tracking
  trackScrollDepth: (depth: number) => {
    event({
      action: 'scroll',
      category: 'engagement',
      label: `scroll_depth_${depth}`,
      value: depth,
    });
  }
};

// Create a client-only analytics handler component to safely use useSearchParams
function AnalyticsHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    
    // When the route changes, log a page view
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  // Track scroll depth
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const scrollDepthPoints = [25, 50, 75, 90];
    const trackedScrollPoints: number[] = [];

    const handleScroll = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      // Track each scroll depth threshold once per page view
      scrollDepthPoints.forEach(point => {
        if (scrollPercent >= point && !trackedScrollPoints.includes(point)) {
          trackedScrollPoints.push(point);
          trackEvents.trackScrollDepth(point);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]); // Reset tracked points when page changes

  return null;
}

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <AnalyticsHandler />
    </>
  );
}