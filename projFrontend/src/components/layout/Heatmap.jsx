import React, { useEffect, useState } from "react";
import h337 from "@mars3d/heatmap.js";
import HeatmapChart from "./HeatmapChart";
import "../../utils/heatmap.css";

function Heatmap() {
  const [heatmapData, setHeatmapData] = useState(null);

  // Returns proper values for keys and filters out invalid keyCodes.
  const filterKey = (key) => {
    if (key === "Unknown keyCode: 0xe36") return "Right Shift";

    if (key === " ") return "Spacebar";

    if (key === "\n") return "Enter";

    if (key === "\t") return "Tab";

    if (key.startsWith("Unknown keyCode:")) return null;

    return key;
  };

  const fetchHeatmapData = async () => {
    var token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/keystrokes/frequencies`,
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
  const coordinates = {
    Escape: {
      x: 25,
      y: 29,
    },
    F1: {
      x: 83,
      y: 29,
    },
    F2: {
      x: 112,
      y: 29,
    },
    F3: {
      x: 141,
      y: 29,
    },
    F4: {
      x: 170,
      y: 29,
    },
    F5: {
      x: 226,
      y: 29,
    },
    F6: {
      x: 254,
      y: 29,
    },
    F7: {
      x: 283,
      y: 29,
    },
    F8: {
      x: 312,
      y: 29,
    },
    F9: {
      x: 368,
      y: 29,
    },
    F10: {
      x: 397,
      y: 29,
    },
    F11: {
      x: 426,
      y: 29,
    },
    F12: {
      x: 453,
      y: 29,
    },
    "Print Screen": {
      x: 513,
      y: 29,
    },
    "Scroll Lock": {
      x: 541,
      y: 29,
    },
    Pause: {
      x: 570,
      y: 29,
    },
    "Back Quote": {
      x: 27,
      y: 62,
    },
    1: {
      x: 56,
      y: 62,
    },
    2: {
      x: 84,
      y: 62,
    },
    3: {
      x: 115,
      y: 62,
    },
    4: {
      x: 143,
      y: 62,
    },
    5: {
      x: 174,
      y: 62,
    },
    6: {
      x: 203,
      y: 62,
    },
    7: {
      x: 233,
      y: 62,
    },
    8: {
      x: 262,
      y: 62,
    },
    9: {
      x: 292,
      y: 62,
    },
    0: {
      x: 321,
      y: 62,
    },
    "-": {
      x: 351,
      y: 62,
    },
    "=": {
      x: 380,
      y: 62,
    },
    Backspace: {
      x: 430,
      y: 62,
    },
    Insert: {
      x: 511,
      y: 62,
    },
    Home: {
      x: 541,
      y: 62,
    },
    "Page Up": {
      x: 570,
      y: 62,
    },
    "Tab": {
      x: 37,
      y: 94,
    },
    Q: {
      x: 77,
      y: 94,
    },

    W: {
      x: 107,
      y: 94,
    },
    E: {
      x: 136,
      y: 94,
    },
    R: {
      x: 166,
      y: 94,
    },
    T: {
      x: 195,
      y: 94,
    },
    Y: {
      x: 225,
      y: 94,
    },
    U: {
      x: 254,
      y: 94,
    },
    I: {
      x: 284,
      y: 94,
    },
    O: {
      x: 313,
      y: 94,
    },
    P: {
      x: 343,
      y: 94,
    },
    "{": {
      x: 372,
      y: 94,
    },
    "}": {
      x: 402,
      y: 94,
    },
    "Back Slash": {
      x: 442,
      y: 94,
    },
    Delete: {
      x: 511,
      y: 94,
    },
    End: {
      x: 540,
      y: 94,
    },
    "Page Down": {
      x: 570,
      y: 94,
    },
    "Caps Lock": {
      x: 45,
      y: 127,
    },
    A: {
      x: 88,
      y: 127,
    },
    S: {
      x: 117,
      y: 127,
    },
    D: {
      x: 148,
      y: 127,
    },
    F: {
      x: 177,
      y: 127,
    },
    G: {
      x: 208,
      y: 127,
    },
    H: {
      x: 237,
      y: 127,
    },
    J: {
      x: 268,
      y: 127,
    },
    K: {
      x: 297,
      y: 127,
    },
    L: {
      x: 328,
      y: 127,
    },
    ";": {
      x: 358,
      y: 127,
    },
    "'": {
      x: 389,
      y: 127,
    },
    "Enter": {
      x: 420,
      y: 127,
    },
    Shift: {
      x: 50,
      y: 159,
    },
    Z: {
      x: 100,
      y: 159,
    },
    X: {
      x: 131,
      y: 159,
    },
    C: {
      x: 162,
      y: 159,
    },
    V: {
      x: 192,
      y: 159,
    },
    B: {
      x: 223,
      y: 159,
    },
    N: {
      x: 253,
      y: 159,
    },
    M: {
      x: 284,
      y: 159,
    },
    ",": {
      x: 314,
      y: 159,
    },
    ".": {
      x: 344,
      y: 159,
    },
    "/": {
      x: 374,
      y: 159,
    },
    "Right Shift": {
      x: 420,
      y: 159,
    },
    Up: {
      x: 540,
      y: 159,
    },
    Ctrl: {
      x: 27,
      y: 191,
    },
    Meta: {
      x: 58,
      y: 191,
    },
    Alt: {
      x: 88,
      y: 191,
    },
    Left: {
      x: 230,
      y: 191,
    },
    "Spacebar": {
      x: 230,
      y: 191,
    },
    "Context Menu": {
      x: 417,
      y: 191,
    },
    Left: {
      x: 509,
      y: 191,
    },
    Down: {
      x: 539,
      y: 191,
    },
    Right: {
      x: 570,
      y: 191,
    },
  };

  useEffect(() => {
    const heatmap = document.querySelector(".Heatmap");
    if (heatmap) {
      var heatmapInstance = h337.create({
        container: heatmap,
        radius: 35,
        maxOpacity: 0.5,
        minOpacity: 0.0,
        blur: 0.75,
      });
      fetchHeatmapData().then((data) => {
        var points2 = [];
        var max = 0;
        var min = 1000000000;
        for (const k in data) {
          if (k in coordinates) {
            var v = Math.floor(data[k]);
            points2.push({
              x: coordinates[k].x,
              y: coordinates[k].y,
              value: data[k],
            });
            if (v > max) {
              max = v;
            }
            if (v < min) {
              min = v;
            }
          }
        }
        // heatmap data format
        var data1 = {
          max: max,
          min: min - Math.floor(max / 5),
          data: points2,
        };

        console.log("my data: ", data1);
        heatmapInstance.setData(data1);
      });
    }
  }, []);

  return (
    <div className="row p-2 flex items-center justify-center content-center">
      <div className="column p-2">
        <h2 className="text-3xl font-bold text-center mb-10">
          Keypress Heatmap
        </h2>
        <div className="Heatmap"></div>
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

export default Heatmap;
