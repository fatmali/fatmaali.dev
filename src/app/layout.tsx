import "./globals.css"
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import GoogleAnalytics from "@/components/google-analytics"
import Script from "next/script"
import { Suspense } from "react"
import { MainLayout } from "@/components/layout/MainLayout"

// Inter for body copy
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Bricolage Grotesque — characterful display face for headings
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

// JetBrains Mono — index labels and code accents
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
})

export const metadata = {
  title: "Fatma Ali | Senior Full-Stack Engineer at Microsoft",
  description: "Senior full-stack engineer at Microsoft building AI-native Microsoft 365 Copilot and agent experiences end to end — React, TypeScript, C#/.NET. 7+ years shipping product, from database to pixel.",
  metadataBase: new URL('https://fatmaali.dev'),
  keywords: [
    'Senior Full-Stack Engineer','Full Stack Engineer','Microsoft','M365 Copilot','AI Engineer','LLM','React','TypeScript','C#','.NET','Next.js','GraphQL','PostgreSQL','Software Engineer','Portfolio'
  ],
  category: 'technology',
  authors: [{ name: 'Fatma Ali', url: 'https://fatmaali.dev' }],
  creator: 'Fatma Ali',
  publisher: 'Fatma Ali',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fatmaali.dev',
    title: 'Fatma Ali | Senior Full-Stack Engineer at Microsoft',
    description: 'AI-native, full-stack engineering — M365 Copilot & agent experiences, end to end. React, TypeScript, C#/.NET.',
    siteName: 'Fatma Ali Portfolio',
    images: [
      {
        url: '/images/headshot.JPG',
        width: 1200,
        height: 630,
        alt: 'Fatma Ali - Senior Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@_fatmali',
    creator: '@_fatmali',
    title: 'Fatma Ali | Senior Full-Stack Engineer at Microsoft',
    description: 'AI-native, full-stack engineering — M365 Copilot & agent experiences, end to end. React • TypeScript • C#/.NET.',
    images: ['/images/headshot.JPG']
  },
  alternates: {
    canonical: 'https://fatmaali.dev',
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Fatma Ali',
                url: 'https://fatmaali.dev',
                image: 'https://fatmaali.dev/images/headshot.JPG',
                jobTitle: 'Senior Software Engineer',
                worksFor: {
                  '@type': 'Organization',
                  name: 'Microsoft',
                  department: 'M365 AI Experiences'
                },
                alumniOf: [
                  {
                    '@type': 'CollegeOrUniversity',
                    name: 'Georgia Institute of Technology'
                  },
                  {
                    '@type': 'CollegeOrUniversity',
                    name: 'University of Eldoret'
                  }
                ],
                knowsAbout: [
                  'AI Productivity','AI Collaboration','React','TypeScript','Next.js','Scalable Systems','Web Performance','Cloud Architecture','User Experience'
                ],
                sameAs: [
                  'https://github.com/fatmali',
                  'https://linkedin.com/in/fatmali',
                  'https://x.com/_fatmali'
                ]
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Fatma Ali Portfolio',
                url: 'https://fatmaali.dev',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://fatmaali.dev/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string'
                }
              }
            ])
          }}
        />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Clean page background (no geometric shapes) */}
          <MainLayout>
            {children}
          </MainLayout>
          
          {/* Toast notifications */}
          <ToastProvider />

        </ThemeProvider>
      </body>
    </html>
  )
}
