# Gemini Context & Guardrails

This file provides critical context, architectural decisions, and operational guardrails for LLM agents working on this repository.

## 🚨 Critical Mandates (Guardrails)

1.  **NO Tailwind CSS**: Strictly use **CSS Modules** (`.module.css`) and vanilla CSS. Do not suggest or install Tailwind.
2.  **Atomic Design**: Strictly follow the directory structure:
    -   `src/components/atoms`
    -   `src/components/molecules`
    -   `src/components/organisms`
3.  **Next.js Pages Router**: This project uses the **Pages Router**, not the App Router.
    -   Use `getStaticProps` / `getStaticPaths` for data fetching.
    -   Routing is file-system based in `src/pages`.
4.  **TypeScript Strictness**:
    -   No `any`.
    -   Explicit return types for functions are preferred.
    -   Use `interface` for Props and State.
5.  **Testing**:
    -   **Vitest** is the runner.
    -   Unit tests for logic (`lib/`) are mandatory.
    -   Component tests (`@testing-library/react`) should verify basic rendering and interactions.
6.  **Image Handling**:
    -   Blog images MUST go to `public/images/posts/[post-slug]/`.
    -   Reference them in Markdown as `/images/posts/[post-slug]/filename.ext`.

## 📂 Project Overview

-   **Type**: Personal Portfolio & Blog
-   **Stack**: Next.js 15+ (Pages Router), React 19, TypeScript.
-   **Deployment**: Dockerized on Google Cloud Run.
-   **Content**: Markdown (`posts/`) with `gray-matter`.

## 🛠 Operational Workflow

1.  **Branching**:
    -   Develop features on `develop`.
    -   Production is `main`.
2.  **Commands**:
    -   Dev: `npm run dev`
    -   Build: `npm run build` (Next.js build + Sitemap generation)
    -   Test: `npm run test`
    -   Lint: `npm run lint`
3.  **Commits**: Follow conventional commits (e.g., `feat:`, `fix:`, `refactor:`, `docs:`).

## 📚 Key References

-   **[AGENTS.md](./AGENTS.md)**: Detailed architectural overview and tech stack.
-   **[CODING_GUIDELINES.md](./CODING_GUIDELINES.md)**: Specific coding rules, naming conventions, and patterns.

Always review `CODING_GUIDELINES.md` before generating code to ensure style consistency.
