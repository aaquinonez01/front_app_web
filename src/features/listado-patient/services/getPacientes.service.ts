import API from "@/config/api/config";
import { ApiResponse } from "@/config/types/apiResponse.types";

import { Paciente, PacienteData } from "@/config/types/pacientes.types";
import { AxiosError } from "axios";

export const getPacientes = async (
  page: number,
  limit: number
): Promise<ApiResponse<PacienteData>> => {
  try {
    const response = await API.get<PacienteData>(
      `/patients/?page=${page}&limit=${limit}`,
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
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "No se pudo obtener los pacientes",
    };
  }
};

export const getPacienteByDni = async (
  dni: string
): Promise<ApiResponse<Paciente>> => {
  try {
    const response = await API.get<Paciente>(
      `/patients/find-by-dni`,

      {
        params: {
          dni: dni,
        },
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
      if (status === 404) {
        return {
          success: false,
          error: "No se encontró el paciente con el DNI ingresado",
        };
      }
    }
    console.error(error);
    return {
      success: false,
      error: "No se pudo obtener el paciente",
    };
  }
};
