import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import type { ContactInfo } from "../api/profile.api";
import Input from "../../../components/input";

type Props = {
  data?: ContactInfo;
  editable: boolean;
  onChange: (value: ContactInfo) => void;
};

type ContactForm = ContactInfo;

const ContactList = ({ data, editable, onChange }: Props) => {
  const { control, register, watch, reset } = useForm<ContactForm>({
    defaultValues: data ?? { emails: [], phones: [] },
  });

  const emailArray = useFieldArray({ control, name: "emails" });
  const phoneArray = useFieldArray({ control, name: "phones" });

  const emails = watch("emails");
  const phones = watch("phones");

  useEffect(() => {
    reset(data ?? { emails: [], phones: [] });
  }, [data, reset]);

  useEffect(() => {
    onChange({ emails: emails ?? [], phones: phones ?? [] });
  }, [emails, phones, onChange]);

  const addEmail = () =>
    emailArray.append({ email: "", type: "", preferred: false });
  const addPhone = () =>
    phoneArray.append({ number: "", type: "", preferred: false });

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Contact Information</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Emails</h4>
          {editable && (
            <button
              type="button"
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
              onClick={addEmail}
            >
              Add Email
            </button>
          )}
        </div>
        {emailArray.fields.length === 0 && (
          <p className="text-sm text-gray-500">No emails added.</p>
        )}
        <div className="space-y-4">
          {emailArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4"
            >
              <Input
                label="Email"
                type="email"
                disabled={!editable}
                {...register(`emails.${index}.email` as const, {
                  required: true,
                })}
              />
              <Input
                label="Type"
                placeholder="work / personal"
                disabled={!editable}
                {...register(`emails.${index}.type` as const)}
              />
              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  disabled={!editable}
                  className="h-4 w-4"
                  {...register(`emails.${index}.preferred` as const)}
                />
                <label className="text-sm text-gray-700">Preferred</label>
              </div>
              {editable && (
                <div className="md:col-span-3">
                  <button
                    type="button"
                    className="text-red-600 text-sm underline"
                    onClick={() => emailArray.remove(index)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Phones</h4>
          {editable && (
            <button
              type="button"
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded"
              onClick={addPhone}
            >
              Add Phone
            </button>
          )}
        </div>
        {phoneArray.fields.length === 0 && (
          <p className="text-sm text-gray-500">No phone numbers added.</p>
        )}
        <div className="space-y-4">
          {phoneArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4"
            >
              <Input
                label="Number"
                disabled={!editable}
                {...register(`phones.${index}.number` as const, {
                  required: true,
                })}
              />
              <Input
                label="Type"
                placeholder="mobile / home"
                disabled={!editable}
                {...register(`phones.${index}.type` as const)}
              />
              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  disabled={!editable}
                  className="h-4 w-4"
                  {...register(`phones.${index}.preferred` as const)}
                />
                <label className="text-sm text-gray-700">Preferred</label>
              </div>
              {editable && (
                <div className="md:col-span-3">
                  <button
                    type="button"
                    className="text-red-600 text-sm underline"
                    onClick={() => phoneArray.remove(index)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
