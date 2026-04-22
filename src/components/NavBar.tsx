"use client";

import { useState, useEffect } from "react";
import { User, Code2, Star, Mail } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "education", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45, rootMargin: "-10% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`floating-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-brand">
        <span className="font-bold text-lg">Yash P. Singh</span>
      </div>
      
      <div className="nav-links">
        <a href="#about" className={`nav-link ${activeSection === "about" ? "active" : ""}`}>
          <User size={16} /> <span className="hidden-mobile">About</span>
        </a>
        <a href="#skills" className={`nav-link ${activeSection === "skills" ? "active" : ""}`}>
          <Code2 size={16} /> <span className="hidden-mobile">Skills</span>
        </a>
        <a href="#projects" className={`nav-link ${activeSection === "projects" ? "active" : ""}`}>
          <Star size={16} /> <span className="hidden-mobile">Projects</span>
        </a>
        <a href="#education" className={`nav-link ${activeSection === "education" ? "active" : ""}`}>
          <Star size={16} /> <span className="hidden-mobile">Education</span>
        </a>
        <a href="#contact" className={`nav-link highlight ${activeSection === "contact" ? "active" : ""}`}>
          <Mail size={16} /> <span className="hidden-mobile">Contact</span>
        </a>
      </div>
    </nav>
  );
}
