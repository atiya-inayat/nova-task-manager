"use client";

import { motion } from "framer-motion";
import { Plus, ListChecks, TrendingUp, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Plus,
      title: "Create a project",
      description: "Start your next initiative with a clean slate",
      number: "01",
    },
    {
      icon: ListChecks,
      title: "Add tasks",
      description: "Break down your work into manageable pieces",
      number: "02",
    },
    {
      icon: TrendingUp,
      title: "Track progress",
      description: "Watch tasks move from idea to done",
      number: "03",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-black text-white">
      {/* subtle animated overlay without changing #333333 */}
      <motion.div
        className="absolute inset-0 bg-yellow-500/5"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%", mixBlendMode: "soft-light" }}
      />

      {/* Floating subtle glow blobs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-400/10 blur-3xl rounded-full"
      />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl text-amber-300 lg:text-5xl font-bold mb-4">
            How Nova Works
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            A simple, powerful workflow designed to keep you focused
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  },
                }}
                className="relative group"
              >
                <div className="relative h-full rounded-2xl p-8 border border-yellow-700/30 bg-gradient-to-br from-[#FFD700] to-black backdrop-blur-md overflow-hidden shadow-lg shadow-yellow-900/20">
                  {/* Glow on hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Step number */}
                  <div className="absolute top-4 right-4 text-5xl font-bold text-yellow-200/20 group-hover:text-yellow-200/40 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-yellow-200/10 group-hover:bg-yellow-200/20 transition-colors">
                    <Icon className="w-6 h-6 text-yellow-300" />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-yellow-100 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hidden md:flex absolute top-1/2 -right-8 text-yellow-400/40"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
