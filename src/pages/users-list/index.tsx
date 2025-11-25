import { Button } from "@components/ui";
import { useUsers } from "./hooks/useUsers";

const UserListPage = () => {
  const { data: users, isLoading, isError, error, refetch } = useUsers();

  if (isLoading)
    return (
      <div className="h-80 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse mt-4"></div>
    );

  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">User List</h2>
        <Button onClick={() => refetch()}>Reload</Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3">
                  <img
                    src={u.image}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="px-4 py-3 font-medium">
                  {u.firstName} {u.lastName}
                </td>

                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {u.username}
                </td>

                <td className="px-4 py-3">{u.email}</td>

                <td className="px-4 py-3">
                  {u.company.name} – {u.company.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListPage;
