import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import {
  RiUser3Line,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiDeleteBinLine,
  RiShareForwardLine,
  RiLink
} from "react-icons/ri";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import GamingBadge from "../layout/GamingBadge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userStatistics, setUserStatistics] = useState(null);

  const fetchData = () => {
    fetch('http://localhost:8080/api/users', {headers: {"Authorization": "Bearer " + "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJyaWNAYXNkYXMucHQiLCJpYXQiOjE3MDE1MzY1MjksImV4cCI6MTcwMTUzNzcyOX0.Z2QLzayTIY0-Mu4wOeKUUPSBHdMQ5X_JpbssxsjGxsCo3JqTrTB_YWJS4f95caRw"}})
      .then((response) => response.json())
      .then((data) => {
        // TODO - handle multiple users
        const user = data[0];
        setUserData(user);

        fetch(`http://localhost:8080/api/statistics/${user.id}`, {headers: {"Authorization": "Bearer " + "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJyaWNAYXNkYXMucHQiLCJpYXQiOjE3MDE1MzY1MjksImV4cCI6MTcwMTUzNzcyOX0.Z2QLzayTIY0-Mu4wOeKUUPSBHdMQ5X_JpbssxsjGxsCo3JqTrTB_YWJS4f95caRw"}})
          .then((response) => response.json())
          .then((statistics) => {
            setUserStatistics(statistics);
          })
          .catch((error) => console.error('Error fetching user statistics:', error));
      })
      .catch((error) => console.error('Error fetching user data:', error));
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
   
  return (
    <div>
      <Navbar />
      <div id="body" className="flex w-screen mt-2 pb-0 flex-col items-center gap-5">
        <div id="table-team-members" className="flex w-10/12 mt-3 mx-3 flex-col items-start rounded-lg border shadow-[0_2px_4px_-2px_rgba(16,24,40,0.06)]">
          <div className="flex items-center self-stretch">
            <div className="flex items-center self-stretch px-6 pt-5 pb-5 gap-4 w-10/12">
              <div className="flex items-center flex-[1_0_0] gap-2">
                <h2 className="text-2xl font-normal leading-7">Team Members</h2>
                <div className="flex items-start mix-blend-multiply">
                  <div className="flex px-2 py-0.5 justify-center items-center rounded-2xl bg=[#F9F5FF]">
                    <span className="text-[#6941C6] text-sm font-medium leading-4">
                      1 user
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex px-5 py-3 justify-center items-center gap-2.5 rounded-xl bg-[#12B76A26]">
              <RiLink className='text-xl'/>
              <span className="text-[#12B76A] text-l">Invite Link</span>
            </button>
          </div>
          <div className="flex items-start self-stretch">
            <div className="flex flex-col items-start flex-[1_0_0]">
              <div className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex justify-center items-center">
                  <input type="checkbox" className="w-5 h-5 rounded-md border"></input>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#667085]">Member</span>
                </div>
              </div>
              <div className="w-full">
                <div className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <div className="flex justify-center items-center">
                    <input type="checkbox" className="w-5 h-5 rounded-md border"></input>
                  </div>
                  <Link to="/user">
                    <RiUser3Line className='text-2xl'/>
                  </Link>
                  <Link to="/user" className="flex flex-col items-start">
                    <p className="text-gray-900">{userData ? userData.username : 'Loading...'}</p>
                    <p className="text-gray-500 text-sm">{userData ? userData.email : 'Loading...'}</p>
                  </Link>
                </div> 
              </div>
            </div>
            <div id="table-awpm-column" className="flex w-32 flex-col items-start">
              <div className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex items-center gap-1">
                  <span className="text-[#667085]">Avg. WPM</span>
                </div>
              </div>
              <div className="w-full">
                <div className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <span className="text-gray-500 text-sm">{userStatistics ? userStatistics.awpm : 'Loading...'}</span>
                </div>
              </div>
            </div>
            <div id="table-minutes-typing-column" className="flex w-36 flex-col items-start">
              <div className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex items-center gap-1">
                  <span className="text-[#667085]">Min. Typing</span>
                </div>
              </div>
              <div className="w-full">
                <div className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <span className="text-gray-500 text-sm">{userStatistics ? userStatistics.minutesTyping : 'Loading...'}</span>
                </div>
              </div>
            </div>
            <div id="table-status-column" className="flex w-28 flex-col items-start">
            <div className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex items-center gap-1">
                  <span className="text-[#667085]">Status</span>
                </div>
              </div>
              <div className="w-full">
                <div className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <GamingBadge /> 
                </div> 
              </div>
            </div>
            <div id="table-remove/view-column" className="flex flex-col items-start">
            <div className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex items-center gap-1">
                </div>
              </div>
              <div className="w-full">
                <div className="flex h-16 p-4 items-center gap-1 self-stretch border-b">
                  <button className="flex items-start rounded-lg">
                    <div className="flex p-2.5 justify-center items-center gap-2 rounded-lg">
                      <RiDeleteBinLine className='text-xl'/>
                    </div>
                  </button>
                  <button className="flex w-11 items-start rounded-lg">
                    <Link to="/user" className="flex w-11 p-2.5 justify-center items-center gap-2 rounded-lg shrink-0">
                        <RiShareForwardLine className='text-xl'/>
                    </Link>
                  </button>
                </div> 
              </div>
            </div>
          </div>
          <div className="flex px-6 pt-3 pb-4 justify-between items-center self-stretch">
            <button className="flex items-start rounded-lg">
              <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border">
                <RiArrowLeftLine className='text-xl'/>
                <span className="text-gray-700">Previous</span>
              </div>
            </button>
            <button className="flex items-start rounded-lg">
              <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border">
                <span className="text-gray-700">Next</span>
                <RiArrowRightLine className='text-xl'/>
              </div>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
