"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// (Removed hash tracking hooks)

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  // hash tracking no longer needed now that we use dedicated routes
  
  const navItems = [
    { name: "Projects", href: "/#projects" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    const path = pathname ?? "";
    return path === href || path.startsWith(`${href}/`);
  };


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base font-semibold">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative block w-7 h-7 md:w-8 md:h-8 overflow-hidden rounded-full ring-1 ring-border">
                <Image src="/images/headshot.JPG" alt="Fatma Ali" fill sizes="32px" style={{ objectFit: "cover" }} />
              </span>
              <span className="font-display tracking-tight">Fatma Ali</span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const activeCls = isActive(item.href) ? "text-foreground" : "";
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm text-muted-foreground hover:text-accent transition-colors ${activeCls}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/files/Fatma_Ali_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border border-border text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              Résumé
            </a>
            <ThemeToggle />
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="overflow-x-hidden">{children}</main>

      {/* Footer */}
      <footer className="py-14 border-t border-border relative bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="font-display text-2xl font-bold tracking-tight mb-2">
                Fatma Ali<span className="text-accent">.</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs">
                Senior Software Engineer building AI-powered productivity
                experiences — and small tools for the fun of it.
              </p>
            </div>

            <div>
              <span className="mono-label">Navigate</span>
              <ul className="mt-4 space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="mono-label">Elsewhere</span>
              <ul className="mt-4 space-y-2.5">
                {[
                  { name: "GitHub", href: "https://github.com/fatmali" },
                  { name: "LinkedIn", href: "https://linkedin.com/in/fatmali" },
                  { name: "X / Twitter", href: "https://x.com/_fatmali" },
                  { name: "ping@fatmaali.dev", href: "mailto:ping@fatmaali.dev" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Fatma Ali</span>
            <span className="font-mono text-xs">Built with Next.js &amp; Tailwind · Nairobi 🇰🇪</span>
          </div>
        </div>
      </footer>
    </div>
  );
}