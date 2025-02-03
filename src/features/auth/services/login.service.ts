import API from "@/config/api/config";
import { AxiosError } from "axios";
import { User, UserRole } from "@/config/types/auth.types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<ApiResponse<User>> => {
  if (!email || !password) {
    return {
      success: false,
      error: "El email y la contraseña son obligatorios.",
    };
  }

  try {
    const response = await API.post<User>("/auth/login", { email, password });

    if (
      response.data.userRoles.find(
        (role: UserRole) => role.role.name === "ADMIN"
      ) === undefined
    ) {
      return {
        success: false,
        error: "No tienes permisos para acceder a esta aplicación.",
      };
    }
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    const error = err as AxiosError;

    if (error.response) {
      // Accedemos a error.response para manejar los códigos de estado de la API
      const status = error.response.status;

      if (status === 400) {
        return {
          success: false,
          error:
            error.response.data.message ||
            "Credenciales inválidas. Por favor, verifica tu email y contraseña.",
        };
      }

      if (status === 401) {
        return {
          success: false,
          error:
            "Credenciales inválidas. Por favor, verifica tu email y contraseña.",
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
      // error.request se llena cuando la solicitud se hizo pero no hubo respuesta
      return {
        success: false,
        error:
          "No se pudo conectar al servidor. Verifica tu conexión a internet.",
      };
    }

    // Otros errores (e.g., errores de configuración)
    return {
      success: false,
      error: `Error inesperado: ${error.message}`,
    };
  }
};
