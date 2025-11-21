import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // only the public entry you actually import
    include: ["react-router-dom", "@remix-run/router"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});