import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JoinTeam = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }

    const joinTeamCall = async () => {
      try {
        const joinTeamResponse = await fetch(
          `http://localhost:8080/api/teams/join/${token}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (joinTeamResponse.ok) {
          await joinTeamResponse.json();
          localStorage.setItem("userType", "TEAM_MEMBER");
          navigate("/profile");
        } else {
          console.error("Failed to join team - ", joinTeamResponse.statusText);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    joinTeamCall();
  }, [authToken, navigate, token]);

  return (
    <div>
      <h1>Joining Team...</h1>
    </div>
  );
};

export default JoinTeam;
