// import React from "react";
// import { SignoutBtn } from "./SignoutBtn";
// import Link from "next/link";

// const Navbar = () => {
//   return (
//     <div className=" fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md  text-black h-15 flex justify-between items-center">
//       <div className="p-2">
//         <h1 className=" text-4xl italic  ">
//           <Link href="/">Nova</Link>
//         </h1>
//       </div>
//       <div className="flex  justify-between w-auto gap-3 text-black">
//         <span>
//           <Link href="/about">About</Link>
//         </span>
//         <span>
//           <Link href="/dashboard">Dashboard</Link>
//         </span>
//         <span>
//           <Link href="/dashboard/projects">Projects</Link>
//         </span>
//       </div>
//       <div className=" flex gap-2 items-center text-gray-200">
//         <span>Profile</span>
//         <div>
//           <SignoutBtn />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { SignoutBtn } from "./SignoutBtn";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full  bg-black/80 backdrop-blur-md text-white h-16 flex justify-between items-center px-4">
      <div>
        <h1 className="text-3xl italic font-bold">
          <Link href="/">Nova</Link>
        </h1>
      </div>

      <div className="flex gap-4 ">
        <Link className="hover:underline" href="/about">
          About
        </Link>
        <Link className="hover:underline" href="/dashboard">
          Dashboard
        </Link>
        <Link className="hover:underline" href="/dashboard/projects">
          Projects
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <Link href="/dashboard/profile">Profile</Link>
        <Link href="/auth/signin">
          <button className="cursor-pointer">SignIn</button>
        </Link>
        <SignoutBtn />
      </div>
    </div>
  );
};

export default Navbar;
