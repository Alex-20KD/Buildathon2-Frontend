import axios from "axios";

/**
 * Cliente HTTP centralizado. La URL base y los interceptores quedan
 * preparados para conectarse con el backend en una fase posterior.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api",
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
