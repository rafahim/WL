import type { Metadata } from 'next';
import Link from 'next/link';
import { ExploreGrid } from '@/components/explore-grid';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ title: 'Explore Websites — Search by Category & Topic', description: 'Browse the BD Web List directory by category, topic, or keyword. Discover useful online tools, businesses, creative projects, and independent websites.', path: '/explore/', ogTitle: 'Explore Websites | BD Web List' });

export default function ExplorePage() {
  return <><section className="page-hero page-hero-soft"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> THE DIRECTORY</div><h1>Take the scenic route<br/>around the <em>internet.</em></h1><p>Explore interesting websites, independent projects, and useful tools — all in one place.</p><div className="page-hero-meta"><span><IconDot/> Curated categories</span><span><IconDot/> Fresh discoveries</span><span><IconDot/> Independent creators</span></div></div></section><section className="section explore-section"><div className="container"><ExploreGrid/><div className="explore-bottom-cta"><div><span className="eyebrow">DID WE MISS YOURS?</span><h3>Have a website worth sharing?</h3><p>We'd love to take a look at what you've made.</p></div><Link href="/submit/" className="button button-dark">Submit a website <span>↗</span></Link></div></div></section></>;
}

function IconDot() { return <i className="meta-dot"/>; }
