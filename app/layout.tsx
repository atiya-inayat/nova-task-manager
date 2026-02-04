import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import AuthProvider from "./component/AuthProvider"; // 1. Import your new provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova | Task Management",
  description: "Modern project management for creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617]`}
      >
        {/* 2. Wrap everything in AuthProvider so the Navbar can check if user is logged in */}
        <AuthProvider>
          <Navbar />
          <main className="pt-16">
            {" "}
            {/* pt-16 ensures content isn't hidden under the fixed navbar */}
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
