import React, { createContext, useState, useEffect } from "react";

interface User {
  userId: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export for use in custom hook only, not for direct consumption
export { AuthContext };

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${BASE_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
          else {
            setToken(null);
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      Promise.resolve().then(() => setLoading(false));
    }
  }, [token]);

  const signin = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const signup = async (email: string, password: string, name: string) => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) throw new Error("Signup failed");
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const logout = async () => {
    if (token) {
      await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        signin,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
