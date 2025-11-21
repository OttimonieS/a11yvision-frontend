import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface ApiKey {
  keyId: string;
  label: string;
  createdAt: string;
  keyValue?: string;
}

const ApiKeys: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");

  const fetchKeys = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || "https://api.a11yvision.labnexus.my.id"
        }/api/v1/api-keys`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setKeys(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(
      `${
        import.meta.env.VITE_API_URL || "https://api.a11yvision.labnexus.my.id"
      }/api/v1/api-keys`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then((data) => setKeys(data.items || []))
      .catch(console.error);
  }, []);

  const handleCreate = async () => {
    if (!label.trim()) {
      setMessage("Please enter a label");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    setMessage("");
    setNewKeyValue("");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || "https://api.a11yvision.labnexus.my.id"
        }/api/v1/api-keys`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ label }),
        }
      );
      const data = await res.json();
      setNewKeyValue(data.keyValue);
      setMessage(
        "API key created successfully. Copy it now - it will not be shown again!"
      );
      setLabel("");
      void fetchKeys();
    } catch (err) {
      console.error(err);
      setMessage("Failed to create API key");
    }
    setLoading(false);
  };

  const handleDelete = async (keyId: string) => {
    if (!confirm("Are you sure you want to delete this API key?")) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(
        `${
          import.meta.env.VITE_API_URL || "https://api.a11yvision.labnexus.my.id"
        }/api/v1/api-keys/${keyId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      void fetchKeys();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">API Keys</h1>

      <div className="max-w-md space-y-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
        <h2 className="text-lg font-semibold">Create New Key</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Production API, Development, etc."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
        </div>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create API Key"}
        </button>
        {message && <p className="text-sm">{message}</p>}
        {newKeyValue && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <p className="text-sm font-medium mb-2">Your new API key:</p>
            <code className="block p-2 bg-gray-900 text-green-400 rounded text-xs break-all">
              {newKeyValue}
            </code>
            <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-2">
              Save this key now - you won't be able to see it again!
            </p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Your API Keys</h2>
        {keys.length === 0 ? (
          <p className="text-gray-500">
            No API keys yet. Create one above to get started.
          </p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-800">
                <th className="py-2 pr-4">Label</th>
                <th className="py-2 pr-4">Key ID</th>
                <th className="py-2 pr-4">Created</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => (
                <tr
                  key={key.keyId}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-2 pr-4">{key.label}</td>
                  <td className="py-2 pr-4 font-mono text-xs">
                    {key.keyId.slice(0, 12)}...
                  </td>
                  <td className="py-2 pr-4">
                    {new Date(key.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 pr-4">
                    <button
                      onClick={() => handleDelete(key.keyId)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApiKeys;
