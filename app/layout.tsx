import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
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
  icons: { icon: `${publicBasePath}/icon.svg`, shortcut: `${publicBasePath}/icon.svg` },
  category: 'website directory'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, logo: `${siteConfig.url}/icon.svg` },
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteConfig.url}/#website`, name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, publisher: { '@id': `${siteConfig.url}/#organization` }, inLanguage: 'en' }
  ];
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /><div className="site-shell"><SiteHeader/><main>{children}</main><SiteFooter/></div></body></html>;
}
