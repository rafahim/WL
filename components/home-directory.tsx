'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { categories, websites } from '@/lib/data';
import { Icon } from './icon';
import { WebsiteCard } from './website-card';

const accentCategories = ['All websites', ...categories.map((item) => item.name)];

type ViewMode = 'grid' | 'list';

export function HomeDirectory() {
  const [category, setCategory] = useState<string>('All websites');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('rank');
  const [view, setView] = useState<ViewMode>('grid');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = websites.filter((item) =>
      (category === 'All websites' || item.category === category) &&
      (!q || [item.name, item.domain, item.tagline, item.description, item.category, item.audience, ...item.tags, ...item.features, ...item.techStack].join(' ').toLowerCase().includes(q))
    );
    return [...rows].sort((a, b) => {
      if (sort === 'newest') return b.added.localeCompare(a.added) || a.rank - b.rank;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return a.rank - b.rank;
    });
  }, [category, query, sort]);

  return (
    <section className="folio-directory" id="directory">
      <div className="folio-container">
        <div className="folio-directory-heading">
          <div>
            <p className="folio-eyebrow"><span /> The Bangladesh index</p>
            <h2>Best of<br /><em>the web.</em></h2>
          </div>
          <div className="folio-directory-controls">
            <label className="folio-search">
              <Icon name="search" size={21} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${websites.length} exceptional websites...`} aria-label="Search websites" />
              <kbd>⌘ K</kbd>
            </label>
            <div className="folio-category-tabs" aria-label="Filter by category">
              {accentCategories.map((item) => (
                <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? 'active' : ''}>
                  {item === 'All websites' ? 'All' : item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="folio-results-bar">
          <p><strong>{filtered.length}</strong> {filtered.length === 1 ? 'website' : 'websites'} found</p>
          <div className="folio-results-actions">
            <label>Sort by
              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort websites">
                <option value="rank">Directory order</option>
                <option value="newest">Recently added</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
            <div className="folio-view-toggle" aria-label="Choose layout">
              <button type="button" onClick={() => setView('grid')} aria-label="Grid view" className={view === 'grid' ? 'active' : ''}><Icon name="grid" size={15} /></button>
              <button type="button" onClick={() => setView('list')} aria-label="List view" className={view === 'list' ? 'active' : ''}><Icon name="menu" size={15} /></button>
            </div>
          </div>
        </div>

        {filtered.length ? (
          <div className={`folio-card-grid ${view === 'list' ? 'is-list' : ''}`}>
            {filtered.map((website, index) => <WebsiteCard key={website.slug} website={website} index={index} compact={view === 'list'} />)}
          </div>
        ) : (
          <div className="folio-empty">
            <span><Icon name="search" size={22} /></span>
            <h3>Nothing hiding here.</h3>
            <p>Try another keyword or explore everything.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('All websites'); }}>Clear filters</button>
          </div>
        )}
        <div className="folio-directory-foot"><span>END OF INDEX / {String(filtered.length).padStart(2, '0')} RESULTS</span><Link href="/submit/">Missing a good one? Nominate it <Icon name="arrow-up-right" size={13} /></Link></div>
      </div>
    </section>
  );
}
