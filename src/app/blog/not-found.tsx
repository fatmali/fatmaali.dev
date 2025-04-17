import { MainLayout } from "@/components/layout/MainLayout";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogNotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog Post Not Found</h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Browse All Blog Posts
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
}