"use client";
import { signOut } from "next-auth/react";

export function SignoutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="bg-red-500 text-white px-4 py-2 rounded "
    >
      Sign Out
    </button>
  );
}
