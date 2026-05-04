import React, { useEffect, useRef, useCallback, useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import MagneticLink from "./MagneticLink";

interface ProjectCardProps {
  title: string;
  year: string;
  tags: string[];
  descriptionLines: string[];
  githubLink?: string;
  liveLink?: string;
  paperLink?: string;
  index: number;
}

export default function ProjectCard({
  title,
  year,
  tags,
  descriptionLines,
  githubLink,
  liveLink,
  paperLink,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // 3D tilt on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) *  8;

    // spotlight
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);

    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`,
      transition: "transform 0.08s ease-out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
      transition: "transform 0.55s cubic-bezier(0.2,0.8,0.2,1)",
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  return (
    <div
      ref={cardRef}
      className="premium-project-card reveal"
      style={{
        "--reveal-i": String(index),
        transformStyle: "preserve-3d",
        ...tiltStyle,
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="project-content-wrapper" style={{ transformStyle: "preserve-3d" }}>
        {/* Title row — lifts most */}
        <div
          className="project-header-row"
          style={{ transform: isHovered ? "translateZ(28px)" : "translateZ(0)", transition: "transform 0.3s ease" }}
        >
          <h3 className="premium-title">{title}</h3>
          <span className="premium-year">{year}</span>
        </div>

        {/* Tags — mid depth */}
        <div
          className="premium-tag-container"
          style={{ transform: isHovered ? "translateZ(18px)" : "translateZ(0)", transition: "transform 0.3s ease 0.03s" }}
        >
          {tags.map((tag) => (
            <span key={tag} className="premium-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Description — base depth */}
        <ul className="premium-bullet-list">
          {descriptionLines.map((line, i) => (
            <li key={i} className="premium-bullet-item">
              <div className="bullet-indicator" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* Buttons — subtle lift */}
        <div
          className="premium-actions"
          style={{ transform: isHovered ? "translateZ(22px)" : "translateZ(0)", transition: "transform 0.3s ease 0.05s" }}
        >
          {githubLink && (
            <MagneticLink href={githubLink} target="_blank" rel="noreferrer" className="premium-btn">
              <FaGithub size={16} />
              <span>View Code</span>
            </MagneticLink>
          )}
          {paperLink && (
            <MagneticLink href={paperLink} target="_blank" rel="noreferrer" className="premium-btn">
              <ExternalLink size={16} />
              <span>Research Paper</span>
            </MagneticLink>
          )}
          {liveLink && (
            <MagneticLink href={liveLink} target="_blank" rel="noreferrer" className="premium-btn premium-btn-pulse">
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </MagneticLink>
          )}
        </div>
      </div>
    </div>
  );
}
