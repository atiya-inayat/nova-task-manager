import React from "react";
import { SignoutBtn } from "./SignoutBtn";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full bg-black text-white h-20 flex justify-between items-center">
      <div className="p-2">
        <h1 className=" text-4xl italic  ">
          <Link href="/dashboard">Nova</Link>
        </h1>
      </div>
      <div className="flex  justify-between w-auto gap-3 text-gray-200">
        <span>About</span>
        <span>
          <Link href="/dashboard">Dashboard</Link>
        </span>
        <span>Projects</span>
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
