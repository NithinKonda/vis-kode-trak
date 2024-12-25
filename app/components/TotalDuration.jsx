import { useEffect, useState } from "react";

export default function TotalDuration() {
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    async function fetchTotalDuration() {
      try {
        const response = await fetch("/api/usage-log");
        const data = await response.json();

        const total = data.reduce((sum, log) => sum + log.duration_seconds, 0);
        setTotalDuration(total);
      } catch (error) {
        console.error("Failed to fetch total duration data", error);
      }
    }

    fetchTotalDuration();
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold">Total Duration Spent</h2>
      <p className="text-3xl mt-2">{formatDuration(totalDuration)}</p>
    </div>
  );
}
