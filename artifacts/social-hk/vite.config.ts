import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;
const basePath = process.env.BASE_PATH || "/";
const isReplit = !!process.env.REPL_ID;

export default defineConfig(async () => {
  const replitPlugins = isReplit && process.env.NODE_ENV !== "production"
    ? await Promise.all([
        import("@replit/vite-plugin-runtime-error-modal").then((m) => m.default()),
        import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer({ root: path.resolve(import.meta.dirname, "..") })
        ),
        import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
      ]).catch(() => [])
    : [];

  return {
    base: basePath,
    plugins: [react(), tailwindcss(), ...replitPlugins],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
