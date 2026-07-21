import { motion } from "framer-motion";
import { Zap, RefreshCcw, Clock4, Users2 } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Atención inmediata",
    description: "Recibe respuestas al instante sin esperar filas ni turnos presenciales.",
  },
  {
    icon: RefreshCcw,
    title: "Información actualizada",
    description: "Requisitos, costos y tiempos siempre alineados con la normativa vigente.",
  },
  {
    icon: Clock4,
    title: "Disponible las 24 horas",
    description: "Consulta tus trámites cuando lo necesites, cualquier día de la semana.",
  },
  {
    icon: Users2,
    title: "Menos filas",
    description: "Reduce el tiempo de espera en las oficinas municipales de forma significativa.",
  },
];

export function WhySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-text">¿Por qué usar PortoAsiste IA?</h2>
        <p className="mt-3 text-text-muted">
          Una nueva forma de interactuar con el municipio, más rápida, simple y accesible.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-app border border-border bg-white p-6 text-center shadow-app-sm transition-shadow hover:shadow-app-md"
          >
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-app bg-primary-light text-primary">
              <reason.icon className="h-7 w-7" />
            </span>
            <h3 className="text-base font-semibold text-text">{reason.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
