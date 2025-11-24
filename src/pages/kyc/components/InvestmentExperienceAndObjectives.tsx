import { type UseFormRegister } from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type InvestmentExperienceAndObjectivesProps = {
  register: UseFormRegister<FinancialStatusForm>;
  isEdit: boolean;
};

const InvestmentExperienceAndObjectives = ({
  register,
  isEdit,
}: InvestmentExperienceAndObjectivesProps) => {
  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
        Investment Experience and Objectives
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Experience in Financial Markets
          </label>
          <select
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...register("investmentExperience")}
            disabled={!isEdit}
          >
            <option value="">Select</option>
            <option value="<1 year">{"<1 year"}</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Risk Tolerance
          </label>
          <select
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            {...register("riskTolerance")}
            disabled={!isEdit}
          >
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default InvestmentExperienceAndObjectives;
