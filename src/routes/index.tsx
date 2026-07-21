import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ChatLayout } from "@/layouts/ChatLayout";
import { ProtectedRoute } from "./ProtectedRoute";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import FormsPage from "@/pages/Dashboard/FormsPage";
import ProceduresPage from "@/pages/Procedures";
import ProcedureDetailPage from "@/pages/ProcedureDetail";
import ChatAIPage from "@/pages/ChatAI";
import MyProceduresPage from "@/pages/MyProcedures";
import AppointmentsPage from "@/pages/Appointments";
import NotificationsPage from "@/pages/Notifications";
import ProfilePage from "@/pages/Profile";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/tramites", element: <ProceduresPage /> },
      { path: "/tramites/:slug", element: <ProcedureDetailPage /> },
      { path: "/citas", element: <AppointmentsPage /> },
      { path: "/notificaciones", element: <NotificationsPage /> },
      { path: "/perfil", element: <ProfilePage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/registro", element: <Navigate to="/login" replace /> },
  {
    path: "/asistente",
    element: <ChatLayout />,
    children: [{ index: true, element: <ChatAIPage /> }],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "mis-tramites", element: <MyProceduresPage /> },
      { path: "formularios", element: <FormsPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
