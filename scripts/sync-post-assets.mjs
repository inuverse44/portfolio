#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const POSTS_DIR = path.join(cwd, 'posts');
const SRC_ASSETS_DIR = path.join(POSTS_DIR, 'assets');
const PUBLIC_DIR = path.join(cwd, 'public');

/**
 * Copy directory recursively (Node 16+ has fs.cp, but fall back if unavailable)
 */
async function copyDir(src, dest) {
  if (fs.cp) {
    await fs.promises.mkdir(dest, { recursive: true });
    await fs.promises.cp(src, dest, { recursive: true });
    return;
  }
  // Fallback implementation
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  // Ensure base dirs exist
  if (!fs.existsSync(POSTS_DIR)) return;

  // Find slugs from markdown files
  const files = await fs.promises.readdir(POSTS_DIR);
  const slugs = files
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));

  // For each slug, copy from posts/assets/<slug>/ -> public/posts/<slug>/
  for (const slug of slugs) {
    const src = path.join(SRC_ASSETS_DIR, slug);
    if (!fs.existsSync(src)) continue;

    const dest = path.join(PUBLIC_DIR, 'posts', slug);

    // Clean destination to avoid stale files
    if (fs.existsSync(dest)) {
      await fs.promises.rm(dest, { recursive: true, force: true });
    }
    await copyDir(src, dest);
    // eslint-disable-next-line no-console
    console.log(`[sync-post-assets] Copied: ${path.relative(cwd, src)} -> ${path.relative(cwd, dest)}`);
  }
}

main().catch((err) => {
  console.error('[sync-post-assets] Failed:', err);
  process.exit(1);
});

