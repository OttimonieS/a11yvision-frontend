export type Severity = "high" | "medium" | "low";

export interface Issue {
  id: number | string;
  severity: Severity;
  rule: string;
  element: string;
  message: string;
  confidence: number;
  selector?: string;
}

export interface ContrastItem {
  element: string;
  ratio: number;
  required: number;
  status: "pass" | "fail";
}

export interface ElementItem {
  element: string;
  type: string;
  status: "pass" | "fail";
}

export interface AiResults {
  issues: Issue[];
  contrast: ContrastItem[];
  elements: ElementItem[];
}
