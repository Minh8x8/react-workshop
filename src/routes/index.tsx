import { createBrowserRouter, redirect } from "react-router";

import { AuthLayout, AdminLayout, UserLayout } from "@layouts";

import { ADMIN_URL, AUTH_URL, USER_URL } from "@constant/url";

import AuthRedirect from "./auth-redirect";
import { ACCESS_TOKEN } from "@constant/auth";
import {
  Profile,
  KYC,
  Login,
  Dashboard,
  KycSubmission,
  UsersList,
} from "@pages";

type Role = "user" | "officer" | undefined;

const getStoredUser = () => {
  const persisted = localStorage.getItem("user-info");

  if (!persisted) return null;

  try {
    const parsed = JSON.parse(persisted);
    return parsed?.state?.user ?? null;
  } catch (error) {
    console.error("Failed to parse user-info from storage", error);
    return null;
  }
};

const getRoleBasedRedirect = (role: Role) => {
  return role === "user" ? USER_URL.DASHBOARD : ADMIN_URL.DASHBOARD;
};

const requireAuth = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) throw redirect(AUTH_URL.LOGIN);

  return null;
};

const requireOfficer = () => {
  requireAuth();

  const user = getStoredUser();

  if (user?.role !== "officer") throw redirect(USER_URL.DASHBOARD);

  return null;
};

const redirectIfAuthenticated = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) return null;

  const user = getStoredUser();
  throw redirect(getRoleBasedRedirect(user?.role));
};

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AuthRedirect,
  },
  {
    path: AUTH_URL.BASE,
    Component: AuthLayout,
    loader: redirectIfAuthenticated,
    children: [
      { index: true, Component: Login, loader: redirectIfAuthenticated },
      {
        path: AUTH_URL.LOGIN,
        index: true,
        Component: Login,
        loader: redirectIfAuthenticated,
      },
    ],
  },
  {
    path: ADMIN_URL.BASE,
    Component: AdminLayout,
    loader: requireOfficer,
    children: [
      { index: true, Component: Dashboard },
      {
        path: ADMIN_URL.DASHBOARD,
        Component: KycSubmission,
      },
      {
        path: ADMIN_URL.PROFILE,
        Component: Profile,
      },
      {
        path: ADMIN_URL.PROFILE_WITH_ID(":id"),
        Component: Profile,
      },
      {
        path: ADMIN_URL.USERS,
        Component: UsersList,
      },
    ],
  },
  {
    path: USER_URL.BASE,
    Component: UserLayout,
    loader: requireAuth,
    children: [
      { index: true, Component: Dashboard },
      {
        path: USER_URL.DASHBOARD,
        Component: Dashboard,
      },
      {
        path: USER_URL.PROFILE,
        Component: Profile,
      },
      {
        path: USER_URL.PROFILE_WITH_ID(":id"),
        Component: Profile,
      },
      {
        path: USER_URL.KYC,
        Component: KYC,
      },
    ],
  },
]);

export default Router;
