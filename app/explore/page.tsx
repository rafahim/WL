import type { Metadata } from 'next';
import Link from 'next/link';
import { ExploreGrid } from '@/components/explore-grid';
import { Icon } from '@/components/icon';
import { pageMetadata } from '@/lib/seo';
import { websites } from '@/lib/data';

export const metadata: Metadata = pageMetadata({ title: 'Explore Websites — Search the BD Web List Index', description: 'Search and filter the BD Web List directory by category, topic, or keyword. Discover useful online tools, businesses, creative projects, and independent websites.', path: '/explore/', ogTitle: 'Explore Websites | BD Web List' });

export default function ExplorePage() {
  return <>
    <section className="folio-page-hero">
      <div className="folio-container">
        <Link href="/" className="folio-back-link"><Icon name="arrow-left" size={15} /> Back to the index</Link>
        <p className="folio-eyebrow"><span /> THE COMPLETE INDEX</p>
        <h1>Take the scenic route<br />around the <em>internet.</em></h1>
        <p className="folio-page-intro">Browse {websites.length} independently selected websites, tools, stores and creative projects. Find a useful corner of the web you didn't know existed.</p>
      </div>
    </section>
    <section className="folio-explore-section"><div className="folio-container"><ExploreGrid /><div className="folio-explore-bottom"><div><span>YOUR WEBSITE NOT HERE?</span><h3>Give it a place in the index.</h3><p>Nominate a website for a free human review.</p></div><Link href="/submit/">Nominate a site <Icon name="arrow-up-right" size={15} /></Link></div></div></section>
  </>;
}
