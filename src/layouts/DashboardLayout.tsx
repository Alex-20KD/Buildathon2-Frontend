import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/utils/cn";

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <Sidebar className={cn("relative z-10 animate-slide-up")} />
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <div className="flex h-16 items-center border-b border-border bg-white px-4 lg:hidden">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Abrir menú"
            className="rounded-app p-2 text-text"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <span className="ml-3 text-sm font-semibold text-text">PortoAsiste IA</span>
        </div>
        <main className="flex min-h-0 flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
