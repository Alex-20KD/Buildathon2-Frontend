import { describe, expect, it } from "vitest";
import { createLocalCitizen, isStoredCitizen, maskCedula } from "./citizenIdentity";

describe("citizen identity", () => {
  it("uses the available demo profile when its cédula is entered", () => {
    const citizen = createLocalCitizen("1312345678");

    expect(citizen.fullName).toBe("María Zambrano");
    expect(citizen.cedula).toBe("1312345678");
  });

  it("keeps an unknown citizen anonymous until a real registry is available", () => {
    expect(createLocalCitizen("1301234567").fullName).toBe("Ciudadano/a");
  });

  it("rejects legacy stored sessions without a cédula", () => {
    expect(isStoredCitizen({ id: "usr-1", fullName: "María Zambrano" })).toBe(false);
  });

  it("masks the cédula shown inside the chat", () => {
    expect(maskCedula("1312345678")).toBe("******5678");
  });
});
