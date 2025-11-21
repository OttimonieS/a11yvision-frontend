import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Scans from "./pages/Scans";
import ScanDetail from "./pages/ScanDetail";
import Issues from "./pages/Issues";
import Reports from "./pages/Reports";
import ApiKeys from "./pages/ApiKeys";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

const router = createBrowserRouter(
  [
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    { path: "/auth", element: <Auth /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/scans",
      element: (
        <ProtectedRoute>
          <Layout>
            <Scans />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/scans/:scanId",
      element: (
        <ProtectedRoute>
          <Layout>
            <ScanDetail />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/issues",
      element: (
        <ProtectedRoute>
          <Layout>
            <Issues />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/reports",
      element: (
        <ProtectedRoute>
          <Layout>
            <Reports />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/api-keys",
      element: (
        <ProtectedRoute>
          <Layout>
            <ApiKeys />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <Layout>
            <Settings />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/help",
      element: (
        <ProtectedRoute>
          <Layout>
            <Help />
          </Layout>
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
