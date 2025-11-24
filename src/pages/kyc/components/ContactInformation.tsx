import { Input, Button } from "@components/ui";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type ContactInformationProps = {
  control: Control<FinancialStatusForm>;
  register: UseFormRegister<FinancialStatusForm>;
  errors: FieldErrors<FinancialStatusForm>;
  isEdit: boolean;
};

const ContactInformation = ({
  control,
  register,
  errors,
  isEdit,
}: ContactInformationProps) => {
  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
          Contact Information
        </h2>
        {isEdit && (
          <Button
            type="button"
            size="sm"
            onClick={() =>
              appendAddress({
                address: "",
                country: "",
                city: "",
                postalCode: "",
                type: "",
              })
            }
          >
            Add Address
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {addressFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-md border border-dashed border-gray-200 p-3 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Address *
                </label>
                <Input
                  placeholder="123 Main Street"
                  {...register(`addresses.${index}.address` as const)}
                  disabled={!isEdit}
                />
                {errors.addresses?.[index]?.address && (
                  <p className="text-sm text-red-500">
                    {errors.addresses[index]?.address?.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  City *
                </label>
                <Input
                  placeholder="City"
                  {...register(`addresses.${index}.city` as const)}
                  disabled={!isEdit}
                />
                {errors.addresses?.[index]?.city && (
                  <p className="text-sm text-red-500">
                    {errors.addresses[index]?.city?.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Country *
                </label>
                <Input
                  placeholder="Country"
                  {...register(`addresses.${index}.country` as const)}
                  disabled={!isEdit}
                />
                {errors.addresses?.[index]?.country && (
                  <p className="text-sm text-red-500">
                    {errors.addresses[index]?.country?.message as string}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Postal Code
                </label>
                <Input
                  placeholder="Postal code"
                  {...register(`addresses.${index}.postalCode` as const)}
                  disabled={!isEdit}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Type
                </label>
                <select
                  className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register(`addresses.${index}.type` as const)}
                  disabled={!isEdit}
                >
                  <option value="">Select</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Mailing">Mailing</option>
                </select>
              </div>
            </div>

            {isEdit && addressFields.length > 1 && (
              <div className="mt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAddress(index)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInformation;
