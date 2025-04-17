"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { GeometricShapes } from "../geometric-shapes";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Fun taglines that rotate randomly
const wittyTaglines = [
  "I make pixels behave 👨‍💻",
  "Turning caffeine into websites since 2017 ☕",
  "UX so good, you'll forget it exists 🔥",
  "I speak fluent React... and sarcasm 💅",
  "Building the web, one pixel at a time 🌐",
  "Frontend wizardry in progress 🪄",
  "Crafting digital experiences with flair ✨",
  "Making the internet a prettier place 🌈",
  "Code is my canvas, pixels are my paint 🎨",
];

export function HeroSection() {
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

  return (
    <section
      id="about"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
    >
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
            repeatType: "reverse",
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
            repeatType: "reverse",
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
            repeatType: "reverse",
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
              <linearGradient
                id="gradientSquiggle1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
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
              <linearGradient
                id="gradientSquiggle2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#4ECDC4" />
                <stop offset="100%" stopColor="#98D35F" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Fun confetti elements */}
        {isClient &&
          Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                backgroundColor: [
                  "#FF70A6",
                  "#4ECDC4",
                  "#FFD166",
                  "#9B89B3",
                  "#98D35F",
                ][Math.floor(Math.random() * 5)],
              }}
              animate={{
                y: [null, Math.random() * 20],
                x: [null, Math.random() * 20],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                width: 3 + Math.random() * 6 + "px",
                height: 3 + Math.random() * 6 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: 0.6,
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
            className="relative flex justify-center md:justify-start"
            style={{
              opacity: 0.95,
              transform: "scale(1)",
            }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-32 h-32 md:w-44 md:h-44 group perspective">
              {/* Terminal-inspired frame */}
              <div className="absolute -inset-3 rounded-lg bg-gradient-to-r from-primary to-secondary p-1 glow-strong">
                <div className="h-full w-full bg-background dark:bg-gray-900 rounded-md p-2">
                  {/* Terminal header bar */}
                  <div className="h-5 bg-muted dark:bg-gray-800 rounded-t-sm mb-2 flex items-center px-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <code className="text-[10px] ml-auto text-muted-foreground text-white">
                      ~/profile-image.jpg
                    </code>
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
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/20 nerdy-font terminal-button dark:neon-border"
              >
                Get in Touch
              </motion.a>

              <motion.a
                href="/#skills"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-muted text-foreground rounded-full font-medium border border-border terminal-button sketch-box"
              >
                View Skills
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}