import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/icon';
import { WebsiteCard } from '@/components/website-card';
import { MIN_INDEXABLE_CATEGORY_LISTINGS, categories, categorySlug, websites } from '@/lib/data';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/config';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: categorySlug(category.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => categorySlug(item.name) === slug);
  if (!category) return { title: 'Category not found', robots: { index: false, follow: true } };
  const liveCount = websites.filter((website) => website.category === category.name && !website.demo).length;
  return {
    ...pageMetadata({
      title: `${category.name} Websites — Explore Online`,
      description: `Discover curated ${category.name.toLowerCase()} websites on BD Web List. Explore useful sites, fresh ideas, and independent projects.`,
      path: `/categories/${slug}/`,
      ogTitle: `${category.name} Websites | BD Web List`
    }),
    robots: { index: liveCount >= MIN_INDEXABLE_CATEGORY_LISTINGS, follow: true },
    keywords: [category.name, `${category.name} websites`, 'website directory', 'discover websites']
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => categorySlug(item.name) === slug);
  if (!category) notFound();
  const listings = websites.filter((website) => website.category === category.name);
  const liveListings = listings.filter((website) => !website.demo);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${category.name} Websites | BD Web List`, description: `Explore ${category.description.toLowerCase()} on BD Web List.`, url: `${siteConfig.url}/categories/${slug}/`, mainEntity: { '@type': 'ItemList', numberOfItems: liveListings.length, itemListElement: liveListings.map((website, index) => ({ '@type': 'ListItem', position: index + 1, url: `${siteConfig.url}/websites/${website.slug}/`, name: website.name })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}/><section className="page-hero page-hero-soft"><div className="container"><Link href="/explore/" className="back-link"><Icon name="arrow-left" size={15}/> All websites</Link><div className="eyebrow" style={{ marginTop: 25 }}><span className="eyebrow-dot"/> BROWSE BY CATEGORY</div><h1>{category.name}<br/><em>websites.</em></h1><p>{category.description}. Discover hand-picked corners of the web, selected for curious visitors.</p><div className="page-hero-meta"><span><Icon name="globe" size={14}/> {liveListings.length} published listings</span><span><Icon name="shield" size={14}/> Manually reviewed</span></div></div></section><section className="section"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> {category.name.toUpperCase()}</div><h2>Explore this <em>collection.</em></h2><p>Every approved website gets its own detail page.</p></div><Link href="/submit/" className="text-link">Submit a website <Icon name="arrow-up-right" size={16}/></Link></div>{listings.length ? <div className="website-grid">{listings.map((website) => <WebsiteCard key={website.slug} website={website}/>)}</div> : <div className="empty-state"><span className="empty-icon"><Icon name="globe" size={25}/></span><h3>New discoveries are on the way</h3><p>There are no listings in this category yet. You can suggest a website for review.</p><Link href="/submit/" className="button button-dark">Suggest a website <Icon name="arrow-up-right" size={15}/></Link></div>}</div></section></>;
}
