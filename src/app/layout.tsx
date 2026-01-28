import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ConvexClerkProvider from "@/provider/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClerkUserSync from "@/components/ClerkUserSync"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduMentor - AI Learning Companion",
  description:
    "Personalized AI-powered study plans and learning analysis for students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* ✅ Sync Clerk → Zustand */}
          <ClerkUserSync />

          <Navbar />

          {/* SUBTLE GRID BACKGROUND FOR LIGHT EDUCATION THEME */}
          <div className="fixed inset-0 -z-1">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          <main className="pt-24 flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
