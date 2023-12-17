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
  const [unreadNotifications, setUnreadNotifications] = useState(0);
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
          setUnreadNotifications(unreadNotifications + 1)
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
    setUnreadNotifications(0)
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
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-secondary w-full flex justify-between items-center p-2 top-0 shadow">
      <Link to="/">
      <img
        src={logo}
        className="max-h-5 pl-5"
      />
      </Link>

      {(!userType || userType === "USER") && (
        <Link to="/">
          <h2 className="text-l font-bold">HomePage</h2>
        </Link>
      )}

      {userType === "TEAM_LEADER" && (
        <Link to="/dashboard">
          <h2 className="text-l font-bold">Dashboard</h2>
        </Link>
      )}

      {(userType === "TEAM_MEMBER" || userType === "TEAM_LEADER") && (
        <Link to="/profile">
          <h2 className="text-l font-bold">Profile</h2>
        </Link>
      )}

      {(userType === "TEAM_MEMBER" || userType === "TEAM_LEADER") && (
        <Link to="/leaderboards">
          <h2 className="text-l font-bold">Leaderboards</h2>
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
          <details className="dropdown">
          <summary className="m-1 btn" onClick={handleNotificationToggle}>
            <RiNotification3Line className="text-xl" />
            {unreadNotifications > 0 && notifications.length > 0 && (
              <div
                style={{ background: "red", color: "white" }}
                class="inline-flex items-center justify-center w-7 h-7 text-base font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"
              >
                {unreadNotifications}
              </div>
            )}
            <RiArrowDownSLine
              className={`text-xl ${
                showDropdown ? "transform rotate-180" : ""
              }`}
            />
          </summary>
          <ul className="p-2 bg- menu dropdown-content z-[1] bg-base-100 rounded-box w-56 right-0">
            {notifications.length === 0 ? (
              <li className="text-center"><a style={{"textAlign":"center", "display":"block"}}>There's no notifications.</a></li>
            ) : (
              notifications.map((notification, index) => (
                <li className="text-center"><a style={{"textAlign":"center", "display":"block"}}><b>{new Date(notification.ts).toLocaleString("pt-PT",{year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})} - {notification.user.name}</b> is <b>{notification.status}</b>.</a></li>
              ))
            )}
          </ul>
          </details>
        )}

        {userType && (
          <div className="dropdown">
            <button className="btn m-2 p-2">Account</button>
            <div className="dropdown-content">
              <button className="btn m-2 p-2 btn-accent" onClick={handleLogout}>
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
