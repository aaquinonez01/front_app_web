// components/ModernCalendar.tsx
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppointmentStore } from "../store/appointmentStore";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DayPicker } from "@/components/ui/daypicker";
import { WeekPicker } from "@/components/ui/weekpicker";
import { MonthPicker } from "@/components/ui/monthpicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMedicStore } from "../store/medicStore";

const locales = {
  "es-ES": es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export const CalendarAppointment = () => {
  const events = useAppointmentStore((state) => state.events);
  const getAppointmentsByMedic = useAppointmentStore(
    (state) => state.getAppointmentByMedic
  );
  const medics = useMedicStore((state) => state.medics);
  const selectEvent = useAppointmentStore((state) => state.selectAppointment);
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleMedicChange = (medicId: string) => {
    getAppointmentsByMedic(medicId);
  };

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Agenda de Citas</h1>

        <div className="w-1/3">
          {currentView === "day" && (
            <DayPicker value={currentDate} onChange={handleDateChange} />
          )}
          {currentView === "week" && (
            <WeekPicker value={currentDate} onChange={handleDateChange} />
          )}
          {currentView === "month" && (
            <MonthPicker value={currentDate} onChange={handleDateChange} />
          )}
        </div>
        <div>
          <Select onValueChange={(value) => handleMedicChange(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccione Un Medico" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Medicos</SelectLabel>
                {medics.map((medic) => (
                  <SelectItem key={medic.id} value={medic.id}>
                    {medic.firstname} {medic.lastname}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleViewChange("day")}>Día</Button>
          <Button onClick={() => handleViewChange("week")}>Semana</Button>
          <Button onClick={() => handleViewChange("month")}>Mes</Button>
        </div>
      </div>

      <Calendar
        className="bg-white rounded-lg shadow-md"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "75vh" }}
        view={currentView}
        date={currentDate}
        onView={handleViewChange}
        min={new Date(0, 0, 0, 5, 0)}
        onNavigate={handleDateChange}
        onSelectEvent={(event) => selectEvent(event.id)}
        toolbar={false}
      />
    </div>
  );
};
