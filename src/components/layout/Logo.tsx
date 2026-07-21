import { Link } from "react-router-dom";
import logoPortoviejo from "@/assets/logo-portoviejo-online.png";
import { cn } from "@/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex shrink-0 items-center", className)}
      aria-label="Ir al inicio de PortoAsiste IA"
    >
      <img
        src={logoPortoviejo}
        alt="Alcaldía de Portoviejo, crecemos juntos"
        className="h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.015] sm:h-16"
      />
    </Link>
  );
}
