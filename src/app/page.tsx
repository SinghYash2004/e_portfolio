"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Download,
  ExternalLink,
  GraduationCap,
  Award,
  BookOpen,
  Star,
  ChevronRight,
} from "lucide-react";
import Typewriter from "@/components/Typewriter";
import ClientTilt from "@/components/ClientTilt";
import TechnicalSkills from "@/components/TechnicalSkills";
import MagneticLink from "@/components/MagneticLink";
import ProjectCard from "@/components/ProjectCard";

const PROJECTS_DATA = [
  {
    title: "Compact Multithreaded Web Server",
    year: "2025",
    tags: ["C++", "Socket Programming", "Multithreading", "Thread Pool", "TCP"],
    descriptionLines: [
      "Developed a lightweight multithreaded HTTP web server in C++ using POSIX sockets to handle concurrent static content requests. Implemented a priority-based thread pool and load-balanced task queue to improve request scheduling and overall server efficiency.",
      "Presented the paper \"Compact Multithreaded Web Server for Static Request Handling\" at the IEEE-sponsored ICAECT 2026 international conference. The work demonstrates a C++ multithreaded server architecture for efficient concurrent HTTP request handling."
    ],
    githubLink: "https://github.com/SinghYash2004/multi_threaded_web_server.git",
    paperLink: "https://ieeexplore.ieee.org/document/11426147"
  },
  {
    title: "Intelligent Academic ERP System",
    year: "2026",
    tags: ["Java", "Spring Boot", "MySQL", "Genetic Algorithm", "Graph Coloring"],
    descriptionLines: [
      "Built a full-stack academic ERP that automates conflict-free timetable generation using three interchangeable scheduling algorithms — Genetic Algorithm, Graph Coloring, and Greedy — with configurable parameters for population size, mutation rate, and constraint weights.",
      "Engineered a Spring Boot MVC dashboard with role-based authentication, real-time conflict detection, AI-powered risk analysis, financial budget tracking, and exportable reports (CSV/PDF/Excel) backed by a MySQL relational schema with full CRUD operations."
    ],
    githubLink: "https://github.com/SinghYash2004/TimeTableGenerator.git",
    liveLink: "https://timetablegenerator-595z.onrender.com/"
  }
];

type RevealStyle = React.CSSProperties & { "--reveal-i": string };

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const revealStyle = (index: number): RevealStyle => ({ "--reveal-i": String(index) });

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const spotlightCards = document.querySelectorAll<HTMLElement>(".project-card-enhanced");

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

    const handleSpotlightMove = (event: Event) => {
      const card = event.currentTarget as HTMLElement;
      const pointerEvent = event as MouseEvent;
      const rect = card.getBoundingClientRect();
      const x = pointerEvent.clientX - rect.left;
      const y = pointerEvent.clientY - rect.top;
      card.style.setProperty("--spot-x", `${x}px`);
      card.style.setProperty("--spot-y", `${y}px`);
    };

    spotlightCards.forEach((card) => {
      card.addEventListener("mousemove", handleSpotlightMove);
    });

    return () => {
      obs.disconnect();
      spotlightCards.forEach((card) => {
        card.removeEventListener("mousemove", handleSpotlightMove);
      });
    };
  }, []);

  const handleHeroParallax: React.MouseEventHandler<HTMLElement> = (event) => {
    if (!heroRef.current) {
      return;
    }

    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroRef.current.style.setProperty("--hero-mx", x.toFixed(3));
    heroRef.current.style.setProperty("--hero-my", y.toFixed(3));
  };

  const resetHeroParallax = () => {
    if (!heroRef.current) {
      return;
    }

    heroRef.current.style.setProperty("--hero-mx", "0");
    heroRef.current.style.setProperty("--hero-my", "0");
  };

  return (
    <main className="container">
      <section
        id="about"
        ref={heroRef}
        className="hero-section hero-flex flex justify-between gap-8 items-center relative reveal"
        style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
        onMouseMove={handleHeroParallax}
        onMouseLeave={resetHeroParallax}
      >
        <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
        <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
        <ClientTilt
          className="glass-panel animate-sophisticated hero-copy-shell section-panel"
          style={{ flex: 1, padding: "4rem 3rem" }}
        >
          <div className="avail-pill">
            <span className="avail-dot" />
            <span>Open to opportunities</span>
          </div>
          <h1 className="text-5xl font-bold mb-3 animate-title hero-heading">
            Hi, I&apos;m <span className="shimmer-text gradient-name">Yash Pratap Singh</span>
          </h1>
          <Typewriter />
          <p
            className="text-muted text-lg animate-sophisticated delay-2 hero-lead"
            style={{ maxWidth: "600px" }}
          >
            B.Tech Computer Science student with a working knowledge of programming and software
            development. Passionate about learning new technologies and applying them to develop
            efficient software solutions.
          </p>

          <div id="contact" className="contact-links mt-8 animate-sophisticated delay-3">
            <MagneticLink
              href="mailto:ys6463@srmist.edu.in"
              className="contact-link badge hover:scale-105 transition-transform duration-300"
            >
              <Mail size={16} /> ys6463@srmist.edu.in
            </MagneticLink>
            <span
              className="contact-link badge hover:scale-105 transition-transform duration-300"
            >
              <Phone size={16} /> +91-7061293059
            </span>
            <span
              className="contact-link badge hover:scale-105 transition-transform duration-300"
            >
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
          <MagneticLink href="/resume.pdf" download className="btn-resume mt-4 primary-cta" >
            <Download size={14} />
            Download Resume
          </MagneticLink>
        </ClientTilt>

        <ClientTilt
          className="profile-img-container profile-shell-clean hero-profile-wrap animate-profile-entrance reveal"
          style={{ width: "280px", height: "280px", flexShrink: 0 }}
        >
          <span className="orbit-particle orbit-one" aria-hidden="true" />
          <span className="orbit-particle orbit-two" aria-hidden="true" />
          <span className="orbit-particle orbit-three" aria-hidden="true" />
          <span className="profile-pulse-ring" aria-hidden="true" />
          <div className="animate-float" style={{ width: "100%", height: "100%" }}>
            <div className="profile-aura-wrap">
              <div className="profile-aura-core">
                <Image
                  src="/profile.jpeg"
                  alt="Yash Pratap Singh"
                  width={280}
                  height={280}
                  className="profile-img shadow-glow profile-image-fit cursor-pointer"
                  priority
                />
              </div>
            </div>
          </div>
        </ClientTilt>
      </section>

      <hr className="divider hero-divider" style={{ marginTop: "0" }} />
      <div className="grad-rule hero-divider" />

      <section id="skills" className="animate-fade-in delay-1 reveal section-shell section-shell-skills">
        <div className="section-atmosphere atmosphere-skills" aria-hidden="true" />
        <TechnicalSkills />
      </section>

      <hr className="divider" />
      <div className="grad-rule" />

      <section id="projects" className="animate-fade-in delay-2 project-showcase reveal section-shell section-shell-projects">
        <div className="section-atmosphere atmosphere-projects" aria-hidden="true" />
        <div className="flex items-center gap-2 mb-8 section-divider reveal masked-section-header" style={revealStyle(0)}>
          <Star className="gradient-text" size={32} />
          <h2 className="text-3xl font-bold">Projects & Achievements</h2>
        </div>

        <div className="project-timeline-premium">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={index} index={index} {...project} />
          ))}
        </div>
      </section>

      <hr className="divider" />
      <div className="grad-rule" />

      <section id="education" className="animate-fade-in delay-3 reveal section-shell section-shell-education">
        <div className="section-atmosphere atmosphere-education" aria-hidden="true" />
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6 section-divider reveal masked-section-header" style={revealStyle(1)}>
              <GraduationCap className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="timeline edu-timeline reveal timeline-draw">
              <div className="timeline-item edu-entry reveal" style={revealStyle(0)}>
                <h3 className="text-lg font-bold">Bachelor of Technology in Computer Science</h3>
                <p className="text-muted font-medium">
                  SRM Institute of Science and Technology (SRMIST)
                </p>
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

          <div>
            <div className="flex items-center gap-2 mb-6 section-divider reveal masked-section-header" style={revealStyle(2)}>
              <BookOpen className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Relevant Coursework</h2>
            </div>
            <div className="glass-panel reveal section-panel" style={revealStyle(3)}>
              <div className="flex flex-wrap gap-2">
                <span className="cw-tag">Data Structures & Algorithms</span>
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
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
                gap: "10px",
              }}
            >
              <div className="cert-card-styled reveal" style={revealStyle(0)}>
                <div className="cert-name">Research Paper Presentation (ICAECT 2026)</div>
                <div className="cert-issuer">
                  <a href="https://ieeexplore.ieee.org/document/11426147" target="_blank" rel="noreferrer">
                    IEEE Sponsored Conference
                  </a>
                </div>
              </div>
              <div className="cert-card-styled reveal" style={revealStyle(1)}>
                <div className="cert-name">Intro to Computer Organization</div>
                <div className="cert-issuer">IIIT Hyderabad</div>
              </div>
              <div className="cert-card-styled reveal" style={revealStyle(2)}>
                <div className="cert-name">Web Security & Social Engineering</div>
                <div className="cert-issuer">Packt</div>
              </div>
              <div className="cert-card-styled reveal" style={revealStyle(3)}>
                <div className="cert-name">Analysis of Algorithm</div>
              </div>
              <div className="cert-card-styled reveal" style={revealStyle(4)}>
                <div className="cert-name">Data Science Math Skills</div>
              </div>
              <div className="cert-card-styled reveal" style={revealStyle(5)}>
                <div className="cert-name">Sustainable Development in the 21st Century</div>
                <div className="cert-issuer">Ban Ki-moon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-muted">
        <p>&copy; 2026 Yash Pratap Singh. Built with Next.js.</p>
      </footer>
    </main>
  );
}
