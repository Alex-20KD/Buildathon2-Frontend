import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "danger";
}

const toneStyles: Record<string, string> = {
  primary: "bg-primary-light text-primary",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
};

export function StatCard({ label, value, icon: Icon, tone = "primary" }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-app border border-border bg-white p-5 shadow-app-sm transition-shadow hover:shadow-app-md">
      <span className={cn("flex h-12 w-12 items-center justify-center rounded-app", toneStyles[tone])}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-2xl font-semibold text-text">{value}</p>
        <p className="text-sm text-text-muted">{label}</p>
      </div>
    </div>
  );
}
