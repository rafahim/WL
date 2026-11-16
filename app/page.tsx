import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/icon';
import { HeroSearch } from '@/components/hero-search';
import { CategoryCard } from '@/components/category-card';
import { categories, categorySlug, websites } from '@/lib/data';
import { siteConfig } from '@/lib/config';

export default function HomePage() {
  const liveCount = websites.filter((website) => !website.demo).length;
  const activeCategories = categories.filter((category) => websites.some((site) => site.category === category.name));
  const homeListings = websites.slice(0, 7);
  const rowA = websites.filter((_, n) => n % 2 === 0);
  const rowB = websites.filter((_, n) => n % 2 === 1);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'BD Web List — Discover Exceptional Websites',
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: websites.filter((website) => !website.demo).length,
      itemListElement: websites.filter((website) => !website.demo).map((website, index) => ({
        '@type': 'ListItem', position: index + 1, name: website.name,
        url: `${siteConfig.url}/websites/${website.slug}/`, description: website.seoDescription
      }))
    }
  };

  const Thumb = ({ w }: { w: (typeof websites)[number] }) => <Link href={`/websites/${w.slug}/`} className="h-thumb" tabIndex={-1}><img src={`/og/${w.slug}.png`} alt="" width={1200} height={630} loading="lazy" /><span>{w.name}</span></Link>;
  const Row = ({ list, rev }: { list: typeof websites; rev?: boolean }) => <div className={`h-row ${rev ? 'rev' : ''}`}>{[0, 1].map((k) => <div className="h-group" key={k} aria-hidden={k === 1}>{list.map((w) => <Thumb key={w.slug} w={w} />)}</div>)}</div>;
  const steps = [
    { n: '01', t: 'Submit your website', d: 'Tell us what you built, who it is for and where to find it. It takes about two minutes.' },
    { n: '02', t: 'We review it by hand', d: 'Every listing is checked manually for quality, safety and a genuinely useful experience.' },
    { n: '03', t: 'Get discovered', d: 'Approved websites get a dedicated profile page, share image and a place in search and categories.' }
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <div className="h-page">
      <section className="h-hero">
        <div className="h-orb h-orb-a" aria-hidden="true" /><div className="h-orb h-orb-b" aria-hidden="true" /><div className="h-grid" aria-hidden="true" />
        <div className="container h-hero-inner">
          <span className="h-badge"><i /> {liveCount} hand-picked websites · updated {new Date().getFullYear()}</span>
          <h1>The best of the Bangladeshi web, <em>beautifully curated.</em></h1>
          <p>Discover remarkable portfolios, stores, tools and businesses — or put your own website in front of people who care.</p>
          <HeroSearch />
          <div className="h-chips">{activeCategories.slice(0, 6).map((c) => <Link key={c.name} href={`/categories/${categorySlug(c.name)}/`}>{c.name}</Link>)}<Link href="/explore/" className="h-chip-all">All websites <Icon name="arrow-up-right" size={13} /></Link></div>
        </div>
        <div className="h-marquee" aria-label="Featured websites"><Row list={rowA} /><Row list={rowB} rev /></div>
      </section>

      <section className="h-stats"><div className="container h-stats-grid">
        {[[String(liveCount), 'Curated websites'], [String(activeCategories.length), 'Active categories'], ['100%', 'Manually reviewed'], ['Free', 'To request a listing']].map(([v, l]) => <div className="h-stat h-reveal" key={l}><strong>{v}</strong><span>{l}</span></div>)}
      </div></section>

      <section className="h-section" id="latest"><div className="container">
        <div className="h-head h-reveal"><div><span className="h-eyebrow">Fresh discoveries</span><h2>Websites worth <em>your time.</em></h2></div><Link href="/explore/" className="h-link">View all <Icon name="arrow-up-right" size={16} /></Link></div>
        <div className="h-cards">{homeListings.map((w, n) => <article key={w.slug} className={`h-card h-reveal ${n === 0 || n === 5 ? 'wide' : ''}`} style={{ '--card-accent': w.accent } as CSSProperties}>
          <Link href={`/websites/${w.slug}/`} aria-label={`Read the ${w.name} listing`}>
            <div className="h-card-img"><img src={`/og/${w.slug}.png`} alt={`${w.name} website preview`} width={1200} height={630} loading="lazy" /><span className="h-pill">{w.category}</span>{w.featured && <span className="h-star"><Icon name="star" size={12} /> Featured</span>}</div>
            <div className="h-card-body"><div className="h-card-top"><h3>{w.name}</h3><span className="h-go"><Icon name="arrow-up-right" size={16} /></span></div><p>{w.tagline}</p><div className="h-card-foot"><span><i /> {w.domain}</span><span>{w.tags.slice(0, 2).join(' · ')}</span></div></div>
          </Link>
        </article>)}</div>
      </div></section>

      <section className="h-section" id="categories"><div className="container">
        <div className="h-head h-reveal"><div><span className="h-eyebrow">Browse</span><h2>Explore by <em>category.</em></h2></div><Link href="/explore/" className="h-link">All websites <Icon name="arrow-up-right" size={16} /></Link></div>
        <div className="h-cats">{activeCategories.map((category) => <CategoryCard key={category.name} category={category} count={websites.filter((site) => site.category === category.name).length} />)}</div>
      </div></section>

      <section className="h-section"><div className="container">
        <div className="h-head h-reveal"><div><span className="h-eyebrow">How it works</span><h2>From idea to <em>discovered.</em></h2></div></div>
        <div className="h-steps">{steps.map((s) => <div className="h-step h-reveal" key={s.n}><span>{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>)}</div>
      </div></section>

      <section className="h-cta-wrap"><div className="container"><div className="h-cta h-reveal">
        <div className="h-orb h-orb-c" aria-hidden="true" />
        <span className="h-eyebrow">Your turn</span><h2>Built something <em>great?</em><br />Let the web find it.</h2><p>Submit your website for a free, hand-reviewed listing with its own profile page.</p>
        <div className="h-cta-actions"><Link href="/submit/" className="button button-accent">Submit a website <Icon name="arrow-up-right" size={16} /></Link><Link href="/guidelines/" className="button button-outline">Read the guidelines</Link></div>
      </div></div></section>
    </div>
  </>;
}
