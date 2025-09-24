"use client";

import { motion } from "framer-motion";

export function BraindumpHeader() {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-primary">Brain</span>
          <span className="font-nerdy text-4xl md:text-6xl text-neon-green dark:text-neon-green animate-pulse">
            .dump()
          </span>
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
          <div className="text-primary text-2xl">🧠</div>
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm text-muted-foreground"
      >
        Creative experiments and live projects.
      </motion.p>
    </div>
  );
}
