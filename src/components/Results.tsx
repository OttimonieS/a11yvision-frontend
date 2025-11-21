import React from "react";
import { X, Download, Sun, Moon } from "lucide-react";
import { getSeverityColor } from "../lib/ui";
import StatusIcon from "./StatusIcon";
import type { AiResults } from "../types/a11y";

interface ResultsProps {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  aiResults: AiResults | null;
  activeTab: "issues" | "contrast" | "elements";
  setActiveTab: (t: "issues" | "contrast" | "elements") => void;
  setCurrentView: (v: "landing" | "workspace" | "results") => void;
}

const Results: React.FC<ResultsProps> = ({
  theme,
  setTheme,
  aiResults,
  activeTab,
  setActiveTab,
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
              onClick={() => setCurrentView("workspace")}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
            >
              <X className="w-5 h-5" />
              <span>Back to Audit</span>
            </button>
            <h1 className="text-xl font-semibold">
              Accessibility Audit Results
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
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
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        <div
          className={`w-80 border-r ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Issues
                  </span>
                  <span className="font-semibold">
                    {aiResults?.issues.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-600">High Priority</span>
                  <span className="font-semibold text-red-600">
                    {aiResults?.issues.filter((i) => i.severity === "high")
                      .length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-600">Medium Priority</span>
                  <span className="font-semibold text-yellow-600">
                    {aiResults?.issues.filter((i) => i.severity === "medium")
                      .length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600">Low Priority</span>
                  <span className="font-semibold text-blue-600">
                    {aiResults?.issues.filter((i) => i.severity === "low")
                      .length || 0}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("issues")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === "issues"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  All Issues ({aiResults?.issues.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("contrast")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === "contrast"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Contrast Checks ({aiResults?.contrast.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("elements")}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === "elements"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Element Labels ({aiResults?.elements.length || 0})
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "issues" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Accessibility Issues
              </h2>
              <div className="space-y-4">
                {aiResults?.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-6 rounded-xl border ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(
                            issue.severity
                          )}`}
                        >
                          {issue.severity.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {issue.rule}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Confidence: {(issue.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{issue.message}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Affected element:{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {issue.element}
                      </code>
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Recommendation</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Increase the contrast ratio to at least 4.5:1 for normal
                        text or 3:1 for large text. Consider using darker text
                        colors or lighter background colors to achieve the
                        required contrast.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contrast" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contrast Analysis</h2>
              <div className="grid gap-4">
                {aiResults?.contrast.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.element}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Current: {item.ratio}:1 | Required: {item.required}:1
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon status={item.status} />
                        <span
                          className={`capitalize ${
                            item.status === "pass"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "elements" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Element Analysis</h2>
              <div className="grid gap-4">
                {aiResults?.elements.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.element}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Type: {item.type}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon status={item.status} />
                        <span
                          className={`capitalize ${
                            item.status === "pass"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
