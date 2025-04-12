import "./globals.css"
import { Outfit, Comfortaa, VT323, Space_Mono, Inconsolata } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GeometricShapes } from "@/components/geometric-shapes"

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${comfortaa.variable} ${vt323.variable} ${spaceMono.variable} ${inconsolata.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Geometric shapes background */}
          <GeometricShapes />
          
          {/* Cursor effect - a fun element that follows the cursor */}
          <div id="cursor-follow" className="fixed w-10 h-10 pointer-events-none z-50 hidden md:flex items-center justify-center">
            <div className="absolute w-5 h-5 bg-primary rounded-full opacity-50 animate-ping-slow"></div>
            <div className="absolute w-2 h-2 bg-primary rounded-full"></div>
          </div>
          
          {/* Page content */}
          {children}
          
          {/* Add Client Side Script for cursor effect */}
          <script dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const cursor = document.getElementById('cursor-follow');
                if (cursor) {
                  document.addEventListener('mousemove', (e) => {
                    cursor.style.left = e.clientX + 'px';
                    cursor.style.top = e.clientY + 'px';
                  });
                  
                  // Make cursor bigger on clickable elements
                  document.querySelectorAll('a, button').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                      cursor.classList.add('scale-150');
                    });
                    el.addEventListener('mouseleave', () => {
                      cursor.classList.remove('scale-150');
                    });
                  });
                }
              });
            `
          }} />
        </ThemeProvider>
      </body>
    </html>
  )
}
