'use client';

import { useMemo, useState } from 'react';
import type { Website } from '@/lib/data';

/**
 * Show the logo/fav icon published by the listed website's own domain.
 * First request the site's own /favicon.ico, then use Google's favicon cache
 * for sites that publish their icon at a different path. Each listing gets a
 * distinct URL derived from its own website address; initials are only a last
 * resort when neither official icon source can be loaded.
 */
export function WebsiteLogo({ website, size = 'regular' }: { website: Website; size?: 'small' | 'regular' | 'large' }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = useMemo(() => {
    const canonicalSiteUrl = `https://${website.domain}/`;
    const directFavicon = `${canonicalSiteUrl}favicon.ico`;
    const cachedFavicon = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(canonicalSiteUrl)}&sz=128`;
    const own = website.logoUrl?.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${website.logoUrl}` : website.logoUrl;
    return [own, directFavicon, cachedFavicon].filter((item): item is string => Boolean(item));
  }, [website.logoUrl, website.domain]);
  // Logos shipped with the site load instantly, so they should never wait for lazy loading.
  const isLocal = Boolean(website.logoUrl?.startsWith('/')) && sourceIndex === 0;
  const source = sources[sourceIndex];

  return (
    <span className={`website-logo website-logo-${size}`} style={{ backgroundColor: website.color }} aria-label={`${website.name} logo`}>
      {source ? (
        <img
          src={source}
          alt={`${website.name} logo`}
          loading={isLocal ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={isLocal ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onError={() => setSourceIndex((current) => Math.min(current + 1, sources.length))}
        />
      ) : (
        <span className="website-logo-fallback" style={{ color: website.accent }}>{website.logoText}</span>
      )}
    </span>
  );
}
