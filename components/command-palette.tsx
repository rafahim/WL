'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, categorySlug, websites } from '@/lib/data';
import { Icon } from './icon';

type Item = { label: string; sub: string; href: string; kind: string; hay: string };

const items: Item[] = [
  { label: 'Explore all websites', sub: 'Browse the full directory', href: '/explore/', kind: 'Page', hay: 'explore browse all directory' },
  { label: 'Submit a website', sub: 'Request a listing', href: '/submit/', kind: 'Page', hay: 'submit add listing request' },
  { label: 'About BD Web List', sub: 'Who we are', href: '/about/', kind: 'Page', hay: 'about us' },
  { label: 'Listing guidelines', sub: 'How listings are reviewed', href: '/guidelines/', kind: 'Page', hay: 'guidelines rules review' },
  ...categories.map((c) => ({ label: c.name, sub: c.description, href: `/categories/${categorySlug(c.name)}/`, kind: 'Category', hay: `${c.name} ${c.description}`.toLowerCase() })),
  ...websites.map((w) => ({ label: w.name, sub: `${w.domain} · ${w.category}`, href: `/websites/${w.slug}/`, kind: 'Website', hay: `${w.name} ${w.domain} ${w.category} ${w.tagline} ${w.tags.join(' ')}`.toLowerCase() }))
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (t ? items.filter((it) => it.hay.includes(t) || it.label.toLowerCase().includes(t)) : items.filter((it) => it.kind !== 'Category')).slice(0, 9);
  }, [q]);

  useEffect(() => {
    const show = () => { setQ(''); setI(0); setOpen(true); };
    const key = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName || '');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); show(); }
      else if (e.key === '/' && !typing) { e.preventDefault(); show(); }
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('open-palette', show);
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('open-palette', show); window.removeEventListener('keydown', key); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', open);
    if (open) window.setTimeout(() => input.current?.focus(), 30);
  }, [open]);

  const go = (it?: Item) => { if (!it) return; setOpen(false); router.push(it.href); };
  if (!open) return null;
  return <div className="pal-backdrop" onMouseDown={() => setOpen(false)}>
    <div className="pal" role="dialog" aria-modal="true" aria-label="Search BD Web List" onMouseDown={(e) => e.stopPropagation()}>
      <div className="pal-input"><Icon name="search" size={18} /><input ref={input} value={q} placeholder="Search websites, categories, pages…" onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={(e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setI((v) => Math.min(v + 1, results.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
        else if (e.key === 'Enter') go(results[i]);
      }} /><kbd>ESC</kbd></div>
      <div className="pal-list">{results.length ? results.map((it, n) => <button key={it.href} className={`pal-item ${n === i ? 'on' : ''}`} onMouseEnter={() => setI(n)} onClick={() => go(it)}><span className="pal-kind">{it.kind}</span><span className="pal-text"><b>{it.label}</b><small>{it.sub}</small></span><Icon name="arrow-up-right" size={15} /></button>) : <p className="pal-empty">No matches for “{q}”. Try another keyword, or <button onClick={() => go(items[1])}>submit this website</button>.</p>}</div>
      <div className="pal-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>⌘K</kbd> toggle</span></div>
    </div>
  </div>;
}
