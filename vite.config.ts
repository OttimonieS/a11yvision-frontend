import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard React 18 setup (removed experimental compiler plugin)
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-router-dom", "react-router", "@remix-run/router"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
