import StreakComponent from "./components/StreakComponent";
import TotalDuration from "./components/TotalDuration";
import ExtensionUsageBar from "./components/ExtensionUsageBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">VS Code Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StreakComponent />
        <TotalDuration />
      </div>
      <div className="mt-8">
        <ExtensionUsageBar />
      </div>
    </div>
  );
}
