"use client";

import { useState, useRef, MouseEvent, ReactNode } from "react";

interface ClientTiltProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ClientTilt({ children, className = "", style = {} }: ClientTiltProps) {
  const [transform, setTransform] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the element
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to +10 degrees based on mouse position relative to center)
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    // Scale slightly for pop effect
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    // Reset transform when mouse leaves
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={containerRef}
      className={`tilt-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: transform ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </div>
  );
}
