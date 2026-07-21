import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Landmark } from "lucide-react";
import { Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light to-surface-muted">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-primary shadow-app-sm">
            <Landmark className="h-3.5 w-3.5" /> GAD Municipal de Portoviejo
          </span>
          <h1 className="text-4xl font-bold leading-tight text-text sm:text-5xl">
            Atención ciudadana inteligente para Portoviejo
          </h1>
          <p className="mt-5 max-w-xl text-lg text-text-muted">
            Consulta trámites municipales, requisitos y resuelve tus dudas mediante un asistente
            virtual impulsado por Inteligencia Artificial.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/tramites">
              <Button size="lg">
                Consultar Trámite <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/asistente">
              <Button size="lg" variant="secondary">
                <Bot className="h-4 w-4" /> Hablar con IA
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center rounded-app bg-white p-10 shadow-app-lg">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-light text-primary">
                <Bot className="h-12 w-12" />
              </span>
              <p className="text-sm font-medium text-text-muted">
                Asistente virtual disponible las 24 horas para resolver tus trámites municipales
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-app bg-white p-4 shadow-app-md sm:block">
            <p className="text-sm font-semibold text-success">+250 trámites disponibles</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
