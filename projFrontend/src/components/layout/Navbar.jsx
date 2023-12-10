import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  RiArrowDownSLine,
  RiNotification3Line,
  RiMoonClearFill,
  RiSunFill,
} from "react-icons/ri";

import logo from "../../assets/key_usage_profiler_logo_cut.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    //TODO API call

    //localStorage.clear();
    //navigate("/login");
  };

  return (
    <div className="navbar bg-secondary w-full flex justify-between items-center p-2 top-0">
      <Link to="/">
        <img src={logo} className="max-h-5 pl-5"></img>
      </Link>

      {(!userType || userType === "USER") && (
        <Link to="/">
          <h2 className="text-xl font-bold">HomePage</h2>
        </Link>
      )}

      {(userType === "TEAM_MEMBER" || userType === "TEAM_LEADER") && (
        <Link to="/user">
          <h2 className="text-xl font-bold">Profile</h2>
        </Link>
      )}

      {(userType === "TEAM_MEMBER" || userType === "TEAM_LEADER") && (

        <Link to="/#">
          <h2 className="text-xl font-bold">Leaderboard</h2>
        </Link>
      )}

      {userType === "TEAM_LEADER" && (
          <Link to="/dashboard">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </Link>
      )}

      <div className="flex">
        <label className="swap swap-rotate m-2 p-2 ">
          <input
            id="search-box"
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "light" ? false : true}
          />
          <RiMoonClearFill className="swap-on" />
          <RiSunFill className="swap-off" />
        </label>

        {userType === "TEAM_LEADER" && (
          <button className="btn m-2 p-2">
            <RiNotification3Line className="text-xl" />
            <RiArrowDownSLine className="text-xl" />
          </button>
        )}

        {userType && (
          <div className="dropdown">
            <button className="btn m-2 p-2">Account</button>
            <div className="dropdown-content">
              <button
                className="btn m-2 p-2 btn-accent" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {!userType && (
          <div className="flex">
            <Link to="/register">
              <button className="btn m-2 p-2">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn m-2 p-2">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
