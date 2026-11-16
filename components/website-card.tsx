import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { Website } from '@/lib/data';
import { Icon } from './icon';
import { WebsiteLogo } from './website-logo';

export function WebsiteCard({ website, compact = false, index = website.rank - 1 }: { website: Website; compact?: boolean; index?: number }) {
  return (
    <article className={`folio-card ${compact ? 'folio-card-compact' : ''}`} style={{ '--folio-accent': website.accent } as CSSProperties}>
      <Link href={`/websites/${website.slug}/`} className="folio-card-link" aria-label={`Read the ${website.name} listing`}>
        <div className="folio-card-topline">
          <span className="folio-card-category">{website.category}</span>
          {website.featured && <span className="folio-featured"><Icon name="sparkles" size={11} /> Featured</span>}
        </div>
        <div className="folio-card-brand-row">
          <WebsiteLogo website={website} size="large" />
          <div className="folio-card-brand-copy">
            <h3>{website.name}</h3>
            <span>{website.domain}</span>
          </div>
          <span className="folio-card-rank">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <p className="folio-card-description">{compact ? website.tagline : website.description}</p>
        <div className="folio-card-bottom">
          <div className="folio-card-tags">{website.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <span className="folio-card-arrow" aria-hidden="true"><Icon name="arrow-up-right" size={16} /></span>
        </div>
      </Link>
    </article>
  );
}
