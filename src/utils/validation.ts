import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El correo es obligatorio").email("Ingresa un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "Ingresa tu nombre"),
    lastName: z.string().min(2, "Ingresa tu apellido"),
    cedula: z
      .string()
      .min(10, "La cédula debe tener 10 dígitos")
      .max(10, "La cédula debe tener 10 dígitos")
      .regex(/^\d+$/, "La cédula solo debe contener números"),
    email: z.string().min(1, "El correo es obligatorio").email("Ingresa un correo válido"),
    phone: z
      .string()
      .min(10, "El celular debe tener 10 dígitos")
      .max(10, "El celular debe tener 10 dígitos")
      .regex(/^\d+$/, "El celular solo debe contener números"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
