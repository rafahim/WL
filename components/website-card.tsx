import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from './icon';
import { websites, type Website } from '@/lib/data';

export function WebsiteCard({ website, compact = false }: { website: Website; compact?: boolean }) {
  return <article className={`website-card ${compact ? 'card-compact' : ''} card-tone-${website.rank}`} style={{ '--card-accent': website.accent, '--card-tile': website.color } as CSSProperties}>
    <Link href={`/websites/${website.slug}/`} className="card-main-link" aria-label={`Read the ${website.name} website listing`}>
      <div className="card-visual">
        <div className="card-visual-meta"><span className="card-category-pill">{website.category}</span><span className="card-rank">{String(website.rank).padStart(2, '0')} <i>/ {String(websites.length).padStart(2, '0')}</i></span></div>
        <div className="card-window">
          <div className="card-window-bar"><span /><span /><span /><small>{website.domain}</small><Icon name="arrow-up-right" size={12} /></div>
          <div className="card-window-content">
            <div className="card-window-brand"><b>{website.logoText}</b><span>{website.name}</span><i>↗</i></div>
            <div className="card-window-message"><small>DISCOVERED ON BD WEB LIST</small><strong>{website.name}</strong><span>{website.tagline}</span></div>
            <div className="card-art-shape card-art-shape-one" /><div className="card-art-shape card-art-shape-two" />
            <div className="card-window-footer">{website.tags.slice(0, 2).map((tag) => <i key={tag}>{tag}</i>)}</div>
          </div>
        </div>
        <span className="card-visual-note">BD / INDEX — {String(website.rank).padStart(2, '0')}</span>
        {website.featured && <span className="card-featured"><Icon name="sparkles" size={11} /> FEATURED</span>}
      </div>
      <div className="card-content">
        <div className="card-overline"><span className="category-dot" />{website.category}<span className="card-label">{website.label}</span></div>
        <div className="card-title-row"><h3>{website.name}</h3><span className="card-arrow"><Icon name="arrow-up-right" size={18} /></span></div>
        <p>{website.tagline}</p>
        <div className="card-content-tags">{website.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="card-domain"><span><i />{website.domain}</span><span>READ LISTING <Icon name="arrow-right" size={13} /></span></div>
      </div>
    </Link>
  </article>;
}
