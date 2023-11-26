import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import invite_link from "../../assets/invite_link.svg";

import "./../../utils/styles.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import example_avatar from "../../assets/example_avatar.png";
import GamingBadge from "../layout/GamingBadge";
import trash_icon from "../../assets/trash_icon.svg";
import goto_icon from "../../assets/goto_icon.svg";
import previous_arrow from "../../assets/previous_arrow.svg";
import next_arrow from "../../assets/next_arrow.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => {
        // TODO change this to use more users
        const user = data[0];
        setUserData(user);
      })
      .catch((error) => console.error('Error fetching user data:', error));
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
              <div className="flex w-10 h-5 justify-center items-center gap-2.5">
                <img src={invite_link} className="w-12 h-12 shrink-0"></img>
              </div>
              <span className="text-[#12B76A] text-m font-medium leading-4">Invite Link</span>
            </button>
          </div>
          <div className="flex items-start self-stretch">
            <table id="table-name-column" className="flex flex-col items-start flex-[1_0_0]">
              <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex justify-center items-center">
                  <input type="checkbox" className="w-5 h-5 rounded-md border"></input>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#667085]">Name</span>
                </div>
              </thead>
              <tbody className="w-full">
                <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <div className="flex justify-center items-center">
                    <input type="checkbox" className="w-5 h-5 rounded-md border"></input>
                  </div>
                  <img src={example_avatar} className="flex w-10 h-10 flex-col justify-center items-center rounded-full"></img>
                  <div className="flex flex-col items-start">
                    <p className="text-gray-900">{userData ? userData.username : 'Loading...'}</p>
                    <p className="text-gray-500 text-sm">{userData ? userData.email : 'Loading...'}</p>
                  </div>
                </tr> 
              </tbody>
            </table>
            <table id="table-status-column" className="flex w-28 flex-col items-start">
            <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex items-center gap-1">
                  <span className="text-[#667085]">Status</span>
                </div>
              </thead>
              <tbody className="w-full">
                <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                  <GamingBadge /> 
                </tr> 
              </tbody>
            </table>
            <table id="table-ip-column" className="flex w-32 flex-col items-start">
            <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex items-center gap-1">
                  <span className="text-[#667085]">IP address</span>
                </div>
              </thead>
              <tbody className="w-full">
                <tr className="flex h-16 px-6 py-4 items-center gap-3 self-stretch border-b">
                <span className="text-gray-500 text-sm">10.0.0.1</span>
                </tr> 
              </tbody>
            </table>
            <table id="table-remove/view-column" className="flex flex-col items-start">
            <thead className="flex h-10 px-6 py-3 items-center gap-3 self-stretch border-b bg-[#F9FAFB]">
                <div className="flex items-center gap-1">
                </div>
              </thead>
              <tbody className="w-full">
                <tr className="flex h-16 p-4 items-center gap-1 self-stretch border-b">
                  <button className="flex items-start rounded-lg">
                    <div className="flex p-2.5 justify-center items-center gap-2 rounded-lg">
                      <img src={trash_icon} className="w-5 h-5"></img>
                    </div>
                  </button>
                  <button className="flex w-11 items-start rounded-lg">
                    <div className="flex w-11 p-2.5 justify-center items-center gap-2 rounded-lg shrink-0">
                        <img src={goto_icon} className="w-5 h-5 pt-0.5 shrink-0"></img>
                    </div>
                  </button>
                </tr> 
              </tbody>
            </table>
          </div>
          <div className="flex px-6 pt-3 pb-4 justify-between items-center self-stretch">
            <button className="flex items-start rounded-lg">
              <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]">
                <img src={previous_arrow} className="w-5 h-5"></img>
                <span className="text-gray-700">Previous</span>
              </div>
            </button>
            <div className="flex items-start rounded-lg">
              <button className="flex w-10 h-10 justify-center items-center rounded-lg bg-primary-50">
                <div className="flex w-10 p-3 justify-center items-center shrink-0 self-stretch rounded-lg">
                  <span className="text-primary-600">1</span>
                </div>
              </button>
              <button className="flex w-10 h-10 justify-center items-center rounded-lg bg-primary-50">
                <div className="flex w-10 p-3 justify-center items-center shrink-0 self-stretch rounded-lg">
                  <span className="text-gray-500">2</span>
                </div>
              </button>
            </div>
            <button className="flex items-start rounded-lg">
              <div className="flex px-3.5 py-2 justify-center items-center gap-2 rounded-lg border shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)]">
                <span className="text-gray-700">Next</span>
                <img src={next_arrow} className="w-5 h-5"></img>
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

