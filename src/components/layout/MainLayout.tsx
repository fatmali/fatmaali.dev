"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname,  } from "next/navigation";
import { useEffect, useState } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  
  const navItems = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    // { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  const isActive = (href: string) => {
    if (href.includes("#")) {
      if (href.startsWith("/#")) {
        return pathname === "/" && currentHash === href.substring(1);
      }
      const [path, hash] = href.split("#");
      return pathname === path && currentHash === `#${hash}`;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

    useEffect(() => {
      setCurrentHash(window.location.hash);
      
      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };
      
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full backdrop-blur-sm z-50 bg-transparent`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0,}}
            animate={{ opacity: 1 }}
            className="text-lg font-bold"
          >
            <Link href="/">
              <span className="text-primary">Fatma </span>Ali
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href) 
                    ? "text-[#00ff00] font-bold dark:text-neon-green dark:drop-shadow-[0_0_5px_#00ff00]" 
                    : "hover:text-primary"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00ff00] dark:bg-neon-green dark:shadow-[0_0_5px_#00ff00]"></span>
                )}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center">
            <ThemeToggle />
            <MobileNav items={[navItems[0], navItems[1], navItems[2]]} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="overflow-x-hidden">
        {children}
      </main>

      {/* Footer - Enhanced with more creative elements */}
      <footer className="py-10 border-t border-border relative overflow-x-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-gray-900/[0.03] dark:bg-grid-white/[0.03]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-4"
              >
                <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Fatma{" "}
                </span>
                Ali
              </motion.div>
              <p className="text-muted-foreground text-sm mb-4">
                Frontend Engineer specializing in creating beautiful, responsive
                web applications with modern technologies.
              </p>
              <motion.a
                href="/files/Fatma_Ali_-_Software_Engineer (3).pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="text-sm flex items-center gap-1 text-primary hover:text-accent transition-colors"
              >
                <span>Download Resume</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a.5.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                  />
                </svg>
              </motion.a>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <motion.li key={item.name} whileHover={{ x: 3 }}>
                    <a
                      href={item.href}
                      className={`transition-colors text-sm ${
                        isActive(item.href)
                          ? "text-[#00ff00] font-medium dark:text-neon-green dark:drop-shadow-[0_0_5px_#00ff00]" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <span className="inline-block ml-2">›</span>
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-4 md:mb-0"
            >
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Fatma Ali. All rights reserved.
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center"
            >
              <span className="text-sm text-muted-foreground mr-2">
                Built with
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-primary"
              >
                ❤
              </motion.span>
              <span className="text-sm text-muted-foreground ml-2">
                using Next.js, Tailwind & Framer Motion
              </span>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}