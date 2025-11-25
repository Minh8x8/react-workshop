import { Button, Avatar } from "@components/ui";
import { AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const ProfilePictureUploader = (props: {
  avatar?: string;
  isLoading?: boolean;
  canEdit?: boolean;
}) => {
  const { avatar, isLoading, canEdit = true } = props;

  return isLoading ? (
    <div className="h-28 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse mt-4"></div>
  ) : (
    <div className="flex flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-sm border shadow mt-4 items-center">
      <Avatar key={avatar} className="rounded-lg h-22 w-22 border">
        <AvatarImage src={avatar || ""} />
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
          <Button className="mt-2" disabled={!canEdit}>
            <ArrowUpTrayIcon />
            Upload new picture
          </Button>
          <Button variant="outline" className="mt-2 text-red-600" disabled={!canEdit}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
