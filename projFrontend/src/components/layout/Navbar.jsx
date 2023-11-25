import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils";

import {
  RiAccountCircleLine,
  RiMoonClearFill,
  RiSunFill,
} from "react-icons/ri";

import logo from "../../assets/key_usage_profiler_logo_cut.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const user = JSON.parse(localStorage.getItem("user"));

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

  return (
    <div className="navbar bg-secondary w-full flex justify-between items-center p-2 top-0">
      <Link to="/">
        <img src={logo} className="max-h-5 pl-5"></img>
      </Link>

      {user && (
        <p
          onClick={() => navigate(`/user`)}
          className="mr-2 cursor-grab"
        >
          {`Hello ${user.name}!`}
        </p>
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
        {true && (
          <button
            className="flex items-center m-2 p-2"
            onClick={
              user
                ? () => navigate(`/user`)
                : () => navigate('/login')
            }
          >
            <RiAccountCircleLine className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
