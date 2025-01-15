import API from "@/config/api/config";
import { ApiResponse } from "@/config/types/apiResponse.types";
import { HistoriaClinica } from "@/config/types/historia-clinica.types";

export const getHistoriaClinicaByCedula = async (
  cedula: string
): Promise<ApiResponse<HistoriaClinica>> => {
  try {
    const response = await API.get<HistoriaClinica>(
      `/hc/find-by-dni/${cedula}`
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "No se pudo obtener la historia clínica",
    };
  }
};
