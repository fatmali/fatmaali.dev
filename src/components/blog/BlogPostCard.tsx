'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  const imgSrc = post.image || `/api/og?title=${encodeURIComponent(post.title)}`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card text-card-foreground rounded-lg overflow-hidden border border-border flex flex-col h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-48 relative overflow-hidden">
        <Image
          src={imgSrc}
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <span>{post.formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-muted-foreground mb-4 flex-grow">
          {post.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-muted text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}