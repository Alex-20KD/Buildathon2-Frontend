import { procedures } from "@/data/procedures";
import type { Procedure } from "@/types";

/**
 * Servicio de trámites. Actualmente retorna datos simulados;
 * al integrarse el backend bastará con reemplazar el cuerpo
 * de estas funciones por llamadas a `api`.
 */
export async function getProcedures(): Promise<Procedure[]> {
  return Promise.resolve(procedures);
}

export async function getProcedureBySlug(slug: string): Promise<Procedure | undefined> {
  return Promise.resolve(procedures.find((p) => p.slug === slug));
}
