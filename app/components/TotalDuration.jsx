"use client"
import { useEffect, useState } from "react";

export default function TotalDuration() {
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    async function fetchTotalDuration() {
      try {
        const response = await fetch("/api/usage-log");
        const data = await response.json();


        const total = data.reduce((sum, log) => sum + log.totalDuration, 0);
        setTotalDuration(total);
      } catch (error) {
        console.error("Failed to fetch total duration data", error);
      }
    }

    fetchTotalDuration();
  }, []);

  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0h 0m";
    const totalMinutes = Math.floor(seconds / 60); 
    const hours = Math.floor(totalMinutes / 60); 
    const minutes = totalMinutes % 60; 
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold">Total Duration Spent</h2>
      <p className="text-3xl mt-2">{formatDuration(totalDuration)}</p>
    </div>
  );
}
