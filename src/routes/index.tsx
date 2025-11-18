import { createBrowserRouter, redirect } from "react-router";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";

import AuthLayout from "../layouts/auth";
import AdminLayout from "../layouts/admin";

import { ADMIN_URL, AUTH_URL } from "../constant/url";

import AuthRedirect from "./auth-redirect";
import { ACCESS_TOKEN } from "../constant/auth";

const requireAuth = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) {
    throw redirect(AUTH_URL.LOGIN);
  }

  return null;
};

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AuthRedirect,
  },
  {
    path: AUTH_URL.BASE,
    Component: AuthLayout,
    children: [
      { index: true, Component: Login },
      { path: AUTH_URL.LOGIN, index: true, Component: Login },
    ],
  },
  {
    path: ADMIN_URL.BASE,
    Component: AdminLayout,
    middleware: [requireAuth],
    children: [
      { index: true, Component: Dashboard },
      {
        path: ADMIN_URL.DASHBOARD,
        Component: Dashboard,
      },
    ],
  },
]);

export default Router;
