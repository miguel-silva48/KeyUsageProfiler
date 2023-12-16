import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Keyboard from "../layout/Keyboard";
import Heatmap from "../layout/Heatmap";

import refreshToken from "../../utils/refreshToken";

import {
  RiTimeLine,
  RiKeyboardFill,
  RiShieldStarLine,
  RiUser3Line,
  RiEyeLine
} from "react-icons/ri";

const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userData, setUserData] = useState(null);
  const [userStatistics, setUserStatistics] = useState(null);

  useEffect(() => {
    if (!userType || userType === "USER") {
      navigate("/");
      return;
    }
    if (userId) fetchUserStatistics(userId);
  }, []);

  const fetchUserStatistics = async (userId) => {
    var authtoken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/statistics/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );

      if (!response.ok) {
        var error = new Error(
          `Error fetching user statistics: ${response.statusText}`
        );
        error.code = response.status;
        throw error;
      }
      const data = await response.json();

      const statistics = {
        awpm: data.awpm,
        maxWpm: data.maxWpm,
        minutesTyping: data.minutesTyping,
        status: data.status,
      };
      setUserData(data.author);
      setUserStatistics(statistics);
      return;
    } catch (error) {
      if (error.code === 403) {
        try {
          const newToken = await refreshToken();

          if (newToken !== null) {
            setToken(newToken);
            fetchUserStatistics(userId);
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
      console.error("Error in fetchUserStatistics:", error);
    }
  };

  const handleLeaveTeam = async () => {
    try {
      var token = localStorage.getItem("authToken");
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
      } else if (response.status == 403) {
        const newToken = await refreshToken();

        if (newToken !== null) {
          setToken(newToken);
          handleLeaveTeam();
          return;
        } else {
          throw new Error("Failed to refresh token");
        }
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
            {userData ? userData.name : "Loading..."}
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
      <div className="flex justify-center mt-20 space-x-4 mb-20">
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

        <div className="text-center bg-gray-200 w-80 h-40 p-6 rounded-[16px] border border-gray-500 shadow-lg flex flex-col items-start">
          <RiEyeLine className="text-2xl text-gray-500 mb-5" />
          <p className="font-semibold text-lg mb-2">Current Status</p>
          {userStatistics ? (
            <p className="text-gray-500">
              {userStatistics.status}
            </p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center mb-10">Live Keyboard</h2>
        <Keyboard userId={userId} />
      </div>
      <Heatmap userId={userId}/>
      <Footer />
    </div>
  );
};

export default UserPage;
