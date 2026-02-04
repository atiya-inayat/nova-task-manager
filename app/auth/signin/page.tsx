// login page GOAL
// user enters email/password
// calls NextAuth login (credentials)
// shows error/loading
// redirect to dashboard on success

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter all fields");
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/dashboard"); // redirect to dashboard
    }
  };

  // return (
  //   <div className="flex items-center justify-center h-screen">
  //     <div className="flex flex-col items-center mt-4">
  //       {/* Card Container */}
  //       <div className="border rounded-sm border-gray-300 w-90 max-w-sm p-4 h-auto flex justify-start">
  //         <form onSubmit={handleSignin} className="w-full space-y-4">
  //           {/* Header */}
  //           <div className="flex justify-center font-bold p-2 text-3xl w-full">
  //             <h2>Sign In</h2>
  //           </div>

  //           {/* Error message */}
  //           {error && <p className="text-red-500">{error}</p>}

  //           {/* Email Input */}
  //           <div>
  //             <input
  //               className="p-2 w-full border border-gray-300 rounded-sm"
  //               type="email"
  //               placeholder="Email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //             />
  //           </div>

  //           {/* Password Input */}
  //           <div>
  //             <input
  //               className="p-2 w-full border border-gray-300 rounded-sm"
  //               type="password"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //           </div>

  //           {/* Submit Button */}
  //           <div className="w-full bg-black text-white font-semibold cursor-pointer flex justify-center border p-1 rounded-md mb-2">
  //             <button type="submit">
  //               {loading ? "Signing In..." : "Sign In"}
  //             </button>
  //           </div>
  //         </form>
  //       </div>

  //       {/* Link to Sign Up */}
  //       <p className="mt-4 text-sm">
  //         Don’t have an account?{" "}
  //         <Link
  //           href="/auth/signup"
  //           className="text-blue-500 font-semibold underline"
  //         >
  //           Sign up
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0F172A] to-black px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Card */}
        <div className="w-full rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
          <form onSubmit={handleSignin} className="flex flex-col gap-5">
            {/* Heading */}
            <h2 className="text-center text-3xl font-bold text-slate-200">
              Sign In
            </h2>

            {/* Error */}
            {error && (
              <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-300">Email Address</label>
              <input
                className="w-full rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-300">Password</label>
              <input
                className="w-full rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-lg border border-slate-700 bg-slate-800 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-sm text-slate-300">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
