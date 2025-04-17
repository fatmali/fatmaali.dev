import "./globals.css"
import { Outfit, Comfortaa, VT323, Space_Mono, Inconsolata } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GeometricShapes } from "@/components/geometric-shapes"
import { ToastProvider } from "@/components/toast-provider"
import GoogleAnalytics from "@/components/google-analytics"
import Script from "next/script"
import { Suspense } from "react"

// Outfit as our clean sans-serif for body text
const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

// Comfortaa as our fun, playful display font for headings
const comfortaa = Comfortaa({ 
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
})

// VT323 as our nerdy font
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nerdy",
  display: "swap"
})

// Space Mono as our terminal font
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-terminal",
  display: "swap"
})

// Inconsolata as our code font
const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap"
})

export const metadata = {
  title: "Fatma Ali | Frontend Engineer",
  description: "Portfolio website for Fatma Ali, Frontend Engineer specialized in React, TypeScript, and Next.js",
  metadataBase: new URL('https://fatmaali.dev'),
  keywords: ['Frontend Engineer', 'React', 'TypeScript', 'Next.js', 'Software Engineer', 'Web Developer', 'JavaScript', 'NodeJS'],
  authors: [{ name: 'Fatma Ali' }],
  creator: 'Fatma Ali',
  publisher: 'Fatma Ali',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fatmaali.dev',
    title: 'Fatma Ali | Frontend Engineer',
    description: 'Portfolio website for Fatma Ali, Frontend Engineer specialized in React, TypeScript, and Next.js',
    siteName: 'Fatma Ali Portfolio',
    images: [
      {
        url: '/public/images/headshot.JPG',
        width: 1200,
        height: 630,
        alt: 'Fatma Ali - Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fatma Ali | Frontend Engineer',
    description: 'Portfolio website for Fatma Ali, Frontend Engineer specialized in React, TypeScript, and Next.js',
    images: ['/public/images/headshot.JPG'],
    creator: '@fatmali',
  },
  alternates: {
    canonical: 'https://fatmaali.dev',
  },
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Fatma Ali",
              "url": "https://fatmaali.dev",
              "image": "https://fatmaali.dev/images/headshot.JPG",
              "jobTitle": "Frontend Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Microsoft"
              },
              "alumniOf": [
                {
                  "@type": "CollegeOrUniversity",
                  "name": "University of Eldoret"
                }
              ],
              "knowsAbout": ["React", "TypeScript", "Next.js", "JavaScript", "Frontend Development"],
              "sameAs": [
                "https://github.com/fatmali",
                "https://linkedin.com/in/fatmali",
                "https://x.com/_fatmali"
              ]
            })
          }}
        />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body className={`${outfit.variable} ${comfortaa.variable} ${vt323.variable} ${spaceMono.variable} ${inconsolata.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Geometric shapes background */}
          <GeometricShapes />
          
          {/* Page content */}
          {children}
          
          {/* Toast notifications */}
          <ToastProvider />

        </ThemeProvider>
      </body>
    </html>
  )
}
