import { Input, Button } from "@components/ui";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  generalInfoSchema,
  type GeneralInfoForm,
} from "../schema/general-information.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type GeneralInformationProps = {
  initialValues?: GeneralInfoForm;
  isLoading?: boolean;
  isSaving?: boolean;
  onSubmit?: (data: GeneralInfoForm) => Promise<void>;
};

const emptyValues: GeneralInfoForm = {
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  address: "",
  email: "",
  phoneNumber: "",
  birthday: "",
  organization: "",
  role: "",
  department: "",
  zipPostalCode: "",
};

const GeneralInformation = ({
  initialValues,
  isLoading = false,
  isSaving = false,
  onSubmit,
}: GeneralInformationProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralInfoForm>({
    defaultValues: initialValues ?? emptyValues,
    resolver: zodResolver(generalInfoSchema),
  });

  useEffect(() => {
    if (isEdit) return;
    reset(initialValues ?? emptyValues);
  }, [initialValues, isEdit, reset]);

  const submitForm = async (values: GeneralInfoForm) => {
    if (!onSubmit) return;

    try {
      await onSubmit(values);
      toast.success("Profile updated successfully!");
      setIsEdit(false);
    } catch (error) {
      console.error("Unable to update profile", error);
      toast.error("Unable to update profile right now");
    }
  };

  const fieldsDisabled = !isEdit || isSaving || isLoading;

  return isLoading ? (
    <div className="h-80 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse mt-4"></div>
  ) : (
    <form
      className="bg-white dark:bg-gray-800 p-4 rounded-sm border shadow mt-4"
      onSubmit={handleSubmit(submitForm)}
    >
      <h2 className="font-semibold text-md text-black dark:text-white">
        General information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="mb-1 font-medium text-black dark:text-white"
          >
            First Name
          </label>
          <Input
            id="firstName"
            placeholder="First Name"
            {...register("firstName")}
            disabled={fieldsDisabled}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Last Name
          </label>
          <Input
            id="lastName"
            placeholder="Last Name"
            {...register("lastName")}
            disabled={fieldsDisabled}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Country
          </label>
          <Input
            id="country"
            placeholder="Country"
            {...register("country")}
            disabled={fieldsDisabled}
          />
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="city"
            className="mb-1 font-medium text-black dark:text-white"
          >
            City
          </label>
          <Input
            id="city"
            placeholder="City"
            {...register("city")}
            disabled={fieldsDisabled}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Address
          </label>
          <Input
            id="address"
            placeholder="Address"
            {...register("address")}
            disabled={fieldsDisabled}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Email
          </label>
          <Input
            id="email"
            placeholder="Email"
            {...register("email")}
            disabled={fieldsDisabled}
            type="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="phoneNumber"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            placeholder="Phone Number"
            {...register("phoneNumber")}
            disabled={fieldsDisabled}
            type="tel"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="birthday"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Birthday
          </label>
          <Input
            id="birthday"
            placeholder="Birthday"
            {...register("birthday")}
            disabled={fieldsDisabled}
            type="date"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="organization"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Organization
          </label>
          <Input
            id="organization"
            placeholder="Company Name"
            {...register("organization")}
            disabled={fieldsDisabled}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="role"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Role
          </label>
          <Input
            id="role"
            placeholder="Role"
            {...register("role")}
            disabled={fieldsDisabled}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="department"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Department
          </label>
          <Input
            id="department"
            placeholder="Department"
            {...register("department")}
            disabled={fieldsDisabled}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="zipPostalCode"
            className="mb-1 font-medium text-black dark:text-white"
          >
            Zip/Postal Code
          </label>
          <Input
            id="zipPostalCode"
            placeholder="Zip/Postal Code"
            {...register("zipPostalCode")}
            disabled={fieldsDisabled}
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          onClick={() => {
            if (!isEdit) setIsEdit(true);
            else handleSubmit(submitForm)();
          }}
          disabled={isLoading || isSaving}
        >
          {isEdit ? (isSaving ? "Saving..." : "Save") : "Edit"}
        </Button>
        <Button type="button">KYC</Button>
      </div>
    </form>
  );
};

export default GeneralInformation;
