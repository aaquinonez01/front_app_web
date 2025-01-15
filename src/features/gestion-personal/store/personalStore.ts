import { User } from "@/config/types/users.types";
import { create } from "zustand";
import { getPersonal } from "../services/getPersonal.service";

interface PersonalState {
  personal: User[];
  loading: boolean;
  errorMessage: string;
  onePersonal: User;
  page: number;
  totalPages: number;
  totalElements: number;
  limit: number;
  addPersonal: (personal: User) => void;
  updatePersonal: (personal: User) => void;
  deletePersonal: (id: string) => void;
  getPersonal: (page: number, limit: number) => void;
  getOnePersonal: (id: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goPage: (page: number) => void;
}

export const usePersonalStore = create<PersonalState>((set, get) => ({
  personal: [],
  loading: false,
  errorMessage: "",
  onePersonal: {} as User,
  page: 0,
  totalPages: 0,
  totalElements: 0,
  limit: 10,
  addPersonal: (personal: User) =>
    set((state) => ({ personal: [...state.personal, personal] })),
  updatePersonal: (personal: User) =>
    set((state) => ({
      personal: state.personal.map((p) =>
        p.id === personal.id ? personal : p
      ),
    })),
  deletePersonal: (id: string) =>
    set((state) => ({
      personal: state.personal.filter((p) => p.id !== id),
    })),
  getPersonal: async (page: number, limit: number) => {
    set({ loading: true });
    const response = await getPersonal(page, limit);
    if (response.success && response.data) {
      set({
        personal: response.data?.data,
        totalPages: response.data?.meta.totalPages,
        limit: response.data?.meta.limit,
        page: response.data?.meta.page,
        loading: false,
      });
    } else {
      set({ errorMessage: response.error, loading: false });
    }
  },
  getOnePersonal: async (id: number) => {
    set({ loading: true });
    try {
      const response = await fetch(`http://localhost:3000/personal/${id}`);
      const data = await response.json();
      set({ onePersonal: data, loading: false });
    } catch (error) {
      set({ errorMessage: error.message, loading: false });
    }
  },
  nextPage: async () => {
    set({ loading: true });
    const { page, limit } = get();
    const response = await getPersonal(page + 1, limit);
    if (response.success && response.data) {
      set({
        personal: response.data?.data,
        totalPages: response.data?.meta.totalPages,
        limit: response.data?.meta.limit,
        page: response.data?.meta.page,
        loading: false,
      });
    } else {
      set({ errorMessage: response.error, loading: false });
    }
  },
  previousPage: async () => {
    set({ loading: true });
    const { page, limit } = get();
    const response = await getPersonal(page - 1, limit);
    if (response.success && response.data) {
      set({
        personal: response.data?.data,
        totalPages: response.data?.meta.totalPages,
        limit: response.data?.meta.limit,
        page: response.data?.meta.page,
        loading: false,
      });
    } else {
      set({ errorMessage: response.error, loading: false });
    }
  },
  goPage: async (page: number) => {
    set({ loading: true });
    const { limit } = get();
    const response = await getPersonal(page, limit);
    if (response.success && response.data) {
      set({
        personal: response.data?.data,
        totalPages: response.data?.meta.totalPages,
        limit: response.data?.meta.limit,
        page: response.data?.meta.page,
        loading: false,
      });
    } else {
      set({ errorMessage: response.error, loading: false });
    }
  },
}));
