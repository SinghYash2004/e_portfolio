"use client";

import React, { useEffect, useRef, useState } from "react";


interface AnimatedCounterProps {
  end: number;
  duration?: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  label,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(end * easeOutQuad);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return (
    <div
      ref={countRef}
      className="flex flex-col items-center justify-center gap-2 reveal"
      style={{
        "--reveal-i": "0",
      } as React.CSSProperties}
    >
      <div className="counter-number">
        {prefix}
        {count}
        {suffix}
      </div>
      <p className="text-muted text-sm font-medium">{label}</p>
    </div>
  );
}
