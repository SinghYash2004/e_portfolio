"use client";

import React, { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import {
  MapPin,
  Link as LinkIcon,
  Download,
  GraduationCap,
  Award,
  BookOpen,
  Star,
} from "lucide-react";
import Typewriter from "@/components/Typewriter";
import ClientTilt from "@/components/ClientTilt";
import TechnicalSkills from "@/components/TechnicalSkills";
import MagneticLink from "@/components/MagneticLink";
import ProjectCard from "@/components/ProjectCard";
import ProfileImage from "@/components/ProfileImage";
import ContactForm from "@/components/ContactForm";
import BlogSection from "@/components/BlogSection";


const PROJECTS_DATA = [
  {
    title: "Compact Multithreaded Web Server",
    year: "2025",
    tags: ["C++", "Socket Programming", "Multithreading", "Thread Pool", "TCP"],
    descriptionLines: [
      "Developed a lightweight multithreaded HTTP web server in C++ using POSIX sockets to handle concurrent static content requests. Implemented a priority-based thread pool and load-balanced task queue to improve request scheduling and overall server efficiency.",
      "Presented the paper \"Compact Multithreaded Web Server for Static Request Handling\" at the IEEE-sponsored ICAECT 2026 international conference. The work demonstrates a C++ multithreaded server architecture for efficient concurrent HTTP request handling.",
    ],
    githubLink: "https://github.com/SinghYash2004/multi_threaded_web_server.git",
    paperLink: "https://ieeexplore.ieee.org/document/11426147",
  },
  {
    title: "Intelligent Academic ERP System",
    year: "2026",
    tags: ["Java", "Spring Boot", "MySQL", "Genetic Algorithm", "Graph Coloring"],
    descriptionLines: [
      "Built a full-stack academic ERP that automates conflict-free timetable generation using three interchangeable scheduling algorithms — Genetic Algorithm, Graph Coloring, and Greedy — with configurable parameters for population size, mutation rate, and constraint weights.",
      "Engineered a Spring Boot MVC dashboard with role-based authentication, real-time conflict detection, AI-powered risk analysis, financial budget tracking, and exportable reports (CSV/PDF/Excel) backed by a MySQL relational schema with full CRUD operations.",
    ],
    githubLink: "https://github.com/SinghYash2004/TimeTableGenerator.git",
    liveLink: "https://timetablegenerator-595z.onrender.com/",
  },
];

const CERTS = [
  { name: "Research Paper Presentation (ICAECT 2026)", issuer: "IEEE Sponsored Conference", link: "https://ieeexplore.ieee.org/document/11426147" },
  { name: "Intro to Computer Organization", issuer: "IIIT Hyderabad" },
  { name: "Web Security & Social Engineering", issuer: "Packt" },
  { name: "Analysis of Algorithm", issuer: "" },
  { name: "Data Science Math Skills", issuer: "" },
  { name: "Sustainable Development in the 21st Century", issuer: "Ban Ki-moon" },
];

type RevealStyle = React.CSSProperties & { "--reveal-i": string };

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const revealStyle = (index: number): RevealStyle => ({ "--reveal-i": String(index) });


  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleHeroParallax: React.MouseEventHandler<HTMLElement> = (event) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty("--hero-mx", x.toFixed(3));
    heroRef.current.style.setProperty("--hero-my", y.toFixed(3));
  };

  const resetHeroParallax = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty("--hero-mx", "0");
    heroRef.current.style.setProperty("--hero-my", "0");
  };

  return (
    <main className="container">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={heroRef}
        className="hero-section hero-flex flex justify-between gap-8 items-center relative reveal"
        style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
        // Mobile overrides handled in globals.css via @media
        onMouseMove={handleHeroParallax}
        onMouseLeave={resetHeroParallax}
      >

        <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
        <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

        {/* Hero info card — 3D tilt with holographic depth layers */}
        <ClientTilt
          className="glass-panel animate-sophisticated hero-copy-shell section-panel"
          style={{ flex: 1, padding: "4rem 3rem" }}
          maxAngle={10}
        >
          <div className="avail-pill depth-1">
            <span className="avail-dot" />
            <span>Open to opportunities</span>
          </div>

          <h1 className="text-5xl font-bold mb-3 animate-title hero-heading depth-3 animate-hero-stagger-1">
            Hi, I&apos;m <span className="shimmer-text enhanced-shimmer gradient-name">Yash Pratap Singh</span>
          </h1>

          <div className="depth-2 animate-hero-stagger-2">
            <Typewriter />
          </div>

          <p
            className="text-muted text-lg animate-sophisticated delay-2 hero-lead depth-1 animate-hero-stagger-3"
            style={{ maxWidth: "600px" }}
          >
            Computer Science undergraduate with a consistent 10 CGPA across two years of
            engineering and a strong interest in programming, algorithms, and software development.
            Driven by curiosity and a fundamentals-first approach to learning, I enjoy solving
            problems, exploring new technologies, and building efficient software systems that
            combine logic, scalability, and practical impact.
          </p>

          <div className="contact-links mt-8 animate-sophisticated delay-3 depth-1">
            <MagneticLink
              href="mailto:ys6463@srmist.edu.in"
              className="contact-link badge hover:scale-105 transition-transform duration-300"
            >
              <MdMail size={16} /> ys6463@srmist.edu.in
            </MagneticLink>
            <span className="contact-link badge hover:scale-105 transition-transform duration-300">
              <FiPhone size={16} /> +91-7061293059
            </span>
            <span className="contact-link badge hover:scale-105 transition-transform duration-300">
              <MapPin size={16} /> Tiruchirappalli, TN, India
            </span>
            <MagneticLink
              href="https://linkedin.com/in/yash-pratap-singh-b43925327/"
              target="_blank"
              rel="noreferrer"
              className="contact-link badge hover:scale-105 transition-transform duration-300"
            >
              <LinkIcon size={16} /> LinkedIn
            </MagneticLink>
            <MagneticLink
              href="https://github.com/SinghYash2004"
              target="_blank"
              rel="noreferrer"
              className="contact-link badge hover:scale-105 transition-transform duration-300"
            >
              <FaGithub size={16} /> GitHub
            </MagneticLink>
          </div>

          <div className="depth-2">
            <MagneticLink href="/resume.pdf" download className="btn-resume mt-4 primary-cta">
              <Download size={14} />
              Download Resume
            </MagneticLink>
          </div>
        </ClientTilt>

        {/* Profile image — counter-tilts slightly */}
        <ClientTilt
          className="animate-profile-entrance reveal"
          style={{ flexShrink: 0 }}
          maxAngle={8}
        >
          <ProfileImage />
        </ClientTilt>
      </section>

      <hr className="divider hero-divider" style={{ marginTop: "0" }} />
      <div className="grad-rule hero-divider" />

      {/* ── SKILLS ───────────────────────────────────────────────────── */}
      <section id="skills" className="animate-fade-in delay-1 reveal section-shell section-shell-skills">
        <div className="section-atmosphere atmosphere-skills" aria-hidden="true" />
        <TechnicalSkills />
      </section>

      <hr className="divider" />
      <div className="grad-rule" />

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      <section id="projects" className="animate-fade-in delay-2 project-showcase reveal section-shell section-shell-projects">
        <div className="section-atmosphere atmosphere-projects" aria-hidden="true" />
        <div className="flex items-center gap-2 mb-8 section-divider reveal masked-section-header" style={revealStyle(0)}>
          <Star className="gradient-text" size={32} />
          <h2 className="text-3xl font-bold">Projects &amp; Achievements</h2>
        </div>
        <div className="project-timeline-premium">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={index} index={index} {...project} />
          ))}
        </div>
      </section>

      <hr className="divider" />
      <div className="grad-rule" />

      {/* ── EDUCATION ────────────────────────────────────────────────── */}
      <section id="education" className="animate-fade-in delay-3 reveal section-shell section-shell-education">
        <div className="section-atmosphere atmosphere-education" aria-hidden="true" />
        <div className="grid grid-cols-2 gap-8">
          {/* Education timeline */}
          <div>
            <div className="flex items-center gap-2 mb-6 section-divider reveal masked-section-header" style={revealStyle(1)}>
              <GraduationCap className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="timeline edu-timeline reveal timeline-draw">
              <div className="timeline-item edu-entry reveal" style={revealStyle(0)}>
                <h3 className="text-lg font-bold">Bachelor of Technology in Computer Science</h3>
                <p className="text-muted font-medium">SRM Institute of Science and Technology (SRMIST)</p>
                <p className="text-sm text-muted">07/2024 - 07/2028 | Trichy, India</p>
              </div>
              <div className="timeline-item edu-entry reveal" style={revealStyle(1)}>
                <h3 className="text-lg font-bold">Senior School Certificate (SSC)</h3>
                <p className="text-muted font-medium">Vatayan School, Bihar</p>
                <p className="text-sm text-muted">2021 - 2023 | Siwan, India</p>
              </div>
              <div className="timeline-item edu-entry reveal" style={revealStyle(2)}>
                <h3 className="text-lg font-bold">Indian Certificate of Secondary Education</h3>
                <p className="text-muted font-medium">Narayana School</p>
                <p className="text-sm text-muted">2016 - 2021 | Howrah, India</p>
              </div>
            </div>
          </div>

          {/* Coursework + Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6 section-divider reveal masked-section-header" style={revealStyle(2)}>
              <BookOpen className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Relevant Coursework</h2>
            </div>
            <div className="glass-panel reveal section-panel" style={revealStyle(3)}>
              <div className="flex flex-wrap gap-2">
                <span className="cw-tag">Data Structures &amp; Algorithms</span>
                <span className="cw-tag">Operating Systems</span>
                <span className="cw-tag">Database Management (DBMS)</span>
                <span className="cw-tag">Object-Oriented Programming</span>
                <span className="cw-tag">Algorithm Design</span>
                <span className="cw-tag">Computer Organization</span>
                <span className="cw-tag">System Programming</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 mt-8 section-divider reveal masked-section-header" style={revealStyle(4)}>
              <Award className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Certifications</h2>
            </div>
            <div
              className="cert-grid-responsive"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
                gap: "10px",
              }}
            >
              {CERTS.map((cert, i) => (
                <div key={i} className="cert-flip-outer reveal" style={revealStyle(i)}>
                  <div className="cert-flip-inner">
                    {/* Front face */}
                    <div className="cert-flip-front cert-card-styled">
                      <div className="cert-name">{cert.name}</div>
                      {cert.issuer && (
                        <div className="cert-issuer">
                          {cert.link ? (
                            <a href={cert.link} target="_blank" rel="noreferrer">{cert.issuer}</a>
                          ) : (
                            cert.issuer
                          )}
                        </div>
                      )}
                    </div>
                    {/* Back face */}
                    <div className="cert-flip-back">
                      <div className="cert-back-glow" aria-hidden="true" />
                      <span className="cert-verified-icon">✦</span>
                      <p className="cert-back-name">{cert.name}</p>
                      <span className="cert-badge">Verified ✓</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />
      <div className="grad-rule" />

      <BlogSection />

      <hr className="divider" />
      <div className="grad-rule" />

      <ContactForm />

      <hr className="divider" />
      <div className="grad-rule" />

      <footer className="footer-enhanced">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="font-bold mb-4">Yash Pratap Singh</h3>
            <p className="text-muted text-sm">Full-stack developer passionate about solving complex problems with elegant code.</p>
          </div>

          <div className="footer-section">
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about" className="text-muted hover:text-white transition">About</a></li>
              <li><a href="#skills" className="text-muted hover:text-white transition">Skills</a></li>
              <li><a href="#projects" className="text-muted hover:text-white transition">Projects</a></li>
              <li><a href="#education" className="text-muted hover:text-white transition">Education</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-semibold mb-3">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://github.com/SinghYash2004" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition">GitHub</a></li>
              <li><a href="https://linkedin.com/in/yash-pratap-singh-b43925327/" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition">LinkedIn</a></li>
              <li><a href="mailto:ys6463@srmist.edu.in" className="text-muted hover:text-white transition">Email</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="footer-links">
              <li><a href="/resume.pdf" className="text-muted hover:text-white transition">Resume</a></li>
              <li><a href="#blog" className="text-muted hover:text-white transition">Blog</a></li>
              <li><a href="#contact" className="text-muted hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="text-sm text-muted">&copy; 2026 Yash Pratap Singh. All rights reserved.</p>
          <p className="text-sm text-muted">Built with Next.js 16, React 19 &amp; TypeScript</p>
        </div>
      </footer>
    </main>
  );
}
