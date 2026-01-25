// Resgister page GOAL
// simple form with email and password
// validation messages
// show success/error
// redirect to login on success

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setloading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); // Converts JSON text into a JavaScript object

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        router.push("/auth/signin"); // redirect to login
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center mt-4">
        <div className="border rounded-sm border-gray-300  w-120 max-w-sm p-4 h-auto flex justify-start">
          <form onSubmit={handleSignup} className="w-full space-y-4">
            <div className="flex justify-center font-bold p-2 text-3xl w-full">
              <h2>Sign Up</h2>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div>
              <input
                className="p-2 w-full border border-gray-300 rounded-sm"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                className="p-2 w-full border border-gray-300 rounded-sm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full bg-black text-white font-semibold cursor-pointer flex justify-center border p-1 rounded-md">
              <button type="submit">
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>

        {/* Already have an account */}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-500 font-semibold underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
