"use client";

import { motion } from "framer-motion";

const groups = [
  {
    label: "Core",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    label: "Cloud & data",
    items: ["Azure", "AWS", "Supabase", "Machine Learning"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="mono-label">003 — Toolkit</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            The stack I reach for.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The tools I use daily to design, build, and ship. Always learning,
            always trimming the list down to what earns its place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {groups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="mono-label">{group.label}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-lg font-medium"
                  >
                    <span className="text-accent font-mono text-sm">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
