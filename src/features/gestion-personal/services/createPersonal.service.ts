import API from "@/config/api/config";
import { ApiResponse } from "@/config/types/apiResponse.types";
import { Personalregister } from "@/config/types/personalRegister.types";
import { RegisterMedicResponse } from "@/config/types/registerMedicResponse";

export const createPersonal = async (
  data: Personalregister, role: string
): Promise<ApiResponse<RegisterMedicResponse>> => {
  try {
    const response = await API.post<RegisterMedicResponse>(
      `/auth/register-medic/ ${role}`,
      data,
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
      error: "No se pudo crear el personal",
    };
  }
};
