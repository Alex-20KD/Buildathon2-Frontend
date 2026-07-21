import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { appointments as initialAppointments } from "@/data/appointments";
import { procedures } from "@/data/procedures";
import { AppointmentCard } from "@/components/cards/AppointmentCard";
import { Button, Input, Select } from "@/components/ui";
import { useToast } from "@/hooks/useToast";
import type { Appointment } from "@/types";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [procedureType, setProcedureType] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !procedureType) {
      showToast("Completa todos los campos para agendar tu cita", "error");
      return;
    }

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      procedureType,
      date,
      time,
      status: "pendiente",
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setDate("");
    setTime("");
    setProcedureType("");
    showToast("Cita agendada correctamente", "success");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Agendar Cita</h1>
        <p className="mt-1 text-text-muted">
          Reserva un horario para atención presencial en las oficinas municipales.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-app border border-border bg-white p-6 shadow-app-sm"
        >
          <div className="mb-2 flex items-center gap-2 text-text">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold">Nueva cita</h2>
          </div>

          <Select
            label="Tipo de trámite"
            placeholder="Selecciona un trámite"
            value={procedureType}
            onChange={(e) => setProcedureType(e.target.value)}
            options={procedures.map((p) => ({ value: p.name, label: p.name }))}
          />

          <Input
            label="Fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Input
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <Button type="submit" className="w-full" size="lg">
            Agendar
          </Button>
        </form>

        <div>
          <h2 className="mb-4 text-base font-semibold text-text">Mis próximas citas</h2>
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-sm text-text-muted">No tienes citas agendadas.</p>
            ) : (
              appointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
