# Coding Guidelines

This document outlines the coding standards and best practices for the Inuverse portfolio project.

## 🏗 Architecture & Patterns
- **Framework**: Next.js (Pages Router).
- **Component Structure**: Follow Atomic Design principles.
  - `src/components/atoms`: Basic UI elements (Button, Tag, Meta).
  - `src/components/molecules`: Combinations of atoms (Navigation, PostCard).
  - `src/components/organisms`: Complex sections (Header, Footer, PostBody).
- **Data Fetching**: Use `getStaticProps` and `getStaticPaths` for static site generation.

## TypeScript & Logic
- **Strict Mode**: `strict: true` is enabled in `tsconfig.json`. Ensure all types are explicitly defined.
- **Interfaces**: Use `interface` for component props and data models.
- **Imports**: Use the `@/` alias for internal modules (configured in `tsconfig.json`).
- **Naming**:
  - Components/Interfaces: `PascalCase`.
  - Functions/Variables: `camelCase`.
  - Constants: `SCREAMING_SNAKE_CASE`.

## 🎨 Styling (Vanilla CSS Modules)
- **No Tailwind**: Use plain CSS Modules (`.module.css`).
- **Design Tokens**: Use CSS variables defined in `src/styles/globals.css` for colors, spacing, and radius.
- **Naming**: Use `camelCase` for CSS class names to ensure compatibility with TS imports.
- **Responsiveness**: Use mobile-first approach or standard media queries within modules.

## 🧪 Testing
- **Vitest**: Preferred test runner.
- **Placement**: Place tests alongside the implementation (e.g., `Header.test.tsx` next to `Header.tsx`).
- **Scope**:
  - Logic/Utility: High coverage for `lib/`.
  - UI: Verify rendering, links, and basic interactions.

## 📝 Markdown & Content
- **Posts**: Located in `posts/`. Use YAML frontmatter for metadata.
- **Assets**: Place images in `public/images/posts/[post-slug]/`.
- **References**: Use absolute paths in Markdown (e.g., `![alt](/images/posts/[slug]/image.png)`).

## Git & Workflow
- **Commit Messages**: Use prefixes like `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- **Branching**: Work on `develop`, then merge to `main` for production.
- **CI**: Ensure all tests and linting pass before merging.
