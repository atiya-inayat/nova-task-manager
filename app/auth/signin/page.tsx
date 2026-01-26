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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center mt-4">
        {/* Card Container */}
        <div className="border rounded-sm border-gray-300 w-90 max-w-sm p-4 h-auto flex justify-start">
          <form onSubmit={handleSignin} className="w-full space-y-4">
            {/* Header */}
            <div className="flex justify-center font-bold p-2 text-3xl w-full">
              <h2>Sign In</h2>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Email Input */}
            <div>
              <input
                className="p-2 w-full border border-gray-300 rounded-sm"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                className="p-2 w-full border border-gray-300 rounded-sm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="w-full bg-black text-white font-semibold cursor-pointer flex justify-center border p-1 rounded-md mb-2">
              <button type="submit">
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>

        {/* Link to Sign Up */}
        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-500 font-semibold underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
