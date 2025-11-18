import { Outlet } from "react-router";

import AppFooter from "../AppFooter";
import AppHeader from "../AppHeader";
import Sidebar from "../AppSidebar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <AppHeader role="user" />
      <div className="flex flex-1">
        <Sidebar role="user" />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default UserLayout;
