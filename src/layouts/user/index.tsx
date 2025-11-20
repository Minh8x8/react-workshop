import { useState } from "react";
import { Outlet } from "react-router";

import AppFooter from "../AppFooter";
import AppHeader from "../AppHeader";
import Sidebar from "../AppSidebar";

const UserLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar isVisible={sidebarVisible} role="user" />

      <div className="flex flex-1 flex-col">
        <AppHeader onToggleSidebar={toggleSidebar} role="user" />

        <main className="flex-1 bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>

        <AppFooter />
      </div>
    </div>
  );
};

export default UserLayout;
