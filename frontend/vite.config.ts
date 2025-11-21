import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard React 18 setup (removed experimental compiler plugin)
export default defineConfig({
  plugins: [react()],
});
