import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Ensure the robots metadata route is emitted as a static file for GitHub Pages.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteConfig.url}/sitemap.xml` };
}
