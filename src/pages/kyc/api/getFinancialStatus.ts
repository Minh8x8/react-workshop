import {
  getProfile,
  type ProfileResponse,
} from "@pages/profile/apis/getProfile";

export type FinancialStatusResponse = ProfileResponse;

export const getFinancialStatus = async (
  userId: number | string
): Promise<FinancialStatusResponse> => {
  return getProfile(userId);
};
