"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  ctaHref?: string; // default '#contact' for backward compatibility
}

const facts = [
  {
    label: "At work",
    title: "Senior Engineer · Microsoft",
    description:
      "Designing and building the front ends and platform behind 70+ Microsoft 365 Copilot and agent experiences — React and TypeScript on top of C#/.NET services used by enterprises globally.",
  },
  {
    label: "Studying",
    title: "M.S. CS · Georgia Tech",
    description:
      "OMSCS with an Artificial Intelligence specialization and graduate HCI coursework in interaction design and usability evaluation.",
  },
  {
    label: "Craft",
    title: "Full-stack, leaning front end",
    description:
      "Seven-plus years shipping user-facing product end to end — React, TypeScript, Relay, and GraphQL up front; C#/.NET, Python, and Postgres behind it.",
  },
];

export function AboutSection({ ctaHref = "#contact" }: AboutSectionProps) {
  return (
    <section className="py-24 md:py-32 relative bg-surface" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Lead */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="mono-label">001 — About</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Engineer by day, relentless tinkerer the rest of the time.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              I care about the seam where thoughtful design meets solid
              engineering — where a product feels effortless because the system
              underneath it is genuinely well built. Most of what I make starts
              as a small problem in my own day.
            </p>
          </motion.div>

          {/* Facts */}
          <div className="lg:col-span-7 lg:pt-2">
            <div className="divide-y divide-border border-y border-border">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="py-6 grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6"
                >
                  <span className="mono-label pt-1">{fact.label}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{fact.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {fact.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex items-center gap-4 flex-wrap"
            >
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Let&apos;s connect
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
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
              <a
                href="/files/Fatma_Ali_Resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Download résumé →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
