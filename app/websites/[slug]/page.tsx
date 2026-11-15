import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/icon';
import { WebsiteCard } from '@/components/website-card';
import { categorySlug, getWebsite, websites } from '@/lib/data';
import { siteConfig } from '@/lib/config';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return websites.map((website) => ({ slug: website.slug }));
}

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
  const sameCategory = websites.filter((item) => item.slug !== website.slug && item.category === website.category);
  const related = [...sameCategory, ...websites.filter((item) => item.slug !== website.slug && item.category !== website.category)].slice(0, 3);
  const jsonLd = !website.demo ? [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
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
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
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
    <section className="detail-hero">
      <div className="container">
        <Link href="/explore/" className="back-link"><Icon name="arrow-left" size={16}/> Back to directory</Link>
        <div className="detail-topline"><span className="detail-rank">#{String(website.rank).padStart(2, '0')}</span><span className="detail-category"><i className="category-dot" style={{ background: website.accent }}/>{website.category}</span><span className="detail-label"><Icon name="sparkles" size={13}/>{website.label}</span></div>
        <div className="detail-heading"><div className="detail-logo" style={{ background: website.color, color: website.accent }}>{website.logoText}</div><div><h1>{website.name}</h1><p>{website.domain}</p></div></div>
        <p className="detail-tagline">{website.tagline}</p>
        <div className="detail-actions">{safeUrl ? <a className="button button-dark" href={safeUrl} target="_blank" rel="noopener noreferrer">Visit website <Icon name="external" size={16}/></a> : <span className="button button-disabled">Website URL unavailable</span>}<Link href="/submit/" className="button button-outline">Submit a website <Icon name="arrow-up-right" size={16}/></Link></div>
        <div className="detail-preview" style={{ '--tile': website.color, '--accent': website.accent } as CSSProperties}>
          <div className="detail-preview-top"><span/><span/><span/><small>{website.domain}</small></div>
          <div className="detail-preview-content">
            <div className="detail-preview-brand"><b>{website.logoText}</b><span>{website.name}</span><i>{website.category}</i></div>
            <div className="detail-preview-display"><span className="detail-display-kicker">BD WEB LIST · LISTING {String(website.rank).padStart(2, '0')}</span><strong>{website.name}<br/><i>{website.category === 'Portfolio' ? 'built to create.' : website.category === 'E-commerce' ? 'made for discovery.' : 'worth exploring.'}</i></strong><span className="detail-preview-stroke"/></div>
            <div className="detail-preview-tags">{website.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="detail-preview-caption">DISCOVER · EXPLORE · PROMOTE</div>
          </div>
        </div>
      </div>
    </section>

    <section className="section detail-body-section">
      <div className="container">
        <div className="detail-highlights" aria-label="Website highlights">
          {website.highlights.map((item) => <div className="detail-highlight" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
        </div>
        <div className="detail-body-layout">
          <article className="detail-description">
            <div className="eyebrow"><span className="eyebrow-dot"/> ABOUT THIS WEBSITE</div>
            <h2>Get to know <em>{website.name}.</em></h2>
            <p>{website.description}</p>
            <h3>What the website offers</h3>
            <ul className="detail-feature-list">{website.features.map((feature) => <li key={feature}><span><Icon name="check" size={14}/></span>{feature}</li>)}</ul>
            {website.techStack.length > 0 && <><h3>Technology stack</h3><p className="detail-stack-note">Technologies publicly listed for this project.</p><div className="tag-list">{website.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div></>}
            <div className="detail-audience"><div className="audience-icon"><Icon name="users" size={19}/></div><div><strong>Who may find it useful</strong><p>{website.audience}</p></div></div>
            <div className="detail-disclaimer"><Icon name="info" size={17}/><p>Listing information was reviewed from publicly available website pages on {checkedDate}. Features and availability may change; visit the official website for the latest details.</p></div>
          </article>
          <aside className="detail-facts">
            <div className="facts-card"><span className="facts-heading">LISTING DETAILS</span>
              <div className="fact-row"><span>Directory number</span><strong>#{String(website.rank).padStart(2, '0')}</strong></div>
              <div className="fact-row"><span>Category</span><strong>{website.category}</strong></div>
              <div className="fact-row"><span>Website</span><strong>{website.domain}</strong></div>
              <div className="fact-row"><span>Listing status</span><strong>Published</strong></div>
              <div className="fact-row"><span>Information checked</span><strong>{checkedDate}</strong></div>
              <Link href="/submit/" className="facts-submit">List a website <Icon name="arrow-up-right" size={15}/></Link>
            </div>
            {website.contacts?.length ? <div className="facts-card facts-contact-card"><span className="facts-heading">PUBLIC CONTACT</span>{website.contacts.map((contact) => <a className="contact-row" key={contact.label} href={contact.url} target={contact.url.startsWith('http') ? '_blank' : undefined} rel={contact.url.startsWith('http') ? 'noopener noreferrer' : undefined}><span>{contact.label}</span><strong>{contact.value}</strong><Icon name="arrow-up-right" size={13}/></a>)}</div> : null}
            {website.relatedLinks?.length ? <div className="facts-card facts-links-card"><span className="facts-heading">MORE FROM THIS WEBSITE</span>{website.relatedLinks.map((item) => <a className="related-link-row" href={item.url} key={item.url} target="_blank" rel="noopener noreferrer">{item.label}<Icon name="external" size={13}/></a>)}</div> : null}
            <div className="facts-help"><Icon name="mail" size={18}/><p>Are you the owner? <Link href="/submit/">Contact us</Link> to request an update.</p></div>
          </aside>
        </div>
      </div>
    </section>

    {related.length > 0 && <section className="section related-section"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> KEEP EXPLORING</div><h2>More in <em>{website.category}.</em></h2></div><Link href={`/categories/${categorySlug(website.category)}/`} className="text-link">View category <Icon name="arrow-right" size={16}/></Link></div><div className="website-grid">{related.map((item) => <WebsiteCard website={item} key={item.slug}/>)}</div></div></section>}
  </>;
}
