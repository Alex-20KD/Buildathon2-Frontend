import { useCallback, useEffect, useRef, useState } from "react";

function getSpeechSynthesis(): SpeechSynthesis | undefined {
  if (typeof window === "undefined") return undefined;
  return window.speechSynthesis;
}

export function getSpeechSynthesisErrorMessage(error: string): string {
  switch (error) {
    case "not-allowed":
      return "El navegador bloqueó la reproducción de audio.";
    case "audio-busy":
      return "El dispositivo de audio está ocupado. Inténtalo de nuevo.";
    case "language-unavailable":
    case "voice-unavailable":
      return "No hay una voz en español disponible en este navegador.";
    case "network":
      return "No fue posible reproducir el mensaje. Verifica tu conexión e inténtalo otra vez.";
    default:
      return "No fue posible reproducir el mensaje. Inténtalo nuevamente.";
  }
}

export function useSpeechSynthesis() {
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stopSpeaking = useCallback(() => {
    getSpeechSynthesis()?.cancel();
    utteranceRef.current = null;
    setSpeakingMessageId(null);
  }, []);

  useEffect(() => stopSpeaking, [stopSpeaking]);

  const speak = useCallback((messageId: string, text: string) => {
    const speechSynthesis = getSpeechSynthesis();

    if (!speechSynthesis) {
      setError("La lectura en voz alta no está disponible en este navegador.");
      return;
    }

    if (speakingMessageId === messageId) {
      stopSpeaking();
      return;
    }

    speechSynthesis.cancel();
    setError("");

    const utterance = new SpeechSynthesisUtterance(text);
    const spanishVoice = speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith("es"));

    utterance.lang = "es-EC";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.voice = spanishVoice ?? null;

    const finishSpeaking = () => {
      if (utteranceRef.current !== utterance) return;

      utteranceRef.current = null;
      setSpeakingMessageId(null);
    };

    utterance.onend = finishSpeaking;
    utterance.onerror = (event) => {
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setError(getSpeechSynthesisErrorMessage(event.error));
      }

      finishSpeaking();
    };

    utteranceRef.current = utterance;
    setSpeakingMessageId(messageId);
    speechSynthesis.speak(utterance);
  }, [speakingMessageId, stopSpeaking]);

  return {
    isSupported: Boolean(getSpeechSynthesis()),
    speakingMessageId,
    error,
    speak,
    stopSpeaking,
  };
}
