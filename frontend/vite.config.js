import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// __dirname -> ruta absoluta de donde estamos ejecutando

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
