# Copilot Instructions

## Project Overview

Temte's Fades & Shaves — a single-page barber shop website for a barber in Eden Prairie, MN. Built with Astro 5 (SSR via Node adapter), Tailwind CSS v4, Keystatic CMS, and Markdoc.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint
npm run lint:fix   # ESLint with auto-fix
```

There is no test suite.

Keystatic Admin UI (dev only): http://127.0.0.1:4321/keystatic

## Architecture

This is a single-page site. All visible sections live in `src/pages/index.astro` — there is no routing. The page assembles section-based components: `Header`, `Hero`, `AboutMe`, `Location`, `Footer`. Some sections (Portfolio, Services) are currently inline in `index.astro` as placeholders.

`src/layouts/Layout.astro` exists but is **not used** by `index.astro` — the page builds its own HTML shell directly.

**Keystatic CMS** (`keystatic.config.ts`) manages content via:
- Local storage in dev (`kind: "local"`)
- GitHub storage in production (`kind: "github"`, repo `hoyt-steele-design/temtefadezzz`)

Currently only a `hero` singleton is defined in Keystatic, but `index.astro` still passes hero data as hardcoded props — the CMS integration for live data reads is not yet wired up.

## Key Conventions

### Tailwind v4 — CSS-first config

Tailwind v4 is configured via `src/styles/global.css` using `@theme`, **not** `tailwind.config.js`. Custom tokens:

```css
--font-garamond: 'Cormorant Garamond', serif;  /* → font-garamond */
--font-inter: 'Inter', sans-serif;              /* → font-inter */
--color-gold: #c4a84e;                          /* → text-gold, bg-gold, border-gold */
```

Use `font-garamond` for headings/display text and `font-inter` for UI labels (buttons, nav).

### CSS custom properties for dynamic background images

To use Astro-optimized images as CSS backgrounds, use the CSS variable pattern — Tailwind's arbitrary value syntax can't use dynamic Astro expressions directly:

```astro
<div
  class="[background-image:var(--bg-url)] bg-cover bg-center"
  style={`--bg-url: url(${optimizedImage.src})`}
>
```

### Images

- `src/images/` — Astro-managed images, imported in frontmatter and passed through `getImage()` or as `<img src={img.src}>`. Use for layout/design images.
- `public/images/` — Keystatic-managed images (CMS uploads go here). Reference by path string, not import.

### Section scroll anchoring

All sections use `id` + `scroll-mt-16` to account for the fixed header height:

```html
<section id="portfolio" class="scroll-mt-16">
```

### TypeScript

- Strict mode (`astro/tsconfigs/strict`)
- Type-only imports **must** use `type` keyword — enforced by ESLint:
  ```ts
  import type { Props } from './types'
  ```
- Unused vars prefixed with `_` are allowed; others error.

### Navigation drawer

The mobile nav uses a native HTML `<dialog>` element (`id="nav-drawer"`) controlled via `showModal()` / `close()`. Nav links close the drawer inline via `onclick`. Interaction script lives in a `<script>` block at the bottom of `Header.astro`.

### Booking link

External booking is handled via Booksy. The URL is:
```
https://booksy.com/en-us/936262_temtes-fades-shaves_barber-shop_24080_eden-prairie#ba_s=seo
```
