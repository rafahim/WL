'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Icon } from './icon';
import { SiteLogo } from './site-logo';

const links = [
  { href: '/explore/', label: 'Explore' },
  { href: '/#categories', label: 'Categories' },
  { href: '/about/', label: 'About' }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="container nav-wrap">
    <SiteLogo />
    <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''} onClick={() => setOpen(false)}>{link.label}</Link>)}
      <Link href="/guidelines/" className="mobile-nav-link" onClick={() => setOpen(false)}>Guidelines</Link>
      <Link href="/submit/" className="nav-submit mobile-submit" onClick={() => setOpen(false)}>Submit a website <Icon name="arrow-up-right" size={16} /></Link>
    </nav>
    <div className="nav-actions"><Link href="/guidelines/" className="nav-quiet">Guidelines</Link><Link href="/submit/" className="button button-dark button-small">Submit a website <Icon name="arrow-up-right" size={15} /></Link></div>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'x' : 'menu'} size={22} /></button>
  </div></header>;
}
