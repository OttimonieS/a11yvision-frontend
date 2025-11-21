import React from "react";
import {
  Shield,
  Play,
  Camera,
  Zap,
  History as HistoryIcon,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { getSeverityColor } from "../lib/ui";
import type { AiResults } from "../types/a11y";

interface HistoryEntry {
  id: number;
  url: string;
  timestamp: string;
  status: string;
}

interface WorkspaceProps {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  url: string;
  setUrl: (v: string) => void;
  isLoading: boolean;
  pageStatus:
    | "awaiting-input"
    | "loading"
    | "loaded"
    | "capturing"
    | "captured"
    | "analyzing"
    | "analyzed"
    | "error";
  screenshot: string | null;
  aiResults: AiResults | null;
  showHighlights: boolean;
  setShowHighlights: (v: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  history: HistoryEntry[];
  iframeZoom: number;
  setIframeZoom: (v: number) => void;
  iframeWidth: number;
  loadWebsite: () => void;
  captureScreenshot: () => void;
  runAIAnalysis: () => void;
  setCurrentView: (v: "landing" | "workspace" | "results") => void;
}

const Workspace: React.FC<WorkspaceProps> = ({
  theme,
  setTheme,
  url,
  setUrl,
  isLoading,
  pageStatus,
  screenshot,
  aiResults,
  showHighlights,
  setShowHighlights,
  sidebarOpen,
  setSidebarOpen,
  history,
  iframeZoom,
  setIframeZoom,
  iframeWidth,
  loadWebsite,
  captureScreenshot,
  runAIAnalysis,
  setCurrentView,
}) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`p-4 border-b ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView("landing")}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
            >
              <Shield className="w-6 h-6" />
              <span className="font-semibold">A11yVision</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  pageStatus === "awaiting-input"
                    ? "bg-gray-200 text-gray-700"
                    : pageStatus === "loading"
                    ? "bg-blue-200 text-blue-700"
                    : pageStatus === "loaded"
                    ? "bg-green-200 text-green-700"
                    : pageStatus === "captured"
                    ? "bg-purple-200 text-purple-700"
                    : pageStatus === "error"
                    ? "bg-red-200 text-red-700"
                    : "bg-orange-200 text-orange-700"
                }`}
              >
                {pageStatus.replace("-", " ").toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <HistoryIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL to audit..."
            className={`flex-1 px-4 py-2 border rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          />
          <button
            onClick={loadWebsite}
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Load Site</span>
          </button>
          <button
            onClick={captureScreenshot}
            disabled={pageStatus !== "loaded"}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Camera className="w-4 h-4" />
            <span>Capture</span>
          </button>
          <button
            onClick={runAIAnalysis}
            disabled={!screenshot}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Analyze</span>
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {sidebarOpen && (
          <div
            className={`w-80 border-r ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-4">
              <h3 className="font-semibold mb-4">Audit History</h3>
              <div className="space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="font-medium text-sm truncate">
                      {item.url}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Preview: {url || "No site loaded"}
                </span>
                <div className="flex items-center space-x-2">
                  <label className="text-sm">Zoom:</label>
                  <select
                    value={iframeZoom}
                    onChange={(e) => setIframeZoom(Number(e.target.value))}
                    className={`text-sm px-2 py-1 rounded border ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value={50}>50%</option>
                    <option value={75}>75%</option>
                    <option value={100}>100%</option>
                    <option value={125}>125%</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowHighlights(!showHighlights)}
                  className={`px-3 py-1 rounded text-sm ${
                    showHighlights
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                >
                  Show Highlights
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <div
                className="mx-auto border border-gray-300 dark:border-gray-600 rounded"
                style={{
                  width: `${iframeWidth}px`,
                  transform: `scale(${iframeZoom / 100})`,
                  transformOrigin: "top left",
                }}
              >
                {pageStatus === "awaiting-input" || pageStatus === "loading" ? (
                  <div className="w-full h-96 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    {isLoading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                        <p>Loading website...</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Enter a URL to begin auditing</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Website preview would appear here
                      </p>
                      {screenshot && (
                        <img
                          src={screenshot}
                          alt="Captured screenshot"
                          className="mt-4 max-w-full h-auto rounded"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {aiResults && (
          <div
            className={`w-96 border-l ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">AI Analysis Results</h3>
                <button
                  onClick={() => setCurrentView("results")}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                  View Full Report
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Priority</span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {
                      aiResults.issues.filter((i) => i.severity === "high")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medium Priority</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    {
                      aiResults.issues.filter((i) => i.severity === "medium")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Low Priority</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {
                      aiResults.issues.filter((i) => i.severity === "low")
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              <h4 className="font-medium mb-2">Top Issues</h4>
              <div className="space-y-2">
                {aiResults.issues.slice(0, 5).map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-3 rounded-lg border ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className={`px-2 py-1 rounded text-xs ${getSeverityColor(
                              issue.severity
                            )}`}
                          >
                            {issue.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {issue.rule}
                          </span>
                        </div>
                        <p className="text-sm">{issue.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
