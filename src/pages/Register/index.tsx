import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Landmark, User, IdCard, Mail, Phone, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui";
import { registerSchema, type RegisterFormValues } from "@/utils/validation";
import { useToast } from "@/hooks/useToast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (_data: RegisterFormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    showToast("Cuenta creada correctamente. Ahora puedes iniciar sesión.", "success");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted p-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl rounded-app border border-border bg-white p-8 shadow-app-lg"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-app bg-primary-light text-primary">
            <Landmark className="h-7 w-7" />
          </span>
          <h1 className="text-xl font-semibold text-text">Crea tu cuenta</h1>
          <p className="mt-1 text-sm text-text-muted">
            Regístrate para gestionar tus trámites municipales en línea
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nombre"
            placeholder="María"
            icon={<User className="h-4 w-4" />}
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <Input
            label="Apellido"
            placeholder="Zambrano"
            icon={<User className="h-4 w-4" />}
            error={errors.lastName?.message}
            {...register("lastName")}
          />
          <Input
            label="Cédula"
            placeholder="1312345678"
            icon={<IdCard className="h-4 w-4" />}
            error={errors.cedula?.message}
            {...register("cedula")}
          />
          <Input
            label="Correo"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            icon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Celular"
            placeholder="0991234567"
            icon={<Phone className="h-4 w-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />
          <div />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" size="lg" className="sm:col-span-2" isLoading={isSubmitting}>
            Registrarse
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
