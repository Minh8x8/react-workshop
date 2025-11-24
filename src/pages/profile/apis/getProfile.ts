export type ProfileResponse = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  gender?: string;
  email: string;
  phone?: string;
  username?: string;
  birthDate?: string;
  image?: string;
  role?: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    postalCode?: string;
    country?: string;
  };
  company?: {
    department?: string;
    name?: string;
    title?: string;
    address?: {
      address?: string;
      city?: string;
      state?: string;
      stateCode?: string;
      postalCode?: string;
      country?: string;
    };
  };
};

export const getProfile = async (
  userId: number | string
): Promise<ProfileResponse> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch profile information");
  }

  return (await response.json()) as ProfileResponse;
};
