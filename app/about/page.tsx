"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Rocket, Shield, Zap, Code, Users, Target } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black text-slate-200 selection:bg-blue-500/30">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 inline-block"
          >
            About Nova
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8"
          >
            Redefining how you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
              track progress.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Nova was built for the creators and the builders. We believe that
            managing a project shouldn't feel like a project itself. No bloat,
            just speed.
          </motion.p>
        </motion.div>
      </section>

      {/* --- THE BENTO GRID (Values) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Simplicity */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
          >
            <Zap className="text-blue-400 mb-4" size={32} />
            <h3 className="text-2xl font-bold text-white mb-3">
              Simplicity by Design
            </h3>
            <p className="text-slate-400 text-lg">
              We prioritize a clean UI that stays out of your way. Your focus
              should be on your work, not on learning how to use your tools.
              Nova is built to be intuitive from the very first click.
            </p>
          </motion.div>

          {/* Card 2: Security */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
          >
            <Shield className="text-blue-400 mb-4" size={32} />
            <h3 className="text-2xl font-bold text-white mb-3">
              Security First
            </h3>
            <p className="text-slate-400">
              Built with modern encryption and role-based access. Your data
              remains yours.
            </p>
          </motion.div>

          {/* Card 3: Target Groups */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
          >
            <Users className="text-blue-400 mb-4" size={32} />
            <h3 className="text-2xl font-bold text-white mb-3">For Everyone</h3>
            <p className="text-slate-400">
              Whether you are a student, freelancer, or a small startup team,
              Nova scales with you.
            </p>
          </motion.div>

          {/* Card 4: Tech Stack */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 to-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
          >
            <Code className="text-blue-400 mb-4" size={32} />
            <h3 className="text-2xl font-bold text-white mb-3">
              Modern Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js 14",
                "Tailwind CSS",
                "MongoDB",
                "NextAuth",
                "Framer Motion",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800 rounded-md text-sm text-slate-300 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-4 text-slate-400">
              Nova is engineered using the latest industry standards to ensure
              high reliability and blazing fast performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MISSION STATEMENT --- */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto p-12 rounded-[2.5rem] bg-slate-900/80 border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
          <Target className="mx-auto text-blue-500 mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-slate-300 leading-relaxed italic">
            "To strip away the complexity of traditional project management and
            provide a streamlined, high-performance workspace that empowers
            builders to move from To-Do to Done faster than ever before."
          </p>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-20 text-center border-t border-slate-900">
        <h2 className="text-2xl font-bold text-white mb-6">
          Ready to start your journey?
        </h2>
        <Link href="/auth/signup">
          <button className="bg-slate-900 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Get Started with Nova
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default AboutPage;
