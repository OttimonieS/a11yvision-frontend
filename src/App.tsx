import React, { useState, useEffect, useRef } from "react";
import LandingPage from "./components/LandingPage";
import Workspace from "./components/Workspace";
import Results from "./components/Results";
import { type AiResults } from "./types/a11y";
import {
  startScan,
  getScanStatus,
  getScanResult,
  mapIssuesToAiResults,
  type ScanStatusResponse,
} from "./lib/api";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "landing" | "workspace" | "results"
  >("landing");
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageStatus, setPageStatus] = useState<
    | "awaiting-input"
    | "loading"
    | "loaded"
    | "capturing"
    | "captured"
    | "analyzing"
    | "analyzed"
    | "error"
  >("awaiting-input");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<AiResults | null>(null);
  const [showHighlights, setShowHighlights] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<
    Array<{ id: number; url: string; timestamp: string; status: string }>
  >([]);
  const [iframeZoom, setIframeZoom] = useState<number>(100);
  const [iframeWidth] = useState<number>(1200);
  const [activeTab, setActiveTab] = useState<
    "issues" | "contrast" | "elements"
  >("issues");
  const [scanId, setScanId] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadWebsite = async () => {
    if (!url || isLoading) return;
    try {
      setIsLoading(true);
      setPageStatus("loading");
      setErrorMsg(null);
      const res = await startScan(url);
      setScanId(res.scanId);
      addToHistory(url);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErrorMsg(msg || "Failed to start scan");
      setPageStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const captureScreenshot = () => {
    /* screenshot now comes from backend result */
  };

  const runAIAnalysis = async () => {
    if (!scanId) return;
    try {
      const result = await getScanResult(scanId);
      const mapped = mapIssuesToAiResults(result.issues);
      setAiResults(mapped);
      // build accessible screenshot URL if available
      if (result.screenshots && result.screenshots.length) {
        const localPath = result.screenshots[0].url;
        const fileName = localPath.split(/\\|\//).pop();
        setScreenshot(
          `${
            import.meta.env.VITE_API_URL || "https://api.a11yvision.labnexus.my.id"
          }/screenshots/${fileName}`
        );
      }
      setPageStatus("analyzed");
      setCurrentView("results");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErrorMsg(msg || "Failed to fetch result");
      setPageStatus("error");
    }
  };

  // Poll scan status when scanId exists and not done
  useEffect(() => {
    if (!scanId) return;
    if (pageStatus === "analyzed" || pageStatus === "error") return;
    const poll = async () => {
      try {
        const status: ScanStatusResponse = await getScanStatus(scanId);
        if (status.status === "running") {
          setPageStatus("analyzing");
        }
        if (status.status === "done" && status.result) {
          const mapped = mapIssuesToAiResults(status.result.issues || []);
          setAiResults(mapped);
          if (status.result.screenshotPath) {
            const fileName = status.result.screenshotPath.split(/\\|\//).pop();
            setScreenshot(
              `${
                import.meta.env.VITE_API_URL || "https://api.a11yvision.labnexus.my.id"
              }/screenshots/${fileName}`
            );
          }
          setPageStatus("analyzed");
          if (pollRef.current) window.clearInterval(pollRef.current);
        } else if (status.status === "error") {
          setErrorMsg(status.error || "Scan failed");
          setPageStatus("error");
          if (pollRef.current) window.clearInterval(pollRef.current);
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setErrorMsg(msg || "Polling error");
        setPageStatus("error");
        if (pollRef.current) window.clearInterval(pollRef.current);
      }
    };
    poll();
    pollRef.current = window.setInterval(poll, 1500);
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [scanId, pageStatus]);

  const addToHistory = (href: string) => {
    const newEntry = {
      id: Date.now(),
      url: href,
      timestamp: new Date().toLocaleString(),
      status: "started",
    };
    setHistory((prev) => [newEntry, ...prev.slice(0, 9)]);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {currentView === "landing" && (
        <LandingPage
          theme={theme}
          setTheme={setTheme}
          onStart={() => setCurrentView("workspace")}
        />
      )}
      {currentView === "workspace" && (
        <Workspace
          theme={theme}
          setTheme={setTheme}
          url={url}
          setUrl={setUrl}
          isLoading={isLoading}
          pageStatus={pageStatus}
          screenshot={screenshot}
          aiResults={aiResults}
          showHighlights={showHighlights}
          setShowHighlights={setShowHighlights}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          history={history}
          iframeZoom={iframeZoom}
          setIframeZoom={setIframeZoom}
          iframeWidth={iframeWidth}
          loadWebsite={loadWebsite}
          captureScreenshot={captureScreenshot}
          runAIAnalysis={runAIAnalysis}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === "results" && (
        <Results
          theme={theme}
          setTheme={setTheme}
          aiResults={aiResults}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentView={setCurrentView}
        />
      )}
      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default App;
