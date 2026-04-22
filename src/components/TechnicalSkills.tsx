'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import {
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJs,
  FaReact,
  FaSwift,
  FaTools,
} from 'react-icons/fa';
import { SiCplusplus, SiIntellijidea, SiMysql, SiNextdotjs } from 'react-icons/si';
import { TbBrandCSharp, TbLetterC } from 'react-icons/tb';

type Skill = {
  name: string;
  color: string;
  percent: number;
  icon: IconType;
};

type SkillCardProps = {
  icon: IconType;
  label: string;
  skills: Skill[];
  activeSkill: string | null;
  displayPercents: Record<string, number>;
  onSelect: (skillName: string) => void;
};

type ProgressStyle = CSSProperties & {
  '--target-width': string;
};

const languages: Skill[] = [
  { name: 'Java', color: '#f89820', percent: 88, icon: FaJava },
  { name: 'C++', color: '#00599c', percent: 75, icon: SiCplusplus },
  { name: 'C', color: '#5c6bc0', percent: 72, icon: TbLetterC },
  { name: 'Swift', color: '#fa7343', percent: 65, icon: FaSwift },
  { name: 'HTML', color: '#e34c26', percent: 93, icon: FaHtml5 },
  { name: 'CSS', color: '#264de4', percent: 87, icon: FaCss3Alt },
  { name: 'JavaScript', color: '#f7df1e', percent: 91, icon: FaJs },
];

const tools: Skill[] = [
  { name: 'Git', color: '#f1502f', percent: 89, icon: FaGitAlt },
  { name: 'SQL', color: '#4db6ac', percent: 80, icon: FaDatabase },
  { name: 'MySQL', color: '#00758f', percent: 76, icon: SiMysql },
  { name: 'SwiftUI', color: '#0ea5e9', percent: 62, icon: TbBrandCSharp },
  { name: 'IntelliJ', color: '#e53888', percent: 78, icon: SiIntellijidea },
  { name: 'React', color: '#61dafb', percent: 85, icon: FaReact },
  { name: 'Next.js', color: '#ffffff', percent: 71, icon: SiNextdotjs },
];

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const safeHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;

  const r = parseInt(safeHex.slice(0, 2), 16);
  const g = parseInt(safeHex.slice(2, 4), 16);
  const b = parseInt(safeHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function SkillCard({
  icon: HeaderIcon,
  label,
  skills,
  activeSkill,
  displayPercents,
  onSelect,
}: SkillCardProps) {
  return (
    <div className="section-card">
      <div className="card-header">
        <div className="icon-badge-header" aria-hidden="true">
          <HeaderIcon size={14} />
        </div>
        <span className="card-label">{label}</span>
      </div>

      <div className="skills-list">
        {skills.map((skill) => {
          const Icon = skill.icon;
          const isActive = activeSkill === skill.name;
          const progressStyle: ProgressStyle = {
            '--target-width': `${skill.percent}%`,
            background: `linear-gradient(90deg, ${hexToRgba(skill.color, 0.72)}, ${skill.color})`,
          };

          return (
            <button
              key={skill.name}
              type="button"
              className={`skill-row ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(skill.name)}
            >
              <div
                className="icon-badge-row"
                style={{ background: hexToRgba(skill.color, 0.15), color: skill.color }}
              >
                <Icon size={18} />
              </div>

              <div className="info-col">
                <p className="skill-name">{skill.name}</p>
                <div className="progress-outer">
                  <div className="progress-fill" style={progressStyle} />
                </div>
              </div>

              <span className="percent-label" style={{ color: skill.color }}>
                {displayPercents[skill.name] ?? 0}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TechnicalSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>('Java');
  const [isVisible, setIsVisible] = useState(false);
  const [displayPercents, setDisplayPercents] = useState<Record<string, number>>(() =>
    Object.fromEntries([...languages, ...tools].map((skill) => [skill.name, 0]))
  );

  const allSkills = useMemo(() => [...languages, ...tools], []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const startedAt = performance.now();
    const duration = 1400;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      setDisplayPercents(
        Object.fromEntries(
          allSkills.map((skill) => [skill.name, Math.round(skill.percent * eased)])
        )
      );

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [allSkills, isVisible]);

  return (
    <div className={`skills-root ${isVisible ? 'skills-visible' : ''}`} ref={containerRef}>
      <style jsx global>{`
        .skills-root {
          background: #080b18;
          border-radius: 24px;
          padding: 2rem 1.75rem 2.5rem;
          overflow: hidden;
          position: relative;
          color: #fff;
          z-index: 1;
        }

        .skills-root::before,
        .skills-root::after {
          content: '';
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          pointer-events: none;
        }

        .skills-root::before {
          width: 280px;
          height: 280px;
          top: -90px;
          left: -80px;
          background: rgba(99, 102, 241, 0.18);
        }

        .skills-root::after {
          width: 220px;
          height: 220px;
          bottom: -70px;
          right: -50px;
          background: rgba(14, 165, 233, 0.14);
        }

        .skills-root::marker {
          content: '';
        }

        .skills-root::selection {
          background: rgba(99, 102, 241, 0.25);
        }

        .header {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 2rem;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 4px;
          background: linear-gradient(90deg, #fff 0%, #c4b5fd 30%, #818cf8 60%, #38bdf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 5s linear infinite;
          display: inline-block;
        }

        .subtitle {
          font-size: 12px;
          color: rgba(150, 140, 200, 0.8);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .skills-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .section-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(120, 100, 255, 0.18);
          border-radius: 18px;
          padding: 1rem;
          backdrop-filter: blur(6px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .skills-visible .section-card {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(120, 100, 255, 0.12);
        }

        .icon-badge-header {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: rgba(110, 80, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d8b4fe;
        }

        .card-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(180, 165, 255, 0.9);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .skills-list {
          display: grid;
          gap: 0.5rem;
        }

        .skill-row {
          appearance: none;
          -webkit-appearance: none;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 0.75rem;
          border-radius: 12px;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.02);
          color: inherit;
          cursor: pointer;
          text-align: left;
          font: inherit;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }

        .skill-row:hover,
        .skill-row:focus-visible,
        .skill-row.active {
          background: rgba(110, 80, 255, 0.12);
          border-color: rgba(130, 100, 255, 0.35);
          transform: translateX(4px);
          box-shadow: 0 10px 24px rgba(14, 165, 233, 0.08);
          outline: none;
        }

        .icon-badge-row {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-col {
          flex: 1;
          min-width: 0;
        }

        .skill-name {
          font-size: 13px;
          font-weight: 600;
          color: #e2e0ff;
          margin: 0 0 6px;
        }

        .progress-outer {
          height: 4px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          width: var(--target-width);
          height: 100%;
          border-radius: 999px;
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .skills-visible .progress-fill {
          transform: scaleX(1);
        }

        .percent-label {
          font-size: 11px;
          font-weight: 700;
          min-width: 34px;
          text-align: right;
        }

        @keyframes shimmerText {
          from {
            background-position: 200% center;
          }
          to {
            background-position: -200% center;
          }
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="header">
        <h2 className="title">Technical Skills</h2>
        <p className="subtitle">Stack & Expertise</p>
      </header>

      <div className="skills-grid">
        <SkillCard
          icon={FaCode}
          label="Languages"
          skills={languages}
          activeSkill={activeSkill}
          displayPercents={displayPercents}
          onSelect={setActiveSkill}
        />
        <SkillCard
          icon={FaTools}
          label="Tools & Frameworks"
          skills={tools}
          activeSkill={activeSkill}
          displayPercents={displayPercents}
          onSelect={setActiveSkill}
        />
      </div>
    </div>
  );
}
