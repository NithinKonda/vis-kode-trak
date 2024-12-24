"use client";
import { useEffect, useState } from "react";

export default function StatsTable() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/file-activity-log");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-700">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2 border border-gray-600">Date</th>
            <th className="px-4 py-2 border border-gray-600">Lines Added</th>
            <th className="px-4 py-2 border border-gray-600">Lines Deleted</th>
            <th className="px-4 py-2 border border-gray-600">Words Added</th>
            <th className="px-4 py-2 border border-gray-600">Words Deleted</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 text-white">
          {stats.map(
            ({
              _id,
              date,
              linesAdded,
              linesDeleted,
              wordsAdded,
              wordsDeleted,
            }) => (
              <tr key={_id}>
                <td className="px-4 py-2 border border-gray-600">{date}</td>
                <td className="px-4 py-2 border border-gray-600">
                  {linesAdded}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {linesDeleted}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {wordsAdded}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {wordsDeleted}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
