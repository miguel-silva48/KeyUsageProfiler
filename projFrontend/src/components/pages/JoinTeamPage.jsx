import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import refreshToken from "../../utils/refreshToken";

const JoinTeam = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const { token } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Invalid Link");
  const [errorMessage, setErrorMessage] = useState(
    "Link to join team is invalid."
  );

  useEffect(() => {
    if (!authToken) {
      localStorage.setItem("inviteToken", token);

      const timeoutId = setTimeout(() => {
        navigate("/login");
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    const timeoutId2 = setTimeout(() => {
      setErrorTitle("Connection Timeout");
      setErrorMessage("Please try again later.");
      setOpen(true);
    }, 5000);

    joinTeamCall();
  }, [authToken, navigate, token]);

  const joinTeamCall = async () => {
    try {
      var authToken = localStorage.getItem("authToken");
      const joinTeamResponse = await fetch(
        `http://localhost:8080/api/teams/join/${token}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (joinTeamResponse.status === 403) {
        var error = new Error();
        error.code = 403;
        throw error;
      } else if (joinTeamResponse.status === 400) {
        var error = new Error();
        error.code = 400;
        throw error;
      }
      if (joinTeamResponse.ok) {
        await joinTeamResponse.json();
        localStorage.setItem("userType", "TEAM_MEMBER");
        navigate("/profile");
      } else {
        console.error("Failed to join team - ", joinTeamResponse.statusText);
      }
    } catch (error) {
      if (error.code === 403) {
        try {
          const newToken = await refreshToken();
          setAuthToken(newToken);

          if (newToken !== null) {
            joinTeamCall();
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
      } else if (error.code === 400) {
        setOpen(true);
      } else {
        console.error("Error joining team:", error.message);
        setErrorTitle("Unknown Error");
        setErrorMessage("Please try again later.");
        setOpen(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Joining Team</h1>
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                            {errorTitle}
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {errorMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => navigate("/")}
                      >
                        Go back to home
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default JoinTeam;
