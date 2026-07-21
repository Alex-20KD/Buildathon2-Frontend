import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  CheckCircle2,
  Bell,
  Stamp,
  Receipt,
  Download,
  Megaphone,
  CalendarPlus,
} from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { userProcedures } from "@/data/userProcedures";
import { notifications } from "@/data/notifications";
import { mockUserProfile } from "@/data/userProfile";

const quickActions = [
  { label: "Solicitar permiso", to: "/tramites/permiso-funcionamiento", icon: Stamp },
  { label: "Consultar impuesto", to: "/tramites/pago-predial", icon: Receipt },
  { label: "Descargar certificado", to: "/tramites/certificados", icon: Download },
  { label: "Presentar denuncia", to: "/tramites/denuncias", icon: Megaphone },
  { label: "Agendar cita", to: "/citas", icon: CalendarPlus },
];

export default function DashboardPage() {
  const pendientes = userProcedures.filter((p) => p.status === "pendiente" || p.status === "en_revision").length;
  const aprobados = userProcedures.filter((p) => p.status === "aprobado").length;
  const noLeidas = notifications.filter((n) => n.status === "no_leido").length;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-text">Hola, {mockUserProfile.firstName} 👋</h1>
        <p className="mt-1 text-text-muted">
          Este es el resumen de tu actividad en PortoAsiste IA.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Mis trámites" value={userProcedures.length} icon={FileText} tone="primary" />
        <StatCard label="Pendientes" value={pendientes} icon={Clock} tone="warning" />
        <StatCard label="Aprobados" value={aprobados} icon={CheckCircle2} tone="success" />
        <StatCard label="Notificaciones" value={noLeidas} icon={Bell} tone="danger" />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-text">Accesos rápidos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="flex flex-col items-center gap-3 rounded-app border border-border bg-white p-5 text-center shadow-app-sm transition-all hover:-translate-y-0.5 hover:shadow-app-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-app bg-primary-light text-primary">
                <action.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium text-text">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
