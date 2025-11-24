import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ProfilePictureUploader from "./components/ProfilePictureUploader";
import GeneralInformation from "./components/GeneralInformation";
import { getProfile, type ProfileResponse } from "./apis/getProfile";
import { type GeneralInfoForm } from "./schema/general-information.schema";
import { updateProfile } from "./apis/updateProfile";
import { toast } from "sonner";
import { useAuthStore } from "@store/auth-store";

const normalizeDateInput = (birthDate?: string) => {
  if (!birthDate) return "";

  const parsed = new Date(birthDate);
  if (Number.isNaN(parsed.getTime())) return birthDate;

  return parsed.toISOString().split("T")[0];
};

const toGeneralInfoValues = (profile: ProfileResponse): GeneralInfoForm => ({
  firstName: profile.firstName ?? "",
  lastName: profile.lastName ?? "",
  country: profile.address?.country ?? "",
  city: profile.address?.city ?? "",
  address: profile.address?.address ?? "",
  email: profile.email ?? "",
  phoneNumber: profile.phone ?? "",
  birthday: normalizeDateInput(profile.birthDate),
  organization: profile.company?.name ?? "",
  role: profile.company?.title ?? profile.role ?? "",
  department: profile.company?.department ?? "",
  zipPostalCode: profile.address?.postalCode ?? "",
});

const Profile = () => {
  const { id } = useParams();
  const authUser = useAuthStore((s) => s.user);

  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const userId = useMemo(() => {
    const fallbackId = authUser?.id ?? 1;
    const parsed = Number(id ?? fallbackId);
    return Number.isNaN(parsed) ? fallbackId : parsed;
  }, [authUser?.id, id]);

  useEffect(() => {
    let ignore = false;

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await getProfile(userId);
        if (!ignore) setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        if (!ignore) toast.error("Failed to load profile information");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchProfile();

    return () => {
      ignore = true;
    };
  }, [userId]);

  const handleUpdateProfile = async (formValues: GeneralInfoForm) => {
    setIsSaving(true);

    try {
      if (!profile) {
        throw new Error("Profile data is not ready");
      }

      await updateProfile(userId, formValues);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              email: formValues.email,
              phone: formValues.phoneNumber,
              birthDate: formValues.birthday,
              role: formValues.role || prev.role,
              address: {
                ...prev.address,
                address: formValues.address,
                city: formValues.city,
                country: formValues.country,
                postalCode: formValues.zipPostalCode,
              },
              company: {
                ...prev.company,
                name: formValues.organization,
                title: formValues.role || prev.company?.title,
                department: formValues.department,
                address: prev.company?.address,
              },
            }
          : prev
      );
    } catch (error) {
      console.error("Failed to update profile", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const generalInfoDefaults = useMemo(
    () => (profile ? toGeneralInfoValues(profile) : undefined),
    [profile]
  );

  return (
    <>
      <div className="flex flex-row gap-1 items-center text-black font-semibold dark:text-white mb-2">
        <HomeIcon className="h-4 w-4 mr-1" />
        <span>Home</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span>Users</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span className="font-normal text-gray-700 dark:text-gray-300">
          Personal information
        </span>
      </div>

      <h1 className="text-xl font-semibold text-black dark:text-white">
        Personal Information
      </h1>

      <ProfilePictureUploader avatar={profile?.image} isLoading={isLoading} />

      <GeneralInformation
        initialValues={generalInfoDefaults}
        isLoading={isLoading}
        isSaving={isSaving}
        onSubmit={handleUpdateProfile}
      />
    </>
  );
};

export default Profile;
