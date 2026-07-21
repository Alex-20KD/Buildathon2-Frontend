import { z } from "zod";

/**
 * Verifica una cédula ecuatoriana de persona natural.
 *
 * La cédula debe pertenecer a una provincia válida (01–24), tener un tercer
 * dígito entre 0 y 5 y pasar el cálculo módulo 10 de su dígito verificador.
 */
export function isValidEcuadorianCedula(cedula: string): boolean {
  if (!/^\d{10}$/.test(cedula)) return false;

  const provinceCode = Number(cedula.slice(0, 2));
  const thirdDigit = Number(cedula[2]);

  if (provinceCode < 1 || provinceCode > 24 || thirdDigit > 5) return false;

  const total = cedula
    .slice(0, 9)
    .split("")
    .reduce((sum, digit, index) => {
      const value = Number(digit);

      if (index % 2 === 1) return sum + value;

      const doubled = value * 2;
      return sum + (doubled > 9 ? doubled - 9 : doubled);
    }, 0);

  const verifier = (10 - (total % 10)) % 10;
  return verifier === Number(cedula[9]);
}

export const cedulaSchema = z
  .string()
  .trim()
  .length(10, "La cédula debe tener 10 dígitos")
  .regex(/^\d+$/, "La cédula solo debe contener números")
  .refine(isValidEcuadorianCedula, "Ingresa una cédula ecuatoriana válida");
