"use client";

import { useState, useEffect } from "react";
import { User, Code2, Star, Mail } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`floating-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-brand">
        <span className="font-bold text-lg">Yash P. Singh</span>
      </div>
      
      <div className="nav-links">
        <a href="#about" className="nav-link">
          <User size={16} /> <span className="hidden-mobile">About</span>
        </a>
        <a href="#skills" className="nav-link">
          <Code2 size={16} /> <span className="hidden-mobile">Skills</span>
        </a>
        <a href="#projects" className="nav-link">
          <Star size={16} /> <span className="hidden-mobile">Projects</span>
        </a>
        <a href="mailto:ys6463@srmist.edu.in" className="nav-link highlight">
          <Mail size={16} /> <span className="hidden-mobile">Contact</span>
        </a>
      </div>
    </nav>
  );
}
