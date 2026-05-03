"use client";

import { BookOpen, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building High-Performance Web Servers with C++",
    excerpt: "Deep dive into multithreading, socket programming, and optimization techniques used in production web servers.",
    date: "Coming Soon",
    readTime: "8 min read",
    category: "Backend",
    slug: "web-server-cpp",
  },
  {
    id: "2",
    title: "Solving Timetable Scheduling with Genetic Algorithms",
    excerpt: "Explore how evolutionary algorithms can solve complex scheduling problems and the trade-offs between different approaches.",
    date: "Coming Soon",
    readTime: "10 min read",
    category: "Algorithms",
    slug: "genetic-algorithm-scheduling",
  },
  {
    id: "3",
    title: "Full-Stack Development with Spring Boot and React",
    excerpt: "Learn best practices for building scalable applications, from backend architecture to frontend performance optimization.",
    date: "Coming Soon",
    readTime: "12 min read",
    category: "Full-Stack",
    slug: "fullstack-spring-react",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="animate-fade-in delay-4 reveal section-shell section-shell-blog">
      <div className="section-atmosphere atmosphere-blog" aria-hidden="true" />
      
      <div className="flex items-center gap-2 mb-8 section-divider reveal masked-section-header">
        <BookOpen className="gradient-text" size={32} />
        <h2 className="text-3xl font-bold">Articles & Insights</h2>
      </div>

      <p className="text-muted mb-12 max-w-2xl">
        I share insights about software development, algorithms, and technology on my blog. 
        Start reading to learn about my approach to solving complex problems.
      </p>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <article
            key={post.id}
            className="blog-card glass-panel reveal section-panel hover-lift"
            style={{ "--reveal-i": String(index) } as React.CSSProperties}
          >
            <div className="blog-header mb-4">
              <span className="blog-category badge-small">{post.category}</span>
              <div className="blog-meta text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
            </div>

            <h3 className="blog-title text-xl font-bold mb-3 hover:gradient-text">
              {post.title}
            </h3>

            <p className="blog-excerpt text-muted mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="blog-footer flex items-center justify-between">
              <span className="blog-date text-sm text-muted">{post.date}</span>
              <a href={`/blog/${post.slug}`} className="read-more-link flex items-center gap-2 text-primary hover:gap-3 transition-all">
                Read More <ArrowRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
