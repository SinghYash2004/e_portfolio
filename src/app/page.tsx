"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Download,
  GraduationCap,
  Award,
  BookOpen,
  Star,
  ChevronRight,
} from "lucide-react";
import Typewriter from "@/components/Typewriter";
import ClientTilt from "@/components/ClientTilt";
import TechnicalSkills from "@/components/TechnicalSkills";

type RevealStyle = React.CSSProperties & { "--reveal-i": number };

export default function Home() {
  const revealStyle = (index: number): RevealStyle => ({ "--reveal-i": index });

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

  return (
    <main className="container">
      <section
        id="about"
        className="hero-section hero-flex flex justify-between gap-8 items-center relative"
        style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
      >
        <ClientTilt
          className="glass-panel animate-sophisticated"
          style={{ flex: 1, padding: "4rem 3rem" }}
        >
          <div className="avail-pill">
            <span className="avail-dot" />
            <span>Open to opportunities</span>
          </div>
          <h1 className="text-5xl font-bold mb-3 animate-title">
            Hi, I&apos;m <span className="shimmer-text gradient-name">Yash Pratap Singh</span>
          </h1>
          <Typewriter />
          <p
            className="text-muted text-lg animate-sophisticated delay-2"
            style={{ maxWidth: "600px" }}
          >
            B.Tech Computer Science student with a working knowledge of programming and software
            development. Passionate about learning new technologies and applying them to develop
            efficient software solutions.
          </p>

          <div id="contact" className="contact-links mt-8 animate-sophisticated delay-3">
            <a
              href="mailto:ys6463@srmist.edu.in"
              className="contact-link badge hover:scale-105 transition-transform duration-300 reveal"
              style={revealStyle(0)}
            >
              <Mail size={16} /> ys6463@srmist.edu.in
            </a>
            <span
              className="contact-link badge hover:scale-105 transition-transform duration-300 reveal"
              style={revealStyle(1)}
            >
              <Phone size={16} /> +91-7061293059
            </span>
            <span
              className="contact-link badge hover:scale-105 transition-transform duration-300 reveal"
              style={revealStyle(2)}
            >
              <MapPin size={16} /> Tiruchirappalli, TN, India
            </span>
            <a
              href="https://linkedin.com/in/yash-pratap-singh-b43925327/"
              target="_blank"
              rel="noreferrer"
              className="contact-link badge hover:scale-105 transition-transform duration-300 reveal"
              style={revealStyle(3)}
            >
              <LinkIcon size={16} /> LinkedIn
            </a>
          </div>
          <a
            href="mailto:ys6463@srmist.edu.in?subject=Resume%20Request%20from%20Portfolio"
            className="btn-resume mt-4"
          >
            <Download size={14} />
            Request Resume
          </a>
        </ClientTilt>

        <ClientTilt
          className="profile-img-container profile-shell-clean hero-profile-wrap animate-profile-entrance"
          style={{ width: "280px", height: "280px", flexShrink: 0 }}
        >
          <div className="animate-float" style={{ width: "100%", height: "100%" }}>
            <div className="profile-aura-wrap">
              <div className="profile-aura-core">
                <Image
                  src="/profile.jpeg"
                  alt="Yash Pratap Singh"
                  width={280}
                  height={280}
                  className="profile-img shadow-glow hover:scale-105 transition-transform duration-500 cursor-pointer"
                  priority
                />
              </div>
            </div>
          </div>
        </ClientTilt>
      </section>

      <hr className="divider hero-divider" style={{ marginTop: "0" }} />
      <div className="grad-rule hero-divider" />

      <section id="skills" className="animate-fade-in delay-1 reveal">
        <TechnicalSkills />
      </section>

      <hr className="divider" />
      <div className="grad-rule" />

      <section id="projects" className="animate-fade-in delay-2 project-showcase">
        <div className="flex items-center gap-2 mb-8 section-divider">
          <Star className="gradient-text" size={32} />
          <h2 className="text-3xl font-bold">Projects & Achievements</h2>
        </div>

        <div className="timeline project-timeline">
          <div className="timeline-item glass-panel project-card-enhanced reveal">
            <div className="flex justify-between flex-wrap gap-4 mb-2">
              <h3 className="text-xl font-bold project-title">Compact Multithreaded Web Server</h3>
              <span className="text-muted project-year">2025</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {["C++", "Socket Programming", "Multithreading", "Thread Pool", "TCP"].map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
            <ul className="list-none flex flex-col gap-3 text-muted project-copy project-list">
              <li className="flex gap-2 items-start">
                <ChevronRight className="text-primary mt-1 shrink-0" size={16} />
                <span>
                  Developed a lightweight multithreaded HTTP web server in C++ using POSIX sockets
                  to handle concurrent static content requests. Implemented a priority-based thread
                  pool and load-balanced task queue to improve request scheduling and overall server
                  efficiency.
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <ChevronRight className="text-primary mt-1 shrink-0" size={16} />
                <span>
                  Presented the paper &quot;Compact Multithreaded Web Server for Static Request
                  Handling&quot; at the IEEE-sponsored ICAECT 2026 international conference. The
                  work demonstrates a C++ multithreaded server architecture for efficient
                  concurrent HTTP request handling.
                </span>
              </li>
            </ul>
          </div>

          <div className="timeline-item glass-panel project-card-enhanced reveal">
            <div className="flex justify-between flex-wrap gap-4 mb-2">
              <h3 className="text-xl font-bold project-title">Intelligent Academic ERP System</h3>
              <span className="text-muted project-year">2026</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {["DBMS", "Algorithm Design", "ERP Architecture", "ML"].map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-muted project-copy">
              Developing an academic prototype that integrates relational database design,
              scheduling algorithms, and machine learning models to generate conflict-free
              timetables, predict resource utilization, and support data-driven academic planning.
            </p>
          </div>
        </div>
      </section>

      <hr className="divider" />
      <div className="grad-rule" />

      <section id="education" className="animate-fade-in delay-3">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6 section-divider">
              <GraduationCap className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="timeline edu-timeline">
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
            <div className="flex items-center gap-2 mb-6 section-divider">
              <BookOpen className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Relevant Coursework</h2>
            </div>
            <div className="glass-panel">
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

            <div className="flex items-center gap-2 mb-6 mt-8 section-divider">
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
                <div className="cert-issuer">IEEE Sponsored Conference</div>
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
                <div className="cert-issuer">Add issuer and certificate link</div>
              </div>
              <div className="cert-card-styled reveal" style={revealStyle(4)}>
                <div className="cert-name">Data Science Math Skills</div>
                <div className="cert-issuer">Add issuer and certificate link</div>
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
