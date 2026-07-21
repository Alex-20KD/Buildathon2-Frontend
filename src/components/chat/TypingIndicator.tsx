import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
        <Bot className="h-[18px] w-[18px]" />
      </span>
      <div className="flex items-center gap-1 rounded-app border border-border bg-white px-4 py-3.5 shadow-app-sm">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50" />
      </div>
    </div>
  );
}
