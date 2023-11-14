import React from "react";
import Link from "next/link";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img 
                    className="keyusageprofiler-logo"
                    alt="Key Usage Profiler Logo"
                    src="/images/logo.png"
                />
            </div>
            <div className="nav">
        <div className="item-link">
          <Link className="text-wrapper" to={to}>
            Home
          </Link>
        </div>
      </div>
      <div className="frame">
        <button className="button-outline">
          <button className="button">Sign Up</button>
        </button>
        <div className="button-contained">
          <button className="div">Sign in</button>
        </div>
      </div>
    </div>
  );
};
