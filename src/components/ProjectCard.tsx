"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Award } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  isIEEE?: boolean;
  links?: { github?: string; demo?: string };
}

const ProjectCard = ({ title, description, tags, isIEEE, links }: ProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full glass-card rounded-2xl p-8 md:p-12 mb-12"
    >
      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-3xl md:text-4xl font-bold display-font">{title}</h3>
            {isIEEE && (
              <span className="gold-shimmer text-[10px] flex items-center gap-1 uppercase tracking-widest px-3 py-1 rounded-full">
                <Award size={12} /> IEEE Published
              </span>
            )}
          </div>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-[#00d4aa] mono-font uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-6">
            {links?.github && (
              <a href={links.github} className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-[#00d4aa] transition-colors">
                <Github size={18} /> View Source
              </a>
            )}
            {links?.demo && (
              <a href={links.demo} className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-[#00d4aa] transition-colors">
                <ExternalLink size={18} /> Live Project
              </a>
            )}
            <button className="text-xs font-bold text-white underline underline-offset-8 decoration-[#00d4aa] hover:text-[#00d4aa] transition-all uppercase tracking-widest">
              Project Details
            </button>
          </div>
        </div>

        <div className="hidden md:block w-32 h-32 rounded-2xl bg-gradient-to-br from-[#00d4aa]/20 to-transparent border border-[#00d4aa]/10" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-[#00d4aa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-[-1]" />
    </motion.div>
  );
};

export default ProjectCard;
