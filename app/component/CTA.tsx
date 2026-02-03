import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 text-center px-6 bg-black text-white">
      <h2 className="text-4xl text-slate-200 font-bold">
        Ready to boost your productivity?
      </h2>

      <p className="text-slate-400 mt-4 max-w-lg mx-auto">
        Start using Nova today and take control of your tasks.
      </p>

      <Link href="/auth/signup">
        <button className="mt-8 px-4 py-2 cursor-pointer text-slate-300 font-bold rounded-full bg-indigo-500  hover:bg-indigo-800 hover:text-slate-400 transition">
          Sign Up
        </button>
      </Link>
    </section>
  );
}
