import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../main.jsx";

import {
  RiShareForwardLine,
  RiUser3Line,
} from "react-icons/ri";

import "./../../utils/styles.css";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import GamingBadge from "../layout/StatusBadges/GamingBadge";
import InactiveBadge from "../layout/StatusBadges/InactiveBadge";
import CodingBadge from "../layout/StatusBadges/CodingBadge";

import refreshToken from "../../utils/refreshToken";

const Notifications = () => {
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState("3000-01-01 00:00:00.000000");
  const [noMoreData, setNoMoreData] = useState(false);
  const [teamNotificationData, setTeamNotificationData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  useEffect(() => {
    if (!token || !userType) {
      navigate("/login");
    } else if (userType === "TEAM_MEMBER") {
      navigate("/profile");
    } else if (userType === "USER") {
      navigate("/");
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      var token = localStorage.getItem("authToken");
      setToken(token);
      const teamNotificationResponse = await fetch(
        `http://${baseUrl}:8080/api/notifications/${timestamp}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (teamNotificationResponse.status === 403) {
        let error = new Error("Forbidden.");
        error.status = 403;
        throw error;
      } else if (teamNotificationResponse.status === 404) {
        let theme = localStorage.getItem("theme");
        localStorage.clear();
        localStorage.setItem("theme", theme);
        navigate("/");
      }
    
      const newTeamData = await teamNotificationResponse.json()

      if (newTeamData.length > 0){
        setTeamNotificationData(prevTeamData => [...prevTeamData, ...newTeamData])
        setTimestamp(newTeamData.map(notification => notification.ts).reduce(function(prev, curr) {
          return prev.ts < curr.ts ? prev : curr;
        }))
        setNoMoreData(false)
      }else{
        setNoMoreData(true)
      }

    } catch (error) {
      console.error("Error in fetchData:", error);

      if (error.status === 403) {
        try {
          const newToken = await refreshToken();

          if (newToken !== null) {
            setToken(newToken);
            fetchData();
            return;
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError.message);

          // Handle the error appropriately, for now, just log it
          let theme = localStorage.getItem("theme");
          localStorage.clear();
          localStorage.setItem("theme", theme);
          navigate("/login");
        }
      }
    }
  };


  return (
    <div>
      <Navbar />

      <div
        id="body"
        className="flex w-screen mt-2 pb-0 flex-col items-center gap-5 min-h-[52.3vh] mb-20"
      >
        <div
          id="table-team-members"
          className="flex w-10/12 mt-3 mx-3 flex-col items-start rounded-lg border shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06)]"
        >
          <div className="flex items-center self-stretch">
            <div className="flex items-center self-stretch px-6 pt-5 pb-5 gap-4 w-9/12">
              <div className="flex items-center flex-[1_0_0] gap-2">
                <h2 className="text-2xl font-normal leading-7">
                  Past Notifications
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-start self-stretch">
            <table
              id="table-name-column"
              className="flex flex-col items-start flex-[1_0_0]"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
              </thead>
              <tbody className="w-full">
                {teamNotificationData &&
                  teamNotificationData.map((notification) => (
                    <tr
                      key={notification.id}
                      className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b"
                    >
                      <td>
                        <Link to={`/user/${notification.user.id}`}>
                          <RiUser3Line className="text-2xl" />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/user/${notification.user.id}`}
                          className="flex flex-col items-start"
                        >
                          <p className="text-gray-900">{notification.user.name}</p>
                          <p className="text-gray-500 text-sm">{notification.user.email}</p>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table
              id="table-status-column"
              className="flex w-28 flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1">
                  <th className="text-[#667085]">Day</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {teamNotificationData &&
                  teamNotificationData.map((notification) => (
                    <tr key={notification.id} className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                      <td className="text-gray-600 text-base">
                      {new Date(notification.ts).toLocaleString("pt-PT",{year: "numeric", month: "2-digit", day: "2-digit"})}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table
              id="table-status-column"
              className="flex w-28 flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1">
                  <th className="text-[#667085]">Time</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {teamNotificationData &&
                  teamNotificationData.map((notification) => (
                    <tr key={notification.id} className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                      <td className="text-gray-600 text-base">
                      { new Date(notification.ts).toLocaleString("pt-PT",{hour: "2-digit", minute: "2-digit"}) }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table
              id="table-status-column"
              className="flex w-28 flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1">
                  <th className="text-[#667085]">Status</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {teamNotificationData &&
                  teamNotificationData.map((notification) => (
                    <tr key={notification.id} className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                      <td>
                        {notification.status === "GAMING" && <GamingBadge />}
                        {(!notification.status || notification.status === "INACTIVE") && <InactiveBadge />}
                        {notification.status === "CODING" && <CodingBadge />}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table
              id="table-remove/view-column"
              className="flex flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1"></tr>
              </thead>
              <tbody className="w-full">
                {teamNotificationData &&
                  teamNotificationData.map((notification) => (
                    <tr key={notification.id} className="flex h-16 p-4 items-center gap-1 self-stretch border-b">
                      <td className="flex w-11 items-start rounded-lg">
                        <Link
                          to={`/user/${notification.user.id}`}
                          className="flex w-11 p-2.5 justify-center items-center gap-2 rounded-lg shrink-0"
                        >
                          <RiShareForwardLine className="text-xl" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      { noMoreData? (
        <div role="alert" className="alert" style={{width: "172px"}}>
          <span>No More Data.</span>
        </div>
      ) : (
        <button className="btn btn-outline btn-sm" onClick={fetchData}>Load More</button>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
