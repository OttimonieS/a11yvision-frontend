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
    fetch(
      (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000") +
        `/api/v1/scans/${scanId}/result`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [scanId]);

  if (loading) return <div>Loading scan details...</div>;
  if (!result) return <div>Scan not found</div>;

  // Check if scan is not ready yet
  if (result.status === "not_ready") {
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
            ⚠️ Scan results are not ready yet. The scan may still be running or
            may have encountered an error.
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
            Please check the Scans page to see the current status.
          </p>
        </div>
      </div>
    );
  }

  const screenshotUrl = result.screenshots?.[0]?.url
    ? `http://localhost:8000/screenshots/${result.screenshots[0].url
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

      {screenshotUrl && (
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <img src={screenshotUrl} alt="Page screenshot" className="w-full" />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Issues ({result.issues.length})
        </h2>
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
    </div>
  );
};

export default ScanDetail;
