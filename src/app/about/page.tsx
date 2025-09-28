import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Fatma Ali',
  description: 'About Fatma Ali — Frontend Engineer building AI-powered productivity experiences (React, TypeScript, Next.js, ML at Georgia Tech).',
  alternates: { canonical: 'https://fatmaali.dev/about' },
  openGraph: {
    title: 'About | Fatma Ali',
    description: 'Frontend Engineer focusing on AI productivity, UX, and scalable web architecture.',
    url: 'https://fatmaali.dev/about',
    type: 'profile'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Fatma Ali',
    description: 'Frontend Engineer focused on AI-enhanced developer productivity and modern web craftsmanship.'
  }
};

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <AboutSection ctaHref="#contact" />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
