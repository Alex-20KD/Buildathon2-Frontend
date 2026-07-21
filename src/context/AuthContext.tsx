import { useState, type ReactNode } from "react";
import type { AuthUser } from "@/types";
import { AuthContext } from "./auth-context-def";

const STORAGE_KEY = "portoasiste_user";

function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);

  const login = (email: string) => {
    // Simulación de autenticación (sin backend todavía)
    const mockUser: AuthUser = {
      id: "usr-1",
      fullName: "María Zambrano",
      email,
    };
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
