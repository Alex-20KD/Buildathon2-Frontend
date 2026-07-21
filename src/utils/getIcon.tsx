import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FileQuestion } from "lucide-react";

/**
 * Resuelve dinámicamente un componente de Lucide Icons a partir de su nombre
 * (usado para íconos definidos en datos simulados).
 */
export function getIcon(name: string): LucideIcon {
  const icon = (icons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? FileQuestion;
}
