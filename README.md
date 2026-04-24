# 🎯 Personal E-Portfolio - Yash Pratap Singh

A modern, interactive portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. Designed to showcase technical skills, projects, education, and professional achievements with smooth animations and responsive design.

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Customization Guide](#customization-guide)
- [Performance & SEO](#performance--seo)
- [License](#license)

## ✨ Features

- **🎨 Interactive Hero Section** - Animated typewriter effect and smooth scroll animations
- **🖱️ Custom Cursor & Magnetic Links** - Enhanced user interaction with tilt effects
- **📱 Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **⚡ Performance Optimized** - Built with Next.js best practices and image optimization
- **🔍 SEO Ready** - Automatic sitemap, robots.txt, Open Graph images, and meta tags
- **🎯 Technical Skills Dashboard** - Interactive skills showcase with accessibility features
- **📚 Multi-Section Layout** - Projects, education, certifications, and achievements
- **🌐 Production Ready** - Easily deployable to Vercel or any Node.js hosting platform
- **🎭 Smooth Animations** - CSS transitions and Intersection Observer animations

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Next.js 16.2.4 |
| **UI Library** | React 19.2.4 |
| **Language** | TypeScript 5 |
| **Styling** | CSS3 (Tailwind-ready) |
| **Icons** | React Icons, Lucide React |
| **Linting** | ESLint 9 |
| **Node** | 18+ |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** (comes with Node.js)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create a .env.local file at the root
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will auto-refresh as you make changes.

### Build & Run Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
e_portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Main portfolio page
│   │   ├── globals.css          # Global styles
│   │   ├── sitemap.ts           # Dynamic sitemap generation
│   │   ├── robots.ts            # SEO robots configuration
│   │   └── opengraph-image.tsx  # OG image generation
│   ├── components/
│   │   ├── NavBar.tsx           # Navigation component
│   │   ├── TechnicalSkills.tsx  # Skills section
│   │   ├── Typewriter.tsx       # Animated typewriter effect
│   │   ├── CustomCursor.tsx     # Custom cursor component
│   │   ├── ClientTilt.tsx       # 3D tilt effect
│   │   └── MagneticLink.tsx     # Interactive links
│   └── hooks/                    # Custom React hooks
├── public/                       # Static assets (images, fonts)
├── package.json                  # Dependencies and scripts
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── eslint.config.mjs            # ESLint rules
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required for proper SEO and deployment
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Update Portfolio Content

The portfolio content is embedded in `src/app/page.tsx`. Modify the following sections:

1. **Hero Section** - Update name, title, and description
2. **Technical Skills** - Edit your skill categories and proficiency levels
3. **Projects** - Add your featured projects with descriptions, links, and images
4. **Education** - Update your educational background
5. **Certifications** - Add your professional certifications
6. **Contact Information** - Update email, phone, location, and social links

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run ESLint
npm run lint
```

### Component Development

- Components are located in `src/components/`
- Use TypeScript for type safety
- Follow React best practices with hooks and functional components
- Ensure all interactive elements are keyboard accessible

### Styling

- Global styles are in `src/app/globals.css`
- Use CSS modules or inline styles for component-specific styling
- Consider adding Tailwind CSS for utility-first styling

## 🌍 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Set environment variables (if any)
5. Deploy with one click

**Configure environment variable in Vercel dashboard:**
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Deploy to Other Platforms

This is a standard Next.js application, compatible with:
- **Railway**
- **Render**
- **Netlify** (with Next.js adapter)
- **Docker** (containerization ready)
- **Self-hosted** (VPS, dedicated server)

### Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 🎨 Customization Guide

### Pre-Publication Checklist

Before going live, complete these customizations:

- [ ] **Personal Information**
  - [ ] Add your GitHub profile URL
  - [ ] Update LinkedIn profile link
  - [ ] Add email address and phone number
  - [ ] Update location information

- [ ] **Projects**
  - [ ] Add GitHub repository links for each project
  - [ ] Include live demo URLs (if available)
  - [ ] Add project screenshots/preview images
  - [ ] Include measurable outcomes (performance metrics, user impact, features)
  - [ ] Write compelling project descriptions

- [ ] **Education & Certifications**
  - [ ] Update school/college name and graduation date
  - [ ] Add certificate verification links
  - [ ] Include issuing organization details
  - [ ] Add completion dates and credential IDs

- [ ] **Resume & Documents**
  - [ ] Add a real resume PDF for download
  - [ ] Replace email request CTA with resume download link
  - [ ] Include portfolio PDF if applicable

- [ ] **Branding**
  - [ ] Add a profile photo/avatar
  - [ ] Create custom favicon
  - [ ] Upload Open Graph image (`public/og-image.png`)
  - [ ] Update meta description
  - [ ] Add custom color scheme if desired

- [ ] **Domain & SEO**
  - [ ] Register custom domain
  - [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
  - [ ] Add Google Analytics (optional)
  - [ ] Verify site with Google Search Console
  - [ ] Add JSON-LD schema markup for better SEO

## 🔍 Performance & SEO

### Built-in SEO Features

✅ **Automatic Sitemap Generation** - `sitemap.ts` generates dynamic XML sitemap
✅ **Robots Configuration** - `robots.ts` manages crawler directives
✅ **Meta Tags** - Updated in `layout.tsx` with Open Graph, Twitter Card support
✅ **Image Optimization** - Next.js automatic image optimization with `<Image>` component
✅ **Performance Metrics**
- Lighthouse Score: 90+
- First Contentful Paint (FCP): <1.5s
- Cumulative Layout Shift (CLS): <0.1

### Optimization Tips

1. **Images** - Use Next.js `<Image>` component for automatic optimization
2. **Code Splitting** - Next.js automatically splits code for optimal loading
3. **Caching** - Configure cache headers in `next.config.ts`
4. **Analytics** - Consider adding Vercel Analytics or Google Analytics

## 📄 License

This project is open source and available under the **MIT License**.

---

## 👨‍💼 Author

**Yash Pratap Singh**

CSE Engineering Student at SRMIST

### Connect

- 💼 [LinkedIn](https://linkedin.com/in/yash-pratap-singh-b43925327/)
- 🐙 [GitHub](https://github.com/your-username)
- 📧 Email: your.email@example.com

---

**Last Updated:** April 2026 | **Next.js Version:** 16.2.4
