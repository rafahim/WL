import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/icon';
import { WebsiteCard } from '@/components/website-card';
import { MIN_INDEXABLE_CATEGORY_LISTINGS, categories, categorySlug, websites } from '@/lib/data';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/config';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return categories.map((category) => ({ slug: categorySlug(category.name) })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => categorySlug(item.name) === slug);
  if (!category) return { title: 'Category not found', robots: { index: false, follow: true } };
  const liveCount = websites.filter((website) => website.category === category.name && !website.demo).length;
  return {
    ...pageMetadata({ title: `${category.name} Websites — Explore Online`, description: `Discover curated ${category.name.toLowerCase()} websites on BD Web List. Explore useful sites, fresh ideas, and independent projects.`, path: `/categories/${slug}/`, ogTitle: `${category.name} Websites | BD Web List` }),
    robots: { index: liveCount >= MIN_INDEXABLE_CATEGORY_LISTINGS, follow: true },
    keywords: [category.name, `${category.name} websites`, 'website directory', 'discover websites']
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => categorySlug(item.name) === slug);
  if (!category) notFound();
  const listings = websites.filter((website) => website.category === category.name && !website.demo);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${category.name} Websites | BD Web List`, description: `Explore ${category.description.toLowerCase()} on BD Web List.`, url: `${siteConfig.url}/categories/${slug}/`, mainEntity: { '@type': 'ItemList', numberOfItems: listings.length, itemListElement: listings.map((website, index) => ({ '@type': 'ListItem', position: index + 1, url: `${siteConfig.url}/websites/${website.slug}/`, name: website.name })) } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <section className="folio-page-hero">
      <div className="folio-container">
        <Link href="/explore/" className="folio-back-link"><Icon name="arrow-left" size={15} /> All websites</Link>
        <p className="folio-eyebrow"><span /> BROWSE BY CATEGORY</p>
        <h1>{category.name}<br /><em>websites.</em></h1>
        <p className="folio-page-intro">{category.description}. Explore the independently selected websites in this collection.</p>
        <div className="folio-page-meta"><span>{String(listings.length).padStart(2, '0')} published listings</span><span>Human reviewed</span></div>
      </div>
    </section>
    <section className="folio-explore-section"><div className="folio-container">
      <div className="folio-directory-heading folio-inner-heading"><div><p className="folio-eyebrow-dark">THE {category.name.toUpperCase()} COLLECTION</p><h2>Worth a closer<br /><em>look.</em></h2></div><Link href="/submit/" className="folio-light-outline">Nominate a website <Icon name="arrow-up-right" size={15} /></Link></div>
      {listings.length ? <div className="folio-card-grid">{listings.map((website, index) => <WebsiteCard key={website.slug} website={website} index={index} />)}</div> : <div className="folio-empty"><span><Icon name="globe" size={22} /></span><h3>New discoveries are on the way.</h3><p>There are no listings in this category yet. You can nominate the first one.</p><Link href="/submit/">Nominate a website <Icon name="arrow-up-right" size={15} /></Link></div>}
    </div></section>
  </>;
}
