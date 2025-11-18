import { useAuthStore } from "../store/auth-store";
import { ACCESS_TOKEN } from "../constant/auth";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = localStorage.getItem(ACCESS_TOKEN);
  const isLoggedIn = Boolean(token);

  return {
    user,
    token,
    isLoggedIn,
    role: user?.role,
    isOfficer: user?.role === "officer",
    isUser: user?.role === "user",
  };
};
