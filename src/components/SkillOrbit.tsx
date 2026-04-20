"use client";

import React from "react";
import { LucideIcon, Monitor, Code2 } from "lucide-react";
import { FaJava, FaHtml5, FaCss3Alt, FaJs, FaSwift, FaGitAlt, FaReact, FaDatabase, FaApple } from "react-icons/fa";
import { SiCplusplus, SiMysql, SiIntellijidea, SiNextdotjs } from "react-icons/si";
import { TbLetterC } from "react-icons/tb";

// Internal icon mapping to fix serialization errors in Next.js App Router
const ICON_MAP: Record<string, any> = {
  // Languages
  "Java": FaJava,
  "C++": SiCplusplus,
  "C": TbLetterC,
  "Swift": FaSwift,
  "HTML": FaHtml5,
  "CSS": FaCss3Alt,
  "JavaScript": FaJs,
  // Tools & Frameworks
  "Git": FaGitAlt,
  "SQL": FaDatabase,
  "MySQL": SiMysql,
  "SwiftUI": FaApple,
  "IntelliJ": SiIntellijidea,
  "React": FaReact,
  "Next.js": SiNextdotjs,
  // Center Icons
  "Monitor": Monitor,
  "Code2": Code2
};

interface SkillItem {
  name: string;
}

interface SkillOrbitProps {
  title: string;
  centerIconName: string;
  skills: string[] | SkillItem[];
  radius?: number;
  rotationDuration?: number;
}

const SkillOrbit: React.FC<SkillOrbitProps> = ({
  title,
  centerIconName,
  skills,
  radius = 200,
  rotationDuration = 30,
}) => {
  const CenterIcon = ICON_MAP[centerIconName] || Code2;
  
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
          const skillName = typeof skill === 'string' ? skill : skill.name;
          const SkillIcon = ICON_MAP[skillName];
          const angle = (index / skills.length) * 360;
          
          return (
            <div 
              key={skillName}
              className="satellite-wrapper"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`
              }}
            >
              <div className="satellite-item badge cursor-pointer" style={{ animationDuration: `${rotationDuration}s` }}>
                {SkillIcon && <SkillIcon size={20} className="skill-icon" />}
                <span className="skill-name">{skillName}</span>
                
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
