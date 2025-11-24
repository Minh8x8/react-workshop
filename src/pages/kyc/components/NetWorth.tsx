import { Input } from "@components/ui";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type NetWorthProps = {
  register: UseFormRegister<FinancialStatusForm>;
  errors: FieldErrors<FinancialStatusForm>;
  value?: number;
};

const NetWorth = ({ register, errors, value }: NetWorthProps) => {
  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
        Net Worth
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Total (auto-calculated A+B+C+D)
          </label>
          <Input
            type="number"
            step="any"
            value={value ?? ""}
            readOnly
            disabled
            {...register("netWorthTotal", { valueAsNumber: true })}
          />
          {errors.netWorthTotal && (
            <p className="text-sm text-red-500">
              {errors.netWorthTotal.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NetWorth;
