"use client";

import { useState, useEffect } from "react";

const ROLES = [
  "CSE Engineering Student",
  "Full-Stack Developer",
  "Software Engineer",
  "Problem Solver",
];

export default function Typewriter() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = ROLES[currentRoleIndex];
    
    // Determine typing speed based on state
    let speed = isDeleting ? 40 : 100;
    
    // Pause briefly when word is fully typed
    if (!isDeleting && currentText === fullText) {
      speed = 2000;
      timer = setTimeout(() => setIsDeleting(true), speed);
    } 
    // Move to next word when completely deleted
    else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      speed = 400; // brief pause before typing next word
      timer = setTimeout(() => {}, speed);
    }
    // Typing or Deleting
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
    <div className="typewriter-container h-8 mb-5 animate-sophisticated delay-1">
      <h2 className="text-2xl text-muted font-medium inline-block">
        {currentText}
        <span className="cursor-blink">|</span>
      </h2>
    </div>
  );
}
