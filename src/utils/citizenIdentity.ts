import { mockUserProfile } from "@/data/userProfile";
import type { AuthUser } from "@/types";
import { isValidEcuadorianCedula } from "@/utils/validation";

/**
 * Crea la identidad temporal usada por el prototipo mientras exista un
 * servicio municipal que valide la cédula y entregue el nombre real.
 */
export function createLocalCitizen(cedula: string): AuthUser {
  if (cedula === mockUserProfile.cedula) {
    return {
      id: mockUserProfile.id,
      cedula,
      fullName: `${mockUserProfile.firstName} ${mockUserProfile.lastName}`,
      email: mockUserProfile.email,
    };
  }

  return {
    id: `citizen-${cedula}`,
    cedula,
    fullName: "Ciudadano/a",
  };
}

export function isStoredCitizen(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") return false;

  const user = value as Partial<AuthUser>;
  return (
    typeof user.id === "string" &&
    typeof user.cedula === "string" &&
    isValidEcuadorianCedula(user.cedula) &&
    typeof user.fullName === "string"
  );
}

export function maskCedula(cedula: string): string {
  return `******${cedula.slice(-4)}`;
}
