"use client";

import React from "react";
import Image from "next/image";

export default function ProfileImage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .profile-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          cursor: pointer;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .profile-wrapper {
            width: 170px;
            height: 170px;
          }
        }

        .profile-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow: 0 0 25px rgba(124, 58, 237, 0.5), 0 0 60px rgba(6, 182, 212, 0.2);
          animation: glowPulse 3s ease-in-out infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 0;
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 25px rgba(124,58,237,0.5), 0 0 50px rgba(6,182,212,0.15); }
          50% { box-shadow: 0 0 40px rgba(124,58,237,0.8), 0 0 80px rgba(6,182,212,0.3); }
        }

        .profile-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed);
          animation: spinRing 4s linear infinite;
          z-index: 1;
          /* Keep animation continuous by only changing duration, though duration transitions can be jumpy.
             We will instead use a wrapper trick or accept the jump. A better way for smooth spin change 
             is not transitioning duration. But we will follow requirement. */
        }

        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }

        .profile-inner {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
          background: #000;
          z-index: 2;
        }

        .profile-img-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .profile-wrapper:hover .profile-ring {
          animation-duration: 1.5s;
        }

        .profile-wrapper:hover .profile-glow {
          /* Scale box-shadow by roughly 1.3 */
          transform: scale(1.05); /* Optional physical scale for glow */
          box-shadow: 0 0 32px rgba(124,58,237,0.65), 0 0 78px rgba(6,182,212,0.26) !important;
        }

        .profile-wrapper:hover .profile-img-element {
          transform: scale(1.04);
        }

        /* Floating Particles */
        .particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          margin-top: -2px;
          margin-left: -2px;
          border-radius: 50%;
          opacity: 0.7;
          z-index: 3;
          pointer-events: none;
        }

        .p1 { background: #7c3aed; animation: orbit1 6s linear infinite; }
        .p2 { background: #06b6d4; animation: orbit2 8s linear infinite; }
        .p3 { background: #7c3aed; animation: orbit3 10s linear infinite; }
        .p4 { background: #06b6d4; animation: orbit4 7s linear infinite; }

        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(90deg) translateX(130px) rotate(-90deg); }
          to { transform: rotate(450deg) translateX(130px) rotate(-450deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(180deg) translateX(115px) rotate(-180deg); }
          to { transform: rotate(540deg) translateX(115px) rotate(-540deg); }
        }
        @keyframes orbit4 {
          from { transform: rotate(270deg) translateX(125px) rotate(-270deg); }
          to { transform: rotate(630deg) translateX(125px) rotate(-630deg); }
        }

        @media (max-width: 768px) {
          @keyframes orbit1 {
            from { transform: rotate(0deg) translateX(95px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(95px) rotate(-360deg); }
          }
          @keyframes orbit2 {
            from { transform: rotate(90deg) translateX(105px) rotate(-90deg); }
            to { transform: rotate(450deg) translateX(105px) rotate(-450deg); }
          }
          @keyframes orbit3 {
            from { transform: rotate(180deg) translateX(90px) rotate(-180deg); }
            to { transform: rotate(540deg) translateX(90px) rotate(-540deg); }
          }
          @keyframes orbit4 {
            from { transform: rotate(270deg) translateX(100px) rotate(-270deg); }
            to { transform: rotate(630deg) translateX(100px) rotate(-630deg); }
          }
        }
      `
      }} />
      <div className="profile-wrapper">
        <div className="profile-glow"></div>
        <div className="profile-ring"></div>
        <div className="profile-inner">
          <Image
            src="/profile.jpeg"
            alt="Yash Pratap Singh"
            width={280}
            height={280}
            className="profile-img-element"
            priority
          />
        </div>
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
      </div>
    </>
  );
}
