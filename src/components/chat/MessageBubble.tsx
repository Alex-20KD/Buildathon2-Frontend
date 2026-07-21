import { Bot, Square, User, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatMessage } from "@/types";
import { cn } from "@/utils/cn";

interface MessageBubbleProps {
  message: ChatMessage;
  isSpeaking?: boolean;
  isSpeechSynthesisSupported?: boolean;
  onSpeak?: (messageId: string, text: string) => void;
}

export function MessageBubble({
  message,
  isSpeaking = false,
  isSpeechSynthesisSupported = false,
  onSpeak,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-white" : "bg-primary-light text-primary"
        )}
      >
        {isUser ? <User className="h-[18px] w-[18px]" /> : <Bot className="h-[18px] w-[18px]" />}
      </span>
      <div
        className={cn(
          "max-w-[75%] rounded-app px-4 py-3 text-sm shadow-app-sm",
          isUser ? "bg-primary text-white" : "bg-white text-text border border-border"
        )}
      >
        <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
        <div className="mt-1.5 flex items-center justify-between gap-3">
          <p className={cn("text-[11px]", isUser ? "text-white/70" : "text-text-muted")}>
            {new Date(message.timestamp).toLocaleTimeString("es-EC", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {!isUser && isSpeechSynthesisSupported ? (
            <button
              type="button"
              onClick={() => onSpeak?.(message.id, message.content)}
              aria-label={isSpeaking ? "Detener lectura en voz alta" : "Escuchar respuesta"}
              title={isSpeaking ? "Detener audio" : "Escuchar respuesta"}
              className={cn(
                "inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30",
                isSpeaking
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary-light"
              )}
            >
              {isSpeaking ? <Square className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              {isSpeaking ? "Detener" : "Escuchar"}
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
