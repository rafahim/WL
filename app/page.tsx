import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/icon';
import { WebsiteLogo } from '@/components/website-logo';
import { HomeDirectory } from '@/components/home-directory';
import { liveWebsites, websites, categories } from '@/lib/data';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'BD Web List — Discover the Best of the Bangladeshi Web',
  description: 'An independent index of useful websites, creative portfolios, online stores and digital tools from Bangladesh. Browse the index or nominate a website.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'BD Web List — Discover the Best of the Bangladeshi Web',
    description: 'A living index of useful, inventive and beautifully made websites from Bangladesh.',
    type: 'website',
    url: siteConfig.url,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BD Web List' }]
  }
};

const orbitWebsites = [websites[2], websites[0], websites[1], websites[4]].filter(Boolean);
const featuredWebsites = liveWebsites.filter((website) => website.featured).slice(0, 4);

export default function HomePage() {
  const liveCount = liveWebsites.length;
  const activeCategories = categories.filter((category) => liveWebsites.some((site) => site.category === category.name)).length;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'BD Web List — Discover the Best of the Bangladeshi Web',
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: liveCount,
      itemListElement: liveWebsites.map((website, index) => ({
        '@type': 'ListItem', position: index + 1,
        name: website.name,
        url: `${siteConfig.url}/websites/${website.slug}/`,
        description: website.seoDescription
      }))
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="folio-hero">
        <div className="folio-hero-glow folio-hero-glow-left" aria-hidden="true" />
        <div className="folio-hero-glow folio-hero-glow-right" aria-hidden="true" />
        <div className="folio-noise" aria-hidden="true" />
        <div className="folio-container folio-hero-layout">
          <div className="folio-hero-copy">
            <div className="folio-edition-row">
              <span className="folio-live-pill"><i /> Live index</span>
              <span>Bangladesh edition · 2026</span>
            </div>
            <h1>Don't browse<br />the web.<br /><em>Discover it.</em></h1>
            <div className="folio-hero-description">
              <p>A living index of Bangladesh's most useful, inventive and beautifully made websites — curated for people who love finding something good.</p>
              <a href="#directory" className="folio-round-cta" aria-label="Explore the website index"><Icon name="arrow-right" size={22} /></a>
            </div>
            <div className="folio-hero-meta"><span>01 / DISCOVER</span><span>02 / EXPLORE</span><span>03 / SHARE WHAT YOU MADE</span></div>
          </div>

          <div className="folio-orbit-stage" aria-label="Featured websites">
            <div className="folio-orbit-ring" />
            <div className="folio-orbit-core"><strong>{String(liveCount).padStart(2, '0')}</strong><span>websites<br />in the index</span></div>
            {orbitWebsites.map((website, index) => (
              <Link href={`/websites/${website.slug}/`} key={website.slug} className={`folio-orbit-card folio-orbit-card-${index + 1}`}>
                <div className="folio-browser-dots"><i /><i /><i /></div>
                <div className="folio-orbit-brand"><WebsiteLogo website={website} size="regular" /><span><b>{website.name}</b><small>{website.domain}</small></span><em>{String(website.rank).padStart(2, '0')}</em></div>
              </Link>
            ))}
            <span className="folio-orbit-stamp">GOOD<br />SITES<br /><b>ONLY.</b></span>
          </div>
        </div>
      </section>

      <section className="folio-stats" aria-label="Directory statistics">
        <div className="folio-container folio-stats-grid">
          <div><strong>{String(liveCount).padStart(2, '0')}</strong><span>Curated websites</span></div>
          <div><strong>{String(activeCategories).padStart(2, '0')}</strong><span>Active categories</span></div>
          <div><strong>100%</strong><span>Human reviewed</span></div>
          <div><strong>Free</strong><span>To nominate a website</span></div>
        </div>
      </section>

      <HomeDirectory />

      <section className="folio-curations" id="collections">
        <div className="folio-curation-letter" aria-hidden="true">C</div>
        <div className="folio-container folio-curation-layout">
          <div className="folio-curation-copy">
            <span className="folio-selection-stamp">Editor's selection</span>
            <p className="folio-curation-kicker">A LITTLE LESS SCROLLING. A LITTLE MORE FINDING.</p>
            <h2>Great websites.<br /><em>Zero noise.</em></h2>
            <p className="folio-curation-description">A handpicked collection of standout Bangladeshi websites, chosen for the ideas, experiences and useful things they put into the world.</p>
            <Link href="/explore/" className="folio-dark-button">Explore the full index <Icon name="arrow-right" size={17} /></Link>
          </div>
          <div className="folio-feature-stack">
            {featuredWebsites.map((website, index) => (
              <Link href={`/websites/${website.slug}/`} key={website.slug} className={`folio-feature-row folio-feature-row-${index + 1}`}>
                <span className="folio-feature-rank">{String(website.rank).padStart(2, '0')}</span>
                <WebsiteLogo website={website} size="regular" />
                <span className="folio-feature-copy"><b>{website.name}</b><small>{website.category} · {website.domain}</small></span>
                <span className="folio-feature-arrow"><Icon name="arrow-up-right" size={17} /></span>
              </Link>
            ))}
            {featuredWebsites.length === 0 && <p>No featured websites yet.</p>}
          </div>
        </div>
      </section>

      <section className="folio-nominate-strip">
        <div className="folio-container folio-nominate-inner">
          <div><span className="folio-eyebrow-dark">HAVE SOMETHING WORTH DISCOVERING?</span><h2>Made a good thing?<br /><em>Put it on the map.</em></h2></div>
          <div className="folio-nominate-action"><p>Nominate your website for a free human review and a dedicated profile in the index.</p><Link href="/submit/" className="folio-coral-button">Nominate a site <Icon name="arrow-up-right" size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
