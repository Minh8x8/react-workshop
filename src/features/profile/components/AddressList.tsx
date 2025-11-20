import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import type { Address } from "../api/profile.api";
import Input from "../../../components/input";

type Props = {
  data?: Address[];
  editable: boolean;
  onChange: (value: Address[]) => void;
};

type AddressForm = {
  addresses: Address[];
};

const AddressList = ({ data, editable, onChange }: Props) => {
  const { control, register, reset, watch } = useForm<AddressForm>({
    defaultValues: { addresses: data ?? [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const addresses = watch("addresses");

  useEffect(() => {
    reset({ addresses: data ?? [] });
  }, [data, reset]);

  useEffect(() => {
    onChange(addresses ?? []);
  }, [addresses, onChange]);

  const handleAdd = () =>
    append({
      country: "",
      city: "",
      street: "",
      postal: "",
      type: "",
    });

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Addresses</h3>
        {editable && (
          <button
            type="button"
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
            onClick={handleAdd}
          >
            Add Address
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500">No addresses added.</p>
      )}

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b pb-4"
          >
            <Input
              label="Country"
              disabled={!editable}
              {...register(`addresses.${index}.country` as const, {
                required: true,
              })}
            />
            <Input
              label="City"
              disabled={!editable}
              {...register(`addresses.${index}.city` as const, {
                required: true,
              })}
            />
            <Input
              label="Street"
              disabled={!editable}
              {...register(`addresses.${index}.street` as const, {
                required: true,
              })}
            />
            <Input
              label="Postal Code"
              disabled={!editable}
              {...register(`addresses.${index}.postal` as const)}
            />
            <Input
              label="Type"
              placeholder="home / office"
              disabled={!editable}
              {...register(`addresses.${index}.type` as const)}
            />
            {editable && (
              <div className="flex items-end">
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
        ))}
      </div>
    </div>
  );
};

export default AddressList;
