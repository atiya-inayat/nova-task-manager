"use client";

import { useState, useEffect } from "react";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when the video is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* 1. THE TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-indigo-500 text-white rounded-full font-bold transition-all duration-300 shadow-lg shadow-slate-500/15 active:scale-95 cursor-pointer"
      >
        <span>Live Demo</span>
        <svg
          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
        </svg>
      </button>

      {/* 2. THE MODAL OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          {/* Container for Video */}
          <div
            className="relative w-full max-w-5xl bg-slate-900 rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Larger touch target for mobile */}
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* THE VIDEO ELEMENT */}
            <div className="relative aspect-video w-full">
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                <source src="/nova-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
