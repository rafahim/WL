'use client';

import { useEffect, useState } from 'react';
import { Icon } from './icon';

const hints = ['portfolios and personal sites…', 'online stores…', 'useful tools…', 'business websites…', 'creative studios…'];

export function HeroSearch() {
  const [n, setN] = useState(0);
  useEffect(() => { const t = window.setInterval(() => setN((v) => (v + 1) % hints.length), 2400); return () => window.clearInterval(t); }, []);
  return <button type="button" className="h-search" onClick={() => window.dispatchEvent(new Event('open-palette'))} aria-label="Search the directory">
    <Icon name="search" size={20} /><span className="h-search-text">Search <em key={n}>{hints[n]}</em></span><kbd>/</kbd>
  </button>;
}
