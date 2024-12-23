import Navbar from "./components/Navbar";
import StatsTable from "./components/StatsTable";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Stats</h1>
        <StatsTable />
      </main>
    </div>
  );
}
