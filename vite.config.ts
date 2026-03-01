import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isReplit =
  Boolean(process.env.REPL_ID) ||
  Boolean(process.env.REPL_SLUG) ||
  Boolean(process.env.REPLIT_DEPLOYMENT);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: isReplit ? true : undefined
  }
});
