import API from "@/config/api/config";
import { ApiResponse } from "@/config/types/apiResponse.types";

import { PersonalResponse } from "@/config/types/users.types";

export const getPersonal = async (
  page: number,
  limit: number
): Promise<ApiResponse<PersonalResponse>> => {
  try {
    const response = await API.get<PersonalResponse>(
      `/auth/find-all-users/?page=${page}&limit=${limit}`,
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
      error: "No se pudo obtener el personal",
    };
  }
};
