'use client';

import { useEffect, useMemo, useState } from 'react';
import { categories, websites, type Category } from '@/lib/data';
import { Icon } from './icon';
import { WebsiteCard } from './website-card';

export function ExploreGrid() {
  const [category, setCategory] = useState('All websites');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  // The full list is rendered into the static HTML; a ?category= link only pre-selects a filter after load.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested && categories.some((item) => item.name === requested)) setCategory(requested);
  }, []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = websites.filter((item) => (category === 'All websites' || item.category === category) && (!q || [item.name, item.domain, item.tagline, item.description, item.category, item.audience, ...item.tags, ...item.features, ...item.techStack].join(' ').toLowerCase().includes(q)));
    return [...rows].sort((a, b) => sort === 'newest' ? b.added.localeCompare(a.added) : sort === 'name' ? a.name.localeCompare(b.name) : Number(b.featured) - Number(a.featured));
  }, [category, query, sort]);

  return <>
    <div className="explore-toolbar">
      <label className="search-field"><Icon name="search" size={19}/><input aria-label="Search websites" placeholder="Search names, topics, or domains..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <button className="button button-outline filter-toggle" onClick={() => setShowFilters(!showFilters)}><Icon name="filter" size={16}/> Categories</button>
      <label className="sort-select"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="newest">Recently added</option><option value="name">Name A–Z</option></select><Icon name="chevron-down" size={14}/></label>
    </div>
    <div className={`filter-chips ${showFilters ? 'filters-open' : ''}`}>
      {['All websites', ...categories.map((item) => item.name)].map((item) => <button key={item} className={`filter-chip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}
    </div>
    <div className="results-heading"><p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'website' : 'websites'} found{category !== 'All websites' ? <> in <strong>{category}</strong></> : null}</p><span>Hand-picked corners of the web</span></div>
    {filtered.length ? <div className="website-grid">{filtered.map((website) => <WebsiteCard website={website} key={website.slug}/>)}</div> : <div className="empty-state"><span className="empty-icon"><Icon name="search" size={27}/></span><h3>No websites found</h3><p>Try a different keyword or choose another category.</p><button className="button button-outline" onClick={() => { setQuery(''); setCategory('All websites'); }}>Clear filters</button></div>}
  </>;
}
