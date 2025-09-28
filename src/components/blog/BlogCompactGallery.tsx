"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface BlogCompactGalleryProps { posts: BlogPost[]; query?: string }



export default function BlogCompactGallery({ posts, query: externalQuery }: BlogCompactGalleryProps) {
  const query = externalQuery ?? "";

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter(p => {
      const haystack = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, query]);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Search removed here; now externally controlled via parent */}

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground/80">
        <span>
          Showing <strong className="text-foreground">{filtered.length}</strong> of {posts.length} posts
        </span>
        {query && <span className="text-muted-foreground/70">Query: {query}</span>}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl border border-dashed border-border bg-muted/30 px-10 py-20 text-center"
          >
            <p className="text-2xl mb-3">📝</p>
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">Try another tag or clear the search.</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((post, i) => {
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group relative rounded-3xl border border-border/70 bg-background/90 p-5 md:p-6 flex flex-col gap-4 shadow-sm shadow-primary/5 transition hover:shadow-md hover:border-primary/50"
                >
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-muted-foreground/70">
                      <span className="truncate max-w-[55%]" title={post.formattedDate}>{post.formattedDate}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-base font-semibold leading-snug md:text-lg lg:text-xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-block text-foreground/90 hover:text-primary transition-colors drop-shadow-sm"
                      >
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                  <div className="relative z-10 mt-auto pt-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read article ${post.title}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground px-5 py-2 text-[11px] font-semibold tracking-[0.25em] shadow-md shadow-primary/30 ring-1 ring-primary/50 transition hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground/80 opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
                      </span>
                      <span>Read</span>
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
