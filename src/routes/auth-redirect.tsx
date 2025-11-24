import { Navigate } from "react-router";

import { useAuth } from "../hooks/use-auth";

import { ADMIN_URL, AUTH_URL, USER_URL } from "../constant/url";

export default function AuthRedirect() {
  const { isLoggedIn, role } = useAuth();

  if (isLoggedIn) {
    const target = role === "user" ? USER_URL.PROFILE : ADMIN_URL.DASHBOARD;

    return <Navigate to={target} replace />;
  }

  return <Navigate to={AUTH_URL.LOGIN} replace />;
}
