import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import type { Employment } from "../api/profile.api";
import Input from "../../../components/input";

type Props = {
  data?: Employment[];
  editable: boolean;
  onChange: (value: Employment[]) => void;
};

type EmploymentForm = {
  jobs: Employment[];
};

const EmploymentList = ({ data, editable, onChange }: Props) => {
  const { control, register, watch, reset, formState } = useForm<EmploymentForm>({
    defaultValues: { jobs: data ?? [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobs",
  });

  const jobs = watch("jobs");

  useEffect(() => {
    reset({ jobs: data ?? [] });
  }, [data, reset]);

  useEffect(() => {
    onChange(jobs ?? []);
  }, [jobs, onChange]);

  const addJob = () =>
    append({
      name: "",
      fromYear: new Date().getFullYear(),
      toYear: new Date().getFullYear(),
    });

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Employment History</h3>
        {editable && (
          <button
            type="button"
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
            onClick={addJob}
          >
            Add Employment
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500">No employment records.</p>
      )}

      <div className="space-y-6">
        {fields.map((field, index) => {
          const error = formState.errors?.jobs?.[index]?.toYear;
          return (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4"
            >
              <Input
                label="Employer"
                disabled={!editable}
                {...register(`jobs.${index}.name` as const, {
                  required: true,
                })}
              />
              <Input
                label="From Year"
                type="number"
                disabled={!editable}
                {...register(`jobs.${index}.fromYear` as const, {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              <div>
                <Input
                  label="To Year"
                  type="number"
                  disabled={!editable}
                  {...register(`jobs.${index}.toYear` as const, {
                    valueAsNumber: true,
                    required: true,
                    validate: (value, formValues) => {
                      const from = formValues.jobs?.[index]?.fromYear ?? 0;
                      return value >= from || "End year must be after start";
                    },
                  })}
                />
                {error?.message && (
                  <small className="text-red-600">{error.message}</small>
                )}
              </div>
              {editable && (
                <div className="md:col-span-3">
                  <button
                    type="button"
                    className="text-red-600 text-sm underline"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmploymentList;
