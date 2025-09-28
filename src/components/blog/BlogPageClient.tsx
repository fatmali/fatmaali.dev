"use client";

import { useMemo, useState } from "react";
import BlogCompactGallery from "@/components/blog/BlogCompactGallery";
import type { BlogPost } from "@/lib/blog";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPageClientProps { posts: BlogPost[] }

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => set.add(t)));
    return Array.from(set).sort((a,b)=>a.localeCompare(b));
  }, [posts]);

  const tagSuggestions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return allTags.slice(0,8);
    return allTags.filter(t => t.toLowerCase().includes(needle)).slice(0,8);
  }, [allTags, query]);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-10">
      {/* Hero row with heading + search aligned */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold leading-tight sm:text-[2.5rem]">Engineering articles & notes.</h1>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Deep dives, architecture notes, performance tuning stories, and practical experiments with AI tooling, React, TypeScript, and scalable web systems. Browse, search, and jump into a post.
          </p>
        </div>
        <div className="w-full max-w-md lg:max-w-sm relative">
          <label htmlFor="blog-search" className="sr-only">Search posts</label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(()=>setShowSuggestions(false), 120)}
            placeholder="Search title, description, or tag"
            className="w-full rounded-full border border-border bg-background/80 backdrop-blur px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={()=>setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
            >Clear</button>
          )}
          <AnimatePresence>
            {showSuggestions && tagSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute z-30 mt-2 w-full rounded-2xl border border-border bg-background/95 backdrop-blur p-2 shadow-lg"
              >
                <p className="px-2 pb-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {tagSuggestions.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onMouseDown={() => setQuery(tag)}
                      className="px-2 py-1 rounded-full text-[10px] font-medium border border-border/60 bg-muted/40 hover:bg-muted/70 transition text-muted-foreground"
                    >{tag}</button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Extra vertical space only on mobile & tablet (removed on large screens) */}
      <div className="min-h-[65vh] md:min-h-[45vh] sm:min-h-0 flex flex-col">
        <BlogCompactGallery posts={posts} query={query} />
      </div>
    </section>
  );
}
