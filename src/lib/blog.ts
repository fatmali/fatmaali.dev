import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { format, parseISO } from 'date-fns';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Types for blog posts
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;              // ISO publish date
  formattedDate: string;     // Human readable date
  updated?: string;          // Optional ISO updated/modified date
  readTime: string;
  image: string;
  tags: string[];
  keywords?: string[];       // Optional keyword list for SEO
  content: string;
  author: string;
}

// Get all blog posts metadata
export async function getAllPosts(): Promise<BlogPost[]> {
  const contentDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(contentDirectory);
  
  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(contentDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const slug = filename.replace(/\.mdx$/, '');
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        formattedDate: format(parseISO(data.date), 'MMMM d, yyyy'),
        updated: data.updated || data.date,
        readTime: data.readTime || '5 min read', // Default read time
        image: data.image || '/images/blog/default.jpg', // Default image
        tags: data.tags || [],
        keywords: data.keywords || data.tags || [],
        content,
        author: data.author || 'Fatma Ali', // Default author
      };
    });
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get a specific blog post by slug
export async function getPostBySlug(slug: string): Promise<{ post: BlogPost, mdxSource: MDXRemoteSerializeResult }> {
  const contentDirectory = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContent);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
    scope: data,
  });
  
  const post = {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    formattedDate: format(parseISO(data.date), 'MMMM d, yyyy'),
    updated: data.updated || data.date,
    readTime: data.readTime || '5 min read',
    image: data.image || '/images/blog/default.jpg',
    tags: data.tags || [],
    keywords: data.keywords || data.tags || [],
    content,
    author: data.author || 'Fatma Ali',
  } as BlogPost;
  
  return { post, mdxSource };
}

// Get related posts (posts with similar tags, excluding the current post)
export async function getRelatedPosts(currentSlug: string, limit = 2): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];
  
  // Find posts with similar tags
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug) // Exclude current post
    .map(post => {
      // Calculate how many tags match
      const matchingTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      return {
        ...post,
        relevanceScore: matchingTags.length,
      };
    })
    .sort((a, b) => {
      // Sort by relevance score (descending) and then by date (newest first)
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
  
  return relatedPosts;
}