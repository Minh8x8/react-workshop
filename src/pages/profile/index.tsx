import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ProfilePictureUploader from "./components/ProfilePictureUploader";
import GeneralInformation from "./components/GeneralInformation";

const Profile = () => {
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

      <ProfilePictureUploader />

      <GeneralInformation />
    </>
  );
};

export default Profile;
