import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/userProfile": "http://84.247.171.46:8080",
      "/media": "http://84.247.171.46:8080",
      "/config": "http://84.247.171.46:8080",
      "/dashboard": "http://84.247.171.46:8080",
    },
  },
});
