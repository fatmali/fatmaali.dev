import { MainLayout } from "@/components/layout/MainLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Fatma Ali",
  description: "Thoughts, insights, and technical articles about frontend development, React, Next.js, and modern web technologies.",
};

export default async function BlogPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 container mx-auto">
        <BlogHeader />
      </section>
      
      {/* Coming soon message */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 mb-8 relative">
            <svg
              className="animate-spin-slow"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset="10"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-primary">Coming Soon</h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-8">
            I&apos;m currently working on some exciting blog posts about frontend development, 
            React, Next.js, and modern web technologies. Check back soon!
          </p>
          
          <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}