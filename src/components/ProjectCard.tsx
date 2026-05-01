import React, { useEffect, useRef } from "react";
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="premium-project-card reveal"
      style={{ "--reveal-i": String(index) } as React.CSSProperties}
    >
      <div className="project-content-wrapper">
        <div className="project-header-row">
          <h3 className="premium-title">{title}</h3>
          <span className="premium-year">{year}</span>
        </div>

        <div className="premium-tag-container">
          {tags.map((tag) => (
            <span key={tag} className="premium-tag">
              {tag}
            </span>
          ))}
        </div>

        <ul className="premium-bullet-list">
          {descriptionLines.map((line, i) => (
            <li key={i} className="premium-bullet-item">
              <div className="bullet-indicator" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="premium-actions">
          {githubLink && (
            <MagneticLink
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="premium-btn"
            >
              <FaGithub size={16} />
              <span>View Code</span>
            </MagneticLink>
          )}
          
          {paperLink && (
            <MagneticLink
              href={paperLink}
              target="_blank"
              rel="noreferrer"
              className="premium-btn"
            >
              <ExternalLink size={16} />
              <span>Research Paper</span>
            </MagneticLink>
          )}
          
          {liveLink && (
            <MagneticLink
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="premium-btn premium-btn-pulse"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </MagneticLink>
          )}
        </div>
      </div>
    </div>
  );
}
