import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Issue {
  id: string;
  rule: string;
  wcag: string;
  severity: string;
  confidence: number;
  message: string;
  bbox?: number[] | { x: number; y: number; w: number; h: number };
}

interface ScanResult {
  scanId: string;
  url: string;
  status?: string;
  scores?: {
    coverage: number;
    accessibilityScore: number;
  };
  issues: Issue[];
  screenshots?: Array<{
    id: string;
    url: string;
    viewport: { width: number; height: number };
  }>;
}

const ScanDetail: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!scanId) return;

    const fetchData = () => {
      fetch(
        (import.meta.env.VITE_API_URL ||
          "https://api.a11yvision.labnexus.my.id") +
          `/api/v1/scans/${scanId}/result`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Scan result data:", data);
          setResult(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch scan:", err);
          setLoading(false);
        });
    };

    fetchData();
    // Auto-refresh every 3 seconds for running/pending scans
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [scanId]);

  if (loading) return <div>Loading scan details...</div>;
  if (!result) return <div>Scan not found</div>;

  // Handle running or pending status
  if (result.status === "running" || result.status === "pending") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Scan Details</h1>
          <Link to="/scans" className="text-blue-600 hover:underline">
            ← Back to Scans
          </Link>
        </div>
        <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <p className="text-blue-800 dark:text-blue-200">
            ⏳ The scan is currently running. This page will auto-refresh every
            3 seconds.
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
            Status: <strong>{result.status}</strong>
          </p>
        </div>
      </div>
    );
  }

  // Handle error status
  if (result.status === "error") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Scan Details</h1>
          <Link to="/scans" className="text-blue-600 hover:underline">
            ← Back to Scans
          </Link>
        </div>
        <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-800 dark:text-red-200 font-semibold">
            ❌ The scan failed with an error.
          </p>
          {result.error && (
            <p className="text-sm text-red-700 dark:text-red-300 mt-2">
              Error: {result.error}
            </p>
          )}
          {(result as any).errorMessage && (
            <p className="text-sm text-red-700 dark:text-red-300 mt-2">
              Details: {(result as any).errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Check if scan is not ready yet
  if (result.status === "not_ready" || !result.issues) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Scan Details</h1>
          <Link to="/scans" className="text-blue-600 hover:underline">
            ← Back to Scans
          </Link>
        </div>
        <div className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <p className="text-yellow-800 dark:text-yellow-200">
            ⚠️ Scan results are not ready yet.
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
            Please check the Scans page to see the current status.
          </p>
        </div>
      </div>
    );
  }

  const screenshotUrl = result.screenshots?.[0]?.url
    ? `https://api.a11yvision.labnexus.my.id/screenshots/${result.screenshots[0].url
        .split("/")
        .pop()}`
    : "";

  const formatBBox = (
    bbox?: number[] | { x: number; y: number; w: number; h: number }
  ): string => {
    if (!bbox) return "N/A";
    if (Array.isArray(bbox)) return bbox.join(", ");
    return `${bbox.x}, ${bbox.y}, ${bbox.w}, ${bbox.h}`;
  };

  // Filter for critical and serious issues only
  const criticalIssues = result.issues.filter(
    (issue) => issue.severity === "critical" || issue.severity === "serious"
  );
  const moderateIssues = result.issues.filter(
    (issue) => issue.severity === "moderate"
  );
  const minorIssues = result.issues.filter(
    (issue) =>
      issue.severity !== "critical" &&
      issue.severity !== "serious" &&
      issue.severity !== "moderate"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Scan Details</h1>
        <Link to="/scans" className="text-blue-600 hover:underline">
          ← Back to Scans
        </Link>
      </div>

      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <p className="text-sm mb-2">
          <strong>URL:</strong> {result.url}
        </p>
        <p className="text-sm mb-2">
          <strong>Coverage:</strong> {result.scores?.coverage ?? "N/A"}%
        </p>
        <p className="text-sm">
          <strong>Accessibility Score:</strong>{" "}
          {result.scores?.accessibilityScore ?? "N/A"}%
        </p>
      </div>

      {/* Issue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
            Critical & Serious
          </p>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            {criticalIssues.length}
          </p>
        </div>
        <div className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">
            Moderate
          </p>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
            {moderateIssues.length}
          </p>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            Minor
          </p>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {minorIssues.length}
          </p>
        </div>
      </div>

      {screenshotUrl && (
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <img src={screenshotUrl} alt="Page screenshot" className="w-full" />
        </div>
      )}

      {/* Critical & Serious Issues */}
      {criticalIssues.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
            🚨 Critical & Serious Issues ({criticalIssues.length})
          </h2>
          <div className="space-y-3">
            {criticalIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        issue.severity === "critical"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                      }`}
                    >
                      {issue.severity}
                    </span>
                    <span className="ml-2 text-sm font-medium">
                      {issue.rule}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{issue.wcag}</span>
                </div>
                <p className="text-sm mb-2">{issue.message}</p>
                <p className="text-xs text-gray-500">
                  Confidence: {issue.confidence}%
                </p>
                <p className="text-xs text-gray-500">
                  BBox: [{formatBBox(issue.bbox)}]
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Issues (Collapsed) */}
      <details className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300">
          📋 All Issues ({result.issues.length}) - Click to expand
        </summary>
        <div className="mt-4">
          {result.issues.length === 0 ? (
            <p className="text-gray-500">No issues found</p>
          ) : (
            <div className="space-y-3">
              {result.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          issue.severity === "critical"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : issue.severity === "serious"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {issue.severity}
                      </span>
                      <span className="ml-2 text-sm font-medium">
                        {issue.rule}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{issue.wcag}</span>
                  </div>
                  <p className="text-sm mb-2">{issue.message}</p>
                  <p className="text-xs text-gray-500">
                    Confidence: {issue.confidence}%
                  </p>
                  <p className="text-xs text-gray-500">
                    BBox: [{formatBBox(issue.bbox)}]
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </details>
    </div>
  );
};

export default ScanDetail;
