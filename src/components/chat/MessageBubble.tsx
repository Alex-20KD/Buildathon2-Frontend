import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatMessage } from "@/types";
import { cn } from "@/utils/cn";

export function MessageBubble({ message }: { message: ChatMessage }) {
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
        <p className={cn("mt-1.5 text-[11px]", isUser ? "text-white/70" : "text-text-muted")}>
          {new Date(message.timestamp).toLocaleTimeString("es-EC", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}
