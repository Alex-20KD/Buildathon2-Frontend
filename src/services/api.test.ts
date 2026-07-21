import { describe, expect, it } from "vitest";

import { resolveApiBaseUrl } from "./api";

describe("resolveApiBaseUrl", () => {
  it("adds the FastAPI prefix when the configured URL is the backend origin", () => {
    expect(resolveApiBaseUrl("https://buildathon2-backend.onrender.com")).toBe(
      "https://buildathon2-backend.onrender.com/api"
    );
  });

  it("does not duplicate the API prefix and removes a trailing slash", () => {
    expect(resolveApiBaseUrl("https://buildathon2-backend.onrender.com/api/")).toBe(
      "https://buildathon2-backend.onrender.com/api"
    );
  });
});
