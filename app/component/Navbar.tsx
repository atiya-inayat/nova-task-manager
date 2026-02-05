"use client";

import React, { useState } from "react";
import { SignoutBtn } from "./SignoutBtn";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Info,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="z-50 fixed top-0 left-0 w-full bg-slate-900/95 backdrop-blur-md text-slate-200 border-b border-slate-800/50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-tighter text-white">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-1 hover:text-blue-400 transition-colors"
            >
              <span className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                N
              </span>
              Nova
            </Link>
          </h1>
        </div>

        {/* --- DESKTOP CENTER LINKS --- */}
        <div className="hidden md:flex gap-8 items-center font-medium text-sm">
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
          <Link
            className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
            href="/about"
          >
            <Info size={16} /> About
          </Link>
        </div>

        {/* --- DESKTOP RIGHT SIDE --- */}
        <div className="hidden md:flex gap-4 items-center">
          {isLoggedIn ? (
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
            <div className="flex items-center gap-5">
              <Link
                href="/auth/signin"
                className="text-sm font-semibold hover:text-white"
              >
                Sign In
              </Link>
              <Link href="/auth/signup">
                <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer">
                  Get Started <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white p-2 transition-colors cursor-pointer"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        <div className="flex flex-col p-6 gap-6 font-medium">
          {isLoggedIn ? (
            <>
              <Link
                onClick={closeMenu}
                className="flex items-center gap-3 text-lg"
                href="/dashboard"
              >
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link
                onClick={closeMenu}
                className="flex items-center gap-3 text-lg"
                href="/dashboard/projects"
              >
                <FolderKanban size={20} /> Projects
              </Link>
              <Link
                onClick={closeMenu}
                className="flex items-center gap-3 text-lg"
                href="/dashboard/profile"
              >
                <User size={20} /> Profile
              </Link>
              <Link
                onClick={closeMenu}
                className="flex items-center gap-3 text-lg"
                href="/about"
              >
                <Info size={20} /> About
              </Link>
              <div className="pt-4 border-t border-slate-800">
                <SignoutBtn />
              </div>
            </>
          ) : (
            <>
              <Link
                onClick={closeMenu}
                className="flex items-center gap-3 text-lg"
                href="/about"
              >
                <Info size={20} /> About
              </Link>
              <Link onClick={closeMenu} className="text-lg" href="/auth/signin">
                Sign In
              </Link>
              <Link onClick={closeMenu} href="/auth/signup">
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2">
                  Get Started <ArrowRight size={18} />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
