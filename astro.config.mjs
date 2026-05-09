import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: netlify(),
  integrations: [react(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
});
