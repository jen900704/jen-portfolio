import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/jen-portfolio/",   // ★ GitHub Pages 必要
  plugins: [react()],
});

