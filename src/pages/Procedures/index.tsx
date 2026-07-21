import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { procedures, procedureCategories } from "@/data/procedures";
import { ProcedureCard } from "@/components/cards/ProcedureCard";
import { Input } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function ProceduresPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = useMemo(() => {
    return procedures.filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Trámites Municipales</h1>
        <p className="mt-1 text-text-muted">
          Encuentra información y requisitos de los trámites del GAD Municipal de Portoviejo.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <Input
            placeholder="Buscar trámite..."
            icon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {procedureCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                category === cat
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-text-muted hover:border-primary/40 hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-text-muted">
          No se encontraron trámites que coincidan con tu búsqueda.
        </p>
      ) : (
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((procedure) => (
            <ProcedureCard key={procedure.id} procedure={procedure} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
