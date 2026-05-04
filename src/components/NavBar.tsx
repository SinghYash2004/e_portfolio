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

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", icon: <User size={20} /> },
  { id: "skills", label: "Skills", icon: <Code2 size={20} /> },
  { id: "projects", label: "Projects", icon: <FolderKanban size={20} /> },
  { id: "education", label: "Education", icon: <GraduationCap size={20} /> },
  { id: "blog", label: "Blog", icon: <BookOpen size={20} /> },
  { id: "contact", label: "Contact", icon: <Mail size={20} />, highlight: true },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      if (sections.length === 0) return;

      const scrollPosition = window.scrollY;
      const pageBottom =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollPosition >= pageBottom - 2) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const activationLine = Math.min(window.innerHeight * 0.38, 360);
      const currentSection =
        sections.reduce((current, section) => {
          const sectionTop = section.getBoundingClientRect().top + scrollPosition;
          return sectionTop <= scrollPosition + activationLine ? section.id : current;
        }, sections[0].id) || "about";

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav className={`floating-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-brand">
        <span className="font-bold text-sm">Y P S</span>
      </div>
      
      <div className="nav-links">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${isActive ? "active" : ""} ${item.highlight ? "highlight" : ""}`}
              title={item.label}
              aria-current={isActive ? "true" : undefined}
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
