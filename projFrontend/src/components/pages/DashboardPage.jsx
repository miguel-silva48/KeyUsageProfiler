import { Fragment, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDeleteBinLine,
  RiLink,
  RiShareForwardLine,
  RiUser3Line,
} from "react-icons/ri";

import "./../../utils/styles.css";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import GamingBadge from "../layout/StatusBadges/GamingBadge";
import InactiveBadge from "../layout/StatusBadges/InactiveBadge";
import CodingBadge from "../layout/StatusBadges/CodingBadge";
import PieChart from "../layout/PieChart";

import refreshToken from "../../utils/refreshToken";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [currentPage, setCurrentPage] = useState(1);
  const [inviteLink, setInviteLink] = useState(null);
  const usersPerPage = 10;
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [copiedLink, setCopiedLink] = useState(false);

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

    var intervalId = setInterval(fetchData, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (copiedLink) {
      const timer = setTimeout(() => {
        setCopiedLink(false);
      }, 3000);
   
      return () => clearTimeout(timer);
    }
   }, [copiedLink]);

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
            };
          } else if (statisticsResponse.status === 404) {
            return {
              id: member.id,
              username: member.name,
              email: member.email,
              minutesTyping: 0,
              awpm: 0,
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

  const createInviteLink = async () => {
    try {
      var token = localStorage.getItem("authToken");
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
      } else if (fetchLinkToken.status == 403) {
        const newToken = await refreshToken();

        if (newToken !== null) {
          setToken(newToken);
          createInviteLink();
          return;
        } else {
          throw new Error("Failed to refresh token");
        }
      } else {
        console.log("Error creating invite link");
      }
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      // Handle the error appropriately, for now, just log it
      let theme = localStorage.getItem("theme");
      localStorage.clear();
      localStorage.setItem("theme", theme);
      navigate("/login");
    }
  };

  const removeFromTeam = async (userId) => {
    try {
      var token = localStorage.getItem("authToken");

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
      } else if (response.status == 403) {
        const newToken = await refreshToken();
        if (newToken !== null) {
          setToken(newToken);
          removeFromTeam(userId);
          return;
        } else {
          throw new Error("Failed to refresh token");
        }
      } else {
        console.error("Couldn't delete user", response.statusText);
      }
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      // Handle the error appropriately, for now, just log it
      let theme = localStorage.getItem("theme");
      localStorage.clear();
      localStorage.setItem("theme", theme);
      navigate("/login");
    }
  };

  const deleteTeam = async () => {
    try {
      var token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/api/teams/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Handle successful response (team creation)
        let theme = localStorage.getItem("theme");
        localStorage.clear();
        localStorage.setItem("theme", theme);
        navigate("/");
      } else if (response.status == 403) {
        const newToken = await refreshToken();
        if (newToken !== null) {
          setToken(newToken);
          deleteTeam();
          return;
        } else {
          throw new Error("Failed to refresh token");
        }
      }
    } catch (error) {
      console.log("Failed to delete team", error.message);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const countUsers = userData.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(userData.length / usersPerPage);
  const showPagination = totalPages > 1;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
  }

  const toggleAll = () => {
    const main_checkbox = document.querySelector('input[id="select-all-members"]');
    const checkboxes = document.querySelectorAll('input[id="select-member"]');
    
    //if all checkboxes are checked, uncheck them
    if (Array.from(checkboxes).every((checkbox) => checkbox.checked === true)) {
      Array.from(checkboxes).forEach((checkbox) => {checkbox.checked = false;});
      main_checkbox.checked = false;
    }
    //if at least 1 is not checked, check all of them
    else {
      Array.from(checkboxes).forEach((checkbox) => {checkbox.checked = true;});
      main_checkbox.checked = true;
    }
  }

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [gamingUsers, setGamingUsers] = useState([]);
  const [idleUsers, setIdleUsers] = useState([]);
  const [codingUsers, setCodingUsers] = useState([]);

  const handleViewGraph = () => {
    const checkboxes = document.querySelectorAll('input[id="select-member"]');
    const selectedUserIds = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => {return checkbox.getAttribute("data-user-id");});

    const selectedUsersData = userData.filter((user) => selectedUserIds.includes(String(user.id)));

    setGamingUsers(selectedUsersData.filter((user) => user.status === "GAMING"));
    setIdleUsers(selectedUsersData.filter((user) => (!user.status || user.status === "IDLE")));
    setCodingUsers(selectedUsersData.filter((user) => user.status === "CODING"));
    setSelectedUsers(selectedUsersData);
    setShowGraphModal(true);
  };

  const handleCloseGraphModal = () => {
    setShowGraphModal(false);
  };

  return (
    <div>
      <Navbar />
      {/*Dialog to delete a team*/}
      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete team
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete your team? All of
                              your data will be permanently removed. This action
                              cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={deleteTeam}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>

      {/*Dialog for the Chart*/}
      <div>
        <Transition.Root show={showGraphModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={handleCloseGraphModal}
          >
            <Transition.Child as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl max-w-3xl max-h-screen">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                            Selected users' status
                          </Dialog.Title>
                        </div>
                      </div>
                    </div>
                    <div className="modal-content flex">
                      <div className="flex-1">
                        <PieChart grafData={[gamingUsers.length, idleUsers.length, codingUsers.length]} />
                      </div>
                      <div className="w-40 ml-4">
                        <h3 className="text-base text-[#B71230] font-semibold mb-2 mt-2">Gaming:</h3>
                        <ul className="list-disc">
                          {gamingUsers.length === 0 && (
                            <li className="text-xs text-gray-600">No team members are currently gaming</li>
                          )}
                          {gamingUsers.map((user) => (
                              <li key={user.id} className="text-xs text-gray-600">
                                {user.username}
                              </li>
                            ))}
                        </ul>
                        <h3 className="text-base font-semibold mb-2 mt-2">Idle:</h3>
                        <ul className="list-disc">
                          {idleUsers.length === 0 && (
                            <li className="text-xs text-gray-600">No team members are currently idle</li>
                          )}
                          {idleUsers.map((user) => (
                              <li key={user.id} className="text-xs text-gray-600">
                                {user.username}
                              </li>
                            ))}
                        </ul>
                        <h3 className="text-base text-[#027A48] font-semibold mb-2 mt-2">Coding:</h3>
                        <ul className="list-disc">
                          {codingUsers.length === 0 && (
                            <li className="text-xs text-gray-600">No team members are currently coding</li>
                          )}
                          {codingUsers
                            .map((user) => (
                              <li key={user.id} className="text-xs text-gray-600">
                                {user.username}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:w-auto"
                        onClick={handleCloseGraphModal}
                        ref={cancelButtonRef}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>

      <div
        id="body"
        className="flex w-screen mt-2 pb-0 flex-col items-center gap-5 min-h-[52.3vh]"
      >
        <div
          id="table-team-members"
          className="flex w-10/12 mt-3 mx-3 flex-col items-start rounded-lg border shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06)]"
        >
          <div className="flex items-center self-stretch">
            <div className="flex items-center self-stretch px-6 pt-5 pb-5 gap-4 w-9/12">
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
              {copiedLink && (<p className="text-gray-500 text-sm ml-2">Copied to clipboard!</p>)}
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard()}
              className="flex px-5 py-3 justify-center items-center gap-2.5 rounded-xl bg-[#12B76A26]"
            >
              <RiLink className="text-xl" />
              <span className="text-[#12B76A] text-l">Invite Link</span>
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex ml-3 px-5 py-3 justify-center items-center gap-2.5 rounded-xl bg-red-500"
            >
              <span className="text-white text-l">Delete Team</span>
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
                      id="select-all-members"
                      type="checkbox"
                      className="w-5 h-5 rounded-md border"
                      onClick={() => toggleAll()}
                    ></input>
                  </th>
                </tr>
                <tr className="flex items-center gap-1">
                  <th>
                    <span className="text-[#667085]">Toggle All</span>
                    <button 
                      className="btn btn-sm ml-4 text-[#667085] text-sm"
                      onClick={() => handleViewGraph()}
                    >View selected
                    </button>
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
                          id="select-member"
                          type="checkbox"
                          className="w-5 h-5 rounded-md border"
                          data-user-id={user.id}
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
                    <tr key={user.id} className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
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
                    <tr key={user.id} className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
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
                    <tr key={user.id} className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                      <td>
                        {/*TODO change to user.status and add logic to select component*/}
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
                    <tr key={user.id} className="flex h-16 p-4 items-center gap-1 self-stretch border-b">
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
