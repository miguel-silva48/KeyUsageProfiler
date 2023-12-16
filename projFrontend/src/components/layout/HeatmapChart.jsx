import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const HeatmapChart = ({ heatmapData }) => {
  const graficoRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Function to create or update the chart
    const createOrUpdateChart = () => {
      const ctx = graficoRef.current.getContext("2d");

      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      var options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            }
        },
        title: {
          text: 'Hello',
          display: true
        },
        scales: {
          x : {
            ticks: {
                display: false
            },
            title: {
                display: true,
                align: 'center',
                text: "Key",
                font: {
                    family: 'Arial',
                    size: 14,
                    weight: 'bold',
                },
                padding: {
                    top: 0,
                    bottom: 20,
                    left: 0,
                    right: 0,
                },
            }
          },
          y: {
            title: {
                display: true,
                align: 'center',
                text: "Number of Presses",
                font: {
                    family: 'Arial',
                    size: 14,
                    weight: 'bold',
                },
                padding: {
                    top: 10,
                    bottom: 5,
                    left: 0,
                    right: 0,
                },
            }
          }
        }
      };

      const colors = [
        "#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33A1FF",
        "#FF3366", "#33FFA1", "#A1FF33", "#3366FF", "#FF33E6",
        "#33E6FF", "#E6FF33", "#3333FF", "#FF6633", "#33FF33",
        "#3333A1", "#FF9933", "#33FF66", "#9933FF", "#FF33C8",
        "#33C8FF", "#C8FF33", "#FF33FF", "#33FFC8", "#FFC833",
        "#33FF99", "#C833FF", "#FF9999", "#99FF33", "#FFCC33",
        "#33FFCC", "#CCFF33", "#FF3366", "#66FF33", "#3366FF",
        "#FF3366", "#66FF33", "#3366FF", "#FF6666", "#66FF66",
        "#6666FF", "#FFCC66", "#66FFCC", "#CCFF66", "#FF6666",
        "#66FF66", "#6666FF", "#FF9966", "#66FF99", "#9966FF"
      ];

      var data = {
        labels: Object.keys(heatmapData),
        datasets: [
          {
            data: Object.values(heatmapData), // expecting values coming from a percentage calculation
            backgroundColor: colors,
          },
        ],
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    };

    // Create or update the chart when heatmapData changes
    if (heatmapData) createOrUpdateChart();

    // Clean up: destroy the chart when the component is unmounted
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [heatmapData]);

  return (
    <div style={{overflowX: "scroll", width: "100%"}}>
      <div className="chart-container" style={{position: "relative", width:  "1000px"}}>
        <canvas ref={graficoRef} />
      </div>
    </div>
  );
};

export default HeatmapChart;
