import { User } from "@/config/types/users.types";
import { create } from "zustand";
import { getPersonal } from "../services/getPersonal.service";
import { Personalregister } from "@/config/types/personalRegister.types";
import { createPersonal } from "../services/createPersonal.service";
import { toast } from "sonner";
interface PersonalState {
  personal: User[];
  isModalOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  loading: boolean;
  errorMessage: string;
  onePersonal: User;
  page: number;
  totalPages: number;
  totalElements: number;
  limit: number;
  savePersonal: (personal: Personalregister, role: string) => void;
  setOnePersonal: (personal: User | null) => void;
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
  isModalOpen: false,
  toggleModal: (isOpen: boolean) => set({ isModalOpen: isOpen }),
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
  savePersonal: async (personal: Personalregister, role: string) => {
    const personalPromise = async () => {
      set({ loading: true });

      try {
        const response = await createPersonal(personal, role);
        if (response.success && response.data) {
          set({ loading: false });
          return response.data; // Devolver los datos para la notificación de éxito
        } else {
          throw new Error(response.error || "Error desconocido");
        }
      } catch (error) {
        set({
          errorMessage: "Error Detectado, Verifique con l administrador",
          loading: false,
        });
        throw error; // Lanzar el error para que sea capturado por `toast.promise`
      }
    };

    toast.promise(personalPromise(), {
      loading: "Guardando usuario...",
      success: (data) => `${data.username} ha sido registrado exitosamente`,
      error: (error) => `Error: ${error.message}`,
    });
  },
  setOnePersonal: (personal: User | null) => {
    if (!personal) {
      set({ onePersonal: {} as User });
      return;
    }
    set({ onePersonal: personal });
  },
  getOnePersonal: async (id: number) => {
    set({ loading: true });
    console.log("id", id);
    // try {
    //   const response = await fetch(`http://localhost:3000/personal/${id}`);
    //   const data = await response.json();
    //   set({ onePersonal: data, loading: false });
    // } catch (error) {
    //   set({ errorMessage: response, loading: false });
    // }
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
