import { ADMIN_URL, USER_URL } from "@constant/url";
import {
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  RectangleStackIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  role: "user" | "officer";
  isVisible?: boolean;
}

const Sidebar = ({ role, isVisible = true }: SidebarProps) => {
  const userNavigation = [
    { href: USER_URL.PROFILE, label: "My Profile", icon: UserIcon },
    { href: USER_URL.KYC, label: "My Submissions", icon: RectangleStackIcon },
  ];

  const officerNavigation =
    role === "officer"
      ? [
          { href: ADMIN_URL.USERS, label: "User List", icon: UsersIcon },
          {
            href: "/#",
            label: "Review Queue",
            icon: ClipboardDocumentCheckIcon,
          },
          { href: "/#", label: "All Results", icon: ChartBarIcon },
        ]
      : [];

  const navItems = role === "user" ? userNavigation : officerNavigation;

  return (
    <aside
      className={`${
        isVisible ? "flex" : "hidden"
      } w-64 shrink-0 flex-col border-r border-gray-100 bg-white px-6 py-8 transition-all duration-200 dark:border-gray-800 dark:bg-gray-950`}
    >
      <nav
        aria-label="Sidebar"
        className="mt-8 flex flex-col gap-1 text-sm font-medium"
      >
        {navItems.map((item) => (
          <a
            className="flex items-center gap-3 rounded-2xl px-3 py-2 text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-indigo-500/10 dark:hover:text-white"
            href={item.href}
            key={item.href}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/50 p-5 text-sm text-gray-700 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-gray-200">
        <div className="mb-3 flex items-center gap-2 text-indigo-700 dark:text-indigo-200">
          <ShieldCheckIcon className="h-5 w-5" />
          <p className="font-semibold">Secure Guidance</p>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Need help finishing a submission? Our compliance officers are happy to
          assist.
        </p>
        <a
          className="mt-4 inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          href="/contact"
        >
          Contact support
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
