import { useState, type ReactNode } from "react";
import type { AuthUser } from "@/types";
import { createLocalCitizen, isStoredCitizen } from "@/utils/citizenIdentity";
import { AuthContext } from "./auth-context-def";

const STORAGE_KEY = "portoasiste_user";

function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const user: unknown = JSON.parse(stored);
    if (isStoredCitizen(user)) return user;

    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);

  const login = (cedula: string): AuthUser => {
    const citizen = createLocalCitizen(cedula);
    setUser(citizen);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(citizen));
    return citizen;
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
