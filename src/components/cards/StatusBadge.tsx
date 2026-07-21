import type { ProcedureStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";

const config: Record<ProcedureStatus, { label: string; variant: "warning" | "primary" | "success" | "danger" }> = {
  pendiente: { label: "Pendiente", variant: "warning" },
  en_revision: { label: "En revisión", variant: "primary" },
  aprobado: { label: "Aprobado", variant: "success" },
  rechazado: { label: "Rechazado", variant: "danger" },
};

export function StatusBadge({ status }: { status: ProcedureStatus }) {
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}
