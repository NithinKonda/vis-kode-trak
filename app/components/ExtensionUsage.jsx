"use client"
import { useEffect, useState } from "react";

export default function ExtensionUsage() {
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    async function fetchExtensionUsage() {
      try {
        const response = await fetch("/api/file-extension-time");
        const data = await response.json();
        const filteredData = data.filter((ext) => ext.extension !== "git");

        const totalDuration = filteredData.reduce(
          (sum, ext) => sum + ext.total_duration_seconds,
          0
        );

        const formattedExtensions = filteredData
          .map((ext) => ({
            name: ext.extension,
            percentage: totalDuration
              ? ((ext.total_duration_seconds / totalDuration) * 100).toFixed(2)
              : 0,
          }))
          .sort((a, b) => b.percentage - a.percentage);

        setExtensions(formattedExtensions);
      } catch (error) {
        console.error("Failed to fetch extension usage data", error);
      }
    }

    fetchExtensionUsage();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Extension Usage</h2>
      <ul className="space-y-2">
        {extensions.map((ext) => (
          <li
            key={ext.name}
            className="flex justify-between border-b border-gray-600 py-2"
          >
            <span>{ext.name}</span>
            <span>{ext.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
