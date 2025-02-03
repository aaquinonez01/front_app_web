import { create } from "zustand";
import {
  getPacientes,
  getPacienteByDni,
} from "../services/getPacientes.service";
import { Paciente } from "@/config/types/pacientes.types";
import { toast } from "sonner";

interface PacienteState {
  paciente: Paciente | null;
  pacientes: Paciente[];
  page: number;
  totalPages: number;
  totalElements: number;
  limit: number;
  loading: boolean;
  getPacientes: (page: number, limit: number) => void;
  getPacienteByDni: (dni: string) => Promise<boolean>;
  nextPage: () => void;
  previousPage: () => void;
  goPage: (page: number) => void;
  setPaciente: (paciente: Paciente) => void;
}

export const usePacienteStore = create<PacienteState>((set) => ({
  paciente: null,
  pacientes: [],
  page: 0,
  totalPages: 0,
  totalElements: 0,
  limit: 10,
  loading: false,
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  previousPage: () => set((state) => ({ page: state.page - 1 })),
  goPage: (page) => set({ page }),
  getPacientes: async (page: number, limit: number) => {
    set({ loading: true });
    const response = await getPacientes(page, limit);
    if (response.success && response.data) {
      set({
        pacientes: response.data.data,
        totalPages: response.data.meta.totalPages,
        limit: response.data.meta.limitPerPage,
        page: response.data.meta.page,
        loading: false,
      });
    } else {
      console.error(response.error);
      set({ loading: false });
    }
  },
  getPacienteByDni: async (dni: string): Promise<boolean> => {
    try {
      set({ loading: true });
      const response = await getPacienteByDni(dni);

      if (response.success && response.data) {
        set({ paciente: response.data, loading: false });

        toast.success(`Paciente con DNI ${dni} encontrado`);
        return true; // Retorna true si se encontró el paciente
      } else {
        set({ loading: false });

        const errorMessage = response.error || "No se encontró el paciente";
        toast.error(`Error: ${errorMessage}`);
        return false; // Retorna false si no se encontró el paciente
      }
    } catch (error) {
      set({ loading: false });

      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error(`Error: ${errorMessage}`);
      return false; // Retorna false si hubo un error en la petición
    }
  },

  setPaciente: (paciente) => set({ paciente }),
}));
