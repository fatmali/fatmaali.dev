import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Fatma Ali',
  description: 'About Fatma Ali — Senior Software Engineer at Microsoft building Microsoft 365 Copilot and agent experiences (React, TypeScript, C#/.NET). M.S. CS, AI specialization, at Georgia Tech.',
  alternates: { canonical: 'https://fatmaali.dev/about' },
  openGraph: {
    title: 'About | Fatma Ali',
    description: 'Senior Software Engineer at Microsoft focusing on AI productivity, UX, and scalable full-stack architecture.',
    url: 'https://fatmaali.dev/about',
    type: 'profile'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Fatma Ali',
    description: 'Senior Software Engineer focused on AI-enhanced productivity, LLM-powered experiences, and modern full-stack craftsmanship.'
  }
};

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <AboutSection ctaHref="#contact" />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
