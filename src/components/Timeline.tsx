"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  certs?: string[];
  isLast?: boolean;
}

const TimelineItem = ({ title, subtitle, date, description, certs, isLast }: TimelineItemProps) => {
  return (
    <div className="relative flex gap-8 mb-12 last:mb-0">
      {/* Node & Line */}
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#00d4aa] border-[#00d4aa]/30 z-10"
        >
          <GraduationCap size={20} />
        </motion.div>
        {!isLast && (
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-[2px] bg-gradient-to-b from-[#00d4aa]/50 via-white/5 to-transparent flex-1 mt-2"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 pb-8"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-bold display-font text-white">{title}</h3>
            <p className="text-[#00d4aa] font-medium text-sm">{subtitle}</p>
          </div>
          <span className="mono-font text-[10px] text-gray-500 font-bold uppercase tracking-widest">{date}</span>
        </div>
        
        {description && <p className="text-gray-400 mt-4 leading-relaxed">{description}</p>}

        {certs && certs.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {certs.map((cert) => (
              <span key={cert} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-[10px] font-bold text-[#00d4aa] uppercase tracking-wide">
                <Award size={10} /> {cert}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  const education = [
    {
      title: "SRMIST",
      subtitle: "B.Tech in Computer Science Engineering",
      date: "2023 — Present",
      description: "First-year student focusing on systems programming, algorithmic research, and full-stack architecture. Currently maintaining a high GPA and active in IEEE research circles.",
      certs: ["IEEE Published Researcher", "Data Structures Specialization"]
    },
    {
      title: "Vatayan School",
      subtitle: "Higher Secondary (Class XII)",
      date: "2021 — 2023",
      description: "Excelled in Physics, Chemistry, and Mathematics. Developed initial interest in C++ and competitive programming.",
      certs: ["Academic Excellence Award"]
    },
    {
      title: "Narayana School",
      subtitle: "Secondary School (Class X)",
      date: "2019 — 2021",
      description: "Foundational studies in exact sciences and computer fundamentals."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      {education.map((item, index) => (
        <TimelineItem 
          key={item.title} 
          {...item} 
          isLast={index === education.length - 1} 
        />
      ))}
    </div>
  );
};

export default Timeline;
