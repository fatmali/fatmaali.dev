import { ContactSection } from '@/components/sections/contact-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Fatma Ali',
  description: 'Get in touch with Fatma Ali for collaborations, projects, or technical discussions (React, Next.js, AI productivity).',
  alternates: { canonical: 'https://fatmaali.dev/contact' },
  openGraph: {
    title: 'Contact | Fatma Ali',
    description: 'Reach out for collaborations or questions about AI-powered productivity and web engineering.',
    url: 'https://fatmaali.dev/contact',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Fatma Ali',
    description: 'Let\'s connect — collaborations, product ideas, or engineering chats.'
  }
};

export default function ContactPage() {
  return <ContactSection />;
}
