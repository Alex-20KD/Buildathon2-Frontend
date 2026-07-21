import { useEffect, useRef, useState } from "react";
import { Send, Bot } from "lucide-react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { frequentQuestions, getSimulatedResponse } from "@/data/chatResponses";
import type { ChatMessage } from "@/types";
import { Button } from "@/components/ui";

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hola 👋 Soy PortoAsiste IA. Estoy listo para ayudarte con cualquier trámite del GAD Municipal de Portoviejo.",
  timestamp: new Date().toISOString(),
};

export default function ChatAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getSimulatedResponse(text),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1100);
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
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-3 border-t border-border p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta sobre trámites municipales..."
            className="h-11 flex-1 rounded-app border border-border bg-surface-muted px-4 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <Button type="submit" size="icon" aria-label="Enviar mensaje">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <aside className="mt-6 w-full shrink-0 rounded-app border border-border bg-white p-5 shadow-app-sm lg:mt-0 lg:w-72">
        <h2 className="mb-4 text-sm font-semibold text-text">Consultas frecuentes</h2>
        <div className="flex flex-col gap-2">
          {frequentQuestions.map((fq) => (
            <button
              key={fq.id}
              onClick={() => sendMessage(fq.question)}
              className="rounded-app border border-border px-4 py-2.5 text-left text-sm text-text-muted transition-colors hover:border-primary/40 hover:bg-primary-light hover:text-primary"
            >
              {fq.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
