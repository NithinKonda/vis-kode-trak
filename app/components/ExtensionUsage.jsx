"use client"
import { useEffect, useState } from "react";

export default function ExtensionUsageChart() {
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    async function fetchExtensionUsage() {
      try {
        const response = await fetch("/api/file-extension-time");
        const data = await response.json();

        const filteredData = data
          .filter((ext) => ext.extension !== "git")
          .sort((a, b) => b.total_duration_seconds - a.total_duration_seconds)
          .slice(0, 6);

        const totalDuration = filteredData.reduce(
          (sum, ext) => sum + ext.total_duration_seconds,
          0
        );

        const uniqueColors = getUniqueColors(filteredData.length);

        const formattedExtensions = filteredData.map((ext, index) => ({
          name: ext.extension,
          percentage: totalDuration
            ? ((ext.total_duration_seconds / totalDuration) * 100).toFixed(2)
            : 0,
          color: uniqueColors[index], // Assign unique color
        }));

        setExtensions(formattedExtensions);
      } catch (error) {
        console.error("Failed to fetch extension usage data", error);
      }
    }

    fetchExtensionUsage();
  }, []);

  function getUniqueColors(count) {
    const colors = [
      "#F59E0B", // Amber
      "#3B82F6", // Blue
      "#EF4444", // Red
      "#10B981", // Green
      "#8B5CF6", // Purple
      "#F472B6", // Pink
      "#34D399", // Teal
      "#FB923C", // Orange
    ];

    return colors.slice(0, count); // Ensure no duplicate colors
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Extension Usage</h2>
      <div className="relative h-2 bg-gray-700 rounded-full mb-6">
        <div className="flex h-full rounded-full overflow-hidden">
          {extensions.map((ext) => (
            <div
              key={ext.name}
              style={{
                width: `${ext.percentage}%`,
                backgroundColor: ext.color,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {extensions.slice(0, 3).map((ext) => (
            <div key={ext.name} className="flex items-center space-x-2">
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: ext.color }}
              ></span>
              <span>
                {ext.name}: {ext.percentage}%
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {extensions.slice(3).map((ext) => (
            <div key={ext.name} className="flex items-center space-x-2">
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: ext.color }}
              ></span>
              <span>
                {ext.name}: {ext.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
