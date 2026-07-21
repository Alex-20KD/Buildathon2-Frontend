import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Trámites", to: "/tramites" },
  { label: "Chat IA", to: "/asistente" },
  { label: "Citas", to: "/citas" },
  { label: "Contacto", to: "/#contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <div className="hidden lg:block">
          <Link to="/login">
            <Button size="sm">Iniciar Sesión</Button>
          </Link>
        </div>

        <button
          className="rounded-app p-2 text-text lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
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
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button className="w-full" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
