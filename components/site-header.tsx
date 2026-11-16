'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CommandPalette } from './command-palette';
import { Icon } from './icon';
import { SiteLogo } from './site-logo';

const links = [
  { href: '/explore/', label: 'Explore' },
  { href: '/#categories', label: 'Categories' },
  { href: '/about/', label: 'About' },
  { href: '/guidelines/', label: 'Guidelines' }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  return <><header className="site-header"><div className="container nav-wrap">
    <SiteLogo />
    <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''} onClick={() => setOpen(false)}>{link.label}</Link>)}
      <Link href="/submit/" className="nav-submit mobile-submit" onClick={() => setOpen(false)}>Submit a website <Icon name="arrow-up-right" size={16} /></Link>
    </nav>
    <div className="nav-actions">
      <button type="button" className="nav-search" onClick={() => window.dispatchEvent(new Event('open-palette'))} aria-label="Search"><Icon name="search" size={15} /><span>Search</span><kbd>⌘K</kbd></button>
      <Link href="/submit/" className="button button-accent button-small nav-cta">Submit <Icon name="arrow-up-right" size={14} /></Link>
    </div>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'x' : 'menu'} size={22} /></button>
  </div></header><CommandPalette /></>;
}
