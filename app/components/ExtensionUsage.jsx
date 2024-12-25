"use client"
import { useEffect, useState } from "react";

export default function ExtensionUsageBar() {
  const [extensionData, setExtensionData] = useState([]);

  useEffect(() => {
    async function fetchExtensionData() {
      try {
        const response = await fetch("/api/file-extension-time");
        const data = await response.json();

        const totalDuration = data.reduce((sum, ext) => sum + ext.duration_seconds, 0);
        const percentages = data.map((ext) => ({
          name: ext.extension,
          percentage: (ext.duration_seconds / totalDuration) * 100,
        }));

        setExtensionData(percentages);
      } catch (error) {
        console.error("Failed to fetch extension usage data", error);
      }
    }

    fetchExtensionData();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Extension Usage</h2>
      <div className="flex w-full h-6 overflow-hidden rounded-md">
        {extensionData.map(({ name, percentage }, index) => (
          <div
            key={index}
            className={`h-full`}
            style={{
              width: `${percentage}%`,
              backgroundColor: `hsl(${index * 50}, 70%, 50%)`,
            }}
            title={`${name}: ${percentage.toFixed(2)}%`}
          ></div>
        ))}
      </div>
    </div>
  );
}
