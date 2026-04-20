"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  "Systems Programmer",
  "IEEE Published Researcher",
  "Web Developer",
  "CS Student",
];

export default function Typewriter() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = ROLES[currentRoleIndex];
    
    let speed = isDeleting ? 30 : 80;
    
    if (!isDeleting && currentText === fullText) {
      speed = 2500;
      timer = setTimeout(() => setIsDeleting(true), speed);
    } 
    else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      speed = 400;
      timer = setTimeout(() => {}, speed);
    }
    else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting 
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <div className="h-10 mb-8 overflow-hidden">
      <h3 className="text-xl md:text-2xl text-[#00d4aa] font-medium mono-font tracking-tight flex items-center">
        <span className="opacity-70 mr-2">&gt;</span>
        {currentText}
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
          className="ml-1 w-2 h-6 bg-[#00d4aa]/50"
        />
      </h3>
    </div>
  );
}
