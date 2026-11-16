import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from './icon';
import type { Website } from '@/lib/data';

export function WebsiteCard({ website, compact = false }: { website: Website; compact?: boolean }) {
  return <article className={`listing-card ${compact ? 'card-compact' : ''}`} style={{ '--card-accent': website.accent } as CSSProperties}>
    <Link href={`/websites/${website.slug}/`} aria-label={`Read the ${website.name} website listing`}>
      <div className="h-card-img">
        <img src={`/og/${website.slug}.png`} alt={`${website.name} website preview`} width={1200} height={630} loading="lazy" />
        <span className="h-pill">{website.category}</span>
        {website.featured && <span className="h-star"><Icon name="sparkles" size={12} /> Featured</span>}
      </div>
      <div className="h-card-body">
        <div className="h-card-top">
          <h3>{website.name}</h3>
          <span className="h-go"><Icon name="arrow-up-right" size={16} /></span>
        </div>
        <p>{website.tagline}</p>
        <div className="h-card-foot">
          <span><i /> {website.domain}</span>
          <span>{website.tags.slice(0, 2).join(' · ')}</span>
        </div>
      </div>
    </Link>
  </article>;
}
