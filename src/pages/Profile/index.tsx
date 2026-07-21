import { useState } from "react";
import { User, Mail, Phone, Lock, Moon, Globe } from "lucide-react";
import { mockUserProfile } from "@/data/userProfile";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/useToast";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("es");
  const { showToast } = useToast();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Mi Perfil</h1>
        <p className="mt-1 text-text-muted">Administra tu información personal y preferencias.</p>
      </div>

      <div className="rounded-app border border-border bg-white p-6 shadow-app-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-light text-2xl font-semibold text-primary">
            {mockUserProfile.firstName[0]}
            {mockUserProfile.lastName[0]}
          </span>
          <div>
            <p className="text-lg font-semibold text-text">
              {mockUserProfile.firstName} {mockUserProfile.lastName}
            </p>
            <p className="text-sm text-text-muted">{mockUserProfile.email}</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            showToast("Información actualizada correctamente", "success");
          }}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          <Input
            label="Nombre completo"
            defaultValue={`${mockUserProfile.firstName} ${mockUserProfile.lastName}`}
            icon={<User className="h-4 w-4" />}
          />
          <Input
            label="Correo"
            type="email"
            defaultValue={mockUserProfile.email}
            icon={<Mail className="h-4 w-4" />}
          />
          <Input
            label="Celular"
            defaultValue={mockUserProfile.phone}
            icon={<Phone className="h-4 w-4" />}
          />
          <div />
          <Button type="submit" className="sm:col-span-2">
            Guardar cambios
          </Button>
        </form>
      </div>

      <div className="mt-6 rounded-app border border-border bg-white p-6 shadow-app-sm">
        <h2 className="mb-4 text-base font-semibold text-text">Seguridad y preferencias</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            showToast("Contraseña actualizada correctamente", "success");
          }}
          className="mb-6 grid gap-4 sm:grid-cols-2"
        >
          <Input label="Nueva contraseña" type="password" icon={<Lock className="h-4 w-4" />} />
          <Input label="Confirmar contraseña" type="password" icon={<Lock className="h-4 w-4" />} />
          <Button type="submit" variant="secondary" className="sm:col-span-2 sm:w-fit">
            Cambiar contraseña
          </Button>
        </form>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-text">Tema oscuro</p>
              <p className="text-xs text-text-muted">Activa el modo oscuro en la interfaz</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Alternar tema oscuro"
            className={`h-6 w-11 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-border"}`}
          >
            <span
              className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition-transform ${
                darkMode ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-text">Idioma</p>
              <p className="text-xs text-text-muted">Selecciona el idioma de la plataforma</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-9 rounded-app border border-border bg-white px-3 text-sm text-text outline-none focus:border-primary"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}
