import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import invite_link from "../../assets/invite_link.svg";

import "./../../utils/styles.css";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

import example_avatar from "../../assets/example_avatar.png";
import goto_icon from "../../assets/goto_icon.svg";
import next_arrow from "../../assets/next_arrow.svg";
import previous_arrow from "../../assets/previous_arrow.svg";
import trash_icon from "../../assets/trash_icon.svg";
import GamingBadge from "../layout/GamingBadge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [currentPage, setCurrentPage] = useState(1);
  const [inviteLink, setInviteLink] = useState("");
  const usersPerPage = 2;

  useEffect(() => {
    const fetchDataAndInviteLink = async () => {
      try {
        if (!token || !userType) {
          navigate("/login");
        } else if (userType === "TEAM_MEMBER") {
          navigate("/user"); // TODO maybe change to profile
        } else if (userType === "USER") {
          navigate("/");
        }

        await fetchData();
        await createInviteLink();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
      } catch (error) {
        let theme = localStorage.getItem("theme");
        localStorage.clear();
        localStorage.setItem("theme", theme);
        navigate("/login");
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndInviteLink();
  }, [token, userType, navigate]);

const fetchData = async () => {
  try {
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
          throw new Error(`Statistics API returned an error: ${statisticsResponse.statusText}`);
        }
      })
    );

    setUserData(usersData);
  } catch (error) {
    let theme = localStorage.getItem("theme");
    localStorage.clear();
    localStorage.setItem("theme", theme);
    navigate("/login");
    console.error("Error fetching data:", error);
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
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
                  <div className="flex px-2 py-0.5 justify-center items-center rounded-2xl bg=[#F9F5FF]">
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
              <div className="flex w-10 h-5 justify-center items-center gap-2.5">
                <img src={invite_link} className="w-12 h-12 shrink-0"></img>
              </div>
              <span className="text-[#12B76A] text-m font-medium leading-4">
                Invite Link
              </span>
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
                    <span className="text-[#667085]">Name</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {userData &&
                  userData.map((user) => (
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
                      <Link to="/user">
                        <img
                          src={example_avatar}
                          className="flex w-10 h-10 flex-col justify-center items-center rounded-full"
                        ></img>
                      </Link>
                      <Link to="/user" className="flex flex-col items-start">
                        <p className="text-gray-900">{user.username}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </Link>
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
                  userData.map((user) => (
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
                {userData &&
                  userData.map((user) => (
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
                <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <td>
                    <GamingBadge />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              id="table-ip-column"
              className="flex w-32 flex-col items-start"
            >
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <tr className="flex items-center gap-1">
                  <th className="text-[#667085]">IP address</th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <td className="text-gray-500 text-sm">10.0.0.1</td>
                </tr>
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
                <tr className="flex h-16 p-4 items-center gap-1 self-stretch border-b">
                  <td className="flex items-start rounded-lg">
                    <button className="flex p-2.5 justify-center items-center gap-2 rounded-lg">
                      <img src={trash_icon} className="w-5 h-5" alt="Delete" />
                    </button>
                  </td>
                  <td className="flex w-11 items-start rounded-lg">
                    <Link
                      to="/user"
                      className="flex w-11 p-2.5 justify-center items-center gap-2 rounded-lg shrink-0"
                    >
                      <img
                        src={goto_icon}
                        className="w-5 h-5 pt-0.5 shrink-0"
                        alt="Go to User"
                      />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {showPagination && (
            <div className="flex px-6 pt-3 pb-4 justify-between items-center self-stretch">
              <button
                className="flex items-start rounded-lg"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]">
                  <img src={previous_arrow} className="w-5 h-5"></img>
                  <span className="text-gray-700">Previous</span>
                </div>
              </button>
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
              <button
                className="flex items-start rounded-lg"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]">
                  <span className="text-gray-700">Next</span>
                  <img src={next_arrow} className="w-5 h-5"></img>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
