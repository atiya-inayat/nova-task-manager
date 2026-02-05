// // Resgister page GOAL
// // simple form with email and password
// // validation messages
// // show success/error
// // redirect to login on success

// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function SignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setloading] = useState(false);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     setloading(true);

//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json(); // Converts JSON text into a JavaScript object

//       if (!res.ok) {
//         setError(data.message || "Something went wrong");
//       } else {
//         router.push("/auth/signin"); // redirect to login
//       }
//     } catch (error) {
//       setError("Something went wrong");
//     } finally {
//       setloading(false);
//     }
//   };

//   // return (
//   //   <div className="flex bg-linear-to-br from-[#0F172A] to-black items-center justify-center h-screen">
//   //     <div className="flex flex-col items-center mt-4">
//   //       <div className="border rounded-md bg-slate-900  border-slate-600  w-90 max-w-sm p-4 h-auto flex justify-start">
//   //         <form onSubmit={handleSignup} className="w-full space-y-4">
//   //           <div className="flex justify-center text-slate-200 font-bold p-2 text-3xl w-full">
//   //             <h2>Sign Up</h2>
//   //           </div>

//   //           {error && <p className="text-red-500">{error}</p>}

//   //           <div className="mb-5 ">
//   //             <label className="px-4   text-slate-300">Email Address</label>
//   //             <input
//   //               className="py-1 px-4  w-full border border-slate-600 rounded-full text-slate-300"
//   //               type="email"
//   //               placeholder="Email"
//   //               value={email}
//   //               onChange={(e) => setEmail(e.target.value)}
//   //             />
//   //           </div>

//   //           <div>
//   //             <label className="px-4   text-slate-300">Password</label>
//   //             <input
//   //               className="py-1 px-4 w-full border border-slate-600 rounded-full text-slate-300"
//   //               type="password"
//   //               placeholder="**********"
//   //               value={password}
//   //               onChange={(e) => setPassword(e.target.value)}
//   //             />
//   //           </div>

//   //           <div className="w-full bg-slate-900 cursor-pointer text-white font-semibold cursor-pointer rounded-full flex justify-center border border-slate-700 p-1  mb-2">
//   //             <button type="submit">
//   //               {loading ? "Signing up..." : "Sign Up"}
//   //             </button>
//   //           </div>
//   //         </form>
//   //       </div>

//   //       {/* Already have an account */}
//   //       <p className="mt-4 text-sm text-slate-300">
//   //         Already have an account?{" "}
//   //         <Link
//   //           href="/auth/signin"
//   //           className="text-blue-500 font-semibold underline"
//   //         >
//   //           Sign in
//   //         </Link>
//   //       </p>
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0F172A] to-black px-4">
//       <div className="flex w-full max-w-sm flex-col items-center gap-6">
//         {/* Card */}
//         <div className="w-full rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
//           <form onSubmit={handleSignup} className="flex flex-col gap-5">
//             {/* Heading */}
//             <h2 className="text-center text-3xl font-bold text-slate-200">
//               Sign Up
//             </h2>

//             {/* Error */}
//             {error && (
//               <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
//                 {error}
//               </p>
//             )}

//             {/* Email */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm text-slate-300">Email Address</label>
//               <input
//                 className="w-full rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm text-slate-300">Password</label>
//               <input
//                 className="w-full rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-2 rounded-lg border border-slate-700 bg-slate-800 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
//             >
//               {loading ? "Signing up..." : "Sign Up"}
//             </button>
//           </form>
//         </div>

//         {/* Footer */}
//         <p className="text-sm text-slate-300">
//           Already have an account?{" "}
//           <Link
//             href="/auth/signin"
//             className="font-semibold text-blue-500 hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// 1. Import signIn
import { signIn } from "next-auth/react";

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

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setloading(false); // Stop loading if there's an error
      } else {
        // 2. AUTOMATIC LOGIN
        // Instead of just redirecting, we log them in using the credentials they just created
        const loginRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (loginRes?.error) {
          // If for some reason login fails, send them to signin as a fallback
          router.push("/auth/signin");
        } else {
          // Success! Go straight to dashboard
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("Something went wrong");
      setloading(false);
    }
  };

  return (
    // Changed h-screen to min-h-screen for mobile keyboard compatibility
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#0F172A] to-black px-4 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        {/* Card */}
        <div className="w-full rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            {/* Heading */}
            <h2 className="text-center text-3xl font-bold text-slate-200">
              Sign Up
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
              className="mt-2 rounded-lg border border-slate-700 bg-slate-800 py-2.5 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-sm text-slate-300">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-blue-500 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
