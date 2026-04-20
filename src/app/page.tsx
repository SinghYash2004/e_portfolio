"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Linkedin, 
  Github, ExternalLink, ArrowRight,
  MousePointer2, Sparkles, Code2
} from "lucide-react";

import Typewriter from "@/components/Typewriter";
import TechSkills from "@/components/TechSkills";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import ClientTilt from "@/components/ClientTilt";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <main className="relative min-h-screen">
      {/* Global Ambient Background */}
      <div className="ambient-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <div className="container relative z-10">
        {/* --- HERO SECTION --- */}
        <section id="about" className="min-h-screen flex flex-col justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6 text-[#00d4aa] mono-font text-sm font-bold tracking-widest uppercase">
                <Sparkles size={16} /> <span>Available for Internships</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold display-font leading-[1.1] mb-6">
                Redefining the <br /> 
                <span className="gradient-text">Digital Frontier.</span>
              </motion.h1>

              <motion.div variants={itemVariants}>
                <Typewriter />
              </motion.div>

              <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                First-year CS student at SRMIST with an IEEE-published paper already under his belt. 
                I architect systems, build for the web, and write code that performs — and I&apos;m just getting started.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <a href="#projects" className="cta-button cta-primary group flex items-center gap-2">
                  View My Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="cta-button cta-secondary">
                  Get In Touch
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-8 mt-12 pt-12 border-t border-white/5">
                {[
                  { icon: Mail, label: "Email", href: "mailto:ys6463@srmist.edu.in" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yash-pratap-singh-b43925327/" },
                  { icon: Github, label: "GitHub", href: "https://github.com" },
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00d4aa] transition-colors"
                  >
                    <social.icon size={16} /> {social.label}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <ClientTilt className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
                <div className="absolute inset-0 rounded-full border border-[#00d4aa]/20 p-4 animate-pulse">
                  <div className="w-full h-full rounded-full border border-[#00d4aa]/40 p-4">
                    <div className="w-full h-full rounded-full border border-[#00d4aa]/60 overflow-hidden shadow-[0_0_50px_rgba(0,212,170,0.2)]">
                      <Image 
                        src="/profile.jpeg" 
                        alt="Yash Pratap Singh" 
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 glass-card rounded-xl flex items-center justify-center text-[#00d4aa] rotate-12">
                  <Code2 size={24} />
                </div>
              </ClientTilt>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#00d4aa] to-transparent animate-bounce" />
          </motion.div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section id="skills" className="section-padding">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold display-font mb-4">Mastered <span className="text-[#00d4aa]">Stack.</span></h2>
            <div className="w-20 h-[2px] bg-[#00d4aa]" />
          </div>
          <TechSkills />
        </section>

        <div className="divider" />

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="section-padding">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold display-font mb-4">Inception to <span className="text-[#00d4aa]">Execution.</span></h2>
              <p className="text-gray-500 max-w-md">Highlighting key architectural feats and research contributions.</p>
            </div>
            <div className="hidden md:block w-32 h-[2px] bg-white/5 mb-8" />
          </div>

          <div className="flex flex-col gap-8">
            <ProjectCard 
              title="Multithreaded Web Server"
              description="Architected a high-performance multithreaded HTTP server in C++ using POSIX sockets, capable of handling concurrent static content requests with a priority-based thread pool and load-balanced task queue. Research published and presented at IEEE ICAECT 2026."
              tags={["C++", "POSIX", "IEEE Paper", "Multithreading"]}
              isIEEE
              links={{ github: "#" }}
            />
            <ProjectCard 
              title="Intelligent Academic ERP"
              description="Designing an intelligent academic ERP prototype that fuses relational database architecture, constraint-based scheduling algorithms, and ML-driven prediction models to automate conflict-free timetabling and forecast resource utilization."
              tags={["Algorithm Design", "ML", "ERP Architecture", "Next.js"]}
              links={{ github: "#" }}
            />
          </div>
        </section>

        <div className="divider" />

        {/* --- EDUCATION SECTION --- */}
        <section id="education" className="section-padding">
           <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold display-font mb-4">Academic <span className="text-[#00d4aa]">Odyssey.</span></h2>
            <div className="w-20 h-[2px] bg-[#00d4aa]" />
          </div>
          <Timeline />
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="section-padding mb-20">
          <div className="glass-card rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-ping" />
                <span className="text-[10px] font-bold text-[#00d4aa] uppercase tracking-widest">Open to New Opportunities</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold display-font mb-8">Let&apos;s Build the <span className="gradient-text">Future.</span></h2>
              <p className="text-gray-400 max-w-lg mb-12">I&apos;m always interested in hearing about new projects, research collaboration, or just a friendly chat about systems architecture.</p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <a href="mailto:ys6463@srmist.edu.in" className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform flex items-center gap-2">
                  <Mail size={20} /> Send an Email
                </a>
                <a href="https://linkedin.com/in/yash-pratap-singh-b43925327/" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-2">
                  <Linkedin size={20} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4aa]/5 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-50">
          <p className="text-xs font-medium uppercase tracking-[0.2em]">&copy; 2026 Yash Pratap Singh. Engineered for Performance.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors"><MousePointer2 size={16} /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin size={16} /></a>
            <a href="#" className="hover:text-white transition-colors"><Github size={16} /></a>
          </div>
        </footer>
      </div>
    </main>
  );
}
