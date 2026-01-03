// login page GOAL
// user enters email/password
// calls NextAuth login (credentials)
// shows error/loading
// redirect to dashboard on success

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
    <div>
      <form onSubmit={handleSignin}>
        <h2>Sign In</h2>
        {error && <p>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{loading ? "Signing In" : "Sign In"}</button>
      </form>
    </div>
  );
}
