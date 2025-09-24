"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface MobileNavProps {
  items: {
    name: string
    href: string
  }[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = React.useState("");

  React.useEffect(() => {
    // Set initial hash on client side safely
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
      
      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };
      
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);
  
  // Fix: Improved active link detection
  const isActive = (href: string) => {
    const path = pathname ?? "";
    if (href.includes("#")) {
      if (href.startsWith("/#")) return path === "/" && currentHash === href.substring(1);
      const [p, hash] = href.split("#");
      return path === p && currentHash === `#${hash}`;
    }
    return path === href || path.startsWith(`${href}/`);
  };
  
  // Fix: Properly manage overflow for body when menu is open
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      if (open) {
        document.body.classList.add("overflow-hidden")
      } else {
        document.body.classList.remove("overflow-hidden")
      }
      
      return () => {
        document.body.classList.remove("overflow-hidden")
      }
    }
  }, [open])

  // Fun animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    })
  }

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  }

  return (
    <>
      <motion.button
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setOpen(true)}
        className="md:hidden relative h-10 w-10 rounded-full bg-muted text-foreground flex items-center justify-center ml-4 border border-border"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-background md:hidden flex flex-col"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="relative w-full h-full flex flex-col">
              
              {/* Squiggly decorative line */}
              <svg
                className="absolute left-0 right-0 top-20 w-full h-8 overflow-visible"
                viewBox="0 0 400 30"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,25 Q50,5 100,25 T200,25 T300,25 T400,25"
                  fill="none"
                  stroke="url(#gradientPath)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="50%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="text-lg font-bold">
                  <span className="text-primary">Fatma</span>Ali
                </div>
                <motion.button
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setOpen(false)}
                  className="relative h-10 w-10 rounded-full bg-muted text-foreground flex items-center justify-center border border-border"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6L18 18"></path>
                  </svg>
                </motion.button>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center px-4 overflow-y-scroll min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
                <nav className="flex flex-col gap-6 items-center w-full">
                  {items.map((item, i) => (
                    <motion.a
                      key={item.name}
                      custom={i}
                      variants={menuItemVariants}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.includes('#')) {
                          const targetId = item.href.split('#')[1];
                          const targetElement = document.getElementById(targetId);
                          if (targetElement) {
                            e.preventDefault();
                            setOpen(false);
                            setTimeout(() => {
                              targetElement.scrollIntoView({ behavior: 'smooth' });
                              window.location.hash = '#' + targetId;
                            }, 300);
                          } else {
                            setOpen(false);
                          }
                        } else {
                          setOpen(false);
                        }
                      }}
                      className={`text-2xl font-medium transition-colors relative group nerdy-font z-10 ${
                        isActive(item.href)
                          ? "text-primary" 
                          : "hover:text-primary"
                      }`}
                    >
                      {item.name}
                      <motion.span 
                        className={`absolute -bottom-2 left-0 ${
                          isActive(item.href) 
                            ? "w-full h-1 bg-primary" 
                            : "w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full"
                        }`}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </nav>
                
                <div className="mt-12 flex flex-col gap-6 items-center">
                  <motion.a
                    href="/#contact"
                    variants={menuItemVariants}
                    custom={items.length}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      // Wait for menu close animation
                      setTimeout(() => {
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                          window.location.hash = '#contact';
                        }
                      }, 300);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/20 nerdy-font"
                  >
                    Get in Touch
                  </motion.a>
                  
                  <motion.a
                    href="/files/Fatma_Ali_Resume.pdf"
                    download
                    target="_blank"
                    variants={menuItemVariants}
                    custom={items.length + 1}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-muted text-foreground rounded-full font-medium border border-border flex items-center gap-2 sketch-box"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                    Resume
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
