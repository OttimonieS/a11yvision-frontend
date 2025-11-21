import React, { useEffect, useState } from "react";

interface Stats {
  totalScans: number;
  completedScans: number;
  totalIssues: number;
  criticalIssues: number;
  minorIssues: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(
      (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000") +
        "/api/v1/stats"
    )
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <h2 className="text-sm font-medium mb-2">Recent Scans</h2>
          <p className="text-2xl font-bold">{stats?.totalScans ?? 0}</p>
          <p className="text-xs text-gray-500">
            {stats?.completedScans ?? 0} completed
          </p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <h2 className="text-sm font-medium mb-2">Issue Breakdown</h2>
          <p className="text-2xl font-bold">{stats?.totalIssues ?? 0}</p>
          <p className="text-xs text-gray-500">
            {stats?.criticalIssues ?? 0} critical, {stats?.minorIssues ?? 0}{" "}
            minor
          </p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <h2 className="text-sm font-medium mb-2">Performance</h2>
          <p className="text-xs text-gray-500">
            Average scan duration & throughput.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
