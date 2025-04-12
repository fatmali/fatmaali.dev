"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileNavProps {
  items: {
    name: string
    href: string
  }[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  
  React.useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
    
    return () => {
      document.body.classList.remove("overflow-hidden")
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
        className="md:hidden relative h-10 w-10 rounded-full bg-muted text-foreground flex items-center justify-center ml-4 border border-border sketch-box dark:neon-border"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 dark:text-neon-green" />
        
        {/* Fun rotating circles */}
        <motion.div 
          className="absolute -inset-1 rounded-full border-2 border-dashed border-primary/30 opacity-0"
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden flex flex-col dark:bg-black/95"
          >
            <div className="relative w-full h-full overflow-y-auto flex flex-col">
              {/* Decorative elements */}
              <motion.div
                className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl dark:bg-neon-pink/20"
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute bottom-20 left-5 w-32 h-32 rounded-full bg-secondary/10 blur-3xl dark:bg-neon-blue/20"
                animate={{
                  x: [0, -20, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
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

              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="text-lg font-bold dark:text-neon-blue dark:neon-text">
                  <span className="text-primary">Fatma</span>Ali
                </div>
                <motion.button
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setOpen(false)}
                  className="relative h-10 w-10 rounded-full bg-muted text-foreground flex items-center justify-center border border-border sketch-box dark:neon-border"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:text-neon-green">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6L18 18"></path>
                  </svg>
                </motion.button>
              </div>

              <div className="flex-1 flex flex-col justify-center px-4 py-10">
                <nav className="flex flex-col gap-6 items-center">
                  {items.map((item, i) => (
                    <motion.a
                      key={item.name}
                      custom={i}
                      variants={menuItemVariants}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-medium hover:text-primary transition-colors relative group nerdy-font dark:text-neon-blue"
                    >
                      {item.name}
                      <motion.span 
                        className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full dark:from-neon-pink dark:to-neon-blue"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </nav>
                
                <div className="mt-12 flex flex-col gap-6 items-center">
                  <motion.a
                    href="#contact"
                    variants={menuItemVariants}
                    custom={items.length}
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/20 nerdy-font terminal-button dark:neon-border"
                  >
                    Get in Touch
                  </motion.a>
                  
                  <motion.a
                    href="/files/Fatma_Ali_-_Software_Engineer (3).pdf"
                    download
                    target="_blank"
                    variants={menuItemVariants}
                    custom={items.length + 1}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-muted text-foreground rounded-full font-medium border border-border flex items-center gap-2 terminal-button sketch-box"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                    Resume
                  </motion.a>
                </div>
              </div>
              
              {/* Fun confetti elements */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute rounded-full"
                  initial={{
                    x: Math.random() * 100 - 50 + 50 + "%", 
                    y: Math.random() * 100 + "%",
                    scale: Math.random() * 0.5 + 0.5,
                    backgroundColor: [
                      'var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-green)', 'var(--neon-yellow)', 'var(--primary)'
                    ][Math.floor(Math.random() * 5)]
                  }}
                  animate={{
                    y: [null, Math.random() * 20 - 10],
                    x: [null, Math.random() * 20 - 10],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                  style={{
                    width: (3 + Math.random() * 5) + 'px',
                    height: (3 + Math.random() * 5) + 'px',
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}