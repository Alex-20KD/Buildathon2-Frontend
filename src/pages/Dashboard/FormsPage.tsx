import { Download, FileText } from "lucide-react";
import { procedures } from "@/data/procedures";
import { Button } from "@/components/ui";
import { useToast } from "@/hooks/useToast";

export default function FormsPage() {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Formularios</h1>
        <p className="mt-1 text-text-muted">
          Descarga los formularios oficiales necesarios para tus trámites municipales.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {procedures.map((procedure) => (
          <div
            key={procedure.id}
            className="flex items-center justify-between gap-4 rounded-app border border-border bg-white p-5 shadow-app-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-app bg-primary-light text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium text-text">{procedure.name}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Descargar formulario"
              onClick={() => showToast(`Formulario de ${procedure.name} descargado`, "success")}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
