'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function NotFoundClient() {
  // Using useSearchParams hook inside a client component wrapped in Suspense
  const searchParams = useSearchParams();
  
  // Optional: Use searchParams for dynamic content
  const referrer = searchParams?.get('from') || '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Page Not Found</h1>
      
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        {referrer ? 
          `Oops! The route from "${referrer}" returned a classic 404. Looks like this component self-destructed.` : 
          "HTTP 404: The page you requested has been outsourced to /dev/null."}
      </p>
      
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto italic">
        {"/* The programmer responsible has been assigned to debug IE6 compatibility issues as punishment */"}
      </p>
      
      <Link 
        href="/" 
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
      >
        git checkout main
      </Link>
    </motion.div>
  );
}