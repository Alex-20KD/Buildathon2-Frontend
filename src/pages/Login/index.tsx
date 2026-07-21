import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, Landmark, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui";
import { loginSchema, type LoginFormValues } from "@/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { cedula: "" },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async ({ cedula }: LoginFormValues) => {
    const citizen = login(cedula);
    showToast(`Bienvenido/a, ${citizen.fullName}`, "success");
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
          <p className="mt-1 text-sm text-white/80">Continúa con tu cédula para acceder</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="[&_label]:text-white [&_input]:bg-white/90">
            <Input
              label="Cédula de identidad"
              inputMode="numeric"
              maxLength={10}
              autoComplete="off"
              placeholder="1312345679"
              icon={<IdCard className="h-4 w-4" />}
              error={errors.cedula?.message}
              {...register("cedula", {
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 10);
                },
              })}
            />
          </div>

          <p className="flex items-start gap-2 text-xs leading-5 text-white/75">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            Validaremos el dígito verificador. En esta versión demostrativa no necesitas contraseña.
          </p>

          <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
            Continuar
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
