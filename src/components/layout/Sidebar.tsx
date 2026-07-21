import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Bot,
  CalendarDays,
  FileInput,
  Bell,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { cn } from "@/utils/cn";

const items = [
  { label: "Inicio", to: "/dashboard", icon: Home },
  { label: "Mis Trámites", to: "/dashboard/mis-tramites", icon: FileText },
  { label: "Asistente IA", to: "/asistente", icon: Bot },
  { label: "Citas", to: "/citas", icon: CalendarDays },
  { label: "Formularios", to: "/dashboard/formularios", icon: FileInput },
  { label: "Notificaciones", to: "/notificaciones", icon: Bell },
  { label: "Configuración", to: "/perfil", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-border bg-white p-4",
        className
      )}
    >
      <div className="mb-8 px-2 pt-2">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-app px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-primary-light hover:text-primary",
                isActive && "bg-primary-light text-primary"
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <Link
        to="/"
        className="mt-4 flex items-center gap-3 rounded-app px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
      >
        <ArrowLeft className="h-[18px] w-[18px]" />
        Volver al inicio
      </Link>
    </aside>
  );
}
