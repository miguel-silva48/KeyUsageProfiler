import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import refreshToken from "../../utils/refreshToken";

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
        var token = localStorage.getItem("authToken");
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
      console.error("Error in joinTeamCall:", error);
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
