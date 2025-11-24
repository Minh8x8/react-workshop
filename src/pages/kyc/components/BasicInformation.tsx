import { Input } from "@components/ui";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type BasicInformationProps = {
  register: UseFormRegister<FinancialStatusForm>;
  errors: FieldErrors<FinancialStatusForm>;
  isEdit: boolean;
};

const BasicInformation = ({ register, errors, isEdit }: BasicInformationProps) => {
  const disabled = !isEdit;

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
        Basic Information
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            First Name *
          </label>
          <Input
            placeholder="First name"
            {...register("firstName")}
            disabled={disabled}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Last Name *
          </label>
          <Input
            placeholder="Last name"
            {...register("lastName")}
            disabled={disabled}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Middle Name
          </label>
          <Input
            placeholder="Enter your middle name"
            {...register("middleName")}
            disabled={disabled}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Date of Birth
          </label>
          <Input type="date" {...register("birthDate")} disabled={disabled} />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Age
          </label>
          <Input
            type="number"
            {...register("age", { valueAsNumber: true })}
            disabled
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;
