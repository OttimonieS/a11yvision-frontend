import React, { useState } from "react";

const Reports: React.FC = () => {
  const [scanId, setScanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleExport = async (format: "json" | "csv") => {
    if (!scanId) {
      setMessage("Please enter a scan ID");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || "https://api.a11yvision.labnexus.my.id"
        }/api/v1/scans/${scanId}/result`
      );
      const data = await res.json();

      let content: string;
      let filename: string;
      let type: string;

      if (format === "json") {
        content = JSON.stringify(data, null, 2);
        filename = `scan-${scanId}.json`;
        type = "application/json";
      } else {
        // CSV format
        const rows: (string | number)[][] = [
          ["ID", "Rule", "WCAG", "Severity", "Confidence", "Message", "BBox"],
          ...data.issues.map(
            (issue: {
              id: string;
              rule: string;
              wcag: string;
              severity: string;
              confidence: number;
              message: string;
              bbox: number[];
            }) => [
              issue.id,
              issue.rule,
              issue.wcag,
              issue.severity,
              issue.confidence,
              issue.message,
              issue.bbox.join(";"),
            ]
          ),
        ];
        content = rows
          .map((row) => row.map((cell) => `"${cell}"`).join(","))
          .join("\n");
        filename = `scan-${scanId}.csv`;
        type = "text/csv";
      }

      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setMessage(`Exported as ${filename}`);
    } catch (err) {
      console.error(err);
      setMessage("Export failed");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Scan ID</label>
          <input
            type="text"
            value={scanId}
            onChange={(e) => setScanId(e.target.value)}
            placeholder="Enter scan ID"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport("json")}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Export JSON
          </button>
          <button
            onClick={() => handleExport("csv")}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
        {message && <p className="text-sm">{message}</p>}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Available Formats</h2>
        <ul className="text-sm list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
          <li>JSON - Complete scan data with all metadata</li>
          <li>CSV - Issue list for spreadsheet analysis</li>
          <li>PDF - Executive summary (coming soon)</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;
