const Hero = () => {
  return (
    <section className="min-h-screen  flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight ">
          Manage Your <span className="text-indigo-500">Tasks</span>
          <br />
          Like a Pro
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          Nova helps you organize projects, track progres, and stay focus - all
          in one powerfull dashboard.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:text-white transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-lg border border-gray-400 hover:border-white transition">
            Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
