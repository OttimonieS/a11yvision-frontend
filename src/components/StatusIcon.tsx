// import React from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function StatusIcon({ status }: { status: "pass" | "fail" }) {
  if (status === "pass") {
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  }
  return <AlertTriangle className="w-4 h-4 text-red-500" />;
}
