import React from "react";
import { Shield } from "lucide-react";

const Help: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center space-x-3">
        <Shield className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold">Help & Documentation</h1>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          What is VisionAI Accessibility Auditor?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          VisionAI is a real-time accessibility auditing platform that uses
          AI-powered computer vision to scan websites for WCAG (Web Content
          Accessibility Guidelines) compliance. It automatically detects
          accessibility issues like poor color contrast, small text, missing alt
          attributes, and layout problems that traditional tools might miss.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          The platform renders your website in a headless browser, captures
          screenshots, and uses advanced image analysis to identify
          accessibility violations with confidence scores and precise locations.
        </p>
      </section>

      {/* Dashboard */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">📊 Dashboard</h2>
        <p className="text-gray-700 dark:text-gray-300">
          The Dashboard provides a real-time overview of your accessibility
          auditing activity:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Total Scans:</strong> The total number of accessibility
            audits you've run
          </li>
          <li>
            <strong>Completed Scans:</strong> How many scans have finished
            processing
          </li>
          <li>
            <strong>Total Issues:</strong> Aggregate count of all accessibility
            violations found
          </li>
          <li>
            <strong>Critical Issues:</strong> High-severity problems that
            significantly impact accessibility
          </li>
          <li>
            <strong>Minor Issues:</strong> Lower-priority issues that should be
            addressed for optimal accessibility
          </li>
        </ul>
      </section>

      {/* Scans */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">🔍 Scans</h2>
        <p className="text-gray-700 dark:text-gray-300">
          The Scans page is where you create and manage accessibility audits for
          websites.
        </p>

        <h3 className="text-xl font-semibold mt-4">How to Start a Scan:</h3>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Enter any publicly accessible URL (e.g., https://example.com)</li>
          <li>Click "Start Scan" button</li>
          <li>
            The system will render the page, capture a screenshot, and analyze
            it for issues
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-4">What You Can Scan:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Any public website or web application</li>
          <li>Landing pages, dashboards, forms, e-commerce sites</li>
          <li>Both static and dynamic content (JavaScript apps supported)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">
          Understanding Scan Results:
        </h3>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-3">
          <div>
            <strong className="text-indigo-600">Scan ID:</strong>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              A unique identifier for each scan. Click it to view detailed
              results including screenshots and full issue breakdown.
            </p>
          </div>
          <div>
            <strong className="text-indigo-600">Status:</strong>
            <ul className="text-sm text-gray-700 dark:text-gray-300 ml-4 mt-1 space-y-1">
              <li>
                <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                  queued
                </code>{" "}
                - Scan is waiting to start
              </li>
              <li>
                <code className="bg-blue-200 dark:bg-blue-900 px-2 py-1 rounded">
                  running
                </code>{" "}
                - Currently rendering and analyzing the page
              </li>
              <li>
                <code className="bg-green-200 dark:bg-green-900 px-2 py-1 rounded">
                  done
                </code>{" "}
                - Scan completed successfully, results available
              </li>
              <li>
                <code className="bg-red-200 dark:bg-red-900 px-2 py-1 rounded">
                  error
                </code>{" "}
                - Scan failed (URL unreachable, timeout, or rendering error)
              </li>
            </ul>
          </div>
          <div>
            <strong className="text-indigo-600">Issues:</strong>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Total count of accessibility violations detected in the scan.
            </p>
          </div>
          <div>
            <strong className="text-indigo-600">Created:</strong>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Timestamp when the scan was initiated.
            </p>
          </div>
        </div>
      </section>

      {/* Issues */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">🐛 Issues</h2>
        <p className="text-gray-700 dark:text-gray-300">
          The Issues page allows you to browse accessibility violations for a
          specific scan.
        </p>
        <h3 className="text-xl font-semibold mt-4">How to Use:</h3>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Copy a Scan ID from the Scans page (or click a scan to see its
            detail page)
          </li>
          <li>Paste the Scan ID into the input field</li>
          <li>Click "Load Issues"</li>
          <li>
            View all detected violations with severity badges, WCAG references,
            confidence scores, and bounding box coordinates
          </li>
        </ol>
      </section>

      {/* Settings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">⚙️ Settings</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Customize how VisionAI analyzes your websites for accessibility
          compliance.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Contrast Threshold</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Sets the minimum color contrast ratio required between text and
              background colors:
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 ml-4 space-y-1">
              <li>
                <strong>WCAG AA (Default):</strong> Requires 4.5:1 ratio for
                normal text, 3:1 for large text. This is the standard level most
                websites should meet.
              </li>
              <li>
                <strong>WCAG AAA:</strong> Stricter requirement of 7:1 for
                normal text, 4.5:1 for large text. Provides enhanced contrast
                for users with low vision.
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              💡 Higher ratios mean better readability but may flag more issues.
              AA is recommended for most use cases.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Enable Hit Target Size Detection
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              When enabled, the scanner checks if interactive elements (buttons,
              links) are large enough to be easily tapped on touch devices. WCAG
              recommends minimum 44x44 pixel touch targets.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              💡 Essential for mobile accessibility. Disable only if you're
              auditing desktop-only applications.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Automatic Rescan Cadence
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Schedule how often VisionAI automatically re-scans your saved
              URLs:
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 ml-4 space-y-1">
              <li>
                <strong>Manual:</strong> Only scan when you manually trigger it
              </li>
              <li>
                <strong>Daily:</strong> Automatically rescan once per day to
                catch new issues from code changes
              </li>
              <li>
                <strong>Weekly:</strong> Scan once per week for regular
                monitoring
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              💡 Use Daily for active development, Weekly for production
              monitoring, Manual for one-time audits.
            </p>
          </div>
        </div>
      </section>

      {/* API Keys */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">🔑 API Keys</h2>
        <p className="text-gray-700 dark:text-gray-300">
          API Keys allow you to integrate VisionAI accessibility scanning into
          your own applications, CI/CD pipelines, or automated workflows.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          What You Can Do with API Keys:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Automated Testing:</strong> Scan URLs programmatically
            during deployments
          </li>
          <li>
            <strong>CI/CD Integration:</strong> Block deployments if
            accessibility issues are detected
          </li>
          <li>
            <strong>Batch Processing:</strong> Scan multiple pages at once via
            scripts
          </li>
          <li>
            <strong>Custom Dashboards:</strong> Build your own monitoring tools
            using our API
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">How to Use API Keys:</h3>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Click "Create API Key" and give it a descriptive label (e.g.,
            "Production CI", "Development Testing")
          </li>
          <li>Copy the generated key immediately - it's only shown once!</li>
          <li>Use the key in the Authorization header of your HTTP requests</li>
        </ol>

        <h3 className="text-xl font-semibold mt-4">Example API Usage:</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="mb-4">
            <div className="text-gray-400"># Start a new scan</div>
            <div>curl -X POST http://localhost:8000/api/v1/scans \</div>
            <div className="ml-4">
              -H "Authorization: Bearer YOUR_API_KEY" \
            </div>
            <div className="ml-4">-H "Content-Type: application/json" \</div>
            <div className="ml-4">
              -d '{"{"}"url": "https://example.com"{"}"}'
            </div>
          </div>
          <div className="mb-4">
            <div className="text-gray-400"># Get scan results</div>
            <div>curl http://localhost:8000/api/v1/scans/SCAN_ID/result \</div>
            <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>
          </div>
          <div>
            <div className="text-gray-400"># List all scans</div>
            <div>curl http://localhost:8000/api/v1/scans \</div>
            <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg mt-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Security Note:</strong> Keep your API keys secret! Never
            commit them to version control. Revoke any keys that may have been
            exposed and create new ones.
          </p>
        </div>
      </section>

      {/* Reports */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">📄 Reports</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Export scan results in various formats for documentation, compliance
          tracking, or sharing with your team.
        </p>

        <h3 className="text-xl font-semibold mt-4">
          Available Export Formats:
        </h3>
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📦 JSON Export</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Complete machine-readable export including all metadata, scores,
              issues, and bounding boxes. Perfect for:
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 ml-4 mt-2 space-y-1">
              <li>• Importing into other tools or databases</li>
              <li>• Creating custom visualizations</li>
              <li>• Automated processing pipelines</li>
              <li>• Long-term archival of scan results</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📊 CSV Export</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Spreadsheet-friendly format with one row per issue. Includes issue
              ID, rule name, WCAG reference, severity, confidence score, and
              message. Ideal for:
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 ml-4 mt-2 space-y-1">
              <li>
                • Opening in Excel, Google Sheets, or other spreadsheet tools
              </li>
              <li>• Tracking remediation progress</li>
              <li>• Creating pivot tables and charts</li>
              <li>• Sharing with non-technical stakeholders</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📑 PDF Export (Coming Soon)</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Executive summary with screenshots, issue counts, and compliance
              status. Perfect for compliance documentation and stakeholder
              reports.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-4">How to Export:</h3>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Navigate to the Reports page</li>
          <li>Enter the Scan ID of the scan you want to export</li>
          <li>Click either "Export JSON" or "Export CSV"</li>
          <li>The file will download automatically to your device</li>
        </ol>
      </section>

      {/* Tips & Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          💡 Tips & Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Run scans during development to catch issues early before they reach
            production
          </li>
          <li>
            Use WCAG AA as your baseline, upgrade to AAA for critical or
            government websites
          </li>
          <li>
            Review critical severity issues first - they have the biggest impact
            on users
          </li>
          <li>
            Click on Scan IDs to see screenshots with issue locations
            highlighted
          </li>
          <li>
            Export results as CSV to track remediation progress in a spreadsheet
          </li>
          <li>
            Create separate API keys for different environments (dev, staging,
            prod)
          </li>
          <li>
            Set up automatic daily scans to monitor for regressions after
            deployments
          </li>
        </ul>
      </section>

      {/* Support */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">
          🆘 Need More Help?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          If you have questions or need assistance, you can:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Check the{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              WCAG Quick Reference Guide
            </a>
          </li>
          <li>
            Review our API documentation (available in the API Keys section)
          </li>
          <li>Contact support for technical assistance</li>
        </ul>
      </section>
    </div>
  );
};

export default Help;
