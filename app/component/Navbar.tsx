"use client";

import React from "react";
import { SignoutBtn } from "./SignoutBtn";
import Link from "next/link";
import { useSession } from "next-auth/react"; // 1. Import the session hook
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Info,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession(); // 2. Get the login status
  const isLoggedIn = status === "authenticated";

  return (
    <nav className="z-50 fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md text-slate-200 h-16 border-b border-slate-800/50 flex justify-between items-center px-6 transition-all">
      {/* Brand Logo - Always Visible */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-black tracking-tighter text-white">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-400 transition-colors"
          >
            <span className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              N
            </span>
            Nova
          </Link>
        </h1>
      </div>

      {/* --- CENTER LINKS (Conditional) --- */}
      <div className="hidden md:flex gap-8 items-center font-medium text-sm">
        <Link
          className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
          href="/about"
        >
          <Info size={16} /> About
        </Link>

        {isLoggedIn && (
          <>
            <Link
              className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
              href="/dashboard"
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link
              className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
              href="/dashboard/projects"
            >
              <FolderKanban size={16} /> Projects
            </Link>
          </>
        )}
      </div>

      {/* --- RIGHT SIDE ACTIONS (Conditional) --- */}
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          // IF LOGGED IN: Show Profile & Signout
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/profile"
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
            >
              <User size={20} />
            </Link>
            <div className="h-6 w-[1px] bg-slate-800 mx-1" />
            <SignoutBtn />
          </div>
        ) : (
          // IF NOT LOGGED IN: Show Sign In & Get Started
          <div className="flex items-center gap-5">
            <Link
              href="/auth/signin"
              className="text-sm font-semibold hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link href="/auth/signup">
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2">
                Get Started <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
