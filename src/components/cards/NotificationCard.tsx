import { useMemo } from "react";
import type { AppNotification } from "@/types";
import { getIcon } from "@/utils/getIcon";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/Badge";

export function NotificationCard({ notification }: { notification: AppNotification }) {
  const Icon = useMemo(() => getIcon(notification.icon), [notification.icon]);
  const date = new Date(notification.date);

  return (
    <div className="flex gap-4 rounded-app border border-border bg-white p-4 shadow-app-sm">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          notification.status === "no_leido" ? "bg-primary-light text-primary" : "bg-surface-muted text-text-muted"
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-text">{notification.message}</p>
          <Badge variant={notification.status === "no_leido" ? "primary" : "default"}>
            {notification.status === "no_leido" ? "No leído" : "Leído"}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-text-muted">
          {date.toLocaleDateString("es-EC", { day: "2-digit", month: "long", year: "numeric" })}
          {" · "}
          {date.toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
