"use client";

import { motion } from "framer-motion";
import { GeometricShapes } from "../geometric-shapes";
import { trackEvents } from "../google-analytics";

export function AboutSection() {
  return (
    <section className="py-16 relative" id="about">
      {/* Fun geometric shapes for About section */}
      <GeometricShapes
        fixed={false}
        density={1.2}
        section="about"
        opacity={0.15}
        minSize={8}
        maxSize={35}
      />
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-full bg-gradient-to-b from-background via-muted/30 to-background opacity-70"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Bio Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="p-6 bg-card border border-border rounded-lg sketch-box dark:bg-card/50">
              <div className="h-6 bg-muted dark:bg-muted/30 rounded-t-sm -mt-6 -mx-6 mb-4 flex items-center px-3">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-auto font-mono text-xs text-muted-foreground">about_me.txt</div>
              </div>
              
              <div className="terminal-font text-sm leading-relaxed space-y-4">
                <p className="text-muted-foreground">
                  <span className="text-primary dark:text-neon-green">$</span> Hello! I&apos;m a passionate Frontend Engineer with expertise in building modern web applications. I thrive on creating intuitive, accessible, and beautiful user interfaces.
                </p>
                
                <p className="text-muted-foreground">
                  <span className="text-primary dark:text-neon-green">$</span> Currently at <span className="text-secondary dark:text-neon-blue font-semibold items-center inline-flex">
                    Microsoft
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" className="w-4 h-4 ml-1">
                      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                    </svg>
                  </span>, I&apos;m building innovative solutions for Windows in the M365 ecosystem, focusing on creating seamless experiences that bridge desktop and cloud environments.
                </p>

                <p className="text-muted-foreground">
                  <span className="text-primary dark:text-neon-green">$</span> When I&apos;m not coding, I write tech articles on <a 
                    href="https://medium.com/@fatmali" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline dark:text-neon-pink"
                    onClick={() => trackEvents.trackExternalLinkClick("https://medium.com/@fatmali", "medium_profile")}
                  >
                    Medium
                  </a>, exploring topics from frontend development to career insights.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* Latest Medium Articles */}
              <div className="p-5 border border-border rounded-lg bg-card sketch-box dark:bg-card/50">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-5 h-5 mr-2">
                    <path fill="currentColor" d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z"/>
                  </svg>
                  Medium Blog
                </h3>
                <div className="text-sm text-muted-foreground mb-3">Latest articles I&apos;ve written</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a 
                      href="https://medium.com/@fatmali/use-context-and-custom-hooks-to-share-user-state-across-your-react-app-ad7476baaf32" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block p-2 hover:bg-muted/50 rounded transition-colors"
                      onClick={() => trackEvents.trackExternalLinkClick("https://medium.com/@fatmali/use-context-and-custom-hooks", "medium_article")}
                    >
                      <span className="text-primary dark:text-neon-green">→</span> Use Context and Custom Hooks to share user state across your React App
                    </a>
                  </li>
                </ul>
                <a 
                  href="https://medium.com/@fatmali" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline text-sm flex items-center justify-end mt-3 dark:text-neon-pink"
                  onClick={() => trackEvents.trackExternalLinkClick("https://medium.com/@fatmali", "medium_all_articles")}
                >
                  View all articles
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-3 w-3">
                    <path d="M6 12h8m-4-4 4 4-4 4" />
                  </svg>
                </a>
              </div>

              {/* Connect with me */}
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="https://github.com/fatmali"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 bg-card border border-border text-foreground rounded-full font-medium terminal-button sketch-box flex items-center gap-2 justify-center dark:hover:border-neon-green"
                  onClick={() => trackEvents.trackExternalLinkClick("https://github.com/fatmali", "github_profile")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="dark:text-neon-green">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </motion.a>
                <motion.a
                  href="/files/Fatma_Ali_-_Software_Engineer (3).pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 bg-gradient-to-r from-secondary to-accent text-primary-foreground rounded-full font-medium shadow-lg shadow-secondary/20 flex items-center gap-2 terminal-button dark:neon-border"
                  onClick={() => trackEvents.trackCVDownload()}
                >
                  Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}