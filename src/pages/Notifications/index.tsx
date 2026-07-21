import { notifications } from "@/data/notifications";
import { NotificationCard } from "@/components/cards/NotificationCard";

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Notificaciones</h1>
        <p className="mt-1 text-text-muted">
          Mantente al día con el estado de tus trámites y avisos importantes.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
