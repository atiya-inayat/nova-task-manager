const Hero = () => {
  return (
    <section className="min-h-screen bg-linear-to-br from-[#0F172A] to-black   flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-5xl text-white md:text-7xl font-extrabold leading-tight ">
          Manage Your{" "}
          <span
            className="bg-linear-to-br from-white to-[#0F172A] bg-clip-text text-transparent
"
          >
            Tasks
          </span>
          <br />
          Like a Pro
        </h1>

        <p className="mt-6 text-gray-300 max-w-xl mx-auto">
          Nova helps you organize projects, track progres, and stay focus - all
          in one powerfull dashboard.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="px-6 py-3 cursor-pointer rounded-full text-white font-semibold bg-indigo-500 hover:bg-indigo-600 hover:text-white transition">
            Get Started
          </button>
          <button className="px-6 py-3 cursor-pointer rounded-full border text-indigo-300 border-indigo-300 hover:bg-slate-900 font-semibold hover:text-white transition">
            Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
