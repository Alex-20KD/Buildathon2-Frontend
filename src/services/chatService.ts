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

  const detail = error.response?.data?.detail;

  if (error.response?.status === 503) {
    if (typeof detail === "string" && detail.includes("OPENAI_API_KEY")) {
      return "El asistente IA no está configurado en el servidor. Agrega OPENAI_API_KEY en Render y vuelve a desplegar el backend.";
    }

    return "El asistente IA está temporalmente no disponible. Inténtalo nuevamente más tarde.";
  }

  if (error.response?.status === 502) {
    return "El asistente no pudo generar una respuesta en este momento. Inténtalo nuevamente.";
  }

  if (typeof detail === "string") {
    return detail;
  }

  return "No pudimos conectar con el asistente. Verifica que el servicio esté disponible.";
}
