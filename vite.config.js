import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use root base for public deploy (Cloudflare Pages, Netlify, mihub.ai)
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
});
