import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yash Pratap Singh | Portfolio",
  description:
    "Portfolio of Yash Pratap Singh, a Computer Science student building software projects in systems, web development, and academic technology.",
  keywords: [
    "Yash Pratap Singh",
    "portfolio",
    "computer science student",
    "Next.js portfolio",
    "software developer",
    "web development",
  ],
  authors: [{ name: "Yash Pratap Singh" }],
  creator: "Yash Pratap Singh",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yash Pratap Singh | Portfolio",
    description:
      "Computer Science student portfolio featuring projects, technical skills, education, and certifications.",
    url: "/",
    siteName: "Yash Pratap Singh Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Yash Pratap Singh portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Pratap Singh | Portfolio",
    description:
      "Computer Science student portfolio with projects, skills, education, and achievements.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
