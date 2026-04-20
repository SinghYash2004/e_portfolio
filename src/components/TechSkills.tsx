"use client";

import React from "react";
import { motion } from "framer-motion";

const TechSkills = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Languages */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa] border border-[#00d4aa]/20">
              💻
            </div>
            <h3 className="text-xl font-bold display-font uppercase tracking-wider">Languages</h3>
          </div>
          
          <div className="space-y-6">
            {languages.map((skill) => (
              <SkillRow key={skill.name} skill={skill} parseHexToRgba={parseHexToRgba} />
            ))}
          </div>
        </motion.div>

        {/* Tools & Frameworks */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
              ⚙️
            </div>
            <h3 className="text-xl font-bold display-font uppercase tracking-wider">Tools & Frameworks</h3>
          </div>

          <div className="space-y-6">
            {tools.map((skill) => (
              <SkillRow key={skill.name} skill={skill} parseHexToRgba={parseHexToRgba} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SkillRow = ({ skill, parseHexToRgba }: { skill: any, parseHexToRgba: any }) => {
  return (
    <div className="group cursor-default">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg]" 
            style={{ background: parseHexToRgba(skill.color, 0.15) }}
          >
            <img 
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.path}`}
              alt={skill.name}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) parent.innerText = skill.name[0];
              }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="mono-font text-xs font-bold" style={{ color: skill.color }}>
          {skill.percent}%
        </span>
      </div>

      <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full relative"
          style={{ 
            background: `linear-gradient(90deg, ${parseHexToRgba(skill.color, 0.7)}, ${skill.color})`
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default TechSkills;
