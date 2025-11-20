import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { BasicInfo } from "../api/profile.api";
import Input from "../../../components/input";

type Props = {
  data?: BasicInfo;
  editable: boolean;
  onChange: (value: BasicInfo) => void;
};

const calculateAge = (dob: string) => {
  if (!dob) return 0;
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hasHadBirthday =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hasHadBirthday) age -= 1;
  return age < 0 ? 0 : age;
};

const BasicInfoForm = ({ data, editable, onChange }: Props) => {
  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BasicInfo>({
    defaultValues: data,
  });

  const values = watch();

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  useEffect(() => {
    const age = calculateAge(values.dob);
    setValue("age", age, { shouldDirty: true, shouldValidate: false });
    onChange({ ...values, age });
  }, [values, setValue, onChange]);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="First Name"
            placeholder="Enter first name"
            disabled={!editable}
            error={errors.firstName?.message}
            {...register("firstName", { required: "First name is required" })}
          />
        </div>
        <div>
          <Input
            label="Middle Name"
            placeholder="Enter middle name"
            disabled={!editable}
            {...register("middleName")}
          />
        </div>
        <div>
          <Input
            label="Last Name"
            placeholder="Enter last name"
            disabled={!editable}
            error={errors.lastName?.message}
            {...register("lastName", { required: "Last name is required" })}
          />
        </div>
        <div>
          <Input
            type="date"
            label="Date of Birth"
            disabled={!editable}
            error={errors.dob?.message}
            {...register("dob", { required: "Date of birth is required" })}
          />
        </div>
        <div>
          <Input label="Age" disabled value={values.age ?? ""} readOnly />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
