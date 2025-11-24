import { Input, Button } from "@components/ui";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type IncomesProps = {
  control: Control<FinancialStatusForm>;
  register: UseFormRegister<FinancialStatusForm>;
  errors: FieldErrors<FinancialStatusForm>;
  isEdit: boolean;
};

const Incomes = ({ control, register, errors, isEdit }: IncomesProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "incomes",
  });

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
          Incomes
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
            Add Income
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
                placeholder="Salary"
                {...register(`incomes.${index}.type` as const)}
                disabled={!isEdit}
              />
              {errors.incomes?.[index]?.type && (
                <p className="text-sm text-red-500">
                  {errors.incomes[index]?.type?.message as string}
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
                {...register(`incomes.${index}.amount` as const, {
                  valueAsNumber: true,
                })}
                disabled={!isEdit}
              />
              {errors.incomes?.[index]?.amount && (
                <p className="text-sm text-red-500">
                  {errors.incomes[index]?.amount?.message as string}
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

export default Incomes;
