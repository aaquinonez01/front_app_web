import { create } from "zustand";
import { HistoriaClinica } from "@/config/types/historia-clinica.types";
import { getHistoriaClinicaByCedula } from "@/features/historial-medical/services/get-historia.service";
interface HistorialState {
  historiaClinica: HistoriaClinica | null;
  setHistoriaClinica: (historiaClinica: HistoriaClinica | null) => void;
  obtenerHistoriaClinica: (cedula: string) => void;
  loading: boolean;
}

export const useHistorialStore = create<HistorialState>((set) => ({
  historiaClinica: null,
  loading: false,
  setHistoriaClinica: (historiaClinica) => {
    set({ historiaClinica });
  },
  obtenerHistoriaClinica: async (cedula: string) => {
    // Aquí se debería hacer una petición a la API para obtener la historia clínica
    // del paciente con la cédula especificada
    set({ loading: true });
    const response = await getHistoriaClinicaByCedula(cedula);
    if (response.success && response.data) {
      console.log("Hola");
      console.log(response);
      set({ historiaClinica: response.data, loading: false });
    } else {
      console.log(response);
      set({ historiaClinica: null, loading: false });
    }
  },
}));
