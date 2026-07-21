import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Landmark } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui";
import { loginSchema, type LoginFormValues } from "@/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    login(data.email);
    showToast("Bienvenido de nuevo a PortoAsiste IA", "success");
    navigate("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md rounded-app border border-white/20 bg-white/10 p-8 shadow-app-lg backdrop-blur-xl"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-app bg-white text-primary shadow-app-md">
            <Landmark className="h-7 w-7" />
          </span>
          <h1 className="text-xl font-semibold text-white">PortoAsiste IA</h1>
          <p className="mt-1 text-sm text-white/80">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="[&_label]:text-white [&_input]:bg-white/90">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div className="[&_label]:text-white [&_input]:bg-white/90">
            <Input
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-text-muted"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              {...register("password")}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/90">
              <input type="checkbox" className="h-4 w-4 rounded border-white/40" {...register("remember")} />
              Recordarme
            </label>
            <Link to="#" className="font-medium text-white hover:underline">
              Recuperar contraseña
            </Link>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
            Ingresar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="font-semibold text-white hover:underline">
            Regístrate
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
