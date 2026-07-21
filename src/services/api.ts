import axios from "axios";

const API_PREFIX = "/api";

/**
 * Acepta tanto la URL base del backend como la URL completa de su API.
 * Evita solicitudes a `/chat`, ya que FastAPI expone el recurso en `/api/chat`.
 */
export function resolveApiBaseUrl(configuredUrl?: string): string {
  const apiBaseUrl = (configuredUrl || "http://localhost:8000/api").trim().replace(/\/+$/, "");

  return apiBaseUrl.endsWith(API_PREFIX) ? apiBaseUrl : `${apiBaseUrl}${API_PREFIX}`;
}

const apiBaseUrl = resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

/** Cliente HTTP centralizado para el backend FastAPI. */
export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("portoasiste_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Punto centralizado para manejo de errores globales (401, 500, etc.)
    return Promise.reject(error);
  }
);
