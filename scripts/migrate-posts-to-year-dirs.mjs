/**
 * Moves all flat .md files in src/content/posts/ into year-based subdirectories.
 * Injects `slug: <original-slug>` into each frontmatter so URLs stay unchanged.
 *
 * Usage: node scripts/migrate-posts-to-year-dirs.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.resolve(__dirname, '../src/content/posts');

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

if (files.length === 0) {
  console.log('No flat .md files found — already migrated?');
  process.exit(0);
}

for (const filename of files) {
  const srcPath = path.join(postsDir, filename);
  const slug = filename.replace(/\.md$/, '');

  // Extract year from filename prefix YYYY-MM-DD
  const match = slug.match(/^(\d{4})-/);
  if (!match) {
    console.warn(`Skipping (no date prefix): ${filename}`);
    continue;
  }
  const year = match[1];

  // Read file content
  let content = fs.readFileSync(srcPath, 'utf8');

  // Inject slug into frontmatter (only if not already present)
  if (/^---\n/.test(content)) {
    if (!/^\s*slug\s*:/m.test(content)) {
      content = content.replace(/^---\n/, `---\nslug: ${slug}\n`);
    }
  } else {
    console.warn(`Skipping (no frontmatter): ${filename}`);
    continue;
  }

  // Create year subdirectory
  const yearDir = path.join(postsDir, year);
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir);
    console.log(`Created directory: ${year}/`);
  }

  // Write to new location and delete original
  const destPath = path.join(yearDir, filename);
  fs.writeFileSync(destPath, content, 'utf8');
  fs.unlinkSync(srcPath);

  console.log(`  ${filename} → ${year}/${filename}`);
}

console.log('\nDone.');
