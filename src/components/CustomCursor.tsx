"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (desktop vs mobile)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    
    if (mediaQuery.matches) {
      setIsVisible(true);
      
      const onMouseMove = (e: MouseEvent) => {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
        });
      };
      
      const onMouseLeave = () => setIsVisible(false);
      const onMouseEnter = () => setIsVisible(true);

      document.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseleave", onMouseLeave);
      document.body.addEventListener("mouseenter", onMouseEnter);

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseleave", onMouseLeave);
        document.body.removeEventListener("mouseenter", onMouseEnter);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="custom-cursor-glow" />
    </div>
  );
}
