// @ts-check
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import pluginAstro from "eslint-plugin-astro";

export default defineConfig(
  // Base JS recommended rules
  js.configs.recommended,
  tseslint.configs.recommended,

  // Astro rules for .astro files
  pluginAstro.configs.recommended,

  // Team conventions (applies to all JS/TS/Astro files)
  {
    files: ["**/*.{js,mjs,ts,astro}"],
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off", // handled by @typescript-eslint
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
    },
  },

  // Relax type-import rule in ambient declaration files
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },

  // Ignore build artifacts and generated files
  {
    ignores: ["dist/", ".astro/", ".netlify/", "node_modules/"],
  },
);
