// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginAstro from "eslint-plugin-astro";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config(
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript rules for .ts/.tsx files
  ...tseslint.configs.recommended,

  // Astro rules for .astro files
  ...pluginAstro.configs.recommended,

  // React + accessibility for .tsx/.jsx files
  {
    files: ["**/*.{tsx,jsx}"],
    plugins: {
      // fixupPluginRules bridges eslint-plugin-react v7 with ESLint 10's flat config API
      react: fixupPluginRules(pluginReact),
      "react-hooks": fixupPluginRules(pluginReactHooks),
      "jsx-a11y": fixupPluginRules(pluginJsxA11y),
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
    },
  },

  // Team conventions (applies to all JS/TS/Astro files)
  {
    files: ["**/*.{js,mjs,ts,tsx,astro}"],
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
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
);
