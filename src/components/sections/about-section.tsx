"use client";

import { motion } from "framer-motion";

interface AboutSectionProps {
  ctaHref?: string; // default '#contact' for backward compatibility
}

const experience = [
  {
    period: "May 2021 — Present",
    role: "Senior Software Engineer",
    company: "Microsoft",
    description:
      "Design and build the interfaces and platform behind 70+ first-party Microsoft 365 Copilot and agent experiences — React and TypeScript front ends on top of C#/.NET services used by enterprises globally. Ship features end to end and help set product direction.",
  },
  {
    period: "Jul 2020 — Apr 2021",
    role: "Software Engineer",
    company: "Antara Health",
    description:
      "Built full-stack features for a chronic-care health navigation platform — Django services and REST APIs on PostgreSQL with responsive React front ends — improving patient access efficiency by ~30%.",
  },
  {
    period: "Sep 2018 — Feb 2020",
    role: "Software Engineer",
    company: "AMPATH",
    description:
      "Worked across front end and back end on Kenya's first point-of-care medical system (OpenMRS — Angular + MySQL), supporting care for 200,000+ HIV patients and the move from paper to digital records.",
  },
];

const education = [
  {
    period: "Aug 2025 — Present",
    school: "Georgia Institute of Technology",
    detail: "M.S. Computer Science (OMSCS) · Artificial Intelligence specialization",
  },
  {
    period: "2014 — 2017",
    school: "University of Eldoret",
    detail: "B.Sc. Information Technology",
  },
];

export function AboutSection({ ctaHref = "#contact" }: AboutSectionProps) {
  return (
    <section className="py-24 md:py-32 relative bg-surface" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lead */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="mono-label">001 — Background</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            I build across the whole stack.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Seven-plus years shipping user-facing product from database to
            pixel — today that&apos;s AI-powered Copilot experiences at
            Microsoft; before that, health platforms serving hundreds of
            thousands of patients across Kenya. I like owning a feature end to
            end and sweating both the system design and the last 5% of UX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-label">Experience</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <ol className="relative">
              {experience.map((job, i) => (
                <motion.li
                  key={job.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-2 sm:gap-6 py-6 border-t border-border first:border-t-0"
                >
                  <span className="font-mono text-xs text-muted-foreground pt-1">
                    {job.period}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {job.role}{" "}
                      <span className="text-accent">· {job.company}</span>
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="mono-label">Education</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <ul className="space-y-6">
              {education.map((edu) => (
                <li
                  key={edu.school}
                  className="border-l-2 border-accent/40 pl-4"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {edu.period}
                  </span>
                  <h3 className="mt-1 font-semibold leading-snug">
                    {edu.school}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {edu.detail}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-start gap-4">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
