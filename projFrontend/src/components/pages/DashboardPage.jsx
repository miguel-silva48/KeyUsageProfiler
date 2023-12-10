import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  RiUser3Line,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiDeleteBinLine,
  RiShareForwardLine,
  RiLink,
} from "react-icons/ri";

import "./../../utils/styles.css";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import GamingBadge from "../layout/StatusBadges/GamingBadge";
import CodingBadge from "../layout/StatusBadges/CodingBadge";
import InactiveBadge from "../layout/StatusBadges/InactiveBadge";

import refreshToken from "../../utils/refreshToken";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [currentPage, setCurrentPage] = useState(1);
  const [inviteLink, setInviteLink] = useState("");
  const usersPerPage = 10;

  useEffect(() => {
    if (!token || !userType) {
      navigate("/login");
    } else if (userType === "TEAM_MEMBER") {
      navigate("/profile");
    } else if (userType === "USER") {
      navigate("/");
    }

    fetchData();
    createInviteLink();

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
            return {
              id: statistics.author.id,
              username: statistics.author.username,
              email: statistics.author.email,
              minutesTyping: statistics.minutesTyping,
              awpm: statistics.awpm,
            };
          } else if (statisticsResponse.status === 404) {
            return {
              id: member.id,
              username: member.username,
              email: member.email,
              minutesTyping: 0,
              awpm: 0,
            };
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

      try {
        const newToken = await refreshToken();

        if (newToken !== null) {
          fetchData();
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
  };

  const createInviteLink = async () => {
    try {
      const fetchLinkToken = await fetch(
        "http://localhost:8080/api/teams/invite",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (fetchLinkToken.ok) {
        let { token } = await fetchLinkToken.json();

        setInviteLink(`http://localhost:5173/teams/join/${token}`);
      } else {
        console.log("Error creating invite link");
      }
    } catch (error) {
      console.error("Error fetching link token:", error);
    }
  };

  const removeFromTeam = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/removefromteam/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Handle successful response (team creation)
        fetchData();
      } else {
        console.error("Couldn't delete user", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user from team:", error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const countUsers = userData.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(userData.length / usersPerPage);
  const showPagination = totalPages > 1;

  return (
    <div>
      <Navbar />
      <div
        id="body"
        className="flex w-screen mt-2 pb-0 flex-col items-center gap-5"
      >
        <div
          id="table-team-members"
          className="flex w-10/12 mt-3 mx-3 flex-col items-start rounded-lg border shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06)]"
        >
          <div className="flex items-center self-stretch">
            <div className="flex items-center self-stretch px-6 pt-5 pb-5 gap-4 w-10/12">
              <div className="flex items-center flex-[1_0_0] gap-2">
                <h2 className="text-2xl font-normal leading-7">
                  Team Members of {teamName}
                </h2>
                <div className="flex items-start mix-blend-multiply">
                  <div className="flex px-2 py-0.5 justify-center items-center rounded-2xl bg-[#F9F5FF]">
                    <span className="text-[#6941C6] text-sm font-medium leading-4">
                      {countUsers} users
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(inviteLink)}
              className="flex px-5 py-3 justify-center items-center gap-2.5 rounded-xl bg-[#12B76A26]"
            >
              <RiLink className="text-xl" />
              <span className="text-[#12B76A] text-l">Invite Link</span>
            </button>
          </div>
          <div className="flex items-start self-stretch">
            <table
              id="table-name-column"
              className="flex flex-col items-start flex-[1_0_0]"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex justify-center items-center">
                  <th>
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-md border"
                    ></input>
                  </th>
                </tr>
                <tr className="flex items-center gap-1">
                  <th>
                    <span className="text-[#667085]">Member</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {currentUsers &&
                  currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b"
                    >
                      <td className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border"
                        ></input>
                      </td>
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
                {currentUsers &&
                  currentUsers.map((user) => (
                    <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                      <td className="text-gray-500 text-sm">
                        {user ? user.awpm : "Loading..."}
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
                {currentUsers &&
                  currentUsers.map((user) => (
                    <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                      <td className="text-gray-500 text-sm">
                        {user ? user.minutesTyping : "Loading..."}
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
                {currentUsers &&
                  currentUsers.map((user) => (
                    <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                      <td>
                        <GamingBadge />
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
                {currentUsers &&
                  currentUsers.map((user) => (
                    <tr className="flex h-16 p-4 items-center gap-1 self-stretch border-b">
                      <td className="flex items-start rounded-lg">
                        {(user.id != userId && (
                          <button
                            onClick={() => removeFromTeam(user.id)}
                            className="flex p-2.5 justify-center items-center gap-2 rounded-lg"
                          >
                            <RiDeleteBinLine className="text-xl" />
                          </button>
                        )) || (
                          <div className="flex p-2.5 justify-center items-center gap-2 rounded-lg">
                            <RiDeleteBinLine className="text-xl opacity-0" />
                          </div>
                        )}
                      </td>
                      <td className="flex w-11 items-start rounded-lg">
                        <Link
                          to={`/user/${user.id}`}
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
          {showPagination && (
            <div className="flex px-6 pt-3 pb-4 justify-between items-center self-stretch">
              {(currentPage > 1 && (
                <button
                  className="flex items-start rounded-lg"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]">
                    <RiArrowLeftLine className="text-xl" />
                    <span className="text-gray-700">Previous</span>
                  </div>
                </button>
              )) || (
                <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg"></div>
              )}

              <div className="flex items-start rounded-lg">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`flex w-10 h-10 justify-center items-center rounded-lg ${
                      currentPage === index + 1 ? "bg-primary-50" : ""
                    }`}
                  >
                    <div className="flex w-10 p-3 justify-center items-center shrink-0 self-stretch rounded-lg">
                      <span
                        className={
                          currentPage === index + 1
                            ? "text-primary-600"
                            : "text-gray-500"
                        }
                      >
                        {index + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {(currentPage < totalPages && (
                <button
                  className="flex items-start rounded-lg"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]">
                    <span className="text-gray-700">Next</span>
                    <RiArrowRightLine className="text-xl" />
                  </div>
                </button>
              )) || (
                <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg"></div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
