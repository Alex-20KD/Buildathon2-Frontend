import type { AppNotification } from "@/types";

export const notifications: AppNotification[] = [
  {
    id: "n-1",
    icon: "CheckCircle2",
    date: "2026-07-19T09:20:00",
    message: "Tu trámite de Permiso de Funcionamiento fue aprobado.",
    status: "no_leido",
  },
  {
    id: "n-2",
    icon: "Clock",
    date: "2026-07-17T14:05:00",
    message: "Tu solicitud de Pago Predial está en revisión.",
    status: "no_leido",
  },
  {
    id: "n-3",
    icon: "CalendarCheck",
    date: "2026-07-15T11:30:00",
    message: "Recordatorio: tienes una cita agendada para el 28 de julio.",
    status: "leido",
  },
  {
    id: "n-4",
    icon: "AlertTriangle",
    date: "2026-06-21T08:10:00",
    message: "Tu trámite de Patente Municipal fue rechazado. Revisa los detalles.",
    status: "leido",
  },
  {
    id: "n-5",
    icon: "FileText",
    date: "2026-06-15T16:45:00",
    message: "Nuevo formulario disponible para certificados municipales.",
    status: "leido",
  },
];
