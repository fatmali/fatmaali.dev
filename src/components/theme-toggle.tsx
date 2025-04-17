"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Animation variants for the toggle
  const toggleVariants = {
    light: { rotate: 0, scale: 1 },
    dark: { rotate: 180, scale: 1 }
  }

  // Animation variants for the rays around the sun
  const raysVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { 
      opacity: [0, 1, 0], 
    }
  }

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full flex items-center justify-center">
        <span className="sr-only">Toggle theme</span>
      </div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={theme === "light" ? "light" : "dark"}
      variants={toggleVariants}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 rounded-full bg-muted text-foreground flex items-center justify-center overflow-hidden border border-border sketch-box dark:neon-border"
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        {theme === "light" ? (
          <div className="relative">
            <Sun className="h-5 w-5 text-primary" />
            <motion.div
              variants={raysVariants}
              initial="initial"
              animate="animate"
              className="absolute -inset-4 rounded-full border-2 border-dashed border-accent opacity-0"
            />
          </div>
        ) : (
          <Moon className="h-5 w-5 dark:text-neon-blue dark:neon-text" />
        )}
      </div>
      
      {/* Fun background animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br"
        initial={false}
        animate={{ 
          background: theme === "light" 
            ? "linear-gradient(to bottom right, rgba(255, 209, 102, 0.2), rgba(255, 107, 107, 0.2))" 
            : "linear-gradient(to bottom right, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))"
        }}
        transition={{ duration: 0.5 }}
      />

      <span className="sr-only">Toggle theme</span>
      
      {/* Hand-drawn accent for dark mode */}
      {theme === "dark" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -inset-1 border-2 border-primary rounded-full opacity-60 z-0"
          style={{ 
            borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
            transform: "rotate(-5deg)" 
          }}
        />
      )}
    </motion.button>
  )
}