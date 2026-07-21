import axios from "axios";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api").replace(
  /\/+$/,
  ""
);

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
