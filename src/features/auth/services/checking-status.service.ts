import API from "@/config/api/config";
import { User } from "@/config/types/auth.types";
import { AxiosError } from "axios";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const checkStatus = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await API.get<User>("/auth/check-status", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    const error = err as AxiosError;

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        return {
          success: false,
          error: "No estás autorizado para acceder a esta información.",
        };
      }

      if (status >= 500) {
        return {
          success: false,
          error:
            "Error interno del servidor. Por favor, intenta nuevamente más tarde.",
        };
      }

      return {
        success: false,
        error: `Error inesperado: ${
          error.response.data || "Error desconocido"
        }`,
      };
    } else if (error.request) {
      return {
        success: false,
        error:
          "No se pudo conectar con el servidor. Por favor, intenta nuevamente más tarde.",
      };
    } else {
      return {
        success: false,
        error: "Error desconocido. Por favor, intenta nuevamente más tarde.",
      };
    }
  }
};
