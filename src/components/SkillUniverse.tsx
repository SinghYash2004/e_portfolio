"use client";

import React from "react";
import { LucideIcon, Monitor, Code2, Cpu, Globe, Rocket, Star, Shield, Zap } from "lucide-react";
import { FaJava, FaHtml5, FaCss3Alt, FaJs, FaSwift, FaGitAlt, FaReact, FaDatabase, FaApple } from "react-icons/fa";
import { SiCplusplus, SiMysql, SiIntellijidea, SiNextdotjs } from "react-icons/si";
import { TbLetterC } from "react-icons/tb";

const ICON_MAP: Record<string, any> = {
  "Java": FaJava, "C++": SiCplusplus, "C": TbLetterC, "Swift": FaSwift,
  "HTML": FaHtml5, "CSS": FaCss3Alt, "JavaScript": FaJs,
  "Git": FaGitAlt, "SQL": FaDatabase, "MySQL": SiMysql, "SwiftUI": FaApple,
  "IntelliJ": SiIntellijidea, "React": FaReact, "Next.js": SiNextdotjs,
  "Monitor": Monitor, "Code2": Code2, "Cpu": Cpu, "Globe": Globe, "Rocket": Rocket,
  "Star": Star, "Shield": Shield, "Zap": Zap
};

interface SkillRing {
  name: string;
  skills: string[];
  radius: number;
  rotationDuration: number;
}

interface SkillUniverseProps {
  centerTitle: string;
  centerIconName: string;
  rings: SkillRing[];
}

const SkillUniverse: React.FC<SkillUniverseProps> = ({
  centerTitle,
  centerIconName,
  rings,
}) => {
  const CenterIcon = ICON_MAP[centerIconName] || Code2;
  
  return (
    <div className="universe-viewport">
      <div className="universe-container">
        
        {/* Deep Space Ambient Glows */}
        <div className="nebula-glow n-1" />
        <div className="nebula-glow n-2" />
        
        {/* Central Core */}
        <div className="universe-core glass-panel shadow-glow animate-float">
          <div className="core-inner">
            <CenterIcon className="gradient-text" size={36} />
            <span className="core-label">{centerTitle}</span>
          </div>
          <div className="core-orbitals">
            <div className="orbital-ring o-1" />
            <div className="orbital-ring o-2" />
          </div>
        </div>

        {/* Dynamic Rings */}
        {rings.map((ring, rIdx) => (
          <div 
            key={ring.name}
            className="skill-ring-wrapper" 
            style={{ 
              width: ring.radius * 2, 
              height: ring.radius * 2,
            }}
          >
            {/* Background Path */}
            <div className="ring-path" />
            
            {/* Satellite System */}
            <div className="ring-system" style={{ animationDuration: `${ring.rotationDuration}s` }}>
              {ring.skills.map((skill, sIdx) => {
                const SkillIcon = ICON_MAP[skill];
                const angle = (sIdx / ring.skills.length) * 360;
                
                return (
                  <div 
                    key={skill}
                    className="satellite-wrapper"
                    style={{ transform: `rotate(${angle}deg) translateX(${ring.radius}px) rotate(-${angle}deg)` }}
                  >
                    <div className="skill-entity" style={{ animationDuration: `${ring.rotationDuration}s` }}>
                      <div className="entity-content">
                        {SkillIcon && <SkillIcon className="entity-icon" size={26} />}
                        <span className="entity-name">{skill}</span>
                        {/* Connecting Line to Center */}
                        <div className="constellation-line" style={{ width: ring.radius, left: -ring.radius }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillUniverse;
