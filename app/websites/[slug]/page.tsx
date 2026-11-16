import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/icon';
import { WebsiteLogo } from '@/components/website-logo';
import { WebsiteCard } from '@/components/website-card';
import { categorySlug, getWebsite, websites } from '@/lib/data';
import { siteConfig } from '@/lib/config';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return websites.map((website) => ({ slug: website.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const website = getWebsite(slug);
  if (!website) return { title: 'Website not found', robots: { index: false, follow: true } };
  const title = `${website.name} — ${website.category} (${website.domain})`;
  return {
    title,
    description: website.seoDescription,
    alternates: { canonical: `/websites/${website.slug}/` },
    robots: { index: !website.demo, follow: true },
    openGraph: { title, description: website.seoDescription, type: 'website', url: `${siteConfig.url}/websites/${website.slug}/`, siteName: siteConfig.name, locale: 'en_US', images: [{ url: `/og/${website.slug}.png`, width: 1200, height: 630, alt: `${website.name} — website profile on BD Web List` }] },
    twitter: { card: 'summary_large_image', title, description: website.seoDescription, images: [`/og/${website.slug}.png`] },
    category: website.category,
    keywords: [...new Set([website.name, website.domain, `${website.name} website`, website.category, `${website.category} website`, ...website.tags, 'Bangladesh websites', 'website directory', 'discover websites'])]
  };
}

export default async function WebsiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const website = getWebsite(slug);
  if (!website) notFound();
  const sameCategory = websites.filter((item) => item.slug !== website.slug && item.category === website.category && !item.demo);
  const related = [...sameCategory, ...websites.filter((item) => item.slug !== website.slug && item.category !== website.category && !item.demo)].slice(0, 3);
  const jsonLd = !website.demo ? [
    {
      '@context': 'https://schema.org', '@type': 'WebPage',
      '@id': `${siteConfig.url}/websites/${website.slug}/#webpage`,
      name: `${website.name} (${website.domain})`,
      url: `${siteConfig.url}/websites/${website.slug}/`,
      description: website.seoDescription,
      inLanguage: 'en',
      isPartOf: { '@type': 'WebSite', '@id': `${siteConfig.url}/#website`, name: siteConfig.name, url: siteConfig.url },
      publisher: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url },
      mainEntity: { '@type': 'WebSite', '@id': `${siteConfig.url}/websites/${website.slug}/#listed-website`, name: website.name, url: website.url, description: website.seoDescription, genre: website.category, keywords: website.tags.join(', ') },
      about: { '@type': 'Thing', name: website.category }
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Explore websites', item: `${siteConfig.url}/explore/` },
        { '@type': 'ListItem', position: 3, name: website.category, item: `${siteConfig.url}/categories/${categorySlug(website.category)}/` },
        { '@type': 'ListItem', position: 4, name: website.name, item: `${siteConfig.url}/websites/${website.slug}/` }
      ]
    }
  ] : null;
  const safeUrl = /^https?:\/\//.test(website.url) ? website.url : undefined;
  const checkedDate = new Date(`${website.infoChecked}T12:00:00Z`).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  return <>
    {jsonLd?.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />)}
    <section className="folio-detail-hero">
      <div className="folio-container">
        <Link href="/explore/" className="folio-back-link"><Icon name="arrow-left" size={15} /> Back to the index</Link>
        <div className="folio-detail-topline"><span>INDEX / {String(website.rank).padStart(2, '0')}</span><span>{website.category}</span>{website.featured && <span className="folio-detail-picked"><Icon name="sparkles" size={12} /> Editor's pick</span>}</div>
        <div className="folio-detail-heading">
          <WebsiteLogo website={website} size="large" />
          <div><h1>{website.name}<i>.</i></h1><a href={website.url} target="_blank" rel="noopener noreferrer">{website.domain} <Icon name="external" size={13} /></a></div>
        </div>
        <p className="folio-detail-tagline">{website.tagline}</p>
        <div className="folio-detail-actions">
          {safeUrl ? <a href={safeUrl} target="_blank" rel="noopener noreferrer" className="folio-coral-button">Visit website <Icon name="arrow-up-right" size={16} /></a> : <span className="folio-muted-button">Website URL unavailable</span>}
          <Link href={`/categories/${categorySlug(website.category)}/`} className="folio-outline-dark">Explore {website.category} <Icon name="arrow-up-right" size={15} /></Link>
        </div>
        <div className="folio-detail-brand-panel" style={{ '--folio-brand-accent': website.accent } as CSSProperties}>
          <div className="folio-detail-panel-top"><span /><span /><span /><small>{website.domain}</small><b>BDWL / {String(website.rank).padStart(2, '0')}</b></div>
          <div className="folio-detail-panel-content">
            <div className="folio-detail-panel-logo"><WebsiteLogo website={website} size="large" /><span>{website.name}</span></div>
            <div className="folio-detail-panel-heading"><small>DISCOVERED ON BD WEB LIST</small><strong>{website.name}<em>{website.category === 'Portfolio' ? 'made by people with ideas.' : website.category === 'E-commerce' ? 'made for what comes next.' : 'a good corner of the web.'}</em></strong></div>
            <div className="folio-detail-panel-tags">{website.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="folio-detail-body">
      <div className="folio-container">
        <div className="folio-detail-highlights" aria-label="Website highlights">
          {website.highlights.map((item, index) => <div key={item.label}><span>0{index + 1} / {item.label}</span><strong>{item.value}</strong></div>)}
        </div>
        <div className="folio-detail-columns">
          <article className="folio-detail-description">
            <p className="folio-eyebrow-dark">ABOUT THIS WEBSITE</p>
            <h2>Get to know<br /><em>{website.name}.</em></h2>
            <p className="folio-detail-copy">{website.description}</p>
            <h3>What the website offers</h3>
            <ul>{website.features.map((feature) => <li key={feature}><span><Icon name="check" size={13} /></span>{feature}</li>)}</ul>
            {website.techStack.length > 0 && <><h3>Technology stack</h3><p className="folio-detail-muted">Technologies publicly listed for this project.</p><div className="folio-detail-tags">{website.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div></>}
            <div className="folio-audience-note"><Icon name="users" size={19} /><div><b>Who may find it useful</b><p>{website.audience}</p></div></div>
            <div className="folio-review-note"><Icon name="info" size={17} /><p>Listing information was reviewed from publicly available website pages on {checkedDate}. Features and availability may change; visit the official website for the latest details.</p></div>
          </article>
          <aside className="folio-detail-aside">
            <div className="folio-fact-card"><span className="folio-fact-title">LISTING DETAILS</span><div><span>Directory number</span><b>#{String(website.rank).padStart(2, '0')}</b></div><div><span>Category</span><b>{website.category}</b></div><div><span>Website</span><b>{website.domain}</b></div><div><span>Listing status</span><b>Published</b></div><div><span>Information checked</span><b>{checkedDate}</b></div><Link href="/submit/" className="folio-fact-submit">Nominate a website <Icon name="arrow-up-right" size={14} /></Link></div>
            {website.contacts?.length ? <div className="folio-fact-card"><span className="folio-fact-title">PUBLIC CONTACT</span>{website.contacts.map((contact) => <a className="folio-contact-row" key={contact.label} href={contact.url} target={contact.url.startsWith('http') ? '_blank' : undefined} rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}><span>{contact.label}</span><b>{contact.value}</b><Icon name="arrow-up-right" size={12} /></a>)}</div> : null}
            {website.relatedLinks?.length ? <div className="folio-fact-card"><span className="folio-fact-title">MORE FROM THIS WEBSITE</span>{website.relatedLinks.map((item) => <a className="folio-related-row" href={item.url} key={item.url} target="_blank" rel="noopener noreferrer">{item.label}<Icon name="external" size={13} /></a>)}</div> : null}
            <div className="folio-owner-note"><Icon name="mail" size={17} /><p>Are you the owner? <Link href="/submit/">Send an update request.</Link></p></div>
          </aside>
        </div>
      </div>
    </section>

    {related.length > 0 && <section className="folio-related-section"><div className="folio-container"><div className="folio-related-heading"><div><p className="folio-eyebrow-dark">KEEP EXPLORING</p><h2>More in <em>{website.category}.</em></h2></div><Link href={`/categories/${categorySlug(website.category)}/`}>View category <Icon name="arrow-up-right" size={15} /></Link></div><div className="folio-card-grid">{related.map((item, index) => <WebsiteCard website={item} key={item.slug} index={index} />)}</div></div></section>}
  </>;
}
