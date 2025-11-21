import React, { useEffect, useState } from "react";

interface IssueBackend {
  id: string;
  rule: string;
  severity: string;
  confidence: number;
  bbox?: { x: number; y: number; w: number; h: number };
}

const Issues: React.FC = () => {
  const [scanId, setScanId] = useState("");
  const [issues, setIssues] = useState<IssueBackend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!scanId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000") +
          `/api/v1/scans/${scanId}/issues`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setIssues(data.issues || []);
      if (data.status === "not_ready") {
        setError(
          "Scan results not ready yet. The scan may still be running or may have failed."
        );
      } else if (!data.issues || data.issues.length === 0) {
        setError(
          "No issues found for this scan. The scan may have completed without finding any accessibility violations."
        );
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    /* no auto load */
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Issues</h1>
      <div className="flex items-center space-x-2">
        <input
          value={scanId}
          onChange={(e) => setScanId(e.target.value)}
          placeholder="Scan ID"
          className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        />
        <button
          onClick={load}
          disabled={!scanId || loading}
          className="px-4 py-2 rounded bg-indigo-600 text-white text-sm disabled:opacity-50"
        >
          Load Issues
        </button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="grid gap-3 md:grid-cols-2">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="p-4 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs">{issue.id}</span>
              <span className="px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700">
                {issue.severity}
              </span>
            </div>
            <p className="text-sm mb-1">Rule: {issue.rule}</p>
            <p className="text-xs text-gray-500">
              Confidence: {(issue.confidence * 100).toFixed(1)}%
            </p>
            {issue.bbox && (
              <p className="text-xs mt-1">
                BBox: {issue.bbox.x},{issue.bbox.y} {issue.bbox.w}x
                {issue.bbox.h}
              </p>
            )}
          </div>
        ))}
        {issues.length === 0 && !loading && (
          <div className="text-sm text-gray-500">No issues loaded.</div>
        )}
      </div>
    </div>
  );
};

export default Issues;
