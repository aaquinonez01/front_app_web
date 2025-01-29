import { Medic } from "@/config/types/medics.types";
import { create } from "zustand";
import { getMedics } from "../services/getMedics.service";

interface MedicState {
  medic: Medic | null;
  medics: Medic[] | [];
  getMedics: (page: number, limit: number) => Promise<void>;
  setMedic: (medic: string) => void;
  loading: boolean;
  errorMessage: string;
}

export const useMedicStore = create<MedicState>((set, get) => ({
  medic: null,
  medics: [],
  errorMessage: "",
  loading: false,
  getMedics: async (page, limit) => {
    set({ loading: true });
    const { success, data, error } = await getMedics(page, limit);
    if (success && data) {
      set({ medics: data.data });
    } else {
      set({ errorMessage: error });
    }
  },
  setMedic: (medic) => {
    const selectedMedic = get().medics.find((m) => m.id === medic);
    set({ medic: selectedMedic });
  },
}));
