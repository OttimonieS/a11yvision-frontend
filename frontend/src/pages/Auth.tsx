import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const Auth: React.FC = () => {
  const { signin, signup } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        await signin(email, password);
      } else {
        if (!name) throw new Error("Name required");
        await signup(email, password, name);
      }
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="max-w-md w-full bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
          >
            {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === "signin" ? (
            <button
              onClick={() => setMode("signup")}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Don't have an account? Sign up
            </button>
          ) : (
            <button
              onClick={() => setMode("signin")}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
