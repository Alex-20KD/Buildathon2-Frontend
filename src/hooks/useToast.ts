import { useContext } from "react";
import { ToastContext } from "@/context/toast-context-def";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de ToastProvider");
  return ctx;
}
