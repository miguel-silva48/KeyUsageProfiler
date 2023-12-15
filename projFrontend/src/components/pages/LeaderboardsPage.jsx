import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RiUser3Line } from "react-icons/ri";

import "./../../utils/styles.css";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

import refreshToken from "../../utils/refreshToken";

const Leaderboards = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!token || !userType) {
      navigate("/login");
    } else if (userType === "TEAM_MEMBER") {
      navigate("/profile");
    } else if (userType === "USER") {
      navigate("/");
    }

    fetchData();

    var intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    try {
      var token = localStorage.getItem("authToken");
      setToken(token);
      const teamDataResponse = await fetch(
        "http://localhost:8080/api/teams/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (teamDataResponse.status === 403) {
        let error = new Error("Forbidden.");
        error.status = 403;
        throw error;
      } else if (teamDataResponse.status === 404) {
        let theme = localStorage.getItem("theme");
        localStorage.clear();
        localStorage.setItem("theme", theme);
        navigate("/");
      }
      const teamData = await teamDataResponse.json();

      setTeamName(teamData.name);

      const usersData = await Promise.all(
        teamData.members.map(async (member) => {
          const statisticsResponse = await fetch(
            `http://localhost:8080/api/statistics/${member.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (statisticsResponse.ok) {
            const statistics = await statisticsResponse.json();
            console.log(statistics);
            return {
              id: statistics.author.id,
              username: statistics.author.name,
              email: statistics.author.email,
              minutesTyping: statistics.minutesTyping,
              awpm: statistics.awpm,
              maxWpm: statistics.maxWpm,
            };
          } else if (statisticsResponse.status === 404) {
            return {
              id: member.id,
              username: member.name,
              email: member.email,
              minutesTyping: 0,
              awpm: 0,
              maxWpm: 0,
            };
          } else if (statisticsResponse.status === 403) {
            let error = new Error("Forbidden.");
            error.status = 403;
            throw error;
          } else {
            throw new Error(
              `Statistics API returned an error: ${statisticsResponse.statusText}`
            );
          }
        })
      );

      setUserData(usersData);
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

  const sortUserData = (data, sortBy) => {
    return data.slice().sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
  };

  return (
    <div>
      <Navbar />
      <div
        id="body"
        className="flex w-screen mt-2 pb-0 flex-row items-center gap-5 min-h-[52.3vh] justify-center"
      >
        <div
          id="leaderboars-awpm"
          className="flex w-3.5/12 mt-3 mx-3 flex-col items-start rounded-lg border shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06)]"
        >
          <div className="flex items-center self-stretch">
            <div className="flex items-center self-stretch px-6 pt-5 pb-5 gap-4 w-full">
              <div className="flex items-center flex-[1_0_0] gap-2">
                <h2 className="text-xl font-normal leading-7">
                  {teamName} by Average Words Per Minute
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
                <tr className="flex items-center gap-1">
                  <th>
                    <span className="text-[#667085]">Member</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {userData &&
                  sortUserData(userData, "awpm").map((user) => (
                    <tr
                      key={user.id}
                      className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b"
                    >
                      <td>
                        <Link to={`/user/${user.id}`}>
                          <RiUser3Line className="text-2xl" />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/user/${user.id}`}
                          className="flex flex-col items-start"
                        >
                          <p className="text-gray-900">{user.username}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table
              id="table-awpm-column"
              className="flex w-32 flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1">
                  <th className="text-[#667085]">Avg. WPM</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {userData &&
                  sortUserData(userData, "awpm").map((user) => (
                    <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b justify-center">
                      <td className="text-gray-500 text-sm items-center">
                        {user ? user.awpm : "Loading..."}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          id="leaderboars-min-typing"
          className="flex w-3.5/12 mt-3 mx-3 flex-col items-start rounded-lg border shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06)]"
        >
          <div className="flex items-center self-stretch">
            <div className="flex items-center self-stretch px-6 pt-5 pb-5 gap-4 w-full">
              <div className="flex items-center flex-[1_0_0] gap-2">
                <h2 className="text-xl font-normal leading-7">
                  {teamName} by Minutes Typing
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
                <tr className="flex items-center gap-1">
                  <th>
                    <span className="text-[#667085]">Member</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {userData &&
                  sortUserData(userData, "minutesTyping").map((user) => (
                    <tr
                      key={user.id}
                      className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b"
                    >
                      <td>
                        <Link to={`/user/${user.id}`}>
                          <RiUser3Line className="text-2xl" />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/user/${user.id}`}
                          className="flex flex-col items-start"
                        >
                          <p className="text-gray-900">{user.username}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table
              id="table-minutes-typing-column"
              className="flex w-36 flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1">
                  <th className="text-[#667085]">Min. Typing</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {userData &&
                  sortUserData(userData, "minutesTyping").map((user) => (
                    <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b justify-center">
                      <td className="text-gray-500 text-sm">
                        {user ? user.minutesTyping : "Loading..."}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          id="leaderboars-max-typing"
          className="flex w-3.5/12 mt-3 mx-3 flex-col items-start rounded-lg border shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06)]"
        >
          <div className="flex items-center self-stretch">
            <div className="flex items-center self-stretch px-6 pt-5 pb-5 gap-4 w-full">
              <div className="flex items-center flex-[1_0_0] gap-2">
                <h2 className="text-xl font-normal leading-7">
                  {teamName} by Max. Words Per Minute
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
                <tr className="flex items-center gap-1">
                  <th>
                    <span className="text-[#667085]">Member</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {userData &&
                  sortUserData(userData, "maxWpm").map((user) => (
                    <tr
                      key={user.id}
                      className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b"
                    >
                      <td>
                        <Link to={`/user/${user.id}`}>
                          <RiUser3Line className="text-2xl" />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/user/${user.id}`}
                          className="flex flex-col items-start"
                        >
                          <p className="text-gray-900">{user.username}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table
              id="table-minutes-typing-column"
              className="flex w-36 flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1">
                  <th className="text-[#667085]">Max. WPM</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {userData &&
                  sortUserData(userData, "maxWpm").map((user) => (
                    <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b justify-center">
                      <td className="text-gray-500 text-sm">
                        {user ? user.maxWpm : "Loading..."}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboards;
