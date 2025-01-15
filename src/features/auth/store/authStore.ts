import { create } from "zustand";
import { login } from "../services/login.service";
import { checkStatus } from "../services/checking-status.service";
import { User } from "@/config/types/auth.types";

interface AuthState {
  user: User | null;
  errorMessage: string | null;
  status: "checking" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => void;
  logout: () => void;
  checkAuthentication: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  errorMessage: null,
  status: "checking",
  login: async (email, password) => {
    const response = await login(email, password);
    if (response.success && response.data) {
      localStorage.setItem("token", response.data.token);
      set({ user: response.data, status: "authenticated" });
    } else {
      set({ errorMessage: response.error, status: "unauthenticated" });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, status: "unauthenticated" });
  },
  checkAuthentication: () => {
    set({ status: "checking" });
    const token = localStorage.getItem("token");
    if (token) {
      checkStatus().then((response) => {
        if (response.success && response.data) {
          set({ user: response.data, status: "authenticated" });
        } else {
          set({ status: "unauthenticated" });
        }
      });
      // Aquí se debería hacer una petición a la API para verificar si el token es válido
      // y obtener la información del usuario
    } else {
      set({ status: "unauthenticated" });
    }
  },
}));
