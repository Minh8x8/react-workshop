import { Input, Button } from "@components/ui";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type OccupationsProps = {
  control: Control<FinancialStatusForm>;
  register: UseFormRegister<FinancialStatusForm>;
  errors: FieldErrors<FinancialStatusForm>;
  isEdit: boolean;
};

const Occupations = ({ control, register, errors, isEdit }: OccupationsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "occupations",
  });

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
          Occupations
        </h3>
        {isEdit && (
          <Button
            type="button"
            size="sm"
            onClick={() =>
              append({
                title: "",
                fromDate: "",
                toDate: "",
              })
            }
          >
            Add Occupation
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
                Occupation *
              </label>
              <Input
                placeholder="Job title"
                {...register(`occupations.${index}.title` as const)}
                disabled={!isEdit}
              />
              {errors.occupations?.[index]?.title && (
                <p className="text-sm text-red-500">
                  {errors.occupations[index]?.title?.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                From Date
              </label>
              <Input
                type="date"
                {...register(`occupations.${index}.fromDate` as const)}
                disabled={!isEdit}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                To Date
              </label>
              <Input
                type="date"
                {...register(`occupations.${index}.toDate` as const)}
                disabled={!isEdit}
              />
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

export default Occupations;
