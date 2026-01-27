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
    <section
      id="features"
      className="py-24 bg-linear-to-br from-black to-[#FFD700]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl text-black font-bold text-center mb-16">
          Why <span className="text-amber-300">Nova</span> ?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-amber-300 hover:border-black transition"
            >
              <h3 className="text-xl text-black font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <br className="text-amber-300 bg-amber-300" />
    </section>
  );
}
