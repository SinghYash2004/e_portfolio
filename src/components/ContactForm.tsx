"use client";

import { useState } from "react";
import { Mail, Send, AlertCircle, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // TODO: Replace with your actual email service (Nodemailer, SendGrid, etc.)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error sending message. Please contact me directly at ys6463@srmist.edu.in");
    }
  };

  return (
    <section id="contact" className="animate-fade-in delay-4 reveal section-shell section-shell-contact">
      <div className="section-atmosphere atmosphere-contact" aria-hidden="true" />
      
      <div className="flex items-center gap-2 mb-8 section-divider reveal masked-section-header">
        <Mail className="gradient-text" size={32} />
        <h2 className="text-3xl font-bold">Get In Touch</h2>
      </div>

      <div className="contact-container">
        <div className="contact-form-wrapper glass-panel reveal section-panel">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows={5}
                className="form-input"
              />
            </div>

            {status === "success" && (
              <div className="status-message success-message full-width">
                <CheckCircle size={20} />
                <span>{message}</span>
              </div>
            )}

            {status === "error" && (
              <div className="status-message error-message full-width">
                <AlertCircle size={20} />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="form-submit-btn full-width"
            >
              <Send size={18} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-info-wrapper">
          <div className="contact-info-card glass-panel reveal section-panel">
            <h3 className="text-xl font-bold mb-4">Reach Out Directly</h3>
            <p className="text-muted mb-6">Feel free to contact me through any of these channels:</p>
            
            <div className="contact-methods">
              <a href="mailto:ys6463@srmist.edu.in" className="contact-method-link badge">
                <Mail size={18} />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted">ys6463@srmist.edu.in</div>
                </div>
              </a>
              
              <div className="contact-method badge">
                <span>📱</span>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm text-muted">+91-7061293059</div>
                </div>
              </div>

              <a href="https://linkedin.com/in/yash-pratap-singh-b43925327/" target="_blank" rel="noreferrer" className="contact-method-link badge">
                <span>💼</span>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm text-muted">Yash Pratap Singh</div>
                </div>
              </a>

              <a href="https://github.com/SinghYash2004" target="_blank" rel="noreferrer" className="contact-method-link badge">
                <span>💻</span>
                <div>
                  <div className="font-semibold">GitHub</div>
                  <div className="text-sm text-muted">SinghYash2004</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
