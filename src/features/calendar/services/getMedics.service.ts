import API from "@/config/api/config";
import { ApiResponse } from "@/config/types/apiResponse.types";
import { Medics } from "@/config/types/medics.types";
import { AxiosError } from "axios";

export const getMedics = async (
  page: number,
  limitPerPage: number
): Promise<ApiResponse<Medics>> => {
  try {
    const response = await API.get<Medics>(
      `/medics/?page=${page}&limit=${limitPerPage}`,
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
          error: "No se encontraron médicos.",
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
