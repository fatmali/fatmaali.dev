import { getAllPosts, getPostBySlug, getRelatedPosts, BlogPost } from '@/lib/blog';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogContent from '@/components/blog/BlogContent';
import BlogPostFooter from '@/components/blog/BlogPostFooter';
import GiscusComments from '@/components/blog/GiscusComments';
import TableOfContents, { TocItem } from '@/components/blog/TableOfContents';
import ReadingProgress from '@/components/blog/ReadingProgress';
import { slugify } from '@/utils/cn';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { post } = await getPostBySlug(slug);
    return {
      title: `${post.title} | Fatma Ali`,
      description: post.description,
      alternates: { canonical: `https://fatmaali.dev/blog/${post.slug}` },
      openGraph: {
        type: 'article',
        url: `https://fatmaali.dev/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        images: [{ url: post.image }],
        publishedTime: post.date,
        modifiedTime: post.updated || post.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [post.image]
      },
      keywords: post.keywords && post.keywords.length ? post.keywords : undefined,
      other: {
        'article:published_time': post.date,
        'article:modified_time': post.updated || post.date,
      }
    };
  } catch {
    return { title: 'Post Not Found | Fatma Ali' };
  }
}

type StructuredArticle = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  mainEntityOfPage: { '@type': 'WebPage'; '@id': string };
  headline: string;
  description: string;
  image: string[];
  author: { '@type': 'Person'; name: string };
  datePublished: string;
  dateModified: string;
  keywords?: string;
};

function buildStructuredData(post: BlogPost) {
  const baseArticle: StructuredArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fatmaali.dev/blog/${post.slug}`
    },
    headline: post.title,
    description: post.description,
    image: [post.image],
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    keywords: post.keywords?.join(', ')
  };
  return JSON.stringify(baseArticle);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  try {
    const { post, mdxSource } = await getPostBySlug(slug);
    const related = await getRelatedPosts(slug, 2);
    const toc: TocItem[] = post.content
      .split('\n')
      .filter(l => /^##\s+/.test(l) || /^###\s+/.test(l))
      .map(l => {
        const level = l.startsWith('###') ? 3 : 2;
        const text = l.replace(/^###?\s+/, '').trim();
        return { id: slugify(text), text, level };
      });
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildStructuredData(post) }}
        />
        <ReadingProgress />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 container mx-auto flex gap-10">
          <div className="min-w-0 max-w-3xl mx-auto flex-1" data-article-container>
            <BlogPostHeader post={post} />
            <BlogContent mdxSource={mdxSource} />
            <BlogPostFooter author={post.author} relatedPosts={related} />
            {/* Comments & reactions */}
            <GiscusComments />
          </div>
          <TableOfContents items={toc} />
        </div>
      </>
    );
  } catch {
    notFound();
  }
}