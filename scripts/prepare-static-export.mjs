import { existsSync, rmSync } from 'node:fs';
import { relative, resolve } from 'node:path';

// Older copies of this project used explicit /sitemap.xml and /robots.txt
// route handlers. GitHub uploads that replace files without deleting removed
// paths can leave those route folders beside the current metadata routes.
// Remove legacy route locations before Next.js discovers the App Router tree.
const legacyStaticMetadataRoutes = [
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
  'app/robots.txt',
  'src/app/robots.txt',
  'pages/robots.txt',
  'pages/robots.txt.ts',
  'pages/robots.txt.tsx',
  'pages/robots.txt.js',
  'pages/robots.txt.jsx',
  'src/pages/robots.txt',
  'src/pages/robots.txt.ts',
  'src/pages/robots.txt.tsx',
  'src/pages/robots.txt.js',
  'src/pages/robots.txt.jsx',
];

for (const candidate of legacyStaticMetadataRoutes) {
  const absolutePath = resolve(process.cwd(), candidate);
  if (!existsSync(absolutePath)) continue;

  rmSync(absolutePath, { recursive: true, force: true });
  console.log(`[static-export] Removed legacy static metadata route: ${relative(process.cwd(), absolutePath)}`);
}

console.log('[static-export] Static metadata routes: app/sitemap.ts and app/robots.ts.');
