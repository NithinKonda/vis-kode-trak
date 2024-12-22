"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function UsageLog() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/usage-log");
      const data = await response.json();

      // Aggregate durations by date
      const aggregatedData = data.reduce((acc, item) => {
        acc[item.date] = (acc[item.date] || 0) + item.duration_seconds;
        return acc;
      }, {});

      // Prepare data for the chart
      const labels = Object.keys(aggregatedData);
      const durations = Object.values(aggregatedData);

      setChartData({
        labels,
        datasets: [
          {
            label: "Total Duration (seconds)",
            data: durations,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    }

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daily Usage Duration</h1>
      <Bar data={chartData} />
    </div>
  );
}
