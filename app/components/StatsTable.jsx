const StatsTable = () => {
  const stats = [
    { name: "Lines Added", value: 1500 },
    { name: "Lines Removed", value: 500 },
    { name: "Words Added", value: 3000 },
  ];

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2">Metric</th>
            <th className="border border-gray-600 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{stat.name}</td>
              <td className="border border-gray-600 px-4 py-2">{stat.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
