import axios from "axios";
import { api } from "./api";

export interface AssistantChatResponse {
  response: string;
  tramite_detectado?: string | null;
  requisitos?: string[] | null;
  costo_estimado?: string | null;
  tiempo_estimado?: string | null;
  session_id: string;
}

interface ApiErrorPayload {
  detail?: unknown;
}

export async function sendAssistantMessage(
  message: string,
  sessionId: string
): Promise<AssistantChatResponse> {
  const response = await api.post<AssistantChatResponse>("/chat", {
    message,
    session_id: sessionId,
  });

  return response.data;
}

export function getAssistantErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) {
    return "No pudimos conectar con el asistente. Inténtalo nuevamente en unos minutos.";
  }

  if (error.response?.status === 503) {
    return "El asistente IA está temporalmente no disponible. Inténtalo nuevamente más tarde.";
  }

  if (error.response?.status === 502) {
    return "El asistente no pudo generar una respuesta en este momento. Inténtalo nuevamente.";
  }

  if (typeof error.response?.data?.detail === "string") {
    return error.response.data.detail;
  }

  return "No pudimos conectar con el asistente. Verifica que el servicio esté disponible.";
}
