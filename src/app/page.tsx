"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { useEffect, useState, useRef } from "react";
import { GeometricShapes } from "@/components/geometric-shapes";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// Fun taglines that rotate randomly
const wittyTaglines = [
  "I make pixels behave 👨‍💻",
  "Hire me before someone else does 👀",
  "Code that doesn't make you cry 😭",
  "Turning caffeine into websites since 2015 ☕",
  "UX so good, you'll forget it exists 🔥",
  "I speak fluent React... and sarcasm 💅"
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    setIsClient(true); // Set isClient to true once component mounts on client
  }, []);

  // Pick a random tagline on each render (client-side only)
  const [tagline, setTagline] = useState("");
  useEffect(() => {
    setTagline(wittyTaglines[Math.floor(Math.random() * wittyTaglines.length)]);
  }, []);

  const skills = [
    { name: "React", level: 90, command: "npm install react" },
    { name: "TypeScript", level: 85, command: "tsc --init" },
    { name: "Angular", level: 80, command: "ng new --no-standalone" },
    { name: "NextJS", level: 85, command: "npx create-next-app@latest" },
    { name: "NodeJS", level: 75, command: "node -v" },
    { name: "Git", level: 80, command: "git init" }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with dynamic product filtering and cart functionality.",
      tech: ["React", "Next.js", "Tailwind CSS", "Stripe API"],
      image: "/images/project1.jpg",
      color: "from-primary/20 to-accent/20"
    },
    {
      title: "Dashboard Analytics",
      description: "Interactive dashboard with data visualization components and real-time updates.",
      tech: ["TypeScript", "React", "D3.js", "Firebase"],
      image: "/images/project2.jpg",
      color: "from-accent/20 to-secondary/20"
    },
    {
      title: "Social Media App",
      description: "Feature-rich social platform with user authentication and real-time messaging.",
      tech: ["React Native", "GraphQL", "Node.js", "MongoDB"],
      image: "/images/project3.jpg",
      color: "from-secondary/20 to-primary/20"
    }
  ];

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className={`fixed top-0 w-full backdrop-blur-sm z-50 transition-all duration-300 bg-transparent`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold"
          >
            <span className="text-primary">Fatma</span>Ali
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center">
            <ThemeToggle />
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Fun geometric shapes specific to hero section */}
        <GeometricShapes 
          fixed={false}
          density={1.5} 
          section="hero" 
          opacity={0.2} 
          minSize={5}
          maxSize={40}
        />

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-fun-pink/30 blur-3xl"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }} 
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-fun-blue/30 blur-3xl"
            animate={{ 
              x: [0, -20, 0], 
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
            }} 
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          {/* Additional decorative element */}
          <motion.div 
            className="absolute top-2/3 right-1/3 w-72 h-72 rounded-full bg-fun-green/30 blur-3xl"
            animate={{ 
              x: [0, 25, 0], 
              y: [0, 25, 0],
              scale: [1, 1.15, 1],
            }} 
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          {/* Playful squiggly lines */}
          <motion.div
            className="absolute top-40 right-20 h-24 w-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10,50 Q25,25 40,50 T70,50 T100,50"
                fill="none"
                stroke="url(#gradientSquiggle1)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradientSquiggle1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF70A6" />
                  <stop offset="100%" stopColor="#FFD166" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 left-20 h-20 w-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,25 Q15,5 30,25 T60,25 T90,25"
                fill="none"
                stroke="url(#gradientSquiggle2)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradientSquiggle2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ECDC4" />
                  <stop offset="100%" stopColor="#98D35F" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Fun confetti elements */}
          {isClient && Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                backgroundColor: [
                  '#FF70A6', '#4ECDC4', '#FFD166', '#9B89B3', '#98D35F'
                ][Math.floor(Math.random() * 5)]
              }}
              animate={{
                y: [null, Math.random() * 20],
                x: [null, Math.random() * 20]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              style={{
                width: (3 + Math.random() * 6) + 'px',
                height: (3 + Math.random() * 6) + 'px',
                left: (Math.random() * 100) + '%',
                top: (Math.random() * 100) + '%',
                opacity: 0.6
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16" 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
                  {/* Sticky profile image - visible across sections */}
      <motion.div 
        ref={imageRef}
        className={`right-10 z-30 transition-all duration-500 hidden lg:block top-32`}
        style={{ 
          opacity: 0.95,
          transform: 'scale(1)'
        }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="relative w-44 h-44 group perspective">
          {/* Terminal-inspired frame */}
          <div className="absolute -inset-3 rounded-lg bg-gradient-to-r from-primary to-secondary p-1 glow-strong">
            <div className="h-full w-full bg-background dark:bg-gray-900 rounded-md p-2">
              {/* Terminal header bar */}
              <div className="h-5 bg-muted dark:bg-gray-800 rounded-t-sm mb-2 flex items-center px-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <code className="text-[10px] ml-auto text-muted-foreground text-white">~/profile-image.jpg</code>
              </div>
              
              <div className="w-full h-full rounded-md overflow-hidden border-2 border-muted dark:border-gray-700 relative">
                {/* Scanline effect overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none"></div>
                
                {/* CRT flicker effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 mix-blend-color-dodge z-10 animate-flicker pointer-events-none"></div>
                
                <Image
                  src="/images/headshot.JPG"
                  alt="Fatma Ali"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="z-0"
                />
              </div>
            </div>
          </div>
          
          {/* Animated tech icons floating around the image */}
          <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center animate-float-slow z-20">
            <span className="text-xs">JS</span>
          </div>
          <div className="absolute -left-6 top-1/3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center animate-float-slow-reverse z-20">
            <span className="text-xs text-white">TS</span>
          </div>
          <div className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center animate-float-medium z-20">
            <span className="text-xs">React</span>
          </div>
        </div>
      </motion.div>

            <motion.div className="text-center md:text-left">
              <motion.h5 
                variants={itemVariants}
                className="text-l md:text-3xl font-bold mb-4 bg-clip-text  bg-gradient-to-r from-primary via-accent to-secondary dark:neon-text"
              >
                Hi, I&apos;m Fatma
              </motion.h5>

              <motion.h2 
                variants={itemVariants}
                className="text-l md:text-l font-medium mb-6 sketch-underline"
              >
                Frontend Engineer
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="max-w-2xl text-muted-foreground mb-8 terminal-font"
              >
                {tagline}
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/20 nerdy-font terminal-button dark:neon-border"
                >
                  Get in Touch
                </motion.a>
              
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-muted text-foreground rounded-full font-medium border border-border terminal-button sketch-box"
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section - New Section */}
      <section className="py-16 relative">
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
          
          <div className="grid grid-cols-1 gap-12 items-center max-w-4xl mx-auto">            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">My Journey</h3>
              <p className="text-muted-foreground mb-6">
                As a passionate Frontend Engineer with expertise in building modern web applications, 
                I thrive on creating intuitive, accessible, and beautiful user interfaces. My journey 
                in tech began with a curiosity about how digital experiences shape our daily lives.
              </p>
              <p className="text-muted-foreground mb-6">
                I specialize in React, TypeScript, and Next.js, focusing on performance optimization 
                and responsive design. My approach combines technical expertise with a keen eye for 
                design and user experience.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <motion.a
                  href="/files/Fatma_Ali_-_Software_Engineer (3).pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-primary-foreground rounded-full font-medium shadow-lg shadow-secondary/20 flex items-center gap-2 terminal-button dark:neon-border"
                >
                  View Resume
                </motion.a>
                <motion.a
                  href="#skills"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium border border-border flex items-center gap-2 justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.04 4.455c.708 0 1.283.574 1.283 1.282 0 .7-.575 1.275-1.282 1.275s-1.283-.575-1.283-1.275c0-.708.575-1.282 1.282-1.282zM9.88 10.61H6.12v-.817h1.379V7.65H6.71v-.816h1.978v2.959h1.192v.816z"/>
                  </svg>
                  See My Skills
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
                  <span className="font-medium font-mono text-primary">{skill.name}</span>
                  <span className="text-muted-foreground font-mono">{skill.level}%</span>
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
            <h3 className="text-xl font-semibold mb-6 text-center">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Git", "GraphQL", "Node.js", "Figma"].map((tech, index) => (
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

      {/* Projects Section - Enhanced with more animations and creative elements */}
      <section id="projects" className="py-16 relative" style={{ display: "none"}}>
        {/* Fun geometric shapes for Projects section */}
        <GeometricShapes 
          fixed={false}
          density={1.8} 
          section="projects" 
          opacity={0.13}
          minSize={6}
          maxSize={25}
        />
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
            animate={{ 
              x: [0, 50, 0], 
              opacity: [0.5, 0.3, 0.5],
              scale: [1, 1.1, 1],
            }} 
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
            animate={{ 
              x: [0, -30, 0], 
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1],
            }} 
            transition={{ 
              duration: 18, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              A selection of my recent work showcasing my skills in frontend development, UX design, and problem-solving.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-lg border border-border group relative"
              >
                <div className="h-52 bg-muted relative overflow-hidden">
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <motion.h3 
                      className="text-2xl font-bold text-center z-10 relative"
                      initial={{ y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                  </div>

                  <motion.div
                    className="absolute inset-0 opacity-20 flex items-center justify-center"
                    whileHover={{ scale: 1.2, opacity: 0.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                      </svg>
                    )}
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 1 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                      </svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                      </svg>
                    )}
                  </motion.div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ y: -2, x: 0 }}
                        className="px-3 py-1 bg-muted text-xs rounded-full inline-flex items-center"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full shadow-md shadow-primary/20 flex items-center gap-1"
                      href="#"
                    >
                      <span>View Project</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-muted"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More projects section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="max-w-3xl mx-auto p-8 border border-border rounded-xl bg-card shadow-lg"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">Interested in more of my work?</h3>
              <p className="text-muted-foreground mb-6">
                Check out my GitHub profile for more projects and code samples, or get in touch to discuss how we can work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://github.com/fatmali"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-card text-foreground rounded-lg font-medium border-2 border-primary hover:bg-primary/5 transition-colors flex items-center gap-2 justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View GitHub Profile
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium shadow-lg shadow-primary/20 flex items-center gap-2 justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                  </svg>
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Enhanced with more color and creative elements */}
      <section id="contact" className="py-16 bg-muted dark:bg-muted/10 relative">
        {/* Fun geometric shapes for Contact section */}
        <GeometricShapes 
          fixed={false}
          density={1.5} 
          section="contact" 
          opacity={0.12}
          minSize={10}
          maxSize={45}
        />
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-10 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
            animate={{ 
              x: [0, -20, 0], 
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }} 
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
            animate={{ 
              x: [0, 20, 0], 
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.2, 1],
            }} 
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Interested in working together? Feel free to reach out for collaborations or just a friendly hello!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-card rounded-2xl shadow-xl p-8 border border-border relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:contact@fatmaali.dev" className="font-medium hover:text-primary transition-colors">contact@fatmaali.dev</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href="tel:+1234567890" className="font-medium hover:text-secondary transition-colors">+1 (234) 567-890</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <span className="font-medium">San Francisco, CA</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-medium mb-3">Connect with me</h4>
                  <div className="flex space-x-4">
                    {[
                      { name: "GitHub", icon: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z", color: "from-gray-700 to-gray-900" },
                      { name: "LinkedIn", icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z", color: "from-blue-600 to-blue-800" },
                      { name: "Twitter", icon: "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z", color: "from-blue-400 to-blue-500" },
                    ].map((platform) => (
                      <motion.a
                        key={platform.name}
                        href="#"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${platform.color} text-white`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d={platform.icon} />
                        </svg>
                        <span className="sr-only">{platform.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    <option value="" disabled defaultValue="collaboration">Select a subject</option>
                    <option value="job">Job Opportunity</option>
                    <option value="project">Project Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground rounded-lg font-medium shadow-lg shadow-primary/20"
                >
                  Send Message
                </motion.button>

                <p className="text-xs text-muted-foreground text-center mt-2">
                  I&apos;ll get back to you as soon as possible!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced with more creative elements */}
      <footer className="py-10 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-gray-900/[0.03] dark:bg-grid-white/[0.03]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-4"
              >
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Fatma</span>Ali
              </motion.div>
              <p className="text-muted-foreground text-sm mb-4">
                Frontend Engineer specializing in creating beautiful, 
                responsive web applications with modern technologies.
              </p>
              <motion.a
                href="/files/Fatma_Ali_-_Software_Engineer (3).pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="text-sm flex items-center gap-1 text-primary hover:text-accent transition-colors"
              >
                <span>Download Resume</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
              </motion.a>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <motion.li key={item.name} whileHover={{ x: 3 }}>
                    <a 
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-muted text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-4 md:mb-0"
            >
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Fatma Ali. All rights reserved.
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center"
            >
              <span className="text-sm text-muted-foreground mr-2">
                Built with
              </span>
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 1],
                }} 
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                }} 
                className="text-primary"
              >
                ❤
              </motion.span>
              <span className="text-sm text-muted-foreground ml-2">
                using Next.js, Tailwind & Framer Motion
              </span>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
