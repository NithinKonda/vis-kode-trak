"use client";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FileExtensionTime() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/file-extension-time");
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  const filteredData = data.filter((item) => item.extension !== "git");

  const chartData = {
    labels: filteredData.map((item) => item.extension),
    datasets: [
      {
        data: filteredData.map((item) => item.total_duration_seconds),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">File Extension Time</h1>
      <Pie data={chartData} />
    </div>
  );
}
