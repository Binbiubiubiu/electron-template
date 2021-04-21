import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "app",
    emptyOutDir: true,
  },
  plugins: [reactRefresh()],
});
