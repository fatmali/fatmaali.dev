"use client";

import { motion } from "framer-motion";

type Project = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  glyph: string;
  status: "Live" | "Open source" | "Building";
  year: string;
  links: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    index: "001",
    title: "Herd",
    tagline: "Herd your tabs. Never lose context again.",
    description:
      "A Chrome/Edge extension that auto-groups tabs by what you're actually doing — code review, docs, incidents — and speaks MCP so an AI agent can organize them for you.",
    tech: ["Browser Extension", "Node.js", "MCP"],
    glyph: "🐑",
    status: "Open source",
    year: "2026",
    links: [{ label: "GitHub", url: "https://github.com/fatmali/herd" }],
  },
  {
    index: "002",
    title: "The London Journal",
    tagline: "A week through Britain, set like a printed guide.",
    description:
      "An offline-first travel PWA that reads like a hand-set city journal — page-turning navigation, curated days, and a passport-stamp system that records the trip as you go.",
    tech: ["PWA", "Vanilla JS", "Service Worker"],
    glyph: "📖",
    status: "Live",
    year: "2026",
    links: [{ label: "GitHub", url: "https://github.com/fatmali/guide" }],
  },
  {
    index: "003",
    title: "What To Eat",
    tagline: "Never let food quietly expire in the back again.",
    description:
      "A mobile-first PWA that tracks your fridge, scans receipts with on-device OCR, and nudges you before things spoil. Zero backend — everything lives on your phone.",
    tech: ["React", "Vite", "Tesseract.js", "PWA"],
    glyph: "🍴",
    status: "Live",
    year: "2026",
    links: [{ label: "GitHub", url: "https://github.com/fatmali/what-to-eat" }],
  },
  {
    index: "004",
    title: "FocusMode",
    tagline: "Structured focus time for people who ship.",
    description:
      "A Pomodoro timer with task management and session tracking, built for developers who want deliberate, measurable focus blocks instead of open-ended grind.",
    tech: ["Next.js", "TypeScript", "Supabase"],
    glyph: "⏱",
    status: "Live",
    year: "2025",
    links: [{ label: "Visit", url: "https://focumode.fatmaali.dev" }],
  },
];

const statusStyles: Record<Project["status"], string> = {
  Live: "text-accent",
  "Open source": "text-accent",
  Building: "text-muted-foreground",
};

export function ProjectsSection({ index = "002" }: { index?: string }) {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="mono-label">{index} — Selected builds</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Things I&apos;ve been vibecoding.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Small, opinionated tools I build for the fun of it — usually to
            scratch a personal itch, always shipped in public.
          </p>
        </motion.div>

        {/* Catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative bg-card p-7 md:p-9 hover:bg-surface transition-colors"
            >
              {/* Top row: index + status */}
              <div className="flex items-center justify-between mb-6">
                <span className="mono-label !tracking-[0.2em]">
                  {project.index}
                </span>
                <span
                  className={`font-mono text-[0.7rem] uppercase tracking-widest inline-flex items-center gap-1.5 ${statusStyles[project.status]}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {project.status}
                </span>
              </div>

              {/* Title + glyph */}
              <div className="flex items-start gap-3 mb-2">
                <span
                  aria-hidden
                  className="text-2xl leading-none translate-y-0.5"
                >
                  {project.glyph}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  {project.title}
                </h3>
              </div>

              <p className="text-sm font-medium text-accent mb-4">
                {project.tagline}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-7">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[0.68rem] uppercase tracking-wide px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-5 text-sm">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                ))}
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex items-center justify-between flex-wrap gap-4"
        >
          <p className="text-sm text-muted-foreground">
            More experiments, contributions, and half-finished ideas live on
            GitHub.
          </p>
          <a
            href="https://github.com/fatmali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-medium text-sm hover:border-accent hover:text-accent transition-colors"
          >
            Browse all on GitHub
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
