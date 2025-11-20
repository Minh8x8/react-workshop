import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACCESS_TOKEN } from "@constant/auth";

interface AuthState {
  user: {
    id: number;
    role: "user" | "officer";
    username: string;
  } | null;

  setUser: (profile: { id: number; role: string; username: string }) => void;

  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (profile) =>
        set({
          user: {
            id: profile.id,
            username: profile.username,
            role: profile.role === "user" ? "user" : "officer",
          },
        }),

      clearUser: () => {
        set({ user: null });
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem("theme-mode");
      },
    }),
    { name: "user-info" }
  )
);
