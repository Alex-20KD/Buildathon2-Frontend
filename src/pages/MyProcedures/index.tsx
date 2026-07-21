import { Download, Eye } from "lucide-react";
import { userProcedures } from "@/data/userProcedures";
import { StatusBadge } from "@/components/cards/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "@/components/ui/Table";
import { useToast } from "@/hooks/useToast";

export default function MyProceduresPage() {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Mis Trámites</h1>
        <p className="mt-1 text-text-muted">Historial y estado de tus solicitudes municipales.</p>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Número</TableHeadCell>
            <TableHeadCell>Tipo</TableHeadCell>
            <TableHeadCell>Fecha</TableHeadCell>
            <TableHeadCell>Estado</TableHeadCell>
            <TableHeadCell>Acciones</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userProcedures.map((proc) => (
            <TableRow key={proc.id}>
              <TableCell className="font-medium">{proc.number}</TableCell>
              <TableCell>{proc.procedureName}</TableCell>
              <TableCell>
                {new Date(`${proc.date}T00:00:00`).toLocaleDateString("es-EC", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <StatusBadge status={proc.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => showToast(`Detalle de ${proc.number}`, "info")}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Eye className="h-4 w-4" /> Ver
                  </button>
                  <button
                    onClick={() => showToast("Comprobante descargado", "success")}
                    className="flex items-center gap-1 text-text-muted hover:text-primary hover:underline"
                  >
                    <Download className="h-4 w-4" /> Descargar
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
