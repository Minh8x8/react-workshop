import { AUTH_URL } from "../constant/url";
import { useAuthStore } from "../store/auth-store";

type AppHeaderProps = {
  role: "user" | "officer";
};

const AppHeader = ({ role }: AppHeaderProps) => {
  const user = useAuthStore((s) => s.user);

  const portalLabel = role === "officer" ? "Admin portal" : "User portal";

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {portalLabel}
        </p>
        <h1 className="text-xl font-semibold text-gray-900">Simple KYC</h1>
      </div>

      <div className="text-sm text-gray-600">
        {user ? (
          <div className="text-right leading-tight">
            <p className="font-medium text-gray-900">{user.username}</p>
            <p className="capitalize text-gray-500">{user.role}</p>
          </div>
        ) : (
          <a
            className="text-blue-600 underline-offset-2 hover:underline"
            href={AUTH_URL.LOGIN}
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
