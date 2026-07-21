import { useCallback, useEffect, useRef, useState } from "react";

interface BrowserSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;

  const browserWindow = window as SpeechRecognitionWindow;
  return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition;
}

export function getSpeechRecognitionErrorMessage(error: string): string {
  switch (error) {
    case "not-allowed":
    case "service-not-allowed":
      return "Permite el acceso al micrófono para usar el dictado por voz.";
    case "no-speech":
      return "No se detectó audio. Intenta hablar de nuevo.";
    case "audio-capture":
      return "No encontramos un micrófono disponible en este dispositivo.";
    case "language-not-supported":
      return "El navegador no admite el dictado en español ecuatoriano.";
    case "network":
      return "No fue posible transcribir el audio. Verifica tu conexión e inténtalo otra vez.";
    default:
      return "No fue posible iniciar el dictado por voz. Inténtalo nuevamente.";
  }
}

export function useSpeechRecognition(onTranscript: (transcript: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  const manualStopRef = useRef(false);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;
      recognitionRef.current = null;

      if (recognition) {
        recognition.onstart = null;
        recognition.onend = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.abort();
      }
    };
  }, []);

  const stopListening = useCallback(() => {
    manualStopRef.current = true;
    recognitionRef.current?.stop();
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      setError("El dictado por voz no está disponible en este navegador.");
      return;
    }

    if (recognitionRef.current) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "es-EC";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    manualStopRef.current = false;
    setError("");
    setInterimTranscript("");

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let nextInterimTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript ?? "";

        if (result.isFinal) {
          finalTranscript += transcript;
        } else {
          nextInterimTranscript += transcript;
        }
      }

      setInterimTranscript(nextInterimTranscript.trim());

      const completedTranscript = finalTranscript.trim();
      if (completedTranscript) {
        onTranscriptRef.current(completedTranscript);
        setInterimTranscript("");
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted" || !manualStopRef.current) {
        setError(getSpeechRecognitionErrorMessage(event.error));
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      manualStopRef.current = false;
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setError("No fue posible iniciar el dictado por voz. Inténtalo nuevamente.");
    }
  }, []);

  return {
    isSupported: Boolean(getSpeechRecognitionConstructor()),
    isListening,
    interimTranscript,
    error,
    startListening,
    stopListening,
  };
}
