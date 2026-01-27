const Hero = () => {
  return (
    <section className="min-h-screen bg-linear-to-br from-[#FFD700] to-black   flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight ">
          Manage Your <span className="text-amber-400">Tasks</span>
          <br />
          Like a Pro
        </h1>

        <p className="mt-6 text-gray-300 max-w-xl mx-auto">
          Nova helps you organize projects, track progres, and stay focus - all
          in one powerfull dashboard.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="px-6 py-3 rounded-lg bg-[#FFD700] hover:bg-black hover:text-[#FFD700] transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-lg border text-[#FFD700] border-amber-300 hover:border-black hover:text-black transition">
            Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
