import React, { useEffect, useState } from "react";
import HeatmapChart from "./HeatmapChart";
import Heatmap from "./Heatmap";
import "../../utils/heatmap.css";
import { baseUrl } from "../../main.jsx";


function HeatmapContainer({userId}) {
    const [heatmapData, setHeatmapData] = useState(null);
    const [userType, setUserType] = useState(localStorage.getItem("userType"));


    // Returns proper values for keys and filters out invalid keyCodes.
    const filterKey = (key) => {
        if (key === "Unknown keyCode: 0xe36") return "Right Shift";
    
        if (key === " ") return "Spacebar";
    
        if (key === "\n") return "Enter";
    
        if (key === "\t") return "Tab";
    
        if (key.startsWith("Unknown keyCode:")) return null;
    
        return key;
    };

    useEffect(() => {
        if (!userType || userType === "USER") {
          navigate("/");
          return;
        }
        var interval_id;
        if (userId) {
            fetchHeatmapData();
            interval_id = setInterval(fetchHeatmapData, 10000);
        }
    
        return () => clearInterval(interval_id);
      }, []);

      const fetchHeatmapData = async () => {
        var token = localStorage.getItem("authToken");
        try {
          const response = await fetch(
            `http://${baseUrl}:8080/api/keystrokes/frequencies/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.ok) {
            // Handle successful response (team joining)
            const data = await response.json();
            const result = data.reduce((acc, item) => {
              var k = filterKey(item.keyValue);
              if (k)
                acc[k] = item.numPresses;
                return acc;
            }, {});
            setHeatmapData(result);
            return result;
          } else if (response.status == 403) {
            const newToken = await refreshToken();
    
            if (newToken !== null) {
              fetchHeatmapData();
              return;
            } else {
              throw new Error("Failed to refresh token");
            }
          } else {
            // Handle error response
            console.error("Failed to fetch data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching heatmap data:", error);
        }
      };

    return (
        <div className="row p-2 flex items-center justify-center content-center">
      <div className="column p-2">
        <h2 className="text-3xl font-bold text-center mb-10">
          Keypress Heatmap
        </h2>
        <Heatmap heatmapData={heatmapData}/>
      </div>
      <div className="column p-2">
        <h2 className="text-3xl font-bold text-center mb-10">
          Keypress Histogram
        </h2>
        <HeatmapChart heatmapData={heatmapData} />
      </div>
    </div>
    );
}


export default HeatmapContainer;