import { z } from "zod";

export const generalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().optional(),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().optional(),
  birthday: z.string().optional(),
  organization: z.string().optional(),
  role: z.string().optional(),
  department: z.string().optional(),
  zipPostalCode: z.string().optional(),
});

export type GeneralInfoForm = z.infer<typeof generalInfoSchema>;
