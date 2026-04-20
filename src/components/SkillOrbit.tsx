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
    </div>
  );
};

export default SkillOrbit;
