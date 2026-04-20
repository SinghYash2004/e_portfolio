"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SkillItem {
  icon: any; // Using any for icon flexibility (lucide or react-icons)
  name: string;
  color?: string;
}

interface SkillOrbitProps {
  title: string;
  centerIcon: LucideIcon;
  skills: SkillItem[];
  radius?: number;
  innerRadius?: number;
  rotationDuration?: number;
}

const SkillOrbit: React.FC<SkillOrbitProps> = ({
  title,
  centerIcon: CenterIcon,
  skills,
  radius = 200,
  rotationDuration = 30,
}) => {
  return (
    <div className="orbit-container" style={{ 
      height: `${radius * 2 + 100}px`,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Decorative Outer Rings */}
      <div className="orbit-ring orbit-ring-outer" style={{ width: radius * 2, height: radius * 2 }}></div>
      <div className="orbit-ring orbit-ring-inner" style={{ width: radius * 1.4, height: radius * 1.4 }}></div>

      {/* Central Hub */}
      <div className="orbit-hub glass-panel shadow-glow">
        <CenterIcon className="gradient-text mb-1" size={32} />
        <span className="text-sm font-bold text-center leading-tight">{title}</span>
        
        {/* Pulsing Atmosphere */}
        <div className="hub-pulse"></div>
      </div>

      {/* Satellites */}
      <div className="satellite-system" style={{ 
        animationDuration: `${rotationDuration}s`,
        width: radius * 2,
        height: radius * 2
      }}>
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * 360;
          return (
            <div 
              key={skill.name}
              className="satellite-wrapper"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`
              }}
            >
              <div className="satellite-item badge cursor-pointer" style={{ animationDuration: `${rotationDuration}s` }}>
                <skill.icon size={20} className="skill-icon" />
                <span className="skill-name">{skill.name}</span>
                
                {/* Individual satellite glow */}
                <div className="satellite-glow"></div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .orbit-container {
          perspective: 1000px;
        }

        .orbit-hub {
          z-index: 10;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(15, 17, 21, 0.8);
          border: 2px solid var(--glass-border);
          position: absolute;
          padding: 1rem;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .orbit-hub:hover {
          transform: scale(1.1) rotate(5deg);
          border-color: var(--primary);
          box-shadow: 0 0 50px rgba(99, 102, 241, 0.4);
        }

        .hub-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--primary);
          opacity: 0.1;
          filter: blur(20px);
          animation: pulse 4s infinite;
          z-index: -1;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.5); opacity: 0.2; }
        }

        .orbit-ring {
          position: absolute;
          border: 1px dashed rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          z-index: 1;
        }

        .orbit-ring-outer {
          border: 1px solid rgba(99, 102, 241, 0.05);
          box-shadow: inset 0 0 50px rgba(99, 102, 241, 0.02);
        }

        .orbit-ring-inner {
          border: 1px dashed rgba(168, 85, 247, 0.1);
        }

        .satellite-system {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: orbit-rotate linear infinite;
          z-index: 5;
        }

        @keyframes orbit-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .satellite-wrapper {
          position: absolute;
          transition: all 0.3s ease;
        }

        .satellite-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          background: rgba(15, 17, 21, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          white-space: nowrap;
          animation: counter-rotate linear infinite;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        @keyframes counter-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .satellite-item:hover {
          transform: scale(1.25) translateY(-5px);
          background: rgba(99, 102, 241, 0.15);
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4), 0 0 20px rgba(168, 85, 247, 0.3);
          z-index: 100;
        }

        .satellite-system:hover {
          animation-play-state: paused;
        }

        .satellite-item:hover .satellite-glow {
          opacity: 1;
        }

        .satellite-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.4), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .skill-icon {
          transition: transform 0.3s ease;
        }

        .satellite-item:hover .skill-icon {
          transform: scale(1.2) rotate(10deg);
          color: #fff;
        }

        .skill-name {
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        @media (max-width: 768px) {
          .orbit-container {
            height: 450px !important;
            transform: scale(0.8);
          }
          .orbit-hub {
            width: 110px;
            height: 110px;
          }
        }

        @media (max-width: 480px) {
          .orbit-container {
            height: 400px !important;
            transform: scale(0.65);
          }
        }
      `}</style>
    </div>
  );
};

export default SkillOrbit;
