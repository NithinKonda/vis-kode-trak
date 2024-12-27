import Dashboard from "./components/Dashboard";

import StatsTable from "./components/StatsTable";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-6">
        <p className="text-center text-gray-400 mb-4">
          The data is being fetched from the
          <a
            href="https://marketplace.visualstudio.com/manage/publishers/nithinkonda/extensions/kode-trak/hub?_a=acquisition"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-1"
          >
            VS Code extension
          </a>
          .
        </p>
        <Dashboard />
        <h1 className="text-3xl font-bold mb-6">Dashboard Stats</h1>
        <StatsTable />
      </main>
    </div>
  );
};
export default HomePage;
