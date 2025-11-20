/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

/**
 * Keep env typing available even with `moduleDetection: "force"` by
 * declaring it in the global namespace.
 */
declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_API_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
