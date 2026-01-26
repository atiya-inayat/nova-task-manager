import React from "react";
import { SignoutBtn } from "./SignoutBtn";

const Navbar = () => {
  return (
    <div>
      <div>
        <h2>Nova</h2>
      </div>
      <div>
        <span>About</span>
        <span>Dashboard</span>
        <span>Projects</span>
      </div>
      <div>
        <span>Profile</span>
        <div>
          <SignoutBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
