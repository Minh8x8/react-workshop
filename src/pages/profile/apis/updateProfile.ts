import { type GeneralInfoForm } from "../schema/general-information.schema";

export const updateProfile = async (
  userId: number | string,
  payload: GeneralInfoForm
): Promise<GeneralInfoForm & { id: number }> => {
  // Mock API call to simulate latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  return { ...payload, id: Number(userId) };
};
