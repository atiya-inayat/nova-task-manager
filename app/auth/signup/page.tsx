// Resgister page GOAL
// simple form with email and password
// validation messages
// show success/error
// redirect to login on success

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex items-center  justify-center h-screen ">
      <div className="bg-amber-400  h-auto flex  items-center justify-center">
        <form onSubmit={handleSignup}>
          <div className="flex bg-amber-600 justify-center font-bold p-2 m-2 text-3xl ">
            <h2>Sign Up</h2>
          </div>
          {error && <p>{error}</p>}
          <div>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
