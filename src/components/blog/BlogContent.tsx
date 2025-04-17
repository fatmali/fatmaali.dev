import { motion } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import 'highlight.js/styles/atom-one-dark.css';

// MDX components to enhance the rendering of MDX content
const components = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => <h1 {...props} className="text-3xl font-bold mt-8 mb-4" />,
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => <h2 {...props} className="text-2xl font-bold mt-8 mb-3" />,
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => <h3 {...props} className="text-xl font-bold mt-6 mb-3" />,
  p: (props: React.HTMLProps<HTMLParagraphElement>) => <p {...props} className="mb-4 leading-relaxed" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-primary underline hover:text-primary/80 transition-colors" />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => <ul {...props} className="mb-4 list-disc pl-5" />,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol {...props} className="mb-4 list-decimal pl-5" />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li {...props} className="mb-2" />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="relative w-full h-64 my-6">
      <Image
        {...props}
        fill
        className="object-cover rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        alt={props.alt || 'Image'}
        src={props.src || ''}
        width={typeof props.width === 'number' ? props.width : undefined}
        height={typeof props.height === 'string' ? parseInt(props.height, 10) : props.height}
      />
    </div>
  ),
  code: (props: React.HTMLProps<HTMLElement>) => {
    // Inline code
    if (!props.className) {
      return <code {...props} className="px-1 py-0.5 bg-muted rounded text-sm" />;
    }
    // Code blocks are handled by the pre component
    return <code {...props} />;
  },
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre
      {...props}
      className="p-4 rounded-md bg-[#282c34] my-6 overflow-x-auto"
    />
  ),
};

interface BlogContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function BlogContent({ mdxSource }: BlogContentProps) {
  return (
    <motion.div
      className="prose prose-lg dark:prose-invert max-w-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <MDXRemote {...mdxSource} components={components} />
    </motion.div>
  );
}