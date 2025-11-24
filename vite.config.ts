import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@services": "/src/services",
      "@routes": "/src/routes",
      "@styles": "/src/styles",
      "@contexts": "/src/contexts",
      "@config": "/src/config",
      "@types": "/src/types",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@lib": "/src/lib",
      "@constant": "/src/constant",
      "@store": "/src/store",
      "@apis": "/src/apis",
      "@context": "/src/context",
    },
  },
});
