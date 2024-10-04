import { LoginValues } from "../pages/login/LoginPage";
import { LoginUserResponse } from "../types/auth.type";
import { axiosInstance } from "../utils/axios";
import { API_SUFFIX } from "./utils.api";

export const authApi = {
  login: (data: LoginValues) =>
    axiosInstance.post<LoginUserResponse>(`${API_SUFFIX.AUTH_API.LOGIN}`, data),
};
