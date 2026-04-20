"use client";

import React, { useEffect, useRef } from "react";

const TechSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rows = containerRef.current.querySelectorAll(".skill-row");
    
    rows.forEach(row => {
      row.addEventListener("mouseenter", () => {
        const img = row.querySelector("img");
        if (img) img.classList.add("icon-spin-active");
      });
      
      row.addEventListener("mouseleave", () => {
        const img = row.querySelector("img");
        if (img) img.classList.remove("icon-spin-active");
      });

      row.addEventListener("click", () => {
        const isActive = row.classList.contains("row-active");
        
        rows.forEach(r => {
          r.classList.remove("row-active");
          (r as HTMLElement).style.boxShadow = "none";
        });
        
        if (!isActive) {
          row.classList.add("row-active");
          triggerParticleBurst(row);
        }
      });
    });

    const triggerParticleBurst = (row: Element) => {
      const card = row.closest(".section-card");
      if (!card) return;
      const particlesContainer = card.querySelector(".particles");
      if (!particlesContainer) return;

      const rect = row.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const centerY = rect.top - cardRect.top + rect.height / 2;
      const centerX = rect.left - cardRect.left + rect.width / 2;

      const brandColor = (row as HTMLElement).getAttribute("data-color") || "#6e50ff";

      for (let i = 0; i < 7; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.background = brandColor;
        p.style.top = `${centerY}px`;
        p.style.left = `${centerX}px`;
        
        const tx = (Math.random() * 60 - 30) + "px";
        const ty = (Math.random() * 60 - 30) + "px";
        p.style.setProperty("--tx", tx);
        p.style.setProperty("--ty", ty);
        
        p.style.animation = `particlePrePop 1s ease forwards ${i * 0.05}s`;
        
        particlesContainer.appendChild(p);
        setTimeout(() => p.remove(), 1200);
      }
    };
  }, []);

  const parseHexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const languages = [
    { name: "Java", path: "java/java-original.svg", color: "#f89820", percent: 88 },
    { name: "C++", path: "cplusplus/cplusplus-original.svg", color: "#00599c", percent: 75 },
    { name: "C", path: "c/c-original.svg", color: "#5c6bc0", percent: 72 },
    { name: "Swift", path: "swift/swift-original.svg", color: "#fa7343", percent: 65 },
    { name: "HTML", path: "html5/html5-original.svg", color: "#e34c26", percent: 93 },
    { name: "CSS", path: "css3/css3-original.svg", color: "#264de4", percent: 87 },
    { name: "JavaScript", path: "javascript/javascript-original.svg", color: "#f7df1e", percent: 91 },
  ];

  const tools = [
    { name: "Git", path: "git/git-original.svg", color: "#f1502f", percent: 89 },
    { name: "SQL", path: "azuresqldatabase/azuresqldatabase-original.svg", color: "#00758f", percent: 80 },
    { name: "MySQL", path: "mysql/mysql-original.svg", color: "#00758f", percent: 76 },
    { name: "SwiftUI", path: "swift/swift-original.svg", color: "#fa7343", percent: 62 },
    { name: "IntelliJ", path: "intellij/intellij-original.svg", color: "#e53888", percent: 78 },
    { name: "React", path: "react/react-original.svg", color: "#61dafb", percent: 85 },
    { name: "Next.js", path: "nextjs/nextjs-original.svg", color: "#ffffff", percent: 71 },
  ];

  return (
    <div className="tech-skills-root" ref={containerRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        .tech-skills-root {
          background: #080b18;
          border-radius: 24px;
          padding: 2rem 1.75rem 2.5rem;
          overflow: hidden;
          position: relative;
          color: #fff;
        }

        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }
        .orb-1 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(100,60,255,.18) 0%, transparent 70%); top: -100px; left: -100px; animation: bgFloat 8s ease-in-out infinite; }
        .orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(60,160,255,.12) 0%, transparent 70%); bottom: -150px; right: -50px; animation: bgFloat 11s ease-in-out infinite reverse; animation-delay: -2s; }
        .orb-3 { width: 250px; height: 250px; background: radial-gradient(circle, rgba(200,80,255,.1) 0%, transparent 70%); top: 40%; right: 10%; animation: bgFloat 9.5s ease-in-out infinite; animation-delay: -4s; }

        @keyframes bgFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 0.9; }
        }

        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(120,80,255,.04), transparent);
          z-index: 0;
          pointer-events: none;
          animation: scanBar 3s linear infinite;
        }

        @keyframes scanBar {
          from { top: 0%; }
          to { top: 100%; }
        }

        .tech-content { position: relative; z-index: 1; }

        .tech-header { text-align: center; margin-bottom: 2.5rem; }
        .tech-header h2 {
          font-size: 32px; font-weight: 700; margin: 0 0 8px;
          background: linear-gradient(90deg, #fff 0%, #c4b5fd 30%, #818cf8 60%, #38bdf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleReveal .8s ease both, shimmerText 4s linear infinite 1s;
        }
        .tech-header p {
          font-size: 13px; color: rgba(150,140,200,.7); letter-spacing: .15em; text-transform: uppercase; margin: 0;
          animation: fadeUp .8s ease both .3s;
        }

        @keyframes titleReveal {
          from { opacity: 0; letter-spacing: .4em; filter: blur(8px); }
          to { opacity: 1; letter-spacing: -.02em; filter: blur(0); }
        }
        @keyframes shimmerText {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 768px) { .tech-grid { grid-template-columns: 1fr; } }

        .section-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(120,100,255,.18);
          border-radius: 18px;
          padding: 1.5rem;
          backdrop-filter: blur(4px);
          position: relative;
          animation: fadeUp .7s ease both, borderPulse 4s ease-in-out infinite;
        }
        .card-tools { animation-delay: .15s; }

        @keyframes borderPulse {
          0%, 100% { border-color: rgba(120,80,255,.2); }
          50% { border-color: rgba(160,140,255,.55); }
        }

        .card-header {
          display: flex; align-items: center; gap: 12px; padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(120,100,255,.12); margin-bottom: 1.25rem;
        }
        .icon-badge {
          width: 34px; height: 34px; border-radius: 10px; background: rgba(110,80,255,.2);
          display: flex; align-items: center; justify-content: center; font-size: 16px;
          animation: badgeFloat 3s ease-in-out infinite;
        }
        .card-header span { font-size: 12.5px; font-weight: 600; color: rgba(180,165,255,.85); letter-spacing: .12em; text-transform: uppercase; }

        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .skill-row {
          display: flex; align-items: center; gap: 11px; padding: 10px 12px; border-radius: 12px;
          margin-bottom: 6px; cursor: pointer; border: 1px solid transparent; 
          position: relative; overflow: hidden; transition: .25s;
          animation: fadeUp .6s ease both;
        }
        .skill-row:hover { background: rgba(110,80,255,.12); border-color: rgba(130,100,255,.35); transform: translateX(5px); }
        .skill-row::after {
          content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(120,80,255,.1), transparent 60%);
          opacity: 0; transition: .25s; pointer-events: none;
        }
        .skill-row:hover::after { opacity: 1; }

        .skill-row.row-active { background: rgba(110,80,255,.18); border-color: rgba(160,130,255,.5); animation: rowActivePulse 2s ease-in-out infinite; }
        @keyframes rowActivePulse {
          0% { box-shadow: 0 0 0 0 rgba(130,100,255,0.4); }
          70% { box-shadow: 0 0 0 6px rgba(130,100,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(130,100,255,0); }
        }

        .tech-icon-badge {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .tech-icon-badge img { width: 22px; height: 22px; object-fit: contain; transition: .5s; }
        .icon-spin-active { transform: rotateY(360deg); }

        .skill-info { flex: 1; min-width: 0; }
        .skill-name { font-size: 14.5px; font-weight: 500; color: #e2e0ff; margin: 0 0 6px; }

        .progress-outer { height: 4px; background: rgba(255,255,255,.07); border-radius: 2px; overflow: hidden; }
        .progress-inner { height: 4px; border-radius: 2px; width: 0; opacity: 0; animation: barGrow 1.2s forwards; }
        .row-active .progress-inner { box-shadow: 0 0 8px rgba(160,130,255,0.6); }

        @keyframes barGrow {
          from { width: 0; opacity: 0; }
          to { width: var(--pw); opacity: 1; }
        }

        .percent-label {
          font-size: 13px; font-weight: 600; min-width: 32px; text-align: right;
          animation: numSlide .5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        @keyframes numSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; border-radius: 18px; }
        .particle { position: absolute; width: 3px; height: 3px; border-radius: 50%; opacity: 0; }
        @keyframes particlePrePop {
          0% { transform: translate(0,0) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.5); opacity: 0; }
        }
      `}} />

      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>
      <div className="scan-line"></div>

      <div className="tech-content">
        <header className="tech-header">
          <h2>Technical Skills</h2>
          <p>Stack & Expertise</p>
        </header>

        <div className="tech-grid">
          {/* Languages Section */}
          <div className="section-card card-languages">
            <div className="particles"></div>
            <header className="card-header">
              <div className="icon-badge">💻</div>
              <span>Languages</span>
            </header>
            <div className="skill-rows">
              {languages.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className="skill-row" 
                  data-color={skill.color}
                  style={{ animationDelay: `${index * 0.07 + 0.4}s` }}
                >
                  <div className="tech-icon-badge" style={{ background: parseHexToRgba(skill.color, 0.15) }}>
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.path}`}
                      alt={skill.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) parent.innerText = skill.name[0];
                      }}
                    />
                  </div>
                  <div className="skill-info">
                    <p className="skill-name">{skill.name}</p>
                    <div className="progress-outer">
                      <div 
                        className="progress-inner" 
                        style={{ 
                          background: `linear-gradient(90deg, ${parseHexToRgba(skill.color, 0.7)}, ${skill.color})`,
                          ['--pw' as any]: `${skill.percent}%`,
                          animationDelay: `${index * 0.12 + 0.6}s`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div 
                    className="percent-label" 
                    style={{ color: skill.color, animationDelay: `${index * 0.1 + 0.8}s` }}
                  >
                    {skill.percent}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="section-card card-tools">
            <div className="particles"></div>
            <header className="card-header">
              <div className="icon-badge">⚙️</div>
              <span>Tools & Frameworks</span>
            </header>
            <div className="skill-rows">
              {tools.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className="skill-row" 
                  data-color={skill.color}
                  style={{ animationDelay: `${index * 0.07 + 0.55}s` }}
                >
                  <div className="tech-icon-badge" style={{ background: parseHexToRgba(skill.color, 0.15) }}>
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.path}`}
                      alt={skill.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) parent.innerText = skill.name[0];
                      }}
                    />
                  </div>
                  <div className="skill-info">
                    <p className="skill-name">{skill.name}</p>
                    <div className="progress-outer">
                      <div 
                        className="progress-inner" 
                        style={{ 
                          background: `linear-gradient(90deg, ${parseHexToRgba(skill.color, 0.7)}, ${skill.color})`,
                          ['--pw' as any]: `${skill.percent}%`,
                          animationDelay: `${index * 0.12 + 0.75}s`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div 
                    className="percent-label" 
                    style={{ color: skill.color, animationDelay: `${index * 0.1 + 0.95}s` }}
                  >
                    {skill.percent}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSkills;
