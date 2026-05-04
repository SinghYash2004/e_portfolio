"use client";

import { useState, useRef, MouseEvent, ReactNode, useCallback } from "react";

interface ClientTiltProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Max tilt angle in degrees (default 12) */
  maxAngle?: number;
  /** Called with normalised mouse coords (−0.5 → +0.5) for parent use */
  onMouseMove?: (x: number, y: number) => void;
}

export default function ClientTilt({
  children,
  className = "",
  style = {},
  maxAngle = 12,
  onMouseMove,
}: ClientTiltProps) {
  const [transform, setTransform] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;

      const rotX = ((y - cy) / cy) * -maxAngle;
      const rotY = ((x - cx) / cx) *  maxAngle;

      setTransform(
        `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`
      );

      // Forward normalised coords to parent (hero parallax / particle field)
      if (onMouseMove) {
        onMouseMove((x / rect.width) - 0.5, (y / rect.height) - 0.5);
      }
    },
    [maxAngle, onMouseMove]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    if (onMouseMove) onMouseMove(0, 0);
  }, [onMouseMove]);

  return (
    <div
      ref={containerRef}
      className={`tilt-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: transform
          ? "transform 0.08s ease-out"
          : "transform 0.55s cubic-bezier(0.2,0.8,0.2,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
