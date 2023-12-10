import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import typing_image from "../../assets/home_typing_image.png";

import "./../../utils/styles.css";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const HomePage = () => {
  const [state, setState] = useState(false); // Destructuring assignment
  const navigate = useNavigate();
  const [inviteLink, setInviteLink] = useState("");
  const [teamName, setTeamName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
      if (!token || !userType) {
        navigate("/login");
      } else if (userType === "TEAM_MEMBER") {
        navigate("/user"); // TODO maybe change to profile
      } else if (userType === "TEAM_LEADER") {
        navigate("/dashboard");
      }
  }, []);

  const joinTeamHandler = async () => {

    if (!inviteLink) {
      setErrorMessage("Please enter an invite link and try again.");
      return;
    }

    if (inviteLink.startsWith("http://localhost:8080/api/teams/join/")) {
      setInviteLink(inviteLink.replace("http://localhost:8080/api/teams/join/", ""));
    }

    try {
      const response = await fetch(`http://localhost:8080/api/teams/join/${inviteLink}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Handle successful response (team joining)
        console.log("Team joined successfully!");
        localStorage.setItem("userType", "TEAM_MEMBER");
        navigate("/user");
      } else {
        // Handle error response
        console.error("Failed to join team:", response.statusText);
        setErrorMessage(errorData.message || "Failed to join team. Please try again.");
      }
    } catch (error) {
      console.error("Error joining team:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const createTeamHandler = async () => {
    try {
      // Now that sign-in is complete, proceed with team creation
      const response = await fetch("http://localhost:8080/api/teams/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": teamName,
        }),
      });

      if (response.ok) {
        // Handle successful response (team creation)
        console.log("Team created successfully!");
        localStorage.setItem("userType", "TEAM_LEADER");
        navigate("/dashboard");
      } else {
        // Handle error response
        console.error("Failed to create team:", response.statusText);
        setErrorMessage(errorData.message || "Failed to create team. Please try again.");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-screen flex-col items-start gap-2.5">
        <div className="w-full h-[63rem] bg-white">
          <div className="w-[35rem] h-[31.5rem] absolute left-[9.5rem] top-[14.4rem]">
            <p className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
              A service made for teams and groups of friends.
            </p>
            <p className="text-base text-gray-600 mt-2 mb-4">
              Join the community and start tracking your statistics as well!
            </p>
            {/* Opções de juntar e criar equipa */}
            <form className="w-[34.5rem] shrink-0">
              <div className="flex flex-col justify-center items-start shrink-0">
                <div className="flex p-5 pr-6 items-center flex-[1_0_0] self-stretch rounded-2xl border border-gray-400 bg-gray-50 mt-4">
                  <input placeholder="Enter invite link" value={inviteLink} onChange={(e) => setInviteLink(e.target.value)}></input>
                  <button type="button" onClick={joinTeamHandler} className="flex w-[13rem] h-[3.35rem] p-4 flex-col justify-center items-center gap-2.5 shrink-0 rounded-[0.625rem] bg-gray-950">
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-white text-base font-bold text-white">Join a Team</p>
                    </div>
                  </button>
                </div>
                <div className="flex p-5 pr-6 items-center flex-[1_0_0] self-stretch rounded-2xl border border-gray-400 bg-gray-50 mt-4">
                  <input placeholder="Enter team name" value={teamName} onChange={(e) => setTeamName(e.target.value)}></input>
                  <button type="button" onClick={createTeamHandler} className="flex w-[13rem] h-[3.35rem] p-4 flex-col justify-center items-center gap-2.5 shrink-0 rounded-[0.625rem] bg-gray-950">
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-white text-base font-bold text-white">Create a Team</p>
                    </div>
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              {errorMessage && (
                <div className="text-red-500 p-3 border border-red-500 rounded">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
        <img className="w-[22rem] h-[22rem] absolute right-80 top-56" src={typing_image} alt="Typing" />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
