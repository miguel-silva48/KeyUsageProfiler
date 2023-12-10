import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import {
  RiArrowDownSLine,
  RiNotification3Line,
  RiMoonClearFill,
  RiSunFill,
} from "react-icons/ri";

import logo from "../../assets/key_usage_profiler_logo_cut.svg";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const [stompClient, setStompClient] = useState(null);

  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const maxNotifications = 5;

  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  // connect to WS
  useEffect(() => {
    if (userType === "TEAM_LEADER") {
      const headers = {
        Authorization: "Bearer " + token,
      };

      const client = new Client({
        brokerURL: "ws://localhost:8080/websocket",
        connectHeaders: headers,
      });

      setStompClient(client);

      client.activate();

      // Cleanup the WebSocket connection when the component unmounts
      return () => {
        client.deactivate();
      };
    }
  }, []);

  // subscribe to WS
  useEffect(() => {
    if (stompClient) {
      const onConnect = (frame) => {
        console.log("Connected: " + frame);
        stompClient.subscribe("/user/topic/notifications", (message) => {
          const newNotification = JSON.parse(message.body);
          console.log("received new notification: ", newNotification);
          setNotifications((prevNotifications) => {
            const updatedNotifications = [
              newNotification,
              ...prevNotifications.slice(0, maxNotifications - 1),
            ];
            return updatedNotifications;
          });
        });
      };

      stompClient.onConnect = onConnect;

      stompClient.onWebSocketError = (error) => {
        console.error("Error with WebSocket", error);
      };

      stompClient.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };
    }
  }, [stompClient]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleNotificationToggle = () => {
    setShowDropdown(!showDropdown);
  };

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
          <button className="btn m-2 p-2" onClick={handleNotificationToggle}>
            <RiNotification3Line className="text-xl" />
            <RiArrowDownSLine
              className={`text-xl ${
                showDropdown ? "transform rotate-180" : ""
              }`}
            />
          </button>
        )}

        {/* Dropdown content */}
        {showDropdown && (
          <div
            style={{ background: "#f0f0f5" }}
            className="absolute top-14 right-24 mt-2 rounded-md shadow-md border border-gray-300"
          >
            {notifications.length === 0 ? (
              <div className="p-2 border border-gray-300">
                There's no notifications
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="p-2 border border-gray-300 font-semibold"
                >
                  {notification.user.name} - {notification.type}
                </div>
              ))
            )}
          </div>
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
