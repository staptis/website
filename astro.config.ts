import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig, passthroughImageService, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: "https://staptis.com",
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },
  output: "static",
  site: process.env.PUBLIC_URL || "https://staptis.com",
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
