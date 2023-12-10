import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Keyboard from "../layout/Keyboard";

import {
  RiTimeLine,
  RiKeyboardFill,
  RiShieldStarLine,
  RiUser3Line,
} from "react-icons/ri";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userData, setUserData] = useState(null);
  const [userStatistics, setUserStatistics] = useState(null);

  useEffect(() => {
    //If user is not team member or leader, redirect to homepage
    if (!userType || userType === "USER") {
      navigate("/");
      return;
    }

    const userID = localStorage.getItem("userId");

    //TODO: fetch user data and statistics according to API call
    fetch(`http://localhost:8080/api/statistics/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data structure contains both user and statistics information
        const { user, statistics } = data;

        if (!user || !statistics) {
          console.error("Invalid response format");
          return;
        }

        setUserData(user);
        setUserStatistics(statistics);
      })
      .catch((error) => {
        console.error("Error fetching user data and statistics:", error);
      });
  }, []);

  const handleLeaveTeam = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/leaveteam`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("USERPAGE: Team left successfully!");
        localStorage.setItem("userType", "USER");
        navigate("/");
      } else {
        console.error("USERPAGE: Failed to leave team - ", response.statusText);
      }
    } catch (error) {
      console.error("USERPAGE: Error leaving team - ", error);
    }
  };

  return (
    <div>
      <Navbar />
      {/* Informações do User */}
      <div className="flex items-center justify-center mt-10 mb-20">
        <RiUser3Line className="text-5xl" />
        <div className="ml-4">
          <p className="font-semibold text-lg">Profile</p>
          <p className="text-gray-900">
            {userData ? userData.username : "Loading..."}
          </p>
          <p className="text-gray-500 text-sm">
            {userData ? userData.email : "Loading..."}
          </p>
        </div>
        {/* Opção de sair da equipa, restrita a TEAM_MEMBER */}
        {userType === "TEAM_MEMBER" && (
          <button
            type="button"
            className="btn ml-10 p-2 rounded-[16px] border"
            onClick={handleLeaveTeam}
          >
            Leave Current Team
          </button>
        )}
      </div>

      {/* Estatísticas do User */}
      <div className="flex justify-center mt-20 space-x-4 mb-40">
        <div className="text-center bg-gray-200 w-80 h-40 p-6 rounded-[16px] border border-gray-500 shadow-lg flex flex-col items-start">
          <RiKeyboardFill className="text-2xl text-gray-500 mb-5" />
          <p className="font-semibold text-lg mb-2">Average Typing Speed</p>
          {userStatistics ? (
            <p className="text-gray-500">{userStatistics.awpm} words/minute</p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="text-center bg-gray-200 w-80 h-40 p-6 rounded-[16px] border border-gray-500 shadow-lg flex flex-col items-start">
          <RiTimeLine className="text-2xl text-gray-500 mb-5" />
          <p className="font-semibold text-lg mb-2">Time Spent Typing</p>
          {userStatistics ? (
            <p className="text-gray-500">
              {userStatistics.minutesTyping} minutes
            </p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        <div className="text-center bg-gray-200 w-80 h-40 p-6 rounded-[16px] border border-gray-500 shadow-lg flex flex-col items-start">
          <RiShieldStarLine className="text-2xl text-gray-500 mb-5" />
          <p className="font-semibold text-lg mb-2">Peak Typing Speed</p>
          {userStatistics ? (
            <p className="text-gray-500">
              {userStatistics.maxWpm} words/minute
            </p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
