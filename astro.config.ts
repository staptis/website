import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import { env } from "./src/env";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: env.PUBLIC_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: true,
  compressHTML: true,
  image: {
    service: passthroughImageService(),
  },
});
