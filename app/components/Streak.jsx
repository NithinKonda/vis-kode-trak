"use client";
import { useEffect, useState } from "react";

const Streak = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function fetchStreak() {
      try {
        const response = await fetch("/api/file-activity-log");
        const data = await response.json();

        // Extract and sort the dates
        const uniqueDates = [
          ...new Set(
            data.map((item) => new Date(item.date).toISOString().split("T")[0])
          ),
        ].sort((a, b) => new Date(a) - new Date(b));

        // Calculate the streak
        let currentStreak = 1;
        let maxStreak = 1;

        for (let i = 1; i < uniqueDates.length; i++) {
          const currentDate = new Date(uniqueDates[i]);
          const previousDate = new Date(uniqueDates[i - 1]);

          const diff = (currentDate - previousDate) / (1000 * 60 * 60 * 24); // Difference in days

          if (diff === 1) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 1;
          }
        }

        setStreak(maxStreak);
      } catch (error) {
        console.error("Failed to fetch streak data", error);
      }
    }

    fetchStreak();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold">VS Code Usage Streak</h2>
      <p className="text-3xl mt-2">{streak} days</p>
    </div>
  );
};

export default Streak;
