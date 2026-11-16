import { existsSync, rmSync } from 'node:fs';
import { relative, resolve } from 'node:path';

// Older copies of this project used an explicit /sitemap.xml route handler.
// GitHub uploads that replace files without deleting removed paths can leave
// that route beside the current app/sitemap.ts metadata route. Remove those
// legacy route locations before Next.js discovers the App Router tree.
const legacySitemapRoutes = [
  'app/sitemap.xml',
  'src/app/sitemap.xml',
  'pages/sitemap.xml',
  'pages/sitemap.xml.ts',
  'pages/sitemap.xml.tsx',
  'pages/sitemap.xml.js',
  'pages/sitemap.xml.jsx',
  'src/pages/sitemap.xml',
  'src/pages/sitemap.xml.ts',
  'src/pages/sitemap.xml.tsx',
  'src/pages/sitemap.xml.js',
  'src/pages/sitemap.xml.jsx',
];

for (const candidate of legacySitemapRoutes) {
  const absolutePath = resolve(process.cwd(), candidate);
  if (!existsSync(absolutePath)) continue;

  rmSync(absolutePath, { recursive: true, force: true });
  console.log(`[static-export] Removed legacy sitemap route: ${relative(process.cwd(), absolutePath)}`);
}

console.log('[static-export] Sitemap metadata route is app/sitemap.ts.');
