"use client"
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function FileActivityLog() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/file-activity-log");
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Lines Added",
        data: data.map((item) => item.linesAdded),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Lines Deleted",
        data: data.map((item) => item.linesDeleted),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">File Activity Log</h1>
      <Bar data={chartData} />
    </div>
  );
}
