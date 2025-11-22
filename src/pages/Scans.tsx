import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { startScan } from "../lib/api";

interface ScanListItem {
  scanId: string;
  url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  issuesCount: number;
}

const Scans: React.FC = () => {
  const [items, setItems] = useState<ScanListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_URL ||
          "https://api.a11yvision.labnexus.my.id") + "/api/v1/scans"
      );
      const data = await res.json();
      setItems(data.items || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    refresh();
    // Auto-refresh every 5 seconds to update scan statuses
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, []);

  async function handleNewScan() {
    if (!newUrl) return;
    setLoading(true);
    setError(null);
    try {
      await startScan(newUrl);
      setNewUrl("");
      setTimeout(refresh, 500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Scans</h1>
        <span className="text-xs text-gray-500">Auto-refreshes every 5s</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://example.com"
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm w-full sm:flex-1"
        />
        <button
          onClick={handleNewScan}
          disabled={loading}
          className="px-4 py-2 rounded bg-indigo-600 text-white text-sm disabled:opacity-50 w-full sm:w-auto"
        >
          Start Scan
        </button>
        <button
          onClick={refresh}
          className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 text-sm w-full sm:w-auto"
        >
          Refresh
        </button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="overflow-x-auto rounded border border-gray-200 dark:border-gray-800">
        <table className="min-w-[720px] w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-800">
              <th className="py-2 pr-4">Scan ID</th>
              <th className="py-2 pr-4">URL</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Issues</th>
              <th className="py-2 pr-4">Created</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr
                key={it.scanId}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="py-2 pr-4 font-mono text-xs">
                  <Link
                    to={`/scans/${it.scanId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {it.scanId.slice(0, 8)}...
                  </Link>
                </td>
                <td className="py-2 pr-4 truncate max-w-[180px]" title={it.url}>
                  {it.url}
                </td>
                <td className="py-2 pr-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      it.status === "done"
                        ? "bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : it.status === "running"
                        ? "bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        : it.status === "error"
                        ? "bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {it.status}
                  </span>
                </td>
                <td className="py-2 pr-4">{it.issuesCount}</td>
                <td className="py-2 pr-4">
                  {new Date(it.createdAt).toLocaleString()}
                </td>
                <td className="py-2 pr-4">
                  <Link
                    to={`/scans/${it.scanId}`}
                    className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-indigo-600 text-white text-xs hover:bg-indigo-700"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Details</span>
                  </Link>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No scans yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scans;
