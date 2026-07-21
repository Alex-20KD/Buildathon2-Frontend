import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Clock, DollarSign, Bot, FileText, ListChecks } from "lucide-react";
import { motion } from "framer-motion";
import { procedures } from "@/data/procedures";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui";
import { getIcon } from "@/utils/getIcon";
import { useToast } from "@/hooks/useToast";

export default function ProcedureDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const procedure = procedures.find((p) => p.slug === slug);
  const Icon = useMemo(() => getIcon(procedure?.icon ?? ""), [procedure?.icon]);

  if (!procedure) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-text">Trámite no encontrado</h1>
        <p className="mt-2 text-text-muted">El trámite que buscas no existe o fue removido.</p>
        <Link to="/tramites">
          <Button className="mt-6">Volver a Trámites</Button>
        </Link>
      </div>
    );
  }

  const handleStart = () => {
    showToast(`Solicitud de "${procedure.name}" iniciada correctamente`, "success");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Trámites", to: "/tramites" }, { label: procedure.name }]} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-app border border-border bg-white p-8 shadow-app-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-app bg-primary-light text-primary">
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-text">{procedure.name}</h1>
              <p className="mt-2 max-w-2xl text-text-muted">{procedure.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-app bg-surface-muted p-4">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-muted">Tiempo estimado</p>
              <p className="text-sm font-semibold text-text">{procedure.estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-app bg-surface-muted p-4">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-muted">Costo</p>
              <p className="text-sm font-semibold text-text">{procedure.cost}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-text">
              <ListChecks className="h-5 w-5 text-primary" /> Requisitos
            </h2>
            <ul className="space-y-2">
              {procedure.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-text">
              <FileText className="h-5 w-5 text-primary" /> Documentos
            </h2>
            <ul className="space-y-2">
              {procedure.documents.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm text-text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-base font-semibold text-text">Pasos a seguir</h2>
          <ol className="space-y-3">
            {procedure.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-text-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button size="lg" onClick={handleStart}>
            Iniciar trámite
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate("/asistente")}>
            <Bot className="h-4 w-4" /> Hablar con IA
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
