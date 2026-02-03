const features = [
  {
    title: "Smart Task Flow",
    desc: "Move tasks between To-Do, In-Progress, and Done seamlessly.",
  },
  {
    title: "Project Based",
    desc: "Organize tasks per project with clean separation.",
  },
  {
    title: "Fast & Secure",
    desc: "Built with Next.js, authentication, and modern stack.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl text-white font-bold text-center mb-16">
          Why <span className="text-slate-700">Nova</span> ?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-linear-to-br from-[#0F172A] to-black border border-slate-700 hover:border-black transition"
            >
              <h3 className="text-xl text-white font-bold italic mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <br className="text-amber-300 bg-amber-300" />
    </section>
  );
}
