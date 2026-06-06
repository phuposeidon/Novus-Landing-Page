import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: "wrangler.toml",
    },
  }),
  site: "https://nexiscro.com",
  build: {
    assets: "_assets",
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
