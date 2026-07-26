"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stack = ["TypeScript", "React", "Next.js", "Relay", "C# / .NET", "Node.js"];

export function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="mono-label">Senior Software Engineer, Full Stack</span>
          </motion.div>

          {/* Thesis headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.02]"
          >
            I build AI-powered
            <br />
            productivity experiences
            <span className="whitespace-nowrap"><span className="text-accent">.</span><span className="caret ml-2 align-baseline h-[0.8em]" /></span>
          </motion.h1>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            👋 I&apos;m{" "}
            <span className="text-foreground font-medium">Fatma</span>! A
            senior software engineer at Microsoft building the platform that
            lets 70+ M365 Copilot agents customize their UX, end to end: from
            React &amp; TypeScript interfaces to the C#/.NET services behind
            them. 7+ years shipping product, serial builder of small tools
            nobody asked for, and a Bollywood dancer when the tests pass.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View my experience
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Read the blog
            </Link>
          </motion.div>

          {/* Playful aside */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-4 text-sm text-muted-foreground italic"
          >
            or{" "}
            <a
              href="#projects"
              className="underline underline-offset-4 decoration-accent/40 hover:text-accent transition-colors not-italic font-medium"
            >
              skip the serious stuff
            </a>
            {" "}and see my fun side projects ↓
          </motion.p>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
          >
            {[
              { label: "GitHub", href: "https://github.com/fatmali" },
              { label: "LinkedIn", href: "https://linkedin.com/in/fatmali" },
              { label: "Email", href: "mailto:ping@fatmaali.dev" },
            ].map((l, i) => (
              <span key={l.label} className="flex items-center gap-4">
                {i > 0 && <span className="text-border">/</span>}
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stack ticker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-20 pt-8 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <span className="mono-label">Working with</span>
          {stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        aria-label="Scroll to about"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
      >
        <span className="mono-label">Scroll</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </motion.button>
    </section>
  );
}
