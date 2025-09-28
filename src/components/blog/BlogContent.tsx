"use client";

import { motion } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import 'highlight.js/styles/atom-one-dark.css';
import Callout from './Callout';
import { slugify } from '@/utils/cn';

const components = {
  Callout,
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/40 shadow-sm bg-gradient-to-b from-background to-background/60 backdrop-blur">
      <table
        {...props}
        className="w-full text-sm [&_th]:text-left [&_th]:bg-muted/40 [&_th]:font-medium [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 [&_tbody_tr:nth-child(even)]:bg-muted/10"
      />
    </div>
  ),
  h1: ({ children, ...rest }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = slugify(String(children));
    return <h1 id={id} {...rest} className="group scroll-mt-28 text-3xl font-bold mt-10 mb-5 tracking-tight">
      <a href={`#${id}`} className="no-underline">{children}</a>
      <span className="opacity-0 group-hover:opacity-60 ml-2 text-primary/60">#</span>
    </h1>;
  },
  h2: ({ children, ...rest }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = slugify(String(children));
    return <h2 id={id} {...rest} className="group scroll-mt-28 text-2xl font-semibold mt-12 mb-4 tracking-tight">
      <a href={`#${id}`}>{children}</a>
      <span className="opacity-0 group-hover:opacity-60 ml-2 text-primary/60">#</span>
    </h2>;
  },
  h3: ({ children, ...rest }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = slugify(String(children));
    return <h3 id={id} {...rest} className="group scroll-mt-28 text-xl font-semibold mt-8 mb-3">
      <a href={`#${id}`}>{children}</a>
      <span className="opacity-0 group-hover:opacity-60 ml-2 text-primary/60">#</span>
    </h3>;
  },
  p: (props: React.HTMLProps<HTMLParagraphElement>) => <p {...props} className="mb-4 leading-relaxed" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-primary underline decoration-primary/50 underline-offset-2 hover:text-primary/80 transition-colors" />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => <ul {...props} className="mb-4 list-disc pl-5 marker:text-primary/70" />,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol {...props} className="mb-4 list-decimal pl-5 marker:text-primary/70" />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li {...props} className="mb-1" />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-4 border-primary/60 pl-4 italic my-6 text-muted-foreground bg-primary/5 py-2 rounded-r"
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="relative w-full h-64 my-8 rounded-xl overflow-hidden border border-border/50 shadow">
      <Image
        {...props}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        alt={props.alt || 'Image'}
        src={props.src || ''}
        width={typeof props.width === 'number' ? props.width : undefined}
        height={typeof props.height === 'string' ? parseInt(props.height, 10) : props.height}
      />
    </figure>
  ),
  code: (props: React.HTMLProps<HTMLElement>) => {
    if (!props.className) {
      return <code {...props} className="px-1 py-0.5 bg-muted rounded text-[12px] font-mono" />;
    }
    return <code {...props} />;
  },
  pre: (props: React.HTMLProps<HTMLPreElement> & { children?: { props?: { className?: string; children?: string } } }) => {
    // Attempt to extract language & optional filename from className: e.g. language-tsx:filename=index.tsx
    const child = props.children?.props || {};
    const className: string = child.className || '';
    const code = child.children || '';
    const meta = className.split(':');
    const langMatch = meta[0].match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : undefined;
    const filename = meta[1]?.replace('filename=', '') || undefined;
    return (
      <div className="group relative my-6 border border-border/40 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 text-[11px] uppercase tracking-wide bg-muted/30 font-mono">
          <span className="text-primary/70">{filename || lang || 'code'}</span>
          <button
            onClick={() => navigator.clipboard.writeText(String(code))}
            className="opacity-0 group-hover:opacity-100 transition text-xs bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded text-primary"
          >Copy</button>
        </div>
        <pre {...props} className="p-4 pt-3 bg-black overflow-x-auto text-[13px] leading-relaxed">
          {props.children}
        </pre>
      </div>
    );
  },
};

interface BlogContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function BlogContent({ mdxSource }: BlogContentProps) {
  return (
    <motion.div
      className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto prose-headings:scroll-mt-24 prose-pre:bg-transparent prose-code:before:content-[''] prose-code:after:content-['']"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <MDXRemote {...mdxSource} components={components} />
    </motion.div>
  );
}