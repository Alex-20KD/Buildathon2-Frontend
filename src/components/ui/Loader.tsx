import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export function Loader({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 py-10", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {label && <p className="text-sm text-text-muted">{label}</p>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-app bg-surface-muted", className)}
    />
  );
}
