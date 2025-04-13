"use client";

import { motion } from "framer-motion";
import { GeometricShapes } from "../geometric-shapes";

export function SkillsSection() {
  const skills = [
    { name: "React", level: 90, command: "npm install react" },
    { name: "TypeScript", level: 85, command: "tsc --init" },
    { name: "Angular", level: 80, command: "ng new --no-standalone" },
    { name: "NextJS", level: 85, command: "npx create-next-app@latest" },
    { name: "NodeJS", level: 75, command: "node -v" },
    { name: "Git", level: 80, command: "git init" },
  ];

  return (
    <section id="skills" className="py-16 bg-muted dark:bg-muted/10">
      {/* Fun geometric shapes for Skills section */}
      <GeometricShapes
        fixed={false}
        density={0.8}
        section="skills"
        opacity={0.1}
        minSize={10}
        maxSize={30}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background rounded-lg p-4 border border-border"
            >
              <div className="mb-2 flex justify-between items-center">
                <span className="font-medium font-mono text-primary">
                  {skill.name}
                </span>
                <span className="text-muted-foreground font-mono">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-muted dark:bg-muted/30 rounded-md h-8 mb-2 border border-border overflow-hidden relative">
                {/* Terminal header */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-card flex items-center px-1">
                  <div className="w-1 h-1 rounded-full bg-red-500 mr-1"></div>
                  <div className="w-1 h-1 rounded-full bg-yellow-500 mr-1"></div>
                  <div className="w-1 h-1 rounded-full bg-green-500"></div>
                </div>

                {/* Progress bar with terminal effect */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.2 + index * 0.1 }}
                  className="h-full bg-gradient-to-r from-[#50fa7b] to-[#00ff00] relative mt-2"
                >
                  <div className="absolute inset-0 flex items-center px-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                      className="text-xs text-black font-mono whitespace-nowrap"
                    >
                      $ {skill.command}
                    </motion.span>
                  </div>
                </motion.div>

                {/* Terminal blinking cursor */}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-primary"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-6 rounded-xl bg-card border border-border shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
              "Framer Motion",
              "Git",
              "GraphQL",
              "Node.js",
              "Figma",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="px-4 py-2 bg-background rounded-full text-sm border border-border shadow-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}