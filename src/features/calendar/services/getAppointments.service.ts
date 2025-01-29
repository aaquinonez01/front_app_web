import API from "@/config/api/config";
import { Appointments } from "@/config/types/citas.types";
import { ApiResponse } from "@/config/types/apiResponse.types";
import { AxiosError } from "axios";

export const getAppointments = async (
  page: number,
  limitPerPage: number
): Promise<ApiResponse<Appointments>> => {
  try {
    const response = await API.get<Appointments>("/appointments", {
      params: {
        page,
        limit: limitPerPage,
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
      if (status === 403) {
        return {
          success: false,
          error: "No estás autorizado para acceder a esta información.",
        };
      }
      if (status === 404) {
        return {
          success: false,
          error: "No se encontraron citas.",
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

export const getAppointmentsByMedic = async (
  id: string
): Promise<ApiResponse<Appointments>> => {
  try {
    const response = await API.get<Appointments>(
      `/appointments/find-by-medic/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        return {
          success: false,
          error: "No estás autorizado para acceder a esta información.",
        };
      }
      if (status === 404) {
        return {
          success: false,
          error: "No se encontraron citas.",
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
