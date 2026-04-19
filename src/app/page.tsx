import Image from "next/image";
import { Mail, Phone, MapPin, Link as LinkIcon, Code2, Monitor, GraduationCap, Award, BookOpen, Star, ChevronRight, CheckCircle2 } from "lucide-react";
import { FaJava, FaHtml5, FaCss3Alt, FaJs, FaSwift, FaGitAlt, FaReact, FaDatabase, FaApple } from "react-icons/fa";
import { SiCplusplus, SiMysql, SiIntellijidea, SiNextdotjs } from "react-icons/si";
import { TbLetterC } from "react-icons/tb";

export default function Home() {
  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero-section hero-flex animate-fade-in flex justify-between gap-8 flex-wrap items-center">
        <div className="glass-panel" style={{ flex: 1, padding: '4rem 3rem' }}>
          <h1 className="text-4xl font-bold mb-2">
            Hi, I'm <span className="gradient-text">Yash Pratap Singh</span>
          </h1>
          <h2 className="text-xl text-muted font-medium mb-4">CSE Engineering Student</h2>
          <p className="text-muted text-lg" style={{ maxWidth: '600px' }}>
            B.Tech Computer Science student with a working knowledge of programming and software development. 
            Passionate about learning new technologies and applying them to develop efficient software solutions.
          </p>
          
          <div className="contact-links mt-8">
            <a href="mailto:ys6463@srmist.edu.in" className="contact-link badge hover:scale-105 transition-transform duration-300">
              <Mail size={16} /> ys6463@srmist.edu.in
            </a>
            <span className="contact-link badge hover:scale-105 transition-transform duration-300">
              <Phone size={16} /> +91-7061293059
            </span>
            <span className="contact-link badge hover:scale-105 transition-transform duration-300">
              <MapPin size={16} /> Tiruchirappalli, TN, India
            </span>
            <a href="https://linkedin.com/in/yash-pratap-singh-b43925327/" target="_blank" rel="noreferrer" className="contact-link badge hover:scale-105 transition-transform duration-300">
              <LinkIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>
        
        <div className="profile-img-container" style={{ width: '280px', height: '280px', flexShrink: 0 }}>
          <Image 
            src="/profile.jpeg" 
            alt="Yash Pratap Singh" 
            width={280} 
            height={280} 
            className="profile-img shadow-glow hover:scale-105 transition-transform duration-500 cursor-pointer"
            priority
          />
        </div>
      </section>

      <hr className="divider" />

      {/* Skills Section */}
      <section className="animate-fade-in delay-1">
        <div className="flex items-center gap-2 mb-8">
          <Code2 className="gradient-text" size={32} />
          <h2 className="text-3xl font-bold">Technical Skills</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-16">
          <div className="glass-panel">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Monitor size={20} /> Programming Languages</h3>
            <div className="flex flex-wrap gap-5">
              <span className="badge animate-fade-in delay-1 cursor-pointer"><FaJava size={18}/> Java</span>
              <span className="badge animate-fade-in delay-2 cursor-pointer"><SiCplusplus size={18}/> C++</span>
              <span className="badge animate-fade-in delay-3 cursor-pointer"><TbLetterC size={20}/> C</span>
              <span className="badge animate-fade-in delay-4 cursor-pointer"><FaSwift size={18}/> Swift</span>
              <span className="badge animate-fade-in delay-5 cursor-pointer"><FaHtml5 size={18}/> HTML</span>
              <span className="badge animate-fade-in delay-6 cursor-pointer"><FaCss3Alt size={18}/> CSS</span>
              <span className="badge animate-fade-in delay-1 cursor-pointer"><FaJs size={18}/> JavaScript</span>
            </div>
          </div>
          <div className="glass-panel">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Code2 size={20} /> Tools & Frameworks</h3>
            <div className="flex flex-wrap gap-5">
              <span className="badge animate-fade-in delay-1 cursor-pointer"><FaGitAlt size={18}/> Git</span>
              <span className="badge animate-fade-in delay-2 cursor-pointer"><FaDatabase size={18}/> SQL</span>
              <span className="badge animate-fade-in delay-3 cursor-pointer"><SiMysql size={18}/> MySQL</span>
              <span className="badge animate-fade-in delay-4 cursor-pointer"><FaApple size={20}/> SwiftUI</span>
              <span className="badge animate-fade-in delay-5 cursor-pointer"><SiIntellijidea size={18}/> IntelliJ</span>
              <span className="badge animate-fade-in delay-6 cursor-pointer"><FaReact size={18}/> React</span>
              <span className="badge animate-fade-in delay-1 cursor-pointer"><SiNextdotjs size={18}/> Next.js</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Projects Section */}
      <section className="animate-fade-in delay-2">
        <div className="flex items-center gap-2 mb-8">
          <Star className="gradient-text" size={32} />
          <h2 className="text-3xl font-bold">Projects & Achievements</h2>
        </div>
        
        <div className="timeline">
          <div className="timeline-item glass-panel">
            <div className="flex justify-between flex-wrap gap-4 mb-2">
              <h3 className="text-xl font-bold">Compact Multithreaded Web Server</h3>
              <span className="text-muted">2025</span>
            </div>
            <p className="text-sm text-primary mb-4 font-medium">C++ | Socket Programming | Multithreading | Thread Pool | TCP</p>
            <ul className="list-none flex flex-col gap-3 text-muted">
              <li className="flex gap-2 items-start"><ChevronRight className="text-primary mt-1 shrink-0" size={16} /> <span>Developed a lightweight multithreaded HTTP web server in C++ using POSIX sockets to handle concurrent static content requests. Implemented a priority-based thread pool and load-balanced task queue to improve request scheduling and overall server efficiency.</span></li>
              <li className="flex gap-2 items-start"><ChevronRight className="text-primary mt-1 shrink-0" size={16} /> <span>Presented the paper &quot;Compact Multithreaded Web Server for Static Request Handling&quot; at the IEEE-sponsored ICAECT 2026 international conference. The work demonstrates a C++ multithreaded server architecture for efficient concurrent HTTP request handling.</span></li>
            </ul>
          </div>

          <div className="timeline-item glass-panel">
            <div className="flex justify-between flex-wrap gap-4 mb-2">
              <h3 className="text-xl font-bold">Intelligent Academic ERP System</h3>
              <span className="text-muted">2026</span>
            </div>
            <p className="text-sm text-primary mb-4 font-medium">DBMS | Algorithm Design | ERP Architecture</p>
            <p className="text-muted">
              Developing an academic prototype that integrates relational database design, scheduling algorithms, and machine learning models to generate conflict-free timetables, predict resource utilization, and support data-driven academic planning.
            </p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Education & Coursework */}
      <section className="animate-fade-in delay-3">
        <div className="grid grid-cols-2 gap-8">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <h3 className="text-lg font-bold">Bachelor of Technology in Computer Science</h3>
                <p className="text-muted font-medium">SRM Institute of Science and Technology (SRMIST)</p>
                <p className="text-sm text-muted">07/2024 - 07/2028 | Trichy, India</p>
              </div>
              <div className="timeline-item">
                <h3 className="text-lg font-bold">Senior School Certificate (SSC)</h3>
                <p className="text-muted font-medium">Vatayan School, Bihar</p>
                <p className="text-sm text-muted">2021 - 2023 | Siwan, India</p>
              </div>
              <div className="timeline-item">
                <h3 className="text-lg font-bold">Indian Certificate of Secondary Education</h3>
                <p className="text-muted font-medium">Narayana School</p>
                <p className="text-sm text-muted">2016 - 2021 | Howrah, India</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Relevant Coursework</h2>
            </div>
            <div className="glass-panel">
              <div className="flex flex-wrap gap-2">
                <span className="badge">Data Structures & Algorithms</span>
                <span className="badge">Operating Systems</span>
                <span className="badge">Database Management (DBMS)</span>
                <span className="badge">Object-Oriented Programming</span>
                <span className="badge">Algorithm Design</span>
                <span className="badge">Computer Organization</span>
                <span className="badge">System Programming</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 mt-8">
              <Award className="gradient-text" size={28} />
              <h2 className="text-2xl font-bold">Certifications</h2>
            </div>
            <ul className="list-none flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={16} /> <span><strong>Research Paper Presentation (ICAECT 2026)</strong> - IEEE Sponsored Conference</span></li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={16} /> <span><strong>Intro to Computer Organization</strong> - IIIT Hyderabad</span></li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={16} /> <span><strong>Web Security & Social Engineering</strong> - Packt</span></li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={16} /> <span><strong>Analysis of Algorithm</strong></span></li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={16} /> <span><strong>Data Science Math Skills</strong></span></li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={16} /> <span><strong>Sustainable Development in the 21st Century</strong> - Ban Ki-moon</span></li>
            </ul>
          </div>
          
        </div>
      </section>
      
      <footer className="text-center py-8 text-sm text-muted">
        <p>© 2024 Yash Pratap Singh. Built with Next.js.</p>
      </footer>
    </main>
  );
}
