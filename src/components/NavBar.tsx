"use client";

import { useState, useEffect } from "react";
import { User, Code2, FolderKanban, GraduationCap, Mail, BookOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const navItems: NavItem[] = [
    { id: "about", label: "About", icon: <User size={20} /> },
    { id: "skills", label: "Skills", icon: <Code2 size={20} /> },
    { id: "projects", label: "Projects", icon: <FolderKanban size={20} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={20} /> },
    { id: "blog", label: "Blog", icon: <BookOpen size={20} /> },
    { id: "contact", label: "Contact", icon: <Mail size={20} />, highlight: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track which section is in view
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      let currentSection = "about";
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 3);

        if (distance < minDistance) {
          minDistance = distance;
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`floating-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-brand">
        <span className="font-bold text-sm">Y P S</span>
      </div>
      
      <div className="nav-links">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${isActive ? "active" : ""} ${item.highlight ? "highlight" : ""}`}
              title={item.label}
            >
              <div className="nav-icon-container">
                {item.icon}
                <span className={`nav-label ${isActive ? "active-label" : ""}`}>
                  {item.label}
                </span>
              </div>
            </a>
          );
        })}
        <ThemeToggle />
      </div>
    </nav>
  );
}
