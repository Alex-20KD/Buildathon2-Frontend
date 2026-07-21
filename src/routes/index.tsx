import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import HomePage from "@/pages/Home";
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
      { path: "/asistente", element: <ChatAIPage /> },
      { path: "/citas", element: <AppointmentsPage /> },
      { path: "/notificaciones", element: <NotificationsPage /> },
      { path: "/perfil", element: <ProfilePage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
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
