import React, { useState } from "react";
import typing_image from "../../assets/home_typing_image.png";

import "./../../utils/styles.css";

import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const HomePage = () => {
  const [teamName, setTeamName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const credentials = {email: "ricardo@example.com", username:"ricardo", password: "segura"};

  const joinTeamHandler = async () => {
    try {
      // Wait for sign-in to complete
      await handleSignIn(credentials);

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
      } else {
        // Handle error response
        console.error("Failed to create team:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleSignIn = async (credentials) => {
    try {
      // Perform sign-in API request
      const signInResponse = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (signInResponse.ok) {
        const { token } = await signInResponse.json();

        // Store the token securely
        localStorage.setItem("authToken", token);
        setToken(token);

        // Optionally, redirect to the home page or perform other actions
      } else {
        // Handle sign-in error
        console.error("Failed to sign in:", signInResponse.statusText);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-screen flex-col items-start gap-2.5">
        <div className="w-full h-[63rem] bg-white">
          <div className="w-[35rem] h-[31.5rem] absolute left-[9.5rem] top-[14.4rem]">
            <p className="w-[34rem] font-sans text-6xl not-italic font-extrabold leading-[4.125rem] bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
              A service made for teams and groups of friends.
            </p>
            <p className="w-[31.37rem] text-base text-gray-600">Join the community and start tracking your statistics as well!</p>
            <div className="flex items-center gap-3 self-stretch p-5">
              <p>You can join a team through an Invite Link</p>
            </div>
            <form className="w-[34.5rem] h-[4.3rem] shrink-0">
              <div className="flex w-full h-full flex-col justify-center items-start gap-2.5 shrink-0">
                <div className="flex p-5 pr-6 items-center gap-3 flex-[1_0_0] self-stretch rounded-2xl border border-gray-400 bg-gray-50">
                  <input id="team-name" placeholder="Enter team name" value={teamName} onChange={(e) => setTeamName(e.target.value)}></input>
                  <button type="button" onClick={joinTeamHandler} className="flex w-[13rem] h-[3.35rem] p-4 flex-col justify-center items-center gap-2.5 shrink-0 rounded-[0.625rem] bg-gray-950">
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-white text-base font-bold text-white">Create a Team</p>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <img className="w-[22rem] h-[22rem] absolute right-80 top-56" src={typing_image} alt="Typing" />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
