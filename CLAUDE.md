# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal portfolio and blog site for "Inuverse" built with Astro 5 and React. Blog posts are written in Markdown and stored in `src/content/posts/`.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Astro type checking
npm run lint         # ESLint

npm run test         # Run unit tests (Vitest, single run)
npm run test:watch   # Run unit tests in watch mode
npm run test:e2e     # Run Playwright e2e tests (builds first)
npm run test:e2e:ui  # Playwright with interactive UI
```

Unit tests live in `src/**/*.test.{ts,tsx}`. E2e tests live in `tests/e2e/`.

To run a single unit test file: `npx vitest run src/path/to/file.test.tsx`

## Architecture

### Content System

Posts are managed by Astro Content Collections (`src/content/posts/`). The schema is defined in `src/content/config.ts` — frontmatter fields are: `title`, `date`, `category`, `tags`, `cover`, `published`, `description`.

There is also a legacy `src/lib/posts/api.ts` that reads from a top-level `posts/` directory via `gray-matter`. This is a leftover from the Next.js era (`_legacy_nextjs/`) and is not used by the main Astro pages, which use `getCollection('posts')` from `astro:content` instead.

### Routing

File-system routing via `src/pages/`:
- `/` → `src/pages/index.astro`
- `/blog` → `src/pages/blog/index.astro` with pagination under `src/pages/blog/page/`
- `/posts/[slug]` → `src/pages/posts/[slug].astro` (static paths from content collection)
- `/category`, `/tags` → aggregated from post frontmatter

Categories are defined in `src/constants/categories.ts` (`CATEGORIES` array). Posts are associated to a category via the `category` frontmatter field (the `posts` array field in `CategoryDefinition` is deprecated).

### Component Structure (Atomic Design)

- `src/components/atoms/` — smallest units (Meta, Tag)
- `src/components/molecules/` — composed components (PostCard, Pagination, ActivityHeatmap, PostNav, BackButton, Navigation, TagList)
- `src/components/organisms/` — page-level sections (Header, Footer, PostHeader, PostBody, MobileSidebar, DesktopNav)
- `src/layouts/Layout.astro` — root page layout wrapping all pages

React components (`.tsx`) are used for interactive UI. Astro components (`.astro`) are used for static/server-rendered content. The `client:load` directive is used where client-side interactivity is needed.

### Markdown Rendering

Astro's built-in content rendering handles MD files. Plugins configured in `astro.config.mjs`:
- `remark-gfm` — GFM syntax (tables, strikethrough, etc.)
- `remark-math` + `rehype-katex` — LaTeX math
- `remarkWikiLinks` (`src/plugins/remarkWikiLinks.ts`) — Obsidian-style `[[slug]]` internal links → `/posts/slug`. Supports display text: `[[slug|表示テキスト]]`.
- Shiki code highlighting with `one-dark-pro` theme

### Styling

Single CSS file `src/styles/globals.css` (Obsidian-like minimal). No CSS Modules, no Tailwind. Inline styles via `style={{}}` or `style=""` are used in components for any minor layout needs.

Link color: `#7c3aed` (Obsidian purple). Font: Roboto Mono throughout. Max-width 740px centered on `body`.

### Constants

- `src/constants/site.ts` — site metadata (`SITE_TITLE`, `SITE_URL`, `NAV_ITEMS`, etc.)
- `src/constants/categories.ts` — category definitions
