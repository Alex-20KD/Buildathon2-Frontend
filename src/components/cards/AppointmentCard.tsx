import { CalendarDays, Clock3 } from "lucide-react";
import type { Appointment } from "@/types";
import { Badge } from "@/components/ui/Badge";

const statusVariant: Record<Appointment["status"], "success" | "warning" | "danger"> = {
  confirmada: "success",
  pendiente: "warning",
  cancelada: "danger",
};

const statusLabel: Record<Appointment["status"], string> = {
  confirmada: "Confirmada",
  pendiente: "Pendiente",
  cancelada: "Cancelada",
};

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const date = new Date(`${appointment.date}T00:00:00`);

  return (
    <div className="flex items-center justify-between gap-4 rounded-app border border-border bg-white p-4 shadow-app-sm">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 flex-col items-center justify-center rounded-app bg-primary-light text-primary">
          <CalendarDays className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-text">{appointment.procedureType}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-muted">
            {date.toLocaleDateString("es-EC", { day: "2-digit", month: "long", year: "numeric" })}
            <Clock3 className="h-3.5 w-3.5" />
            {appointment.time}
          </p>
        </div>
      </div>
      <Badge variant={statusVariant[appointment.status]}>{statusLabel[appointment.status]}</Badge>
    </div>
  );
}
