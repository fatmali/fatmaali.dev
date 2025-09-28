import BlogHeader from "@/components/blog/BlogHeader";
import { getAllPosts } from "@/lib/blog";
import BlogListClient from '@/components/blog/BlogListClient';
import { Metadata } from "next";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Blog | Fatma Ali — AI, Engineering, Web Performance",
  description: "Engineering notes & articles on AI-powered productivity, scalable web architecture, React, TypeScript, Next.js, performance, DX, and system design.",
  alternates: {
    canonical: 'https://fatmaali.dev/blog'
  },
  openGraph: {
    type: 'article',
    url: 'https://fatmaali.dev/blog',
    title: 'Blog | Fatma Ali — AI, Engineering, Web Performance',
    description: 'Articles on AI-powered productivity, scalable systems, React, TypeScript, Next.js, and engineering craft.',
    siteName: 'Fatma Ali Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Fatma Ali — AI, Engineering, Web Performance',
    description: 'AI productivity, React, TypeScript, Next.js, scalable systems, performance & DX.',
  }
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Script
        id="blog-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Engineering Blog — Fatma Ali',
            description: 'Articles about AI productivity, scalable web architecture, React, TypeScript, Next.js, performance, DX, and system design.',
            url: 'https://fatmaali.dev/blog'
          })
        }}
      />
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 container mx-auto">
        <BlogHeader />
      </section>
      <section className="pb-32 px-4 sm:px-6 lg:px-8 container mx-auto">
        <BlogListClient posts={posts} />
      </section>
    </>
  );
}