"use client";

import { motion } from "framer-motion";
import { StickyNote } from "../ui/StickyNote";

export function ProjectsSection() {
  const projects = [
    {
      title: "FocusMode",
      description: "Pomodoro timer with task management and session tracking. Built for developers who need structured focus time.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
      url: "https://focumode.fatmaali.dev",
      status: "Live",
      year: "2025"
    },
  ];

  return (
    <section id="projects" className="py-32 relative bg-muted/10">
      {/* Decorative sticky notes for projects section */}
      <div className="pointer-events-none select-none absolute inset-0">
        <StickyNote
          className="hidden lg:block absolute top-20 right-8"
          size="sm"
          color="bg-pink-200"
          rotate={12}
        >
          building
          in public
        </StickyNote>
        
        <StickyNote
          className="hidden lg:block absolute bottom-24 left-12"
          size="sm"
          color="bg-green-200"
          rotate={-8}
        >
          open
          source ❤️
        </StickyNote>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected work</h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Projects that showcase different aspects of software development. Each one taught me something new.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ y: -12 }}
                className="group"
              >
                <motion.a
                  href={project.url}
                  target={project.url.startsWith("http") ? "_blank" : undefined}
                  rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block h-full"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-background border border-border rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:border-border/60">
                    {/* Project header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl mb-1 group-hover:text-foreground transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{project.year}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full ${
                            project.status === "Live" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* External link icon */}
                      <motion.div
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 1, scale: 1.1 }}
                        className="text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (i * 0.1) + (techIndex * 0.05) }}
                          className="px-2 py-1 bg-muted/50 border border-border rounded-full text-xs"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* View more */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6">
              More projects available on GitHub, including experiments and contributions.
            </p>
            <motion.a
              href="https://github.com/fatmali"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition-colors"
            >
              View GitHub
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}