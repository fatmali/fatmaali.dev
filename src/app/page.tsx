import { getAllPosts } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { AboutSection } from '@/components/sections/about-section';

export const metadata: Metadata = {
	title: 'Fatma Ali — Senior Software Engineer',
	description: 'Senior Software Engineer building AI-powered productivity experiences at Microsoft (M365 Copilot). Vibecoding small tools, writing about React, TypeScript, Next.js, and software craft.',
	alternates: { canonical: 'https://fatmaali.dev/' },
	openGraph: {
		type: 'website',
		url: 'https://fatmaali.dev/',
		title: 'Fatma Ali — Senior Software Engineer',
		description: 'AI-powered productivity experiences, fun side projects, and writing on modern web engineering.',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Fatma Ali — Senior Software Engineer',
		description: 'AI productivity, side projects, React, TypeScript, Next.js, and engineering craft.'
	}
};

export default async function RootPage() {
	const posts = await getAllPosts();
	return (
		<>
			<HeroSection />
			<AboutSection ctaHref="/contact" />
			<ProjectsSection />

			{/* Latest writing */}
			<section className="py-24 md:py-32 bg-surface">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mb-16">
						<span className="mono-label">003 — Writing</span>
						<h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">From the blog.</h2>
						<p className="mt-4 text-muted-foreground leading-relaxed">
							Notes on software development, React, Next.js, AI-assisted
							productivity, and the craft of shipping.
						</p>
					</div>
					<BlogListClient posts={posts} />
				</div>
			</section>
		</>
	);
}
