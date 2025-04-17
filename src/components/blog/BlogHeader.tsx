'use client';

import { motion } from 'framer-motion';

export default function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        Thoughts, insights, and technical articles about frontend development,
        React, Next.js, and modern web technologies.
      </p>
    </motion.div>
  );
}