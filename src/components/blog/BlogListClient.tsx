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
          className="w-full md:max-w-sm rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={cn('px-2 py-1 rounded-md text-xs border', activeTag === null ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted hover:bg-muted/70')}
          >All</button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn('px-2 py-1 rounded-md text-xs border transition', activeTag === tag ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted hover:bg-muted/70')}
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