import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import './premium.css';
import './redesign.css';
import './unified.css';
import './ra-fahim/ra-fahim.css';
import './folio.css';
import './premium-final.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Motion } from '@/components/motion';
import { siteConfig } from '@/lib/config';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const publicBasePath = process.env.GITHUB_ACTIONS === 'true' && process.env.NEXT_PUBLIC_USE_CUSTOM_DOMAIN !== 'true' && repositoryName ? `/${repositoryName}` : '';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'BD Web List — Discover, Explore & Promote Websites', template: '%s | BD Web List' },
  description: siteConfig.description,
  keywords: ['Bangladesh website directory', 'Bangladeshi websites', 'discover websites', 'website listing', 'submit website', 'promote website', 'curated websites', 'BD Web List'],
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { type: 'website', siteName: siteConfig.name, title: 'BD Web List — Discover, Explore & Promote Websites', description: siteConfig.description, url: siteConfig.url, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BD Web List — Discover, Explore & Promote Websites' }] },
  twitter: { card: 'summary_large_image', title: 'BD Web List — Discover, Explore & Promote Websites', description: siteConfig.description, images: ['/og-image.png'] },
  icons: { icon: [{ url: `${publicBasePath}/icon.png`, type: 'image/png', sizes: '192x192' }, { url: `${publicBasePath}/icon.svg`, type: 'image/svg+xml' }], shortcut: `${publicBasePath}/icon.png`, apple: `${publicBasePath}/apple-icon.png` },
  category: 'website directory'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, logo: `${siteConfig.url}/ra-fahim-logo.png` },
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteConfig.url}/#website`, name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, publisher: { '@id': `${siteConfig.url}/#organization` }, inLanguage: 'en' }
  ];
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /><Motion/><div className="site-shell"><SiteHeader/><main>{children}</main><SiteFooter/></div></body></html>;
}
