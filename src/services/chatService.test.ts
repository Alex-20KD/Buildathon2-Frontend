import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./api", () => ({
  api: {
    post: vi.fn(),
  },
}));

import { api } from "./api";
import { getAssistantErrorMessage, sendAssistantMessage } from "./chatService";

const apiPost = vi.mocked(api.post);

describe("chatService", () => {
  beforeEach(() => {
    apiPost.mockReset();
  });

  it("uses the FastAPI chat contract and returns its response", async () => {
    apiPost.mockResolvedValue({
      data: {
        response: "Puedes iniciar el trámite en línea.",
        tramite_detectado: "Patente Municipal",
        session_id: "session-123",
      },
    } as never);

    const result = await sendAssistantMessage("Necesito una patente", "session-123");

    expect(apiPost).toHaveBeenCalledWith("/chat", {
      message: "Necesito una patente",
      session_id: "session-123",
    });
    expect(result.response).toBe("Puedes iniciar el trámite en línea.");
    expect(result.session_id).toBe("session-123");
  });

  it("shows a safe message when the AI provider is unavailable", () => {
    const error = {
      isAxiosError: true,
      response: { status: 503, data: { detail: "OPENAI_API_KEY no está configurada." } },
    };

    expect(getAssistantErrorMessage(error)).toContain("temporalmente no disponible");
  });
});
