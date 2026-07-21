import { Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-app bg-primary text-white">
        <Landmark className="h-5 w-5" />
      </span>
      <span className="text-base font-semibold text-text">
        PortoAsiste <span className="text-primary">IA</span>
      </span>
    </Link>
  );
}
