"use client";

import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Professor Name",
    role: "Academic Advisor",
    company: "SRMIST",
    text: "Add testimonials from your professors, colleagues, or clients here. They help build credibility and social proof.",
    avatar: "👨‍🏫",
  },
  {
    name: "Project Collaborator",
    role: "Software Developer",
    company: "Your Project",
    text: "Share feedback about your collaboration, work ethic, and technical skills from real people you've worked with.",
    avatar: "👨‍💼",
  },
  {
    name: "Industry Professional",
    role: "Tech Lead",
    company: "Company Name",
    text: "Testimonials from internships, hackathons, or professional engagements strengthen your portfolio significantly.",
    avatar: "👩‍💼",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="animate-fade-in delay-5 reveal section-shell section-shell-testimonials">
      <div className="section-atmosphere atmosphere-testimonials" aria-hidden="true" />
      
      <div className="flex items-center gap-2 mb-8 section-divider reveal masked-section-header">
        <Star className="gradient-text" size={32} />
        <h2 className="text-3xl font-bold">Testimonials</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card glass-panel reveal section-panel"
            style={{ "--reveal-i": String(index) } as React.CSSProperties}
          >
            <div className="stars mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star-icon">⭐</span>
              ))}
            </div>
            
            <p className="testimonial-text mb-6 text-muted">{testimonial.text}</p>
            
            <div className="testimonial-author">
              <div className="author-avatar">{testimonial.avatar}</div>
              <div className="author-info">
                <div className="author-name font-semibold">{testimonial.name}</div>
                <div className="author-role text-sm text-muted">{testimonial.role}</div>
                <div className="author-company text-xs text-muted">{testimonial.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="testimonials-note mt-12 p-6 rounded-lg bg-rgba(99, 102, 241, 0.05) border border-rgba(99, 102, 241, 0.2) text-center">
        <p className="text-muted">
          💡 <strong>TODO:</strong> Replace placeholder testimonials with real feedback from professors, colleagues, or clients.
        </p>
      </div>
    </section>
  );
}
