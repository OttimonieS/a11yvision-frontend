import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Shield,
  ScanLine,
  Bug,
  Key,
  FileText,
  HelpCircle,
  Settings,
  Home,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/scans", label: "Scans", icon: ScanLine },
  { to: "/issues", label: "Issues", icon: Bug },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/api-keys", label: "API Keys", icon: Key },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help", icon: HelpCircle },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      navigate("/auth");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex-col">
        <div className="p-4 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800">
          <Shield className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold">A11yVision</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={(nav: { isActive: boolean }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    nav.isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 text-xs text-gray-500 dark:text-gray-400">
          v0.1.0 MVP
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-indigo-600" />
                <span className="font-semibold">A11yVision</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={(nav: { isActive: boolean }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                        nav.isActive
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="p-4 text-xs text-gray-500 dark:text-gray-400">
              v0.1.0 MVP
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-gray-950">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open navigation</span>☰
            </button>
            <Link to="/dashboard" className="font-semibold text-sm">
              Overview
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
            {isAuthenticated && user && (
              <span className="hidden xs:inline text-xs text-gray-600 dark:text-gray-300">
                {user.name}
              </span>
            )}
            <button
              onClick={handleAuth}
              className="text-xs px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center space-x-1"
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto px-4 sm:px-6 py-4 sm:py-6 max-w-screen-xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
