import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, FileText, Landmark } from "lucide-react";
import { Button } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="bg-surface-muted px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[22px] bg-primary px-6 py-9 shadow-app-lg sm:px-10 sm:py-11 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-14 lg:py-14"
      >
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[34px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-36 left-[42%] h-64 w-64 rounded-full bg-brand-sky/15 blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90">
            <Landmark className="h-3.5 w-3.5" /> PORTOASISTE IA
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.65rem]">
            Servicios municipales, más cerca de ti.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Consulta requisitos, inicia tus trámites y recibe orientación clara para gestionar
            servicios del GAD Municipal de Portoviejo.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/tramites">
              <Button
                size="lg"
                className="bg-white text-primary shadow-none hover:bg-primary-soft hover:shadow-app-sm"
              >
                Consultar Trámite
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/asistente">
              <Button
                size="lg"
                className="border border-white/25 bg-white/10 text-white shadow-none hover:bg-white/20 hover:shadow-none"
              >
                <Bot className="h-4 w-4" /> Hablar con IA
              </Button>
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-lime" /> Atención disponible 24/7
            </li>
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-lime" /> Información en un solo lugar
            </li>
          </ul>
        </div>

        <div className="relative z-10 mt-9 hidden items-center justify-center lg:flex">
          <div className="relative flex h-64 w-72 items-center justify-center">
            <div className="absolute inset-4 rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-sm" />
            <div className="relative w-52 rounded-[18px] bg-white p-5 shadow-app-lg">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="h-2 w-12 rounded-full bg-primary-light" />
              </div>
              <div className="mt-5 space-y-3">
                <span className="block h-2.5 w-4/5 rounded-full bg-primary/20" />
                <span className="block h-2.5 w-full rounded-full bg-primary/10" />
                <span className="block h-2.5 w-3/5 rounded-full bg-primary/10" />
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-brand-lime" /> Trámite en línea
              </div>
            </div>
            <div className="absolute -right-2 bottom-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-brand-sky text-white shadow-app-md">
              <Bot className="h-7 w-7" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
