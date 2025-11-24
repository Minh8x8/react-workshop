import { Button, Avatar } from "@components/ui";
import { AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const ProfilePictureUploader = () => {
  return (
    <div className="flex flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-sm border shadow mt-4 items-center">
      <Avatar className="rounded-lg h-22 w-22 border">
        <AvatarImage src="https://dummyjson.com/icon/averyp/128" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 dark:text-gray-300">
          Profile picture
        </label>
        <label>
          JPG, GIF or PNG. Max size of 800KB
          <br />
        </label>
        <div className="flex flex-row gap-2">
          <Button className="mt-2">
            <ArrowUpTrayIcon />
            Upload new picture
          </Button>
          <Button variant="outline" className="mt-2 text-red-600">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
