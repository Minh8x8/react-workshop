import { type FinancialStatusForm } from "../schema/financial-status.schema";

export const postKYC = async (
  userId: number | string,
  payload: FinancialStatusForm
): Promise<{ success: true; userId: number | string; payload: FinancialStatusForm }> => {
  // Simulate latency and always succeed
  await new Promise((resolve) => setTimeout(resolve, 600));

  return { success: true, userId, payload };
};
