import HttpInstance from "../../../http";

export type ProfileFormValues = {
  firstName: string;
  middleName?: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  email: string;
  phone: string;
  birthDate: string;
  organization: string;
  department: string;
  role: string;
  avatar: string;
};

export type BasicInfo = {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  age: number;
};

export type EmailContact = {
  email: string;
  type: string;
  preferred: boolean;
};

export type PhoneContact = {
  number: string;
  type: string;
  preferred: boolean;
};

export type ContactInfo = {
  emails: EmailContact[];
  phones: PhoneContact[];
};

export type Address = {
  country: string;
  city: string;
  street: string;
  postal: string;
  type: string;
};

export type Documents = {
  passport: string;
  driverLicense: string;
};

export type Employment = {
  name: string;
  fromYear: number;
  toYear: number;
};

export type Profile = {
  id: number;
  basicInfo: BasicInfo;
  contacts: ContactInfo;
  addresses: Address[];
  documents: Documents;
  employmentHistory: Employment[];
  organization?: string;
  department?: string;
  role?: string;
  avatar?: string;
};

const baseURL = import.meta.env.VITE_MOCK_API ?? "http://localhost:3001";

export const getProfile = (userId: number) =>
  HttpInstance.get<Profile>(`/profiles/${userId}`, { baseURL });

export const updateProfile = (userId: number, data: Profile) =>
  HttpInstance.put<Profile>(`/profiles/${userId}`, data, { baseURL });

const defaultAvatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80";

const defaultEmployment = (organization?: string): Employment[] => {
  const currentYear = new Date().getFullYear();
  return [
    {
      name: organization || "Current Company",
      fromYear: currentYear - 2,
      toYear: currentYear,
    },
  ];
};

export const mapProfileFromApi = (data: Profile): ProfileFormValues => {
  const primaryEmail = data.contacts?.emails?.[0];
  const primaryPhone = data.contacts?.phones?.[0];
  const primaryAddress = data.addresses?.[0];

  return {
    firstName: data.basicInfo?.firstName ?? "",
    middleName: data.basicInfo?.middleName ?? "",
    lastName: data.basicInfo?.lastName ?? "",
    country: primaryAddress?.country ?? "",
    city: primaryAddress?.city ?? "",
    address: primaryAddress?.street ?? "",
    zipCode: primaryAddress?.postal ?? "",
    email: primaryEmail?.email ?? "",
    phone: primaryPhone?.number ?? "",
    birthDate: data.basicInfo?.dob ?? "",
    organization: data.organization ?? data.employmentHistory?.[0]?.name ?? "",
    department: data.department ?? "",
    role: data.role ?? "",
    avatar: data.avatar ?? defaultAvatar,
  };
};

export const mapProfileToApi = (
  form: ProfileFormValues,
  current?: Profile
): Profile => {
  const updatedAddress: Address = {
    country: form.country,
    city: form.city,
    street: form.address,
    postal: form.zipCode,
    type: current?.addresses?.[0]?.type ?? "home",
  };

  const updatedProfile: Profile = {
    id: current?.id ?? 0,
    basicInfo: {
      ...(current?.basicInfo ?? {
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        age: 0,
      }),
      firstName: form.firstName,
      middleName: form.middleName ?? "",
      lastName: form.lastName,
      dob: form.birthDate,
    },
    contacts: {
      emails: [
        {
          email: form.email,
          type: "work",
          preferred: true,
        },
      ],
      phones: [
        {
          number: form.phone,
          type: "mobile",
          preferred: true,
        },
      ],
    },
    addresses: [updatedAddress, ...(current?.addresses?.slice(1) ?? [])],
    documents: current?.documents ?? { passport: "", driverLicense: "" },
    employmentHistory:
      current?.employmentHistory?.length && current.employmentHistory[0]
        ? [
            {
              ...current.employmentHistory[0],
              name: form.organization || current.employmentHistory[0].name,
            },
            ...current.employmentHistory.slice(1),
          ]
        : defaultEmployment(form.organization),
    organization: form.organization,
    department: form.department,
    role: form.role,
    avatar: form.avatar || current?.avatar || defaultAvatar,
  };

  return updatedProfile;
};
