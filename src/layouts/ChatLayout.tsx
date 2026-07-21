import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { PublicLayout } from "@/layouts/PublicLayout";

/**
 * Conserva el acceso público para la identificación por cédula y usa el
 * panel ciudadano cuando ya existe una sesión.
 */
export function ChatLayout() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardLayout /> : <PublicLayout />;
}
