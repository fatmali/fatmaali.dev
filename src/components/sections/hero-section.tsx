"use client";

import { motion } from "framer-motion";
import { StickyNote } from "../ui/StickyNote";
import Link from "next/link";

export function HeroSection() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[720px] pt-28 pb-10 md:pt-32 md:pb-16">
      <div className="container mx-auto pt-12 px-4 sm:px-6 lg:px-8 relative">

        {/* Big headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center font-extrabold leading-tight mx-auto max-w-4xl text-3xl sm:text-4xl md:text-6xl"
        >
           Software Engineer building AI-powered productivity experiences.
        </motion.h1>

        {/* Links row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 flex items-center justify-center gap-4 text-sm"
        >
          <a
            href="https://linkedin.com/in/fatmali"
            target="_blank"
            rel="noopener"
            className="underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href="https://github.com/fatmali"
            target="_blank"
            rel="noopener"
            className="underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <span>•</span>
          <Link
            href="/blog"
            className="underline-offset-4 hover:underline"
          >
            Blog
          </Link>
          <span>•</span>
          <a
            href="mailto:ping@fatmaali.dev"
            className="underline-offset-4 hover:underline"
          >
            Email
          </a>
        </motion.div>

        {/* Sticky notes */}
        <div className="pointer-events-none select-none absolute inset-0 z-10">
          {/* TypeScript */}
          <StickyNote
            className="hidden lg:block absolute -top-4 left-3 md:left-8"
            size="md"
            color="bg-orange-200"
            rotate={-4}
          >
            <div className="flex flex-col items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#3178c6">
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
              </svg>
              <span className="text-xs">TypeScript</span>
            </div>
          </StickyNote>

          {/* React */}
          <StickyNote
            className="hidden lg:block absolute -top-2 right-4 md:right-16"
            size="md"
            color="bg-green-200"
            rotate={6}
          >
            <div className="flex flex-col items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#61dafb">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.01-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.01 1.36-.034-.44.572-.895 1.095-1.36 1.563-.455-.468-.91-.991-1.36-1.563z"/>
              </svg>
              <span className="text-xs">React</span>
            </div>
          </StickyNote>

          {/* Next.js */}
          <StickyNote
            className="hidden lg:block absolute top-40 right-6 md:right-28"
            size="md"
            color="bg-purple-200"
            rotate={-3}
          >
            <div className="flex flex-col items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.72 4.377 20.816.957 16.957.139 16.67.085 16.312.052 15.957.033 15.897.021 15.557.007 15.188 0H11.572z"/>
              </svg>
              <span className="text-xs">Next.js</span>
            </div>
          </StickyNote>

          {/* SaaS apps */}
          <StickyNote
            className="hidden lg:block absolute top-48 left-3 md:left-24"
            size="md"
            color="bg-pink-200"
            rotate={5}
          >
            <div className="flex flex-col items-center gap-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff6b6b">
                <path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 16.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01L12 0z"/>
              </svg>
              <span className="text-xs">SaaS apps</span>
            </div>
          </StickyNote>

          {/* Machine Learning */}
          <StickyNote
            className="hidden lg:block absolute top-[20rem] left-1/4 -translate-x-1/2"
            size="md"
            color="bg-yellow-200"
            rotate={-8}
          >
            <div className="flex flex-col items-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d97706"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="4" r="1.6" />
                <circle cx="19" cy="8" r="1.6" />
                <circle cx="19" cy="16" r="1.6" />
                <circle cx="12" cy="20" r="1.6" />
                <circle cx="5" cy="16" r="1.6" />
                <circle cx="5" cy="8" r="1.6" />
                <path d="M12 10V6" />
                <path d="M12 14v4" />
                <path d="M14 11l3-2" />
                <path d="M10 13l-3 2" />
                <path d="M10 11l-3-2" />
                <path d="M14 13l3 2" />
              </svg>
              <span className="text-xs">Machine learning</span>
            </div>
          </StickyNote>

          {/* NodeJS */}
          <StickyNote
            className="hidden lg:block absolute top-[17rem] right-10"
            size="md"
            color="bg-sky-200"
            rotate={8}
          >
            <div className="flex flex-col items-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#68a063"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l8 4.6v8.8L12 21l-8-4.6V7.6L12 3z" />
                <path d="M8 15V9l4 6V9h4v6" />
              </svg>
              <span className="text-xs">NodeJS</span>
            </div>
          </StickyNote>
        </div>
      </div>

      {/* Scroll indicator - positioned relative to the section */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="text-xs text-muted-foreground font-medium tracking-wide">
          Learn more
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-5 h-5 rounded-full border border-muted-foreground/40 flex items-center justify-center"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}