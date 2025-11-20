import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  type ProfileFormValues,
  type Profile,
  getProfile,
  mapProfileFromApi,
  mapProfileToApi,
  updateProfile,
} from "../../../features/profile/api/profile.api";
import Input from "../../../components/input";
import { useAuthStore } from "../../../store/auth-store";

const UserProfilePage = () => {
  const user = useAuthStore((s) => s.user);

  const [backendProfile, setBackendProfile] = useState<Profile | null>(null);
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOfficer = user?.role === "officer";
  const userId = useMemo(() => (user?.role === "officer" ? 1 : 16), [user]);
  const editable = isEditing && !isOfficer;

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ProfileFormValues>({
    defaultValues: profile ?? undefined,
  });

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProfile(userId);
      const mapped = mapProfileFromApi(response.data);
      setProfile(mapped);
      setBackendProfile(response.data);
      reset(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  }, [userId, reset]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  watch();

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    setError(null);
    try {
      if (!backendProfile) return;
      const payload = mapProfileToApi(data, backendProfile);
      const res = await updateProfile(userId, payload);
      setProfile(data);
      setBackendProfile(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) reset(profile);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors">
      <div className="flex items-center text-sm text-gray-500 dark:text-slate-300 space-x-2">
        <span className="text-gray-400 dark:text-slate-400">Home</span>
        <span>/</span>
        <span className="text-gray-400 dark:text-slate-400">Users</span>
        <span>/</span>
        <span className="text-gray-700 dark:text-white font-medium">
          Personal Information
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Personal Information
          </h1>
          {isOfficer && (
            <p className="text-sm text-gray-500 dark:text-slate-300">
              Officer role: profile is read-only.
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {isLoading && (
        <p className="text-gray-500 dark:text-slate-300">Loading profile...</p>
      )}

      {!isLoading && profile && (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4 transition-colors">
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border border-slate-200 dark:border-slate-600"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Profile picture
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-300">
                  JPG, GIF or PNG. Max size of 800KB
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-indigo-600 text-white"
                    disabled
                  >
                    Upload picture
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded border dark:border-slate-600 text-slate-700 dark:text-slate-200"
                    disabled
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4 transition-colors">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                General information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="First Name"
                disabled={!editable}
                {...register("firstName")}
              />
              <Input
                label="Last Name"
                placeholder="Last Name"
                disabled={!editable}
                {...register("lastName")}
              />
              <Input
                label="Country"
                placeholder="Country"
                disabled={!editable}
                {...register("country")}
              />
              <Input
                label="City"
                placeholder="City"
                disabled={!editable}
                {...register("city")}
              />
              <Input
                label="Address"
                placeholder="Address"
                disabled={!editable}
                {...register("address")}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                disabled={!editable}
                {...register("email")}
              />
              <Input
                label="Phone Number"
                placeholder="+(1)23456 789"
                disabled={!editable}
                {...register("phone")}
              />
              <Input
                label="Birthday"
                type="date"
                disabled={!editable}
                {...register("birthDate")}
              />
              <Input
                label="Organization"
                placeholder="Company Name"
                disabled={!editable}
                {...register("organization")}
              />
              <Input
                label="Role"
                placeholder="Role"
                disabled={!editable}
                {...register("role")}
              />
              <Input
                label="Department"
                placeholder="Department"
                disabled={!editable}
                {...register("department")}
              />
              <Input
                label="Zip/postal code"
                placeholder="Zip"
                disabled={!editable}
                {...register("zipCode")}
              />
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  disabled={isOfficer || !profile}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-60"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                >
                  KYC
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-sm px-5 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !isDirty}
                  className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfilePage;
