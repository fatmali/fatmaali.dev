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
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    // { name: "Projects", href: "/braindump" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    const path = pathname ?? "";
    return path === href || path.startsWith(`${href}/`);
  };


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base font-semibold">
            <Link href="/" className="flex items-center gap-2">
              <span className="relative block w-6 h-6 md:w-8 md:h-8 overflow-hidden rounded-full">
                <Image src="/images/headshot.JPG" alt="Fatma Ali" fill sizes="32px" style={{ objectFit: "cover" }} />
              </span>
              <span>Fatma Ali</span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const activeCls = isActive(item.href) ? "text-foreground" : "";
              return (
                <motion.span key={item.name} whileHover={{ y: -1 }}>
                  <Link
                    href={item.href}
                    className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${activeCls}`}
                  >
                    {item.name}
                  </Link>
                </motion.span>
              );
            })}
            <motion.a 
              href="/files/Fatma_Ali_Resume.pdf" 
              download 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              Resume
            </motion.a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.a 
              href="mailto:ping@fatmaali.dev"
              whileHover={{ y: -1 }}
              className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ping@fatmaali.dev
            </motion.a>
            <ThemeToggle />
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="overflow-x-hidden">{children}</main>

      {/* Footer - minimal */}
      <footer className="py-10 border-t border-border relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold mb-2">Fatma Ali</motion.div>
              <p className="text-muted-foreground text-sm mb-4">Frontend Engineer focusing on modern, accessible web apps.</p>
              <motion.a href="/files/Fatma_Ali_Resume.pdf" download target="_blank" rel="noopener noreferrer" whileHover={{ x: 2 }} className="text-sm text-muted-foreground hover:text-foreground">Download Resume →</motion.a>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-muted text-xs rounded-md">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Fatma Ali</span>
            <span>Built with Next.js & Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}