"use client";

import { motion } from "framer-motion";

export function SkillsSection() {
  const techStack = [
    { name: "React", category: "core", years: "4+" },
    { name: "TypeScript", category: "core", years: "3+" },
    { name: "Next.js", category: "core", years: "2+" },
    { name: "Node.js", category: "backend", years: "3+" },
    { name: "Tailwind CSS", category: "styling", years: "2+" },
    { name: "PostgreSQL", category: "backend", years: "2+" },
    { name: "GraphQL", category: "data", years: "2+" },
    { name: "AWS", category: "cloud", years: "1+" },
  ];

  const categories = {
    core: { label: "Core", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    backend: { label: "Backend", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    styling: { label: "Styling", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    data: { label: "Data", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
    cloud: { label: "Cloud", color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200" }
  };

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech I work with</h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I use daily to build modern web applications. Always learning, always improving.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Skills grid with staggered animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.2 } 
                }}
                className="group"
              >
                <div className="bg-background border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categories[skill.category as keyof typeof categories].color}`}>
                      {categories[skill.category as keyof typeof categories].label}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-foreground transition-colors">
                    {skill.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {skill.years} experience
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6">
              Curious about a specific technology or want to discuss a project?
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition-colors"
            >
              Let&apos;s talk tech
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}