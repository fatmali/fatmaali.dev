"use client";

import { motion } from "framer-motion";
import React from "react";

// minimal class join helper to avoid external deps
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface StickyNoteProps {
  children: React.ReactNode;
  color?: string; // Tailwind bg-* class
  className?: string; // Positioning utilities like absolute top-... left-...
  rotate?: number; // degrees
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
}

const sizes = {
  sm: "w-28 h-28 text-xs",
  md: "w-36 h-36 text-sm",
  lg: "w-44 h-44 text-base",
};

export function StickyNote({
  children,
  color = "bg-yellow-200",
  className,
  rotate = -6,
  size = "md",
  as: Tag = "div",
}: StickyNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6 }}
      className={cx(
        "sticky-note select-none z-20",
        color,
        sizes[size],
        "rounded-sm shadow-[0_10px_25px_-10px_rgba(0,0,0,0.35)]",
        "p-3 leading-tight font-hand tracking-tight",
        "[transform-style:preserve-3d]",
        "border border-black/5",
        className
      )}
      style={{
        filter: "saturate(1.05)",
      }}
    >
      {/* pin */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-3 h-3 rounded-full bg-black/25 border border-black/20" />
      <Tag className="whitespace-pre-wrap text-black/80">
        {children}
      </Tag>
    </motion.div>
  );
}

export default StickyNote;
