'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './icon';
import { SiteLogo } from './site-logo';

const links = [
  { href: '/explore/', label: 'Index', number: '01' },
  { href: '/#collections', label: 'Curations', number: '02' },
  { href: '/about/', label: 'Manifesto', number: '03' }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="folio-header">
      <div className="folio-nav-wrap">
        <SiteLogo />
        <nav className={`folio-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''} onClick={() => setOpen(false)}>
              <sup>{link.number}</sup> {link.label}
            </Link>
          ))}
          <Link href="/submit/" className="folio-mobile-submit" onClick={() => setOpen(false)}>Nominate a site <Icon name="arrow-up-right" size={15} /></Link>
          <Link href="/ra-fahim/" className="folio-mobile-link" onClick={() => setOpen(false)}>About the developer</Link>
        </nav>
        <Link href="/submit/" className="folio-header-cta">Nominate a site <span>↗</span></Link>
        <button className="folio-menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <Icon name={open ? 'x' : 'menu'} size={21} />
        </button>
      </div>
    </header>
  );
}
