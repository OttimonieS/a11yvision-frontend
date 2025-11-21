import React from "react";
import { Shield, Moon, Sun, Zap, Eye, Globe } from "lucide-react";

interface LandingPageProps {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  theme,
  setTheme,
  onStart,
}) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold">A11yVision</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Sign In
            </button>
          </div>
        </header>

        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Real-Time Accessibility Auditing
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            AI-powered accessibility testing that scans your website in
            real-time, identifying WCAG violations and providing actionable
            insights.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Start Testing Now
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Zap className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Real-time Scanning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Instantly detect accessibility issues as you navigate your website
              with our advanced scanning engine.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Eye className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Vision AI Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our computer vision technology identifies visual accessibility
              issues that traditional tools miss.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <Shield className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">WCAG Compliance</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automated detection of WCAG 2.1 and 2.2 violations with detailed
              remediation guidance.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            See It In Action
          </h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <div className="bg-white dark:bg-gray-600 rounded p-4 h-64 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  Interactive demo of the accessibility auditor interface
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
