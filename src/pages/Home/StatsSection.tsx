import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, FileCheck2, Receipt } from "lucide-react";

const popularServices = [
  {
    icon: BadgeCheck,
    title: "Patente municipal",
    description: "Registra o renueva tu actividad económica de forma guiada.",
    action: "Gestionar patente",
    to: "/tramites/patente-municipal",
  },
  {
    icon: Receipt,
    title: "Pago predial",
    description: "Consulta la información de tu predio y revisa los pasos para pagar.",
    action: "Consultar predio",
    to: "/tramites/pago-predial",
  },
  {
    icon: FileCheck2,
    title: "Certificados municipales",
    description: "Encuentra los requisitos para solicitar documentos oficiales.",
    action: "Ver certificados",
    to: "/tramites/certificados",
  },
];

export function StatsSection() {
  return (
    <section className="bg-surface-muted px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">PORTAL CIUDADANO</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-text sm:text-3xl">
              Servicios más utilizados
            </h2>
            <p className="mt-2 max-w-xl text-text-muted">
              Accede rápidamente a la información que más necesitas.
            </p>
          </div>
          <Link
            to="/tramites"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Ver todos los trámites <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {popularServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
              >
                <Link
                  to={service.to}
                  className="group flex h-full flex-col rounded-[18px] border border-border bg-white p-6 shadow-app-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-app-md"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-text">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {service.action} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
