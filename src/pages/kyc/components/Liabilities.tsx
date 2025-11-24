import { Input, Button } from "@components/ui";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type LiabilitiesProps = {
  control: Control<FinancialStatusForm>;
  register: UseFormRegister<FinancialStatusForm>;
  errors: FieldErrors<FinancialStatusForm>;
  isEdit: boolean;
};

const Liabilities = ({
  control,
  register,
  errors,
  isEdit,
}: LiabilitiesProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "liabilities",
  });

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
          Liabilities (C)
        </h3>
        {isEdit && (
          <Button
            type="button"
            size="sm"
            onClick={() =>
              append({
                type: "",
                amount: undefined,
              })
            }
          >
            Add Liability
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-end"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Type *
              </label>
              <Input
                placeholder="Personal loan"
                {...register(`liabilities.${index}.type` as const)}
                disabled={!isEdit}
              />
              {errors.liabilities?.[index]?.type && (
                <p className="text-sm text-red-500">
                  {errors.liabilities[index]?.type?.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Amount (Currency)
              </label>
              <Input
                type="number"
                step="any"
                {...register(`liabilities.${index}.amount` as const, {
                  valueAsNumber: true,
                })}
                disabled={!isEdit}
              />
              {errors.liabilities?.[index]?.amount && (
                <p className="text-sm text-red-500">
                  {errors.liabilities[index]?.amount?.message as string}
                </p>
              )}
            </div>

            {isEdit && (
              <div className="flex items-center md:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
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

export default Liabilities;
