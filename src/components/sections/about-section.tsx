"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  ctaHref?: string; // default '#contact' for backward compatibility
}

export function AboutSection({ ctaHref = '#contact' }: AboutSectionProps) {
  return (
    <section className="py-32 relative bg-muted/20" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title with subtle entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About me</h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-16"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m a Frontend Engineer at{" "}
              <span className="text-foreground font-medium">Microsoft</span>, building user experiences for{" "}
              <span className="text-foreground font-medium">M365 Copilot</span>. 
              Currently pursuing my Master&apos;s in Computer Science at{" "}
              <span className="text-foreground font-medium">Georgia Tech</span>, specializing in{" "}
              <span className="text-foreground font-medium">Machine Learning</span>.
            </p>
          </motion.div>

          {/* Key points in a flowing grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Microsoft Role",
                description: "Building UX for M365 Copilot, focusing on AI-powered productivity experiences and user interfaces.",
                delay: 0.2
              },
              {
                title: "Academic Focus",
                description: "Master's in CS at Georgia Tech with ML specialization, bridging AI research with practical applications.",
                delay: 0.3
              },
              {
                title: "Engineering Excellence",
                description: "React, TypeScript, Next.js. Clean code, great DX, and scalable architectures that ship fast.",
                delay: 0.4
              }
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay }}
                className="text-center"
              >
                <h3 className="font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-4">Want to work together or just chat about software?</p>
            <motion.a 
              href={ctaHref}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              Let&apos;s connect
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
