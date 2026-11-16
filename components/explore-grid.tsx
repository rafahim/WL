'use client';

import { useEffect, useMemo, useState } from 'react';
import { categories, websites } from '@/lib/data';
import { Icon } from './icon';
import { WebsiteCard } from './website-card';

export function ExploreGrid() {
  const [category, setCategory] = useState('All websites');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested && categories.some((item) => item.name === requested)) setCategory(requested);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = websites.filter((item) =>
      (category === 'All websites' || item.category === category) &&
      (!q || [item.name, item.domain, item.tagline, item.description, item.category, item.audience, ...item.tags, ...item.features, ...item.techStack].join(' ').toLowerCase().includes(q))
    );
    return [...rows].sort((a, b) => sort === 'newest' ? b.added.localeCompare(a.added) : sort === 'name' ? a.name.localeCompare(b.name) : Number(b.featured) - Number(a.featured) || a.rank - b.rank);
  }, [category, query, sort]);

  return (
    <div className="folio-explore-tools">
      <div className="folio-explore-toolbar">
        <label className="folio-explore-search"><Icon name="search" size={20} /><input aria-label="Search websites" placeholder="Search websites, topics or domains..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="folio-explore-sort"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="newest">Recently added</option><option value="name">Name A–Z</option></select></label>
        <div className="folio-view-toggle" aria-label="Choose layout"><button onClick={() => setView('grid')} className={view === 'grid' ? 'active' : ''} aria-label="Grid view"><Icon name="grid" size={15} /></button><button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''} aria-label="List view"><Icon name="menu" size={15} /></button></div>
      </div>
      <div className="folio-explore-categories">{['All websites', ...categories.map((item) => item.name)].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item === 'All websites' ? 'All' : item}</button>)}</div>
      <div className="folio-results-bar"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'website' : 'websites'} found{category !== 'All websites' ? ` in ${category}` : ''}</p><span>Hand-picked corners of the web</span></div>
      {filtered.length ? <div className={`folio-card-grid ${view === 'list' ? 'is-list' : ''}`}>{filtered.map((website, index) => <WebsiteCard website={website} key={website.slug} index={index} compact={view === 'list'} />)}</div> : <div className="folio-empty"><span><Icon name="search" size={22} /></span><h3>Nothing hiding here.</h3><p>Try another keyword or choose another category.</p><button onClick={() => { setQuery(''); setCategory('All websites'); }}>Clear filters</button></div>}
    </div>
  );
}
