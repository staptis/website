// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: process.env.ASTRO_SITE || "https://staptis.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
