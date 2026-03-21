import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

var isReplit = Boolean(process.env.REPL_ID) ||
    Boolean(process.env.REPL_SLUG) ||
    Boolean(process.env.REPLIT_DEPLOYMENT);

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        port: 5000,
        allowedHosts: true
    }
});
