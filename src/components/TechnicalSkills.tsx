'use client';

import React, { useEffect, useRef } from 'react';

const languages = [
  { name: 'Java', path: 'java/java-original.svg', color: '#f89820', percent: 88 },
  { name: 'C++', path: 'cplusplus/cplusplus-original.svg', color: '#00599c', percent: 75 },
  { name: 'C', path: 'c/c-original.svg', color: '#5c6bc0', percent: 72 },
  { name: 'Swift', path: 'swift/swift-original.svg', color: '#fa7343', percent: 65 },
  { name: 'HTML', path: 'html5/html5-original.svg', color: '#e34c26', percent: 93 },
  { name: 'CSS', path: 'css3/css3-original.svg', color: '#264de4', percent: 87 },
  { name: 'JavaScript', path: 'javascript/javascript-original.svg', color: '#f7df1e', percent: 91 },
];

const tools = [
  { name: 'Git', path: 'git/git-original.svg', color: '#f1502f', percent: 89 },
  { name: 'SQL', path: 'azuresqldatabase/azuresqldatabase-original.svg', color: '#00758f', percent: 80 },
  { name: 'MySQL', path: 'mysql/mysql-original.svg', color: '#00758f', percent: 76 },
  { name: 'SwiftUI', path: 'swift/swift-original.svg', color: '#fa7343', percent: 62 },
  { name: 'IntelliJ', path: 'intellij/intellij-original.svg', color: '#e53888', percent: 78 },
  { name: 'React', path: 'react/react-original.svg', color: '#61dafb', percent: 85 },
  { name: 'Next.js', path: 'nextjs/nextjs-original.svg', color: '#ffffff', percent: 71 },
];

const TechnicalSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = document.querySelectorAll('.skill-row');
    const container = containerRef.current;

    const handleRowClick = (e: Event) => {
      const row = e.currentTarget as HTMLElement;
      const isActive = row.classList.contains('active');

      // Deactivate all others
      rows.forEach(r => r.classList.remove('active'));

      if (!isActive) {
        row.classList.add('active');
        triggerParticles(row);
      }
    };

    const triggerParticles = (row: HTMLElement) => {
      const color = row.getAttribute('data-color') || '#8b5cf6';
      const particlesContainer = row.closest('.section-card')?.querySelector('.particles-container');
      if (!particlesContainer) return;

      const rect = row.getBoundingClientRect();
      const parentRect = (particlesContainer as HTMLElement).getBoundingClientRect();

      const centerX = rect.left - parentRect.left + rect.width / 2;
      const centerY = rect.top - parentRect.top + rect.height / 2;

      for (let i = 0; i < 7; i++) {
        const particle = document.createElement('div');
        particle.className = 'skill-particle';
        particle.style.backgroundColor = color;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;

        const tx = (Math.random() * 60 - 30) + 'px';
        const ty = (Math.random() * 60 - 30) + 'px';
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);

        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
      }
    };

    const handleMouseEnter = (e: Event) => {
      const img = (e.currentTarget as HTMLElement).querySelector('img');
      img?.classList.add('spinning');
    };

    const handleMouseLeave = (e: Event) => {
      const img = (e.currentTarget as HTMLElement).querySelector('img');
      img?.classList.remove('spinning');
    };

    rows.forEach(row => {
      row.addEventListener('click', handleRowClick);
      row.addEventListener('mouseenter', handleMouseEnter);
      row.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      rows.forEach(row => {
        row.removeEventListener('click', handleRowClick);
        row.removeEventListener('mouseenter', handleMouseEnter);
        row.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const hexToRgba = (hex: string, alpha: number) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="skills-root" ref={containerRef}>
      <style jsx>{`
        .skills-root {
          background: #080b18;
          border-radius: 24px;
          padding: 2rem 1.75rem 2.5rem;
          overflow: hidden;
          position: relative;
          color: #fff;
          font-family: 'Inter', sans-serif;
          z-index: 1;
        }

        /* Ambient Orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 0;
          pointer-events: none;
        }
        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(100, 60, 255, 0.18), transparent);
          top: -100px;
          left: -100px;
          animation: bgFloat 9s ease-in-out infinite;
        }
        .orb-2 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(60, 160, 255, 0.12), transparent);
          bottom: -50px;
          right: -50px;
          animation: bgFloat 11s ease-in-out infinite reverse;
          animation-delay: -2s;
        }
        .orb-3 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(200, 80, 255, 0.1), transparent);
          top: 40%;
          left: 50%;
          animation: bgFloat 8s ease-in-out infinite;
          animation-delay: -4s;
        }

        /* Scan Line */
        .scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(120, 80, 255, 0.04), transparent);
          z-index: 0;
          pointer-events: none;
          animation: scanLine 3s linear infinite;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        /* Header Styles */
        .header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 4px;
          background: linear-gradient(90deg, #fff 0%, #c4b5fd 30%, #818cf8 60%, #38bdf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleReveal 0.8s ease forwards, shimmerText 4s linear infinite 1s;
          display: inline-block;
        }
        .subtitle {
          font-size: 12px;
          color: rgba(150, 140, 200, 0.7);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          animation: fadeUp 0.8s ease forwards 0.3s;
          opacity: 0;
        }

        /* Grid & Cards */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .section-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(120, 100, 255, 0.18);
          border-radius: 18px;
          padding: 1rem;
          backdrop-filter: blur(4px);
          position: relative;
          animation: fadeUp 0.7s ease forwards, borderGlow 4s ease-in-out infinite;
          opacity: 0;
        }
        .section-card:nth-child(2) {
          animation-delay: 0.15s;
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
          font-size: 14px;
          animation: float 3s ease-in-out infinite;
        }
        .card-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(180, 165, 255, 0.85);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Skill Rows */
        .skill-row {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 9px;
          border-radius: 11px;
          margin-bottom: 5px;
          cursor: pointer;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
          transition: 0.25s;
          animation: fadeUp 0.5s ease forwards;
          opacity: 0;
        }
        .skill-row:hover {
          background: rgba(110, 80, 255, 0.12);
          border-color: rgba(130, 100, 255, 0.35);
          transform: translateX(5px);
        }
        .skill-row::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(120, 80, 255, 0.1), transparent 60%);
          opacity: 0;
          transition: 0.25s;
          pointer-events: none;
        }
        .skill-row:hover::after {
          opacity: 1;
        }
        .skill-row.active {
          background: rgba(110, 80, 255, 0.18);
          border-color: rgba(160, 130, 255, 0.5);
          animation: pulse 2s ease-in-out infinite;
        }

        .icon-badge-row {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }
        .icon-badge-row img {
          width: 20px;
          height: 20px;
          object-fit: contain;
          transition: transform 0.5s ease;
        }
        .icon-badge-row img.spinning {
          animation: iconSpin 0.5s ease;
        }

        .info-col {
          flex: 1;
          min-width: 0;
          position: relative;
          z-index: 2;
        }
        .skill-name {
          font-size: 12.5px;
          font-weight: 500;
          color: #e2e0ff;
          margin: 0 0 5px;
        }
        .progress-outer {
          height: 3px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 2px;
          width: 0;
          opacity: 0;
          animation: barFill 1.2s ease forwards;
        }
        .skill-row.active .progress-fill {
          box-shadow: 0 0 8px rgba(160, 130, 255, 0.6);
        }

        .percent-label {
          font-size: 11px;
          font-weight: 600;
          min-width: 26px;
          text-align: right;
          opacity: 0;
          animation: numberCount 0.5s ease forwards;
          position: relative;
          z-index: 2;
        }

        /* Particle System */
        .particles-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 18px;
        }
        :global(.skill-particle) {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          pointer-events: none;
          animation: particlePop 1s ease forwards;
        }

        /* Keyframes */
        @keyframes bgFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
        }
        @keyframes scanLine {
          from { top: -40px; }
          to { top: 100%; }
        }
        @keyframes titleReveal {
          from { opacity: 0; letter-spacing: 0.4em; filter: blur(8px); }
          to { opacity: 1; letter-spacing: -0.02em; filter: blur(0); }
        }
        @keyframes shimmerText {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(120, 80, 255, 0.2); }
          50% { border-color: rgba(160, 140, 255, 0.55); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes barFill {
          from { width: 0; opacity: 0; }
          to { width: var(--target-width); opacity: 1; }
        }
        @keyframes iconSpin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes numberCount {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(130, 100, 255, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(130, 100, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(130, 100, 255, 0); }
        }
        @keyframes particlePop {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="scan-line"></div>

      <div className="content-wrapper">
        <header className="header">
          <h2 className="title">Technical Skills</h2>
          <p className="subtitle">Stack & Expertise</p>
        </header>

        <div className="skills-grid">
          {/* Languages Card */}
          <div className="section-card">
            <div className="particles-container"></div>
            <div className="card-header">
              <div className="icon-badge-header">💻</div>
              <span className="card-label">Languages</span>
            </div>
            <div className="skills-list">
              {languages.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className="skill-row" 
                  data-color={skill.color}
                  style={{ animationDelay: `${index * 0.07 + 0.4}s` } as any}
                >
                  <div 
                    className="icon-badge-row" 
                    style={{ background: hexToRgba(skill.color, 0.15) }}
                  >
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.path}`} 
                      alt={skill.name}
                      onError={(e) => {
                        (e.currentTarget as any).style.display = 'none';
                        (e.currentTarget.parentElement as any).innerText = skill.name[0];
                      }}
                    />
                  </div>
                  <div className="info-col">
                    <p className="skill-name">{skill.name}</p>
                    <div className="progress-outer">
                      <div 
                        className="progress-fill"
                        style={{ 
                          background: `linear-gradient(90deg, ${hexToRgba(skill.color, 0.7)}, ${skill.color})`,
                          '--target-width': `${skill.percent}%`,
                          animationDelay: `${index * 0.12 + 0.6}s`
                        } as any}
                      ></div>
                    </div>
                  </div>
                  <span 
                    className="percent-label" 
                    style={{ color: skill.color, animationDelay: `${index * 0.12 + 0.7}s` } as any}
                  >
                    {skill.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Frameworks Card */}
          <div className="section-card">
            <div className="particles-container"></div>
            <div className="card-header">
              <div className="icon-badge-header">⚙️</div>
              <span className="card-label">Tools & Frameworks</span>
            </div>
            <div className="skills-list">
              {tools.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className="skill-row" 
                  data-color={skill.color}
                  style={{ animationDelay: `${index * 0.07 + 0.55}s` } as any}
                >
                  <div 
                    className="icon-badge-row" 
                    style={{ background: hexToRgba(skill.color, 0.15) }}
                  >
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.path}`} 
                      alt={skill.name}
                      onError={(e) => {
                        (e.currentTarget as any).style.display = 'none';
                        (e.currentTarget.parentElement as any).innerText = skill.name[0];
                      }}
                    />
                  </div>
                  <div className="info-col">
                    <p className="skill-name">{skill.name}</p>
                    <div className="progress-outer">
                      <div 
                        className="progress-fill"
                        style={{ 
                          background: `linear-gradient(90deg, ${hexToRgba(skill.color, 0.7)}, ${skill.color})`,
                          '--target-width': `${skill.percent}%`,
                          animationDelay: `${index * 0.12 + 0.75}s`
                        } as any}
                      ></div>
                    </div>
                  </div>
                  <span 
                    className="percent-label" 
                    style={{ color: skill.color, animationDelay: `${index * 0.12 + 0.85}s` } as any}
                  >
                    {skill.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;
