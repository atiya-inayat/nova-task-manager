"use client";

import { useState } from "react";
import CreateProjectForm from "./CreateProjectForm";
import { Plus } from "lucide-react";

export default function CreateProjectSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-indigo-500/20 cursor-pointer"
      >
        <Plus size={20} />
        Create Project
      </button>

      {/* The Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Form Container */}
          <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-200">
            <CreateProjectForm
              onSuccess={() => setIsOpen(false)}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
