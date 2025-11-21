import type { Severity } from "../types/a11y";

export function getSeverityColor(severity: Severity | string): string {
  switch (severity) {
    case "high":
      return "text-red-600 bg-red-100";
    case "medium":
      return "text-yellow-600 bg-yellow-100";
    case "low":
      return "text-blue-600 bg-blue-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
}
