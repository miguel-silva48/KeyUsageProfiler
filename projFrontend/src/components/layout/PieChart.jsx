import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ grafData }) => {
  const graficoRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Function to create or update the chart
    const createOrUpdateChart = () => {
      const ctx = graficoRef.current.getContext('2d');
      
      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create the new chart
      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Gaming', 'Idle', 'Coding'],
          datasets: [
            {
              data: grafData, // expecting values coming from a percentage calculation
              backgroundColor: ['#E9C4C4', '#DEDEDE', '#ECFDF3'],
            },
          ],
        },
      });
    };

    // Create or update the chart when grafData changes
    createOrUpdateChart();

    // Clean up: destroy the chart when the component is unmounted
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [grafData]);

  return <canvas ref={graficoRef} />;
};

export default PieChart;
