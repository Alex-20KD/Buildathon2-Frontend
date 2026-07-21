# PortoAsiste IA — Frontend

Frontend del sistema inteligente de atención ciudadana del GAD Municipal de Portoviejo.
El asistente de trámites ya se conecta al backend FastAPI; las demás funcionalidades
mantienen datos simulados hasta que la API exponga sus respectivos endpoints.

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
npm run test       # pruebas unitarias
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

El chat ya se conecta al backend FastAPI. Las demás pantallas continúan usando datos mock
ubicados en `src/data/` hasta que la API exponga sus respectivos endpoints. Los servicios en
`src/services/` centralizan las llamadas para poder ampliar la integración sin modificar los
componentes de las páginas.

## Conexión con el backend

El chat ya consume la API FastAPI real mediante `POST /api/chat`. Para ejecutarlo localmente:

1. En `Buildathon2-Backend`, crea `.env` desde `.env.example`, configura `OPENAI_API_KEY` y arranca la API en el puerto `8000`.
2. En este repositorio, crea `.env.local` con:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

3. Arranca Vite con `npm run dev`. El backend permite por defecto los orígenes `http://localhost:5173` y `http://127.0.0.1:5173`.

Para producción, configura en Vercel `VITE_API_BASE_URL` con la URL pública del backend, por ejemplo:

```env
VITE_API_BASE_URL=https://buildathon2-backend.onrender.com/api
```

El cliente también acepta la URL sin `/api` y completa ese prefijo automáticamente. Agrega el dominio público del frontend a `CORS_ORIGINS` en el backend. Nunca expongas `OPENAI_API_KEY` en el frontend.

Actualmente, autenticación, citas, notificaciones y el catálogo general de trámites continúan usando datos simulados porque el backend todavía no expone esos endpoints.

## Autenticación

La versión demostrativa identifica al ciudadano con una cédula ecuatoriana válida: comprueba
la provincia, el tipo de persona natural y el dígito autoverificador. Conserva esa sesión en
`localStorage`; no solicita contraseña. El asistente pide la cédula antes de aceptar consultas
y no la envía como texto al endpoint de IA.

Para producción, este flujo debe sustituirse por un endpoint municipal que valide la cédula y
entregue la identidad del ciudadano (idealmente con un segundo factor de verificación). Una
cédula por sí sola no constituye autenticación segura.
