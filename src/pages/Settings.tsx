import React, { useState, useEffect } from "react";

interface UserSettings {
  contrastThreshold: string;
  enableTargetSize: boolean;
  rescanCadence: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    contrastThreshold: "WCAG_AA",
    enableTargetSize: true,
    rescanCadence: "manual",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(
      (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000") +
        "/api/v1/settings",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000") +
          "/api/v1/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(settings),
        }
      );
      if (res.ok) {
        setMessage("Settings saved successfully");
      } else {
        setMessage("Failed to save settings");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error saving settings");
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">
            Contrast Threshold
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            value={settings.contrastThreshold}
            onChange={(e) =>
              setSettings({ ...settings, contrastThreshold: e.target.value })
            }
          >
            <option value="WCAG_AA">WCAG AA (4.5:1 normal, 3:1 large)</option>
            <option value="WCAG_AAA">WCAG AAA (7:1 normal, 4.5:1 large)</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="targetSize"
            className="mr-2"
            checked={settings.enableTargetSize}
            onChange={(e) =>
              setSettings({ ...settings, enableTargetSize: e.target.checked })
            }
          />
          <label htmlFor="targetSize" className="text-sm font-medium">
            Enable hit target size detection
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Automatic Rescan Cadence
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            value={settings.rescanCadence}
            onChange={(e) =>
              setSettings({ ...settings, rescanCadence: e.target.value })
            }
          >
            <option value="manual">Manual</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Settings;
