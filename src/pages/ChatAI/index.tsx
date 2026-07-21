import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Mic, Send, Square } from "lucide-react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { frequentQuestions } from "@/data/chatResponses";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { getAssistantErrorMessage, sendAssistantMessage } from "@/services/chatService";
import type { ChatMessage } from "@/types";
import { Button } from "@/components/ui";

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hola 👋 Soy PortoAsiste IA. Estoy listo para orientarte sobre los trámites del GAD Municipal de Portoviejo.",
  timestamp: new Date().toISOString(),
};

function createSessionId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `session-${Date.now()}`;
}

export default function ChatAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(createSessionId());

  const handleVoiceTranscript = useCallback((transcript: string) => {
    setInput((currentInput) => [currentInput.trim(), transcript].filter(Boolean).join(" "));
  }, []);

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

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || isTyping) return;

    const userMessage: ChatMessage = {
      id: createSessionId(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await sendAssistantMessage(message, sessionIdRef.current);
      sessionIdRef.current = response.session_id;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createSessionId(),
          role: "assistant",
          content: response.response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createSessionId(),
          role: "assistant",
          content: getAssistantErrorMessage(error),
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl flex-col px-4 py-6 sm:px-6 lg:h-screen lg:flex-row lg:gap-6 lg:px-8 lg:py-8">
      <div className="flex flex-1 flex-col overflow-hidden rounded-app border border-border bg-white shadow-app-sm">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-text">PortoAsiste IA</p>
            <p className="text-xs text-success">● En línea</p>
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
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe o dicta tu consulta sobre trámites municipales..."
              className="h-11 flex-1 rounded-app border border-border bg-surface-muted px-4 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isTyping}
            />
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
            <Button type="submit" size="icon" aria-label="Enviar mensaje" disabled={isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <p aria-live="polite" className="mt-2 min-h-5 text-xs text-text-muted">
            {isListening
              ? interimTranscript
                ? `Escuchando: ${interimTranscript}`
                : "Escuchando..."
              : speechRecognitionError ||
                speechSynthesisError ||
                (!isSpeechRecognitionSupported
                  ? "El dictado por voz no está disponible en este navegador."
                  : "")}
          </p>
        </div>
      </div>

      <aside className="mt-6 w-full shrink-0 rounded-app border border-border bg-white p-5 shadow-app-sm lg:mt-0 lg:w-72">
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
      </aside>
    </div>
  );
}
