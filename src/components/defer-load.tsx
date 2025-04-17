"use client";

import { useState, useEffect } from "react";

interface DeferLoadProps {
  children: React.ReactNode;
  delay?: number;
  skeleton?: React.ReactNode;
}

/**
 * A component that defers loading of non-essential content
 * This helps improve initial page load metrics for SEO
 */
export function DeferLoad({ children, delay = 200, skeleton = null }: DeferLoadProps) {
  const [isClient, setIsClient] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Defer loading of content
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isClient) return skeleton;
  if (!shouldRender) return skeleton;
  
  return <>{children}</>;
}