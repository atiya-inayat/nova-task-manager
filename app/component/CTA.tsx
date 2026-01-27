import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 text-center px-6 bg-linear-to-br from-[#FFD700] to-black text-amber-300">
      <h2 className="text-4xl text-black font-bold">
        Ready to boost your productivity?
      </h2>

      <p className="text-gray-400 mt-4 max-w-lg mx-auto">
        Start using Nova today and take control of your tasks.
      </p>

      <Link href="/auth/signup">
        <button className="mt-8 px-4 py-2 rounded-lg bg-[#FFD700] text-black hover:bg-black hover:text-[#FFD700] transition">
          Sign Up
        </button>
      </Link>
    </section>
  );
}
