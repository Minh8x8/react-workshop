import { Input, Button } from "@components/ui";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { type FinancialStatusForm } from "../schema/financial-status.schema";

type IdentificationDocumentsProps = {
  control: Control<FinancialStatusForm>;
  register: UseFormRegister<FinancialStatusForm>;
  errors: FieldErrors<FinancialStatusForm>;
  isEdit: boolean;
};

const IdentificationDocuments = ({
  control,
  register,
  errors,
  isEdit,
}: IdentificationDocumentsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "identificationDocuments",
  });

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
          Identification Documents
        </h3>
        {isEdit && (
          <Button
            type="button"
            size="sm"
            onClick={() =>
              append({
                type: "",
                expiryDate: "",
                documentId: "",
              })
            }
          >
            Add Document
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
              <select
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...register(`identificationDocuments.${index}.type` as const)}
                disabled={!isEdit}
              >
                <option value="">Select</option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver License">Driver License</option>
              </select>
              {errors.identificationDocuments?.[index]?.type && (
                <p className="text-sm text-red-500">
                  {
                    errors.identificationDocuments[index]?.type
                      ?.message as string
                  }
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Expiry Date
              </label>
              <Input
                type="date"
                {...register(
                  `identificationDocuments.${index}.expiryDate` as const
                )}
                disabled={!isEdit}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Document ID
              </label>
              <Input
                placeholder="Document number"
                {...register(
                  `identificationDocuments.${index}.documentId` as const
                )}
                disabled={!isEdit}
              />
            </div>

            {isEdit && fields.length > 0 && (
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

export default IdentificationDocuments;
