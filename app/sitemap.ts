import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { MIN_INDEXABLE_CATEGORY_LISTINGS, categories, categorySlug, latestListingUpdate, liveWebsites } from '@/lib/data';

// lastModified reflects real content changes (latest listing date) instead of a fixed or per-build date.
const staticPages = [
  { path: '', lastModified: latestListingUpdate, priority: 1, changeFrequency: 'weekly' as const },
  { path: '/explore/', lastModified: latestListingUpdate, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/submit/', lastModified: '2026-11-15', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/about/', lastModified: '2026-11-15', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/ra-fahim/', lastModified: '2026-11-17', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/guidelines/', lastModified: '2026-11-15', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy/', lastModified: '2026-11-15', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms/', lastModified: '2026-11-15', priority: 0.3, changeFrequency: 'yearly' as const }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const indexableCategories = categories.filter((category) => liveWebsites.filter((website) => website.category === category.name).length >= MIN_INDEXABLE_CATEGORY_LISTINGS);
  return [
    ...staticPages.map((page) => ({ url: `${siteConfig.url}${page.path}`, lastModified: new Date(`${page.lastModified}T12:00:00Z`), changeFrequency: page.changeFrequency, priority: page.priority })),
    ...indexableCategories.map((category) => ({ url: `${siteConfig.url}/categories/${categorySlug(category.name)}/`, lastModified: new Date(`${latestListingUpdate}T12:00:00Z`), changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...liveWebsites.map((website) => ({ url: `${siteConfig.url}/websites/${website.slug}/`, lastModified: new Date(`${website.infoChecked > website.added ? website.infoChecked : website.added}T12:00:00Z`), changeFrequency: 'monthly' as const, priority: website.featured ? 0.8 : 0.65 }))
  ];
}
