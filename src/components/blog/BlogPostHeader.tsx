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
      
      {/* Hero section with background image */}
      <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
        {/* Background Image */}
        <Image
          src={imgSrc}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 720px, 1200px"
          priority
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white max-w-4xl">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-200">
            <span>{post.formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}