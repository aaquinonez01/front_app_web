import { create } from "zustand";
import { Appointment, Meta } from "@/config/types/citas.types";
import {
  getAppointments,
  getAppointmentsByMedic,
} from "../services/getAppointments.service";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

interface AppointmentState {
  appointments: Appointment[] | [];
  meta: Meta;
  events: CalendarEvent[];
  selectedAppointment: Appointment | null;
  selectAppointment: (id: string) => void;
  getAppointments: (page: number, limitPerPage: number) => Promise<void>;
  getAppointmentByMedic: (id: string) => void;
  setMeta: ({ limit, page }: { limit: number; page: number }) => void;
  loading: boolean;
  errorMessage: string;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  meta: {
    page: 0,
    limitPerPage: 10,
    totalPages: 0,
  },
  events: [],
  selectedAppointment: null,
  selectAppointment: (id: string) => {
    const appointment = get().appointments.find(
      (appointment) => appointment.id === id
    );
    set({ selectedAppointment: appointment });
  },
  getAppointments: async (page, limitPerPage) => {
    set({ loading: true });
    const { success, data, error } = await getAppointments(page, limitPerPage);
    if (success && data) {
      const events = data.data.map((appointment) => {
        const [hours, minutes] = appointment.appointmentTime.split(":");
        const start = new Date(appointment.date);
        start.setHours(Number(hours), Number(minutes));
        console.log(start);
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        return {
          id: appointment.id,
          title: appointment.patient,
          start: start,
          end: end,
          allDay: false,
        };
      });
      console.log(events);
      set({
        appointments: data.data || [],
        meta: data.meta,
        loading: false,
        events,
      });
    } else {
      set({ errorMessage: error, loading: false });
    }
  },
  getAppointmentByMedic: async (id: string) => {
    set({ loading: true });
    const { success, data, error } = await getAppointmentsByMedic(id);
    if (success && data) {
      const events = data.data.map((appointment: Appointment) => {
        const [hours, minutes] = appointment.appointmentTime.split(":");
        const start = new Date(appointment.date);
        start.setHours(Number(hours), Number(minutes));
        console.log(start);
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        return {
          id: appointment.id,
          title: appointment.patient,
          start: start,
          end: end,
          allDay: false,
        };
      });
      console.log(events);
      set({
        appointments: data.data || [],
        meta: data.meta,
        loading: false,
        events,
      });
    } else {
      set({ errorMessage: error, loading: false });
    }
  },

  setMeta: ({ limit, page }) => {
    set((state) => ({
      meta: {
        ...state.meta,
        limitPerPage: limit,
        page,
      },
    }));
  },
  loading: false,
  errorMessage: "",
}));
