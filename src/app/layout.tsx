import "./globals.css"
import { Inter, Caveat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import GoogleAnalytics from "@/components/google-analytics"
import Script from "next/script"
import { Suspense } from "react"
import { MainLayout } from "@/components/layout/MainLayout"

// Inter as base and display font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

// Caveat for handwritten sticky notes
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
})

export const metadata = {
  title: "Fatma Ali | Senior Software Engineer (Microsoft M365 AI)",
  description: "Senior Software Engineer at Microsoft (M365 AI Experiences) building AI-powered productivity and collaboration experiences with scalable systems and human-centered UX.",
  metadataBase: new URL('https://fatmaali.dev'),
  keywords: [
    'Senior Software Engineer','Microsoft','M365 AI','AI Productivity','AI Collaboration','React','TypeScript','Next.js','Web Performance','Scalable Systems','Cloud Architecture','User Experience','Portfolio'
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
    title: 'Fatma Ali | Senior Software Engineer (Microsoft M365 AI)',
    description: 'AI-powered productivity & collaboration experiences. React, TypeScript, Next.js, scalable systems.',
    siteName: 'Fatma Ali Portfolio',
    images: [
      {
        url: '/images/headshot.JPG',
        width: 1200,
        height: 630,
        alt: 'Fatma Ali - Senior Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@_fatmali',
    creator: '@_fatmali',
    title: 'Fatma Ali | Senior Software Engineer (Microsoft M365 AI)',
    description: 'AI-powered productivity & collaboration engineering. React • TypeScript • Next.js • Scalable systems.',
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
      <body className={`${inter.variable} ${interDisplay.variable} ${caveat.variable}`}>
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
