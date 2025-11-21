const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface StartScanResponse {
  scanId: string;
  status: string;
  estimatedEtaSeconds?: number;
}

export interface BackendIssueBbox {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface BackendIssue {
  id: string;
  rule: string;
  wcag?: string[];
  severity: string;
  confidence: number;
  bbox?: BackendIssueBbox;
}
export interface ScanResultInternal {
  url: string;
  issues: BackendIssue[];
  screenshotPath?: string;
}
export interface ResultSummary {
  coverage: number;
  issuesCount: number;
  critical: number;
  major: number;
  minor: number;
}
export interface ScanStatusResponse {
  scanId: string;
  status: string;
  result?: ScanResultInternal;
  resultSummary?: ResultSummary;
  progress?: Record<string, string>;
  error?: string;
}

export interface ScanResultScreenshot {
  id: string;
  url: string;
  viewport: { width: number; height: number };
}
export interface ScanResultResponse {
  scanId: string;
  url: string;
  scores: { coverage: number; accessibilityScore: number };
  issues: BackendIssue[];
  screenshots: ScanResultScreenshot[];
}

export async function startScan(url: string): Promise<StartScanResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/scans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error(`Failed to start scan: ${res.status}`);
  return res.json();
}

export async function getScanStatus(
  scanId: string
): Promise<ScanStatusResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/scans/${scanId}`);
  if (!res.ok) throw new Error(`Failed to get scan status: ${res.status}`);
  return res.json();
}

export async function getScanResult(
  scanId: string
): Promise<ScanResultResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/scans/${scanId}/result`);
  if (!res.ok) throw new Error(`Failed to get scan result: ${res.status}`);
  return res.json();
}

// Utility to convert backend issues to frontend AiResults shape
export interface MappedIssue {
  id: string | number;
  severity: "high" | "medium" | "low";
  rule: string;
  element: string;
  message: string;
  confidence: number;
}
export interface MappedResults {
  issues: MappedIssue[];
  contrast: never[];
  elements: never[];
}
export function mapIssuesToAiResults(issues: BackendIssue[]): MappedResults {
  const sevMap: Record<string, "high" | "medium" | "low"> = {
    critical: "high",
    major: "high",
    minor: "low",
    warning: "medium",
    low: "low",
  };
  const mapped: MappedIssue[] = issues.map((i) => {
    const sev = sevMap[i.severity] || "medium";
    const bbox = i.bbox ? `bbox(${i.bbox.x},${i.bbox.y})` : "element";
    return {
      id: i.id,
      severity: sev,
      rule: i.rule || "unknown-rule",
      element: bbox,
      message: `Detected potential ${i.rule} issue`,
      confidence: i.confidence ?? 0.5,
    };
  });
  return { issues: mapped, contrast: [], elements: [] };
}
