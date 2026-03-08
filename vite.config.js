import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Shared/Internal/MiHub/",
  plugins: [react()],
});
