// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { env } from "./src/env";

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
