import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.inuverse.dev';

function generateSitemap() {
  const postsDir = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  const staticPages = [
    '',
    '/blog',
    '/category',
    '/about',
    '/external',
  ];

  const postPages = filenames.map(filename => `/posts/${filename.replace(/\.md$/, '')}`);

  // Pagination for blog: page size 10
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filenames.length / pageSize));
  const blogPages = Array.from({ length: totalPages - 1 }, (_, i) => `/blog/page/${i + 2}`);

  const allPages = [...staticPages, ...blogPages, ...postPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(page => {
      const url = `${SITE_URL}${page}`;
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' || page === '/blog' ? 'daily' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page === '/blog' ? '0.8' : '0.5'}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('[generate-sitemap] Generated public/sitemap.xml');
}

generateSitemap();
