import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui";
import { toast } from "sonner";

import BasicInformation from "./components/BasicInformation";
import ContactInformation from "./components/ContactInformation";
import Emails from "./components/Emails";
import Phones from "./components/Phones";
import IdentificationDocuments from "./components/IdentificationDocuments";
import Occupations from "./components/Occupations";
import Incomes from "./components/Incomes";
import Assets from "./components/Assets";
import Liabilities from "./components/Liabilities";
import SourceOfWealth from "./components/SourceOfWealth";
import NetWorth from "./components/NetWorth";
import InvestmentExperienceAndObjectives from "./components/InvestmentExperienceAndObjectives";
import {
  financialStatusSchema,
  type FinancialStatusForm,
} from "./schema/financial-status.schema";
import { getFinancialStatus } from "./api/getFinancialStatus";
import { postKYC } from "./api/postKYC";
import { useAuthStore } from "@store/auth-store";

const formatDateInput = (dateString?: string) => {
  if (!dateString) return "";
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().split("T")[0];
};

const calculateAge = (birthDate?: string | null): number | undefined => {
  if (!birthDate) return undefined;
  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) return undefined;

  const today = new Date();
  let age = today.getFullYear() - parsed.getFullYear();
  const m = today.getMonth() - parsed.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < parsed.getDate())) {
    age--;
  }
  return age;
};

const emptyForm: FinancialStatusForm = {
  firstName: "",
  lastName: "",
  middleName: "",
  birthDate: "",
  age: undefined,
  addresses: [
    {
      address: "",
      country: "",
      city: "",
      postalCode: "",
      type: "",
    },
  ],
  emails: [
    {
      email: "",
      type: "",
      preferred: "",
    },
  ],
  phones: [
    {
      phone: "",
      type: "",
      preferred: "",
    },
  ],
  identificationDocuments: [],
  occupations: [],
  incomes: [],
  assets: [],
  liabilities: [],
  wealthSources: [],
  netWorthTotal: 0,
  investmentExperience: "",
  riskTolerance: "",
};

const mapProfileToForm = (
  profile: Awaited<ReturnType<typeof getFinancialStatus>>
): FinancialStatusForm => {
  const birthDate = formatDateInput(profile.birthDate);
  const age = calculateAge(profile.birthDate);

  return {
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    middleName: profile.maidenName ?? "",
    birthDate,
    age: age === undefined ? undefined : age,
    addresses: [
      {
        address: profile.address?.address ?? "",
        country: profile.address?.country ?? "",
        city: profile.address?.city ?? "",
        postalCode: profile.address?.postalCode ?? "",
        type: "Mailing",
      },
    ],
    emails: [
      {
        email: profile.email ?? "",
        type: "Work",
        preferred: "Yes",
      },
    ],
    phones: [
      {
        phone: profile.phone ?? "",
        type: "Mobile",
        preferred: "Yes",
      },
    ],
    identificationDocuments: [
      {
        type: "Passport",
        expiryDate: "",
        documentId: "N/A",
      },
    ],
    occupations: [
      {
        title: profile.company?.title ?? "Employee",
        fromDate: "",
        toDate: "",
      },
    ],
    incomes: [
      {
        type: "Salary",
        amount: 0,
      },
    ],
    assets: [
      {
        type: "Savings",
        amount: 0,
      },
    ],
    liabilities: [
      {
        type: "Personal Loan",
        amount: 0,
      },
    ],
    wealthSources: [
      {
        type: "Income",
        amount: 0,
      },
    ],
    netWorthTotal: 0,
    investmentExperience: "1-3 years",
    riskTolerance: "Moderate",
  };
};

const KYC = () => {
  const { id } = useParams();
  const authUser = useAuthStore((s) => s.user);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<FinancialStatusForm>(emptyForm);

  const userId = useMemo(() => {
    const fallbackId = authUser?.id ?? 1;
    const parsed = Number(id ?? fallbackId);
    return Number.isNaN(parsed) ? fallbackId : parsed;
  }, [authUser?.id, id]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FinancialStatusForm>({
    defaultValues: emptyForm,
    resolver: zodResolver(financialStatusSchema),
  });

  useEffect(() => {
    let ignore = false;
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await getFinancialStatus(userId);
        if (ignore) return;
        const mapped = mapProfileToForm(profile);
        reset(mapped);
        setLastSaved(mapped);
      } catch (error) {
        console.error("Failed to load KYC profile", error);
        if (!ignore) toast.error("Unable to load profile information");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    loadProfile();
    return () => {
      ignore = true;
    };
  }, [reset, userId]);

  const incomes = watch("incomes");
  const assets = watch("assets");
  const liabilities = watch("liabilities");
  const wealthSources = watch("wealthSources");
  const birthDate = watch("birthDate");
  const netWorthTotal = watch("netWorthTotal");

  useEffect(() => {
    const toNumber = (val: unknown) => {
      const num = Number(val);
      return Number.isFinite(num) ? num : 0;
    };
    const sum = (items: { amount?: number | null }[] = []) =>
      items.reduce((acc, item) => acc + toNumber(item?.amount), 0);

    const total =
      sum(incomes) + sum(assets) + sum(liabilities) + sum(wealthSources);

    setValue("netWorthTotal", total, { shouldDirty: false });
  }, [assets, incomes, liabilities, setValue, wealthSources]);

  useEffect(() => {
    const age = calculateAge(birthDate);
    setValue("age", age, { shouldDirty: false });
  }, [birthDate, setValue]);

  const onSubmit = async (values: FinancialStatusForm) => {
    if (!isEdit) return;
    try {
      await postKYC(userId, values);
      toast.success("KYC submitted successfully");
      setLastSaved(values);
      setIsEdit(false);
    } catch (error) {
      console.error("Failed to submit KYC", error);
      toast.error("Unable to submit KYC right now");
    }
  };

  const handleCancel = () => {
    reset(lastSaved);
    setIsEdit(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-center text-indigo-700 dark:text-indigo-300">
          Financial Status
        </h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={isEdit ? "outline" : "default"}
            onClick={() => setIsEdit((prev) => !prev)}
            disabled={isLoading}
          >
            {isEdit ? "View" : "Edit"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={!isEdit || isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <BasicInformation register={register} errors={errors} isEdit={isEdit} />

        <ContactInformation
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <Emails
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <Phones
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <IdentificationDocuments
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <Occupations
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <Incomes
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <Assets
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <Liabilities
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <SourceOfWealth
          control={control}
          register={register}
          errors={errors}
          isEdit={isEdit}
        />

        <NetWorth
          register={register}
          errors={errors}
          value={netWorthTotal}
        />

        <InvestmentExperienceAndObjectives
          register={register}
          isEdit={isEdit}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={!isEdit || isSubmitting || isLoading}>
            {isSubmitting ? "Saving..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KYC;
