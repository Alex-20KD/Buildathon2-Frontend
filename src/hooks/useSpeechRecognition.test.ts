import { describe, expect, it } from "vitest";
import { getSpeechRecognitionErrorMessage } from "./useSpeechRecognition";

describe("speech recognition errors", () => {
  it("explains when the browser microphone permission is denied", () => {
    expect(getSpeechRecognitionErrorMessage("not-allowed")).toContain("micrófono");
  });

  it("explains when no voice is detected", () => {
    expect(getSpeechRecognitionErrorMessage("no-speech")).toContain("No se detectó audio");
  });
});
