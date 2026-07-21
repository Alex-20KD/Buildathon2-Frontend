import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Clock4, ShieldCheck } from "lucide-react";

export function WhySection() {
  return (
    <section className="bg-surface-muted px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[20px] bg-primary px-6 py-8 text-white shadow-app-md sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:px-12"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[28px] border-white/10" />
        <div className="relative z-10">
          <p className="text-sm font-semibold text-brand-lime">ATENCIÓN CIUDADANA DIGITAL</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            ¿Necesitas ayuda con un trámite?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            Nuestro asistente te orienta sobre requisitos, documentos y los pasos que debes seguir
            antes de iniciar tu gestión.
          </p>
          <Link
            to="/asistente"
            className="mt-6 inline-flex items-center gap-2 rounded-app bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            <Bot className="h-4 w-4" /> Abrir asistente IA <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex items-center gap-4 rounded-[16px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-brand-lime">
              <Clock4 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Cuando lo necesites</p>
              <p className="mt-0.5 text-xs leading-5 text-white/70">Consulta información municipal las 24 horas.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-[16px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-brand-lime">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Información clara</p>
              <p className="mt-0.5 text-xs leading-5 text-white/70">Prepara tus documentos antes de iniciar tu solicitud.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
