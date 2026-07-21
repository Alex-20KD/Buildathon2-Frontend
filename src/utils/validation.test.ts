import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./validation";

describe("validation schemas", () => {
  it("accepts a complete registration with matching credentials", () => {
    const result = registerSchema.safeParse({
      firstName: "Ana",
      lastName: "Perez",
      cedula: "1301234567",
      email: "ana.perez@example.com",
      phone: "0991234567",
      password: "clave-segura",
      confirmPassword: "clave-segura",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a registration when the confirmation password differs", () => {
    const result = registerSchema.safeParse({
      firstName: "Ana",
      lastName: "Perez",
      cedula: "1301234567",
      email: "ana.perez@example.com",
      phone: "0991234567",
      password: "clave-segura",
      confirmPassword: "otra-clave",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("confirmPassword"))).toBe(true);
    }
  });

  it("rejects invalid login credentials before a request is made", () => {
    const result = loginSchema.safeParse({
      email: "correo-invalido",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});
