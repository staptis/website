import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";
import { env } from "./src/env";

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
