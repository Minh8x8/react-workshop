import HttpInstance from "@http";
import { ACCESS_TOKEN } from "@constant/auth";

export interface GetUsersResponse {
  id: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  username: string;
  email: string;
  image: string;
  company: {
    name: string;
    title: string;
  };
}

export const getUsers = async (): Promise<GetUsersResponse[]> => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const response = await HttpInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Fetched users:", response);

  return response.data.users as GetUsersResponse[];
};
