import { motion } from "framer-motion";
import { FileStack, Clock, Users } from "lucide-react";

const stats = [
  { icon: FileStack, value: "+250", label: "Trámites disponibles" },
  { icon: Clock, value: "24/7", label: "Atención permanente" },
  { icon: Users, value: "+50,000", label: "Ciudadanos atendidos" },
];

export function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-4 rounded-app border border-border bg-white p-6 shadow-app-sm"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-app bg-primary-light text-primary">
              <stat.icon className="h-7 w-7" />
            </span>
            <div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
