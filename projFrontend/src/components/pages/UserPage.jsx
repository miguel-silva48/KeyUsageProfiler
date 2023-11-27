import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import example_avatar from "../../assets/example_avatar.png";

const UserPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userStatistics, setUserStatistics] = useState(null);

useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => {
        // TODO change this to add more users
        const user = data[0];
        setUserData(user);

        fetch(`http://localhost:8080/api/statistics/${user.id}`)
          .then((response) => response.json())
          .then((statistics) => {
            setUserStatistics(statistics);
          })
          .catch((error) => console.error('Error fetching user statistics:', error));
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);
   
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-10 mb-20">
        {/* Informações do User */}
        <img
          className="w-20 h-20 rounded-full object-cover mr-4"
          src={example_avatar}
          alt="Avatar"
        />
        <div>
          <p className="font-semibold text-lg">Profile</p>
          <p className="text-gray-900">{userData ? userData.username : 'Loading...'}</p>
          <p className="text-gray-500 text-sm">{userData ? userData.email : 'Loading...'}</p>
        </div>
      </div>

      {/* Estatísticas do User */}
      <div className="flex justify-center mt-20 space-x-8 mt-40 mb-40">
        <div className="text-center bg-gray-200 p-4 rounded border border-gray-500 shadow-lg">
          <p className="font-semibold text-lg">Peak Typing Speed</p>
          <p className="text-gray-500">{userData ? userData.peakTypingSpeed : 'Loading...'}</p>
        </div>

        <div className="text-center bg-gray-200 p-4 rounded border border-gray-500 shadow-lg">
          <p className="font-semibold text-lg">Time Spent Typing</p>
          <p className="text-gray-500">{userStatistics ? userStatistics.timeSpentTyping : 'Loading...'}</p>
        </div>

        <div className="text-center bg-gray-200 p-4 rounded border border-gray-500 shadow-lg">
          <p className="font-semibold text-lg">Average Typing Speed</p>
          <p className="text-gray-500">{userStatistics ? userStatistics.averageTypingSpeed : 'Loading...'}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;