"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

interface BlogPostFooterProps {
  author: string;
  relatedPosts: BlogPost[];
}

export default function BlogPostFooter({ author, relatedPosts }: BlogPostFooterProps) {
  return (
    <>
      {/* Author info */}
      <motion.div 
        className="mt-16 pt-8 border-t border-border flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
          <Image 
            src="/images/headshot.JPG" 
            alt={author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{author}</h3>
          <p className="text-sm text-muted-foreground">
            Frontend Engineer specializing in React, TypeScript, and Next.js
          </p>
        </div>
      </motion.div>
      
      {/* Related posts - great for SEO internal linking */}
      {relatedPosts.length > 0 && (
        <motion.section 
          className="mt-16 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <div key={post.slug} className="bg-card text-card-foreground rounded-lg overflow-hidden border border-border">
                <div className="h-32 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </>
  );
}