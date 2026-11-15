import type { Metadata } from 'next';
import { siteConfig } from './config';

const defaultImage = { url: '/og-image.png', width: 1200, height: 630, alt: 'BD Web List — Discover, Explore & Promote Websites' };

// Next.js replaces (not merges) the parent openGraph object, so every page that sets
// its own openGraph must repeat the share image. This helper keeps that in one place.
export function pageMetadata({ title, description, path, ogTitle }: { title: string; description: string; path: string; ogTitle?: string }): Metadata {
  const shareTitle = ogTitle ?? `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: siteConfig.name, title: shareTitle, description, url: `${siteConfig.url}${path}`, images: [defaultImage] },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: [defaultImage.url] }
  };
}
