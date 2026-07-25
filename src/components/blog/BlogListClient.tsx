"use client";

import { useMemo, useState } from 'react';
import BlogPostCard from './BlogPostCard';
import type { BlogPost } from '@/lib/blog';
import { cn } from '@/utils/cn';

interface Props { posts: BlogPost[] }

export default function BlogListClient({ posts }: Props) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = posts.filter(p => {
    const matchesQuery = !query || (p.title + p.description).toLowerCase().includes(query.toLowerCase());
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-10">
        <input
          placeholder="Search posts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full md:max-w-sm rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-colors"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={cn('px-3 py-1 rounded-full text-xs border transition-colors', activeTag === null ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-accent hover:text-accent')}
          >All</button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn('px-3 py-1 rounded-full text-xs border transition-colors', activeTag === tag ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-accent hover:text-accent')}
            >{tag}</button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">No posts match your search.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <BlogPostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}