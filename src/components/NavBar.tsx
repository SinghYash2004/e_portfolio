"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic scroll spy
      const sections = ["about", "skills", "projects", "education", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 flex justify-center items-center py-4 px-6 ${
        scrolled ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
      }`}
    >
      <div className="max-width-[1200px] w-full flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold display-font tracking-tighter"
        >
          YPS<span className="text-[#00d4aa]">.</span>
        </motion.div>

        <div className="flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-white ${
                activeSection === link.id ? "text-white" : "text-gray-400"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00d4aa]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-5 py-2 rounded-full border border-[#00d4aa]/30 text-xs font-bold text-[#00d4aa] hover:bg-[#00d4aa]/10 transition-all"
        >
          LET'S TALK
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default NavBar;
