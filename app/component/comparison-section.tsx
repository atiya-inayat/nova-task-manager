// "use client";

// import { motion } from "framer-motion";
// import { CheckCircle2, Zap, Eye } from "lucide-react";

// export function ComparisonSection() {
//   const features = [
//     { title: "Complex setup", side: "left" },
//     { title: "Clean interface", side: "right", icon: Zap },
//     { title: "Cluttered UI", side: "left" },
//     { title: "Visual task flow", side: "right", icon: Eye },
//     { title: "Hard to track progress", side: "left" },
//     { title: "Focused productivity", side: "right", icon: CheckCircle2 },
//   ];

//   const itemVariants = {
//     hidden: (direction: "left" | "right") => ({
//       opacity: 0,
//       x: direction === "left" ? -40 : 40,
//     }),
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <section className="py-24 bg-black text-white">
//       <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 max-w-4xl">
//         {/* Left */}
//         <div className="space-y-6">
//           <h3 className="text-2xl font-bold text-slate-300 text-muted-foreground">
//             Other Tools
//           </h3>
//           {features
//             .filter((f) => f.side === "left")
//             .map((f, i) => (
//               <motion.p
//                 key={i}
//                 custom="left"
//                 variants={itemVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="text-muted-foreground text-slate-500"
//               >
//                 • {f.title}
//               </motion.p>
//             ))}
//         </div>

//         {/* Right */}
//         <div className="space-y-6 border-l pl-8">
//           <h3 className="text-2xl text-slate-300 font-bold text-primary">
//             Nova
//           </h3>
//           {features
//             .filter((f) => f.side === "right")
//             .map((f, i) => {
//               const Icon = f.icon!;
//               return (
//                 <motion.div
//                   key={i}
//                   custom="right"
//                   variants={itemVariants}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true }}
//                   className="flex items-center text-slate-500 gap-3"
//                 >
//                   <Icon className="w-5 h-5 text-primary" />
//                   <span>{f.title}</span>
//                 </motion.div>
//               );
//             })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Eye } from "lucide-react";

export function ComparisonSection() {
  const features = [
    { title: "Complex setup", side: "left" },
    { title: "Clean interface", side: "right", icon: Zap },
    { title: "Cluttered UI", side: "left" },
    { title: "Visual task flow", side: "right", icon: Eye },
    { title: "Hard to track progress", side: "left" },
    { title: "Focused productivity", side: "right", icon: CheckCircle2 },
  ];

  const itemVariants = {
    hidden: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "left" ? -20 : 20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
        {/* Left Side - Competitors */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-400">
            Other Tools
          </h3>
          <div className="space-y-4">
            {features
              .filter((f) => f.side === "left")
              .map((f, i) => (
                <motion.p
                  key={i}
                  custom="left"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-slate-500 flex items-center gap-2"
                >
                  <span className="text-red-900">✕</span> {f.title}
                </motion.p>
              ))}
          </div>
        </div>

        {/* Right Side - Nova */}
        <div className="space-y-6 border-t pt-10 md:border-t-0 md:pt-0 md:border-l md:pl-8 border-slate-800">
          <h3 className="text-xl md:text-2xl text-indigo-400 font-bold">
            Nova
          </h3>
          <div className="space-y-4">
            {features
              .filter((f) => f.side === "right")
              .map((f, i) => {
                const Icon = f.icon!;
                return (
                  <motion.div
                    key={i}
                    custom="right"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center text-slate-300 gap-3"
                  >
                    <Icon className="w-5 h-5 text-indigo-500" />
                    <span>{f.title}</span>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
