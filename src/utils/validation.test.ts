import { describe, expect, it } from "vitest";
import { isValidEcuadorianCedula, cedulaSchema } from "./validation";

describe("cédula validation", () => {
  it("accepts a cédula with a valid verifier digit", () => {
    const result = cedulaSchema.safeParse("1312345679");
    expect(result.success).toBe(true);
  });

  it("rejects an incomplete cédula", () => {
    const result = cedulaSchema.safeParse("131234567");
    expect(result.success).toBe(false);
  });

  it("rejects a cédula when its verifier digit is invalid", () => {
    expect(isValidEcuadorianCedula("1312345678")).toBe(false);
    expect(cedulaSchema.safeParse("1312345678").success).toBe(false);
  });

  it("rejects a cédula with non-numeric characters", () => {
    expect(cedulaSchema.safeParse("131234567a").success).toBe(false);
  });

  it("rejects an invalid province code", () => {
    expect(isValidEcuadorianCedula("2512345670")).toBe(false);
  });
});
