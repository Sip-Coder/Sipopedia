import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  build: {
    sourcemap: "hidden",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("@supabase")) return "vendor-supabase";
            return "vendor";
          }

          if (id.includes("/src/components/")) {
            if (id.includes("SipAcademyWineLessons")) return "page-sip-academy";
            if (id.includes("BeverageQuiz")) return "page-beverage-quiz";
            if (id.includes("BeverageNews")) return "page-beverage-news";
            if (id.includes("TastingGroups")) return "page-tasting-groups";
            if (id.includes("TastingJournal")) return "page-tasting-journal";
            if (id.includes("FlavorWheel")) return "page-flavor-wheel";
            if (id.includes("Regions")) return "page-regions";
            if (id.includes("SommEvents")) return "page-somm-events";
            if (id.includes("AiNews")) return "page-ai-news";
            if (id.includes("Terminology")) return "page-terminology";
          }

          if (id.includes("/src/data/regions")) return "data-regions";
          return undefined;
        }
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true
  }
});
