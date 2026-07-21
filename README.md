# PortoAsiste IA — Frontend

Frontend del sistema inteligente de atención ciudadana del GAD Municipal de Portoviejo.
Construido con datos simulados (mock) mientras el backend y el agente de IA se integran
en una fase posterior.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4 (tema institucional: azul `#1565C0`, verde `#2E7D32`, rojo `#D32F2F`)
- React Router DOM
- React Hook Form + Zod
- TanStack Query (preparado para el backend)
- Axios (cliente configurado en `src/services/api.ts`)
- Framer Motion
- Lucide React

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción (tsc -b && vite build)
npm run lint       # ESLint
npm run preview   # previsualiza el build
```

## Estructura

```
src/
├── assets/
├── components/
│   ├── common/      # elementos compartidos
│   ├── layout/       # Navbar, Sidebar, Footer, Logo
│   ├── forms/        # (uso futuro para formularios complejos)
│   ├── chat/          # MessageBubble, TypingIndicator
│   ├── cards/         # ProcedureCard, StatCard, NotificationCard, AppointmentCard, StatusBadge
│   └── ui/            # Button, Input, Select, Card, Badge, Modal, Toast, Loader, Breadcrumb, Table
├── pages/             # Home, Login, Register, Dashboard, Procedures, ProcedureDetail,
│                       # ChatAI, Appointments, Notifications, Profile, MyProcedures
├── routes/            # definición de rutas y ProtectedRoute
├── hooks/              # useAuth, useToast
├── services/          # api.ts (Axios), proceduresService.ts
├── layouts/            # PublicLayout, DashboardLayout
├── types/              # tipos globales
├── utils/              # cn, getIcon, validation (zod schemas)
├── context/            # AuthContext, ToastContext
└── data/               # datos simulados (trámites, notificaciones, citas, chat, perfil)
```

## Datos simulados

Como el backend aún no existe, todas las pantallas funcionan con datos mock ubicados en
`src/data/`. Los servicios en `src/services/` ya están preparados para reemplazar estos
datos por llamadas reales a la API sin modificar los componentes de las páginas.

## Autenticación

El flujo de login/registro es simulado mediante `AuthContext` (persistido en
`localStorage`). Al conectar el backend, basta actualizar `login`/`logout` en
`src/context/AuthContext.tsx` para consumir el endpoint real.
