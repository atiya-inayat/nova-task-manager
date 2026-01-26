"use client";
import { signOut } from "next-auth/react";

export function SignoutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className=" text-black bg-white px-2   rounded-md cursor-pointer "
    >
      Log Out
    </button>
  );
}
