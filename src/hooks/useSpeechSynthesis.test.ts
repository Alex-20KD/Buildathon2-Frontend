import { describe, expect, it } from "vitest";
import { getSpeechSynthesisErrorMessage } from "./useSpeechSynthesis";

describe("speech synthesis errors", () => {
  it("explains when the browser blocks audio playback", () => {
    expect(getSpeechSynthesisErrorMessage("not-allowed")).toContain("bloqueó");
  });

  it("explains when a Spanish voice is unavailable", () => {
    expect(getSpeechSynthesisErrorMessage("voice-unavailable")).toContain("español");
  });
});
