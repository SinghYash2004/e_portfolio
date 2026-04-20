import type { Metadata } from "next";
import { DM_Serif_Display, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Pratap Singh | Systems Engineer & Researcher",
  description: "E-Portfolio of Yash Pratap Singh, Computer Science Engineering Student at SRMIST.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${sora.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased selection:bg-teal-500/30">
        <CustomCursor />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
