import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, IdCard, Mic, Send, Square } from "lucide-react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { frequentQuestions } from "@/data/chatResponses";
import { useAuth } from "@/hooks/useAuth";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { getAssistantErrorMessage, sendAssistantMessage } from "@/services/chatService";
import type { AuthUser, ChatMessage } from "@/types";
import { maskCedula } from "@/utils/citizenIdentity";
import { cedulaSchema } from "@/utils/validation";
import { Button } from "@/components/ui";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `message-${Date.now()}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

function createWelcomeMessage(user: AuthUser | null): ChatMessage {
  if (user) {
    return createMessage(
      "assistant",
      `¡Bienvenido/a, ${user.fullName}! Soy PortoAsiste IA. ¿En qué trámite del GAD Municipal de Portoviejo puedo orientarte?`
    );
  }

  return createMessage(
    "assistant",
    "Hola 👋 Antes de comenzar, indícame tu cédula ecuatoriana válida para continuar."
  );
}

function createSessionId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `session-${Date.now()}`;
}

export default function ChatAIPage() {
  const { login, user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage(user)]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(createSessionId());
  const welcomedCedulaRef = useRef<string | null>(user?.cedula ?? null);
  const isIdentifying = !user;

  const handleVoiceTranscript = useCallback(
    (transcript: string) => {
      setInput((currentInput) => {
        if (!user) return transcript.replace(/\D/g, "").slice(0, 10);

        return [currentInput.trim(), transcript].filter(Boolean).join(" ");
      });
    },
    [user]
  );

  const {
    error: speechRecognitionError,
    interimTranscript,
    isListening,
    isSupported: isSpeechRecognitionSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition(handleVoiceTranscript);
  const {
    error: speechSynthesisError,
    isSupported: isSpeechSynthesisSupported,
    speak,
    speakingMessageId,
  } = useSpeechSynthesis();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (user) {
      if (welcomedCedulaRef.current === user.cedula) return;

      welcomedCedulaRef.current = user.cedula;
      sessionIdRef.current = createSessionId();
      setMessages([createWelcomeMessage(user)]);
      return;
    }

    if (welcomedCedulaRef.current !== null) {
      welcomedCedulaRef.current = null;
      sessionIdRef.current = createSessionId();
      setMessages([createWelcomeMessage(null)]);
    }
  }, [user]);

  const identifyCitizen = (rawCedula: string) => {
    const result = cedulaSchema.safeParse(rawCedula);

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message ?? "Ingresa una cédula válida.";
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", errorMessage),
      ]);
      return;
    }

    const citizen = login(result.data);
    welcomedCedulaRef.current = citizen.cedula;
    sessionIdRef.current = createSessionId();
    setInput("");
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage("user", `Cédula registrada: ${maskCedula(citizen.cedula)}`),
      createWelcomeMessage(citizen),
    ]);
  };

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || isTyping) return;

    if (!user) {
      identifyCitizen(message);
      return;
    }

    const userMessage = createMessage("user", message);
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await sendAssistantMessage(message, sessionIdRef.current);
      sessionIdRef.current = response.session_id;
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", response.response),
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", getAssistantErrorMessage(error)),
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const statusMessage = isIdentifying
    ? "Ingresa tu cédula para habilitar las consultas del asistente."
    : isListening
      ? interimTranscript
        ? `Escuchando: ${interimTranscript}`
        : "Escuchando..."
      : speechRecognitionError || speechSynthesisError || "";

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl flex-col px-4 py-6 sm:px-6 lg:h-screen lg:flex-row lg:gap-6 lg:px-8 lg:py-8">
      <div className="flex flex-1 flex-col overflow-hidden rounded-app border border-border bg-white shadow-app-sm">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
            {isIdentifying ? <IdCard className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
          </span>
          <div>
            <p className="text-sm font-semibold text-text">
              {isIdentifying ? "Identificación ciudadana" : `PortoAsiste IA · ${user.fullName}`}
            </p>
            <p className={isIdentifying ? "text-xs text-primary" : "text-xs text-success"}>
              {isIdentifying ? "Cédula requerida" : "● Sesión activa"}
            </p>
          </div>
        </div>

        <div ref={scrollRef} className="scrollbar-thin flex-1 space-y-5 overflow-y-auto p-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isSpeaking={speakingMessageId === message.id}
              isSpeechSynthesisSupported={isSpeechSynthesisSupported}
              onSpeak={speak}
            />
          ))}
          {isTyping ? <TypingIndicator /> : null}
        </div>

        <div className="border-t border-border p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(input);
            }}
            className="flex items-center gap-3"
          >
            <input
              value={input}
              onChange={(event) => {
                const nextValue = event.target.value;
                setInput(isIdentifying ? nextValue.replace(/\D/g, "").slice(0, 10) : nextValue);
              }}
              placeholder={
                isIdentifying
                  ? "Ingresa tu cédula ecuatoriana válida"
                  : "Escribe o dicta tu consulta sobre trámites municipales..."
              }
              inputMode={isIdentifying ? "numeric" : undefined}
              maxLength={isIdentifying ? 10 : undefined}
              autoComplete="off"
              className="h-11 flex-1 rounded-app border border-border bg-surface-muted px-4 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isTyping}
              aria-label={isIdentifying ? "Cédula de identidad" : "Consulta para el asistente"}
            />
            {!isIdentifying ? (
              <Button
                type="button"
                variant={isListening ? "danger" : "outline"}
                size="icon"
                aria-label={isListening ? "Detener dictado por voz" : "Dictar mensaje por voz"}
                title={isListening ? "Detener dictado" : "Dictar mensaje"}
                aria-pressed={isListening}
                disabled={isTyping || !isSpeechRecognitionSupported}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            ) : null}
            <Button
              type="submit"
              size="icon"
              aria-label={isIdentifying ? "Continuar con cédula" : "Enviar mensaje"}
              disabled={isTyping || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <p aria-live="polite" className="mt-2 min-h-5 text-xs text-text-muted">
            {statusMessage}
          </p>
        </div>
      </div>

      <aside className="mt-6 w-full shrink-0 rounded-app border border-border bg-white p-5 shadow-app-sm lg:mt-0 lg:w-72">
        {isIdentifying ? (
          <div className="rounded-app bg-primary-light p-4">
            <IdCard className="h-6 w-6 text-primary" />
            <h2 className="mt-3 text-sm font-semibold text-text">Primero, tu cédula</h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              Escríbela en el chat para continuar. No se envía al asistente como una consulta.
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-sm font-semibold text-text">Consultas frecuentes</h2>
            <div className="flex flex-col gap-2">
              {frequentQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => void sendMessage(question.question)}
                  disabled={isTyping}
                  className="rounded-app border border-border px-4 py-2.5 text-left text-sm text-text-muted transition-colors hover:border-primary/40 hover:bg-primary-light hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {question.label}
                </button>
              ))}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
