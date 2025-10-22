"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
            className="grid gap-6 md:grid-cols-2 lg:gap-8"
          >
            {filtered.map((post, i) => {
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:bg-card/95 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Image Section */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                        <time dateTime={post.date} className="font-medium">
                          {post.formattedDate}
                        </time>
                        <span className="text-muted-foreground/40">•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {post.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Read more indicator */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary pt-2">
                        <span>Read article</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
