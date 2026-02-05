// import Link from "next/link";

// export default function CTA() {
//   return (
//     <section className="py-24 text-center px-6 bg-black text-white">
//       <h2 className="text-4xl text-slate-200 font-bold">
//         Ready to boost your productivity?
//       </h2>

//       <p className="text-slate-400 mt-4 max-w-lg mx-auto">
//         Start using Nova today and take control of your tasks.
//       </p>

//       <Link href="/auth/signup">
//         <button className="mt-8 px-4 py-2 cursor-pointer text-slate-300 font-bold rounded-full bg-indigo-500  hover:bg-indigo-800 hover:text-slate-400 transition">
//           Sign Up
//         </button>
//       </Link>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 bg-black px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
      >
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-300 mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of users who have simplified their workflow with
            Nova. Start managing your tasks like a pro today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-slate-300 text-indigo-600 font-bold rounded-full hover:bg-slate-100 transition shadow-lg">
              Get Started Now
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
