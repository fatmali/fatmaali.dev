"use client";

import { useEffect, useMemo, useState } from "react";

type Shape = {
  id: number;
  type: "circle" | "square" | "triangle";
  size: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  animation: string;
};

type GeometricShapesProps = {
  fixed?: boolean;
  density?: number; // Number of shapes per 100px of screen width
  opacity?: number; // Opacity of shapes (0-1)
  section?: string; // Optional section identifier to create consistent shapes for a specific section
  maxSize?: number; // Maximum size of shapes
  minSize?: number; // Minimum size of shapes
  className?: string; // Additional classes
};

export function GeometricShapes({
  fixed = true,
  density = 0.2, // Drastically reduced density from 0.4 to 0.2
  opacity = 0.015, // Further reduced opacity from 0.03 to 0.015 for barely visible shapes
  section,
  maxSize = 40, // Reduced maximum size from 50 to 40
  minSize = 8, // Reduced minimum size from 10 to 8
  className = "",
}: GeometricShapesProps) {
  const [shapes, setShapes] = useState<Shape[]>([]);
  
  // Colors from your theme
  const colors = useMemo(() => [
    "var(--fun-pink)",
    "var(--fun-purple)",
    "var(--fun-blue)",
    "var(--fun-green)",
    "var(--primary)",
    "var(--secondary)",
    "var(--accent)"
  ], []);
  
  // Animations from your CSS
  const animations = useMemo(() => [
    "animate-float",
    "animate-pulse-slow",
    "animate-spin-slow",
    "animate-ping-slow",
    "animate-wiggle"
  ], []);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      // Base the shape count on screen width and density
      const count = Math.floor((window.innerWidth / 100) * density);
      
      // Use section as a seed for consistent shapes in a section
      const sectionSeed = section ? section.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : Date.now();
      
      // Generate pseudorandom numbers based on section seed
      const pseudoRandom = (index: number) => {
        const x = Math.sin(sectionSeed + index) * 10000;
        return x - Math.floor(x);
      };
      
      for (let i = 0; i < count; i++) {
        // Use pseudorandom to ensure consistent shapes for the same section
        const typeIndex = Math.floor(pseudoRandom(i * 3) * 3);
        const sizeRandom = pseudoRandom(i * 5);
        const xRandom = pseudoRandom(i * 7);
        const yRandom = pseudoRandom(i * 11);
        const rotationRandom = pseudoRandom(i * 13);
        const colorRandom = pseudoRandom(i * 17);
        const animationRandom = pseudoRandom(i * 19);
        
        newShapes.push({
          id: i,
          type: ["circle", "square", "triangle"][typeIndex] as Shape["type"],
          size: sizeRandom * (maxSize - minSize) + minSize, // Between minSize and maxSize
          x: xRandom * 100, // Position as percentage of container
          y: yRandom * 100,
          rotation: rotationRandom * 360,
          color: colors[Math.floor(colorRandom * colors.length)],
          animation: animations[Math.floor(animationRandom * animations.length)]
        });
      }
      
      setShapes(newShapes);
    };
    
    generateShapes();
    
    // Only add resize listener if not section-specific
    if (!section) {
      window.addEventListener("resize", generateShapes);
      return () => window.removeEventListener("resize", generateShapes);
    }
  }, [density, section, maxSize, minSize, colors.length, animations.length, colors, animations]);
  
  return (
    <div className={`${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${shape.animation}`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `rotate(${shape.rotation}deg)`,
            opacity,
            filter: "blur(5px)", // Increased blur from 2px to 5px for a stronger diffused effect
          }}
        >
          {shape.type === "circle" && (
            <div 
              className="rounded-full"
              style={{ 
                width: `${shape.size}px`, 
                height: `${shape.size}px`, 
                backgroundColor: shape.color 
              }}
            />
          )}
          
          {shape.type === "square" && (
            <div 
              className="rounded-sm"
              style={{ 
                width: `${shape.size}px`, 
                height: `${shape.size}px`, 
                backgroundColor: shape.color 
              }}
            />
          )}
          
          {shape.type === "triangle" && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}