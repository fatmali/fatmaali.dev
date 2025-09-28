"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const imgSrc = post.image || `/api/og?title=${encodeURIComponent(post.title)}`;
  return (
    <motion.header 
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Breadcrumb navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center text-muted-foreground mb-8">
        <span>{post.formattedDate}</span>
        <span className="mx-2">•</span>
        <span>{post.readTime}</span>
      </div>
      
      <div className="relative h-72 w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 720px, 1200px"
          priority
        />
      </div>
    </motion.header>
  );
}