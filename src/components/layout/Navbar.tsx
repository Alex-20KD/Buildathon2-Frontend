import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Trámites", to: "/tramites" },
  { label: "Chat IA", to: "/asistente" },
  { label: "Citas", to: "/citas" },
  { label: "Contacto", to: "/#contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const sessionActions = isAuthenticated ? (
    <>
      <Link to="/dashboard" onClick={() => setOpen(false)}>
        <Button variant="secondary" size="sm" className="max-w-48">
          <UserRound className="h-4 w-4 shrink-0" />
          <span className="truncate">{user?.fullName}</span>
        </Button>
      </Link>
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        <LogOut className="h-4 w-4" /> Salir
      </Button>
    </>
  ) : (
    <Link to="/login" onClick={() => setOpen(false)}>
      <Button size="sm">Continuar con cédula</Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-text-muted transition-colors hover:text-primary",
                  isActive && "text-primary"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">{sessionActions}</div>

        <button
          className="rounded-app p-2 text-text lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-text-muted hover:text-primary"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2">{sessionActions}</div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
