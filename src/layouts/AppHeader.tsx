import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  Squares2X2Icon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useRef, useState } from "react";

import { ADMIN_URL, AUTH_URL, USER_URL } from "../constant/url";
import { useAuthStore } from "../store/auth-store";
import { useNavigate } from "react-router";

type AppHeaderProps = {
  role: "user" | "officer";
  onToggleSidebar?: () => void;
};

const getInitialThemePreference = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem("theme-mode");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme === "dark";
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
};

const AppHeader = ({ role, onToggleSidebar }: AppHeaderProps) => {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    getInitialThemePreference()
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme-mode", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = useMemo(() => {
    if (!user?.username) return "SK";

    return user.username
      .split(" ")
      .map((piece) => piece.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  }, [user?.username]);

  const portalLabel = role === "officer" ? "Admin portal" : "User portal";

  const iconButtonClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-indigo-500 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-indigo-300";
  const avatarButtonClass =
    "relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-orange-500 shadow-sm transition hover:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 dark:border-gray-700 dark:bg-gray-900 dark:text-orange-200";

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleLogout = () => {
    clearUser();
    setMenuOpen(false);
    navigate(AUTH_URL.LOGIN);
  };

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-6">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              aria-label="Toggle sidebar"
              className={iconButtonClass}
              onClick={onToggleSidebar}
              type="button"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          )}
          {/* <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-semibold text-white shadow-sm">
            SK
          </div> */}
          <img
            src="/assets/logo.png"
            alt="Simple KYC Logo"
            className="h-12 w-12"
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
              {portalLabel}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Simple KYC
            </p>
          </div>
        </div>

        <div className="relative hidden h-12 w-full max-w-md flex-1 items-center rounded-full border border-gray-200 bg-gray-50 pr-4 text-gray-500 focus-within:border-indigo-500 focus-within:bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 md:flex">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            className="h-full w-full rounded-full border-0 bg-transparent pl-12 pr-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none dark:text-gray-100"
            placeholder="Search submissions, clients..."
            type="search"
          />
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <button
            aria-label="Notifications"
            className={iconButtonClass}
            type="button"
          >
            <BellIcon className="h-5 w-5" />
          </button>
          <button
            aria-label="Quick actions"
            className={iconButtonClass}
            type="button"
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
          <button
            aria-label="Toggle dark mode"
            className={iconButtonClass}
            onClick={toggleTheme}
            type="button"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {!user ? (
            <a
              className="inline-flex items-center gap-2 rounded-full border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              href={AUTH_URL.LOGIN}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Login
            </a>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className={avatarButtonClass}
                onClick={() => setMenuOpen((prev) => !prev)}
                type="button"
              >
                <span>{initials}</span>
                <span className="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-0.5 text-gray-400 shadow dark:border-gray-700 dark:bg-gray-800">
                  <ChevronDownIcon className="h-3 w-3" />
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-20 mt-3 w-60 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900">
                  <div className="rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.username}
                    </p>
                    <p className="text-xs capitalize text-gray-500 dark:text-gray-400">
                      {user.role}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <a
                      className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      href={
                        role === "officer"
                          ? ADMIN_URL.PROFILE
                          : USER_URL.PROFILE
                      }
                    >
                      <UserCircleIcon className="h-5 w-5" />
                      View profile
                    </a>
                    <button
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10"
                      onClick={handleLogout}
                      type="button"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
