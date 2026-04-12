# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal portfolio and blog site for "Inuverse" built with Astro 5 and React. Blog posts are written in Markdown and stored in `src/content/posts/YYYY/`.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Astro type checking (npx astro check)
npm run lint         # ESLint

npm run test         # Run unit tests (Vitest, single run)
npm run test:watch   # Run unit tests in watch mode
```

Unit tests live in `src/**/*.test.{ts,tsx}`. E2E tests have been removed — unit tests are sufficient for this personal blog.

To run a single unit test file: `npx vitest run src/path/to/file.test.tsx`

After non-trivial changes, run `npm run build && npm run test && npm run lint && npx astro check` to verify correctness. CI runs these same checks.

## Harness Engineering

This project follows a harness engineering approach: **automate recurring behaviors via hooks and tooling rather than relying on manual steps each time.**

- Use the `update-config` skill to configure automated hooks in Claude Code's `settings.json` (e.g., run lint before commit, run tests after file save).
- Prefer scripted migrations over manual file edits (see `scripts/migrate-posts-to-year-dirs.mjs` as an example).
- Encode decisions that must be repeated into scripts or config rather than documenting them as instructions to follow manually.

## Git Workflow

- Feature work goes on `develop`, merges to `main` via PR.
- Deploy triggers on push to `main` (Firebase Hosting via GitHub Actions).
- After a remote merge to `main`, bring local up to date with:
  ```bash
  git checkout main && git pull && git checkout develop && git merge main
  ```

## Architecture

### Content System

Posts are managed by Astro Content Collections (`src/content/posts/YYYY/`). The schema is defined in `src/content/config.ts` — frontmatter fields: `title`, `date`, `category`, `tags`, `cover`, `published`, `description`.

Posts are organized by year (`2025/`, `2026/`, …). When adding a new post to a year subdirectory, include `slug: YYYY-MM-DD-topic` in frontmatter to preserve URL compatibility (Astro uses this to override the auto-generated slug).

There is also a legacy `src/lib/posts/api.ts` that reads from a top-level `posts/` directory via `gray-matter`. It is unused by the current Astro pages — do not use it.

### Routing

File-system routing via `src/pages/`:
- `/` → `src/pages/index.astro`
- `/blog` → `src/pages/blog/index.astro` with pagination under `src/pages/blog/page/`
- `/posts/[slug]` → `src/pages/posts/[slug].astro` (static paths from content collection)
- `/category`, `/tags` → aggregated from post frontmatter

Categories are defined in `src/constants/categories.ts` (`CATEGORIES` array). Posts are associated via the `category` frontmatter field.

### Component Structure (Atomic Design)

- `src/components/atoms/` — smallest units (Meta, Tag)
- `src/components/molecules/` — composed components (PostCard, Pagination, PostNav, BackButton, TagList)
- `src/components/organisms/` — page-level sections (Header, Footer, PostHeader, PostList)
- `src/layouts/Layout.astro` — root page layout

React components (`.tsx`) are used throughout. Components without a `client:*` directive render server-side only (no JS shipped). Only add `client:load` / `client:idle` when client-side interactivity is genuinely required.

### Markdown Rendering

Plugins configured in `astro.config.mjs`:
- `remark-gfm` — GFM syntax (tables, strikethrough, etc.)
- `remark-math` + `rehype-katex` — LaTeX math
- `remarkWikiLinks` (`src/plugins/remarkWikiLinks.ts`) — Obsidian-style `[[slug]]` internal links → `/posts/slug`. Supports display text: `[[slug|表示テキスト]]`.
- Shiki code highlighting with `one-dark-pro` theme

### Styling

Single CSS file `src/styles/globals.css` (Obsidian-like minimal). **No CSS Modules, no Tailwind.** Use inline `style={{}}` or `style=""` for any per-element overrides.

Link color: `#7c3aed` (Obsidian purple). Font: Roboto Mono throughout. Max-width 740px centered on `body`.

### Constants

- `src/constants/site.ts` — site metadata (`SITE_TITLE`, `SITE_URL`, `NAV_ITEMS`, etc.)
- `src/constants/categories.ts` — category definitions
