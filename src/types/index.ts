// Tipos globales de la aplicación PortoAsiste IA

export type ProcedureStatus = "pendiente" | "en_revision" | "aprobado" | "rechazado";

export interface Procedure {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  estimatedTime: string;
  cost: string;
  icon: string;
  requirements: string[];
  documents: string[];
  steps: string[];
}

export interface UserProcedure {
  id: string;
  number: string;
  procedureName: string;
  date: string;
  status: ProcedureStatus;
}

export type NotificationStatus = "leido" | "no_leido";

export interface AppNotification {
  id: string;
  icon: string;
  date: string;
  message: string;
  status: NotificationStatus;
}

export interface Appointment {
  id: string;
  procedureType: string;
  date: string;
  time: string;
  status: "confirmada" | "pendiente" | "cancelada";
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
}

export interface FrequentQuestion {
  id: string;
  label: string;
  question: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  cedula: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface AuthUser {
  id: string;
  cedula: string;
  fullName: string;
  email?: string;
}
