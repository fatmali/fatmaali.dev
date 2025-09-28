import { getAllPosts } from '@/lib/blog';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogListClient from '@/components/blog/BlogListClient';
import type { Metadata } from 'next';
import { AboutSection } from '@/components/sections/about-section';

export const metadata: Metadata = {
	title: 'Fatma Ali — Blog & About',
	description: 'Engineering blog and about section: AI-powered productivity, React, TypeScript, Next.js, web performance, and software craft.',
	alternates: { canonical: 'https://fatmaali.dev/' },
	openGraph: {
		type: 'website',
		url: 'https://fatmaali.dev/',
		title: 'Fatma Ali — Engineering Blog & About',
		description: 'Articles on AI productivity, web performance, React/TypeScript + personal background.',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Fatma Ali — Engineering Blog & About',
		description: 'AI productivity, React, TypeScript, performance, and engineering insights.'
	}
};

export default async function RootPage() {
	const posts = await getAllPosts();
	return (
		<>
			<section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 container mx-auto">
				<BlogHeader />
			</section>
			<section className="pb-32 px-4 sm:px-6 lg:px-8 container mx-auto">
				<BlogListClient posts={posts} />
			</section>
			{/* About anchor section for navigation */}
			<AboutSection ctaHref="/contact" />
		</>
	);
}
