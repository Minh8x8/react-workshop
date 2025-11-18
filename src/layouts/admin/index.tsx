import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

import Sidebar from "./AppSidebar";
import { useAuth } from "../../hooks/use-auth";
import { useAuthStore } from "../../store/auth-store";
import { getProfile } from "../../apis/auth";

import { AUTH_URL } from "../../constant/url";
import { ACCESS_TOKEN } from "../../constant/auth";

const AdminLayout = () => {
  const { token, user, role, isLoggedIn } = useAuth();
  const setUser = useAuthStore((s) => s.setUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      if (!user) {
        try {
          const profile = await getProfile();
          setUser(profile);
        } catch (error) {
          console.error("Failed to refresh user:", error);
          localStorage.removeItem(ACCESS_TOKEN);
        }
      }

      setLoading(false);
    };

    init();
  }, [token, user, setUser]);

  if (!isLoggedIn) {
    return <Navigate to={AUTH_URL.LOGIN} replace />;
  }

  if (loading || !role) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
