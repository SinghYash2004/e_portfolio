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
    let timer: ReturnType<typeof setTimeout>;
    const fullText = ROLES[currentRoleIndex];

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 400);
    } else {
      const speed = isDeleting ? 40 : 100;
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
