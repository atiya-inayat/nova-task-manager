import React from "react";
import { SignoutBtn } from "./SignoutBtn";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full sticky top-0 z-50 bg-black text-white h-15 flex justify-between items-center">
      <div className="p-2">
        <h1 className=" text-4xl italic  ">
          <Link href="/">Nova</Link>
        </h1>
      </div>
      <div className="flex  justify-between w-auto gap-3 text-gray-200">
        <span>
          <Link href="/about">About</Link>
        </span>
        <span>
          <Link href="/dashboard">Dashboard</Link>
        </span>
        <span>
          <Link href="/dashboard/projects">Projects</Link>
        </span>
      </div>
      <div className=" flex gap-2 items-center text-gray-200">
        <span>Profile</span>
        <div>
          <SignoutBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
