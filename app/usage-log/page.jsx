"use client";
import { useEffect, useState } from "react";

export default function UsageLog() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/usage-log");
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usage Log</h1>
      <table className="table-auto w-full border-collapse border border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-700 px-4 py-2">Date</th>
            <th className="border border-gray-700 px-4 py-2">Start Time</th>
            <th className="border border-gray-700 px-4 py-2">End Time</th>
            <th className="border border-gray-700 px-4 py-2">Duration (s)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-700 px-4 py-2">{item.date}</td>
              <td className="border border-gray-700 px-4 py-2">{item.start_time}</td>
              <td className="border border-gray-700 px-4 py-2">{item.end_time}</td>
              <td className="border border-gray-700 px-4 py-2">{item.duration_seconds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
