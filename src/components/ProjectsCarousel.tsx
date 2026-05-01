"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ProjectData = {
  title: string;
  year: string;
  tags: string[];
  descriptionLines: string[];
  githubLink?: string;
  liveLink?: string;
  paperLink?: string;
};

interface ProjectsCarouselProps {
  projects: ProjectData[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (!isHovered) {
      autoplayRef.current = setInterval(nextSlide, 5000); // 5s auto-play
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isHovered, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Basic swipe support
    const touchDown = e.touches[0].clientX;
    e.currentTarget.setAttribute("data-touch", String(touchDown));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchDown = Number(e.currentTarget.getAttribute("data-touch"));
    if (!touchDown) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 50) {
      nextSlide();
      e.currentTarget.removeAttribute("data-touch");
    }
    if (diff < -50) {
      prevSlide();
      e.currentTarget.removeAttribute("data-touch");
    }
  };

  if (!projects || projects.length === 0) return null;

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="carousel-track-wrapper reveal">
        <div className="carousel-controls prev">
          <button className="carousel-btn" onClick={prevSlide} aria-label="Previous Project">
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="carousel-track">
          {projects.map((project, i) => {
            let position = "slide-hidden";
            if (i === currentIndex) position = "slide-center";
            else if (i === (currentIndex - 1 + projects.length) % projects.length) position = "slide-left";
            else if (i === (currentIndex + 1) % projects.length) position = "slide-right";

            // If only 2 projects exist, make the logic a bit simpler
            if (projects.length === 2) {
              if (i === currentIndex) position = "slide-center";
              else position = "slide-right"; // Just to show the other one somewhere
            }

            return (
              <ProjectCard
                key={i}
                index={i}
                position={position}
                {...project}
              />
            );
          })}
        </div>

        <div className="carousel-controls next">
          <button className="carousel-btn" onClick={nextSlide} aria-label="Next Project">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="carousel-dots reveal delay-1">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
