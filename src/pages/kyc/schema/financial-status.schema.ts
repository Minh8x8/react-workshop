import { z } from "zod";

const numberAmount = z
  .union([z.number().nonnegative("Amount must be 0 or greater"), z.nan()])
  .transform((value) => (Number.isNaN(value) ? undefined : value))
  .optional();

const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().optional(),
  type: z.string().optional(),
});

const emailSchema = z.object({
  email: z.string().email("Invalid email"),
  type: z.string().optional(),
  preferred: z.string().optional(),
});

const phoneSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  type: z.string().optional(),
  preferred: z.string().optional(),
});

const amountSchema = z.object({
  type: z.string().min(1, "Type is required"),
  amount: numberAmount,
});

export const financialStatusSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  birthDate: z.string().optional(),
  age: z.number().optional(),
  addresses: z.array(addressSchema).min(1, "At least one address is required"),
  emails: z.array(emailSchema).min(1, "At least one email is required"),
  phones: z.array(phoneSchema).min(1, "At least one phone number is required"),
  identificationDocuments: z
    .array(
      z.object({
        type: z.string().min(1, "Document type is required"),
        expiryDate: z.string().optional(),
        documentId: z.string().optional(),
      })
    )
    .default([]),
  occupations: z
    .array(
      z.object({
        title: z.string().min(1, "Occupation is required"),
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
      })
    )
    .default([]),
  incomes: z.array(amountSchema).default([]),
  assets: z.array(amountSchema).default([]),
  liabilities: z.array(amountSchema).default([]),
  wealthSources: z.array(amountSchema).default([]),
  netWorthTotal: z
    .union([z.number().nonnegative("Amount must be 0 or greater"), z.nan()])
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .optional()
    .default(0),
  investmentExperience: z.string().optional(),
  riskTolerance: z.string().optional(),
});

export type FinancialStatusForm = z.input<typeof financialStatusSchema>;
