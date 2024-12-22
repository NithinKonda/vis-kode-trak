"use client"
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function UsageLog() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/usage-log");
        const data = await response.json();

        const labels = data.map(item => item.date);
        const durations = data.map(item => item.totalDuration);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daily Usage Duration</h1>
      <Bar data={chartData} />
    </div>
  );
}
