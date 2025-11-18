import { ACCESS_TOKEN } from "../constant/auth";
import HttpInstance from "../http";

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export const login = async (params: LoginParams) => {
  return await HttpInstance.post<LoginResponse>("/auth/login", params);
};

export const getProfile = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const res = await HttpInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
